---
sidebar_position: 1
---


# Modulos Odoo

## Stack para el desarrollo
Entra en docker y crea el Stack (apartado Docker, odoo-tests) con el nombre: `odoopruebas`

## Configuración e inicialización del módulo
### Entra en el modo consola del contenedor `odoo-web`
<figure>
  <img src="/img/modulos/modulos0.png" alt="modulos0" width="200" />
</figure>

### Conecta la consola
<figure>
  <img src="/img/modulos/modulos1.png" alt="modulos1" width="300" />
</figure>

### Ejecuta el siguiente comando para crear un módulo base de `odoo`
``` python
odoo scaffold testmodule /mnt/extra-addons
```

<figure>
  <img src="/img/modulos/modulos2.png" alt="modulos2" width="300" />
</figure>

### Da permisos al directorio para poder editar
```
chmod -R 777 /mnt/extra-addons
```
<figure>
  <img src="/img/modulos/modulos3.png" alt="modulos3" width="300" />
</figure>


## Edicción del módulo desde Visual Studio Code Web
### Entra a mediante navegador web con los siguientes datos:
* url: http://TUIP:8443 (sustituye por tu ip de red)
* contraseña: dev1234
### Abre el directorio del módulo
<figure>
  <img src="/img/modulos/modulos4.png" alt="modulos4" width="300" />
</figure>

### Indica la ruta
``` python
/mnt/extra.addons/erciprojects/
```
<figure>
  <img src="/img/modulos/modulos5.png" alt="modulos5" width="300" />
</figure>

### Finalmente puedes ver la estructura del proyecto
<figure>
  <img src="/img/modulos/modulos6.png" alt="modulos6" width="300" />
</figure>


## Conexión con la base de datos
### Para conectar con la base de datos en necesario instalar la siguiente extensión:

<figure>
  <img src="/img/modulos/modulos7.png" alt="modulos7" width="300" />
</figure>

### Indicamos los datos de conexión:
Database Connection
* hostname: odoo-db
* user: odoo
* pass: myodoo
* port: 5432
* Standard Connection
* Database connection: odoo-erp



## Enunciado
- La empresa ErciTech S.L. quiere gestionar la información de sus empleados, departamentos y proyectos.

- Cada departamento tiene un nombre único y puede tener varios empleados asignados.

- Un empleado pertenece a un único departamento y se registran su DNI, nombre, fecha de nacimiento y dirección.

- Además, un empleado puede participar en uno o varios proyectos y cada proyecto puede involucrar a varios empleados.

- De los proyectos se quiere conocer su nombre, tipo (Front-End o Back-End) y una breve descripción.

### Tareas:

- Identifica las entidades, atributos y claves primarias.

- Define las relaciones y su cardinalidad.

- Diseña y representa gráficamente el modelo entidad-relación con sus claves y relaciones.
