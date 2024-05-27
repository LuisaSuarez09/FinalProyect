CREATE DATABASE pruebafinal;

USE pruebafinal;

CREATE TABLE productos(
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(50) NOT NULL,
    descripction VARCHAR(50) NOT NULL,
);

SELECT * FROM productos;

CREATE USER 'pruebafinal'@'localhost' IDENTIFIED BY 'pruebafinal';
GRANT ALL PRIVILEGES ON *.* TO 'pruebafinal'@'localhost';