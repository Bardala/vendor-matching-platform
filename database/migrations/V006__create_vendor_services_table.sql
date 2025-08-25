-- Create vendor_services junction table
CREATE TABLE IF NOT EXISTS `vendor_services` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `vendor_id` INT NOT NULL,
  `service_id` INT NOT NULL,
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `uk_vendor_services` (`vendor_id`, `service_id`),
  KEY `idx_vendor_services_vendor_id` (`vendor_id`),
  KEY `idx_vendor_services_service_id` (`service_id`),
  CONSTRAINT `fk_vendor_services_vendor_id` FOREIGN KEY (`vendor_id`) REFERENCES `vendors` (`id`) ON DELETE CASCADE,
  CONSTRAINT `fk_vendor_services_service_id` FOREIGN KEY (`service_id`) REFERENCES `services` (`id`) ON DELETE CASCADE
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_unicode_ci;