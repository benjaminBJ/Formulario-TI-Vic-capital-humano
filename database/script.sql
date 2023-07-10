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

-- Generar registros de prueba para solicitudes
DECLARE @startDate DATETIME = '2023-01-01'
DECLARE @endDate DATETIME = '2023-07-31'

WHILE @startDate <= @endDate
BEGIN
  -- Generar una solicitud aleatoria para cada día en el rango de fechas
  INSERT INTO solicitudes (rut, nombre, patente, marca, modelo, precio, fecha_creacion, id_vendedor, id_marca, id_modelo)
  SELECT TOP 1
    v.rut,
    v.nombre,
    CONCAT(UPPER(LEFT(NEWID(), 3)), CAST(ABS(CHECKSUM(NEWID())) % 10000 AS VARCHAR(4))) AS patente,
    ma.nombre AS marca,
    mo.nombre AS modelo,
    ROUND(RAND() * 10000, 2) AS precio,
    DATEADD(DAY, DATEDIFF(DAY, 0, @startDate), 0) AS fecha_creacion,
    v.id_vendedor,
    mo.id_marca,
    mo.id_modelo
  FROM vendedor v
  CROSS JOIN marca_auto ma
  CROSS JOIN modelo_auto mo
  WHERE NOT EXISTS (
    SELECT 1
    FROM solicitudes s
    WHERE s.fecha_creacion = DATEADD(DAY, DATEDIFF(DAY, 0, @startDate), 0)
  )
  
  SET @startDate = DATEADD(DAY, 1, @startDate)
END

-- Obtener las 3 marcas más solicitadas
CREATE PROCEDURE ObtenerMarcasMasSolicitadas
AS
BEGIN
  SELECT TOP 3
    ma.nombre AS Marca,
    COUNT(*) AS CantidadSolicitudes
  FROM solicitudes s
  INNER JOIN marca_auto ma ON s.id_marca = ma.id_marca
  GROUP BY ma.nombre
  ORDER BY COUNT(*) DESC
END

-- Obtener solicitudes del mes actual
CREATE PROCEDURE ObtenerSolicitudesMesActual
AS
BEGIN
  DECLARE @startDate DATETIME = DATEADD(MONTH, DATEDIFF(MONTH, 0, GETDATE()), 0)
  DECLARE @endDate DATETIME = DATEADD(MONTH, DATEDIFF(MONTH, 0, GETDATE()) + 1, 0)

  SELECT *
  FROM solicitudes
  WHERE fecha_creacion >= @startDate AND fecha_creacion < @endDate
END

-- Obtener el vendedor que menos solicitudes haya generado en los últimos 30 dias
CREATE PROCEDURE ObtenerVendedorMenosSolicitudesUltimos30Dias
AS
BEGIN
  SELECT TOP 1
    v.nombre AS Vendedor,
    COUNT(*) AS CantidadSolicitudes
  FROM solicitudes s
  INNER JOIN vendedor v ON s.id_vendedor = v.id_vendedor
  WHERE s.fecha_creacion >= DATEADD(DAY, -30, GETDATE())
  GROUP BY v.nombre
  ORDER BY COUNT(*) ASC
END

-- Obtener modelos sin solicitudes
CREATE PROCEDURE ObtenerModelosSinSolicitudes
AS
BEGIN
  SELECT *
  FROM modelo_auto mo
  WHERE NOT EXISTS (
    SELECT 1
    FROM solicitudes s
    WHERE s.id_modelo = mo.id_modelo
  )
END

-- Obtener 3 meses con más dinero en ventas
CREATE PROCEDURE ObtenerMesesConMasDineroVentas
AS
BEGIN
  SELECT TOP 3
    DATENAME(MONTH, fecha_creacion) + ' ' + CAST(DATEPART(YEAR, fecha_creacion) AS VARCHAR(4)) AS Mes,
    SUM(precio) AS TotalVentas
  FROM solicitudes
  GROUP BY DATENAME(MONTH, fecha_creacion), DATEPART(YEAR, fecha_creacion)
  ORDER BY SUM(precio) DESC
END

