/* =========================================================
   Banco del Simulacro del final razonado · Teoría de la Programación
   Partes A a E, 50 pts, con ítems propios.
   La Parte D usa las trazas de lenguajes-inventados.js.
   Cada salida de código se verificó ejecutándola (Python, Java, C).
   ========================================================= */

const PARTES_FINAL = [
  { id: 'A', nombre: 'Selección múltiple razonada', unidades: 'U1 · U3 · U5 · U6', pts: 14, min: 25,
    consigna: 'Elige la única opción correcta. Después, en «Lo decide», nombra el concepto de la materia que explica el resultado y di por qué se aplica a este código. Cada ítem vale 2 pts: opción correcta y justificación completa = 2; opción correcta y justificación incompleta = 1; sin justificación u opción incorrecta = 0.' },
  { id: 'B', nombre: 'Verdadero o falso con justificación', unidades: 'U3 · U4 · U7 · U8', pts: 10, min: 15,
    consigna: 'Decide V o F. Justifica siempre, también cuando es verdadera: si es falsa, explica qué parte falla; si es verdadera, explica por qué se cumple. Cada ítem vale 2 pts.' },
  { id: 'C', nombre: 'Parea fragmento y concepto', unidades: 'U2 · U4 · U5 · U6 · U7 · U8', pts: 6, min: 10,
    consigna: 'Elige la letra del concepto que mejor describe lo que ocurre en cada fragmento. Cada letra se usa una sola vez y sobran dos conceptos. Cada par correcto vale 1 pt.' },
  { id: 'D', nombre: 'Lenguaje inventado: completa la traza', unidades: 'U2 · U3 · U4 · U5 · U6', pts: 12, min: 35,
    consigna: 'Aplica solo las reglas del recuadro, aunque contradigan lo que conoces. Completa la traza (8 pts), explica una diferencia (2 pts) y decide como diseñador (2 pts).' },
  { id: 'E', nombre: 'Completa el código y decide', unidades: 'U2 · U7 · U8', pts: 8, min: 20,
    consigna: 'E1: pasa un bucle a un pipeline funcional (5 pts). E2: reemplaza la selección por tipo con polimorfismo (3 pts).' }
];

/* Conceptos frecuentes para los chips de «Lo decide» */
const CPTO_PASO = ['Paso por compartición de objetos: mutar vs. reasignar', 'Paso por referencia', 'Paso por valor-resultado', 'Alcance dinámico'];

