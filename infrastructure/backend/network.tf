# VPC Konfiguration
resource "aws_vpc" "backend" {
  cidr_block           = "10.0.0.0/16"
  enable_dns_hostnames = true
  enable_dns_support   = true

  tags = {
    Name = "Backend Netzwerk"
  }
}

# Öffentliche Subnetze (Multi-AZ)
resource "aws_subnet" "public" {
  vpc_id                  = aws_vpc.backend.id
  cidr_block              = "10.0.0.0/24"
  availability_zone       = "us-east-1a"
  map_public_ip_on_launch = true

  tags = {
    Name = "Öffentliches Subnetz"
  }
}

# Private Subnetze für Datenbank (Multi-AZ)
resource "aws_subnet" "private_db" {
  vpc_id            = aws_vpc.backend.id
  cidr_block        = "10.0.1.0/24"
  availability_zone = "us-east-1a"

  tags = {
    Name = "Privates Datenbank-Subnetz"
  }
}

# Private Subnetze für EC2 Instanzen
resource "aws_subnet" "private_app" {
  vpc_id            = aws_vpc.backend.id
  cidr_block        = "10.0.2.0/24"
  availability_zone = "us-east-1a"

  tags = {
    Name = "Privates App-Subnetz"
  }
}

# Elastic IP für NAT Gateway
resource "aws_eip" "nat_gateway_eip" {
  domain = "vpc"

  tags = {
    Name = "NAT Gateway EIP"
  }
}

# Internet Gateway
resource "aws_internet_gateway" "backend" {
  vpc_id = aws_vpc.backend.id

  tags = {
    Name = "Haupt-Internet-Gateway"
  }
}

# NAT Gateways (ein NAT Gateway öffentliches Subnetz)
resource "aws_nat_gateway" "backend" {
  allocation_id = aws_eip.nat_gateway_eip.id
  subnet_id     = aws_subnet.public.id

  depends_on = [aws_internet_gateway.backend]

  tags = {
    Name = "NAT Gateway"
  }
}

# Routing-Tabelle für öffentliche Subnetze
resource "aws_route_table" "public" {
  vpc_id = aws_vpc.backend.id

  route {
    cidr_block = "0.0.0.0/0"
    gateway_id = aws_internet_gateway.backend.id
  }

  tags = {
    Name = "Öffentliche Routing-Tabelle"
  }
}

# Routing-Tabellen-Assoziationen
resource "aws_route_table_association" "public" {
  subnet_id      = aws_subnet.public.id
  route_table_id = aws_route_table.public.id
}

# Sicherheitsgruppe für ALB
resource "aws_security_group" "alb" {
  name        = "alb-security-group"
  description = "Security group for ALB"
  vpc_id      = aws_vpc.backend.id

  ingress {
    from_port   = 80
    to_port     = 80
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  egress {
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }
}

# Sicherheitsgruppe für Datenbank
resource "aws_security_group" "database" {
  name        = "database-security-group"
  description = "Security group for database"
  vpc_id      = aws_vpc.backend.id

  ingress {
    from_port       = 5432
    to_port         = 5432
    protocol        = "tcp"
    security_groups = [aws_security_group.app.id]
  }

  egress {
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }
}