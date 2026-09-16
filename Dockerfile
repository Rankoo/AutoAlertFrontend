# ---- Etapa de build ----
FROM node:20-alpine AS build

WORKDIR /app

# Copiamos solo los archivos de dependencias primero (cache de capas)
COPY package*.json ./
RUN npm ci

# Copiamos el resto del código
COPY . .

# Variable de entorno para el build de Vite
ARG VITE_API_URL
ENV VITE_API_URL=$VITE_API_URL

RUN npm run build

# ---- Etapa de producción ----
FROM nginx:1.27-alpine AS production

# Copiamos el build generado
COPY --from=build /app/dist /usr/share/nginx/html

# Config de nginx para SPA (rutas de React/Vue/etc con history mode)
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]