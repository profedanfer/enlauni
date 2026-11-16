# Aula Danfer

Materiales de cátedra de la PhD. Daniela Ferreira: repasos, actividades de práctica y juegos, con referencias de acceso abierto en formato APA 7.

## Estructura

```
index.html                                   Portada con las materias
assets/estilos.css                           Estilos compartidos
assets/sitio.js                              Pestañas de código
teoria-de-la-programacion/index.html         Menú de la materia: tres bloques independientes
teoria-de-la-programacion/indagaciones/      01 · Indagaciones previas, una por clase (no enlazan al repaso)
teoria-de-la-programacion/repaso.html        02 · Repaso: las 8 unidades
teoria-de-la-programacion/u1.html … u8.html  Una página por unidad (con su propia bibliografía)
teoria-de-la-programacion/juegos/            03 · Juegos: Ruta de Repaso, Estático o dinámico, Oca,
                                             Caza el bug, Tribunal de Diseño, Duelo de equipos
teoria-de-la-programacion/juegos/laboratorio/  Ejecución real de Python (Pyodide) con vigilante de tiempo
teoria-de-la-programacion/bibliografia.html  Bibliografía completa
tecnologia-de-la-informacion/                TIC: repaso.html, u1–u9.html, casos.html, juegos/ (Ruta, Oca, Duelo,
                                             Simulacro), progreso.html, estudiantes.html (juegos de estudiantes),
                                             bibliografia.html + tic.css (verde oliva y cobre). Sin indagaciones.
ingenieria-del-software-1/                   ISO1: misma estructura (indagaciones/, repaso.html, u1–u11.html,
                                             juegos/, bibliografia.html) + iso1.css (paleta propia de la materia)
```

## Personajes

Ada (robot) y Bug (gato) acompañan el sitio. Están en `assets/personajes/` como SVG.
- Portada: la historia y la presentación de los dos.
- Portadas de materia, indagaciones, repaso y juegos: escenas con globos de diálogo (`.escena`, `.escena.der`).
- Recuadros «No confundas» de cada unidad: los firma Bug («Bug se confundió»), porque cada uno es un error típico.
- Recuadros «Con IA, con criterio» de ISO1: los firma Ada, que es una IA.
Al imprimir, los personajes y texturas se ocultan.

## Herramientas de estudio

- `ingenieria-del-software-1/casos.html` — Casos para el final: 10 casos nuevos (U1–U11), 51 preguntas cerradas N3–N5 con devolución por opción y 10 de desarrollo con criterios de autocorrección. Datos: `ingenieria-del-software-1/juegos/casos-examen.js`; render: `assets/casos.js`. El simulacro de ISO1 los usa en el modo «Solo casos» (predeterminado). Al escribir preguntas nuevas, cuidar que la correcta no sea siempre la opción más larga.

- `*/juegos/simulacro.html` — Simulacro de examen: elige unidades, cantidad y tiempo; sin pistas hasta entregar; diagnóstico de Ada por unidad. Motor: `assets/simulacro.js` (usa el banco de preguntas de cada materia; excluye las de emparejar).
- `*/progreso.html` — Mi progreso: unidades marcadas como repasadas (botón al final de la autoevaluación de cada unidad), puntos de la Ruta, simulacros y sellos de Ada. Motor: `assets/progreso.js`. Todo se guarda en `localStorage`, solo en el navegador del estudiante.
- `ingenieria-del-software-1/taller-ia/` — IA con criterio: entrevista con la directora de la USF (U5–U6) y panel de revisión arquitectónica (U8–U9), con prompt listo, plantilla de registro (descarga CSV) y lista de verificación. Script: `assets/taller.js`.

Botón claro/oscuro: `assets/tema.js`, cargado en el `<head>` de todas las páginas; agrega el botón al encabezado y guarda la elección en `aula-danfer-tema` (sin elección, sigue al sistema).

Claves de `localStorage`: `tpr-repaso-v1`, `tpr-simulacros-v1`, `teoria-programacion-ruta-v1`, `iso1-repaso-v1`, `iso1-simulacros-v1`, `iso1-ruta-v1`, `tic-repaso-v1`, `tic-simulacros-v1`, `tic-ruta-v1`.

## Publicar con GitHub Pages

Settings → Pages → Source: «Deploy from a branch» → rama `main`, carpeta `/ (root)`.

## Fuentes

Todas las referencias son de acceso abierto y se verificaron el 7 de octubre de 2026 contra las afirmaciones del sitio.
Los ejemplos de código se ejecutaron y su salida se copió tal cual.

### Ingeniería del Software 1

Texto base: Pressman (2010), rotulado como texto de cátedra (no es de acceso abierto). Se cita el capítulo y la página solo donde fue verificada (caps. 5, 6 y 7). Las fuentes abiertas se verificaron el 26 de octubre de 2026. Caso transversal: sistema de turnos de una USF. Los juegos de ISO1 no usan el laboratorio de Python.

### Tecnología de la Información y Comunicación (TIC)

Unidades según la guía didáctica (U1 a U9), con el modelo Entrada → Proceso → Salida como eje. Caso transversal: Copias Arandú (fotocopiadora de barrio).
Reutiliza material del sitio del BATIN (Oca de la Ofimática, errores en la planilla, guías de IA, Word y presentaciones), adaptado a tuteo y registro universitario.
Fuentes abiertas verificadas el 16 de noviembre de 2026. Las fórmulas usan punto y coma (;).
«Hecho por estudiantes»: cinco juegos del Desafío de la cátedra, sin nombres de integrantes, como enlaces externos.
