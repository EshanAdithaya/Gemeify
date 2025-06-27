-- Gemify Multivendor Database Setup
-- Run this script to create the database and initial data

-- Create database
CREATE DATABASE IF NOT EXISTS gemify_multivendor;
USE gemify_multivendor;

-- Create admin user (after running the application for the first time)
-- INSERT INTO users (id, email, firstName, lastName, password, role, status, isEmailVerified, createdAt, updatedAt)
-- VALUES (
--   UUID(),
--   'admin@gemify.com',
--   'Super',
--   'Admin',
--   '$2a$12$LQv3c1yqBwEHFLDwPDKHO.WfJFR1OqGhzDEh5W7f8z6StQvXvjL8W', -- password: admin123
--   'super_admin',
--   'active',
--   true,
--   NOW(),
--   NOW()
-- );

-- Sample categories (run after application starts)
-- INSERT INTO categories (id, name, slug, description, isActive, isFeatured, sortOrder, createdAt, updatedAt)
-- VALUES 
--   (UUID(), 'Diamonds', 'diamonds', 'Natural and synthetic diamonds', true, true, 1, NOW(), NOW()),
--   (UUID(), 'Rubies', 'rubies', 'Natural ruby gemstones', true, true, 2, NOW(), NOW()),
--   (UUID(), 'Sapphires', 'sapphires', 'Blue and fancy sapphires', true, true, 3, NOW(), NOW()),
--   (UUID(), 'Emeralds', 'emeralds', 'Natural emerald gemstones', true, true, 4, NOW(), NOW()),
--   (UUID(), 'Pearls', 'pearls', 'Cultured and natural pearls', true, false, 5, NOW(), NOW());

-- Note: Uncomment the INSERT statements after running the application
-- for the first time to let TypeORM create the tables.