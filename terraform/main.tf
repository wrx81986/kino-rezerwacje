
terraform {
  required_providers {
    google = {
      source  = "hashicorp/google"
      version = "~> 6.0"
    }
  }
}

provider "google" {
  project = var.project_id
  region  = var.region
}

resource "google_compute_network" "kino_vpc" {
  name                    = "kino-vpc"
  auto_create_subnetworks = false
}

resource "google_compute_subnetwork" "kino_app_subnet" {
  name          = "kino-app-subnet"
  ip_cidr_range = var.app_subnet_cidr
  region        = var.region
  network       = google_compute_network.kino_vpc.id
}

resource "google_compute_subnetwork" "kino_db_subnet" {
  name          = "kino-db-subnet"
  ip_cidr_range = var.db_subnet_cidr
  region        = var.region
  network       = google_compute_network.kino_vpc.id
}
