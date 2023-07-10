-- Creación de la tabla vendedor
CREATE TABLE vendedor (
  id_vendedor INT PRIMARY KEY,
  rut VARCHAR(12),
  nombre VARCHAR(100)
);

-- Inserción de datos en la tabla vendedor
INSERT INTO vendedor (id_vendedor, rut, nombre)
VALUES
  (1, '12345678-9', 'Juan Pérez'),
  (2, '98765432-1', 'María Gómez'),
  (3, '54678921-8', 'Pedro Rodríguez');

-- Creación de la tabla marca_auto
CREATE TABLE marca_auto (
  id_marca INT PRIMARY KEY,
  nombre VARCHAR(50)
);

-- Inserción de datos en la tabla marca_auto
INSERT INTO marca_auto (id_marca, nombre)
VALUES
  (1, 'Toyota'),
  (2, 'Nissan'),
  (3, 'Chevrolet'),
  (4, 'Ford'),
  (5, 'Volkswagen');

-- Creación de la tabla modelo_auto
CREATE TABLE modelo_auto (
  id_modelo INT PRIMARY KEY,
  nombre VARCHAR(50),
  id_marca INT,
  FOREIGN KEY (id_marca) REFERENCES marca_auto (id_marca)
);

-- Inserción de datos en la tabla modelo_auto
INSERT INTO modelo_auto (id_modelo, nombre, id_marca)
VALUES
  (1, 'Corolla', 1),
  (2, 'Yaris', 1),
  (3, 'Sentra', 2),
  (4, 'Altima', 2),
  (5, 'Cruze', 3),
  (6, 'Malibu', 3),
  (7, 'Focus', 4),
  (8, 'Mustang', 4),
  (9, 'Golf', 5),
  (10, 'Polo', 5);

-- Creación de la tabla solicitudes
CREATE TABLE solicitudes (
  id_solicitud INT PRIMARY KEY,
  rut VARCHAR(12),
  nombre VARCHAR(100),
  patente VARCHAR(10),
  marca VARCHAR(50),
  modelo VARCHAR(50),
  precio DECIMAL(10, 2),
  fecha_creacion DATETIME,
  id_vendedor INT,
  id_marca INT,
  id_modelo INT,
  FOREIGN KEY (id_vendedor) REFERENCES vendedor (id_vendedor),
  FOREIGN KEY (id_marca) REFERENCES marca_auto (id_marca),
  FOREIGN KEY (id_modelo) REFERENCES modelo_auto (id_modelo)
);

-- Inserción de datos en la tabla solicitudes
INSERT INTO solicitudes (id_solicitud, rut, nombre, patente, marca, modelo, precio, fecha_creacion, id_vendedor, id_marca, id_modelo)
VALUES
  (1, '12345678-9', 'Juan Pérez', 'ABC123', 'Toyota', 'Corolla', 15000.00, GETDATE(), 1, 1, 1),
  (2, '98765432-1', 'María Gómez', 'DEF456', 'Nissan', 'Sentra', 12000.00, GETDATE(), 2, 2, 3),
  (3, '54678921-8', 'Pedro Rodríguez', 'GHI789', 'Chevrolet', 'Cruze', 10000.00, GETDATE(), 3, 3, 5);