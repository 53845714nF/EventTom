# Security Group für RDS Datenbank
resource "aws_security_group" "db_security_group" {
  name        = "db-security-group"
  description = "Security Group für RDS Datenbank"
  vpc_id      = aws_vpc.backend_vpc.id

  ingress {
    from_port   = 5432
    to_port     = 5432
    protocol    = "tcp"
    cidr_blocks = [aws_subnet.private_db_subnet.cidr_block]
  }
}

# Security Group für Lambda
resource "aws_security_group" "lambda_security_group" {
  name        = "lambda-security-group"
  description = "Security Group für Lambda Function"
  vpc_id      = aws_vpc.backend_vpc.id

  egress {
    from_port   = 5432
    to_port     = 5432
    protocol    = "tcp"
    cidr_blocks = [aws_subnet.private_db_subnet.cidr_block]
  }
}

# RDS Datenbank-Subnetzgruppe
resource "aws_db_subnet_group" "database_subnet_group" {
  name       = "hauptdatenbanksubnetzgruppe"
  subnet_ids = [aws_subnet.private_db_subnet.id]
}

# RDS PostgreSQL Datenbank
resource "aws_db_instance" "database" {
  identifier           = "database"
  engine              = "postgres"
  engine_version      = "17"
  instance_class      = "db.t3.micro"
  allocated_storage   = 20
  storage_type        = "gp2"
  db_name             = "app"
  username            = "postgres"
  password            = "postgres"
  db_subnet_group_name      = aws_db_subnet_group.database_subnet_group.name
  vpc_security_group_ids    = [aws_security_group.db_security_group.id]
  skip_final_snapshot       = true
}

# IAM Role für Lambda
resource "aws_iam_role" "lambda_role" {
  name = "db-init-lambda-role"

  assume_role_policy = jsonencode({
    Version = "2012-10-17"
    Statement = [
      {
        Action = "sts:AssumeRole"
        Effect = "Allow"
        Principal = {
          Service = "lambda.amazonaws.com"
        }
      }
    ]
  })
}

# IAM Policy für Lambda VPC Zugriff
resource "aws_iam_role_policy_attachment" "lambda_vpc_policy" {
  role       = aws_iam_role.lambda_role.name
  policy_arn = "arn:aws:iam::aws:policy/service-role/AWSLambdaVPCAccessExecutionRole"
}

# Lambda Function
resource "aws_lambda_function" "db_init" {
  filename         = "db_init.zip"
  function_name    = "db-init"
  role            = aws_iam_role.lambda_role.arn
  handler         = "index.handler"
  runtime         = "nodejs18.x"

  vpc_config {
    subnet_ids         = [aws_subnet.private_db_subnet.id]
    security_group_ids = [aws_security_group.lambda_security_group.id]
  }

  environment {
    variables = {
      DB_HOST     = aws_db_instance.database.endpoint
      DB_USER     = aws_db_instance.database.username
      DB_PASSWORD = aws_db_instance.database.password
      DB_NAME     = aws_db_instance.database.db_name
    }
  }

  depends_on = [
    aws_db_instance.database,
    aws_iam_role_policy_attachment.lambda_vpc_policy
  ]
}