# Bienvenido a Conectando 📖
---
Este proyecto permite a los usuarios publicar Servicios. en un ambiente completamente descentralizado.
Las funcionalidades principales del contrato son las siguientes:
* Publicar  un Servicio 
* Obtener todos los Servicios
* Obtener un servicio en específico.
* Obtener lista de Recomendaciones.
* Eliminar la lista de servicios.
* Eliminar un servicio en específico.
* Vaciar la lista de recomendaciones.


## Cómo utilizar este contrato ❔
---
### Pré-requisitos ❕
1. Debe tener [Nodejs](https://nodejs.org/en/) instalado en su versión 12.0 o mayor.
2. Debe tener instalado [Yarn](https://yarnpkg.com/). Para saber si lo tiene, ejecute el comando ```yarn --version ```. En caso de no tenerlo, puede instalarlo ejecutando el comando ```sudo npm install -g yarn```
3. Instale las dependencias de yarn ejecutando ```yarn install```
4. Debe tener una cuenta en la [testnet de NEAR](https://wallet.testnet.near.org/)
5. Debe tener [NEAR-CLI](https://github.com/near/near-cli) instalado globalmente en su ordenador. Para saber si ya lo tiene instalado, ejecute ```near --version```. En caso de no tenerlo, instálelo ejecutando el comando ```sudo npm install -g near-cli``` 

Ya tenemos todo lo que necesitamos para probar nuestro contrato inteligente. Ahora vamos a ejecutarlo.

## Instalación 📖🐱‍💻
---
1. Clone el repositorio ```gh repo clone SistemasTecTlaxiaco/Conectando```
2. Vamos a iniciar sesión en nuestra wallet que creamos anteriormente: ```near login```
3. Dentro del repositorio, instalemos las dependencias del proyecto ejecutando ```npm install```, tranquilo, esto puede tomar unos segundos.
4. Si quieres desplegar el contrato y probar sus funciones, puedes hacerlo con ```yarn deploy:dev``` esto le devolverá un conjunto de caracteres que empezarán por "dev-" seguido por numeros generados por la red. Guárdelo, lo necesitará si quiere probar los métodos del contrato inteligente.
5. Por último, si queremos ejecutar los tests desarrollados, podemos hacerlo ejecutando ```yarn test```
   
## Llamadas al Contrato 
---
Algunos de los metodos que podemos ejecutar son los siguientes
- Cargar un Servicio 
  ```bash
  near call dev-<tu numero de contrato> uploadService '{"servicio": "Nombre del servicio", "descripcion": "Descripcion del servicio", "imagen": "Una imagen del servicio", "direccion": "Direccion", "costo": "Costo"}' --accountId <tu_user.testnet>
  ```
- Buscar todos los servicios 
  ```bash
  near call dev-<tu numero de contrato> getServices  --accountId <tu_user.testnet>
  ```
- Buscar un servicio en especifico
```bash
near call dev-<tu numero de contrato> getServicio  '{"servicioIndex": i32}' --accountId <tu_user.testnet>
  ```
- Eliminar un servicio
```bash
near call dev-<tu numero de contrato> deleteServicio  '{"servicioIndex": i32}' --accountId <tu_user.testnet>
  ```
- Hcaer un pago 
```bash
near call dev<tu numero de contrato> donateToProject --accountId <tu_user.testnet> --amount i32
  ```
- Buscar los contribuyentes 
  ```bash
  near call dev-<tu numero de contrato> getRecomendations  --accountId <tu_user.testnet>
    ```

## Authors

