---
sidebar_position: 1
---


# INFORMES

## Introducción

En Odoo, los reportes permiten generar documentos en formato PDF o HTML a partir de los datos almacenados en los modelos.  
Estos informes se definen mediante **acciones de tipo `ir.actions.report`** y **plantillas QWeb**, que utilizan etiquetas XML para mostrar los campos del modelo en una estructura visual.

Un reporte típico en Odoo consta de dos partes:

1. **La acción del reporte**: define qué modelo se usará, el tipo de salida (PDF o HTML) y el nombre de la plantilla.
2. **La plantilla QWeb**: define cómo se mostrará la información del modelo en el documento final.

---

## Estructura mínima de un reporte

El siguiente ejemplo muestra el código más básico y funcional que puede usarse como plantilla en cualquier módulo.  
Los alumnos solo tendrán que ajustar el nombre del modelo, los campos y los identificadores.

```xml
<?xml version="1.0" encoding="utf-8"?>
<odoo>

    <!-- Acción del reporte -->
    <record id="action_report_modelo" model="ir.actions.report">
        <!-- Nombre del informe que se verá en el botón Imprimir -->
        <field name="name">Informe del Modelo</field>

        <!-- Nombre técnico del modelo sobre el que se genera el informe -->
        <field name="model">nombre_modulo.nombre_modelo</field>

        <!-- Tipo de reporte: puede ser qweb-pdf o qweb-html -->
        <field name="report_type">qweb-pdf</field>

        <!-- Nombre técnico de la plantilla QWeb -->
        <field name="report_name">nombre_modulo.report_modelo</field>

        <!-- Enlace entre la acción y el modelo -->
        <field name="binding_model_id" ref="nombre_modulo.model_nombre_modulo_nombre_modelo"/>
        <field name="binding_type">report</field>
    </record>

    <!-- Plantilla QWeb del informe -->
    <template id="report_modelo">
        <!-- Llama a la estructura general de los reportes de Odoo -->
        <t t-call="web.html_container">
            <!-- Itera sobre los registros seleccionados -->
            <t t-foreach="docs" t-as="obj">
                <!-- Inserta el diseño estándar con encabezado y pie -->
                <t t-call="web.external_layout">
                    <div class="page">
                        <!-- Título del reporte -->
                        <h2>Informe de <t t-esc="obj.display_name"/></h2>

                        <!-- Ejemplo de tabla con datos -->
                        <table class="table table-sm table-bordered" style="width:100%;">
                            <thead>
                                <tr>
                                    <th>Campo 1</th>
                                    <th>Campo 2</th>
                                    <th>Campo 3</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td><t t-esc="obj.campo1"/></td>
                                    <td><t t-esc="obj.campo2"/></td>
                                    <td><t t-esc="obj.campo3"/></td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </t>
            </t>
        </t>
    </template>

</odoo>
```

## Explicación de los elementos principales

| Elemento | Descripción |
|-----------|-------------|
| `<record model="ir.actions.report">` | Define la acción que genera el informe. Se vincula al modelo y a la plantilla. |
| `name` | Texto visible en el botón "Imprimir" dentro del formulario del modelo. |
| `model` | Nombre técnico del modelo sobre el que se genera el informe (por ejemplo, `mi_modulo.mi_modelo`). |
| `report_type` | Define el tipo de salida. Normalmente `qweb-pdf` para generar un archivo PDF, o `qweb-html` si se quiere mostrar en pantalla. |
| `report_name` | Nombre interno del informe. Debe coincidir con el identificador de la plantilla QWeb (`<template id="report_modelo">`). |
| `report_file` | Es opcional, pero puede repetirse igual que `report_name`. Indica el nombre técnico del archivo que contiene la plantilla. |
| `binding_model_id` | Enlaza el reporte con el modelo para que aparezca el botón "Imprimir" en la vista formulario. |
| `binding_type` | Define el tipo de enlace. Para reportes, debe ser `report`. |
| `<template>` | Define la estructura visual del reporte, utilizando el lenguaje QWeb (XML con etiquetas específicas de Odoo). |
| `t-call="web.html_container"` | Llama al contenedor base de Odoo que define el formato general del documento. |
| `t-foreach="docs"` | Itera sobre los registros seleccionados por el usuario al generar el informe. Cada registro se asocia a una variable (`t-as="obj"`, por ejemplo). |
| `t-call="web.external_layout"` | Inserta el diseño estándar de encabezado y pie de página del sistema (logotipo, nombre de empresa, fecha, etc.). |
| `<div class="page">` | Representa una página del informe PDF. Cada `div.page` se imprime como una hoja nueva. |
| `t-esc` | Muestra el valor de un campo del modelo (por ejemplo, `t-esc="obj.nombre"`). |
| `<table>`, `<thead>`, `<tbody>` | Etiquetas HTML estándar para organizar los datos en forma tabular dentro del PDF. |
| `style` | Permite aplicar estilos básicos directamente (por ejemplo, ancho o bordes de tabla). |

