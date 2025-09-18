---
sidebar_position: 2
---

# Configuración inicial

## Docker

Crea un stack con este código en tu servidor Docker

```
services:
  web:
    image: odoo:18.0
    container_name: odoo
    depends_on:
      mydb:
        condition: service_healthy
    ports:
      - "8069:8069"
    environment:
      - HOST=mydb
      - USER=odoo
      - PASSWORD=myodoo
    volumes:
      - odoo-data:/var/lib/odoo
    restart: unless-stopped

  mydb:
    image: postgres:15
    container_name: odoo-postgres
    environment:
      - POSTGRES_DB=postgres
      - POSTGRES_USER=odoo
      - POSTGRES_PASSWORD=myodoo
    volumes:
      - db-data:/var/lib/postgresql/data
    healthcheck:
      test: ["CMD-SHELL", "pg_isready -U $$POSTGRES_USER -d $$POSTGRES_DB"]
      interval: 10s
      timeout: 5s
      retries: 5
    restart: unless-stopped

volumes:
  odoo-data:
  db-data:
```

