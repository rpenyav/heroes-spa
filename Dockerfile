# Usar una imagen base de Node
FROM node:14 AS build

# Establecer el directorio de trabajo en el contenedor
WORKDIR /usr/src/app

# Copiar el package.json y package-lock.json
COPY package*.json ./

# Instalar las dependencias del proyecto
RUN npm install

# Copiar el resto del código fuente de la aplicación
COPY . .

# Construir la aplicación
RUN npm run build --prod

# Etapa 2: Servir la aplicación desde un servidor web Nginx
FROM nginx:alpine

# Copiar el build de la aplicación al directorio de Nginx
COPY --from=build /usr/src/app/dist/ /usr/share/nginx/html

# Exponer el puerto 80
EXPOSE 80

# Iniciar Nginx
CMD ["nginx", "-g", "daemon off;"]
