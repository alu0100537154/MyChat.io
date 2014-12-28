***Sistemas y Tecnologías Web 2014-2015***

#Proyecto Final: MyChat.io


###Objetivo
 
El objetivo de este proyecto es crear un chat usando [Node.js](http://nodejs.org/) y [Socket.io](http://socket.io/), en el que se puedan comunicar varios usuarios de manera concurrente y que también tiene la posibilidad de mandar mensajes privados a otro usuario.

###Descripción

Para acceder a la aplicación habrá que registrarse con un nombre de usuario, si el nombre de usuario escogido ya existe, saltará un mensaje de error.

###Ramas

El repositorio está divido en varias ramas, para facilitar el desarrollo de la aplicación:

- *Master* es la rama principal de la aplicación, donde está todo el código de la aplicación de la última versión.

- Las ramas *desarrollo*, *oauth* y *test-oauth*, son de una versión, aún no acabada, de la misma aplicación pero usando [Passport.js](http://passportjs.org/), el protocolo Oauth y MongoDB para registrarte en el chat con las credenciales de tu cuenta de Google.

- *Gh-pages* contiene la documentación online de la aplicación. [Gh-Pages](http://alu0100537154.github.io/MyChatio).

#### Despliegue
El despliegue de la aplicación se ha hecho usando [NodeJitsu](https://www.nodejitsu.com/), que es una plataforma parecida a [Heroku](https://id.heroku.com/login), pero especializada en projectos basados en Node.js.
- [Accede a MyChat.io](http://victjr-example_chat_socket.io.nodejitsu.com)

#### Modo de empleo manual

Si desea probar la aplicación en local, para ver el código, modificarla o lo que sea, siga estos pasos:
- Clone el repositorio en su máquina:
`$ git clone https://github.com/alu0100537154/MyChatio.git`

Una vez descargada, la aplicación require que esté instalado:
- [Node.js](http://nodejs.org/download/)
- [Npm](https://www.npmjs.com/)
- [Gulp](http://gulpjs.com/) (opcional)

Seguidamente en el directorio de nuestro proyecto, debemos ejecutar `$ npm install` para instalar todas las dependencias de nuestro proyecto. Se instalarán dentro de la carpeta *node_modules* en la carpeta raíz.

Para ejecutar la aplicación:
- Esctibiremos en una terminal `$ node app.js`
- Si tenemos instalado *gulp*, simplemente escribimos `$ gulp`

Iremos al puerto **localhost:8000** en nuestro navegador y ya podremos interactuar con la aplicación.

###Autores

- Víctor Juidías Rodríguez - alu0100537017
- Débora Martín-Pinillos Brito - alu0100537154