const BANCO_FINAL = {
  /* ---------- PARTE A · 7 casilleros, una variante al azar en cada uno ---------- */
  A: [
    [ /* A1 · Alcance */
      { t: 'razonada', u: [3], titulo: 'Alcance', tema: 'Alcance estático y clausura', lang: 'Python',
        code: `x = "global"

def externa():
    x = "externa"
    def interna():
        return x
    x = "cambiada"
    return interna()

print(externa())`,
        q: '¿Qué imprime?',
        o: [
          { t: '`cambiada`', ok: true, por: 'interna busca x donde fue escrita, en externa; cuando se la llama, esa x ya vale "cambiada".' },
          { t: '`externa`', por: 'La ligadura es la x de externa, pero el valor se lee cuando se llama a interna, y para entonces ya se reasignó.' },
          { t: '`global`', por: 'interna no declara x, pero la busca primero en la función que la rodea (externa), no en las globales.' },
          { t: 'Error: x se usa antes de asignarse', por: 'interna no asigna x, solo la lee: usa la de externa.' }
        ],
        concepto: { o: ['Alcance estático (léxico)', 'Alcance dinámico', 'Tiempo de vida', 'Tipado dinámico'], a: 0 },
        porque: [
          { k: 'completa', t: 'Con alcance estático, interna busca x en el bloque donde fue escrita: externa. Está ligada a esa variable, que después se reasigna a "cambiada"; como interna se ejecuta recién en el return, lee el valor que la variable tiene en ese momento.', fb: 'Dice qué ligadura usa y por qué el valor es el último.' },
          { k: 'incompleta', t: 'Porque interna usa la x de externa y no la global.', fb: 'Dice qué ligadura usa, pero no por qué el valor es "cambiada" y no "externa".' },
          { k: 'error', t: 'Porque Python copia en interna el valor de x cuando se define la función, y actualiza esa copia cada vez que la x de afuera cambia.', fb: 'No hay copia: interna queda ligada a la variable de externa y la lee al ejecutarse.' }
        ],
        modelo: 'Alcance estático: interna no declara x y la busca donde fue escrita, en externa (no en la global). Está ligada a esa variable, no a un valor fijo: al ejecutar `return interna()`, x ya vale "cambiada".' },
      { t: 'razonada', u: [3], titulo: 'Alcance', tema: 'Asignación que vuelve local un nombre', lang: 'Python',
        code: `saldo = 100

def retirar(m):
    if m > saldo:
        return "no alcanza"
    saldo = saldo - m
    return saldo

print(retirar(30))`,
        q: '¿Qué pasa al ejecutarlo?',
        o: [
          { t: 'UnboundLocalError al llegar al `if`', ok: true, por: 'saldo es local en toda la función por la asignación de la línea 6, y en el if todavía no tiene valor.' },
          { t: 'Imprime `70`: resta 30 a la saldo global', por: 'Sería 70 si saldo fuera la global, pero la asignación hace que Python la trate como local en toda la función.' },
          { t: 'Imprime `no alcanza`', por: 'La comparación no llega a hacerse: falla al leer saldo.' },
          { t: 'Imprime `100`', por: 'No se imprime ningún número: el programa termina con un error.' }
        ],
        concepto: { o: ['Alcance: la asignación vuelve local al nombre', 'Tiempo de vida', 'Paso por valor', 'Tipado fuerte'], a: 0 },
        porque: [
          { k: 'completa', t: 'Python decide el alcance de cada nombre al traducir la función: como en retirar hay una asignación a saldo, saldo es local en toda la función, también en el if. Al llegar al if esa local todavía no tiene valor. Con `global saldo` usaría la de afuera.', fb: 'Explica cuándo se decide el alcance y por qué afecta también al if.' },
          { k: 'incompleta', t: 'Porque saldo no está definida dentro de la función.', fb: 'Está definida afuera. Falta explicar por qué Python no usa esa.' },
          { k: 'error', t: 'Porque las funciones de Python no pueden leer variables globales; solo pueden usar sus parámetros.', fb: 'Sí pueden leerlas si no las asignan. El problema es la asignación de la línea 6.' }
        ],
        modelo: 'Alcance: como retirar asigna saldo, Python la liga como local en toda la función (decisión tomada antes de ejecutar). En el if se lee esa local sin valor: UnboundLocalError. La global no se usa.' }
    ],
    [ /* A2 · Cortocircuito */
      { t: 'razonada', u: [5], titulo: 'Cortocircuito', tema: 'Precedencia de and/or y cortocircuito', lang: 'Python',
        code: `def p(x):
    print(x, end=" ")
    return x

r = p(3) or p(4) and p(0)
print(r)`,
        q: '¿Qué se ve en pantalla? (`end=" "` deja todo en la misma línea)',
        o: [
          { t: '`3 3`', ok: true, por: 'p(3) es verdadero y el or ya está decidido: el lado derecho no se evalúa.' },
          { t: '`3 4 0 0`', por: 'Eso sería sin cortocircuito y agrupando (p(3) or p(4)) and p(0).' },
          { t: '`3 4 0 3`', por: 'Si se hubiera llamado a p(4) y p(0), se verían; pero el or se decide con el 3.' },
          { t: '`3 True`', por: 'or y and devuelven uno de sus operandos, no True o False.' }
        ],
        concepto: { o: ['Precedencia de and sobre or + cortocircuito', 'Evaluación perezosa de map', 'Asociatividad por derecha', 'Conversión implícita'], a: 0 },
        porque: [
          { k: 'completa', t: 'and tiene más precedencia que or: la expresión es `p(3) or (p(4) and p(0))`. Python evalúa el or de izquierda a derecha con cortocircuito: p(3) imprime 3 y devuelve 3, que es verdadero, así que el lado derecho no se evalúa y r vale 3.', fb: 'Combina precedencia (cómo se agrupa) y cortocircuito (qué se ejecuta).' },
          { k: 'incompleta', t: 'Primero se llama a p(3), que imprime 3 en la pantalla y devuelve 3. Después de eso ya no se llama a p(4) ni a p(0), y r queda valiendo 3, así que la última línea imprime otro 3 y en la pantalla se ve 3 3, todo en la misma línea por el end.', fb: 'Narra lo que hace el código, pero no nombra el concepto ni explica por qué pasa. Contar la traza no alcanza: es una justificación incompleta.' },
          { k: 'error', t: 'Porque Python evalúa primero el and, que tiene más precedencia, y después el or elige el 3.', fb: 'Precedencia no es orden de ejecución: decide cómo se agrupa. Si se evaluara el and primero, se verían 4 y 0.' }
        ],
        modelo: 'Precedencia: and agrupa primero, queda `p(3) or (p(4) and p(0))`. Cortocircuito: p(3) imprime 3 y es verdadero; el or ya está decidido y no se evalúa el lado derecho. r = 3: se ve «3 3».' },
      { t: 'razonada', u: [5], titulo: 'Cortocircuito', tema: 'Cortocircuito como guarda', lang: 'Python',
        code: `d = {"ana": 3}
nombre = "luis"

if nombre in d and d[nombre] > 2:
    print("frecuente")
else:
    print("nuevo")

print(d.get(nombre, 0) or "sin compras")`,
        q: '¿Qué imprime?',
        o: [
          { t: '`nuevo` y `sin compras`', ok: true, por: 'and corta antes de d["luis"], y or devuelve su segundo operando porque 0 es falso.' },
          { t: 'KeyError: el programa se detiene en la línea del if', por: 'd["luis"] no llega a evaluarse: como `"luis" in d` es falso, and corta.' },
          { t: '`nuevo` y `0`', por: 'd.get devuelve 0, que es falso: or devuelve el segundo operando.' },
          { t: '`frecuente` y `3`', por: '"luis" no está en d.' }
        ],
        concepto: { o: ['Cortocircuito usado como guarda', 'Excepción capturada', 'Tipado dinámico', 'Sobrecarga'], a: 0 },
        porque: [
          { k: 'completa', t: '`nombre in d` es falso, y and con cortocircuito no evalúa `d[nombre]`: funciona como una guarda que evita el KeyError, y se imprime «nuevo». En la última línea, get devuelve 0, que es falso, y or devuelve su segundo operando: «sin compras».', fb: 'Explica las dos líneas con el mismo concepto.' },
          { k: 'incompleta', t: 'Porque luis no está en el diccionario.', fb: 'Explica «nuevo», pero no por qué no hay KeyError ni por qué or da «sin compras».' },
          { k: 'error', t: 'Porque Python captura el KeyError automáticamente dentro de la condición de un if y, cuando la condición falla por un error, ejecuta el else. Después, get devuelve 0 y Python convierte ese 0 en un texto vacío, por eso or termina devolviendo "sin compras".', fb: 'No hay ningún error que capturar: el cortocircuito impide que d["luis"] se evalúe.' }
        ],
        modelo: 'Cortocircuito: `"luis" in d` es falso y and no evalúa `d["luis"]` (guarda): «nuevo». `d.get(...)` da 0, falso, y or devuelve el segundo operando: «sin compras».' }
    ],
    [ /* A3 · Paso de parámetros en Python */
      { t: 'razonada', u: [6], titulo: 'Paso de parámetros en Python', tema: 'Compartición: + crea otra lista', lang: 'Python',
        code: `def registrar(nota, historial):
    historial = historial + [nota]
    nota = nota + 1
    return historial

h = [7]
n = 8
nuevo = registrar(n, h)
print(h, n, nuevo)`,
        q: '¿Qué imprime?',
        o: [
          { t: '`[7] 8 [7, 8]`', ok: true, por: '`+` crea una lista nueva y religa el parámetro; h no cambia. La lista nueva vuelve con return.' },
          { t: '`[7, 8] 9 [7, 8]`', por: 'n es un entero: `nota = nota + 1` religa el parámetro, no cambia n.' },
          { t: '`[7, 8] 8 [7, 8]`', por: '`historial + [nota]` crea otra lista: h no se modifica (sí cambiaría con append o +=).' },
          { t: '`[7] 9 [7, 8]`', por: 'n no cambia: el parámetro nota es otra ligadura.' }
        ],
        concepto: { o: CPTO_PASO, a: 0 },
        porque: [
          { k: 'completa', t: 'Python pasa a cada parámetro una referencia al mismo objeto. `historial + [nota]` no modifica la lista: crea una nueva y religa el parámetro, así que h sigue en [7]. `nota = nota + 1` también religa solo el parámetro. La lista nueva vuelve por el return.', fb: 'Distingue modificar el objeto de religar el nombre.' },
          { k: 'incompleta', t: 'Se llama a registrar con el 8 y con la lista [7]. Adentro, historial pasa a ser [7, 8] y nota pasa a ser 9, y la función devuelve historial. Afuera, h sigue mostrando [7], n sigue mostrando 8 y nuevo muestra [7, 8], que es justo lo que devolvió la función.', fb: 'Narra lo que hace el código, pero no nombra el concepto ni explica por qué pasa. Contar la traza no alcanza: es una justificación incompleta.' },
          { k: 'error', t: 'Porque Python pasa las listas por valor: la función recibe una copia de h.', fb: 'No hay copia: historial apunta a la misma lista que h. Con append, h cambiaría.' }
        ],
        modelo: 'Compartición de objetos: historial apunta a la misma lista que h, pero `historial + [nota]` crea otra lista y religa el parámetro (reasignar, no mutar): h = [7]. nota es otra ligadura del 8: n = 8. Se devuelve la lista nueva: [7, 8].' },
      { t: 'razonada', u: [6], titulo: 'Paso de parámetros en Python', tema: 'Compartición: mutar y después reasignar', lang: 'Python',
        code: `def limpiar(lista):
    lista.clear()
    lista = [1, 2]
    lista.append(3)

datos = [9, 9]
limpiar(datos)
print(datos)`,
        q: '¿Qué imprime?',
        o: [
          { t: '`[]`', ok: true, por: 'clear() vacía el objeto compartido; después el parámetro se religa a otra lista.' },
          { t: '`[1, 2, 3]`', por: '`lista = [1, 2]` religa el parámetro: el append va a esa lista nueva, no a datos.' },
          { t: '`[9, 9]`', por: 'clear() modifica el objeto que se pasó: datos queda vacía.' },
          { t: '`[1, 2]`', por: 'Ni [1, 2] ni [1, 2, 3] llegan a datos.' }
        ],
        concepto: { o: CPTO_PASO, a: 0 },
        porque: [
          { k: 'completa', t: 'lista y datos apuntan al mismo objeto: clear() lo modifica y datos queda vacía. Después `lista = [1, 2]` religa solo el parámetro a una lista nueva, así que el append ya no afecta a datos.', fb: 'Separa el momento en que se muta del momento en que se reasigna.' },
          { k: 'incompleta', t: 'Porque clear() vacía la lista.', fb: 'Explica la mitad: falta por qué [1, 2, 3] no llega a datos.' },
          { k: 'error', t: 'Porque Python pasa las listas por referencia: lista es otro nombre de datos, así que clear() la vacía, y como después lista = [1, 2] crea una variable local nueva con el mismo nombre, el append se hace sobre esa local y datos queda vacía.', fb: 'Si lista fuera un alias de datos, `lista = [1, 2]` también cambiaría datos. En Python asignar al parámetro solo cambia el parámetro.' }
        ],
        modelo: 'Compartición: lista apunta a la lista de datos; clear() la muta → []. `lista = [1, 2]` religa el parámetro a otro objeto (reasignar); el append afecta solo a esa lista nueva. datos = [].' }
    ],
    [ /* A4 · Mecanismos de paso */
      { t: 'razonada', u: [6], titulo: 'Paso por referencia', tema: 'Alias con una global', lang: 'Pseudocódigo TPR',
        ctx: 'El parámetro `a` se pasa **por referencia**: es otro nombre de la variable que se pasó al llamar.',
        code: `var g ← 1

procedimiento p(a)
    a ← a + 10
    escribir(g)
fin

p(g)`,
        q: '¿Qué se escribe?',
        o: [
          { t: '`11`', ok: true, por: 'a y g son la misma variable: cuando se escribe g, ya cambió.' },
          { t: '`1`', por: 'Sería 1 con paso por valor: a sería una copia.' },
          { t: '`10`', por: 'a vale lo mismo que g (1) antes de sumar: 1 + 10 = 11.' },
          { t: '`21`', por: 'Se suma una sola vez: a y g no son dos variables que se suman.' }
        ],
        concepto: { o: ['Alias por paso por referencia', 'Paso por valor', 'Alcance dinámico', 'Variable local'], a: 0 },
        porque: [
          { k: 'completa', t: 'Por referencia, a es otro nombre de g (alias): `a ← a + 10` cambia la misma variable, así que cuando el procedimiento escribe g, g ya vale 11, aunque nunca se la asignó con ese nombre.', fb: 'Explica por qué escribir(g) ve el cambio hecho a través de a.' },
          { k: 'incompleta', t: 'Porque a se pasa por referencia.', fb: 'Nombra el mecanismo, pero no explica por qué escribir(g) ve el cambio.' },
          { k: 'error', t: 'Porque g es global, y un procedimiento siempre modifica las variables globales que usa.', fb: 'p no asigna g con ese nombre: la cambia a través de a, por el alias. Con paso por valor, g seguiría en 1.' }
        ],
        modelo: 'Paso por referencia: a es alias de g. `a ← a + 10` deja la variable en 11; escribir(g) muestra 11.' },
      { t: 'razonada', u: [6], titulo: 'Paso de parámetros en C', tema: 'C: valor y punteros', lang: 'C',
        code: `void doble(int *p, int q) {
    *p = *p * 2;
    q = q * 2;
}

int a = 3, b = 3;
doble(&a, b);
printf("%d %d", a, b);`,
        q: '¿Qué imprime?',
        o: [
          { t: '`6 3`', ok: true, por: 'Con *p se escribe en la dirección de a; q es una copia de b.' },
          { t: '`6 6`', por: 'q es una copia de b: duplicarla no cambia b.' },
          { t: '`3 3`', por: '*p escribe en la dirección de a: a cambia.' },
          { t: '`3 6`', por: 'Está al revés: el que se pasa con & es a.' }
        ],
        concepto: { o: ['C pasa todo por valor; el puntero simula la referencia', 'Paso por referencia nativo de C', 'Compartición de objetos', 'Tipado débil'], a: 0 },
        porque: [
          { k: 'completa', t: 'C pasa todo por valor: p recibe una copia de la dirección de a, y q una copia del valor de b. Con `*p` se escribe en esa dirección, así que a cambia a 6; q es solo una copia y b sigue en 3.', fb: 'Explica qué se copia en cada parámetro y qué hace *p.' },
          { k: 'incompleta', t: 'Porque a se pasa con & y b no.', fb: 'Señala la diferencia, pero no explica qué hace & ni por qué q no afecta a b.' },
          { k: 'error', t: 'Porque C pasa los int por referencia cuando se usa un puntero en la función, y el compilador decide cuál cambiar.', fb: 'C no tiene paso por referencia: siempre copia. En p se copia una dirección.' }
        ],
        modelo: 'C pasa por valor. p recibe una copia de &a (una dirección): `*p = *p * 2` cambia a → 6. q recibe una copia de b: q * 2 no afecta a b → 3.' }
    ],
    [ /* A5 · Momento de ligadura */
      { t: 'razonada', u: [3], titulo: 'Momento de ligadura', tema: 'Ligadura en traducción', lang: 'C',
        code: `#define MAX 100
int v[MAX];`,
        q: '¿En qué momento se liga el tamaño del arreglo v?',
        o: [
          { t: 'En la traducción (preprocesador y compilador)', ok: true, por: 'El tamaño queda decidido antes de ejecutar y no cambia durante la ejecución.' },
          { t: 'En la ejecución, cuando el programa llega a la declaración de v', por: 'En C, el tamaño de un arreglo como este tiene que conocerse al compilar.' },
          { t: 'En el diseño del lenguaje', por: 'El lenguaje define que existen los arreglos, pero el tamaño de este v lo eligió el programador.' },
          { t: 'En la carga del programa en memoria', por: 'En la carga se ubica en memoria, pero el tamaño ya estaba decidido.' }
        ],
        concepto: { o: ['Momento de ligadura (estática, en la traducción)', 'Tipado dinámico', 'Alcance dinámico', 'Evaluación perezosa'], a: 0 },
        porque: [
          { k: 'completa', t: 'Es una ligadura estática: el preprocesador reemplaza MAX por 100 y el compilador fija el tamaño de v antes de que el programa corra; durante la ejecución ese tamaño ya no puede cambiar.', fb: 'Dice quién fija el atributo, cuándo, y qué implica.' },
          { k: 'incompleta', t: 'Arriba dice que MAX es 100 y abajo se crea el arreglo v con MAX posiciones, así que v tiene 100 posiciones desde el principio y no se puede cambiar después, porque así quedó escrito en el código del programa.', fb: 'Describe el resultado, pero no dice en qué momento se liga el tamaño ni quién lo fija.' },
          { k: 'error', t: 'Porque en C todas las ligaduras ocurren al compilar, también los valores de las variables.', fb: 'No todas: el valor de una variable se liga en la ejecución, cada vez que se asigna.' }
        ],
        modelo: 'Ligadura estática en la traducción: el preprocesador reemplaza MAX y el compilador fija el tamaño de v (100). No puede cambiar al ejecutar.' },
      { t: 'razonada', u: [3], titulo: 'Momento de ligadura', tema: 'Nombre ligado en ejecución', lang: 'Python',
        code: `def f():
    return 1

def g():
    return f()

def f():
    return 2

print(g())`,
        q: '¿Qué imprime y por qué?',
        o: [
          { t: '`2`, porque el nombre f se busca cuando g se ejecuta', ok: true, por: 'Al ejecutar `return f()`, f ya está ligada a la segunda versión.' },
          { t: '`1`, porque g quedó ligada a la primera f cuando se definió', por: 'Python no liga el nombre f al definir g; lo busca al ejecutar `return f()`.' },
          { t: 'Error: no se puede definir f dos veces', por: 'def es una asignación de nombre: la segunda religa f.' },
          { t: '`1` y después `2`', por: 'Se llama a g una sola vez: se imprime un solo valor.' }
        ],
        concepto: { o: ['Ligadura del nombre en ejecución', 'Sobrecarga', 'Sobrescritura (herencia)', 'Tiempo de vida'], a: 0 },
        porque: [
          { k: 'completa', t: 'En Python, `def` liga el nombre f a una función cuando se ejecuta esa línea; la segunda `def f` religa f a otra función. g busca f recién cuando se ejecuta `return f()`, y en ese momento f ya está ligada a la versión que devuelve 2.', fb: 'Ubica cuándo se liga f y cuándo la busca g.' },
          { k: 'incompleta', t: 'Porque la segunda f reemplaza a la primera.', fb: 'Correcto, pero falta por qué g ve la nueva: el nombre se busca al ejecutar g, no al definirla.' },
          { k: 'error', t: 'Porque Python hace sobrecarga de funciones como Java: guarda las dos versiones de f y, cuando g la llama sin argumentos, elige automáticamente la última que se definió, que es la que devuelve 2; la primera sigue existiendo, pero no se usa.', fb: 'No es sobrecarga: no conviven dos f. Hay un solo nombre, religado a otra función.' }
        ],
        modelo: 'Ligadura en ejecución: cada `def` liga el nombre f cuando se ejecuta. g resuelve f al ejecutarse, cuando ya está ligada a la segunda versión: 2.' }
    ],
    [ /* A6 · Guarda y excepción */
      { t: 'razonada', u: [5], titulo: 'Guarda y excepción', tema: 'Propagación de excepciones', lang: 'Python',
        code: `def convertir(t):
    return int(t)

def leer(t):
    if t.strip() == "":
        return 0
    return convertir(t)

def total(textos):
    s = 0
    for t in textos:
        try:
            s = s + leer(t)
        except ValueError:
            s = s - 1
    return s

print(total(["4", " ", "dos", "3"]))`,
        q: '¿Qué imprime?',
        o: [
          { t: '`6`', ok: true, por: '4 + 0 − 1 + 3: la guarda frena el texto vacío y el except atrapa "dos".' },
          { t: '`7`', por: 'Sería 7 si "dos" sumara 0; pero int("dos") lanza ValueError y el except resta 1.' },
          { t: 'ValueError: el programa se detiene en "dos"', por: 'La excepción sale de convertir y de leer, pero total la captura.' },
          { t: '`4`', por: 'El for sigue después del except: también se suma el 3.' }
        ],
        concepto: { o: ['Propagación de excepciones + guarda', 'Cortocircuito', 'Paso por referencia', 'Evaluación perezosa'], a: 0 },
        porque: [
          { k: 'completa', t: '" " no llega a int: la guarda de leer devuelve 0. "dos" sí llega: int lanza ValueError en convertir; la excepción se propaga a leer, que no la captura, y de ahí a total, donde el except resta 1. Después el for sigue con "3": 4 + 0 − 1 + 3 = 6.', fb: 'Sigue cada texto y dice dónde se captura el error.' },
          { k: 'incompleta', t: 'Porque "dos" da ValueError y se captura.', fb: 'Falta la guarda del texto vacío y en qué función se captura.' },
          { k: 'error', t: 'Porque convertir captura el error de "dos" y devuelve −1.', fb: 'convertir no tiene try: el error sube por leer hasta total.' }
        ],
        modelo: 'Guarda: leer evita convertir " " (devuelve 0). Excepción: int("dos") lanza ValueError, que se propaga convertir → leer → total; el except resta 1 y el for continúa. 4 + 0 − 1 + 3 = 6.' },
      { t: 'razonada', u: [5], titulo: 'Guarda o excepción', tema: 'Elegir guarda o try/except', lang: '',
        ctx: 'Una app de colectivos muestra el saldo de la tarjeta consultando un servidor que a veces no responde o tarda demasiado.',
        q: '¿Qué conviene para la consulta al servidor?',
        o: [
          { t: 'Un try/except alrededor de la consulta', ok: true, por: 'La condición (que el servidor responda) no la controla el programa y puede cambiar entre verificar y usar.' },
          { t: 'Una guarda: `if servidor_disponible():` antes de consultar', por: 'El servidor puede caerse justo después de la verificación: la guarda no garantiza nada.' },
          { t: 'Nada: si el servidor falla, que la app se cierre', por: 'Eso afecta la confiabilidad: el usuario pierde la app por una falla esperable.' },
          { t: 'Una guarda que verifique que el saldo sea mayor que 0', por: 'Eso valida el dato, pero no el problema: que la consulta falle.' }
        ],
        concepto: { o: ['Excepción: condición que el programa no controla', 'Guarda: condición que el programa controla', 'Cortocircuito', 'Tipado estático'], a: 0 },
        porque: [
          { k: 'completa', t: 'Conviene try/except porque la falla depende de algo externo que el programa no controla: aunque se verifique antes que el servidor responde, puede caerse un instante después. La guarda sirve cuando el programa controla la condición, como un valor elegido en un menú cerrado.', fb: 'Aplica el criterio de clase: quién controla la condición.' },
          { k: 'incompleta', t: 'Porque el servidor puede fallar.', fb: 'Falta el criterio: quién controla la condición y por qué una guarda no alcanza.' },
          { k: 'error', t: 'Porque try/except es más rápido que un if: el programa no pierde tiempo verificando antes, y si algo falla el except lo resuelve después. Por eso conviene usarlo siempre, también para revisar los datos que el usuario elige de un menú cerrado, y así todo el código queda escrito de la misma manera.', fb: 'No es una cuestión de velocidad, y no conviene siempre: con condiciones que controla el programa, la guarda es más clara.' }
        ],
        modelo: 'try/except: la condición (respuesta del servidor) la controla otro sistema y puede cambiar entre verificar y usar; una guarda no lo evita. La guarda es para condiciones que controla el programa.' }
    ],
    [ /* A7 · Paradigma */
      { t: 'razonada', u: [1], titulo: 'Paradigma', tema: 'Elegir paradigma: POO', lang: '',
        ctx: 'Una biblioteca municipal necesita un sistema con socios, libros, revistas y tesis. Cada tipo de material calcula distinto su plazo de préstamo, y cada año se agregan tipos nuevos (audiolibros, mapas).',
        q: '¿Qué paradigma modela mejor esta parte del sistema?',
        o: [
          { t: 'Orientado a objetos', ok: true, por: 'Entidades con datos y comportamiento propio, y tipos que se agregan: clases con un método plazo() sobrescrito.' },
          { t: 'Lógico', por: 'No se trata de deducir a partir de reglas, sino de entidades con comportamiento distinto.' },
          { t: 'Funcional', por: 'Sirve para transformar datos, pero aquí cada material tiene estado (prestado, disponible) y comportamiento propio.' },
          { t: 'Imperativo', por: 'Funcionaría, pero cada tipo nuevo obligaría a tocar un if por tipo.' }
        ],
        concepto: { o: ['Polimorfismo y extensibilidad', 'Transparencia referencial', 'Hechos y reglas', 'Cortocircuito'], a: 0 },
        porque: [
          { k: 'completa', t: 'Socios y materiales son entidades con datos y comportamiento; cada tipo de material puede ser una subclase que redefine plazo(), y agregar audiolibros es escribir una clase nueva sin modificar las existentes: extensibilidad por polimorfismo.', fb: 'Conecta el modelo de cómputo con lo que pide el problema.' },
          { k: 'incompleta', t: 'Porque el sistema tiene socios, libros, revistas y tesis, y cada uno tiene su propio plazo de préstamo. Además cada año se agregan materiales nuevos, como audiolibros y mapas, y todo eso se tiene que poder representar en el sistema de la biblioteca para que funcione bien.', fb: 'Describe el problema, pero no dice qué tiene la POO que encaje con él (comportamiento por tipo, polimorfismo, extensibilidad).' },
          { k: 'error', t: 'Porque la POO es el paradigma más moderno y el que más se usa en las empresas.', fb: 'Es un argumento de popularidad, no de modelo de cómputo. No conecta con el problema.' }
        ],
        modelo: 'POO: cada material es un objeto con estado y comportamiento; una jerarquía Material con plazo() redefinido en cada subclase. Agregar audiolibros = una clase nueva, sin tocar las demás (polimorfismo, extensibilidad).' },
      { t: 'razonada', u: [1, 8], titulo: 'Paradigma', tema: 'Elegir paradigma: funcional', lang: '',
        ctx: 'Cada noche, una distribuidora de energía procesa millones de lecturas de medidores: descartar las inválidas, convertir unidades y sumar el consumo por barrio. Los datos originales no se pueden modificar y el trabajo se reparte entre varios servidores.',
        q: '¿Qué paradigma modela mejor este proceso?',
        o: [
          { t: 'Funcional', ok: true, por: 'Una cadena de transformaciones sin modificar los datos: filter, map, reduce.' },
          { t: 'Lógico', por: 'No hay reglas para deducir: es una cadena de transformaciones.' },
          { t: 'Orientado a objetos', por: 'Se podría, pero no hay entidades con comportamiento propio: hay datos que pasan por transformaciones.' },
          { t: 'Imperativo', por: 'Un bucle con acumulador modifica estado compartido: complica repartir el trabajo.' }
        ],
        concepto: { o: ['Funciones puras y de orden superior', 'Herencia', 'Alcance dinámico', 'Guarda'], a: 0 },
        porque: [
          { k: 'completa', t: 'El proceso es una cadena filter (descartar inválidas) → map (convertir) → reduce (sumar por barrio). Con funciones puras no se modifica el dato original, y como no hay estado compartido cada servidor procesa su parte sin interferir con los otros.', fb: 'Conecta cada paso del proceso con una herramienta y explica la ventaja de no mutar.' },
          { k: 'incompleta', t: 'Porque hay que procesar muchos datos.', fb: 'La cantidad no decide el paradigma: falta la cadena de transformaciones y la ausencia de estado mutable.' },
          { k: 'error', t: 'Porque el paradigma funcional es el único que permite trabajar con listas tan grandes y repartirlas entre varios servidores: los otros paradigmas guardan todos los datos en una sola variable global y por eso no pueden procesar millones de lecturas ni dividir el trabajo.', fb: 'Todos los paradigmas usan listas. Lo que aporta el funcional es transformar sin mutar.' }
        ],
        modelo: 'Funcional: filter (inválidas) → map (unidades) → reduce (suma por barrio). Funciones puras: no se toca el dato original y, sin estado compartido, el trabajo se reparte sin conflictos.' }
    ]
  ],

  /* ---------- PARTE B · 5 casilleros ---------- */
  B: [
    [
      { t: 'vf', u: [4], titulo: 'Tipos en C', tema: 'Conversión implícita en C', lang: 'C',
        q: 'En C, `printf("%d", \'a\' + 1);` imprime `b`, porque C convierte el resultado a carácter.', a: false,
        porque: [
          { k: 'completa', t: 'Falsa. C promueve el char \'a\' a entero (97) y suma: 98. Con %d se imprime el número 98, no el carácter. Es tipado débil (mezcla char e int sin avisar), pero el resultado es un entero.', fb: 'Explica qué conversión ocurre y qué decide el formato.' },
          { k: 'incompleta', t: 'Falsa: lo que aparece en la pantalla no es la letra b sino un número, el 98, que es lo que da esa suma, y printf lo muestra así por el %d. La afirmación dice que imprime b y eso no es lo que pasa.', fb: 'Describe lo que pasa, pero no nombra el concepto ni explica el mecanismo: es una justificación incompleta.' },
          { k: 'error', t: 'Falsa, porque C no deja sumar un carácter con un número: da error de compilación.', fb: 'C sí lo deja, sin avisar: por eso se dice que es débil.' }
        ],
        modelo: 'Falsa: \'a\' se promueve a int (97), la suma da 98 y %d muestra 98. Con %c se vería b.' },
      { t: 'vf', u: [4], titulo: 'Tipos en Python', tema: 'Dinámico no es débil', lang: 'Python',
        q: 'Que Python acepte `x = 5` y después `x = "cinco"` en la misma variable muestra que Python tiene tipado débil.', a: false,
        porque: [
          { k: 'completa', t: 'Falsa. Eso muestra tipado dinámico: el tipo está ligado al valor, no a la variable, y la variable se puede religar a un valor de otro tipo. Fuerte o débil es otra cosa: Python no convierte en silencio (`"5" + 5` da TypeError), por eso es fuerte.', fb: 'Separa los dos ejes y da evidencia de cada uno.' },
          { k: 'incompleta', t: 'Falsa: eso es tipado dinámico.', fb: 'Nombra el concepto correcto, pero no explica por qué no es débil ni da evidencia.' },
          { k: 'error', t: 'Falsa, porque Python tiene tipado estático: decide el tipo de x en la primera asignación, y cuando después se le asigna un texto, convierte automáticamente el valor nuevo al tipo que ya tenía x. Por eso no da error, y por eso no se puede decir que sea débil.', fb: 'Si fuera estático, `x = "cinco"` daría error. Python verifica tipos al ejecutar.' }
        ],
        modelo: 'Falsa: muestra tipado dinámico (la variable se religa a un valor de otro tipo). Python es fuerte: `"5" + 5` da TypeError en vez de convertir.' }
    ],
    [
      { t: 'vf', u: [7], titulo: 'Ligadura dinámica', tema: 'Sobrescritura y tipo declarado', lang: 'Java',
        q: 'En Java, con `Animal a = new Perro();` y Perro redefiniendo `sonido()` con @Override, `a.sonido()` ejecuta la versión de Animal, porque a se declaró como Animal.', a: false,
        porque: [
          { k: 'completa', t: 'Falsa. El tipo declarado (Animal) solo decide, al compilar, qué métodos se pueden llamar. Qué versión se ejecuta lo decide la ligadura dinámica, durante la ejecución, según el objeto real: es un Perro, así que se ejecuta el sonido() de Perro.', fb: 'Distingue qué decide el tipo declarado y qué decide el objeto real.' },
          { k: 'incompleta', t: 'Falsa: a se declaró como Animal, pero se creó con new Perro(), y como Perro tiene su propio sonido() con @Override, al llamar a.sonido() lo que se ejecuta es el sonido() que está escrito en Perro y no el que está escrito en Animal, que es la clase con la que se declaró la variable.', fb: 'Describe bien qué se ejecuta, pero no nombra el mecanismo (ligadura dinámica) ni el momento (ejecución).' },
          { k: 'error', t: 'Falsa, porque Java tiene tipado dinámico y por eso el tipo de a cambia a Perro.', fb: 'Java tiene tipado estático: el tipo de a sigue siendo Animal. Lo dinámico es la ligadura del método.' }
        ],
        modelo: 'Falsa: sobrescritura con ligadura dinámica. El tipo declarado permite la llamada; la versión la elige el objeto real (Perro) en ejecución.' },
      { t: 'vf', u: [7], titulo: 'Sobrecarga', tema: 'Python no sobrecarga por tipos', lang: 'Python',
        q: 'En Python, si una clase define dos métodos con el mismo nombre y distintos parámetros, el segundo reemplaza al primero: Python no tiene sobrecarga por tipos como Java.', a: true,
        porque: [
          { k: 'completa', t: 'Verdadera. En Python `def` liga un nombre a una función; dentro de la clase, el segundo `def` religa el mismo nombre y el primero se pierde. Java, en cambio, distingue métodos por su firma y elige al compilar (sobrecarga).', fb: 'Explica el mecanismo y contrasta con Java.' },
          { k: 'incompleta', t: 'Verdadera, porque Python no tiene sobrecarga.', fb: 'Repite la afirmación: falta el porqué (se religa el nombre).' },
          { k: 'error', t: 'Verdadera, porque Python elige entre los dos métodos según el tipo del argumento, pero recién al ejecutar y no al compilar como Java; si el tipo no coincide con el segundo método, vuelve a buscar el primero, así que en la práctica parece que lo reemplaza.', fb: 'Eso sería sobrecarga dinámica, y no existe: queda un solo método, el último.' }
        ],
        modelo: 'Verdadera: el segundo def religa el nombre y queda un solo método. Java guarda los dos y elige por firma al compilar.' }
    ],
    [
      { t: 'vf', u: [7], titulo: 'Herencia o composición', tema: 'Es un / tiene un', lang: '',
        q: '`class Auto(Motor)` es un buen diseño si el auto necesita `arrancar()`, porque así reutiliza el código del motor.', a: false,
        porque: [
          { k: 'completa', t: 'Falsa. La herencia es para «es un»: un auto no es un motor, tiene un motor. Con composición (el auto tiene un atributo motor y le delega arrancar()) se reutiliza igual, sin que Auto herede métodos de Motor que no le corresponden.', fb: 'Aplica la prueba y propone la alternativa.' },
          { k: 'incompleta', t: 'Falsa, porque un auto no es un motor.', fb: 'Aplica la prueba, pero no propone la alternativa ni el problema de heredar.' },
          { k: 'error', t: 'Falsa, porque en Python y Java una clase solo puede heredar de clases abstractas.', fb: 'Puede heredar de clases concretas. El problema es la relación, no el tipo de clase.' }
        ],
        modelo: 'Falsa: un auto «tiene un» motor. Composición: `self.motor = Motor()` y arrancar() delega en el motor.' },
      { t: 'vf', u: [7], titulo: 'Herencia e invariante', tema: 'Sustitución e invariante', lang: '',
        q: 'Si `Cuadrado` hereda de `Rectangulo`, que tiene `cambiar_ancho(w)` sin tocar el alto, un cuadrado puede terminar con lados distintos: la herencia rompe la invariante del cuadrado.', a: true,
        porque: [
          { k: 'completa', t: 'Verdadera. Cuadrado hereda cambiar_ancho y lo puede usar cualquier código que espera un Rectangulo: cambia el ancho, deja el alto, y el cuadrado deja de tener lados iguales. Pasa la prueba «es un», pero no la de sustitución.', fb: 'Muestra cómo se rompe la invariante y nombra la prueba que falla.' },
          { k: 'incompleta', t: 'Verdadera, porque un cuadrado tiene los lados iguales.', fb: 'Dice la invariante, pero no cómo la rompe la herencia.' },
          { k: 'error', t: 'Verdadera, porque una subclase nunca puede redefinir los métodos de la superclase: Cuadrado está obligado a usar cambiar_ancho tal como está escrito en Rectangulo, y como ese método no toca el alto, el cuadrado queda con lados distintos sin que se pueda corregir.', fb: 'Sí puede (sobrescritura). Aunque Cuadrado redefiniera cambiar_ancho, quien espera un Rectangulo se sorprendería: ese es el problema.' }
        ],
        modelo: 'Verdadera: cambiar_ancho heredado deja ancho ≠ alto. Se rompe la invariante «lados iguales»: «es un» se cumple, la sustitución no.' }
    ],
    [
      { t: 'vf', u: [8], titulo: 'Pureza', tema: 'Pura con argumento mutable', lang: 'Python',
        q: '`def con_iva(precios): return [p * 1.1 for p in precios]` es una función pura aunque reciba una lista, que es mutable.', a: true,
        porque: [
          { k: 'completa', t: 'Verdadera. No modifica la lista recibida: crea una lista nueva con los resultados. Con la misma lista de entrada devuelve siempre lo mismo y no tiene efectos secundarios. Que el argumento sea mutable no la hace impura; lo haría modificarlo.', fb: 'Aplica los dos criterios de pureza al código.' },
          { k: 'incompleta', t: 'Verdadera, porque no tiene efectos secundarios.', fb: 'Falta mostrar por qué: crea una lista nueva en vez de modificar la recibida.' },
          { k: 'error', t: 'Verdadera, porque las listas por comprensión hacen una copia de la lista original antes de recorrerla.', fb: 'No hay una copia previa: recorre la original sin modificarla y construye otra.' }
        ],
        modelo: 'Verdadera: misma entrada → misma salida, y no muta precios (construye una lista nueva). Lo mutable es el tipo, no lo que la función le hace.' },
      { t: 'vf', u: [8], titulo: 'Pureza y recursión', tema: 'Recursión y pureza', lang: '',
        q: 'Una función recursiva no puede ser pura, porque se llama a sí misma muchas veces.', a: false,
        porque: [
          { k: 'completa', t: 'Falsa. La pureza depende de que devuelva siempre lo mismo con las mismas entradas y no tenga efectos secundarios. `def fact(n): return 1 if n == 0 else n * fact(n - 1)` es recursiva y pura: cada llamada solo usa su parámetro y no cambia nada afuera.', fb: 'Usa el criterio de pureza y da un ejemplo.' },
          { k: 'incompleta', t: 'Falsa, porque la recursión no es un efecto secundario.', fb: 'Va bien, pero falta el criterio de pureza y un ejemplo.' },
          { k: 'error', t: 'Falsa, porque todas las funciones recursivas son puras: como se llaman a sí mismas, el resultado depende solo de los parámetros de cada llamada, y no pueden imprimir ni modificar variables globales, porque eso rompería la recursión en la llamada siguiente.', fb: 'Tampoco: una recursiva que imprime o modifica una global es impura. La recursión no decide la pureza.' }
        ],
        modelo: 'Falsa: la pureza es «misma entrada, misma salida, sin efectos». fact(n) recursiva cumple las dos cosas.' }
    ],
    [
      { t: 'vf', u: [3, 8], titulo: 'Alcance y tiempo de vida', tema: 'Clausura: vida más larga que el alcance', lang: 'Python',
        q: 'En este código, la variable n sigue existiendo después de que contador terminó, aunque desde afuera ya no se puede nombrar.',
        code: `def contador():
    n = 0
    def inc():
        nonlocal n
        n += 1
        return n
    return inc`, a: true,
        porque: [
          { k: 'completa', t: 'Verdadera. inc es una clausura: guarda la ligadura a la n de contador. Aunque contador terminó y n ya no se puede nombrar desde afuera, su tiempo de vida continúa mientras inc exista; por eso cada llamada a inc devuelve 1, 2, 3… Alcance y tiempo de vida no terminan juntos.', fb: 'Separa alcance de tiempo de vida con este código.' },
          { k: 'incompleta', t: 'Verdadera, porque inc es una clausura.', fb: 'Nombra el concepto, pero no lo conecta con alcance y tiempo de vida.' },
          { k: 'error', t: 'Verdadera, porque nonlocal convierte a n en una variable global.', fb: 'nonlocal no la vuelve global: indica que n es la de la función que rodea a inc.' }
        ],
        modelo: 'Verdadera: clausura. n queda fuera del alcance de quien está afuera, pero su tiempo de vida sigue porque inc mantiene la ligadura.' },
      { t: 'vf', u: [3], titulo: 'Alcance y tiempo de vida', tema: 'Global no basta para asignar', lang: 'Python',
        q: 'Una variable global se ve en todo el programa y vive durante toda la ejecución; por eso en Python cualquier función la puede modificar con una simple asignación.', a: false,
        porque: [
          { k: 'completa', t: 'Falsa. Que la global se vea en todas partes no basta: en Python, una asignación dentro de una función crea una variable local con ese nombre, que tapa a la global. Para modificarla hay que declararla con `global`.', fb: 'Explica qué pasa con la asignación y cómo se resuelve.' },
          { k: 'incompleta', t: 'Falsa, porque hay que usar global.', fb: 'Falta explicar qué pasa sin global: se crea una local.' },
          { k: 'error', t: 'Falsa, porque las variables globales viven solo hasta que termina la primera función que las usa.', fb: 'Las globales viven toda la ejecución. El problema es de alcance de la asignación.' }
        ],
        modelo: 'Falsa: asignar dentro de la función crea una local (alcance); sin `global` la global no cambia.' }
    ]
  ],

  /* ---------- PARTE C · un juego de 8 conceptos; se muestran 6 fragmentos ---------- */
  C: [
    { t: 'parea', u: [2, 4, 5, 7, 8], titulo: 'Fragmento y concepto', cantidad: 6,
      conceptos: [
        { id: 'clau', t: 'Clausura' }, { id: 'guar', t: 'Guarda' },
        { id: 'cort', t: 'Cortocircuito que da un valor por defecto' }, { id: 'conv', t: 'Conversión implícita (tipado débil)' },
        { id: 'unif', t: 'Falta de uniformidad' }, { id: 'orden', t: 'Función de orden superior' },
        { id: 'prop', t: 'Excepción que se propaga' }, { id: 'ligd', t: 'Sobrescritura con ligadura dinámica' }
      ],
      fragmentos: [
        { c: 'clau', lang: 'Python', code: `def sumador(k):
    return lambda x: x + k
s5 = sumador(5)
print(s5(10))   # 15`, exp: 'La lambda recuerda la k de sumador aunque sumador ya terminó.' },
        { c: 'guar', lang: 'Python', code: `def raiz(x):
    if x < 0:
        return None
    return x ** 0.5`, exp: 'Verifica la condición antes de operar y evita el caso problemático.' },
        { c: 'cort', lang: 'Python', code: `puerto = config.get("puerto") or 8080`, exp: 'Si get devuelve None (falso), or devuelve su segundo operando: un valor por defecto sin if.' },
        { c: 'conv', lang: 'C', code: `int n = 3.9;
printf("%d", n);   /* imprime 3 */`, exp: 'C convierte el double a int sin que nadie lo pida y pierde la parte decimal.' },
        { c: 'unif', lang: 'Java', code: `arr.length
texto.length()
lista.size()`, exp: 'Tres formas distintas de preguntar lo mismo: cuántos elementos hay.' },
        { c: 'orden', lang: 'Python', code: `ordenadas = sorted(palabras, key=len)`, exp: 'sorted recibe otra función (len) como argumento.' },
        { c: 'prop', lang: 'Python', code: `def leer(t):
    return int(t)
def cargar(t):
    return leer(t)
try:
    cargar("x")
except ValueError:
    print("atrapada arriba")`, exp: 'El error nace en leer, pasa por cargar sin capturarse y se atrapa en el nivel de arriba.' },
        { c: 'ligd', lang: 'Python', code: `for f in [Circulo(2), Cuadrado(3)]:
    print(f.area())`, exp: 'La misma línea `f.area()` ejecuta una versión distinta según el objeto real.' }
      ] },
    { t: 'parea', u: [4, 6, 7, 8], titulo: 'Fragmento y concepto', cantidad: 6,
      conceptos: [
        { id: 'sobre', t: 'Sobrecarga' }, { id: 'alias', t: 'Alias: dos nombres, un objeto' },
        { id: 'pere', t: 'Evaluación perezosa' }, { id: 'inmu', t: 'Inmutabilidad' },
        { id: 'comp', t: 'Composición' }, { id: 'recu', t: 'Recursión' },
        { id: 'esta', t: 'Tipado estático: error al compilar' }, { id: 'valor', t: 'Paso por valor' }
      ],
      fragmentos: [
        { c: 'sobre', lang: 'Java', code: `int area(int lado) { ... }
int area(int base, int altura) { ... }`, exp: 'Mismo nombre, distinta firma, en la misma clase: el compilador elige por los argumentos.' },
        { c: 'alias', lang: 'Python', code: `a = [1, 2]
b = a
b.append(3)
print(a)   # [1, 2, 3]`, exp: 'a y b están ligados a la misma lista: el cambio por b se ve por a.' },
        { c: 'pere', lang: 'Python', code: `pares = (x for x in range(10**9) if x % 2 == 0)
print(next(pares))   # 0, al instante`, exp: 'El generador no calcula los mil millones: produce cada valor cuando se lo piden.' },
        { c: 'inmu', lang: 'Python', code: `t = (1, 2)
t[0] = 5   # TypeError`, exp: 'Una tupla no se puede modificar después de creada.' },
        { c: 'comp', lang: 'Python', code: `class Auto:
    def __init__(self):
        self.motor = Motor()
    def arrancar(self):
        return self.motor.encender()`, exp: 'Auto «tiene un» Motor y le delega el trabajo.' },
        { c: 'recu', lang: 'Python', code: `def fact(n):
    return 1 if n == 0 else n * fact(n - 1)`, exp: 'La función se define en términos de sí misma, con un caso base.' },
        { c: 'esta', lang: 'Java', code: `String s = 10;   // no compila`, exp: 'El tipo de s se verifica antes de ejecutar: el compilador rechaza el int.' },
        { c: 'valor', lang: 'C', code: `void f(int x) { x = 99; }
int a = 5;
f(a);
printf("%d", a);   /* 5 */`, exp: 'x es una copia de a: cambiarla no afecta a la variable original.' }
      ] }
  ],

  /* ---------- PARTE E1 · de bucle a pipeline (5 pts) ---------- */
  E1: [
    { t: 'completa', u: [8], titulo: 'E1 · De bucle a pipeline funcional', lang: 'Python',
      ctx: 'Una tienda calcula el total de los pedidos entregados, sumando 5000 de envío a cada uno:',
      antes: `pedidos = [("ana", 40000, "entregado"), ("luis", 120000, "entregado"),
           ("eva", 80000, "cancelado"), ("juan", 70000, "entregado")]
total = 0
for p in pedidos:
    if p[2] == "entregado":
        total = total + p[1] + 5000
print(total)`,
      medio: 'a) Completa los cuatro huecos para que el pipeline calcule lo mismo que el bucle, sin ninguna variable que cambie de valor. Cada hueco vale 1 pt.',
      code: `from functools import reduce
validos = list(filter(lambda p: ____(1)____, pedidos))
montos  = list(map(lambda p: ____(2)____, validos))
total   = reduce(lambda a, b: ____(3)____, montos, ____(4)____)
print(total)`,
      huecos: [
        { o: ['p[2] == "entregado"', 'p[2] != "entregado"', 'p[1] > 5000', 'total + p[1]'], a: 0, exp: 'filter se queda con los pedidos que cumplen la condición del if.' },
        { o: ['p[1] + 5000', 'p[1]', 'total + p[1] + 5000', 'p + 5000'], a: 0, exp: 'map transforma cada pedido en su monto con envío. Sin total: en el pipeline no hay acumulador.' },
        { o: ['a + b', 'a * b', 'b', 'max(a, b)'], a: 0, exp: 'reduce combina de a dos: lo acumulado (a) más el siguiente (b).' },
        { o: ['0', '1', '5000', '[]'], a: 0, exp: 'El valor inicial es el neutro de la suma: el mismo 0 con el que arranca total en el bucle.' }
      ],
      salida: { q: 'b) ¿Qué imprimen las dos versiones? (1 pt)', a: ['245000', '245.000'], exp: '45000 + 125000 + 75000 = 245000 (el de eva está cancelado).' },
      modelo: `validos = list(filter(lambda p: p[2] == "entregado", pedidos))
montos  = list(map(lambda p: p[1] + 5000, validos))
total   = reduce(lambda a, b: a + b, montos, 0)   # 245000`,
      terminaste: 'el pipeline no tiene ninguna asignación del tipo `total = total + …`.' },
    { t: 'completa', u: [8], titulo: 'E1 · De bucle a pipeline funcional', lang: 'Python',
      ctx: 'Un juego de preguntas da 10 puntos por cada acierto, pero solo cuenta a quienes acertaron al menos 2:',
      antes: `notas = [("ana", 4), ("luis", 1), ("eva", 5), ("juan", 2), ("rosa", 3)]
puntos = 0
for n in notas:
    if n[1] >= 2:
        puntos = puntos + n[1] * 10
print(puntos)`,
      medio: 'a) Completa los cuatro huecos para que el pipeline calcule lo mismo que el bucle, sin ninguna variable que cambie de valor. Cada hueco vale 1 pt.',
      code: `from functools import reduce
cuentan = list(filter(lambda n: ____(1)____, notas))
valores = list(map(lambda n: ____(2)____, cuentan))
puntos  = reduce(lambda a, b: ____(3)____, valores, ____(4)____)
print(puntos)`,
      huecos: [
        { o: ['n[1] >= 2', 'n[1] > 2', 'n[0] >= 2', 'n >= 2'], a: 0, exp: '>= 2 incluye a juan, que tiene 2. Con > 2 quedaría afuera y el total sería 120.' },
        { o: ['n[1] * 10', 'n * 10', 'n[0] * 10', 'puntos + n[1] * 10'], a: 0, exp: 'map convierte cada tupla en sus puntos. n * 10 repetiría la tupla diez veces.' },
        { o: ['a + b', 'a * b', 'a + b * 10', 'b'], a: 0, exp: 'Los valores ya están multiplicados por 10: reduce solo suma.' },
        { o: ['0', '1', '10', 'None'], a: 0, exp: 'El neutro de la suma, como `puntos = 0` en el bucle.' }
      ],
      salida: { q: 'b) ¿Qué imprimen las dos versiones? (1 pt)', a: ['140'], exp: '40 + 50 + 20 + 30 = 140 (luis tiene 1 y no cuenta).' },
      modelo: `cuentan = list(filter(lambda n: n[1] >= 2, notas))
valores = list(map(lambda n: n[1] * 10, cuentan))
puntos  = reduce(lambda a, b: a + b, valores, 0)   # 140`,
      terminaste: 'el pipeline no tiene ninguna asignación del tipo `puntos = puntos + …`.' }
  ],

  /* ---------- PARTE E2 · de selección por tipo a polimorfismo (3 pts) ---------- */
  E2: [
    { t: 'completa', u: [2, 7], titulo: 'E2 · De instanceof a polimorfismo', lang: 'Java',
      ctx: 'Una empresa de telefonía factura así:',
      antes: `class Facturador {
    int cobrar(Object l) {
        if (l instanceof Prepago) return 0;
        else if (l instanceof Pospago) return 85000;
        else if (l instanceof Empresarial) return 150000;
        return 0;
    }
}`,
      medio: 'Un compañero empezó este rediseño. a) Completa la línea de cobrar sin usar instanceof ni if. (1 pt)',
      code: `abstract class Linea {
    abstract int cargo();
}
class Prepago extends Linea {
    @Override int cargo() { return 0; }
}
class Pospago extends Linea {
    @Override int cargo() { return 85000; }
}
class Empresarial extends Linea {
    @Override int cargo() { return 150000; }
}
class Facturador {
    int cobrar(Linea l) {
        return ____(1)____;
    }
}`,
      huecos: [ { o: ['l.cargo()', 'Linea.cargo()', 'cargo(l)', 'l instanceof Prepago ? 0 : l.cargo()'], a: 0, exp: 'Se le pide al objeto su propio cargo; cada subclase responde con su versión.' } ],
      extras: [
        { q: 'b) ¿Qué mecanismo elige qué cargo() se ejecuta y en qué momento? (1 pt)', a: 0, fb: 'El tipo declarado (Linea) asegura que cargo() existe; la versión la elige el objeto real cuando el programa corre.',
          o: ['Ligadura dinámica (sobrescritura), en ejecución, según la clase del objeto real', 'Sobrecarga, en compilación, según el tipo declarado de l', 'Tipado dinámico, en ejecución, porque l cambia de tipo', 'Ligadura dinámica, en compilación, porque Linea es abstracta'] },
        { q: 'c) La empresa agrega LineaJoven. ¿Qué escribes, qué clases existentes modificas y qué criterio de la U2 se gana? (1 pt)', a: 0, fb: 'Con polimorfismo, agregar un caso es agregar código, no modificar el que ya funciona.',
          o: ['Una subclase LineaJoven con su cargo(); no se modifica ninguna clase existente; se gana extensibilidad', 'Un else if más en cobrar; se modifica Facturador; se gana legibilidad', 'Un método cargoJoven() en Linea; se modifican Linea y todas las subclases; se gana regularidad', 'Una subclase LineaJoven y además un if en cobrar; se gana eficiencia'] }
      ],
      terminaste: 'en tu versión no queda ningún instanceof.' },
    { t: 'completa', u: [2, 7], titulo: 'E2 · De la selección por tipo al polimorfismo', lang: 'Python',
      ctx: 'Una app de envíos calcula el costo así:',
      antes: `def costo_envio(e):
    if e["tipo"] == "moto":
        return 8000
    elif e["tipo"] == "camion":
        return 35000
    elif e["tipo"] == "bici":
        return 5000`,
      medio: 'Una compañera empezó este rediseño. a) Completa la línea de costo_envio sin usar if. (1 pt)',
      code: `class Envio:
    def costo(self):
        raise NotImplementedError

class Moto(Envio):
    def costo(self): return 8000

class Camion(Envio):
    def costo(self): return 35000

class Bici(Envio):
    def costo(self): return 5000

def costo_envio(e):
    return ____(1)____`,
      huecos: [ { o: ['e.costo()', 'Envio.costo(self)', 'costo(e)', 'e["tipo"].costo()'], a: 0, exp: 'Se le pide al objeto su costo; Python busca el método en la clase del objeto real.' } ],
      extras: [
        { q: 'b) ¿Qué mecanismo elige qué costo() se ejecuta y en qué momento? (1 pt)', a: 0, fb: 'Python busca el método en la clase del objeto real al ejecutar la llamada: ligadura dinámica.',
          o: ['Ligadura dinámica: al ejecutar, Python busca costo en la clase del objeto real', 'Sobrecarga: Python elige antes de ejecutar según el tipo del parámetro', 'Tipado estático: el tipo de e se fija al definir la función', 'Evaluación perezosa: costo se calcula recién cuando se necesita'] },
        { q: 'c) La empresa agrega envíos en Dron. ¿Qué escribes, qué modificas y qué criterio de la U2 se gana? (1 pt)', a: 0, fb: 'Agregar un caso es agregar una clase; costo_envio no se toca.',
          o: ['Una clase Dron(Envio) con su costo(); no se modifica nada existente; se gana extensibilidad', 'Un elif más en costo_envio; se modifica costo_envio; se gana legibilidad', 'Un atributo tipo = "dron" en Envio; se modifican todas las clases; se gana regularidad', 'Una clase Dron y además un elif; se gana eficiencia'] }
      ],
      terminaste: 'en tu versión no queda ningún if por tipo.' }
  ]
};
