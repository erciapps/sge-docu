---
sidebar_position: 2
---

# Configuración inicial

## Docker

Crea un stack con este código en tu servidor Docker

``` java
services:
  web:
    image: dolibarr/dolibarr:latest
    ports: ["8080:80"]
    depends_on: [db]
    environment:
      - DOLI_DB_HOST=db
      - DOLI_DB_NAME=dolibarr
      - DOLI_DB_USER=dolibarr
      - DOLI_DB_PASSWORD=dolipass
    volumes:
      - ./dolibarr_documents:/var/www/html/documents
    mem_limit: 512m
    restart: unless-stopped

  db:
    image: mariadb:10.6
    environment:
      - MARIADB_DATABASE=dolibarr
      - MARIADB_USER=dolibarr
      - MARIADB_PASSWORD=dolipass
      - MARIADB_ROOT_PASSWORD=rootpass
    command: ["--innodb_buffer_pool_size=128M","--max_connections=80"]
    volumes:
      - ./mariadb_data:/var/lib/mysql
    mem_limit: 512m
    restart: unless-stopped

```

### Usuario y contraseña por defecto
* usuario: admin
* password: admin
