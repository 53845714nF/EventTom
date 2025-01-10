resource "aws_security_group" "ec2_sg" {
  name        = "backend-security-group"
  description = "Security group for backend instances"
  vpc_id      = aws_vpc.backend_vpc.id

  ingress {
    from_port   = 8000
    to_port     = 8000
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  ingress {
    from_port   = 22
    to_port     = 22
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

resource "aws_key_pair" "ssh_key_web" {
  key_name   = "ssh_key_web"
  public_key = "ssh-ed25519 AAAAC3NzaC1lZDI1NTE5AAAAIJiql7d0CSa2ZPbjOdANj40oyBHgbPpbrO/pPkjUy5ua"
}


variable "web_instances" {
  default = {
    web1 = "10.0.0.5" # 1,2,3 von AWS belegt
    web2 = "10.0.0.6"
  }
}

resource "aws_instance" "web" {
  for_each = var.web_instances

  ami                    = "ami-0e2c8caa4b6378d8c" # Ubuntu
  instance_type          = "t3.micro"
  subnet_id              = aws_subnet.public_subnet.id
  vpc_security_group_ids = [aws_security_group.ec2_sg.id]
  private_ip             = each.value
  key_name               = aws_key_pair.ssh_key_web.key_name

  tags = {
    Name = "Webserver ${each.key}"
  }

  # Install Docker
  # Setup Database
  # Run App
  user_data = <<-EOF
  #!/bin/bash
  apt-get update -y && apt upgrade -y && apt install docker.io -y
  docker run --name prestart \
  -e DOMAIN="${var.domain}" \
  -e PROJECT_NAME="EventTom" \
  -e FRONTEND_HOST="${var.frontend_host}" \
  -e ENVIRONMENT="production" \
  -e BACKEND_CORS_ORIGINS="${var.backend_cors_origins}" \
  -e SECRET_KEY="${var.secret_key}" \
  -e FIRST_SUPERUSER="${var.first_superuser}" \
  -e FIRST_SUPERUSER_PASSWORD="${var.first_superuser_password}" \
  -e POSTGRES_SERVER="${element(split(":", aws_db_instance.database.endpoint), 0)}" \
  -e POSTGRES_PORT="5432" \
  -e POSTGRES_DB="${var.database_name}" \
  -e POSTGRES_USER="${var.database_username}" \
  -e POSTGRES_PASSWORD="${var.database_password}" \
  --restart no \
  ghcr.io/53845714nf/eventtom/backend:latest \
  bash scripts/prestart.sh
  
  docker run -d \
  --restart="always" \
  -e DOMAIN="${var.domain}" \
  -e PROJECT_NAME="EventTom" \
  -e FRONTEND_HOST="${var.frontend_host}" \
  -e ENVIRONMENT="production" \
  -e BACKEND_CORS_ORIGINS="${var.backend_cors_origins}" \
  -e SECRET_KEY="${var.secret_key}" \
  -e FIRST_SUPERUSER="${var.first_superuser}" \
  -e FIRST_SUPERUSER_PASSWORD="${var.first_superuser_password}" \
  -e POSTGRES_SERVER="${element(split(":", aws_db_instance.database.endpoint), 0)}" \
  -e POSTGRES_PORT="5432" \
  -e POSTGRES_DB="${var.database_name}" \
  -e POSTGRES_USER="${var.database_username}" \
  -e POSTGRES_PASSWORD="${var.database_password}" \
  -p 8000:8000 \
  ghcr.io/53845714nf/eventtom/backend:latest
  EOF

  depends_on = [aws_db_instance.database]
}


output "db_endpoint" {
  value = element(split(":", aws_db_instance.database.endpoint), 0)
}
