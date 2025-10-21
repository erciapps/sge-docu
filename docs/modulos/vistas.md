---
sidebar_position: 1
---


# VISTAS

Las **vistas** en Odoo definen cómo se muestran los datos de los modelos
en la interfaz del usuario.\
Se escriben en **XML** y se cargan dentro de un archivo del módulo,
normalmente en la carpeta `views/`.

------------------------------------------------------------------------

## 1. Tipos de vistas principales

Odoo soporta varios tipos de vistas. Las más comunes son:

| Tipo            | Descripción                                              |
|-----------------|----------------------------------------------------------|
| **Form**        | Muestra un registro individual (vista detallada).        |
| **List (Tree)** | Muestra una lista de registros (tabla).                  |
| **Kanban**      | Muestra los registros en formato de tarjetas.            |
| **Calendar**    | Visualiza los registros en un calendario.                |
| **Graph**       | Permite mostrar datos de manera estadística (gráficos).  |
| **Pivot**       | Permite crear tablas dinámicas.                          |


## 2. Estructura general de una vista XML

Todas las vistas se definen dentro de etiquetas `<record>` y
`<field name="arch" type="xml">`.

``` xml
<odoo>
  <data>
    <record id="view_modelo_form" model="ir.ui.view">
      <field name="name">erciapps.modelo.form</field>
      <field name="model">erciapps.modelo</field>
      <field name="arch" type="xml">
        <form string="Mi Modelo">
          <sheet>
            <group>
              <field name="campo1"/>
              <field name="campo2"/>
            </group>
          </sheet>
        </form>
      </field>
    </record>
  </data>
</odoo>
```

### Campos importantes:

| Campo   | Descripción                                           |
|----------|-------------------------------------------------------|
| `id`     | Identificador único de la vista dentro del módulo.    |
| `model`  | Modelo de Odoo al que pertenece la vista.             |
| `name`   | Nombre técnico de la vista.                           |
| `arch`   | Estructura XML que define el diseño visual.           |



## 3. Ejemplo completo de vistas

A continuación se muestran ejemplos reales del módulo `erciapps`, con
tres modelos: **Departamento**, **Empleado** y **Proyecto**.

------------------------------------------------------------------------

### Vista de Departamentos

#### Vista tipo lista (`list`)

``` xml
<record id="view_departamento_list" model="ir.ui.view">
  <field name="name">erciapps.departamento.list</field>
  <field name="model">erciapps.departamento</field>
  <field name="arch" type="xml">
    <list string="Departamentos">
      <field name="nombreDpto"/>
    </list>
  </field>
</record>
```

#### Vista tipo formulario (`form`)

``` xml
<record id="view_departamento_form" model="ir.ui.view">
  <field name="name">erciapps.departamento.form</field>
  <field name="model">erciapps.departamento</field>
  <field name="arch" type="xml">
    <form string="Departamento">
      <sheet>
        <group>
          <field name="nombreDpto"/>
        </group>
        <notebook>
          <page string="Empleados">
            <field name="empleado_ids"/>
          </page>
        </notebook>
      </sheet>
    </form>
  </field>
</record>
```

**Notas:** - El `notebook` permite incluir pestañas dentro de la
vista. - El campo `empleado_ids` es un `One2many`, y se muestra
automáticamente como tabla editable.

------------------------------------------------------------------------

### Vista de Empleados

#### Vista tipo lista

``` xml
<record id="view_empleado_list" model="ir.ui.view">
  <field name="name">erciapps.empleado.list</field>
  <field name="model">erciapps.empleado</field>
  <field name="arch" type="xml">
    <list string="Empleados">
      <field name="dniEmpleado"/>
      <field name="nombreEmpleado"/>
      <field name="departamento_id"/>
    </list>
  </field>
</record>
```

#### Vista tipo formulario

