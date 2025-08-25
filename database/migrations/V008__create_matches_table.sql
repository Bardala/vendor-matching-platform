-- Create matches table
CREATE TABLE IF NOT EXISTS `matches` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `project_id` INT NOT NULL,
  `vendor_id` INT NOT NULL,
  `score` DECIMAL(5, 2) NOT NULL,
  `is_notified` BOOLEAN DEFAULT FALSE,
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `uk_matches_project_vendor` (`project_id`, `vendor_id`),
  KEY `idx_matches_project_id` (`project_id`),
  KEY `idx_matches_vendor_id` (`vendor_id`),
  KEY `idx_matches_score` (`score`),
  CONSTRAINT `fk_matches_project_id` FOREIGN KEY (`project_id`) REFERENCES `projects` (`id`) ON DELETE CASCADE,
  CONSTRAINT `fk_matches_vendor_id` FOREIGN KEY (`vendor_id`) REFERENCES `vendors` (`id`) ON DELETE CASCADE
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_unicode_ci;