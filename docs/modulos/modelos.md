---
sidebar_position: 1
---


# MODELOS

Los **modelos** en Odoo son la base de la arquitectura del framework.\
Cada modelo representa una **tabla en la base de datos** y define su
estructura, relaciones y lógica de negocio.

------------------------------------------------------------------------

## 1. Definición de un modelo

Un modelo se define como una clase de Python que **hereda de
`models.Model`**.\
Cada clase corresponde a **una tabla en PostgreSQL**, y cada campo de la
clase a **una columna**.

``` python
from odoo import models, fields, api

class MiModelo(models.Model):
    _name = 'mi_modulo.mi_modelo'         # Nombre técnico del modelo (tabla)
    _description = 'Descripción del modelo'
    _rec_name = 'nombre'                  # Campo que se mostrará como nombre por defecto

    # Campos (atributos)
    nombre = fields.Char(string='Nombre', required=True)
    edad = fields.Integer(string='Edad')
```

🔹 `_name` → Define el nombre técnico del modelo (crea la tabla
`mi_modulo_mi_modelo`).\
🔹 `_description` → Descripción legible del modelo.\
🔹 `_rec_name` → Campo usado por Odoo para mostrar el nombre del
registro (en vistas, relaciones, etc.).\
🔹 Los **campos** (`fields`) definen los atributos de la tabla.

------------------------------------------------------------------------

## 2. Tipos de campos (`fields`)

Los campos son las **columnas** de la tabla del modelo.\
Cada tipo de dato tiene su clase dentro del módulo `odoo.fields`.

  | Tipo        | Descripción       | Ejemplo                                                                                      |
|--------------|------------------|-----------------------------------------------------------------------------------------------|
| `Char`       | Texto corto      | `nombre = fields.Char(string='Nombre')`                                                      |
| `Text`       | Texto largo      | `descripcion = fields.Text(string='Descripción')`                                            |
| `Integer`    | Números enteros  | `edad = fields.Integer(string='Edad')`                                                       |
| `Float`      | Números decimales| `precio = fields.Float(string='Precio')`                                                     |
| `Boolean`    | Verdadero/Falso  | `activo = fields.Boolean(string='Activo', default=True)`                                     |
| `Date`       | Fecha            | `fecha = fields.Date(string='Fecha')`                                                        |
| `Datetime`   | Fecha y hora     | `creado = fields.Datetime(string='Creado el')`                                               |
| `Selection`  | Lista de opciones| `estado = fields.Selection([('a','Activo'),('i','Inactivo')], string='Estado')`              |
| `Binary`     | Archivos o imágenes | `foto = fields.Binary(string='Foto')`                                                     |


------------------------------------------------------------------------

## 3. Relaciones entre modelos

Odoo permite conectar tablas mediante relaciones.\
Existen tres tipos principales:

### `Many2one` (muchos a uno)

Representa una **clave foránea**.\
Ejemplo: varios empleados pertenecen a un mismo departamento.

``` python
departamento_id = fields.Many2one('mi_modulo.departamento', string='Departamento')
```

En base de datos: se añade una columna `departamento_id` con la
referencia al registro relacionado.

------------------------------------------------------------------------

### `One2many` (uno a muchos)

Define el lado opuesto de `Many2one`.\
Ejemplo: un departamento tiene muchos empleados.

``` python
empleado_ids = fields.One2many('mi_modulo.empleado', 'departamento_id', string='Empleados')
```

No crea columna nueva: se apoya en el campo `Many2one` del otro
modelo.

------------------------------------------------------------------------

### `Many2many` (muchos a muchos)

Relaciona registros de ambas tablas sin dependencia directa.\
Crea una **tabla intermedia** automáticamente.

``` python
proyecto_ids = fields.Many2many('mi_modulo.proyecto', string='Proyectos')
```

Un empleado puede participar en varios proyectos, y un proyecto tener
varios empleados.

------------------------------------------------------------------------

## 4. Métodos en los modelos

