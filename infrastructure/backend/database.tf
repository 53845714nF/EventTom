# Security Group für RDS Datenbank
resource "aws_security_group" "db_sg" {
  name        = "db-security-group"
  description = "Security Group für RDS Datenbank"
  vpc_id      = aws_vpc.backend.id
  
  ingress {
    from_port       = 5432  # PostgreSQL Port
    to_port         = 5432
    protocol        = "tcp"
    security_groups = [aws_security_group.ec2_sg.id]
  }
}

# RDS Datenbank-Subnetzgruppe
resource "aws_db_subnet_group" "database_subnet_group" {
  name       = "hauptdatenbanksubnetzgruppe"
  subnet_ids = [aws_subnet.private_db.id]
}

# RDS PostgreSQL Datenbank
resource "aws_db_instance" "database" {
  identifier           = "database"
  engine               = "postgres"
  engine_version       = "13.7"
  instance_class       = "db.t3.micro"
  allocated_storage    = 20
  storage_type         = "gp2"
  db_name              = "app"
  username             = "dbadmin"
  password             = "CHANGEME_SECURE_PASSWORD!"
  
  db_subnet_group_name = aws_db_subnet_group.database_subnet_group.name
  vpc_security_group_ids = [aws_security_group.db_sg.id]
  
  skip_final_snapshot  = true
}