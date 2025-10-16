---
sidebar_position: 3
---

# Odoo Tests
Este Stack contiene todo lo necesario para lanzar un entorno de pruebas para desarrollar módulos personalizado en Odoo:
- Sistema ERP-CRM Odoo 18: Sistema ERP-CRM
- Base de datos Postgres: Donde se crea toda la estructura de tablas de la aplicación-
- Visual Stucio Code Web: Nos permite desarrollar módulos directamente sobre el servidor.

## Stack

```
version: "3.9"

networks:
  odoo-net:
    name: odoo-net
    driver: bridge

volumes:
  db-data:
  odoo-data:
  vscode-data:

services:
  db:
    image: postgres:15
    container_name: odoo-db
    environment:
      POSTGRES_DB: odoo-erp
      POSTGRES_USER: odoo
      POSTGRES_PASSWORD: myodoo
    volumes:
      - db-data:/var/lib/postgresql/data
    healthcheck:
      test: ["CMD-SHELL", "pg_isready -U odoo -d odoo-erp"]
      interval: 10s
      timeout: 5s
      retries: 5
    restart: unless-stopped
    networks:
      - odoo-net

  odoo:
    image: odoo:18.0
    container_name: odoo-web
    depends_on:
      db:
        condition: service_healthy
    ports:
      - "8070:8069"
    environment:
      - HOST=db
      - USER=odoo
      - PASSWORD=myodoo
      - ADMIN_PASSWORD=admin
    user: "0"
    entrypoint: >
      bash -c "
        echo '🔧 Ajustando permisos de /mnt/extra-addons...';
        chmod -R 777 /mnt/extra-addons || true;
        su -s /bin/bash odoo -c 'odoo -d odoo-erp -i base --db_host=db --db_user=odoo --db_password=myodoo --without-demo=all'
      "
    volumes:
      - ./addons-test:/mnt/extra-addons
      - odoo-data:/var/lib/odoo
    restart: unless-stopped
    networks:
      - odoo-net

  vscode:
    image: linuxserver/code-server:latest
    container_name: odoo-vscode
    environment:
      - PUID=1000
      - PGID=1000
      - TZ=Europe/Madrid
      - PASSWORD=dev1234
    ports:
      - "8443:8443"
    volumes:
      - ./addons-test:/mnt/extra-addons
      - vscode-data:/config
    networks:
      - odoo-net
    restart: unless-stopped
```

Se crean tres contenedores totalmente funcionales y con persistencia de datos, junto con la red `odoo-net`

### Datos Odoo
* url: http://TUIP:8070 (sustituye por tu ip de red)
* usuario: admin
* contraseña: admin

### Datos VSCode
* url: http://TUIP:8443 (sustituye por tu ip de red)
* contraseña: dev1234

### Datos Postgres
* usuario: odoo
* contraseña: myodoo
* base de datos: odoo-erp