
variable "project_id" {
  description = "ID projektu Google Cloud"
  type        = string
  default     = "kino-rezerwacje"
}

variable "region" {
  description = "Region Google Cloud"
  type        = string
  default     = "europe-central2"
}

variable "app_subnet_cidr" {
  description = "Adresacja podsieci aplikacji"
  type        = string
  default     = "10.0.1.0/24"
}

variable "db_subnet_cidr" {
  description = "Adresacja podsieci bazy danych"
  type        = string
  default     = "10.0.2.0/24"
}
