<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

# Ejecutar en desarrollo

1. Clonar el repositorio
2. Ejecutar
```
yarn install
```

3. Tener Nest CLI instalado
```
npm i -g @nestjs/cli
```

4. Levantar la base de adtos
```
docker-compose up -d
```
5. Clonar el archivo ```.env.template``` y renombrar a ```.env.```

6. Llenar las variables de entornos definidas en el .env

7. Ejecutar la aplicacion en dev:
```
yarn start:dev
```
8. Reconstruir base de datos con la semilla
```
http://localhost:3000/api/seed
```

## Stack usado
* MongoDB
* Nest
