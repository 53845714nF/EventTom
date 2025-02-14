# Build and Deploy
resource "null_resource" "frontend_build" {
  triggers = {
    always_run = "${timestamp()}"
  }

  provisioner "local-exec" {
    command = <<-EOT
      cd ../frontend
      echo "VITE_BACKEND_URL='http://${aws_lb.main.dns_name}'\nVITE_WEBSOCKET_URL='ws://${aws_lb.main.dns_name}'" > .env.production
      npm install && npm run build || exit 1
      test -d dist || exit 1
    EOT
  }

  depends_on = [aws_lb.main]
}

resource "aws_s3_bucket" "frontend" {
  bucket     = "frontend-event-tom"
  depends_on = [null_resource.frontend_build]
}

resource "aws_s3_bucket_website_configuration" "frontend" {
  bucket = aws_s3_bucket.frontend.id
  index_document {
    suffix = "index.html"
  }
  depends_on = [null_resource.frontend_build]
}

# S3 Rechte, wird gebarucht zum hochladen
resource "aws_s3_bucket_public_access_block" "frontend" {
  bucket                  = aws_s3_bucket.frontend.id
  block_public_acls       = false
  block_public_policy     = false
  ignore_public_acls      = false
  restrict_public_buckets = false
}

resource "aws_s3_bucket_policy" "frontend" {
  bucket = aws_s3_bucket.frontend.id
  policy = jsonencode({
    Version = "2012-10-17"
    Statement = [{
      Sid       = "PublicReadGetObject"
      Effect    = "Allow"
      Principal = "*"
      Action    = "s3:GetObject"
      Resource  = "${aws_s3_bucket.frontend.arn}/*"
    }]
  })
  depends_on = [aws_s3_bucket.frontend, aws_s3_bucket_public_access_block.frontend]
}

resource "aws_s3_object" "frontend_files" {
  for_each = fileset("../frontend/dist", "**/*")

  bucket = aws_s3_bucket.frontend.id
  key    = each.key
  source = "../frontend/dist/${each.key}"
  content_type = lookup({
    "html" = "text/html",
    "css"  = "text/css",
    "js"   = "application/javascript",
    "png"  = "image/png",
    "jpg"  = "image/jpeg",
    "svg"  = "image/svg+xml"
    "ttf"  = "font/ttf"
    "ico"  = "image/x-icon"
  }, split(".", each.key)[length(split(".", each.key)) - 1], "application/octet-stream")

  depends_on = [null_resource.frontend_build, aws_s3_bucket_policy.frontend]
}

output "s3_url" {
  value = "http://${aws_s3_bucket_website_configuration.frontend.website_endpoint}"
}