Los modelos pueden incluir **métodos Python** para aplicar lógica de
negocio:

### Métodos estándar

 | Método              | Descripción                                      |
|----------------------|--------------------------------------------------|
| `create(self, vals)` | Sobrescribe la creación de registros.            |
| `write(self, vals)`  | Modifica registros existentes.                   |
| `unlink(self)`       | Elimina registros.                               |
| `name_get(self)`     | Define cómo se muestra el nombre de los registros. |


Ejemplo:

``` python
@api.model
def create(self, vals):
    record = super().create(vals)
    print("Registro creado:", record.nombre)
    return record
```

------------------------------------------------------------------------

## 5. Decoradores del API (`@api`)

Los decoradores permiten controlar cómo se ejecutan los métodos:

  | Decorador                          | Descripción                                           |
|------------------------------------|-------------------------------------------------------|
| `@api.model`                       | Método que no depende de un registro específico.      |
| `@api.multi` *(deprecated en v13+)*| Método que trabaja sobre varios registros.            |
| `@api.depends('campo1', 'campo2')` | Marca campos calculados.                              |
| `@api.onchange('campo')`           | Se ejecuta al cambiar un campo en la vista.           |
| `@api.constrains('campo')`         | Valida reglas antes de guardar.                       |


Ejemplo de campo calculado:

``` python
edad = fields.Integer(compute='_calcular_edad')

@api.depends('fecha_nacimiento')
def _calcular_edad(self):
    for record in self:
        record.edad = date.today().year - record.fecha_nacimiento.year
```

------------------------------------------------------------------------

## 6. Restricciones y validaciones

Puedes usar **restricciones SQL** o **validadiones en Python**.

### Restricciones SQL

Evita duplicados o asegura condiciones en la base de datos.

``` python
_sql_constraints = [
    ('dni_unico', 'unique(dniEmpleado)', 'El DNI debe ser único.')
]
```

### Validaciones con `@api.constrains`

Valida antes de guardar un registro.

``` python
@api.constrains('edad')
def _check_edad(self):
    for record in self:
        if record.edad < 18:
            raise ValidationError("El empleado debe ser mayor de edad.")
```

------------------------------------------------------------------------

## 7. Campos calculados y dependencias

Un **campo calculado** (`compute`) no se almacena en la base de datos
salvo que se use `store=True`.

``` python
total = fields.Float(compute='_compute_total', store=True)

@api.depends('precio', 'cantidad')
def _compute_total(self):
    for record in self:
        record.total = record.precio * record.cantidad
```

------------------------------------------------------------------------

## 8. Relación con las vistas

Los modelos se reflejan en la interfaz mediante **vistas XML**:

``` xml
<record id="view_empleado_form" model="ir.ui.view">
    <field name="name">erciapps.empleado.form</field>
    <field name="model">erciapps.empleado</field>
    <field name="arch" type="xml">
        <form string="Empleado">
            <sheet>
                <group>
                    <field name="nombreEmpleado"/>
                    <field name="departamento_id"/>
                </group>
            </sheet>
        </form>
    </field>
</record>
```

------------------------------------------------------------------------

## 9. Esquema conceptual

```text
models.Model        → Clase de Python
   ↓
Campos (fields)     → Columnas de la tabla
   ↓
Relaciones          → One2many, Many2one, Many2many
   ↓
Vistas XML          → Interfaz en Odoo
```
------------------------------------------------------------------------

## 10. Resumen

| Concepto           | Significado                                         |
|---------------------|----------------------------------------------------|
| `models.Model`      | Clase base de todos los modelos.                   |
| `_name`             | Nombre técnico del modelo (nombre de la tabla).    |
| `_rec_name`         | Campo mostrado como nombre del registro.           |
| `fields.*`          | Define los atributos del modelo.                   |
| **Relaciones**      | Vinculan modelos entre sí.                         |
| `@api.*`            | Decoradores para lógica de negocio.                |
| `_sql_constraints`  | Restricciones de base de datos.                    |
