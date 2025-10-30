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

# 8. Elementos de maquetación en vistas XML

Dentro de las vistas tipo **formulario** (`<form>`), Odoo permite organizar los campos visualmente usando varios contenedores y estructuras.  
Estos elementos no afectan al modelo ni a la base de datos, solo al diseño visual.

---

## 8.1. `<sheet>`

Es el contenedor principal de la vista de formulario.  
Dentro de él se incluye la estructura visual: grupos, pestañas, títulos, botones, etc.

```xml
<sheet>
  ...
</sheet>
```

El `<sheet>` aplica automáticamente márgenes, fondo y diseño coherente con el tema de Odoo.

---

## 8.2. `<group>`

Sirve para **agrupar campos** o secciones dentro del formulario.  
Puede anidarse y también dividir el espacio en columnas.

```xml
<group>
  <field name="dniEmpleado"/>
  <field name="nombreEmpleado"/>
</group>
```

También puede recibir el atributo `col="n"` para indicar el número de columnas internas:

```xml
<group col="3">
  <group>
    <field name="dniEmpleado"/>
  </group>
  <group>
    <field name="nombreEmpleado"/>
  </group>
  <group>
    <field name="fechaNacimiento"/>
  </group>
</group>
```

**Explicación:**
- El grupo exterior define 3 columnas.
- Cada subgrupo ocupa una columna y contiene los campos.

---

## 8.3. `<notebook>` y `<page>`

Permiten **dividir la vista en pestañas** (similar a un cuaderno con secciones).

```xml
<notebook>
  <page string="Datos personales">
    <field name="dniEmpleado"/>
    <field name="nombreEmpleado"/>
  </page>
  <page string="Datos laborales">
    <field name="departamento_id"/>
    <field name="proyecto_ids"/>
  </page>
</notebook>
```

**Explicación:**
- `<notebook>` agrupa las pestañas.
- Cada `<page>` define una pestaña con el atributo `string` (título mostrado).

---

## 8.4. `<div>` y clases CSS

Se pueden usar `<div>` con clases predefinidas para personalizar el diseño.

```xml
<div class="oe_button_box">
  <!-- Contenedor de botones en la parte superior -->
</div>
```

Clases comunes:
- `oe_button_box`: zona de botones al inicio del formulario.
- `oe_title`: define una cabecera con título e imagen.
- `oe_chatter`: activa la zona de mensajes y seguimiento de registros.

---

## 8.5. Botones dentro del formulario

Los botones se colocan dentro del `<header>` (parte superior) o dentro del `<div class="oe_button_box">`.

```xml
<header>
  <button name="%(action_report_empleado)d"
          string="Imprimir Ficha"
          type="action"
          class="oe_highlight"
          icon="fa-print"/>
</header>
```

**Explicación:**
- `header`: zona reservada para botones globales.
- `name`: acción que ejecuta (por ejemplo, un informe o un método Python).
- `string`: texto visible en el botón.
- `type`: tipo de acción (`action`, `object`, etc.).
- `icon`: icono opcional (Font Awesome).

---

## 8.6. Títulos y textos

Puedes usar etiquetas HTML estándar (`<h1>`, `<h2>`, `<p>`) dentro de la vista.

```xml
<group>
  <h1>VISTA EMPLEADOS</h1>
</group>
```

Esto permite mostrar títulos o separar secciones de forma más clara.

---

## 8.7. Estilo en línea

Es posible aplicar estilos simples directamente en los campos o etiquetas:

```xml
<field name="dniEmpleado" style="width:70%"/>
```

Sin embargo, **se recomienda usar clases CSS** en lugar de estilos en línea para mantener un diseño limpio y coherente.

---

## 8.8. Elementos adicionales útiles

| Elemento | Uso principal |
|-----------|----------------|
| `<separator string="Título"/>` | Inserta una línea separadora con un texto descriptivo. |
| `<label for="campo"/>` | Muestra una etiqueta personalizada vinculada a un campo. |
| `<newline/>` | Inserta un salto de línea dentro de un grupo. |
| `<field name="campo" invisible="1"/>` | Oculta un campo en la vista. |

---

## 8.9. Ejemplo completo

```xml
<form string="Empleado">
  <sheet>
    <div class="oe_button_box">
      <button name="%(action_report_empleado)d"
              string="Imprimir"
              type="action"
              icon="fa-print"
              class="oe_highlight"/>
    </div>

    <group>
      <h1>VISTA EMPLEADOS</h1>
    </group>

    <notebook>
      <page string="Datos personales">
        <group col="3">
          <group><field name="dniEmpleado"/></group>
          <group><field name="nombreEmpleado"/></group>
          <group><field name="fechaNacimiento"/></group>
        </group>
      </page>

      <page string="Datos laborales">
        <field name="departamento_id"/>
        <field name="proyecto_ids" widget="many2many_tags"/>
      </page>
    </notebook>
  </sheet>
</form>
```
