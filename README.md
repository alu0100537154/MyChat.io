istemas y Tecnologías Web 2014-2015

#Proyecto Final: MyChat.io


###Objetivo
 
El objetivo de este proyecto ha sido crear un chat en el que se puedan comunicar varios usuarios en el cual también tengan la opción de comunicarse de manera privada mediante mensajes privados. 

###Descripción

Para acceder a la aplicación el usuario tendrá que darse de alta, si el usuario ya existe saltará un mensaje de error.

###Ramas

El repositorio está divido en varias ramas, para facilitar el desarrollo de la aplicación:

- *Master* es la rama principal de la aplicación, donde está todo el código de la aplicación de la última versión. Vendría a ser nuestra rama *release*.

- *Development* se usa para desarrollar nuevas funcionalidades para la aplicación, es decir versión inestable, sin necesidad de tocar el código que hay en master, para que dicho código permanezca sin cambios hasta que éstos sean definitivos.

- *Production*, es la rama con el código que está puesto en producción en [Heroku]
- *Gh-pages* contiene la documentación online de la aplicación. [Gh-Pages](http://alu0100537017.github.io/STW-Chat/).

#### Modo de empleo **manual**

Si se desea se puede descargar desde la rama master la aplicación para probarla en local, verla o modificarla al gusto de cada uno. Solo tiene que hacer:

  git clone https://github.com/alu0100537154/MyChat.io.git

Una vez descargada la aplicación
 
- Para correr la aplicación si tienes instalado gulp `$gulp` o simplemente `$node app.js`
- Iremos al puerto **localhost:8000** en nuestro navegador y ya podremos interactuar con la aplicación.

###Autores

- Víctor Juidías Rodríguez - alu0100537017
- Débora Martín-Pinillos Brito - alu0100537154
