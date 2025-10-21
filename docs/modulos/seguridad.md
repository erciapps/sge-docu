---
sidebar_position: 3
---


# PERMISOS

Los **permisos de acceso** en Odoo controlan qué usuarios pueden **leer,
crear, modificar o eliminar** registros de cada modelo.\
Se definen en un archivo CSV llamado:

    security/ir.model.access.csv

------------------------------------------------------------------------

## 1. ¿Qué son los permisos de acceso?

Los permisos de acceso permiten restringir o conceder operaciones a
diferentes grupos de usuarios sobre los modelos de la base de datos.\
Cada permiso especifica cuatro acciones posibles:

-   **Leer (perm_read)** → permite visualizar los registros.\
-   **Escribir (perm_write)** → permite modificar los registros
    existentes.\
-   **Crear (perm_create)** → permite añadir nuevos registros.\
-   **Eliminar (perm_unlink)** → permite borrar registros.

------------------------------------------------------------------------

## 2. Estructura del archivo CSV

El archivo `ir.model.access.csv` tiene una estructura fija con los
siguientes campos:

``` csv
id,name,model_id:id,group_id:id,perm_read,perm_write,perm_create,perm_unlink
```

| Campo           | Descripción                                                                 |
|-----------------|------------------------------------------------------------------------------|
| **id**          | Identificador único del permiso dentro del módulo.                          |
| **name**        | Nombre descriptivo del permiso.                                              |
| **model_id:id** | Identificador técnico del modelo (definido en el sistema).                   |
| **group_id:id** | Grupo de usuarios al que se aplican los permisos. Si se deja vacío, aplica a todos los usuarios. |
| **perm_read**   | `1` si el grupo puede **leer** los registros, `0` si no.                     |
| **perm_write**  | `1` si el grupo puede **modificar** registros, `0` si no.                    |
| **perm_create** | `1` si el grupo puede **crear** nuevos registros, `0` si no.                 |
| **perm_unlink** | `1` si el grupo puede **eliminar** registros, `0` si no.                     |


## 3. Ejemplo básico

Este ejemplo define permisos para tres modelos: `Departamento`,
`Empleado` y `Proyecto`.

### Archivo: `security/ir.model.access.csv`

``` csv
id,name,model_id:id,group_id:id,perm_read,perm_write,perm_create,perm_unlink
access_departamento,erciapps.departamento,model_erciapps_departamento,base.group_user,1,1,1,1
access_empleado,erciapps.empleado,model_erciapps_empleado,base.group_user,1,1,1,1
access_proyecto,erciapps.proyecto,model_erciapps_proyecto,base.group_user,1,1,1,1
```

**Explicación:** - Cada línea define un permiso de acceso para un
modelo.\
- El grupo `base.group_user` representa a los **usuarios internos**
(empleados, usuarios registrados).\
- Todos tienen permiso completo (leer, crear, escribir y eliminar).

------------------------------------------------------------------------

## 4. Ubicación dentro del módulo

El archivo debe estar en la carpeta `security/` de tu módulo:
```text
    erciapps/
    ├── __manifest__.py
    ├── models/
    │   ├── __init__.py
    │   └── *.py
    ├── views/
    │   └── *.xml
    ├── security/
    │   └── ir.model.access.csv
    
```
Y debe estar referenciado en el archivo `__manifest__.py`:

``` python
'data': [
    'security/ir.model.access.csv',
    'views/vistas.xml',
],
```

------------------------------------------------------------------------

## 5. Cómo funciona internamente

Cuando Odoo instala el módulo:

1.  Lee el archivo `ir.model.access.csv`.\
2.  Registra cada línea como un registro en el modelo
    `ir.model.access`.\
3.  Asocia esos permisos con los grupos de usuarios (`res.groups`).\
4.  Al ejecutar cualquier acción (ver, guardar, eliminar), Odoo
    comprueba los permisos definidos.

Si un usuario no pertenece a un grupo con permisos suficientes, se
mostrará un error de acceso.

------------------------------------------------------------------------

##  6. Ejemplo avanzado

Podemos definir permisos diferentes según el tipo de usuario.

### Permisos solo para administradores

``` csv
id,name,model_id:id,group_id:id,perm_read,perm_write,perm_create,perm_unlink
access_proyecto_admin,erciapps.proyecto,model_erciapps_proyecto,base.group_system,1,1,1,1
```

En este caso, **solo los administradores del sistema**
(`base.group_system`) podrán leer, crear, modificar o eliminar
proyectos.

### Permisos de solo lectura

``` csv
id,name,model_id:id,group_id:id,perm_read,perm_write,perm_create,perm_unlink
access_empleado_read,erciapps.empleado,model_erciapps_empleado,base.group_user,1,0,0,0
```

Este grupo podrá **ver** los empleados, pero no modificarlos,
crearlos ni eliminarlos.

------------------------------------------------------------------------

## 7. Buenas prácticas

-   Cada modelo debe tener al menos un registro en
    `ir.model.access.csv`.\
-   No otorgues permisos de eliminación (`perm_unlink`) a datos
    críticos.\
-   Define permisos distintos para usuarios normales y administradores.\
-   Usa nombres (`id`) descriptivos y únicos (por ejemplo:
    `access_<modelo>_<grupo>`).\
-   Mantén el archivo ordenado y con cabecera en la primera línea.

------------------------------------------------------------------------

## 8. Resumen visual

``` text
Usuario → Grupo → Permisos (Access Rules) → Modelos → Base de datos
```

Es decir:\
- Los **usuarios** pertenecen a **grupos**.\
- Los **grupos** tienen permisos definidos en el archivo CSV.\
- Odoo usa esos permisos para controlar qué operaciones puede realizar
cada usuario sobre los **modelos**.

------------------------------------------------------------------------

## 9. Plantilla base para nuevos módulos

Puedes copiar y adaptar este ejemplo:

``` csv
id,name,model_id:id,group_id:id,perm_read,perm_write,perm_create,perm_unlink
access_<modelo>,<nombre_visible>,model_<nombre_tecnico>,base.group_user,1,0,0,0
```

Ejemplo práctico:

``` csv
access_cliente,modulo_ventas.cliente,model_modulo_ventas_cliente,base.group_user,1,1,1,0
```

------------------------------------------------------------------------
