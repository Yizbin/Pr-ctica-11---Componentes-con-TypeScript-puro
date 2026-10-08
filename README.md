# Práctica 11 - Componentes con TypeScript puro (Web Components)

## Respuestas a las Preguntas de la Práctica

### Ejercicio 1: El botón reutilizable
**¿Por qué el nombre de una etiqueta propia debe llevar guion?**
> **Respuesta:** El estándar W3C para Web Components exige el uso de un guion (como `<boton-app>`) para asegurar la compatibilidad con futuras versiones de HTML. De esta forma, el motor de parseo del navegador puede diferenciar inmediatamente entre un *Custom Element* definido por el desarrollador y una etiqueta nativa existente o futura, evitando colisiones de nombres con nuevas especificaciones nativas del estándar.

### Ejercicio 2: La tarjeta de producto
**1. Manejo de tipos en los atributos:**
> Los atributos HTML en el DOM siempre se transmiten como cadenas de texto (`string`). Por ello, dentro del componente (`<tarjeta-producto>`), los datos numéricos como `precio` y `existencia` se deben parsear explícitamente utilizando funciones como `Number()` o `parseFloat()` antes de usarlos en operaciones o condiciones de lógica de negocio.

**2. Propagación de eventos personalizados y Shadow DOM:**
> Por defecto, un `CustomEvent` emitido desde el interior del *Shadow DOM* tiene sus propiedades en `bubbles: false` y `composed: false`. Para que el evento `'agregar'` pueda atravesar la frontera del árbol de sombra (*Shadow Boundary*) y subir por el árbol DOM hasta el contenedor principal (`#rejilla`), es indispensable instanciarlo con `{ bubbles: true, composed: true }`. Si no se incluye `composed: true`, el evento se queda encapsulado en la tarjeta y el contador no se actualiza, aunque no se marque ningún error en consola.
