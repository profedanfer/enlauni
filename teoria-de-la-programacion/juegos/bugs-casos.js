/* =========================================================
   Casos de «Caza el bug» · Teoría de la Programación
   Cada caso: código con un error, síntoma, línea(s) culpable(s), principio de la teoría
   que no se tuvo en cuenta y explicaciones (la primera es la correcta; el juego las mezcla).
   registrada = salida real obtenida al ejecutar el código con CPython, javac/java (para el modo liviano).
   ========================================================= */
const PRINCIPIOS = {
 "compila-antes": {
  "nombre": "CPython compila todo el archivo a bytecode antes de ejecutar",
  "u": 1
 },
 "estructura": {
  "nombre": "La estructura de datos elegida determina la eficiencia",
  "u": 2
 },
 "aliasing": {
  "nombre": "Dos nombres ligados al mismo objeto (aliasing)",
  "u": 3
 },
 "alcance-local": {
  "nombre": "Un nombre vinculado dentro de una función es local",
  "u": 3
 },
 "div-entera": {
  "nombre": "El tipo de los operandos decide el tipo de la división",
  "u": 4
 },
 "tipado-fuerte": {
  "nombre": "Tipado fuerte: no se combinan tipos sin conversión explícita",
  "u": 4
 },
 "clave-inmutable": {
  "nombre": "Las claves de un diccionario deben ser inmutables",
  "u": 4
 },
 "cortocircuito": {
  "nombre": "and evalúa de izquierda a derecha y corta al primer falso",
  "u": 5
 },
 "precedencia": {
  "nombre": "Precedencia de operadores",
  "u": 5
 },
 "condicion-bucle": {
  "nombre": "La condición del bucle nunca llega a ser falsa",
  "u": 5
 },
 "paso-valor": {
  "nombre": "Paso por valor: el método trabaja con copias",
  "u": 6
 },
 "ref-objeto": {
  "nombre": "Se pasa una referencia al objeto: modificarlo se ve afuera",
  "u": 6
 },
 "caso-base": {
  "nombre": "La recursión nunca llega a su caso base",
  "u": 6
 },
 "tipo-declarado": {
  "nombre": "El compilador revisa los métodos según el tipo declarado",
  "u": 7
 },
 "init-heredado": {
  "nombre": "La subclase redefine __init__ y no inicializa lo heredado",
  "u": 7
 },
 "iterador": {
  "nombre": "Un iterador se consume una sola vez",
  "u": 8
 },
 "efecto-lateral": {
  "nombre": "La función depende de un estado externo (no es pura)",
  "u": 8
 },
 "ligadura-dinamica": {
  "nombre": "Ligadura dinámica: el método se elige en ejecución",
  "u": 7
 },
 "excepcion": {
  "nombre": "Una excepción no capturada detiene el programa",
  "u": 5
 }
};

