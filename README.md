# X-Men Marvel Heroes

Esta aplicación permite explorar datos de los X-Men, incluyendo su nombre, nombre original, clase, fuerza, descripción y poderes. 


## Características Principales

### Visualización de Superhéroes
- Explora una lista paginada de los superhéroes de X-Men de Marvel.
- Haz clic en un superhéroe para ver los detalles completos.

### Edición de Superhéroes
- Edita la información de un superhéroe, incluyendo su nombre, subtitulo, clase y fuerza.
- Actualiza la imagen del superhéroe. Eventualmente desde cloudinary o servicios https

### Eliminación de Superhéroes
- Elimina un superhéroe después de confirmar la acción.

### Funcionalidades Opcionales
- Utiliza Angular Material para diversas funcionalidades.
- Navega entre la lista de superhéroes y la vista de detalles utilizando rutas.
- Utiliza un función para asegurar que el nombre del superhéroe se muestre siempre en capitalize.
- Se usa un mockserver para realizar llamadas HTTP sin backend. Más detalle en adelante.
- Se implementa un interceptor para mostrar un indicador de carga durante operaciones como el borrado o la edición.
- La aplicación está Dockerizada.


## DataDummyService

El DataDummyService es un servicio ficticio que simula una fuente de datos para la aplicación. 

Características y funciones del DataDummyService:

### Datos Iniciales
El servicio incluye un conjunto de datos iniciales que representan a varios superhéroes de los X-Men de Marvel. 
Cada superhéroe tiene propiedades como nombre, nombre original, descripción, fuerza, clase, imagen y poderes. 

Estos datos se utilizan para poblar la aplicación cuando se inicia por primera vez.

### Creación de Datos Iniciales

El método **createDb()** se utiliza para generar una estructura de datos que simula una base de datos en memoria. Esto se utiliza en conjunción con **angular-in-memory-web-api** para proporcionar una API simulada en la aplicación Angular.

### Almacenamiento Local

El servicio utiliza el **localStorage** para guardar los datos.
Siempre que se inicia la aplicación, el servicio verifica si hay datos almacenados previamente en el localStorage. 
Si existen se cargan y utilizan. 
Si no, se utilizan los datos iniciales predeterminados y se almacenan en el almacenamiento local para el uso posterior.

### Funciones de Actualización

Proporciona funciones para actualizar los datos: 

**updateAllData(newData: XMenCharacter[]):** Actualiza todos los datos de superhéroes con un nuevo conjunto de datos y los almacena en el localStorage.

**updateHero(id: number, updatedHero: XMenCharacter):** Actualiza un superhéroe por su ID con la información actualizada y guarda los cambios en el localStorage.

**deleteHero(id: number):** Borra un superhéroe por su ID y guarda los cambios en el localStorage.

### Obtención de Datos

El servicio ofrece una función getAllData() que devuelve todos los datos de superhéroes almacenados.

### Paginación de Datos
El servicio también gestiona la paginación de datos. 
Divide los datos en páginas y proporciona una estructura paginada.


## Accessibility

Se han añadido métodos y etiquetas que cumplen las pautas **WCAG 2.1** y botones de ampliación de texto en el footer.

## Instalación y Uso

### Clonar el Repositorio
Para comenzar, clona el repositorio de Git de la aplicación:

```
git clone https://github.com/rpenyav/heroes-spa.git
cd heroes-spa
```

### Instalar Dependencias

```
npm install
```
### Iniciar la Aplicación

Ejecuta el siguiente comando para iniciar la aplicación:

```
ng serve
```

Esto iniciará la aplicación en tu navegador en la dirección http://localhost:4200/.


### Tests unitarios

Prácticamente la mayoría de componentes disponen de su propio test de renderizado y de funcionalidad

```
ng test
```

## Docker

Construir la imagen Docker

```
docker build -t heroes-spa .
```


Correr el contenedor: 

```
docker run -p 8080:80 heroes-spa
```

Acceder a la aplicación en http://localhost:8080/.



## Contacto
Para cualquier pregunta o comentario, no dudes en ponerte en contacto en [rafa@rafapenya.com](mailto:rafa@rafapenya.com).

