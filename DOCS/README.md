# Documentacion proyecto full stack ZTechnology 💻
---
## Objetivo general
El objetivo general de este proyecto es crear un aplicativo web que cumpla con los requerimientos de la empresa ZTechnology, para que esta pueda tener un CRM a medida que sera usada en la nube.

## Descripcion del proyecto:
De acuerdo al requerimiento de la empresa ZTechnology, solicitan crear un aplicativo web que cumpla con los siguientes requerimientos: 

- Implemetar un CRM a medida que sera usada en la nube
- Debe permitir el gestionamiento de usuarios, cotizaciones y clientes
- Debe contener un login para el inicio de sesion y administrado mendiante roles (Administrador | Gestor)

### Especificaciones del proyecto:

#### *Front End:*
- Front End debe ser desarrollada en el lenguaje de programacion JavaScript 
- Front End debe ser desarrollada en el framework React JS
- Consumo de API REST
- UI components (Ant Desing)
- Graficas de ApexChart
- Rutas de React router dom 
#### *Back End:*
- Lenguaje de programacion Node JS
- El framework express
- Conexion a la base de datos Sequelize 
- Autenticacion JWT (json web token)
- Encriptacion de contraseña con Bcrypt JS
- API REST
#### *Base de datos:*
- MySQL


### Funcionalidad del back end 
- En esta funcion se muestran los usuarios de la base de ya registrados en mysql y que todos tengan un estado activo(1) 

![](image.png)

- La consulta devuelve un json con los datos de los usuarios y el estado de la consulta

![](image-1.png)

### Funcionalidad del front end
- En el componente de react se muestra la lista de usuarios registrados en la base de datos

![alt text](image-2.png)


### Estructura del back end
para el desarrollo del proyecto ordenado se manejo mediante carpetas separando sus archivos para evitar confuciones y el cliente entienda el codigo

```
└── 📁BackEnd
    └── .env
    └── .gitignore
    └── app.ts
    └── 📁controllers
        └── auth.ts
        └── client.ts
        └── order.ts
        └── product.ts
        └── role.ts
        └── user.ts
    └── 📁db
        └── conection.ts
    └── 📁helpers
        └── generateJWT.ts
        └── multer.ts
    └── 📁http
        └── auth.http
        └── client.http
        └── order.http
        └── product.http
        └── role.http
        └── users.http
    └── 📁models
        └── client.ts
        └── order.ts
        └── product.ts
        └── role.ts
        └── server.ts
        └── user.ts
    └── package-lock.json
    └── package.json
    └── 📁routes
        └── auth.ts
        └── client.ts
        └── order.ts
        └── product.ts
        └── role.ts
        └── user.ts
    └── 📁test
        └── sales.test.ts
        └── sum.test.ts
    ├── uploads
```

# Despliegue
Para el despliegue del proyecto se utilizo el servicio de railway, el cual es un servicio de alojamiento de aplicaciones web, el cual nos permite desplegar nuestra aplicacion en un servidor de manera rapida y sencilla.

## Preparativos para inicializar el proyecto
- El srcipt de la base de datos mySQL se encuentra en la raiz del proyecto para descargar y ejecutar en local **_[Script_mySQL](/DOCS/Ztecnology-app.sql)_**

- Si no tienes instalado la aplicacion de mySQL , puedes descargarlo desde el siguiente **_[enlace](https://dev.mysql.com/downloads/mysql/)_** 

- Se debe clonar o descargar el repositorio de git hub
- Se ingresa a la ruta de la carpeta del proyecto, en VScode y se abre la terminal para instalar las dependecias
- Crea un archivo .env en la raiz del proyecto
- Configura las variables de entorno segun tus necesidades en el archivo .env
```
PORT = ''
SECRET_PRIVATE_KEY = ''
DB_NAME = ''
DB_USER = ''
DB_HOST = ''
DB_PASSWORD = ''
```


## Instalacion de dependencias global
- Se debe instalar las dependencias del proyecto tanto en el fron como el back con el comando npm install
```
npm i
```
- Luego de instalar las dependencias se debe ejecutar el comando npm run dev para iniciar el proyecto por separado tanto para el front como para el back
```
npm run dev
```

#### Proyecto inicializado fornt end
Cuando se ejecuta el comando npm run dev se inicia el proyecto en el puerto por defecto 👇

![](image-3.png) 

#### Proyecto inicializado back end
Cuando se ejecuta el comando npm run dev se inicia el proyecto en el puerto indicado en la variable de entorno PORT

![alt text](image-4.png)

## Desplegado
![alt text](image-5.png)

![alt text](image-6.png)
