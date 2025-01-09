variable "domain" {
  type      = string
  default = "localhost"
}

variable "frontend_host" {
  type      = string
  default = "http://frontend-event-tom.s3-website-us-east-1.amazonaws.com"
}

variable "backend_cors_origins" {
  type      = string
  default = "http://localhost,http://localhost:5173,https://localhost,https://localhost:5173,http://frontend-event-tom.s3-website-us-east-1.amazonaws.com"
}

variable "secret_key" {
  type = string
  default = "ThisIsASecretKeyForTesting"
}

variable "first_superuser" {
  type = string
  default = "admin@me.com"
}

variable "first_superuser_password" {
  type = string
  default = "admin1234"
}

variable "database_name" {
  type      = string
  default = "app"
}

variable "database_username" {
  type      = string
  default = "postgres"
}

variable "database_password" {
  type      = string
  default = "postgres"
}