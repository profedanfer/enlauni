/* =========================================================
   Casos de «Caza el defecto» · Ingeniería del Software 1
   Cada caso: un artefacto (requerimientos, caso de uso, DFD, código o interfaz) con un defecto,
   el síntoma que produjo, los elementos culpables, el principio que no se respetó (y tres distractores),
   la explicación y una corrección posible. Archivo generado; los DFD usan la notación de la cátedra.
   ========================================================= */
const PRINCIPIOS = {
 "verificable": {
  "nombre": "Un requerimiento debe ser verificable: necesita una medida o una condición",
  "u": 5
 },
 "solucion": {
  "nombre": "Una solución no es un requerimiento: hay que encontrar la necesidad detrás",
  "u": 5
 },
 "libre-contexto": {
  "nombre": "Las primeras preguntas son libres de contexto: no presuponen una solución técnica",
  "u": 5
 },
 "posponer-impl": {
  "nombre": "En el modelo de requerimientos se posponen las consideraciones de implementación",
  "u": 6
 },
 "pre-post": {
  "nombre": "La precondición es lo que debe cumplirse antes; la postcondición, el estado al terminar",
  "u": 6
 },
 "actor-principal": {
  "nombre": "El actor principal tiene un objetivo que requiere la ayuda del sistema; no es el sistema",
  "u": 6
 },
 "notacion-proceso": {
  "nombre": "En el DFD de la cátedra, el proceso es un círculo (burbuja) numerado",
  "u": 7
 },
 "notacion-almacen": {
  "nombre": "En el DFD, el almacén son dos líneas paralelas abiertas a los costados",
  "u": 7
 },
 "entidad-entidad": {
  "nombre": "Todo flujo pasa por un proceso: no hay flujos entre entidades externas",
  "u": 7
 },
 "agujero-negro": {
  "nombre": "Todo proceso transforma entradas en salidas: un proceso sin salida es un «agujero negro»",
  "u": 7
 },
 "leyenda": {
  "nombre": "Todas las flechas y burbujas se etiquetan con nombres significativos",
  "u": 7
 },
 "almacen-almacen": {
  "nombre": "Un almacén no envía datos a otro almacén: lo hace un proceso",
  "u": 7
 },
 "nivel0": {
  "nombre": "El nivel 0 representa el sistema completo como una sola burbuja",
  "u": 7
 },
 "cohesion": {
  "nombre": "Un módulo debe tener cohesión alta: tareas relacionadas con un solo propósito",
  "u": 8
 },
 "acoplamiento-control": {
  "nombre": "Evitar el acoplamiento de control: no pasar banderas que dirigen la lógica de otro componente",
  "u": 10
 },
 "dip": {
  "nombre": "Inversión de dependencias: depender de abstracciones, no de implementaciones concretas",
  "u": 10
 },
 "error-claro": {
  "nombre": "Los mensajes de error deben explicar el problema y cómo recuperarse (Nielsen)",
  "u": 11
 },
 "reconocer": {
  "nombre": "Reconocer antes que recordar: mostrar opciones en lugar de exigir memoria (Nielsen; reglas de oro)",
  "u": 11
 }
};
const CASOS_DEFECTO = [
 {
  "id": "r1",
  "u": 5,
  "tipo": "texto",
  "titulo": "Requerimientos de la despensa con delivery",
  "sintoma": "En las pruebas de aceptación, el dueño dice que el sistema «no es rápido» y el equipo dice que sí. Nadie puede demostrar quién tiene razón.",
  "lineas": [
   "R1. El cliente puede registrarse con su número de celular.",
   "R2. El sistema debe ser rápido.",
   "R3. El cliente puede ver el historial de sus pedidos.",
   "R4. El repartidor recibe la dirección del pedido asignado."
  ],
  "culpables": [
   1
  ],
  "principio": "verificable",
  "distractores": [
   "solucion",
   "libre-contexto",
   "pre-post"
  ],
  "explicacion": "«Rápido» no tiene medida ni condición: no hay prueba que diga si se cumple.",
  "correccion": "R2. La lista de productos se muestra en menos de 2 segundos con conexión 4G y hasta 100 usuarios simultáneos.",
  "pista": "¿Cuál de los enunciados no se puede probar en una prueba de aceptación?"
 },
 {
  "id": "r2",
  "u": 5,
  "tipo": "texto",
  "titulo": "Pedidos de la directora de la USF",
  "sintoma": "Se construyó exactamente lo pedido, pero enfermería sigue sin distinguir las urgencias en la lista del día porque la pantalla de la sala es en blanco y negro.",
  "lineas": [
   "Necesito que los pacientes pidan turno sin venir de madrugada.",
   "Quiero un botón rojo grande para los turnos de urgencia.",
   "Necesito saber cuántas personas atendimos por especialidad cada mes.",
   "Necesito que los turnos no se superpongan."
  ],
  "culpables": [
   1
  ],
  "principio": "solucion",
  "distractores": [
   "verificable",
   "actor-principal",
   "posponer-impl"
  ],
  "explicacion": "El botón rojo es una solución; la necesidad es distinguir las urgencias de un vistazo, con cualquier medio.",
  "correccion": "Necesito distinguir de un vistazo los turnos de urgencia en la lista del día y en la pantalla de la sala.",
  "pista": "¿Cuál de los pedidos ya trae la respuesta de diseño incluida?"
 },
 {
  "id": "r3",
  "u": 5,
  "tipo": "texto",
  "titulo": "Guion de la primera entrevista",
  "sintoma": "En la primera reunión, el cliente de una cooperativa se quedó en silencio y después dijo que «de eso no entiende».",
  "lineas": [
   "1. ¿Quién va a usar el sistema todos los días?",
   "2. ¿Cómo se ve un buen mes de acopio para usted?",
   "3. ¿Prefiere que lo hagamos en React o en Angular?",
   "4. ¿Hay alguien más con quien deberíamos hablar?"
  ],
  "culpables": [
   2
  ],
  "principio": "libre-contexto",
  "distractores": [
   "verificable",
   "solucion",
   "cohesion"
  ],
  "explicacion": "La pregunta 3 presupone una solución técnica y usa un vocabulario que el cliente no comparte todavía.",
  "correccion": "3. ¿Qué pasa hoy cuando un socio entrega su producción? ¿Qué parte de ese proceso le preocupa más?",
  "pista": "¿Qué pregunta no podría responder alguien sin formación técnica?"
 },
 {
  "id": "c1",
  "u": 6,
  "tipo": "texto",
  "titulo": "Caso de uso «Reservar cancha»",
  "sintoma": "En la revisión, el cliente pregunta si «tienen que usar ese botón verde», porque su club ya tiene otra app con un menú distinto.",
  "lineas": [
   "Actor principal: Socio del club",
   "1. El socio elige el día y la cancha.",
   "2. El sistema muestra los horarios libres.",
   "3. El socio hace clic en el botón verde «Reservar» de la pantalla principal.",
   "4. El sistema registra la reserva y envía la confirmación."
  ],
  "culpables": [
   3
  ],
  "principio": "posponer-impl",
  "distractores": [
   "pre-post",
   "actor-principal",
   "leyenda"
  ],
  "explicacion": "El paso describe la interfaz (botón, color, pantalla): es una decisión de diseño que se pospone.",
  "correccion": "3. El socio confirma el horario elegido.",
  "pista": "¿Qué paso habla de cómo se ve el sistema en lugar de qué hace el actor?"
 },
 {
  "id": "c2",
  "u": 6,
  "tipo": "texto",
  "titulo": "Caso de uso «Pedir turno»",
  "sintoma": "El equipo de pruebas no sabe qué verificar antes de ejecutar el caso: una de las condiciones solo se cumple al final.",
  "lineas": [
   "Actor principal: Paciente",
   "Precondición: la agenda del día está cargada.",
   "Precondición: el turno queda registrado como «confirmado».",
   "Disparador: el paciente decide pedir un turno.",
   "Flujo básico: 1. El paciente elige especialidad y día…"
  ],
  "culpables": [
   2
  ],
  "principio": "pre-post",
  "distractores": [
   "posponer-impl",
   "verificable",
   "actor-principal"
  ],
  "explicacion": "«El turno queda registrado» describe el estado al terminar con éxito: es una postcondición, no una precondición.",
  "correccion": "Postcondición: el turno queda registrado como «confirmado» y aparece en la lista del día.",
  "pista": "¿Qué condición no puede ser cierta antes de empezar?"
 },
 {
  "id": "c3",
  "u": 6,
  "tipo": "texto",
  "titulo": "Caso de uso «Generar reporte mensual»",
  "sintoma": "Nadie sabe para quién es el reporte ni qué objetivo cumple: el caso no tiene a quién preguntarle si quedó bien.",
  "lineas": [
   "Actor principal: El sistema",
   "Objetivo: generar el reporte mensual de atenciones.",
   "Disparador: último día hábil del mes.",
   "1. Se agrupan las atenciones por especialidad.",
   "2. Se envía el reporte a la región sanitaria."
  ],
  "culpables": [
   0
  ],
  "principio": "actor-principal",
  "distractores": [
   "pre-post",
   "posponer-impl",
   "libre-contexto"
  ],
  "explicacion": "El sistema no puede ser su propio actor principal: el objetivo es de alguien que necesita la ayuda del sistema.",
  "correccion": "Actor principal: Responsable de estadística de la región sanitaria (objetivo: contar con las atenciones del mes para planificar).",
  "pista": "Según Cockburn, ¿de quién es el objetivo de un caso de uso?"
 },
 {
  "id": "d1",
  "u": 7,
  "tipo": "dfd",
  "titulo": "Préstamos de la biblioteca (nivel 1)",
  "sintoma": "La corrección del TPI descontó puntos por simbología en este diagrama.",
  "svg": "<svg viewBox=\"0 0 700 200\" role=\"img\" aria-labelledby=\"ts1\" xmlns=\"http://www.w3.org/2000/svg\"><title id=\"ts1\">DFD con un defecto de notación</title><defs><marker id=\"pf1\" viewBox=\"0 0 10 10\" refX=\"9\" refY=\"5\" markerWidth=\"8\" markerHeight=\"8\" orient=\"auto-start-reverse\"><path class=\"punta\" d=\"M0,0 L10,5 L0,10 z\"/></marker><marker id=\"pi1\" viewBox=\"0 0 10 10\" refX=\"9\" refY=\"5\" markerWidth=\"8\" markerHeight=\"8\" orient=\"auto-start-reverse\"><path class=\"punta\" d=\"M0,0 L10,5 L0,10 z\"/></marker></defs><g data-id=\"e1\"><rect class=\"ent\" x=\"20\" y=\"90\" width=\"120\" height=\"60\"/><text x=\"80.0\" y=\"125.0\" text-anchor=\"middle\" class=\"neg\">Estudiante</text></g><g data-id=\"p1\"><rect class=\"proc\" x=\"268\" y=\"76.6\" width=\"124\" height=\"86.8\" rx=\"4\"/><text x=\"330\" y=\"76\" text-anchor=\"middle\" class=\"num-p\">1</text><text x=\"330\" y=\"123.0\" text-anchor=\"middle\" class=\"\">Registrar</text><text x=\"330\" y=\"139.0\" text-anchor=\"middle\" class=\"\">préstamo</text></g><g data-id=\"a1\"><rect class=\"alm-fondo\" x=\"520\" y=\"103\" width=\"150\" height=\"34\"/><line class=\"alm\" x1=\"520\" y1=\"103\" x2=\"670\" y2=\"103\"/><line class=\"alm\" x1=\"520\" y1=\"137\" x2=\"670\" y2=\"137\"/><text x=\"595.0\" y=\"125.0\" text-anchor=\"middle\" class=\"\">D1 Préstamos</text></g><g data-id=\"f1\"><path class=\"flujo\" d=\"M140,110 L268,110\" marker-end=\"url(#pf1)\"/><text x=\"200\" y=\"103.0\" text-anchor=\"middle\" class=\"chico\">pedido de libro</text></g><g data-id=\"f2\"><path class=\"flujo\" d=\"M268,135 L140,135\" marker-end=\"url(#pf1)\"/><text x=\"200\" y=\"157.0\" text-anchor=\"middle\" class=\"chico\">comprobante</text></g><g data-id=\"f3\"><path class=\"flujo\" d=\"M392,120 L520,120\" marker-end=\"url(#pf1)\"/><text x=\"456\" y=\"113.0\" text-anchor=\"middle\" class=\"chico\">préstamo registrado</text></g></svg>",
  "culpables": [
   "p1"
  ],
  "principio": "notacion-proceso",
  "distractores": [
   "notacion-almacen",
   "leyenda",
   "nivel0"
  ],
  "explicacion": "El proceso está dibujado como rectángulo; en la notación de la cátedra es un círculo numerado.",
  "correccion": "Dibujar «1 Registrar préstamo» como burbuja (círculo) con su número arriba.",
  "pista": "Mira la forma de cada símbolo: ¿cuál no corresponde a la notación de clase?"
 },
 {
  "id": "d2",
  "u": 7,
  "tipo": "dfd",
  "titulo": "Préstamos de la biblioteca (nivel 1)",
  "sintoma": "La corrección del TPI descontó puntos por simbología en este diagrama.",
  "svg": "<svg viewBox=\"0 0 700 200\" role=\"img\" aria-labelledby=\"ts2\" xmlns=\"http://www.w3.org/2000/svg\"><title id=\"ts2\">DFD con un defecto de notación</title><defs><marker id=\"pf2\" viewBox=\"0 0 10 10\" refX=\"9\" refY=\"5\" markerWidth=\"8\" markerHeight=\"8\" orient=\"auto-start-reverse\"><path class=\"punta\" d=\"M0,0 L10,5 L0,10 z\"/></marker><marker id=\"pi2\" viewBox=\"0 0 10 10\" refX=\"9\" refY=\"5\" markerWidth=\"8\" markerHeight=\"8\" orient=\"auto-start-reverse\"><path class=\"punta\" d=\"M0,0 L10,5 L0,10 z\"/></marker></defs><g data-id=\"e1\"><rect class=\"ent\" x=\"20\" y=\"90\" width=\"120\" height=\"60\"/><text x=\"80.0\" y=\"125.0\" text-anchor=\"middle\" class=\"neg\">Estudiante</text></g><g data-id=\"p1\"><circle class=\"proc\" cx=\"330\" cy=\"120\" r=\"62\"/><text x=\"330\" y=\"76\" text-anchor=\"middle\" class=\"num-p\">1</text><text x=\"330\" y=\"123.0\" text-anchor=\"middle\" class=\"\">Registrar</text><text x=\"330\" y=\"139.0\" text-anchor=\"middle\" class=\"\">préstamo</text></g><g data-id=\"a1\"><rect class=\"alm-fondo\" x=\"520\" y=\"103\" width=\"150\" height=\"34\"/><rect class=\"alm\" x=\"520\" y=\"103\" width=\"150\" height=\"34\" fill=\"none\"/><text x=\"595.0\" y=\"125.0\" text-anchor=\"middle\" class=\"\">D1 Préstamos</text></g><g data-id=\"f1\"><path class=\"flujo\" d=\"M140,110 L268.1,116.7\" marker-end=\"url(#pf2)\"/><text x=\"200\" y=\"103.0\" text-anchor=\"middle\" class=\"chico\">pedido de libro</text></g><g data-id=\"f2\"><path class=\"flujo\" d=\"M268.2,124.9 L140,135\" marker-end=\"url(#pf2)\"/><text x=\"200\" y=\"157.0\" text-anchor=\"middle\" class=\"chico\">comprobante</text></g><g data-id=\"f3\"><path class=\"flujo\" d=\"M392,120 L520,120\" marker-end=\"url(#pf2)\"/><text x=\"456\" y=\"113.0\" text-anchor=\"middle\" class=\"chico\">préstamo registrado</text></g></svg>",
  "culpables": [
   "a1"
  ],
  "principio": "notacion-almacen",
  "distractores": [
   "notacion-proceso",
   "entidad-entidad",
   "leyenda"
  ],
  "explicacion": "El almacén está dibujado como un rectángulo cerrado; deben ser dos líneas paralelas abiertas a los costados.",
  "correccion": "Dibujar «D1 Préstamos» con dos líneas horizontales paralelas, sin cerrar los costados.",
  "pista": "Revisa los cuatro símbolos uno por uno."
 },
 {
  "id": "d3",
  "u": 7,
  "tipo": "dfd",
  "titulo": "Despensa con delivery (nivel 0 parcial)",
  "sintoma": "Al pasar este diagrama a diseño, nadie sabe qué componente procesa la confirmación de entrega.",
  "svg": "<svg viewBox=\"0 0 710 280\" role=\"img\" aria-labelledby=\"ts3\" xmlns=\"http://www.w3.org/2000/svg\"><title id=\"ts3\">DFD con un flujo indebido</title><defs><marker id=\"pf3\" viewBox=\"0 0 10 10\" refX=\"9\" refY=\"5\" markerWidth=\"8\" markerHeight=\"8\" orient=\"auto-start-reverse\"><path class=\"punta\" d=\"M0,0 L10,5 L0,10 z\"/></marker><marker id=\"pi3\" viewBox=\"0 0 10 10\" refX=\"9\" refY=\"5\" markerWidth=\"8\" markerHeight=\"8\" orient=\"auto-start-reverse\"><path class=\"punta\" d=\"M0,0 L10,5 L0,10 z\"/></marker></defs><g data-id=\"e1\"><rect class=\"ent\" x=\"20\" y=\"40\" width=\"130\" height=\"56\"/><text x=\"85.0\" y=\"73.0\" text-anchor=\"middle\" class=\"neg\">Cliente</text></g><g data-id=\"e2\"><rect class=\"ent\" x=\"20\" y=\"200\" width=\"130\" height=\"56\"/><text x=\"85.0\" y=\"233.0\" text-anchor=\"middle\" class=\"neg\">Repartidor</text></g><g data-id=\"e3\"><rect class=\"ent\" x=\"560\" y=\"120\" width=\"130\" height=\"56\"/><text x=\"625.0\" y=\"153.0\" text-anchor=\"middle\" class=\"neg\">Proveedor</text></g><g data-id=\"p1\"><circle class=\"proc\" cx=\"350\" cy=\"148\" r=\"62\"/><text x=\"350\" y=\"104\" text-anchor=\"middle\" class=\"num-p\">1</text><text x=\"350\" y=\"151.0\" text-anchor=\"middle\" class=\"\">Gestionar</text><text x=\"350\" y=\"167.0\" text-anchor=\"middle\" class=\"\">pedido</text></g><g data-id=\"f1\"><path class=\"flujo\" d=\"M150,70 L292.2,125.5\" marker-end=\"url(#pf3)\"/><text x=\"230\" y=\"87.0\" text-anchor=\"middle\" class=\"chico\">pedido</text></g><g data-id=\"f2\"><path class=\"flujo\" d=\"M292.1,170.3 L150,225\" marker-end=\"url(#pf3)\"/><text x=\"250\" y=\"219.0\" text-anchor=\"middle\" class=\"chico\">pedido a entregar</text></g><g data-id=\"f3\"><path class=\"flujo\" d=\"M85,200 L85,96\" marker-end=\"url(#pf3)\"/><text x=\"95\" y=\"148.0\" text-anchor=\"start\" class=\"chico\">entrega</text><text x=\"95\" y=\"162.0\" text-anchor=\"start\" class=\"chico\">confirmada</text></g><g data-id=\"f4\"><path class=\"flujo\" d=\"M412,148 L560,148\" marker-end=\"url(#pf3)\"/><text x=\"486\" y=\"141.0\" text-anchor=\"middle\" class=\"chico\">orden de compra</text></g></svg>",
  "culpables": [
   "f3"
  ],
  "principio": "entidad-entidad",
  "distractores": [
   "agujero-negro",
   "leyenda",
   "notacion-proceso"
  ],
  "explicacion": "El flujo «entrega confirmada» va del Repartidor al Cliente sin pasar por un proceso: es un intercambio fuera del sistema.",
  "correccion": "Hacer que el Repartidor envíe «entrega confirmada» al proceso «Gestionar pedido», que luego informa al Cliente; o quitar el flujo si no es parte del sistema.",
  "pista": "¿Todos los flujos tocan una burbuja en alguno de sus extremos?"
 },
 {
  "id": "d4",
  "u": 7,
  "tipo": "dfd",
  "titulo": "Despensa con delivery (nivel 1 parcial)",
  "sintoma": "El cliente recibe el total sin descuento aunque le corresponde: el descuento se calcula, pero nunca llega a ningún lado.",
  "svg": "<svg viewBox=\"0 0 640 290\" role=\"img\" aria-labelledby=\"ts4\" xmlns=\"http://www.w3.org/2000/svg\"><title id=\"ts4\">DFD con un proceso sin salida</title><defs><marker id=\"pf4\" viewBox=\"0 0 10 10\" refX=\"9\" refY=\"5\" markerWidth=\"8\" markerHeight=\"8\" orient=\"auto-start-reverse\"><path class=\"punta\" d=\"M0,0 L10,5 L0,10 z\"/></marker><marker id=\"pi4\" viewBox=\"0 0 10 10\" refX=\"9\" refY=\"5\" markerWidth=\"8\" markerHeight=\"8\" orient=\"auto-start-reverse\"><path class=\"punta\" d=\"M0,0 L10,5 L0,10 z\"/></marker></defs><g data-id=\"e1\"><rect class=\"ent\" x=\"20\" y=\"60\" width=\"130\" height=\"56\"/><text x=\"85.0\" y=\"93.0\" text-anchor=\"middle\" class=\"neg\">Cliente</text></g><g data-id=\"p1\"><circle class=\"proc\" cx=\"300\" cy=\"88\" r=\"58\"/><text x=\"300\" y=\"48\" text-anchor=\"middle\" class=\"num-p\">1</text><text x=\"300\" y=\"91.0\" text-anchor=\"middle\" class=\"\">Tomar</text><text x=\"300\" y=\"107.0\" text-anchor=\"middle\" class=\"\">pedido</text></g><g data-id=\"p2\"><circle class=\"proc\" cx=\"520\" cy=\"88\" r=\"58\"/><text x=\"520\" y=\"48\" text-anchor=\"middle\" class=\"num-p\">2</text><text x=\"520\" y=\"91.0\" text-anchor=\"middle\" class=\"\">Calcular</text><text x=\"520\" y=\"107.0\" text-anchor=\"middle\" class=\"\">descuento</text></g><g data-id=\"a1\"><rect class=\"alm-fondo\" x=\"230\" y=\"220\" width=\"150\" height=\"34\"/><line class=\"alm\" x1=\"230\" y1=\"220\" x2=\"380\" y2=\"220\"/><line class=\"alm\" x1=\"230\" y1=\"254\" x2=\"380\" y2=\"254\"/><text x=\"305.0\" y=\"242.0\" text-anchor=\"middle\" class=\"\">D1 Pedidos</text></g><g data-id=\"f1\"><path class=\"flujo\" d=\"M150,88 L242.0,88.0\" marker-end=\"url(#pf4)\"/><text x=\"196\" y=\"81.0\" text-anchor=\"middle\" class=\"chico\">pedido</text></g><g data-id=\"f2\"><path class=\"flujo\" d=\"M358.0,88.0 L462.0,88.0\" marker-end=\"url(#pf4)\"/><text x=\"410\" y=\"81.0\" text-anchor=\"middle\" class=\"chico\">total del pedido</text></g><g data-id=\"f3\"><path class=\"flujo\" d=\"M300.0,146.0 L300,220\" marker-end=\"url(#pf4)\"/><text x=\"310\" y=\"190.0\" text-anchor=\"start\" class=\"chico\">pedido registrado</text></g><g data-id=\"f4\"><path class=\"flujo\" d=\"M380,237 L520,237 L520.0,146.0\" marker-end=\"url(#pf4)\"/><text x=\"450\" y=\"260.0\" text-anchor=\"middle\" class=\"chico\">historial del cliente</text></g></svg>",
  "culpables": [
   "p2"
  ],
  "principio": "agujero-negro",
  "distractores": [
   "almacen-almacen",
   "entidad-entidad",
   "notacion-almacen"
  ],
  "explicacion": "«Calcular descuento» recibe dos flujos y no produce ninguno: es un agujero negro.",
  "correccion": "Agregar la salida «total con descuento» desde el proceso 2 hacia el Cliente (o hacia el proceso que emite la factura).",
  "pista": "Cuenta las flechas que entran y salen de cada burbuja."
 },
 {
  "id": "d5",
  "u": 7,
  "tipo": "dfd",
  "titulo": "Turnos USF (fragmento del nivel 1)",
  "sintoma": "En la revisión, nadie se pone de acuerdo sobre qué dato recibe el paciente.",
  "svg": "<svg viewBox=\"0 0 680 200\" role=\"img\" aria-labelledby=\"ts5\" xmlns=\"http://www.w3.org/2000/svg\"><title id=\"ts5\">DFD con un flujo sin etiqueta</title><defs><marker id=\"pf5\" viewBox=\"0 0 10 10\" refX=\"9\" refY=\"5\" markerWidth=\"8\" markerHeight=\"8\" orient=\"auto-start-reverse\"><path class=\"punta\" d=\"M0,0 L10,5 L0,10 z\"/></marker><marker id=\"pi5\" viewBox=\"0 0 10 10\" refX=\"9\" refY=\"5\" markerWidth=\"8\" markerHeight=\"8\" orient=\"auto-start-reverse\"><path class=\"punta\" d=\"M0,0 L10,5 L0,10 z\"/></marker></defs><g data-id=\"e1\"><rect class=\"ent\" x=\"20\" y=\"90\" width=\"130\" height=\"56\"/><text x=\"85.0\" y=\"123.0\" text-anchor=\"middle\" class=\"neg\">Paciente</text></g><g data-id=\"p1\"><circle class=\"proc\" cx=\"330\" cy=\"118\" r=\"62\"/><text x=\"330\" y=\"74\" text-anchor=\"middle\" class=\"num-p\">2</text><text x=\"330\" y=\"121.0\" text-anchor=\"middle\" class=\"\">Asignar</text><text x=\"330\" y=\"137.0\" text-anchor=\"middle\" class=\"\">turno</text></g><g data-id=\"a1\"><rect class=\"alm-fondo\" x=\"500\" y=\"101\" width=\"150\" height=\"34\"/><line class=\"alm\" x1=\"500\" y1=\"101\" x2=\"650\" y2=\"101\"/><line class=\"alm\" x1=\"500\" y1=\"135\" x2=\"650\" y2=\"135\"/><text x=\"575.0\" y=\"123.0\" text-anchor=\"middle\" class=\"\">D3 Turnos</text></g><g data-id=\"f1\"><path class=\"flujo\" d=\"M150,105 L268.2,113.5\" marker-end=\"url(#pf5)\"/><text x=\"210\" y=\"98.0\" text-anchor=\"middle\" class=\"chico\">solicitud de turno</text></g><g data-id=\"f2\"><path class=\"flujo\" d=\"M268.2,122.8 L150,132\" marker-end=\"url(#pf5)\"/></g><g data-id=\"f3\"><path class=\"flujo\" d=\"M392,118 L500,118\" marker-end=\"url(#pf5)\"/><text x=\"446\" y=\"111.0\" text-anchor=\"middle\" class=\"chico\">turno confirmado</text></g></svg>",
  "culpables": [
   "f2"
  ],
  "principio": "leyenda",
  "distractores": [
   "notacion-proceso",
   "agujero-negro",
   "nivel0"
  ],
  "explicacion": "El flujo hacia el Paciente no tiene leyenda: no se sabe qué dato transporta.",
  "correccion": "Etiquetar el flujo como «confirmación de turno».",
  "pista": "Lee todas las flechas: ¿alguna no dice qué dato lleva?"
 },
 {
  "id": "d6",
  "u": 7,
  "tipo": "dfd",
  "titulo": "Turnos USF (fragmento del nivel 1)",
  "sintoma": "En diseño aparece una «copia automática» entre tablas que nadie sabe qué componente ejecuta.",
  "svg": "<svg viewBox=\"0 0 660 290\" role=\"img\" aria-labelledby=\"ts6\" xmlns=\"http://www.w3.org/2000/svg\"><title id=\"ts6\">DFD con un flujo entre almacenes</title><defs><marker id=\"pf6\" viewBox=\"0 0 10 10\" refX=\"9\" refY=\"5\" markerWidth=\"8\" markerHeight=\"8\" orient=\"auto-start-reverse\"><path class=\"punta\" d=\"M0,0 L10,5 L0,10 z\"/></marker><marker id=\"pi6\" viewBox=\"0 0 10 10\" refX=\"9\" refY=\"5\" markerWidth=\"8\" markerHeight=\"8\" orient=\"auto-start-reverse\"><path class=\"punta\" d=\"M0,0 L10,5 L0,10 z\"/></marker></defs><g data-id=\"e1\"><rect class=\"ent\" x=\"20\" y=\"60\" width=\"130\" height=\"56\"/><text x=\"85.0\" y=\"85.0\" text-anchor=\"middle\" class=\"neg\">Personal</text><text x=\"85.0\" y=\"101.0\" text-anchor=\"middle\" class=\"neg\">de salud</text></g><g data-id=\"p1\"><circle class=\"proc\" cx=\"300\" cy=\"88\" r=\"58\"/><text x=\"300\" y=\"48\" text-anchor=\"middle\" class=\"num-p\">3</text><text x=\"300\" y=\"91.0\" text-anchor=\"middle\" class=\"\">Registrar</text><text x=\"300\" y=\"107.0\" text-anchor=\"middle\" class=\"\">atención</text></g><g data-id=\"a1\"><rect class=\"alm-fondo\" x=\"200\" y=\"220\" width=\"150\" height=\"34\"/><line class=\"alm\" x1=\"200\" y1=\"220\" x2=\"350\" y2=\"220\"/><line class=\"alm\" x1=\"200\" y1=\"254\" x2=\"350\" y2=\"254\"/><text x=\"275.0\" y=\"242.0\" text-anchor=\"middle\" class=\"\">D3 Turnos</text></g><g data-id=\"a2\"><rect class=\"alm-fondo\" x=\"470\" y=\"220\" width=\"160\" height=\"34\"/><line class=\"alm\" x1=\"470\" y1=\"220\" x2=\"630\" y2=\"220\"/><line class=\"alm\" x1=\"470\" y1=\"254\" x2=\"630\" y2=\"254\"/><text x=\"550.0\" y=\"242.0\" text-anchor=\"middle\" class=\"\">D4 Atenciones</text></g><g data-id=\"f1\"><path class=\"flujo\" d=\"M150,88 L242.0,88.0\" marker-end=\"url(#pf6)\"/><text x=\"196\" y=\"62.0\" text-anchor=\"middle\" class=\"chico\">registro de</text><text x=\"196\" y=\"76.0\" text-anchor=\"middle\" class=\"chico\">atención</text></g><g data-id=\"f2\"><path class=\"flujo\" d=\"M275,220 L289.2,145.0\" marker-end=\"url(#pf6)\"/><text x=\"290\" y=\"190.0\" text-anchor=\"end\" class=\"chico\">turnos del día</text></g><g data-id=\"f3\"><path class=\"flujo\" d=\"M350,237 L470,237\" marker-end=\"url(#pf6)\"/><text x=\"410\" y=\"230.0\" text-anchor=\"middle\" class=\"chico\">atenciones</text></g><g data-id=\"f4\"><path class=\"flujo\" d=\"M242.5,95.7 L150,108\" marker-end=\"url(#pf6)\"/><text x=\"205\" y=\"124.0\" text-anchor=\"middle\" class=\"chico\">lista de</text><text x=\"205\" y=\"138.0\" text-anchor=\"middle\" class=\"chico\">pacientes</text></g></svg>",
  "culpables": [
   "f3"
  ],
  "principio": "almacen-almacen",
  "distractores": [
   "entidad-entidad",
   "leyenda",
   "notacion-almacen"
  ],
  "explicacion": "Los datos van de D3 a D4 sin pasar por un proceso: un almacén no transforma ni mueve datos por sí mismo.",
  "correccion": "Hacer que el proceso 3 lea de D3 y escriba «atención registrada» en D4.",
  "pista": "¿Qué flecha une dos símbolos que no pueden transformar datos?"
 },
 {
  "id": "d7",
  "u": 7,
  "tipo": "dfd",
  "titulo": "Cooperativa de acopio (nivel 0)",
  "sintoma": "El docente devolvió el diagrama con la anotación «esto no es un diagrama de contexto».",
  "svg": "<svg viewBox=\"0 0 750 260\" role=\"img\" aria-labelledby=\"ts7\" xmlns=\"http://www.w3.org/2000/svg\"><title id=\"ts7\">Diagrama de contexto con un defecto</title><defs><marker id=\"pf7\" viewBox=\"0 0 10 10\" refX=\"9\" refY=\"5\" markerWidth=\"8\" markerHeight=\"8\" orient=\"auto-start-reverse\"><path class=\"punta\" d=\"M0,0 L10,5 L0,10 z\"/></marker><marker id=\"pi7\" viewBox=\"0 0 10 10\" refX=\"9\" refY=\"5\" markerWidth=\"8\" markerHeight=\"8\" orient=\"auto-start-reverse\"><path class=\"punta\" d=\"M0,0 L10,5 L0,10 z\"/></marker></defs><g data-id=\"e1\"><rect class=\"ent\" x=\"20\" y=\"120\" width=\"130\" height=\"56\"/><text x=\"85.0\" y=\"153.0\" text-anchor=\"middle\" class=\"neg\">Socio</text></g><g data-id=\"e2\"><rect class=\"ent\" x=\"600\" y=\"120\" width=\"130\" height=\"56\"/><text x=\"665.0\" y=\"153.0\" text-anchor=\"middle\" class=\"neg\">Administración</text></g><g data-id=\"p1\"><circle class=\"proc\" cx=\"290\" cy=\"148\" r=\"58\"/><text x=\"290\" y=\"108\" text-anchor=\"middle\" class=\"num-p\">0</text><text x=\"290\" y=\"151.0\" text-anchor=\"middle\" class=\"\">Registrar</text><text x=\"290\" y=\"167.0\" text-anchor=\"middle\" class=\"\">acopio</text></g><g data-id=\"p2\"><circle class=\"proc\" cx=\"460\" cy=\"148\" r=\"58\"/><text x=\"460\" y=\"108\" text-anchor=\"middle\" class=\"num-p\">0</text><text x=\"460\" y=\"151.0\" text-anchor=\"middle\" class=\"\">Liquidar</text><text x=\"460\" y=\"167.0\" text-anchor=\"middle\" class=\"\">pagos</text></g><g data-id=\"f1\"><path class=\"flujo\" d=\"M150,148 L232.0,148.0\" marker-end=\"url(#pf7)\"/><text x=\"205\" y=\"141.0\" text-anchor=\"middle\" class=\"chico\">entrega de producción</text></g><g data-id=\"f2\"><path class=\"flujo\" d=\"M348.0,148.0 L402.0,148.0\" marker-end=\"url(#pf7)\"/><text x=\"375\" y=\"141.0\" text-anchor=\"middle\" class=\"chico\">acopio</text></g><g data-id=\"f3\"><path class=\"flujo\" d=\"M518.0,148.0 L600,148\" marker-end=\"url(#pf7)\"/><text x=\"560\" y=\"141.0\" text-anchor=\"middle\" class=\"chico\">liquidación</text></g></svg>",
  "culpables": [
   "p1",
   "p2"
  ],
  "principio": "nivel0",
  "distractores": [
   "notacion-proceso",
   "leyenda",
   "entidad-entidad"
  ],
  "explicacion": "El nivel 0 debe mostrar el sistema completo como una sola burbuja; aquí ya está descompuesto en dos procesos.",
  "correccion": "Una sola burbuja «0 Sistema de acopio» con los flujos de entrada y salida; los dos procesos pasan al nivel 1.",
  "pista": "¿Cuántas burbujas debe tener un diagrama de contexto?"
 },
 {
  "id": "m1",
  "u": 8,
  "tipo": "texto",
  "titulo": "Módulos del sistema de facturación",
  "sintoma": "Cada cambio menor obliga a recompilar y probar un módulo que toca medio sistema.",
  "lineas": [
   "Ventas: registra ventas y anula ventas.",
   "Impuestos: calcula IVA según las reglas vigentes.",
   "Utilidades: valida cédulas, envía correos, calcula IVA y comprime imágenes.",
   "Formato tributario: arma la factura en el formato oficial."
  ],
  "culpables": [
   2
  ],
  "principio": "cohesion",
  "distractores": [
   "acoplamiento-control",
   "dip",
   "posponer-impl"
  ],
  "explicacion": "«Utilidades» agrupa tareas sin relación entre sí: cohesión baja. Además duplica el cálculo de IVA.",
  "correccion": "Repartir: validación de cédula en «Clientes», envío en «Canal de envío», IVA solo en «Impuestos» y compresión en un módulo de archivos.",
  "pista": "¿Qué módulo hace cosas que no tienen un propósito común?"
 },
 {
  "id": "k1",
  "u": 10,
  "tipo": "texto",
  "titulo": "Procesamiento de pagos",
  "sintoma": "Para agregar pago con QR hubo que modificar el procesamiento de pedidos y se rompió el pago a crédito.",
  "lineas": [
   "def procesar(pedido, modo):",
   "    total = pedido.calcular_total()",
   "    if modo == 1: cobrar_contado(total)",
   "    elif modo == 2: cobrar_credito(total)",
   "    pedido.marcar_pagado()"
  ],
  "culpables": [
   2,
   3
  ],
  "principio": "acoplamiento-control",
  "distractores": [
   "cohesion",
   "reconocer",
   "pre-post"
  ],
  "explicacion": "El parámetro «modo» es una bandera que dirige la lógica: acoplamiento de control. Cada medio de pago nuevo obliga a modificar la función.",
  "correccion": "def procesar(pedido, medio_de_pago): medio_de_pago.cobrar(pedido.calcular_total()); pedido.marcar_pagado()",
  "pista": "¿Qué líneas deciden el camino según una bandera?"
 },
 {
  "id": "k2",
  "u": 10,
  "tipo": "texto",
  "titulo": "Servicio de turnos",
  "sintoma": "La USF quiere pasar de WhatsApp a SMS y hay que modificar y volver a probar la lógica de asignación de turnos.",
  "lineas": [
   "class ServicioTurnos:",
   "    def pedir_turno(self, paciente, dia):",
   "        horario = self.agenda.primer_libre(dia)",
   "        turno = self.repositorio.guardar(paciente, horario)",
   "        ClienteWhatsApp().enviar(paciente.celular, turno.resumen())"
  ],
  "culpables": [
   4
  ],
  "principio": "dip",
  "distractores": [
   "acoplamiento-control",
   "cohesion",
   "leyenda"
  ],
  "explicacion": "ServicioTurnos crea y usa directamente una implementación concreta (WhatsApp) en lugar de depender de una abstracción.",
  "correccion": "self.notificador.enviar(paciente, turno.resumen())  # notificador: abstracción recibida en el constructor",
  "pista": "¿Qué línea ata el servicio a un proveedor concreto?"
 },
 {
  "id": "i1",
  "u": 11,
  "tipo": "texto",
  "titulo": "Pantalla «Pedir turno» (primer incremento)",
  "sintoma": "Muchos pacientes abandonan la pantalla sin pedir turno y llaman por teléfono a la USF.",
  "lineas": [
   "Título: SISTEMA TURNOS v2",
   "Campo: Cód. pac.",
   "Campo: Especialidad (escriba 1, 2 o 3)",
   "Campo: Fecha dd/mm/aaaa",
   "Botón: Procesar"
  ],
  "culpables": [
   2
  ],
  "principio": "reconocer",
  "distractores": [
   "error-claro",
   "posponer-impl",
   "verificable"
  ],
  "explicacion": "El paciente tiene que recordar qué número corresponde a cada especialidad: el sistema podría mostrarle las opciones.",
  "correccion": "Especialidad: lista con «Clínica general», «Pediatría» y «Control prenatal».",
  "pista": "¿Qué campo exige memoria en lugar de mostrar opciones?"
 },
 {
  "id": "i2",
  "u": 11,
  "tipo": "texto",
  "titulo": "Mensajes del sistema de turnos",
  "sintoma": "La USF recibe llamadas de pacientes que «no entienden qué pasó» al pedir turno.",
  "lineas": [
   "«Su turno fue confirmado: jueves 29, 7:30, consultorio 2.»",
   "«Error 0x45»",
   "«Faltan 3 pacientes para su turno.»",
   "«No hay horarios libres el jueves. El próximo libre es el viernes a las 7:30.»"
  ],
  "culpables": [
   1
  ],
  "principio": "error-claro",
  "distractores": [
   "reconocer",
   "verificable",
   "solucion"
  ],
  "explicacion": "El mensaje no dice qué pasó ni qué hacer: no ayuda a reconocer, diagnosticar ni recuperarse del error.",
  "correccion": "«No pudimos enviar la confirmación por mensaje. Tu turno quedó registrado: anota jueves 29, 7:30.»",
  "pista": "¿Qué mensaje no le dice al paciente qué pasó ni qué hacer?"
 }
];
