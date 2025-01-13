CREATE DATABASE wedding_rsvp;

USE wedding_rsvp;

CREATE TABLE guests (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  email VARCHAR(100) NOT NULL,
  attending ENUM('yes', 'no') NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