---

## Uso en el archivo `__manifest__.py`

Para que Odoo cargue el reporte, es necesario incluir el archivo XML del informe en la lista de datos del módulo:

```python
'data': [
    'reports/report_modelo.xml',
],
```
El archivo debe estar dentro de una carpeta llamada `reports/` dentro del módulo.

## Uso del botón en el encabezado del formulario (`<header>`)

El bloque `<header>` se coloca dentro de la vista tipo formulario (`<form>`) y permite añadir botones personalizados en la parte superior de la pantalla del modelo, junto a los botones "Editar" o "Crear".

El siguiente código crea un botón que lanza la acción del reporte PDF:

```xml
<header>
    <!-- Botón para lanzar el reporte PDF -->
    <button name="%(action_report_departamento)d"
            string="Imprimir Departamento"
            type="action"
            class="oe_highlight"
            icon="fa-print"/>
</header>
```

## Explicación de los elementos del botón en el `<header>`

| Elemento | Descripción |
|-----------|-------------|
| `<header>` | Define la zona superior del formulario donde se colocan los botones y los estados del registro. Se escribe dentro de una vista de tipo `<form>`. |
| `<button>` | Crea un botón de acción en la interfaz de Odoo. Puede ejecutar una acción de servidor, abrir un asistente o lanzar un reporte PDF. |
| `name="%(action_report_departamento)d"` | Indica la acción que se ejecutará al pulsar el botón. En este caso, se llama a una acción definida en otro archivo XML con `id="action_report_departamento"`. El formato `%(id)d` es obligatorio para que Odoo interprete que debe ejecutar esa acción. |
| `string="Imprimir Departamento"` | Es el texto que se mostrará en el botón. Se puede cambiar libremente (por ejemplo, “Generar PDF” o “Descargar Informe”). |
| `type="action"` | Especifica el tipo de comportamiento del botón. En este caso, ejecuta una acción definida (como un reporte o un asistente). Otros tipos posibles son `object` (para llamar a un método Python) o `workflow` (para lanzar una transición de estado). |
| `class="oe_highlight"` | Clase CSS que resalta el botón con un color más visible. Se puede eliminar o sustituir por otras clases (por ejemplo, `btn-primary`, `btn-secondary`, etc.). |
| `icon="fa-print"` | Añade un icono al botón usando la librería de iconos Font Awesome incluida en Odoo. En este ejemplo, se usa el icono de impresora. Puede cambiarse por otro (por ejemplo, `fa-file-pdf-o`, `fa-download`, etc.). |

---

### Ejemplo integrado en una vista de formulario

```xml
<record id="view_departamento_form" model="ir.ui.view">
    <field name="name">erciprojects.departamento.form</field>
    <field name="model">erciprojects.departamento</field>
    <field name="arch" type="xml">
        <form string="Departamento">
            <header>
                <!-- Botón que ejecuta el reporte PDF -->
                <button name="%(action_report_departamento)d"
                        string="Imprimir Departamento"
                        type="action"
                        class="oe_highlight"
                        icon="fa-print"/>
            </header>

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