``` xml
<record id="view_empleado_form" model="ir.ui.view">
  <field name="name">erciapps.empleado.form</field>
  <field name="model">erciapps.empleado</field>
  <field name="arch" type="xml">
    <form string="Empleado">
      <sheet>
        <group>
          <field name="dniEmpleado"/>
          <field name="nombreEmpleado"/>
          <field name="fechaNacimiento"/>
          <field name="direccionEmpleado"/>
          <field name="departamento_id"/>
        </group>
        <notebook>
          <page string="Proyectos">
            <field name="proyecto_ids" widget="many2many_tags"/>
          </page>
        </notebook>
      </sheet>
    </form>
  </field>
</record>
```

**Notas:** - El widget `many2many_tags` muestra las relaciones
`Many2many` como etiquetas visuales. - `departamento_id` es un
`Many2one`, mostrado como selector desplegable.

------------------------------------------------------------------------

### Vista de Proyectos

#### Vista tipo lista

``` xml
<record id="view_proyecto_list" model="ir.ui.view">
  <field name="name">erciapps.proyecto.list</field>
  <field name="model">erciapps.proyecto</field>
  <field name="arch" type="xml">
    <list string="Proyectos">
      <field name="nombreProyecto"/>
      <field name="tipoProyecto"/>
    </list>
  </field>
</record>
```

#### Vista tipo formulario

``` xml
<record id="view_proyecto_form" model="ir.ui.view">
  <field name="name">erciapps.proyecto.form</field>
  <field name="model">erciapps.proyecto</field>
  <field name="arch" type="xml">
    <form string="Proyecto">
      <sheet>
        <group>
          <field name="nombreProyecto"/>
          <field name="tipoProyecto"/>
          <field name="descripcionProyecto"/>
          <field name="empleado_ids" widget="many2many_tags"/>
        </group>
      </sheet>
    </form>
  </field>
</record>
```

**Notas:** - `tipoProyecto` es un campo `Selection`, que se muestra
como lista desplegable. - `empleado_ids` es un `Many2many`, mostrado
también como etiquetas.

------------------------------------------------------------------------

## 4. Acciones (`ir.actions.act_window`)

Las **acciones** son los elementos que abren las vistas desde los
menús.\
Cada acción define el modelo y los tipos de vista (`list`, `form`, etc.)
que se mostrarán.

``` xml
<record id="action_empleado" model="ir.actions.act_window">
  <field name="name">Empleados</field>
  <field name="res_model">erciapps.empleado</field>
  <field name="view_mode">list,form</field>
</record>
```

------------------------------------------------------------------------

## 5. Menús (`menuitem`)

Los **menús** permiten acceder a las acciones desde la interfaz
principal de Odoo.

``` xml
<!-- Menú raíz -->
<menuitem id="menu_erciapps_root" name="Gestión de Empresa"/>

<!-- Submenús -->
<menuitem id="menu_erciapps_departamentos" name="Departamentos"
          parent="menu_erciapps_root" action="action_departamento"/>

<menuitem id="menu_erciapps_empleados" name="Empleados"
          parent="menu_erciapps_root" action="action_empleado"/>

<menuitem id="menu_erciapps_proyectos" name="Proyectos"
          parent="menu_erciapps_root" action="action_proyecto"/>
```

**Notas:** - Los menús pueden anidarse con el atributo `parent`. - El
atributo `action` indica qué acción (vista) se abrirá.

------------------------------------------------------------------------

## 6. Flujo de funcionamiento

    Menú → Acción → Vista → Modelo → Base de datos

Cuando el usuario hace clic en un menú: 1. Odoo ejecuta la **acción**
asociada.\
2. La acción abre una o más **vistas** (`list`, `form`, etc.).\
3. Las vistas muestran los datos del **modelo** asociado.\
4. El modelo se comunica con la **base de datos** mediante el ORM.

------------------------------------------------------------------------

## 7. Buenas prácticas

Usa nombres coherentes para vistas y acciones
(`modulo.modelo.tipo`).\
Coloca todas las vistas del módulo en `views/` y define su orden en
el `__manifest__.py`.\
Utiliza `notebook` para separar información compleja.\
Define una vista tipo lista y una tipo formulario para cada modelo
principal.\
Usa widgets (`many2many_tags`, `image`, `url`, `boolean_toggle`,
etc.) para mejorar la interfaz.

------------------------------------------------------------------------