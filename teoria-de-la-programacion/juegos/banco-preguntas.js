/* =========================================================
   Banco de preguntas · Teoría de la Programación · Unidades 1 a 8
   Lo usan "Ruta de Repaso" y "Duelo de equipos".
   Para agregar una pregunta, copia un bloque y cambia los datos.

   Tipos:
     mc    → opción múltiple (o = opciones, a = índice correcto, desde 0)
     code  → "¿qué imprime?" (lang, code, o, a)
     vf    → verdadero/falso (a = true o false)
     match → emparejar (pares = [["izquierda","derecha"], ...])
   pista → pregunta orientadora que se muestra al fallar.
   ========================================================= */

const UNIDADES = {
  1: { nombre: "Lenguajes de programación", corto: "Paradigmas y traducción" },
  2: { nombre: "Principios de diseño", corto: "Criterios y regularidad" },
  3: { nombre: "Semántica básica", corto: "Ligadura, alcance y vida" },
  4: { nombre: "Tipos de datos", corto: "Tipado y constructores" },
  5: { nombre: "Expresiones y enunciados", corto: "Guardas y excepciones" },
  6: { nombre: "Procedimientos y ambientes", corto: "Pila y parámetros" },
  7: { nombre: "Programación orientada a objetos", corto: "Clases y polimorfismo" },
  8: { nombre: "Programación funcional", corto: "Funciones puras" }
};

