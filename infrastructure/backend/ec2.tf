resource "aws_security_group" "ec2_sg" {
  name        = "backend-security-group"
  description = "Security group for backend instances"
  vpc_id      = aws_vpc.backend.id

  ingress {
    from_port       = 80
    to_port         = 80
    protocol        = "tcp"
    security_groups = [aws_security_group.alb.id]
  }

  egress {
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }
}

resource "aws_instance" "web_1" {
  ami           = "ami-0e2c8caa4b6378d8c"  # Ubuntu
  instance_type = "t3.micro"
  subnet_id     = aws_subnet.public.id
  vpc_security_group_ids = [aws_security_group.ec2_sg.id]
  
  tags = {
    Name = "Webserver 1"
  }
  user_data = <<-EOF
  #!/bin/bash
  apt-get update -y && apt upgrade -y && apt install docker-ce
  EOF
}

resource "aws_instance" "web_2" {
  ami           = "ami-0e2c8caa4b6378d8c"  # Ubuntu
  instance_type = "t3.micro"
  subnet_id     = aws_subnet.public.id
  vpc_security_group_ids = [aws_security_group.ec2_sg.id]
  
  tags = {
    Name = "Webserver 2"
  }
  user_data = <<-EOF
  #!/bin/bash
  apt-get update -y && apt upgrade -y && apt install docker-ce
  EOF
}
