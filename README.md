<b>Coffe-Shop Konecta</b>
Software que se divide en varios módulos el cual permite garantizar la mejor experiencia de usuarios, divididos en la siguiente estructura:
1. Modulo de productos: permite la creación, edición y eliminación de productos del café.
2. Modulo de Venta: permite visualizar todas las ventas realizas y un botón de 'Detalle' en donde se muestra la especificación de cada venta.
3. Modulo de Generar venta: permite al usuario realizar la compra de varios productos del café en donde los productos seleccionados se añadirán a una tabla que mostrará
el resumen de la venta y se detallarán los artículos agregados y una vez completada la selección finaliza la compra. 


<b>Instalaciones necesarias:</b><br>
<b>Visual Studio Code:</b> https://code.visualstudio.com/download <br>
<b>Node:</b> https://nodejs.org/en v20.18.0 <br>
<b>Docker></b> https://www.docker.com/get-started/ <br>
<b>MongoDB</b> https://www.mongodb.com/try/download/compass v1.44.5 <br>

<b>Paso a paso:</b> <br><br>
1. <b>Ejecución de los paquetes en el bk:</b> npm install <br>
2. <b>Ejecución de los paquetes en el front:</b> npm install <br>
3. <b>Ejecución en el bk para docker:</b> docker compose up -d  y se verifica en el programa docker que exita la ejecución<br>
4. <b>Conexión a la bd:</b> Se selecciona 'new connection' y se proporciona la siguiente ruta en el campo denominado <b>'URL':</b> mongodb://kellydev:123456K@localhost:27017 en el campo denominado 'Name' se usa el nombre <b>mongoCoffe</b> y finalmente se selecciona el botón Save & Conect<br>
5. <b>Ejecución del proyecto en el bk:</b> npm run dev <br>
6. <b>Ejecución del proyecto en el front:</b> npm run dev <br>
