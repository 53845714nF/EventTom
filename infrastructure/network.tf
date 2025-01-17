# VPC Konfiguration fürs Backend
resource "aws_vpc" "backend_vpc" {
  cidr_block           = "10.0.0.0/16"
  enable_dns_hostnames = true
  enable_dns_support   = true

  tags = {
    Name = "Backend Netzwerk"
  }
}

# Öffentliche Subnetz
resource "aws_subnet" "public_subnet" {
  vpc_id                  = aws_vpc.backend_vpc.id
  cidr_block              = "10.0.0.0/24"
  map_public_ip_on_launch = true
  availability_zone       = "us-east-1a"
}

resource "aws_subnet" "public_subnet_b" {
  vpc_id                  = aws_vpc.backend_vpc.id
  cidr_block              = "10.0.3.0/24"
  map_public_ip_on_launch = true
  availability_zone       = "us-east-1b"
}

# Private Subnetze für Datenbank
resource "aws_subnet" "private_db_subnet_a" {
  vpc_id            = aws_vpc.backend_vpc.id
  cidr_block        = "10.0.1.0/24"
  availability_zone = "us-east-1a"
}

resource "aws_subnet" "private_db_subnet_b" {
  vpc_id            = aws_vpc.backend_vpc.id
  cidr_block        = "10.0.2.0/24"
  availability_zone = "us-east-1b"
}

# Internet Gateway
resource "aws_internet_gateway" "backend_vpc_gateway" {
  vpc_id = aws_vpc.backend_vpc.id
}

# Routing-Tabelle für öffentliche Subnetze
resource "aws_route_table" "public_route_table" {
  vpc_id = aws_vpc.backend_vpc.id

  route {
    cidr_block = "0.0.0.0/0"
    gateway_id = aws_internet_gateway.backend_vpc_gateway.id
  }
}

# Route backend to internet
resource "aws_route_table_association" "backend_route_table_association" {
  subnet_id      = aws_subnet.public_subnet.id
  route_table_id = aws_route_table.public_route_table.id
}


# Elastic IP für NAT Gateway
resource "aws_eip" "nat_gateway_eip" {
  vpc = true
}


# NAT Gateways (ein NAT Gateway öffentliches Subnetz)
resource "aws_nat_gateway" "backend" {
  allocation_id = aws_eip.nat_gateway_eip.id
  subnet_id     = aws_subnet.public_subnet.id

  depends_on = [aws_internet_gateway.backend_vpc_gateway]
}
