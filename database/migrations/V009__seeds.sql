-- ========================
-- Expanded Seed Data for VendorMatchingPlatform
-- Created: 2025-08-27
-- ========================
-- Clients
INSERT INTO
  clients (company_name, contact_email)
VALUES
  ('TechStars', 'founder@techstars.com'),
  ('GreenFoods', 'info@greenfoods.com'),
  ('EduGlobal', 'contact@eduglobal.org');

-- Users
INSERT INTO
  users (email, password_hash, role, client_id)
VALUES
  (
    'admin@vendormatching.com',
    '$2b$12$0fwyLnpyax11prigcfgW7ebqoWk257FW0/14xTn8LoP21AnVT7tVK',
    'admin',
    NULL
  ),
  (
    'client1@techstars.com',
    '$2b$12$0fwyLnpyax11prigcfgW7ebqoWk257FW0/14xTn8LoP21AnVT7tVK',
    'client',
    1
  ),
  (
    'client2@greenfoods.com',
    '$2b$12$0fwyLnpyax11prigcfgW7ebqoWk257FW0/14xTn8LoP21AnVT7tVK',
    'client',
    2
  ),
  (
    'client3@eduglobal.org',
    '$2b$12$0fwyLnpyax11prigcfgW7ebqoWk257FW0/14xTn8LoP21AnVT7tVK',
    'client',
    3
  );

-- Services
INSERT INTO
  services (name)
VALUES
  ('marketing'),
  ('legal'),
  ('logistics'),
  ('recruitment'),
  ('translation');

-- Vendors
INSERT INTO
  vendors (
    name,
    countries_supported,
    rating,
    response_sla_hours,
    is_active 
  )
VALUES
  (
    'Dubai Legal Experts',
    JSON_ARRAY('UAE'),
    4.8,
    12,
    TRUE
  ),
  (
    'MENA Marketing Hub',
    JSON_ARRAY('UAE', 'KSA'),
    4.5,
    24,
    TRUE
  ),
  (
    'Saudi Logistics Co',
    JSON_ARRAY('KSA'),
    4.2,
    36,
    TRUE
  ),
  (
    'Cairo Recruitment Agency',
    JSON_ARRAY('EGY'),
    4.0,
    48,
    TRUE
  ),
  (
    'Global Translations',
    JSON_ARRAY('UAE', 'KSA', 'EGY'),
    4.6,
    20,
    TRUE
  ),
  (
    'Low Quality Vendor',
    JSON_ARRAY('UAE'),
    2.5,
    72,
    TRUE
  ),
  (
    'Inactive Vendor',
    JSON_ARRAY('KSA'),
    4.0,
    24,
    FALSE
  );
  
-- Vendor Services (junction)
INSERT INTO
  vendor_services (vendor_id, service_id)
VALUES
  (1, 2),
  -- Dubai Legal Experts → legal
  (2, 1),
  -- MENA Marketing Hub → marketing
  (3, 3),
  -- Saudi Logistics Co → logistics
  (4, 4),
  -- Cairo Recruitment Agency → recruitment
  (5, 5),
  -- Global Translations → translation
  (6, 1),
  -- Low Quality Vendor → marketing
  (6, 2),
  -- Low Quality Vendor → legal
  (7, 3);
  -- Inactive Vendor → logistics

-- Projects
INSERT INTO
  projects (client_id, country, budget, status)
VALUES
  (1, JSON_ARRAY('UAE'), 20000.00, 'active'),
  -- TechStars wants expansion to UAE
  (2, JSON_ARRAY('KSA'), 50000.00, 'active'),
  -- GreenFoods wants expansion to KSA
  (3, JSON_ARRAY('EGY'), 30000.00, 'active');
  -- EduGlobal wants expansion to Egypt

-- Project Services (junction)
INSERT INTO
  project_services (project_id, service_id)
VALUES
  (1, 1),
  (1, 2),
  -- Project 1 needs marketing + legal
  (2, 2),
  (2, 3),
  -- Project 2 needs legal + logistics
  (3, 4),
  (3, 5);
-- Project 3 needs recruitment + translation

-- Matches (initial demo data, It may be re - calculated in /matches/rebuild)
INSERT INTO
  matches (project_id, vendor_id, score, is_notified)
VALUES
  (1, 1, 9.80, FALSE),
  -- Project 1 matched with Dubai Legal Experts (legal in UAE ✅)
  (1, 2, 8.50, FALSE),
  -- Project 1 matched with MENA Marketing Hub (marketing in UAE ✅)
  (1, 6, 4.00, FALSE),
  -- Low Quality Vendor (low score because rating low)
  (2, 3, 7.50, FALSE),
  -- Project 2 matched with Saudi Logistics (logistics in KSA ✅)
  (2, 2, 6.00, FALSE),
  -- MENA Marketing Hub matches partially (marketing only overlap, lower score)
  (2, 7, 0.00, FALSE),
  -- Inactive Vendor (should be ignored by system logic ❌)
  (3, 4, 8.00, FALSE),
  -- EduGlobal → Cairo Recruitment Agency (recruitment in EGY ✅)
  (3, 5, 8.70, FALSE);
  -- EduGlobal → Global Translations (translation in EGY ✅)