const CASOS = [
 {
  "id": "b01",
  "u": 1,
  "lang": "Python",
  "exp": "excepcion",
  "titulo": "Los mensajes que nunca aparecieron",
  "contexto": "El programa debía mostrar «Cargando datos…» y después calcular un total. El programador esperaba ver al menos el primer mensaje.",
  "code": "print(\"Cargando datos...\")\nprecios = [12000, 8000, 5000]\ntotal = 0\nfor p in precios\n    total = total + p\nprint(\"Total:\", total)",
  "sintoma": "No aparece ningún mensaje, ni siquiera «Cargando datos…». Solo se ve un SyntaxError.",
  "lineas": [
   4
  ],
  "principio": "compila-antes",
  "distractores": [
   "excepcion",
   "condicion-bucle",
   "tipado-fuerte"
  ],
  "explicaciones": [
   "Antes de ejecutar la primera línea, CPython compila todo el archivo; el error de sintaxis de la línea 4 lo detiene en esa etapa.",
   "El programa ejecuta las líneas 1 a 3 y se detiene en la 4, pero la consola borra lo impreso.",
   "print no funciona hasta que termina el bucle for."
  ],
  "pista_linea": "¿Qué le falta a la línea del for para que Python la acepte?",
  "pista_principio": "¿En qué momento detecta Python los errores de sintaxis: al llegar a la línea o antes de empezar?",
  "registrada": "File \"<string>\", line 4\n    for p in precios\n                    ^\nSyntaxError: expected ':'"
 },
 {
  "id": "b02",
  "u": 2,
  "lang": "Python",
  "exp": "tiempo",
  "titulo": "El control de ingreso que se volvió lento",
  "contexto": "Un programa registra documentos sin repetir. Con pocos datos andaba bien, pero con N = 20 000 tarda mucho más de lo esperado.",
  "code": "N = 20000\nya_vistos = []\nfor doc in range(N):\n    if doc not in ya_vistos:\n        ya_vistos.append(doc)\nprint(len(ya_vistos))",
  "sintoma": "El resultado es correcto, pero tarda mucho más de lo esperado. Y al duplicar N, el tiempo crece mucho más que el doble.",
  "lineas": [
   2,
   4
  ],
  "principio": "estructura",
  "distractores": [
   "condicion-bucle",
   "precedencia",
   "iterador"
  ],
  "explicaciones": [
   "La operación «not in» se repite en cada vuelta y su costo depende de la estructura: al ejecutar, la versión con lista tarda mucho más y crece más rápido que N, mientras que la versión con conjunto casi no cambia.",
   "El for se ejecuta dos veces por cada documento.",
   "append es lento porque copia toda la lista en cada llamada."
  ],
  "pista_linea": "¿Qué estructura se usa para guardar los documentos y qué operación se repite sobre ella?",
  "pista_principio": "Compara las dos versiones al ejecutar: ¿qué cambia entre ellas además del tiempo?",
  "alt": "N = 20000\nya_vistos = set()\nfor doc in range(N):\n    if doc not in ya_vistos:\n        ya_vistos.add(doc)\nprint(len(ya_vistos))",
  "registrada": "20000"
 },
 {
  "id": "b03",
  "u": 3,
  "lang": "Python",
  "exp": "salida",
  "titulo": "El respaldo que también cambió",
  "contexto": "Antes de corregir las notas, el programa guarda un respaldo para comparar después.",
  "code": "notas = [3, 4, 2]\nrespaldo = notas\nnotas[2] = 5\nprint(\"Corregidas:\", notas)\nprint(\"Respaldo:\", respaldo)",
  "sintoma": "El respaldo muestra [3, 4, 5]: cambió junto con las notas corregidas.",
  "lineas": [
   2
  ],
  "principio": "aliasing",
  "distractores": [
   "alcance-local",
   "ref-objeto",
   "iterador"
  ],
  "explicaciones": [
   "respaldo = notas no copia la lista: liga otro nombre al mismo objeto, así que el cambio se ve por los dos nombres.",
   "notas[2] = 5 modifica todas las listas del programa.",
   "print muestra siempre el último valor asignado a cualquier lista."
  ],
  "pista_linea": "¿En qué línea se crea el respaldo? ¿Crea un objeto nuevo?",
  "pista_principio": "¿Cuántos objetos lista hay en memoria y cuántos nombres apuntan a ellos?",
  "registrada": "Corregidas: [3, 4, 5]\nRespaldo: [3, 4, 5]"
 },
 {
  "id": "b04",
  "u": 3,
  "lang": "Python",
  "exp": "excepcion",
  "titulo": "El contador que no cuenta",
  "contexto": "La función registrar() debía sumar uno al contador de visitas cada vez que se llama.",
  "code": "visitas = 0\n\ndef registrar():\n    visitas = visitas + 1\n\nprint(\"Inicio\")\nregistrar()\nprint(\"Visitas:\", visitas)",
  "sintoma": "Se imprime «Inicio» y después aparece UnboundLocalError.",
  "lineas": [
   4
  ],
  "principio": "alcance-local",
  "distractores": [
   "aliasing",
   "paso-valor",
   "excepcion"
  ],
  "explicaciones": [
   "Como visitas se vincula dentro de la función, es local en todo el bloque; al leerla para sumar, todavía no tiene valor.",
   "Las funciones no pueden leer variables definidas fuera de ellas.",
   "visitas es un entero y los enteros no se pueden sumar dentro de funciones."
  ],
  "pista_linea": "¿En qué línea se lee y se asigna visitas a la vez?",
  "pista_principio": "Si un nombre se vincula dentro de un bloque, ¿Python lo trata como local o como global?",
  "registrada": "Inicio\nTraceback (most recent call last):\n  File \"<string>\", line 7, in <module>\n    registrar()\n    ~~~~~~~~~^^\n  File \"<string>\", line 4, in registrar\n    visitas = visitas + 1\n              ^^^^^^^\nUnboundLocalError: cannot access local variable 'visitas' where it is not associated with a value"
 },
 {
  "id": "b05",
  "u": 4,
  "lang": "Java",
  "exp": "salida",
  "titulo": "El promedio que redondea solo",
  "contexto": "Un método calcula el promedio de tres notas: 4, 3 y 3. El resultado esperado es 3.33…",
  "code": "int suma = 4 + 3 + 3;\nint cantidad = 3;\ndouble promedio = suma / cantidad;\nSystem.out.println(promedio);",
  "sintoma": "Imprime 3.0 en lugar de 3.333…",
  "lineas": [
   3
  ],
  "principio": "div-entera",
  "distractores": [
   "precedencia",
   "tipado-fuerte",
   "paso-valor"
  ],
  "explicaciones": [
   "suma y cantidad son int, así que la división se hace entre enteros (da 3) y recién después se guarda en un double.",
   "Java redondea todos los double a una cifra decimal.",
   "println siempre muestra los números sin decimales."
  ],
  "pista_linea": "¿En qué línea se divide? ¿De qué tipo son los dos operandos?",
  "pista_principio": "¿El tipo del resultado depende de la variable donde se guarda o de los operandos?",
  "registrada": "3.0"
 },
 {
  "id": "b06",
  "u": 4,
  "lang": "Python",
  "exp": "excepcion",
  "titulo": "El ticket que se corta",
  "contexto": "Un programa imprime un ticket con el detalle y el total de la compra.",
  "code": "print(\"Ticket de compra\")\nprint(\"Producto: yerba\")\ntotal = 25000\nprint(\"Total: \" + total)\nprint(\"Gracias por su compra\")",
  "sintoma": "Se imprimen las dos primeras líneas del ticket y después aparece TypeError; el agradecimiento nunca se muestra.",
  "lineas": [
   4
  ],
  "principio": "tipado-fuerte",
  "distractores": [
   "div-entera",
   "compila-antes",
   "precedencia"
  ],
  "explicaciones": [
   "Python no convierte por su cuenta un int para concatenarlo a un str; la operación se rechaza al ejecutarse y la excepción detiene el programa ahí.",
   "Python no puede imprimir números enteros.",
   "El error está en la línea 3 porque 25000 es demasiado grande."
  ],
  "pista_linea": "¿Qué tipos se combinan con + en la línea que falla?",
  "pista_principio": "¿Python convierte los tipos por su cuenta cuando sumas un texto y un número?",
  "registrada": "Ticket de compra\nProducto: yerba\nTraceback (most recent call last):\n  File \"<string>\", line 4, in <module>\n    print(\"Total: \" + total)\n          ~~~~~~~~~~^~~~~~~\nTypeError: can only concatenate str (not \"int\") to str"
 },
 {
  "id": "b07",
  "u": 4,
  "lang": "Python",
  "exp": "excepcion",
  "titulo": "El registro de asistencias",
  "contexto": "Se quiere guardar cuántas veces asistió cada estudiante a cada taller, usando la pareja [nombre, taller] como clave.",
  "code": "asistencias = {}\nclave = [\"Ana\", \"Robótica\"]\nasistencias[clave] = 1\nprint(asistencias)",
  "sintoma": "Aparece TypeError: la lista no se puede usar como clave (unhashable type: 'list').",
  "lineas": [
   2,
   3
  ],
  "principio": "clave-inmutable",
  "distractores": [
   "aliasing",
   "tipado-fuerte",
   "alcance-local"
  ],
  "explicaciones": [
   "Las claves de un diccionario deben ser de un tipo inmutable; una lista se puede modificar, así que no puede ser clave. Una tupla de cadenas sí podría.",
   "Los diccionarios solo aceptan números como claves.",
   "El diccionario está vacío y no se le pueden agregar elementos."
  ],
  "pista_linea": "¿Qué tipo de objeto se usa como clave?",
  "pista_principio": "¿Qué propiedad deben tener las claves de un diccionario?",
  "registrada": "Traceback (most recent call last):\n  File \"<string>\", line 3, in <module>\n    asistencias[clave] = 1\n    ~~~~~~~~~~~^^^^^^^\nTypeError: unhashable type: 'list'"
 },
 {
  "id": "b08",
  "u": 5,
  "lang": "Python",
  "exp": "excepcion",
  "titulo": "La condición que falla con la lista vacía",
  "contexto": "El programa avisa si la primera lectura de un sensor supera 30 grados. A veces todavía no hay lecturas.",
  "code": "lecturas = []\nprint(\"Revisando...\")\nif lecturas[0] > 30 and len(lecturas) > 0:\n    print(\"Alerta de temperatura\")\nprint(\"Listo\")",
  "sintoma": "Se imprime «Revisando…» y después aparece IndexError; «Listo» nunca se muestra.",
  "lineas": [
   3
  ],
  "principio": "cortocircuito",
  "distractores": [
   "precedencia",
   "condicion-bucle",
   "clave-inmutable"
  ],
  "explicaciones": [
   "and evalúa primero lecturas[0], que falla con la lista vacía; si la verificación de largo fuera primero, el cortocircuito evitaría leer el elemento.",
   "Python evalúa las dos partes de un and al mismo tiempo.",
   "len no funciona con listas vacías."
  ],
  "pista_linea": "¿En qué línea se accede a un elemento de la lista?",
  "pista_principio": "¿En qué orden evalúa and sus dos partes? ¿Cuándo deja de evaluar?",
  "registrada": "Revisando...\nTraceback (most recent call last):\n  File \"<string>\", line 3, in <module>\n    if lecturas[0] > 30 and len(lecturas) > 0:\n       ~~~~~~~~^^^\nIndexError: list index out of range"
 },
 {
  "id": "b09",
  "u": 5,
  "lang": "Python",
  "exp": "salida",
  "titulo": "El promedio inflado",
  "contexto": "Se calcula el promedio de dos notas: 4 y 2. El resultado esperado es 3.",
  "code": "a = 4\nb = 2\npromedio = a + b / 2\nprint(promedio)",
  "sintoma": "Imprime 5.0 en lugar de 3.0.",
  "lineas": [
   3
  ],
  "principio": "precedencia",
  "distractores": [
   "div-entera",
   "cortocircuito",
   "tipado-fuerte"
  ],
  "explicaciones": [
   "La división tiene mayor precedencia que la suma: se calcula b / 2 y después se suma a. Faltan paréntesis.",
   "Python divide siempre de derecha a izquierda.",
   "/ hace división entera y por eso el resultado está mal."
  ],
  "pista_linea": "¿Qué línea hace el cálculo?",
  "pista_principio": "¿Qué operación se resuelve primero en a + b / 2?",
  "registrada": "5.0"
 },
 {
  "id": "b10",
  "u": 5,
  "lang": "Python",
  "exp": "bucle",
  "titulo": "La cuenta de 3 en 3 que no termina",
  "contexto": "El programa debía contar de 3 en 3 hasta llegar a 10.",
  "code": "i = 0\nwhile i != 10:\n    print(i)\n    i = i + 3\nprint(\"Fin\")",
  "sintoma": "Nunca imprime «Fin»: los números siguen apareciendo sin parar.",
  "lineas": [
   2
  ],
  "principio": "condicion-bucle",
  "distractores": [
   "precedencia",
   "caso-base",
   "iterador"
  ],
  "explicaciones": [
   "i toma los valores 0, 3, 6, 9, 12… y nunca vale exactamente 10, así que la condición i != 10 nunca se vuelve falsa.",
   "print dentro de un while hace que el bucle se repita.",
   "Python no permite sumar de a 3 dentro de un while."
  ],
  "pista_linea": "¿Qué línea decide cuándo se termina el bucle?",
  "pista_principio": "Anota los valores de i en cada vuelta: ¿alguno hace falsa la condición?",
  "js": "let i = 0; while (i !== 10) { tick(i); i = i + 3; }",
  "registrada": "0\n3\n6\n9\n12\n15\n18\n21\n…\n243\n246\n249\n25\n… (no termina)"
 },
 {
  "id": "b11",
  "u": 5,
  "lang": "Python",
  "exp": "silencio",
  "titulo": "El préstamo que nunca se termina de pagar",
  "contexto": "Se simula el pago de un préstamo: cada mes se paga el 10 % del saldo hasta que el saldo baja de 1000.",
  "code": "saldo = 50000\nmeses = 0\nwhile saldo >= 1000:\n    cuota = saldo * 0.1\n    saldo - cuota\n    meses = meses + 1\nprint(\"Meses:\", meses)",
  "sintoma": "El programa no muestra nada y no termina.",
  "lineas": [
   5
  ],
  "principio": "condicion-bucle",
  "distractores": [
   "precedencia",
   "alcance-local",
   "efecto-lateral"
  ],
  "explicaciones": [
   "saldo - cuota calcula un valor pero no lo asigna: saldo nunca cambia, así que la condición nunca se vuelve falsa.",
   "El 10 % es demasiado poco para que el saldo baje de 1000.",
   "while solo funciona con números enteros."
  ],
  "pista_linea": "¿Qué línea debería modificar el saldo? ¿Lo modifica?",
  "pista_principio": "¿Qué tiene que pasar dentro del bucle para que la condición llegue a ser falsa?",
  "js": "let saldo = 50000, meses = 0; while (saldo >= 1000) { const cuota = saldo * 0.1; saldo - cuota; meses = meses + 1; tick(meses); }",
  "registrada": "\n… (no termina)"
 },
 {
  "id": "b12",
  "u": 6,
  "lang": "Java",
  "exp": "salida",
  "titulo": "El intercambio que no intercambia",
  "contexto": "Un método debía intercambiar los valores de dos variables antes de ordenarlas.",
  "code": "static void intercambiar(int a, int b) {\n    int t = a;\n    a = b;\n    b = t;\n}\n// en main:\nint x = 7, y = 2;\nintercambiar(x, y);\nSystem.out.println(x + \" \" + y);",
  "sintoma": "Imprime 7 2: los valores no se intercambiaron.",
  "lineas": [
   1
  ],
  "principio": "paso-valor",
  "distractores": [
   "ref-objeto",
   "alcance-local",
   "aliasing"
  ],
  "explicaciones": [
   "Los int se pasan por valor: el método intercambia sus propias copias de a y b, y x e y no cambian.",
   "Falta un return al final del método, que sin él no se ejecuta.",
   "Java no permite usar una variable auxiliar t."
  ],
  "pista_linea": "¿Qué recibe el método en sus parámetros?",
  "pista_principio": "¿Los parámetros a y b son las variables x e y, o copias de sus valores?",
  "registrada": "7 2"
 },
 {
  "id": "b13",
  "u": 6,
  "lang": "Python",
  "exp": "salida",
  "titulo": "Los precios originales desaparecieron",
  "contexto": "Una función calcula los precios con IVA para mostrarlos, pero el programa necesita conservar también los precios originales.",
  "code": "def con_iva(lista):\n    for i in range(len(lista)):\n        lista[i] = lista[i] + lista[i] // 10\n    return lista\n\nprecios = [100, 200]\nfinales = con_iva(precios)\nprint(\"Originales:\", precios)",
  "sintoma": "Los «originales» también aparecen con IVA.",
  "lineas": [
   3
  ],
  "principio": "ref-objeto",
  "distractores": [
   "paso-valor",
   "aliasing",
   "alcance-local"
  ],
  "explicaciones": [
   "La función recibe una referencia al mismo objeto lista y lo modifica en el lugar; quien llamó ve el cambio.",
   "return lista copia los cambios de vuelta a precios.",
   "range(len(lista)) crea una copia que se pierde."
  ],
  "pista_linea": "¿Qué línea cambia los valores? ¿Sobre qué objeto?",
  "pista_principio": "¿La función recibe una copia de la lista o una referencia al mismo objeto?",
  "registrada": "Originales: [110, 220]"
 },
 {
  "id": "b14",
  "u": 6,
  "lang": "Python",
  "exp": "recursion",
  "titulo": "El factorial de cero",
  "contexto": "Una función recursiva calcula el factorial. Con factorial(5) funciona, pero con factorial(0) no.",
  "code": "def factorial(n):\n    if n == 1:\n        return 1\n    return n * factorial(n - 1)\n\nprint(factorial(0))",
  "sintoma": "No devuelve 1: aparece RecursionError.",
  "lineas": [
   2
  ],
  "principio": "caso-base",
  "distractores": [
   "condicion-bucle",
   "paso-valor",
   "precedencia"
  ],
  "explicaciones": [
   "Con n = 0 la función llama con -1, -2, -3… y nunca llega a n == 1; cada llamada agrega un marco a la pila hasta superar el límite.",
   "Python no permite que una función se llame a sí misma más de 5 veces.",
   "El error ocurre porque 0 no es un número entero."
  ],
  "pista_linea": "¿Qué línea decide cuándo se deja de llamar a la función?",
  "pista_principio": "Sigue las llamadas desde factorial(0): ¿alguna cumple el caso base?",
  "js": "function f(n) { tick(-n); if (n === 1) return 1; return n * f(n - 1); } f(0);",
  "registrada": "Traceback (most recent call last):\n  File \"<string>\", line 6, in <module>\n    print(factorial(0))\n          ~~~~~~~~~^^^\n  File \"<string>\", line 4, in factorial\n    return n * factorial(n - 1)\n               ~~~~~~~~~^^^^^^^\n  File \"<string>\", line 4, in factorial\n…\n    return n * factorial(n - 1)\n               ~~~~~~~~~^^^^^^^\n  [Previous line repeated 996 more times]\nRecursionError: maximum recursion depth exceeded"
 },
 {
  "id": "b15",
  "u": 7,
  "lang": "Java",
  "exp": "salida",
  "titulo": "El método que el compilador no encuentra",
  "contexto": "Hay una clase Figura y una subclase Circulo con un método radio(). Se guarda un Circulo en una variable de tipo Figura.",
  "code": "class Figura { double area() { return 0; } }\nclass Circulo extends Figura {\n    double r = 2;\n    double area() { return 3.14 * r * r; }\n    double radio() { return r; }\n}\n// en main:\nFigura f = new Circulo();\nSystem.out.println(f.area());\nSystem.out.println(f.radio());",
  "sintoma": "No compila: «cannot find symbol» en la última línea.",
  "lineas": [
   10
  ],
  "principio": "tipo-declarado",
  "distractores": [
   "ligadura-dinamica",
   "init-heredado",
   "paso-valor"
  ],
  "explicaciones": [
   "El compilador revisa qué métodos existen según el tipo declarado de f (Figura), y Figura no tiene radio(). La ligadura dinámica solo elige entre métodos que el tipo declarado ya conoce.",
   "Un Circulo no se puede guardar en una variable de tipo Figura.",
   "Los métodos de una subclase no se pueden llamar nunca."
  ],
  "pista_linea": "¿Qué línea llama a un método que no está en Figura?",
  "pista_principio": "¿Qué mira el compilador para saber si un método existe: la variable o el objeto creado?",
  "registrada": "Snip.java:3: error: cannot find symbol\npublic class Snip { public static void main(String[] s){ Figura f = new Circulo(); System.out.println(f.area()); System.out.println(f.radio()); } }\n                                                                                                                                     ^\n  symbol:   method radio()\n  location: variable f of type Figura\n1 error"
 },
 {
  "id": "b16",
  "u": 7,
  "lang": "Python",
  "exp": "excepcion",
  "titulo": "La docente sin nombre",
  "contexto": "Docente hereda de Persona y agrega la materia.",
  "code": "class Persona:\n    def __init__(self, nombre):\n        self.nombre = nombre\n\nclass Docente(Persona):\n    def __init__(self, nombre, materia):\n        self.materia = materia\n\nd = Docente(\"Marta\", \"Lógica\")\nprint(d.materia)\nprint(d.nombre)",
  "sintoma": "Imprime «Lógica» y después aparece AttributeError: 'Docente' object has no attribute 'nombre'.",
  "lineas": [
   6,
   7
  ],
  "principio": "init-heredado",
  "distractores": [
   "tipo-declarado",
   "alcance-local",
   "aliasing"
  ],
  "explicaciones": [
   "Docente redefine __init__ y no llama al de Persona, así que nunca se ejecuta self.nombre = nombre.",
   "Python no permite heredar atributos.",
   "nombre es una palabra reservada y no se puede usar como atributo."
  ],
  "pista_linea": "¿Qué __init__ se ejecuta al crear d? ¿Dónde se debería asignar nombre?",
  "pista_principio": "Si una subclase redefine __init__, ¿se ejecuta automáticamente el de la superclase?",
  "registrada": "Lógica\nTraceback (most recent call last):\n  File \"<string>\", line 11, in <module>\n    print(d.nombre)\n          ^^^^^^^^\nAttributeError: 'Docente' object has no attribute 'nombre'"
 },
 {
  "id": "b17",
  "u": 8,
  "lang": "Python",
  "exp": "salida",
  "titulo": "El promedio que da cero",
  "contexto": "Se convierten las ventas a miles con map y después se calcula el total y el promedio.",
  "code": "ventas = [12000, 8000, 10000]\nen_miles = map(lambda v: v / 1000, ventas)\ntotal = sum(en_miles)\ncantidad = len(ventas)\npromedio = sum(en_miles) / cantidad\nprint(\"Total:\", total, \"Promedio:\", promedio)",
  "sintoma": "Imprime Total: 30.0 y Promedio: 0.0.",
  "lineas": [
   5
  ],
  "principio": "iterador",
  "distractores": [
   "div-entera",
   "efecto-lateral",
   "precedencia"
  ],
  "explicaciones": [
   "map devuelve un iterador: el primer sum lo recorre entero y el segundo ya no encuentra elementos.",
   "La lambda divide por 1000 y por eso el promedio da cero.",
   "sum solo se puede usar una vez por programa."
  ],
  "pista_linea": "¿En qué línea se vuelve a recorrer en_miles?",
  "pista_principio": "¿map devuelve una lista o un iterador? ¿Se puede recorrer dos veces?",
  "registrada": "Total: 30.0 Promedio: 0.0"
 },
 {
  "id": "b18",
  "u": 8,
  "lang": "Python",
  "exp": "salida",
  "titulo": "El mismo precio, dos resultados",
  "contexto": "precio_final(p) debía devolver siempre lo mismo para el mismo precio.",
  "code": "recargo = 0\n\ndef precio_final(p):\n    global recargo\n    recargo = recargo + 100\n    return p + recargo\n\nprint(precio_final(1000))\nprint(precio_final(1000))",
  "sintoma": "Imprime 1100 y después 1200 para el mismo precio.",
  "lineas": [
   4,
   5
  ],
  "principio": "efecto-lateral",
  "distractores": [
   "alcance-local",
   "iterador",
   "aliasing"
  ],
  "explicaciones": [
   "La función modifica y lee una variable global; su resultado depende de ese estado externo y no solo de su entrada.",
   "print suma 100 cada vez que se llama.",
   "Los enteros cambian de valor solos entre llamadas."
  ],
  "pista_linea": "¿Qué líneas usan algo que está fuera de la función?",
  "pista_principio": "Una función pura, ¿puede devolver resultados distintos con la misma entrada?",
  "registrada": "1100\n1200"
 }
];
