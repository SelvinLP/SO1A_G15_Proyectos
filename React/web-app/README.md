# Proyecto a Run Cloud

## Construir imagen
`$ docker build -t sopes1p1:dev .`

### Probar imagen construida
`$ docker run -it --rm -v myvolumen:/app -v /app/node_modules -p 3001:3000 -e CHOKIDAR_USEPOLLING=true sopes1p1:dev`  
Ver app en [app][http://localhost:3001/]

## Imagen para producción
`$ docker build -f Dockerfile.prod -t sopes1p1:prod .`

### ejecutar contenedor
`$ docker run -it --rm -p 4000:4000 sopes1p1:prod`

# Como publicar en Cloud Run de GCP
## Prepara imagen con un tagg
`$ docker tag <IMAGE_ID> gcr.io/<ID_PROJECT>/sopes1p1:v.0.1`
"<IMAGE_ID>": Id de la imagen `docker images`  
"<ID_PROJECT>": Id del proyecto ingresar a la consola de Google Cloud y elegir el proyecto
## Subir imagen a Container Registry
`$ docker push gcr.io/<ID_PROJECT>/sopes1p1:v.0.1`
[imagen][https://miro.medium.com/max/3000/1*mNRDt-Emz9wEYfKXlVzGBw.png]
## Publicar imagen



