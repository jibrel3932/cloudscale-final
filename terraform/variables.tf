variable "subscription_id" {
  description = "Azure subscription ID"
  type        = string
}

variable "student_name" {
  description = "Student name used in resource names and tags"
  type        = string
  default     = "JibrelAbubakrJibrel"
}

variable "location" {
  description = "Azure region"
  type        = string
  default     = "uksouth"
}

variable "acr_name" {
  description = "Globally-unique ACR name (lowercase alphanumeric only)"
  type        = string
  default     = "jibrelfinalacr3932"
}
