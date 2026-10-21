/* =========================================================
   Retos de aplicación · Teoría de la Programación
   Niveles de la taxonomía de Bloom revisada: N3 aplicar, N4 analizar, N5 evaluar.
   Los usa «La Oca de la Programación». Todo el código de los retos se ejecutó
   para confirmar la respuesta correcta (a = índice de la opción correcta, desde 0).
   ok    → explicación que se muestra al acertar
   pista → pregunta orientadora que se muestra al fallar (no se revela la respuesta)
   ========================================================= */
const RETOS = [
 {
  "u": 1,
  "n": 3,
  "q": "Quieres reescribir este bucle en estilo funcional, sin variables que cambien. ¿Qué línea produce el mismo resultado?",
  "lang": "Python",
  "code": "edades = [15, 22, 17, 30]\nmayores = 0\nfor e in edades:\n    if e >= 18:\n        mayores = mayores + 1\nprint(mayores)",
  "o": [
   "print(sum(1 for e in edades if e >= 18))",
   "print(len(edades) - 18)",
   "print(max(edades) >= 18)",
   "print(sum(edades) // 18)"
  ],
  "a": 0,
  "ok": "La expresión declara el resultado (contar los que cumplen la condición) sin un acumulador que cambie.",
  "pista": "¿Cuál de las opciones cuenta elementos que cumplen una condición, en vez de operar con los valores?"
 },
 {
  "u": 1,
  "n": 4,
  "q": "¿Qué pasa al ejecutar este archivo con CPython?",
  "lang": "Python",
  "code": "print(\"Inicio\")\ntotal = 10\nif total > 5\n    print(\"Mayor\")",
  "o": [
   "No imprime nada y muestra SyntaxError",
   "Imprime «Inicio» y después muestra SyntaxError",
   "Imprime «Inicio» y «Mayor»",
   "Imprime «Inicio» y ignora el if"
  ],
  "a": 0,
  "ok": "CPython compila todo el archivo a bytecode antes de ejecutarlo; el error de sintaxis detiene el proceso antes de la primera línea.",
  "pista": "¿En qué momento se detectan los errores de sintaxis: antes de ejecutar o al llegar a la línea?"
 },
 {
  "u": 1,
  "n": 4,
  "q": "¿Y este otro archivo?",
  "lang": "Python",
  "code": "print(\"Inicio\")\ntotal = 10\nprint(total / 0)",
  "o": [
   "Imprime «Inicio» y después muestra ZeroDivisionError",
   "No imprime nada y muestra ZeroDivisionError",
   "Imprime «Inicio» y 0",
   "Muestra SyntaxError"
  ],
  "a": 0,
  "ok": "La sintaxis es correcta, así que el programa empieza a ejecutarse; la excepción aparece recién al llegar a la división.",
  "pista": "¿Este error es de sintaxis o aparece durante la ejecución?"
 },
 {
  "u": 1,
  "n": 3,
  "q": "Tienes Main.java. ¿Qué comando genera el bytecode y cuál lo ejecuta?",
  "lang": null,
  "code": null,
  "o": [
   "javac Main.java genera el bytecode; java Main lo ejecuta",
   "java Main.java genera el bytecode; javac Main lo ejecuta",
   "javac genera código máquina para tu procesador; java lo compila de nuevo",
   "Los dos comandos hacen lo mismo"
  ],
  "a": 0,
  "ok": "javac traduce a bytecode, un código intermedio; la máquina virtual (java) lo ejecuta.",
  "pista": "En el enfoque mixto de Java, ¿qué hace cada fase?"
 },
 {
  "u": 1,
  "n": 5,
  "q": "Hay que construir un sistema que diagnostique fallas de una impresora a partir de reglas como «si no enciende y el cable está conectado, revisar la fuente». ¿Qué paradigma y justificación es más sólida?",
  "lang": null,
  "code": null,
  "o": [
   "Lógico: el problema se expresa como reglas y el sistema deduce la respuesta",
   "Imperativo: porque todos los programas modifican variables",
   "Orientado a objetos: porque cualquier sistema necesita clases",
   "Funcional: porque no se pueden escribir reglas en otros paradigmas"
  ],
  "a": 0,
  "ok": "El paradigma lógico se basa en la definición de reglas y en la deducción. Las otras justificaciones son generalizaciones falsas.",
  "pista": "¿Qué paradigma tiene la definición de reglas como característica principal? Fíjate también si cada justificación es verdadera."
 },
 {
  "u": 1,
  "n": 4,
  "q": "¿Qué paradigma muestra principalmente este código y qué imprime?",
  "lang": "Python",
  "code": "class Cuenta:\n    def __init__(self):\n        self.saldo = 0\n    def depositar(self, m):\n        self.saldo += m\n\nc = Cuenta()\nc.depositar(50)\nprint(c.saldo)",
  "o": [
   "Orientado a objetos; imprime 50",
   "Funcional; imprime 50",
   "Orientado a objetos; imprime 0",
   "Lógico; imprime 50"
  ],
  "a": 0,
  "ok": "Hay una clase con estado (saldo) y comportamiento (depositar); el mensaje depositar(50) modifica el estado del objeto.",
  "pista": "¿Dónde están los datos y quién los modifica?"
 },
 {
  "u": 2,
  "n": 4,
  "q": "¿Qué ocurre al compilar este fragmento en C?",
  "lang": "C",
  "code": "char *dia = \"lunes\";\nswitch (dia) {\n    case \"lunes\": printf(\"Inicio\"); break;\n}",
  "o": [
   "El compilador lo rechaza: el switch exige una expresión de tipo entero",
   "Compila e imprime «Inicio»",
   "Compila, pero no imprime nada",
   "Compila con una advertencia y compara las cadenas"
  ],
  "a": 0,
  "ok": "En C la expresión de un switch debe ser de tipo entero (char, entero o enumeración): es un caso especial de la regla.",
  "pista": "¿Qué tipos acepta la expresión de un switch en C?"
 },
 {
  "u": 2,
  "n": 3,
  "q": "Quieres medir cuánto tarda la función procesar(). ¿Qué código lo mide correctamente?",
  "lang": "Python",
  "code": null,
  "o": [
   "t0 = time.perf_counter(); procesar(); print(time.perf_counter() - t0)",
   "procesar(); print(time.perf_counter())",
   "print(time.perf_counter()); procesar()",
   "t0 = time.perf_counter(); print(t0); procesar()"
  ],
  "a": 0,
  "ok": "El punto de referencia de perf_counter no está definido: solo vale la diferencia entre dos llamadas.",
  "pista": "¿Un solo valor de perf_counter() tiene significado por sí mismo?"
 },
 {
  "u": 2,
  "n": 4,
  "q": "¿Qué imprime?",
  "lang": "Python",
  "code": "a = (5)\nb = (5,)\nprint(type(a).__name__, type(b).__name__)",
  "o": [
   "int tuple",
   "tuple tuple",
   "int int",
   "tuple int"
  ],
  "a": 0,
  "ok": "Lo que crea la tupla es la coma, no los paréntesis: una lista de expresiones con al menos una coma produce una tupla.",
  "pista": "¿Qué produce una tupla en Python: los paréntesis o la coma?"
 },
 {
  "u": 2,
  "n": 4,
  "q": "El for de Python es muy regular, pero una de estas cuatro líneas falla. ¿Cuál y por qué?",
  "lang": "Python",
  "code": "for x in [\"a\", \"b\"]: print(x)\nfor x in (\"a\", \"b\"): print(x)\nfor x in {\"a\"}: print(x)\nfor x in 25: print(x)",
  "o": [
   "La cuarta: un entero no es iterable",
   "La tercera: los conjuntos no se pueden recorrer",
   "La segunda: las tuplas no se pueden recorrer",
   "Ninguna falla"
  ],
  "a": 0,
  "ok": "for recorre cualquier secuencia u objeto iterable; un int no lo es y se lanza TypeError.",
  "pista": "¿Sobre qué tipo de objetos puede iterar for?"
 },
 {
  "u": 2,
  "n": 5,
  "q": "Un equipo decide que su lenguaje obligue a declarar el tipo de cada variable y verifique los tipos al compilar. ¿Cuál es la evaluación más precisa?",
  "lang": null,
  "code": null,
  "o": [
   "Gana seguridad porque detecta errores antes de ejecutar, a cambio de escribir más",
   "Gana eficiencia de traducción porque el compilador trabaja menos",
   "No cambia nada: los errores de tipo aparecen igual en ejecución",
   "Pierde portabilidad porque el bytecode depende de los tipos"
  ],
  "a": 0,
  "ok": "El tipado estático y fuerte ayuda a detectar errores al compilar; el costo es escribir declaraciones explícitas.",
  "pista": "¿Qué gana quien usa el programa si el error aparece antes de ejecutarlo? ¿Qué le cuesta a quien escribe?"
 },
 {
  "u": 2,
  "n": 5,
  "q": "Hoare afirma que la legibilidad es inmensamente más importante que la facilidad de escritura. ¿Qué decisión de un equipo sigue mejor ese criterio?",
  "lang": null,
  "code": null,
  "o": [
   "Usar nombres descriptivos aunque las líneas queden más largas",
   "Comprimir la lógica en una sola línea para escribir menos",
   "Usar nombres de una letra porque se escriben más rápido",
   "Quitar los comentarios para que el archivo sea más corto"
  ],
  "a": 0,
  "ok": "Las otras tres opciones ahorran escritura a costa de la lectura, que es justo lo que Hoare desaconseja.",
  "pista": "¿Qué opción beneficia a quien lee el código, aunque cueste más escribirlo?"
 },
 {
  "u": 3,
  "n": 3,
  "q": "¿Qué imprime?",
  "lang": "Python",
  "code": "visitas = 0\n\ndef registrar():\n    global visitas\n    visitas = visitas + 1\n\nregistrar()\nregistrar()\nprint(visitas)",
  "o": [
   "2",
   "0",
   "1",
   "UnboundLocalError"
  ],
  "a": 0,
  "ok": "La declaración global hace que visitas se refiera a la variable del módulo, así que las dos llamadas la modifican.",
  "pista": "¿Qué cambia la declaración global en la forma en que Python resuelve el nombre?"
 },
 {
  "u": 3,
  "n": 4,
  "q": "Si llamas a cada función por separado, ¿cuál lanza UnboundLocalError?",
  "lang": "Python",
  "code": "total = 10\n\ndef a(): print(total)\ndef b(): total = 5; print(total)\ndef c(): print(total); total = 5\ndef d(): global total; total += 1; print(total)",
  "o": [
   "c",
   "a",
   "b",
   "d"
  ],
  "a": 0,
  "ok": "En c, total se vincula dentro de la función, así que es local en todo el bloque; se lee antes de tener valor.",
  "pista": "¿En qué funciones total queda vinculado dentro del bloque? ¿En cuál se usa antes de vincularse?"
 },
 {
  "u": 3,
  "n": 4,
  "q": "¿Qué imprime?",
  "lang": "Python",
  "code": "x = \"global\"\n\ndef externa():\n    x = \"externa\"\n    def interna():\n        print(x)\n    interna()\n\nexterna()",
  "o": [
   "externa",
   "global",
   "NameError",
   "None"
  ],
  "a": 0,
  "ok": "Python busca primero en la tabla local, luego en la de las funciones envolventes y después en la global.",
  "pista": "¿En qué orden busca Python un nombre que no está en la tabla local?"
 },
 {
  "u": 3,
  "n": 3,
  "q": "¿Qué imprime?",
  "lang": "C",
  "code": "int contar(void) {\n    static int n = 0;\n    n = n + 1;\n    return n;\n}\n// en main:\ncontar(); contar();\nprintf(\"%d\", contar());",
  "o": [
   "3",
   "1",
   "0",
   "Error de compilación"
  ],
  "a": 0,
  "ok": "Una variable de bloque declarada static tiene duración estática: conserva su valor entre llamadas y se inicializa una sola vez.",
  "pista": "¿Cuánto vive una variable local declarada static en C?"
 },
 {
  "u": 3,
  "n": 4,
  "q": "¿Qué imprime?",
  "lang": "Java",
  "code": "static void area(double lado) { System.out.println(\"cuadrado\"); }\nstatic void area(double b, double h) { System.out.println(\"rectángulo\"); }\n// en main:\narea(3);\narea(2, 5);",
  "o": [
   "cuadrado y rectángulo",
   "Error: area(3) no coincide porque 3 es int",
   "rectángulo y rectángulo",
   "Error: no se puede repetir el nombre area"
  ],
  "a": 0,
  "ok": "Java elige el método por la cantidad y el tipo de los argumentos; el int 3 se convierte a double.",
  "pista": "¿Cómo distingue Java entre métodos sobrecargados?"
 },
 {
  "u": 3,
  "n": 5,
  "q": "Este código funciona, pero sumar_puntos depende de una variable global. ¿Qué cambio mejora más el diseño?",
  "lang": "Python",
  "code": "puntos = 0\n\ndef sumar_puntos(n):\n    global puntos\n    puntos = puntos + n",
  "o": [
   "def sumar_puntos(actual, n): return actual + n, y que quien llama guarde el resultado",
   "Renombrar puntos a PUNTOS para que parezca constante",
   "Quitar global y dejar puntos = puntos + n",
   "Mover puntos = 0 dentro de la función"
  ],
  "a": 0,
  "ok": "La función recibe todo lo que necesita y devuelve el resultado: no depende del ámbito global y se puede probar sola.",
  "pista": "Evalúa cada opción: ¿alguna rompe el programa? ¿Cuál hace que la función no dependa de nada externo?"
 },
 {
  "u": 4,
  "n": 3,
  "q": "Tienes que registrar los documentos de quienes ingresan a una feria, sin repetir, y consultar rápido si alguien ya entró. ¿Qué estructura de Python usas?",
  "lang": null,
  "code": null,
  "o": [
   "set",
   "list",
   "tuple",
   "str"
  ],
  "a": 0,
  "ok": "Un conjunto no tiene elementos repetidos y sus usos básicos incluyen la verificación de pertenencia.",
  "pista": "¿Qué estructura elimina duplicados y sirve para preguntar «¿está o no está?»?"
 },
 {
  "u": 4,
  "n": 4,
  "q": "¿Qué ocurre?",
  "lang": "Python",
  "code": "notas = {}\nnotas[(\"Ana\", 1)] = 4\nnotas[[\"Luis\", 2]] = 5\nprint(notas)",
  "o": [
   "La tercera línea lanza TypeError: una lista no puede ser clave",
   "Imprime las dos entradas",
   "La segunda línea falla: una tupla no puede ser clave",
   "Imprime solo la entrada de Luis"
  ],
  "a": 0,
  "ok": "Las claves deben ser inmutables; una tupla de cadenas y números puede serlo, una lista no.",
  "pista": "¿Qué condición deben cumplir las claves de un diccionario?"
 },
 {
  "u": 4,
  "n": 4,
  "q": "¿Qué imprime?",
  "lang": "Java",
  "code": "int x = 7 / 2;\ndouble y = 7 / 2;\ndouble z = 7 / 2.0;\nSystem.out.println(x + \" \" + y + \" \" + z);",
  "o": [
   "3 3.0 3.5",
   "3 3.5 3.5",
   "3.5 3.5 3.5",
   "3 3 3"
  ],
  "a": 0,
  "ok": "En y, la división se hace entre enteros (da 3) y recién después se guarda como double. En z, un operando es double.",
  "pista": "¿De qué tipo son los operandos de cada división, antes de la asignación?"
 },
 {
  "u": 4,
  "n": 5,
  "q": "En un lenguaje, 'x' + 3 da 'x3' y los errores de tipo aparecen recién al ejecutar. ¿Cómo lo clasificas?",
  "lang": null,
  "code": null,
  "o": [
   "Dinámico y débil",
   "Estático y fuerte",
   "Dinámico y fuerte",
   "Estático y débil"
  ],
  "a": 0,
  "ok": "Verificar tipos al ejecutar es tipado dinámico; convertir implícitamente los argumentos es tipado débil. Es el caso de JavaScript.",
  "pista": "Separa los dos ejes: ¿cuándo se verifican los tipos? ¿El lenguaje convierte por su cuenta?"
 },
 {
  "u": 4,
  "n": 4,
  "q": "¿Qué ocurre?",
  "lang": "Python",
  "code": "from dataclasses import dataclass\n\n@dataclass\nclass Producto:\n    nombre: str\n    precio: float\n\np = Producto(\"Yerba\", \"caro\")\nprint(p.precio)",
  "o": [
   "Imprime caro",
   "TypeError: precio debe ser float",
   "Imprime 0.0",
   "SyntaxError"
  ],
  "a": 0,
  "ok": "@dataclass usa las anotaciones para generar métodos, pero no examina el tipo anotado.",
  "pista": "¿@dataclass verifica los tipos que escribes en las anotaciones?"
 },
 {
  "u": 4,
  "n": 4,
  "q": "¿Qué imprime?",
  "lang": "Python",
  "code": "a = [1, 2]\nb = a\nc = a[:]\nb.append(3)\nprint(a, c)",
  "o": [
   "[1, 2, 3] [1, 2]",
   "[1, 2] [1, 2]",
   "[1, 2, 3] [1, 2, 3]",
   "[1, 2] [1, 2, 3]"
  ],
  "a": 0,
  "ok": "b es otro nombre del mismo objeto; c es una copia nueva, así que no ve el cambio.",
  "pista": "¿Cuál de las dos asignaciones crea un objeto nuevo?"
 },
 {
  "u": 5,
  "n": 3,
  "q": "¿Qué imprime?",
  "lang": "Python",
  "code": "print(-2 ** 2, (-2) ** 2)",
  "o": [
   "-4 4",
   "4 4",
   "-4 -4",
   "4 -4"
  ],
  "a": 0,
  "ok": "La potencia se vincula más fuerte que el signo menos a su izquierda: -2 ** 2 es -(2 ** 2).",
  "pista": "¿Qué se resuelve primero: el signo menos o la potencia?"
 },
 {
  "u": 5,
  "n": 4,
  "q": "¿Cuál de las dos condiciones funciona sin error cuando la lista está vacía?",
  "lang": "Python",
  "code": "datos = []\n# Opción 1\nif len(datos) > 0 and datos[0] > 5: print(\"sí\")\n# Opción 2\nif datos[0] > 5 and len(datos) > 0: print(\"sí\")",
  "o": [
   "Solo la opción 1",
   "Solo la opción 2",
   "Las dos",
   "Ninguna"
  ],
  "a": 0,
  "ok": "En la opción 1, la primera parte es falsa y and no evalúa la segunda. En la opción 2, datos[0] se evalúa primero y lanza IndexError.",
  "pista": "¿and evalúa siempre las dos partes?"
 },
 {
  "u": 5,
  "n": 4,
  "q": "¿Qué ocurre al ejecutar?",
  "lang": "Java",
  "code": "int d = 0;\nif (d != 0 && 10 / d > 1) System.out.println(\"A\");\nSystem.out.println(\"B\");\nif (d != 0 & 10 / d > 1) System.out.println(\"C\");",
  "o": [
   "Imprime B y después lanza ArithmeticException",
   "Imprime B y nada más",
   "Lanza ArithmeticException sin imprimir nada",
   "Imprime A, B y C"
  ],
  "a": 0,
  "ok": "&& no evalúa el segundo operando si el primero es falso. & sí evalúa los dos, y la división entera por cero lanza ArithmeticException.",
  "pista": "¿&& y & se comportan igual con el segundo operando?"
 },
 {
  "u": 5,
  "n": 4,
  "q": "¿Qué imprime y en qué orden?",
  "lang": "Python",
  "code": "def leer():\n    try:\n        return int(\"4a\")\n    except ValueError:\n        return -1\n    finally:\n        print(\"fin\")\n\nprint(leer())",
  "o": [
   "fin y después -1",
   "-1 y después fin",
   "Solo -1",
   "fin y después ValueError"
  ],
  "a": 0,
  "ok": "finally se ejecuta siempre, antes de que la función termine de devolver su valor.",
  "pista": "¿finally se ejecuta antes o después de que la función devuelva el resultado?"
 },
 {
  "u": 5,
  "n": 5,
  "q": "Un programa lee la edad que escribe el usuario: puede ser «veinte», «-3» o «150». ¿Qué combinación es la más adecuada?",
  "lang": null,
  "code": null,
  "o": [
   "try/except ValueError para el formato y una guarda para el rango 0–120",
   "Solo una guarda: if edad.isdigit() resuelve todos los casos",
   "Solo try/except: un rango fuera de lugar siempre lanza excepción",
   "Ninguna: int() ya rechaza edades fuera de rango"
  ],
  "a": 0,
  "ok": "int('veinte') lanza ValueError, pero int('150') funciona: el rango hay que verificarlo con una condición. Además, isdigit() rechaza «-3» sin distinguir el problema.",
  "pista": "Prueba mentalmente cada entrada con cada opción: ¿cuál detecta los tres problemas?"
 },
 {
  "u": 5,
  "n": 3,
  "q": "¿Qué valor queda en resultado?",
  "lang": "Python",
  "code": "x = 0\nresultado = x != 0 and 10 / x",
  "o": [
   "False",
   "0",
   "ZeroDivisionError",
   "None"
  ],
  "a": 0,
  "ok": "x and y devuelve x si x es falso, sin evaluar y. Aquí x != 0 es False.",
  "pista": "¿Qué devuelve exactamente and cuando su primera parte es falsa?"
 },
 {
  "u": 6,
  "n": 4,
  "q": "¿Qué imprime?",
  "lang": "Python",
  "code": "def agregar_a(lista):\n    lista = lista + [4]\n\ndef agregar_b(lista):\n    lista += [4]\n\nx = [1]; agregar_a(x)\ny = [1]; agregar_b(y)\nprint(x, y)",
  "o": [
   "[1] [1, 4]",
   "[1, 4] [1, 4]",
   "[1] [1]",
   "[1, 4] [1]"
  ],
  "a": 0,
  "ok": "lista + [4] crea una lista nueva y la liga al parámetro local; += modifica en el lugar el mismo objeto que ve quien llama.",
  "pista": "¿Cuál de las dos operaciones crea un objeto nuevo y cuál modifica el existente?"
 },
 {
  "u": 6,
  "n": 3,
  "q": "¿Qué imprime?",
  "lang": "Java",
  "code": "static void intercambiar(int a, int b) {\n    int t = a; a = b; b = t;\n}\n// en main:\nint x = 1, y = 2;\nintercambiar(x, y);\nSystem.out.println(x + \" \" + y);",
  "o": [
   "1 2",
   "2 1",
   "2 2",
   "Error de compilación"
  ],
  "a": 0,
  "ok": "Los primitivos se pasan por valor: el método intercambia sus copias, no las variables de quien llama.",
  "pista": "¿Qué recibe el método: las variables x e y o copias de sus valores?"
 },
 {
  "u": 6,
  "n": 3,
  "q": "¿Qué imprime?",
  "lang": "C",
  "code": "void sumar(int *p, int n) {\n    *p = *p + n;\n}\n// en main:\nint saldo = 5;\nsumar(&saldo, 2);\nsumar(&saldo, 3);\nprintf(\"%d\", saldo);",
  "o": [
   "10",
   "5",
   "7",
   "Una dirección de memoria"
  ],
  "a": 0,
  "ok": "Se pasa la dirección de saldo; a través del puntero, cada llamada modifica la variable original.",
  "pista": "¿Qué modifica *p: la copia del puntero o la variable a la que apunta?"
 },
 {
  "u": 6,
  "n": 4,
  "q": "¿Qué imprime y cuántas llamadas a potencia llegan a estar en la pila al mismo tiempo, como máximo?",
  "lang": "Python",
  "code": "def potencia(b, e):\n    if e == 0:\n        return 1\n    return b * potencia(b, e - 1)\n\nprint(potencia(2, 3))",
  "o": [
   "8; 4 llamadas",
   "8; 3 llamadas",
   "6; 4 llamadas",
   "8; 1 llamada"
  ],
  "a": 0,
  "ok": "Se apilan potencia(2,3), (2,2), (2,1) y (2,0) antes de que alguna devuelva su valor.",
  "pista": "Dibuja la pila: ¿cuántas llamadas hay antes de llegar al caso base, contándolo?"
 },
 {
  "u": 6,
  "n": 5,
  "q": "Necesitas una función que devuelva la lista con un elemento agregado sin modificar la lista original. ¿Qué implementación cumple?",
  "lang": "Python",
  "code": null,
  "o": [
   "def con(l, x): return l + [x]",
   "def con(l, x): l.append(x); return l",
   "def con(l, x): l += [x]; return l",
   "def con(l, x): l.insert(len(l), x); return l"
  ],
  "a": 0,
  "ok": "l + [x] crea una lista nueva. Las otras tres modifican el objeto que recibió la función.",
  "pista": "Evalúa cada opción: ¿cuál crea un objeto nuevo en lugar de modificar el que recibió?"
 },
 {
  "u": 6,
  "n": 4,
  "q": "¿Qué imprime?",
  "lang": "Python",
  "code": "def f():\n    pass\n\nprint(f())",
  "o": [
   "None",
   "Nada",
   "0",
   "Error: f no devuelve valor"
  ],
  "a": 0,
  "ok": "En Python, una función sin return devuelve igual un valor: None.",
  "pista": "¿Una función de Python sin return devuelve algo?"
 },
 {
  "u": 7,
  "n": 3,
  "q": "¿Qué imprime?",
  "lang": "Python",
  "code": "class Punto:\n    def __init__(self, x, y):\n        self.x, self.y = x, y\n\na = Punto(1, 2)\nb = Punto(1, 2)\nc = a\nprint(a is b, a is c)",
  "o": [
   "False True",
   "True True",
   "False False",
   "True False"
  ],
  "a": 0,
  "ok": "a y b tienen el mismo estado pero son objetos distintos (identidad distinta); c es otro nombre del objeto a.",
  "pista": "¿is compara el estado o la identidad?"
 },
 {
  "u": 7,
  "n": 4,
  "q": "¿Qué ocurre?",
  "lang": "Java",
  "code": "class Animal { String hablar() { return \"...\"; } }\nclass Gato extends Animal {\n    String hablar() { return \"Miau\"; }\n    String ronronear() { return \"Rrr\"; }\n}\n// en main:\nAnimal a = new Gato();\nSystem.out.println(a.hablar());   // línea 1\nSystem.out.println(a.ronronear()); // línea 2",
  "o": [
   "No compila por la línea 2: Animal no tiene ronronear()",
   "Imprime Miau y Rrr",
   "Imprime ... y Rrr",
   "Compila, pero la línea 2 falla al ejecutar"
  ],
  "a": 0,
  "ok": "El compilador revisa los métodos según el tipo declarado (Animal). Si se quita la línea 2, la línea 1 imprime Miau por ligadura dinámica.",
  "pista": "¿Qué mira el compilador para decidir si un método existe: el tipo de la variable o el objeto creado?"
 },
 {
  "u": 7,
  "n": 4,
  "q": "¿Qué ocurre?",
  "lang": "Python",
  "code": "class Persona:\n    def __init__(self, nombre):\n        self.nombre = nombre\n\nclass Docente(Persona):\n    def __init__(self, nombre, materia):\n        self.materia = materia\n\nd = Docente(\"Ana\", \"Lógica\")\nprint(d.nombre)",
  "o": [
   "AttributeError: el __init__ de Docente nunca asigna nombre",
   "Imprime Ana",
   "Imprime Lógica",
   "TypeError al crear d"
  ],
  "a": 0,
  "ok": "Docente redefine __init__ y no llama al de Persona (por ejemplo, con super().__init__(nombre)), así que el atributo nombre nunca se crea.",
  "pista": "¿Qué método __init__ se ejecuta al crear d? ¿Alguien asigna self.nombre?"
 },
 {
  "u": 7,
  "n": 5,
  "q": "Hay que agregar triángulos. ¿Qué diseño es mejor y por qué?",
  "lang": "Python",
  "code": "for f in figuras:\n    if type(f) == Circulo:\n        total += 3.14 * f.r ** 2\n    elif type(f) == Cuadrado:\n        total += f.lado ** 2",
  "o": [
   "Que cada clase defina area() y el bucle haga total += f.area(): para agregar Triangulo no se toca el bucle",
   "Agregar otro elif para Triangulo: es más explícito",
   "Guardar las áreas en una variable global para cada tipo",
   "Convertir todas las figuras a cuadrados antes de sumar"
  ],
  "a": 0,
  "ok": "Con polimorfismo, cada subclase define su propio comportamiento y el mismo mensaje sirve para todas: se agregan clases sin modificar el código que las usa.",
  "pista": "¿Qué opción permite agregar una figura nueva sin modificar el código que ya funciona?"
 },
 {
  "u": 7,
  "n": 3,
  "q": "¿Qué ocurre?",
  "lang": "Python",
  "code": "from abc import ABC, abstractmethod\n\nclass Figura(ABC):\n    @abstractmethod\n    def area(self): pass\n\nf = Figura()",
  "o": [
   "TypeError: no se puede instanciar una clase abstracta",
   "Se crea el objeto f sin problemas",
   "SyntaxError",
   "f.area() devuelve 0"
  ],
  "a": 0,
  "ok": "Una clase con métodos abstractos sin implementar no se puede instanciar; solo sirve para heredar.",
  "pista": "¿Para qué sirve una clase abstracta: para crear objetos o para heredar?"
 },
 {
  "u": 7,
  "n": 4,
  "q": "¿Cuál de estas declaraciones compila en Java? (A, B son clases; I, J son interfaces)",
  "lang": "Java",
  "code": null,
  "o": [
   "class C extends A implements I, J { }",
   "class C extends A, B { }",
   "class C implements A, B { }",
   "class C extends I, J { }"
  ],
  "a": 0,
  "ok": "Java permite una sola superclase directa y herencia múltiple de tipo mediante interfaces.",
  "pista": "¿Cuántas clases puede extender una clase en Java? ¿Y cuántas interfaces puede implementar?"
 },
 {
  "u": 8,
  "n": 3,
  "q": "¿Qué expresión produce la misma lista caros, sin modificar una lista paso a paso?",
  "lang": "Python",
  "code": "precios = [100, 250, 80, 300]\ncaros = []\nfor p in precios:\n    if p > 90:\n        caros.append(p * 2)",
  "o": [
   "[p * 2 for p in precios if p > 90]",
   "[p for p in precios if p * 2 > 90]",
   "[p * 2 for p in precios]",
   "list(filter(lambda p: p > 90, precios))"
  ],
  "a": 0,
  "ok": "La comprensión filtra (p > 90) y transforma (p * 2) en una sola expresión.",
  "pista": "¿Qué opción filtra con la misma condición y además transforma cada elemento?"
 },
 {
  "u": 8,
  "n": 4,
  "q": "¿Cuál de estas funciones es pura?",
  "lang": "Python",
  "code": "import time\ntasa = 0.1\ndef a(x): return x * 2\ndef b(x): return x * tasa\ndef c(l): l.sort(); return l\ndef d(x): return time.time() + x",
  "o": [
   "a",
   "b",
   "c",
   "d"
  ],
  "a": 0,
  "ok": "b depende de una variable externa, c modifica su parámetro y d depende del reloj. Solo a devuelve siempre lo mismo con la misma entrada.",
  "pista": "Para cada una: ¿modifica algo externo o depende de algo que puede cambiar?"
 },
 {
  "u": 8,
  "n": 4,
  "q": "¿Qué imprime?",
  "lang": "Python",
  "code": "m = map(lambda x: x * 10, [1, 2, 3])\nprint(sum(m))\nprint(sum(m))",
  "o": [
   "60 y 0",
   "60 y 60",
   "0 y 0",
   "Error en la segunda línea"
  ],
  "a": 0,
  "ok": "map devuelve un iterador: el primer sum lo consume entero y el segundo ya no encuentra elementos.",
  "pista": "¿map devuelve una lista o un iterador? ¿Se puede recorrer dos veces?"
 },
 {
  "u": 8,
  "n": 3,
  "q": "¿Qué ocurre?",
  "lang": "Python",
  "code": "from functools import reduce\nprint(reduce(lambda a, b: a + b, [], 0))\nprint(reduce(lambda a, b: a + b, []))",
  "o": [
   "Imprime 0 y después lanza TypeError",
   "Imprime 0 y 0",
   "Lanza TypeError en la primera línea",
   "Imprime None y 0"
  ],
  "a": 0,
  "ok": "El valor inicial es el resultado por defecto cuando el iterable está vacío; sin él, reduce no tiene nada que devolver.",
  "pista": "¿Para qué sirve el valor inicial de reduce cuando la lista está vacía?"
 },
 {
  "u": 8,
  "n": 4,
  "q": "¿Qué imprime?",
  "lang": "Java",
  "code": "Stream.of(1, 2, 3)\n      .peek(x -> System.out.println(\"visto \" + x))\n      .map(x -> x * 2);\nSystem.out.println(\"fin\");",
  "o": [
   "Solo fin",
   "visto 1, visto 2, visto 3 y fin",
   "fin y después visto 1, 2, 3",
   "Error: falta la operación terminal"
  ],
  "a": 0,
  "ok": "Las operaciones intermedias son perezosas: sin una operación terminal, el pipeline no procesa ningún elemento.",
  "pista": "¿Cuándo empiezan a procesar elementos las operaciones intermedias de un stream?"
 },
 {
  "u": 8,
  "n": 5,
  "q": "¿Cuál es la evaluación más precisa de este código?",
  "lang": "Java",
  "code": "List<Integer> vistos = new ArrayList<>();\nint total = precios.stream()\n    .map(p -> { vistos.add(p); return p * 2; })\n    .reduce(0, Integer::sum);",
  "o": [
   "Funciona, pero la lambda del map tiene un efecto secundario: el tutorial de Java recomienda no hacerlo",
   "Es funcional puro porque usa map y reduce",
   "No compila porque una lambda no puede tener llaves",
   "Es correcto y recomendable: así se registran los elementos procesados"
  ],
  "a": 0,
  "ok": "Usar map y reduce no vuelve pura a una lambda que modifica una lista externa. El tutorial de Java recomienda no pasar lambdas con efectos secundarios a filter o map.",
  "pista": "¿La lambda del map modifica algo que está fuera de ella?"
 }
];

