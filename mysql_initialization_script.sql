CREATE DATABASE IF NOT EXISTS api_db;
USE api_db;

DROP TABLE IF EXISTS patients;
CREATE TABLE patients(
	id INT NOT NULL PRIMARY KEY AUTO_INCREMENT UNIQUE,
    name VARCHAR(255) NOT NULL,
    phone_number VARCHAR(20) NOT NULL,
    disease_type VARCHAR(255),
    created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE = InnoDB DEFAULT CHARSET = latin1;

