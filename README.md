# Formulario-TI-Vic-capital-humano
prueba técnica nuevos ingresos Entel. Esta aplicación está desarrollada utilizando React y SQL Server, pero la aplicación guarda en localStorag, no hay REST API para conectarlos.
# Solicitud N1: Rent-a-Car App
## Dependencias

La aplicación utiliza las siguientes dependencias:
- Node: version  >=18.15
- npm: version >=9.5.0
- React: versión >=17.0.2
- React Router DOM: versión >=5.3.0
- Styled Components: versión >=5.3.3
- Vite: versión >=2.6.3

## Cómo ejecutar la aplicación

Para ejecutar la aplicación, sigue estos pasos:

1. Clona el repositorio en tu máquina local.
2. Abre una terminal y navega hasta el directorio raíz del proyecto.
3. Ejecuta el siguiente comando para instalar las dependencias:

```
npm install
```
4. Una vez finalizada la instalación, ejecuta el siguiente comando para iniciar la aplicación:
```
npm run dev
```
5. La aplicación estará disponible en el siguiente enlace: [http://localhost:5173/](http://localhost:5173/).

## Solicitud N2: Script SQL

El archivo `script.sql` incluido en el directorio raíz del proyecto contiene el script para crear la base de datos necesaria para la aplicación Rent-a-Car. Este script crea las tablas, inserta los datos de ejemplo y crea los procedimientos almacenados para realizar consultas específicas.

Para ejecutar el script y configurar la base de datos, sigue estos pasos:

1. Asegúrate de tener un servidor SQL Server en funcionamiento y una base de datos creada.
2. Abre el archivo `script.sql` en tu editor de texto preferido.
3. Copia y pega el contenido del archivo `script.sql` en una ventana de consulta de tu herramienta de administración de bases de datos (por ejemplo, SQL Server Management Studio).
4. Ejecuta el script para crear las tablas, insertar los datos de ejemplo y crear los procedimientos almacenados.

Una vez que hayas ejecutado el script, la base de datos estará lista para ser utilizada.