/* Retos abiertos: solo aparecen con el «modo jurado». Los valida la docente. */
const RETOS_ABIERTOS = [
 {
  "u": 1,
  "n": 5,
  "q": "Elijan un problema real de su ciudad y argumenten qué paradigma usarían para resolverlo y cuál descartarían.",
  "criterios": [
   "Nombran el paradigma y una característica concreta que lo justifica",
   "Explican por qué descartan otro paradigma",
   "El argumento se refiere al problema, no a un lenguaje"
  ]
 },
 {
  "u": 2,
  "n": 5,
  "q": "Comparen cómo se lee un número entero desde teclado en Python y en Java, y decidan cuál es más legible según Hoare.",
  "criterios": [
   "Escriben o dictan las dos versiones",
   "Usan el criterio de legibilidad, no solo la cantidad de líneas",
   "Llegan a una decisión justificada"
  ]
 },
 {
  "u": 3,
  "n": 5,
  "q": "Propongan un ejemplo en el que el alcance y el tiempo de vida de una variable no coincidan.",
  "criterios": [
   "El ejemplo es correcto (por ejemplo, una variable static de C)",
   "Explican cuál es el alcance",
   "Explican cuánto vive la variable"
  ]
 },
 {
  "u": 4,
  "n": 5,
  "q": "Diseñen las estructuras de datos para guardar las inscripciones a talleres de una feria: quién se inscribe, en qué taller y sin repetir personas.",
  "criterios": [
   "Usan al menos dos constructores de tipos distintos",
   "Justifican cada uno con una propiedad (orden, duplicados, clave, mutabilidad)",
   "La estructura permite responder «¿quién está en el taller X?»"
  ]
 },
 {
  "u": 5,
  "n": 5,
  "q": "Den un caso en el que usarían una guarda y otro en el que usarían una excepción, y expliquen la diferencia.",
  "criterios": [
   "El caso de guarda se verifica con una condición simple antes de actuar",
   "El caso de excepción es difícil de prever o viene de afuera",
   "Explican cuándo actúa cada mecanismo"
  ]
 },
 {
  "u": 6,
  "n": 5,
  "q": "Expliquen, sin mirar apuntes, por qué decir que Python pasa «por referencia» es impreciso.",
  "criterios": [
   "Mencionan que se pasa una referencia al objeto",
   "Muestran que reasignar el parámetro no afecta a quien llama",
   "Muestran que modificar un objeto mutable sí se ve afuera"
  ]
 },
 {
  "u": 7,
  "n": 5,
  "q": "Propongan una jerarquía de tres clases de un dominio a elección y señalen dónde ocurre la ligadura dinámica.",
  "criterios": [
   "Hay una superclase y al menos dos subclases",
   "Al menos un método se sobrescribe",
   "Señalan la línea donde el método se elige en ejecución"
  ]
 },
 {
  "u": 8,
  "n": 5,
  "q": "Tomen un bucle con acumulador que conozcan y transfórmenlo en un pipeline con filter, map y reduce.",
  "criterios": [
   "La versión funcional da el mismo resultado",
   "Ninguna lambda modifica variables externas",
   "Nombran qué hace cada etapa"
  ]
 }
];
