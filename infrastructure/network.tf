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
}

# Private Subnetz für Datenbank
resource "aws_subnet" "private_db_subnet" {
  vpc_id            = aws_vpc.backend_vpc.id
  cidr_block        = "10.0.0.0/29"
}

# Internet Gateway
resource "aws_internet_gateway" "backend_vpc_gateway" {
  vpc_id = aws_vpc.backend_vpc.id
}

# Routing-Tabelle für öffentliche Subnetze
resource "aws_route_table" "public_route_table" {
  vpc_id = aws_vpc.backend_vpc.id

  route {
    gateway_id = aws_internet_gateway.backend_vpc_gateway.id
    cidr_block = "0.0.0.0/0"
  }
}

# Route backend to internet
resource "aws_route_table_association" "backend_route_table_association" {
  subnet_id      = aws_subnet.public_subnet.id
  route_table_id = aws_route_table.public_route_table.id
}


# Elastic IP für NAT Gateway
#resource "aws_eip" "nat_gateway_eip" {
#  domain = "vpc"
#
#  tags = {
#    Name = "NAT Gateway EIP"
#  }
#}


# NAT Gateways (ein NAT Gateway öffentliches Subnetz)
#resource "aws_nat_gateway" "backend" {
#  allocation_id = aws_eip.nat_gateway_eip.id
#  subnet_id     = aws_subnet.public.id
#
#  depends_on = [aws_internet_gateway.backend]
#
#  tags = {
#    Name = "NAT Gateway"
#  }
#}



# Sicherheitsgruppe für ALB
#resource "aws_security_group" "alb_security_group" {
#  name        = "alb-security-group"
#  description = "Security group for ALB"
#  vpc_id      = aws_vpc.backend.id
#
#  ingress {
#    from_port   = 80
#    to_port     = 80
#    protocol    = "tcp"
#    cidr_blocks = ["0.0.0.0/0"]
#  }
#
#  egress {
#    from_port   = 0
#    to_port     = 0
#    protocol    = "-1"
#    cidr_blocks = ["0.0.0.0/0"]
#  }
#}
