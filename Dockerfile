# Fase de construcción del frontend
FROM node:14 AS build-frontend
WORKDIR /app
COPY ./frontend/package*.json ./
RUN npm install -g npm@8
RUN npm install
COPY ./frontend/ ./
RUN npm run build

# Fase de construcción del backend
FROM node:14 AS build-backend
WORKDIR /app
COPY ./backend/package*.json ./
RUN npm install -g npm@8
RUN npm install
COPY ./backend/ ./

# Fase de producción
FROM node:14
WORKDIR /app

# Configuración del frontend
COPY --from=build-frontend /app/dist/ ./frontend/dist/
RUN npm install -g npm@8
RUN npm install -g serve
EXPOSE 443

# Configuración del backend
COPY --from=build-backend /app/ ./backend/
EXPOSE 3001

# Comando para iniciar las aplicaciones
CMD ["sh", "-c" , "cd backend && npm start & cd ../ && serve -s frontend/dist -l tcp://0.0.0.0:443"]
