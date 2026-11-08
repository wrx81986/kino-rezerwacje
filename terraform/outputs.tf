
output "vpc_name" {
  description = "Nazwa sieci VPC"
  value       = google_compute_network.kino_vpc.name
}

output "app_subnet_name" {
  description = "Nazwa podsieci aplikacji"
  value       = google_compute_subnetwork.kino_app_subnet.name
}

output "db_subnet_name" {
  description = "Nazwa podsieci bazy danych"
  value       = google_compute_subnetwork.kino_db_subnet.name
}

output "app_subnet_cidr" {
  description = "Adresacja podsieci aplikacji"
  value       = google_compute_subnetwork.kino_app_subnet.ip_cidr_range
}

output "db_subnet_cidr" {
  description = "Adresacja podsieci bazy danych"
  value       = google_compute_subnetwork.kino_db_subnet.ip_cidr_range
}
