CREATE DATABASE pruebafinal;

USE pruebafinal;

/* ------------ Para crear la tabla productos en la base de datos ----------- */

CREATE TABLE productos(
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(50) NOT NULL,
    descripction VARCHAR(50) NOT NULL,
);

SELECT * FROM productos;

CREATE USER 'pruebafinal'@'localhost' IDENTIFIED BY 'pruebafinal';
GRANT ALL PRIVILEGES ON *.* TO 'pruebafinal'@'localhost';

/* ------------ Para crear la tabla precios en la base de datos ----------- */


CREATE TABLE precios(
    id INT AUTO_INCREMENT PRIMARY KEY,
    nameplan VARCHAR(50) NOT NULL,
    precioplan VARCHAR(50) NOT NULL,
    timeplan INT
);

SELECT * FROM precios;
