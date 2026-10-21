/* =========================================================
   Casos del «Tribunal de diseño» · Teoría de la Programación
   Los dos diseños de cada caso funcionan y dan la misma salida (se ejecutaron para comprobarlo);
   cada uno favorece un criterio distinto. «criterio» y «preguntas» son la guía para el jurado.
   registrada = salida real al ejecutar con CPython, gcc o javac/java.
   ========================================================= */
const CASOS_TRIBUNAL = [
 {
  "id": "t1",
  "u": 1,
  "titulo": "Tarifas de envío",
  "contexto": "Una empresa de mensajería calcula la tarifa según el peso del paquete. Las reglas cambian varias veces por año.",
  "criterio": "Qué paradigma se ajusta mejor al problema: declarar reglas como datos o escribir los pasos de decisión.",
  "preguntas": [
   "¿Qué hay que tocar en cada diseño cuando cambia una regla?",
   "¿Cuál se entiende mejor si las reglas pasan a ser 30?"
  ],
  "A": {
   "nombre": "Reglas como datos",
   "lang": "Python",
   "code": "REGLAS = [\n    (lambda kg: kg <= 1, 15000),\n    (lambda kg: kg <= 5, 25000),\n    (lambda kg: kg <= 20, 40000),\n]\n\ndef tarifa(kg):\n    for cumple, precio in REGLAS:\n        if cumple(kg):\n            return precio\n    return 60000\n\nprint(tarifa(0.5), tarifa(3), tarifa(25))",
   "registrada": "15000 25000 60000"
  },
  "B": {
   "nombre": "Pasos de decisión",
   "lang": "Python",
   "code": "def tarifa(kg):\n    if kg <= 1:\n        return 15000\n    elif kg <= 5:\n        return 25000\n    elif kg <= 20:\n        return 40000\n    else:\n        return 60000\n\nprint(tarifa(0.5), tarifa(3), tarifa(25))",
   "registrada": "15000 25000 60000"
  }
 },
 {
  "id": "t2",
  "u": 2,
  "titulo": "Lecturas válidas de un sensor",
  "contexto": "Hay que quedarse con las lecturas entre 0 y 50 grados y convertirlas a Fahrenheit.",
  "criterio": "Legibilidad frente a facilidad de escritura (Hoare).",
  "preguntas": [
   "¿Cuál entendería más rápido alguien que no escribió el código?",
   "¿Cuál es más fácil de modificar si se agrega otra condición?"
  ],
  "A": {
   "nombre": "Una sola expresión",
   "lang": "Python",
   "code": "lecturas = [21.5, -3.0, 48.2, 55.1, 30.0]\nprint([round(c * 9 / 5 + 32, 1) for c in lecturas if 0 <= c <= 50])",
   "registrada": "[70.7, 118.8, 86.0]"
  },
  "B": {
   "nombre": "Pasos con nombres",
   "lang": "Python",
   "code": "lecturas = [21.5, -3.0, 48.2, 55.1, 30.0]\nvalidas_en_f = []\nfor celsius in lecturas:\n    es_valida = 0 <= celsius <= 50\n    if es_valida:\n        fahrenheit = celsius * 9 / 5 + 32\n        validas_en_f.append(round(fahrenheit, 1))\nprint(validas_en_f)",
   "registrada": "[70.7, 118.8, 86.0]"
  }
 },
 {
  "id": "t3",
  "u": 2,
  "titulo": "Procesar un millón de lecturas",
  "contexto": "Un dispositivo debe sumar un millón de lecturas. El equipo duda entre escribirlo en C o en Java.",
  "criterio": "Eficiencia del código compilado a máquina frente a portabilidad del bytecode.",
  "preguntas": [
   "¿En qué tipo de dispositivo o situación pesa más cada criterio?",
   "¿Qué pasa si el mismo programa tiene que correr en máquinas distintas?"
  ],
  "A": {
   "nombre": "C compilado a código máquina",
   "lang": "C",
   "code": "#include <stdio.h>\n\nint main(void) {\n    long long suma = 0;\n    for (int i = 1; i <= 1000000; i++)\n        suma += i % 100;\n    printf(\"%lld\\n\", suma);\n    return 0;\n}",
   "registrada": "49500000"
  },
  "B": {
   "nombre": "Java compilado a bytecode",
   "lang": "Java",
   "code": "public class Suma {\n    public static void main(String[] args) {\n        long suma = 0;\n        for (int i = 1; i <= 1000000; i++)\n            suma += i % 100;\n        System.out.println(suma);\n    }\n}",
   "registrada": "49500000"
  }
 },
 {
  "id": "t4",
  "u": 3,
  "titulo": "Turnos de una farmacia",
  "contexto": "Cada vez que llega una persona, el sistema le da el siguiente número de turno.",
  "criterio": "Alcance: depender de una variable global o recibir y devolver el estado.",
  "preguntas": [
   "¿Qué pasa si mañana hay dos filas con numeración separada?",
   "¿Cuál es más fácil de probar por separado?"
  ],
  "A": {
   "nombre": "Contador global",
   "lang": "Python",
   "code": "turno = 0\n\ndef siguiente_turno():\n    global turno\n    turno = turno + 1\n    return turno\n\nprint(siguiente_turno(), siguiente_turno(), siguiente_turno())",
   "registrada": "1 2 3"
  },
  "B": {
   "nombre": "Recibe y devuelve el estado",
   "lang": "Python",
   "code": "def siguiente_turno(actual):\n    return actual + 1\n\nturno = 0\nturno = siguiente_turno(turno); a = turno\nturno = siguiente_turno(turno); b = turno\nturno = siguiente_turno(turno); c = turno\nprint(a, b, c)",
   "registrada": "1 2 3"
  }
 },
 {
  "id": "t5",
  "u": 4,
  "titulo": "Total de un pedido",
  "contexto": "Una función calcula el total de un pedido a partir de los precios y las cantidades.",
  "criterio": "Tipado estático (errores detectados al compilar) frente a tipado dinámico (flexibilidad).",
  "preguntas": [
   "¿En qué momento se enteraría cada equipo de que alguien pasó un texto en lugar de un número?",
   "¿Cuánto hay que escribir en cada versión para lo mismo?"
  ],
  "A": {
   "nombre": "Java con tipos declarados",
   "lang": "Java",
   "code": "public class Pedido {\n    static int total(int[] precios, int[] cantidades) {\n        int suma = 0;\n        for (int i = 0; i < precios.length; i++)\n            suma += precios[i] * cantidades[i];\n        return suma;\n    }\n    public static void main(String[] args) {\n        System.out.println(total(new int[]{8000, 12000}, new int[]{2, 1}));\n    }\n}",
   "registrada": "28000"
  },
  "B": {
   "nombre": "Python con tipado dinámico",
   "lang": "Python",
   "code": "def total(precios, cantidades):\n    suma = 0\n    for p, c in zip(precios, cantidades):\n        suma += p * c\n    return suma\n\nprint(total([8000, 12000], [2, 1]))",
   "registrada": "28000"
  }
 },
 {
  "id": "t6",
  "u": 5,
  "titulo": "Cantidad ingresada por teclado",
  "contexto": "El sistema pide la cantidad de un producto. Debe ser un número entero entre 1 y 99.",
  "criterio": "Prevenir con guardas antes de actuar frente a intentar y capturar la excepción.",
  "preguntas": [
   "¿Qué entradas raras deja pasar o rechaza cada diseño? Prueben «-3», « 7» y «7.0».",
   "¿Cuál es más claro sobre qué puede fallar?"
  ],
  "A": {
   "nombre": "Guardas antes de convertir",
   "lang": "Python",
   "code": "def leer_cantidad(texto):\n    if not texto.isdigit():\n        return None\n    n = int(texto)\n    if not 1 <= n <= 99:\n        return None\n    return n\n\nfor t in [\"12\", \"doce\", \"150\"]:\n    print(t, \"->\", leer_cantidad(t))",
   "registrada": "12 -> 12\ndoce -> None\n150 -> None"
  },
  "B": {
   "nombre": "Intentar y capturar",
   "lang": "Python",
   "code": "def leer_cantidad(texto):\n    try:\n        n = int(texto)\n    except ValueError:\n        return None\n    if not 1 <= n <= 99:\n        return None\n    return n\n\nfor t in [\"12\", \"doce\", \"150\"]:\n    print(t, \"->\", leer_cantidad(t))",
   "registrada": "12 -> 12\ndoce -> None\n150 -> None"
  }
 },
 {
  "id": "t7",
  "u": 6,
  "titulo": "Descuento a los precios",
  "contexto": "Una función aplica un 10 % de descuento a una lista de precios.",
  "criterio": "Modificar el objeto que se recibió frente a devolver uno nuevo.",
  "preguntas": [
   "¿Qué pasa con la lista original en cada diseño?",
   "¿Cuándo conviene no crear una copia?"
  ],
  "A": {
   "nombre": "Modifica la lista recibida",
   "lang": "Python",
   "code": "def descontar(precios):\n    for i in range(len(precios)):\n        precios[i] = precios[i] * 9 // 10\n\nlista = [10000, 25000]\ndescontar(lista)\nprint(lista)",
   "registrada": "[9000, 22500]"
  },
  "B": {
   "nombre": "Devuelve una lista nueva",
   "lang": "Python",
   "code": "def descontar(precios):\n    return [p * 9 // 10 for p in precios]\n\nlista = [10000, 25000]\nlista = descontar(lista)\nprint(lista)",
   "registrada": "[9000, 22500]"
  }
 },
 {
  "id": "t8",
  "u": 7,
  "titulo": "Áreas de figuras",
  "contexto": "Un programa suma el área de varias figuras. Se sabe que más adelante habrá figuras nuevas.",
  "criterio": "Preguntar por el tipo de cada objeto frente a polimorfismo con ligadura dinámica.",
  "preguntas": [
   "¿Qué hay que modificar en cada diseño para agregar triángulos?",
   "¿En cuál es más fácil olvidarse de un caso?"
  ],
  "A": {
   "nombre": "Preguntar el tipo",
   "lang": "Python",
   "code": "class Circulo:\n    def __init__(self, r): self.r = r\n\nclass Cuadrado:\n    def __init__(self, l): self.l = l\n\ndef area_total(figuras):\n    total = 0\n    for f in figuras:\n        if type(f) == Circulo:\n            total += 3.14 * f.r ** 2\n        elif type(f) == Cuadrado:\n            total += f.l ** 2\n    return total\n\nprint(area_total([Circulo(1), Cuadrado(2)]))",
   "registrada": "7.140000000000001"
  },
  "B": {
   "nombre": "Polimorfismo",
   "lang": "Python",
   "code": "class Circulo:\n    def __init__(self, r): self.r = r\n    def area(self): return 3.14 * self.r ** 2\n\nclass Cuadrado:\n    def __init__(self, l): self.l = l\n    def area(self): return self.l ** 2\n\ndef area_total(figuras):\n    return sum(f.area() for f in figuras)\n\nprint(area_total([Circulo(1), Cuadrado(2)]))",
   "registrada": "7.140000000000001"
  }
 },
 {
  "id": "t9",
  "u": 8,
  "titulo": "Ventas de una sucursal",
  "contexto": "Hay que sumar las ventas mayores a 100 000 guaraníes de la sucursal de Luque.",
  "criterio": "Estado mutable con un acumulador frente a un pipeline de funciones puras.",
  "preguntas": [
   "¿Qué variables cambian de valor en cada diseño?",
   "¿Cuál es más fácil de dividir en partes reutilizables?"
  ],
  "A": {
   "nombre": "Bucle con acumulador",
   "lang": "Python",
   "code": "ventas = [(\"Luque\", 150000), (\"Limpio\", 300000),\n          (\"Luque\", 80000), (\"Luque\", 220000)]\ntotal = 0\nfor sucursal, monto in ventas:\n    if sucursal == \"Luque\" and monto > 100000:\n        total = total + monto\nprint(total)",
   "registrada": "370000"
  },
  "B": {
   "nombre": "Pipeline",
   "lang": "Python",
   "code": "from functools import reduce\n\nventas = [(\"Luque\", 150000), (\"Limpio\", 300000),\n          (\"Luque\", 80000), (\"Luque\", 220000)]\nde_luque = filter(lambda v: v[0] == \"Luque\", ventas)\nmontos = map(lambda v: v[1], de_luque)\ngrandes = filter(lambda m: m > 100000, montos)\nprint(reduce(lambda a, b: a + b, grandes, 0))",
   "registrada": "370000"
  }
 }
];
