# Security Group für RDS Datenbank
resource "aws_security_group" "db_sg" {
  name        = "db-security-group"
  description = "Security Group fuer RDS Datenbank"
  vpc_id      = aws_vpc.backend_vpc.id

  ingress {
    from_port       = 5432
    to_port         = 5432
    protocol        = "tcp"
    cidr_blocks     = []
    security_groups = [aws_security_group.ec2_sg.id] # Nur Webserver erlauben
  }

   egress {
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }
}

# RDS Datenbank-Subnetzgruppe
resource "aws_db_subnet_group" "db_subnet_group" {
  name       = "hauptdatenbanksubnetzgruppe"
  subnet_ids = [aws_subnet.private_db_subnet_a.id, aws_subnet.private_db_subnet_b.id]
}

# RDS PostgreSQL Datenbank
resource "aws_db_instance" "database" {
  identifier           = "database"
  engine              = "postgres"
  engine_version      = "17"
  instance_class      = "db.t3.micro"
  allocated_storage   = 20
  storage_type        = "gp2"
  db_name             = var.database_name
  username            = var.database_username
  password            = var.database_password
  db_subnet_group_name      = aws_db_subnet_group.db_subnet_group.name
  vpc_security_group_ids    = [aws_security_group.db_sg.id]
  skip_final_snapshot       = true
}