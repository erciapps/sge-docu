---
sidebar_position: 3
---

# Configuración inicial

## Docker

Crea un stack con este código en tu servidor Docker

```
services:
  postgres:
    image: postgres:15
    container_name: tryton-db
    environment:
      POSTGRES_USER: tryton
      POSTGRES_PASSWORD: tryton_pass
      POSTGRES_DB: tryton
    volumes:
      - postgres-data:/var/lib/postgresql/data
    networks:
      - tryton-net
    healthcheck:
      test: ["CMD-SHELL", "pg_isready -U tryton -d tryton"]
      interval: 5s
      timeout: 5s
      retries: 5

  tryton:
    image: tryton/tryton:latest
    container_name: tryton-server
    depends_on:
      postgres:
        condition: service_healthy
    environment:
      TRYTOND_DATABASE_URI: "postgresql://tryton:tryton_pass@postgres:5432/"
    ports:
      - "8000:8000"
    volumes:
      - tryton-data:/var/lib/trytond
    networks:
      - tryton-net

volumes:
  postgres-data:
  tryton-data:

networks:
  tryton-net:

```
## Activar base de datos
### Entra en la consola
![Logo](/img/consola1.png)
### Conecta
![Logo](/img/consola2.png)
### Ejecuta la inicialización del sistema
```
trytond-admin -d tryton --all
```
![Logo](/img/consola3.png)

### Establecer parámetros básicos
Es necesario indicar un correo:
* dam@erciapps.sytes.net
Usuario:
* admin
Contraseña:
* admin
  
## Descarga el cliente:
:::danger
Desktop Client, no Docker!
:::
https://www.tryton.org/download


## Configuración básica
Sigue las instrucciones de clase para la configuración mínima.
