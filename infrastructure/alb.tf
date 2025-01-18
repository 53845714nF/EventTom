resource "aws_security_group" "alb_sg" {
  name        = "alb-security-group"
  description = "Security Group fuer Application Load Balancer"
  vpc_id      = aws_vpc.backend_vpc.id

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

resource "aws_lb" "main" {
  name               = "hauptlastverteiler"
  internal           = false
  load_balancer_type = "application"
  security_groups    = [aws_security_group.alb_sg.id]
  subnets            = [aws_subnet.public_subnet.id, aws_subnet.private_alb_subnet.id]

  depends_on = [ aws_internet_gateway.backend_vpc_gateway, aws_instance.web ]
}

# Target Group für ALB
resource "aws_lb_target_group" "main" {
  name     = "hauptzielgruppe"
  port     = 80
  protocol = "HTTP"
  vpc_id   = aws_vpc.backend_vpc.id

  health_check {
    path                = "/api/v1/utils/health-check/"
    protocol            = "HTTP"
    port                = 8000
    healthy_threshold   = 2
    unhealthy_threshold = 2
    timeout             = 5
    interval            = 10
    matcher             = "200"
  }
}

# Target Group Anhänge für EC2 Instanzen
resource "aws_lb_target_group_attachment" "web" {
  for_each         = var.web_instances
  target_group_arn = aws_lb_target_group.main.arn
  target_id        = aws_instance.web[each.key].id
  port             = 8000
}

# ALB Listener
resource "aws_lb_listener" "front_end" {
  load_balancer_arn = aws_lb.main.arn
  port              = "80"
  protocol          = "HTTP"

  default_action {
    type             = "forward"
    target_group_arn = aws_lb_target_group.main.arn
  }
}

output "alb_endpoint" {
  value = "http://${aws_lb.main.dns_name}"
}