const BANCO = [
  /* ---------------- UNIDAD 1 ---------------- */
  { u: 1, t: "mc",
    q: "Un programa que usa un bucle for y un acumulador que cambia de valor en cada vuelta sigue el paradigma…",
    o: ["Imperativo / estructurado", "Funcional", "Lógico", "Orientado a eventos"], a: 0,
    pista: "¿El código dice QUÉ resultado quiere, o CÓMO llegar a él paso a paso?" },
  { u: 1, t: "mc",
    q: "Prolog es el ejemplo clásico del paradigma…",
    o: ["Funcional", "Lógico", "Orientado a objetos", "Estructurado"], a: 1,
    pista: "¿Qué paradigma describe hechos y reglas y deja que el sistema deduzca la respuesta?" },
  { u: 1, t: "code", lang: "Python",
    code: `nums = [3, 4, 5]
total = sum(n * 2 for n in nums)
print(total)`,
    q: "¿Qué imprime y qué estilo muestra?",
    o: ["24, estilo funcional", "24, estilo imperativo", "12, estilo funcional", "Error: sum no acepta esa expresión"], a: 0,
    pista: "¿Hay alguna variable que vaya cambiando de valor en cada vuelta? ¿Cuánto es 6 + 8 + 10?" },
  { u: 1, t: "mc",
    q: "¿Qué hace un compilador?",
    o: ["Ejecuta el código línea por línea sin generar otro archivo",
        "Traduce todo el programa a otro lenguaje (por ejemplo, código máquina) antes de ejecutarlo",
        "Solo revisa la ortografía de los comentarios",
        "Convierte código máquina en código fuente"], a: 1,
    pista: "¿La traducción ocurre antes de ejecutar o mientras se ejecuta?" },
  { u: 1, t: "mc",
    q: "Java se considera un caso híbrido de traducción porque…",
    o: ["Es un lenguaje solamente interpretado",
        "Compila a código máquina distinto para cada sistema operativo",
        "Compila a bytecode y la JVM lo ejecuta en cada plataforma",
        "No necesita ningún tipo de traducción"], a: 2,
    pista: "¿Qué produce javac y quién ejecuta ese resultado?" },
  { u: 1, t: "vf",
    q: "Dar un nombre a una entidad del lenguaje, como una variable, una función o una clase, es construir una abstracción.",
    a: true,
    pista: "Repasa el concepto de abstracción en la Unidad 1: ¿qué se hace al darle nombre a algo?" },
  { u: 1, t: "match",
    q: "Une cada lenguaje con lo que dicen sus fuentes.",
    pares: [["FORTRAN", "FORmula TRANslating system para el IBM 704"], ["Lisp", "Procesamiento de listas para inteligencia artificial"],
            ["C", "Lenguaje de implementación de sistemas para Unix"], ["Java", "Bytecode neutral respecto de la arquitectura"]],
    pista: "Revisa la tabla de albores históricos de la Unidad 1: ¿qué dice la fuente de cada lenguaje?" },
  { u: 1, t: "mc",
    q: "Que Python sea multiparadigma significa que…",
    o: ["Permite escribir en estilo imperativo, orientado a objetos y funcional",
        "Cambia de paradigma en cada versión",
        "No pertenece a ningún paradigma",
        "Solo permite programar con clases"], a: 0,
    pista: "En la Unidad 1 está la misma suma escrita de tres formas en Python. ¿Cuáles eran?" },
  { u: 1, t: "mc",
    q: "Según Van Roy, la programación declarativa consiste en…",
    o: ["Decirle a la computadora qué se necesita en lugar de cómo calcularlo",
        "Declarar todas las variables antes de usarlas",
        "Escribir los pasos exactos que debe seguir la máquina",
        "Usar solamente clases y objetos"], a: 0,
    pista: "¿El programa describe el resultado o el procedimiento?" },
  { u: 1, t: "vf",
    q: "Como Python es interpretado, no puede detectar ningún error antes de empezar a ejecutar.",
    a: false,
    pista: "Si te falta un ':' en la línea 50, ¿se llegan a ejecutar las líneas 1 a 49?" },

  /* ---------------- UNIDAD 2 ---------------- */
  { u: 2, t: "mc",
    q: "Que Python use el mismo for para recorrer listas, tuplas y conjuntos es un ejemplo de…",
    o: ["Eficiencia", "Regularidad", "Portabilidad", "Confiabilidad"], a: 1,
    pista: "¿Hay excepciones o casos especiales en esa regla?" },
  { u: 2, t: "mc",
    q: "En C, switch acepta valores enteros o caracteres, pero no cadenas. Eso muestra…",
    o: ["Alta legibilidad", "Portabilidad", "Una irregularidad del lenguaje", "Tipado dinámico"], a: 2,
    pista: "¿Una regla con casos especiales hace al lenguaje más o menos regular?" },
  { u: 2, t: "match",
    q: "Une cada criterio de diseño con lo que dice la fuente.",
    pares: [["Legibilidad", "Hoare la considera más importante que la facilidad de escritura"],
            ["Seguridad", "Un error nunca debe producir efectos dependientes de la máquina"],
            ["Portabilidad", "Bytecode neutral y tamaños fijos de los tipos primitivos (Java)"],
            ["Regularidad", "Los casos especiales no rompen las reglas (Zen de Python)"]],
    pista: "Repasa los conceptos de la Unidad 2: Hoare, Gosling y McGilton, y el Zen de Python." },
  { u: 2, t: "mc",
    q: "¿Qué lenguaje se creó como lenguaje de implementación de sistemas para Unix?",
    o: ["Python", "Java", "C", "JavaScript"], a: 2,
    pista: "Busca la fila de 1972 en la tabla de albores históricos." },
  { u: 2, t: "mc",
    q: "Java compila a bytecode neutral respecto de la arquitectura. ¿Qué criterio busca?",
    o: ["Portabilidad", "Eficiencia", "Regularidad", "Facilidad de escritura"], a: 0,
    pista: "¿Qué gana un programa si su código intermedio no depende de la máquina?" },
  { u: 2, t: "vf",
    q: "El valor que devuelve time.perf_counter() tiene significado por sí solo: indica la hora actual.",
    a: false,
    pista: "¿Qué dice la documentación sobre el punto de referencia de perf_counter()? ¿Qué es lo único válido?" },
  { u: 2, t: "mc",
    q: "Java verifica los tipos al compilar. ¿Qué criterio de diseño se fortalece?",
    o: ["Facilidad de escritura", "Confiabilidad", "Regularidad", "Eficiencia de memoria"], a: 1,
    pista: "Si el error aparece antes de ejecutar, ¿qué gana quien usa el programa?" },
  { u: 2, t: "vf",
    q: "Un lenguaje regular tiene pocas excepciones y casos especiales en sus reglas.",
    a: true,
    pista: "¿Qué significa que una regla se aplique igual en todos los casos?" },
  { u: 2, t: "mc",
    q: "Para comparar de forma justa el tiempo de dos versiones de un programa, conviene…",
    o: ["Hacer una sola corrida con datos distintos en cada versión",
        "Usar el mismo tamaño de entrada, repetir varias corridas y promediar",
        "Comparar cuántas líneas tiene cada versión",
        "Medir con otros programas pesados abiertos"], a: 1,
    pista: "¿Qué puede cambiar entre una corrida y otra? ¿Cómo lo compensas?" },

  /* ---------------- UNIDAD 3 ---------------- */
  { u: 3, t: "mc",
    q: "En semántica, una ligadura es…",
    o: ["Un error de compilación",
        "La asociación entre un nombre y lo que representa (tipo, valor o almacenamiento)",
        "Una variable global",
        "El nombre de una función"], a: 1,
    pista: "¿Qué se «liga» con qué? Piensa en una variable y sus propiedades." },
  { u: 3, t: "code", lang: "Python",
    code: `x = 'global'
def demo():
    x = 'local'
    print('dentro:', x)
demo()
print('fuera:', x)`,
    q: "¿Qué imprime?",
    o: ["dentro: local / fuera: global", "dentro: local / fuera: local",
        "dentro: global / fuera: global", "Error: x ya existe"], a: 0,
    pista: "La x de adentro de demo(), ¿es la misma variable que la de afuera?" },
  { u: 3, t: "code", lang: "Python",
    code: `contador = 0
def sumar():
    contador = contador + 1
sumar()
print(contador)`,
    q: "¿Qué ocurre al ejecutar?",
    o: ["Imprime 1", "Imprime 0", "UnboundLocalError", "Imprime None"], a: 2,
    pista: "Si dentro de la función se asigna a contador, ¿Python la trata como local o global? ¿Tiene valor cuando se lee?" },
  { u: 3, t: "match",
    q: "Une cada concepto con su tiempo de vida.",
    pares: [["Duración estática (C)", "Toda la ejecución del programa"],
            ["Duración automática (C)", "Desde que se entra al bloque hasta que se sale"],
            ["Duración asignada (C)", "Se reserva y libera a pedido con malloc y free"],
            ["Recolector de basura", "Libera objetos que ya no tienen referencias"]],
    pista: "¿Cuándo nace y cuándo muere una variable local? ¿Y una global?" },
  { u: 3, t: "mc",
    q: "La tabla de símbolos guarda…",
    o: ["El resultado final del programa",
        "Para cada identificador, a qué se refiere",
        "Solo los comentarios del código",
        "La lista de errores de ejecución"], a: 1,
    pista: "¿Cuáles son las claves de esa tabla y qué valores guarda?" },
  { u: 3, t: "vf",
    q: "La mayoría de los lenguajes modernos usa alcance léxico (estático).",
    a: true,
    pista: "Con alcance estático, ¿puedes saber qué variable se usa con solo mirar el código escrito?" },
  { u: 3, t: "vf",
    q: "En Python, escribir PI = 3.14 en mayúsculas impide que luego se le asigne otro valor.",
    a: false,
    pista: "¿Las mayúsculas en Python son una regla del lenguaje o una convención entre programadores? Compáralo con final en Java." },
  { u: 3, t: "mc",
    q: "En Java, una clase tiene sumar(int a, int b) y sumar(double a, double b). Esto se llama…",
    o: ["Herencia", "Sobrecarga de nombres", "Alcance dinámico", "Ligadura de valor"], a: 1,
    pista: "Mismo nombre, distinta firma. ¿Cómo decide Java cuál usar?" },
  { u: 3, t: "code", lang: "Python",
    code: `def f():
    return 1
def f():
    return 2
print(f())`,
    q: "¿Qué imprime?",
    o: ["1", "2", "Error: función duplicada", "1 y 2"], a: 1,
    pista: "¿Python distingue funciones por su firma como Java, o el último def vuelve a ligar el nombre f?" },
  { u: 3, t: "mc",
    q: "Con alcance dinámico, para saber qué variable usa una función hay que mirar…",
    o: ["Dónde está escrita la función", "La cadena de llamadas en tiempo de ejecución",
        "El tipo de la variable", "La tabla de verdad"], a: 1,
    pista: "¿La asociación se decide al compilar o durante la ejecución?" },
  { u: 3, t: "mc",
    q: "En C, la ligadura de almacenamiento de una variable automática ocurre…",
    o: ["Al compilar", "Al escribir el código", "Al entrar al bloque donde se declaró", "Nunca"], a: 2,
    pista: "¿Cuándo se reserva el espacio de una variable con duración automática?" },

  /* ---------------- UNIDAD 4 ---------------- */
  { u: 4, t: "mc",
    q: "Tipado estático significa que…",
    o: ["Las variables nunca cambian de valor",
        "Los tipos se verifican en tiempo de compilación",
        "Los tipos se verifican al ejecutar cada línea",
        "Solo existen tipos numéricos"], a: 1,
    pista: "Ojo: no confundas con ligadura estática. Aquí la pregunta es CUÁNDO se verifican los tipos." },
  { u: 4, t: "code", lang: "Python",
    code: `print("3" + 3)`,
    q: "¿Qué ocurre?",
    o: ["Imprime 33", "Imprime 6", "TypeError", "Imprime 3 3"], a: 2,
    pista: "Python es dinámico, pero ¿convierte tipos por su cuenta? ¿Es fuerte o débil?" },
  { u: 4, t: "code", lang: "Java",
    code: `int a = 7;
int b = 2;
System.out.println(a / b);`,
    q: "¿Qué imprime?",
    o: ["3.5", "3", "4", "Error de compilación"], a: 1,
    pista: "Si los dos operandos son int, ¿de qué tipo es el resultado?" },
  { u: 4, t: "code", lang: "Python",
    code: `print(7 / 2, 7 // 2)`,
    q: "¿Qué imprime?",
    o: ["3 3", "3.5 3.5", "3.5 3", "3 3.5"], a: 2,
    pista: "¿Qué diferencia hay entre / y // en Python?" },
  { u: 4, t: "match",
    q: "Une cada estructura de Python con su característica.",
    pares: [["list", "Ordenada, mutable, admite duplicados"],
            ["tuple", "Ordenada e inmutable"],
            ["set", "Sin orden y sin duplicados"],
            ["dict", "Pares clave → valor"]],
    pista: "¿Cuál de ellas no deja cambiar sus elementos una vez creada? ¿Cuál elimina repetidos?" },
  { u: 4, t: "code", lang: "Python",
    code: `s = {1, 2, 2, 3, 3, 3}
print(len(s))`,
    q: "¿Qué imprime?",
    o: ["6", "3", "1", "Error"], a: 1,
    pista: "¿Qué hace un conjunto con los elementos repetidos?" },
  { u: 4, t: "code", lang: "Python",
    code: `t = (10, 20, 30)
t[0] = 99
print(t)`,
    q: "¿Qué ocurre?",
    o: ["(99, 20, 30)", "(10, 20, 30)", "TypeError", "[99, 20, 30]"], a: 2,
    pista: "¿Una tupla es mutable o inmutable?" },
  { u: 4, t: "mc",
    q: "Un registro Estudiante con documento, nombre, teléfono y promedio es un ejemplo de…",
    o: ["Tipo simple", "Constructor de tipos (registro / struct)", "Excepción", "Guarda"], a: 1,
    pista: "¿Es un solo valor o agrupa varios valores de distinto tipo?" },
  { u: 4, t: "vf",
    q: "Python tiene tipado dinámico y fuerte.",
    a: true,
    pista: "¿Cuándo verifica los tipos? ¿Y qué pasa con \"3\" + 3?" },
  { u: 4, t: "mc",
    q: "¿Cuál clasificación es correcta?",
    o: ["Java: estático y fuerte · Python: dinámico y fuerte",
        "Java: dinámico y fuerte · Python: estático y débil",
        "Java: estático y débil · Python: dinámico y débil",
        "Java: dinámico y débil · Python: estático y fuerte"], a: 0,
    pista: "Separa los dos ejes: CUÁNDO se verifica (estático/dinámico) y SI convierte solo (débil/fuerte)." },
  { u: 4, t: "code", lang: "Python",
    code: `a = [1, 2, 3]
b = a
b.append(4)
print(a)`,
    q: "¿Qué imprime?",
    o: ["[1, 2, 3]", "[1, 2, 3, 4]", "[4]", "Error"], a: 1,
    pista: "¿b = a copia la lista, o liga otro nombre al mismo objeto?" },
  { u: 4, t: "code", lang: "Java",
    code: `HashMap<String, Integer> m = new HashMap<>();
m.put("Ana", 5);
m.put("Ana", 3);
System.out.println(m.size());`,
    q: "¿Qué imprime?",
    o: ["2", "1", "8", "Error: clave duplicada"], a: 1,
    pista: "En un mapa, ¿puede haber dos entradas con la misma clave?" },

  /* ---------------- UNIDAD 5 ---------------- */
  { u: 5, t: "code", lang: "Python",
    code: `print(5 + 3 * 2)`,
    q: "¿Qué imprime?",
    o: ["16", "11", "13", "10"], a: 1,
    pista: "¿Qué operador tiene mayor precedencia?" },
  { u: 5, t: "code", lang: "Python",
    code: `print(10 - 3 - 2)`,
    q: "¿Qué imprime?",
    o: ["9", "5", "-5", "7"], a: 1,
    pista: "Con operadores de igual prioridad, ¿se resuelve de izquierda a derecha o al revés?" },
  { u: 5, t: "code", lang: "Python",
    code: `print(2 ** 3 ** 2)`,
    q: "¿Qué imprime?",
    o: ["64", "512", "36", "Error"], a: 1,
    pista: "La potencia en Python, ¿se asocia por la izquierda o por la derecha?" },
  { u: 5, t: "mc",
    q: "En Python, ¿cuál es la diferencia entre una expresión y una sentencia?",
    o: ["No hay diferencia",
        "Una expresión se evalúa hasta dar un valor; una asignación como x = 3 es una sentencia",
        "Un enunciado siempre devuelve un número",
        "Una expresión solo existe en Java"], a: 1,
    pista: "Compara 3 * 4 con x = 3 * 4. ¿Cuál puede evaluarse hasta dar un valor?" },
  { u: 5, t: "mc",
    q: "¿Qué es una guarda?",
    o: ["Un bloque que captura el error después de que ocurre",
        "Una condición que se verifica antes de ejecutar un bloque, para prevenir el error",
        "Un tipo de bucle",
        "Una variable global protegida"], a: 1,
    pista: "¿La guarda actúa antes o después del problema?" },
  { u: 5, t: "mc",
    q: "Hay que convertir a entero un texto que escribe el usuario y que podría ser «30a». En Python conviene…",
    o: ["Una guarda if texto != 0", "try/except ValueError", "No hacer nada", "Un while True sin salida"], a: 1,
    pista: "¿Puedes prever con un if todas las formas en que ese texto puede estar mal escrito?" },
  { u: 5, t: "mc",
    q: "Simular un retiro bancario: verificar que el saldo alcance antes de debitar. Conviene…",
    o: ["Una guarda", "try/except", "Un switch", "Ignorar el saldo"], a: 0,
    pista: "¿Es una condición que puedes comprobar fácilmente antes de actuar?" },
  { u: 5, t: "vf",
    q: "C tiene bloques try/catch nativos para manejar excepciones.",
    a: false,
    pista: "Revisa la lista de palabras reservadas de C: ¿aparecen try o catch? ¿Qué usa la biblioteca estándar para informar errores?" },
  { u: 5, t: "match",
    q: "Une cada excepción con su causa.",
    pares: [["ZeroDivisionError (Python)", "Dividir por cero"],
            ["ValueError (Python)", "int(\"abc\")"],
            ["IndexError (Python)", "Índice fuera de rango en una lista"],
            ["ArithmeticException (Java)", "División entera por cero"]],
    pista: "Lee el nombre de cada excepción: ¿qué palabra te indica el problema?" },
  { u: 5, t: "code", lang: "Python",
    code: `def dividir(a, b):
    if b == 0:
        return None
    return a / b
print(dividir(8, 0))`,
    q: "¿Qué imprime?",
    o: ["0", "ZeroDivisionError", "None", "8"], a: 2,
    pista: "¿La guarda deja llegar el programa hasta la división?" },
  { u: 5, t: "code", lang: "Python",
    code: `x = 0
if x != 0 and 10 / x > 1:
    print("A")
else:
    print("B")`,
    q: "¿Qué ocurre?",
    o: ["Imprime A", "Imprime B", "ZeroDivisionError", "No imprime nada"], a: 1,
    pista: "Si la primera parte de un and es falsa, ¿Python necesita evaluar la segunda?" },
  { u: 5, t: "code", lang: "Python",
    code: `try:
    n = int("12a")
    print("ok")
except ValueError:
    print("valor inválido")
finally:
    print("fin")`,
    q: "¿Qué imprime?",
    o: ["ok / fin", "valor inválido / fin", "valor inválido", "ok / valor inválido / fin"], a: 1,
    pista: "¿Se llega a ejecutar print(\"ok\")? ¿Cuándo se ejecuta finally?" },
  { u: 5, t: "code", lang: "Java",
    code: `int[] v = {10, 20, 30};
try {
    System.out.println(v[3]);
} catch (ArrayIndexOutOfBoundsException e) {
    System.out.println("fuera de rango");
}`,
    q: "¿Qué imprime?",
    o: ["30", "fuera de rango", "0", "Error de compilación"], a: 1,
    pista: "Un arreglo de 3 elementos, ¿qué índices tiene?" },
  { u: 5, t: "code", lang: "Python",
    code: `print(True or False and False)`,
    q: "¿Qué imprime?",
    o: ["True", "False", "None", "Error"], a: 0,
    pista: "Entre and y or, ¿cuál se evalúa primero? Recuerda: AND multiplica, OR suma." },

  /* ---------------- UNIDAD 6 ---------------- */
  { u: 6, t: "mc",
    q: "El marco (call frame) de una llamada guarda…",
    o: ["Solo el código de la función", "Los parámetros y las variables locales de esa llamada",
        "Todas las variables globales del programa", "El código fuente completo"], a: 1,
    pista: "¿Qué datos pertenecen a una sola llamada y desaparecen cuando termina?" },
  { u: 6, t: "code", lang: "Python",
    code: `def f(lista):
    lista = [0]
    lista.append(5)

datos = [1, 2]
f(datos)
print(datos)`,
    q: "¿Qué imprime?",
    o: ["[1, 2]", "[0, 5]", "[1, 2, 5]", "[0]"], a: 0,
    pista: "Al hacer lista = [0], ¿modificas el objeto de afuera o ligas el parámetro a un objeto nuevo?" },
  { u: 6, t: "code", lang: "Java",
    code: `static void duplicar(int n) {
    n = n * 2;
}
// en main:
int x = 4;
duplicar(x);
System.out.println(x);`,
    q: "¿Qué imprime?",
    o: ["8", "4", "0", "Error de compilación"], a: 1,
    pista: "Un int en Java, ¿se pasa por valor o por referencia?" },
  { u: 6, t: "code", lang: "C",
    code: `void sumar_uno(int *p) {
    *p = *p + 1;
}
int main(void) {
    int a = 5;
    sumar_uno(&a);
    printf("%d", a);
}`,
    q: "¿Qué imprime?",
    o: ["5", "6", "Una dirección de memoria", "Error"], a: 1,
    pista: "¿Qué recibe la función: el valor de a o su dirección? ¿Qué modifica *p?" },
  { u: 6, t: "vf",
    q: "Java pasa los objetos por referencia, igual que C++ con &.",
    a: false,
    pista: "Si dentro del método haces lista = new ArrayList<>(), ¿cambia la variable del llamador?" },
  { u: 6, t: "mc",
    q: "En def sumar(a, b): y la llamada sumar(3, x)…",
    o: ["a y b son argumentos; 3 y x son parámetros formales",
        "a y b son parámetros formales; 3 y x son argumentos",
        "Los cuatro son variables globales",
        "a y b son constantes"], a: 1,
    pista: "¿Cuáles aparecen en la definición y cuáles en la llamada?" },
  { u: 6, t: "mc",
    q: "¿En qué zona de memoria vive una variable local mientras su función se ejecuta?",
    o: ["En el heap", "En la pila", "En la memoria estática", "En el disco"], a: 1,
    pista: "¿Qué estructura crece con cada llamada y se achica con cada retorno?" },
  { u: 6, t: "code", lang: "Python",
    code: `def contar(n):
    if n == 0:
        return 0
    return 1 + contar(n - 1)

print(contar(3))`,
    q: "¿Qué imprime?",
    o: ["0", "3", "4", "RecursionError"], a: 1,
    pista: "Dibuja la pila: ¿cuántas llamadas suman 1 antes de llegar al caso base?" },

  /* ---------------- UNIDAD 7 ---------------- */
  { u: 7, t: "mc",
    q: "Dos objetos con los mismos valores en todos sus atributos…",
    o: ["Son el mismo objeto", "Son objetos distintos: cada uno tiene su identidad",
        "No pueden existir a la vez", "Comparten la misma dirección de memoria"], a: 1,
    pista: "Piensa en dos ejemplares del mismo libro en la biblioteca." },
  { u: 7, t: "mc",
    q: "La ligadura dinámica decide qué método ejecutar según…",
    o: ["El tipo declarado de la variable", "La clase real del objeto en tiempo de ejecución",
        "El orden en que se escribieron las clases", "El nombre del archivo"], a: 1,
    pista: "Con Figura f = new Circulo(1), ¿qué area() se ejecuta?" },
  { u: 7, t: "code", lang: "Java",
    code: `class Animal {
    String sonido() { return "..."; }
}
class Perro extends Animal {
    String sonido() { return "Guau"; }
}
// en main:
Animal a = new Perro();
System.out.println(a.sonido());`,
    q: "¿Qué imprime?",
    o: ["...", "Guau", "Error de compilación", "null"], a: 1,
    pista: "La variable es de tipo Animal, pero ¿qué objeto se creó con new?" },
  { u: 7, t: "code", lang: "Python",
    code: `class A:
    def hola(self):
        return "A"

class B(A):
    pass

print(B().hola())`,
    q: "¿Qué imprime?",
    o: ["A", "B", "None", "AttributeError"], a: 0,
    pista: "Si B no define hola(), ¿dónde lo busca Python?" },
  { u: 7, t: "match",
    q: "Une cada concepto con su definición.",
    pares: [["Clase", "Plano a partir del cual se crean objetos"],
            ["Objeto", "Instancia concreta creada a partir del molde"],
            ["Constructor", "Inicializa el objeto al crearlo"],
            ["Encapsulamiento", "Ocultar el estado y exponer métodos"]],
    pista: "Piensa en el plano de una bicicleta y en cada bicicleta fabricada con él." },
  { u: 7, t: "vf",
    q: "Java permite que una clase herede de dos clases a la vez.",
    a: false,
    pista: "¿Cuántas clases puede ir después de extends? ¿Qué usa Java para combinar comportamientos?" },
  { u: 7, t: "mc",
    q: "En Java, una clase abstracta…",
    o: ["Se puede instanciar con new como cualquier otra", "No se puede instanciar; solo se puede heredar",
        "No puede tener métodos", "Solo puede tener atributos estáticos"], a: 1,
    pista: "¿Para qué sirve una clase que declara métodos sin implementarlos?" },
  { u: 7, t: "code", lang: "Python",
    code: `class Contador:
    total = 0
    def __init__(self):
        Contador.total += 1

a = Contador()
b = Contador()
print(Contador.total)`,
    q: "¿Qué imprime?",
    o: ["0", "1", "2", "Error"], a: 2,
    pista: "total pertenece a la clase, no a cada objeto. ¿Cuántas veces se ejecutó el constructor?" },

  /* ---------------- UNIDAD 8 ---------------- */
  { u: 8, t: "mc",
    q: "Una función es pura cuando…",
    o: ["Usa lambda", "Devuelve siempre lo mismo con las mismas entradas y no tiene efectos secundarios",
        "No recibe parámetros", "Está escrita en un lenguaje funcional"], a: 1,
    pista: "¿Qué pasaría si la llamas dos veces con los mismos datos?" },
  { u: 8, t: "code", lang: "Python",
    code: `print(list(filter(lambda x: x % 2 == 0, range(7))))`,
    q: "¿Qué imprime?",
    o: ["[2, 4, 6]", "[0, 2, 4, 6]", "[1, 3, 5]", "[0, 2, 4, 6, 8]"], a: 1,
    pista: "¿Desde qué número empieza range(7) y hasta cuál llega?" },
  { u: 8, t: "code", lang: "Python",
    code: `from functools import reduce
print(reduce(lambda a, b: a * b, [1, 2, 3, 4], 1))`,
    q: "¿Qué imprime?",
    o: ["10", "24", "4", "[1, 2, 6, 24]"], a: 1,
    pista: "reduce combina todos los elementos en un solo valor. ¿Qué operación aplica la lambda?" },
  { u: 8, t: "vf",
    q: "Una función que imprime en pantalla no tiene efectos secundarios.",
    a: false,
    pista: "¿Imprimir cambia algo fuera de la función?" },
  { u: 8, t: "code", lang: "Python",
    code: `m = map(lambda x: x * 10, [1, 2, 3])
print(list(m))
print(list(m))`,
    q: "¿Qué imprime?",
    o: ["[10, 20, 30] / [10, 20, 30]", "[10, 20, 30] / []", "[] / []", "Error"], a: 1,
    pista: "En Python 3, map es diferido: ¿se puede recorrer dos veces?" },
  { u: 8, t: "match",
    q: "Une cada herramienta con lo que hace.",
    pares: [["map", "Transforma cada elemento"],
            ["filter", "Se queda con los que cumplen una condición"],
            ["reduce", "Combina todos en un solo valor"],
            ["lambda", "Función anónima de una expresión"]],
    pista: "Piensa en el ejemplo de los precios: filtrar los caros, aplicar descuento, sumar." },
  { u: 8, t: "mc",
    q: "¿Qué lenguaje es puramente funcional y su sistema de tipos infiere los tipos aunque no los escribas?",
    o: ["Python", "JavaScript", "Haskell", "C"], a: 2,
    pista: "Revisa el concepto «Funcional con tipado estático» de la Unidad 8." },
  { u: 8, t: "code", lang: "Java",
    code: `List<Integer> xs = List.of(1, 2, 3, 4);
int r = xs.stream()
          .filter(x -> x > 2)
          .mapToInt(x -> x)
          .sum();
System.out.println(r);`,
    q: "¿Qué imprime?",
    o: ["10", "7", "2", "3"], a: 1,
    pista: "¿Qué elementos pasan el filtro x > 2?" }
];
