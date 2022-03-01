# Base Proyect* Sass


Este es un proyecto base para **Frontend**, como para **maquetar** un sitio web.

Utiliza** [Gulp](https://gulpjs.com/ "Gulp")** como automatizador de tareas. Adicionalmente trae los siguientes extras:

### Sass
Utiliza [Sass](https://sass-lang.com/ "Sass") como preprocesador de CSS, de esta forma podrás tener varios módulos para cada uno de los componentes de la página web.

### Optimizador de Imagenes
Podrás optimizar las imágenes (.jpg, .png, .gif y .svg) comprimiendo su tamaño, pero manteniendo gran calidad.

### Browser Sync
Se usará [browser-sync](https://browsersync.io/ "browser-sync"), un servidor estático, que te permitirá ver los cambios que hagas en el código, en tiempo real en el navegador, y sincronizar el scroll y eventos tanto en navegadores de escritorio y móviles.

## Empezando:
1. Para empezar, crea la carpeta de tu nuevo proyecto:
 `mkdir new-project-name && cd $_`
 
2. Clona base-proyect-sass en la nueva carpeta:
`git clone --depth=1 https://github.com/landinezrichard/base-proyect-sass.git . && rm -rf ./.git`

3. Instala las herramientas de desarrollo:
`npm i`

4. No olvidar realizar el control de versiones con:
`git init`


**Nota**: cambiar el nombre del proyecto y el repositorio en el archivo ***"package.json"***

Y** listo!!!** ya estas preparado para empezar a maquetar.

## :tw-1f4c2: Scaffolding:

Tu proyecto tendrá la siguiente estructura:

- frontend-project/      --> Carpeta raíz del proyecto
  - .git/                          --> Carpeta oculta de datos de git
  - node_modules/       -->Carpeta de paquetes de Node/NPM
  - dist/                 --> Carpeta de código generado (cuando se usan preprocesadores)
  - src/                  --> Carpeta de código fuente (código editable)
    - assets/             --> Carpeta de estáticos (imágenes, audio, video, fuentes...)
    - js/                 --> Carpeta de Javascript
      - app.js
    - sass/                --> Carpeta de archivos Sass
      - estilos.scss
    - index.html
  - package.json          # Archivo del proyecto NPM
  - package-lock.json     # Histórico de versiones de dependencias
  - .gitignore            # Ficheros y carpetas a ignorar por git

## :tw-1f4bb:Desarrollo:

El proyecto tiene las siguientes tareas definidas:

- gulp **copy-html** --> para copiar el html desde la carpeta "src/" hasta la carpeta "dest/".
- gulp **sass** --> para compilar sass y generar el CSS.
- gulp **img-min** --> para optimizar y minificar imágenes.
- gulp **copy-js** --> para copiar los archivos "*.js" desde la carpeta "src/js/" hasta la carpeta "dest/js/".
- gulp **copy-fonts** --> para copiar los archivos de fuentes desde la carpeta "src/assets/fonts/" hasta la carpeta "dest/assets/fonts/".
- **gulp** --> tarea por defecto, corre el servidor de desarrollo, y ejecuta tareas de vigilancia de cambios, las cuales ejecutaran las tareas 'copy-html', 'sass' y 'copy-js', cada vez que exista un cambio en los archivos de desarrollo.

Ahora solo queda:

- Empezar a editar el archivo "index.html" que está dentro de la carpeta "src/", según el diseño de tu web app. También se pueden crear nuevos archivos.
- Editar el archivo "estilos.scss", dentro de la carpeta "src/sass/", y usar y crear los módulos base que hay de ejemplo.
- Editar el archivo de JavaScript "app.js", que se encuentra en "src/js/", puedes usar Vanilla JavaScript o jQuery.
- Para optimizar las imágenes, solo cópialas en la carpeta "src/assets/img", y corre la tarea "gulp img-min", las imágenes optimizadas quedaran en la carpeta "dest/assets/img/".

**Nota 1:** para que tus archivos se compilen y se generen los archivos nuevos, recuerda tener corriendo la tarea "gulp", y luego realiza tus ediciones del código.

**Nota 2**: siéntete libre de usar e incluir en el proyecto otros [plugins de gulp](https://gulpjs.com/plugins "plugins de gulp") o [npm](https://www.npmjs.com/ "npm").

------------

*~~si, ya se que proyecto en inglés es project~~ :tw-1f445: 

------------