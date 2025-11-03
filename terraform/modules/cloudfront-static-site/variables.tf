# Variables for CloudFront Static Site Module

variable "bucket_name" {
  description = "Name of the S3 bucket for static website files"
  type        = string
}

variable "environment" {
  description = "Environment name (staging, production, etc.)"
  type        = string
}

variable "enable_versioning" {
  description = "Enable S3 bucket versioning for rollback capability"
  type        = bool
  default     = true
}

variable "cloudfront_price_class" {
  description = "CloudFront price class (PriceClass_All, PriceClass_200, PriceClass_100)"
  type        = string
  default     = "PriceClass_100"  # US, Canada, Europe (cheapest)
}

variable "tags" {
  description = "Tags to apply to all resources"
  type        = map(string)
  default     = {}
}
