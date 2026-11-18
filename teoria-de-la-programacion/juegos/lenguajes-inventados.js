/* =========================================================
   Lenguajes inventados · Teoría de la Programación
   Kuarahy (sol), Jasy (luna) y Ñe’ẽ (palabra).
   Los usan lenguajes-inventados.html y simulacro-final.html (Parte D).
   Todas las salidas se verificaron con un intérprete de prueba
   que aplica estas mismas reglas.
   ========================================================= */

const BASE_COMUN = [
  '`var n = 2` declara una variable nueva. Si está fuera de toda función es global; si está dentro de una función, es local de esa función.',
  '`n = n + 1` (sin `var`) cambia el valor de una variable que ya existe. No crea una variable nueva.',
  '`func nombre(parámetros)` define una función. Su cuerpo son las líneas con sangría que están debajo.',
  '`imprimir(e)` escribe el valor de `e` en una línea nueva.',
  'Las expresiones se evalúan de izquierda a derecha.',
  'El programa se ejecuta desde el «programa principal», de arriba hacia abajo. Si una línea provoca un error, el programa se detiene ahí; lo que ya se imprimió queda impreso.'
];

const LENGUAJES = {
  kuarahy: {
    nombre: 'Kuarahy', lema: '«sol» en guaraní', unidades: 'U3 · U4 · U6',
    foco: 'Alcance dinámico, paso por referencia y conversión de número a texto.',
    aviso: 'Kuarahy es un lenguaje inventado. No funciona como Python, Java ni C: aplica **solo** estas reglas, aunque contradigan lo que conoces.',
    base: BASE_COMUN,
    reglas: [
      { id: 'R1', nombre: 'Alcance dinámico', texto: 'Cuando una función usa un nombre que no declaró con `var` y que no es uno de sus parámetros, lo busca en la función que la llamó (sus variables y sus parámetros); si no está ahí, en la que llamó a esa, y así hasta las variables globales.' },
      { id: 'R2', nombre: 'Paso por referencia', texto: 'El parámetro es otro nombre para la misma variable que se pasó al llamar. Si se cambia el parámetro, cambia la variable original.' },
      { id: 'R3', nombre: 'Texto + número', texto: 'Si se suman un texto y un número, el número se convierte a texto y se unen: `"Gs " + 5` vale `"Gs 5"`. Dos textos se unen; dos números se suman.' }
    ],
    puntuales: [
      { t: 'razonada', u: [4, 5], titulo: 'El orden importa', tema: 'Kuarahy · R3 y orden de evaluación', lang: 'Kuarahy',
        code: `imprimir("1" + 2 + 3)
imprimir(1 + 2 + "3")`,
        q: '¿Qué imprime Kuarahy?',
        o: [
          { t: '`123` y `33`', ok: true, por: 'Izquierda a derecha: `"1" + 2` da `"12"` y `"12" + 3` da `"123"`. En la segunda, `1 + 2` es una suma de números (3) y recién `3 + "3"` activa R3: `"33"`.' },
          { t: '`6` y `6`', por: 'Eso haría un lenguaje que convierte el texto a número, como Jasy. En Kuarahy, R3 convierte el número a texto.' },
          { t: '`123` y `123`', por: 'La segunda línea empieza con dos números: `1 + 2` se resuelve como suma antes de que aparezca el texto.' },
          { t: 'Error en las dos líneas', por: 'Kuarahy no da error al mezclar texto y número: R3 define qué hacer.' }
        ],
        concepto: { o: ['R3 · conversión implícita (tipado débil)', 'R1 · alcance dinámico', 'R2 · paso por referencia', 'Tipado fuerte'], a: 0 },
        porque: [
          { k: 'completa', t: 'R3 convierte el número a texto solo cuando uno de los dos operandos de esa suma es texto. Como se evalúa de izquierda a derecha, en la 1ª línea el texto está desde el principio y todo se une; en la 2ª, primero se suman 1 y 2 como números.', fb: 'Nombra la regla, dice cuándo se aplica y conecta el orden de evaluación con cada línea.' },
          { k: 'incompleta', t: 'En la primera línea se junta el "1" con el 2 y queda "12", y después se le agrega el 3 y queda "123". En la segunda línea primero se calcula 1 + 2, que da 3, y recién después aparece el "3", se juntan los dos y queda "33". Por eso las dos líneas imprimen cosas distintas.', fb: 'Narra lo que hace el código, pero no nombra el concepto ni explica por qué pasa. Contar la traza no alcanza: es una justificación incompleta.' },
          { k: 'error', t: 'Porque en Kuarahy, cuando en una línea aparece un texto, toda la expresión se trata como texto desde el principio, sin importar dónde esté.', fb: 'R3 se aplica a cada suma de a dos, en orden. En `1 + 2 + "3"`, la primera suma es entre dos números y da 3.' }
        ],
        modelo: 'R3 (conversión implícita): cuando un operando es texto, el número se convierte a texto y se unen. Como se evalúa de izquierda a derecha, en `"1" + 2 + 3` todo es unión (`"12"`, luego `"123"`); en `1 + 2 + "3"` primero 1 + 2 = 3 y recién después `3 + "3"` = `"33"`.' },

      { t: 'razonada', u: [3], titulo: '¿A quién le pregunta f?', tema: 'Kuarahy · R1 alcance dinámico', lang: 'Kuarahy',
        code: `var x = 1

func f()
    imprimir(x)

func g()
    var x = 2
    f()

func h()
    var x = 3
    g()

// programa principal
h()
f()`,
        q: '¿Qué imprime?',
        o: [
          { t: '`2` y después `1`', ok: true, por: 'En la 1ª llamada, f la llamó g, que tiene su propia x = 2. En la 2ª, la llama el programa principal: x global, 1.' },
          { t: '`1` y después `1`', por: 'Eso sería con alcance estático: f fue escrita fuera de toda función y vería siempre la global. R1 dice otra cosa.' },
          { t: '`3` y después `1`', por: 'La búsqueda empieza por quien llamó a f (g) y se detiene en la primera x que encuentra. No sigue hasta h.' },
          { t: '`2` y después `2`', por: 'La 2ª llamada la hace el programa principal: ahí ya no hay ninguna g activa.' }
        ],
        concepto: { o: ['R1 · alcance dinámico', 'Alcance estático', 'R2 · paso por referencia', 'Tiempo de vida'], a: 0 },
        porque: [
          { k: 'completa', t: 'Con alcance dinámico, f busca x en quien la llamó. En la 1ª llamada la llamó g, que tiene `var x = 2`, y ahí se detiene la búsqueda. En la 2ª la llama el programa principal, así que llega a la x global: 1.', fb: 'Sigue la cadena de llamadas en cada caso y dice dónde se detiene la búsqueda.' },
          { k: 'incompleta', t: 'La primera vez, h llama a g, g crea su propia x con el valor 2 y después llama a f, y f imprime 2. La segunda vez, el programa principal llama directamente a f y f imprime 1, que es el valor que tenía x desde el principio del programa, así que en pantalla se ven el 2 y el 1.', fb: 'Narra lo que hace el código, pero no nombra el concepto ni explica por qué pasa. Contar la traza no alcanza: es una justificación incompleta.' },
          { k: 'error', t: 'Porque f usa la x de la última función que se ejecutó antes que ella, que en la primera llamada es g y en la segunda es h.', fb: 'No importa qué función se ejecutó antes, sino quién está llamando a f ahora. En la 2ª llamada h ya terminó: la llama el programa principal.' }
        ],
        modelo: 'R1 (alcance dinámico): f no declara x, así que la busca en la cadena de llamadas activa. Primera llamada: h → g → f; la primera x que aparece es la de g (2). Segunda llamada: programa principal → f; llega a la global (1).' },

      { t: 'razonada', u: [6], titulo: 'Intercambio', tema: 'Kuarahy · R2 paso por referencia', lang: 'Kuarahy',
        code: `func intercambiar(a, b)
    var t = a
    a = b
    b = t

// programa principal
var x = 1
var y = 2
intercambiar(x, y)
imprimir(x)
imprimir(y)`,
        q: '¿Qué imprime?',
        o: [
          { t: '`2` y `1`', ok: true, por: 'a y b son alias de x e y: lo que intercambia la función queda en las variables originales.' },
          { t: '`1` y `2`', por: 'Ese resultado es el del paso por valor (como en C sin punteros): el intercambio quedaría en las copias.' },
          { t: '`2` y `2`', por: 'Saldría si no existiera t. Como t guardó el 1 antes de pisar a, b recibe ese 1.' },
          { t: '`1` y `1`', por: 'a toma el valor de b (2) antes de que se pierda nada: x termina en 2.' }
        ],
        concepto: { o: ['R2 · paso por referencia (alias)', 'Paso por valor', 'R1 · alcance dinámico', 'Variable local'], a: 0 },
        porque: [
          { k: 'completa', t: 'Con paso por referencia, a y b son otros nombres de x e y (alias): cada asignación dentro de la función cambia la variable original. t guarda el 1 antes de pisarlo, así que x termina en 2 e y en 1.', fb: 'Usa la idea de alias y sigue las tres asignaciones.' },
          { k: 'incompleta', t: 'Porque la función intercambia los valores de a y b.', fb: 'Eso pasa con cualquier mecanismo. Lo que explica que x e y cambien es que a y b son alias de ellas.' },
          { k: 'error', t: 'Porque al terminar intercambiar, Kuarahy copia el valor final de cada parámetro en la variable que se pasó, de izquierda a derecha: primero a vuelve a x con el 2 y después b vuelve a y con el 1, y así quedan cambiados aunque dentro de la función eran copias.', fb: 'Eso describe el paso por valor-resultado, no R2. Aquí da lo mismo de casualidad: con R2, a y b son x e y desde el principio y no hay ninguna copia de vuelta.' }
        ],
        modelo: 'R2 (paso por referencia): a es otro nombre de x y b de y. `var t = a` guarda 1; `a = b` deja x en 2; `b = t` deja y en 1. Los cambios del procedimiento son cambios en x e y.' },

      { t: 'razonada', u: [6], titulo: 'La misma variable, dos veces', tema: 'Kuarahy · R2 alias doble', lang: 'Kuarahy',
        code: `func sumar_a(a, b)
    a = a + 1
    b = b + 1

// programa principal
var z = 5
sumar_a(z, z)
imprimir(z)`,
        q: '¿Qué imprime?',
        o: [
          { t: '`7`', ok: true, por: 'a y b son dos alias de z: cada suma cambia z.' },
          { t: '`6`', por: 'Saldría 6 si cada parámetro tuviera su propia copia y se copiara de vuelta al terminar (valor-resultado).' },
          { t: '`5`', por: 'Ese sería el paso por valor: las sumas quedarían en copias.' },
          { t: 'Error: no se puede pasar dos veces la misma variable', por: 'Kuarahy no lo prohíbe. Es el caso clásico donde aparece el alias.' }
        ],
        concepto: { o: ['R2 · alias por paso por referencia', 'Paso por valor', 'Paso por valor-resultado', 'R3 · texto + número'], a: 0 },
        porque: [
          { k: 'completa', t: 'a y b son dos alias de la misma variable z: `a = a + 1` deja z en 6 y `b = b + 1` lee ese 6 y lo deja en 7. Hay dos nombres y una sola variable.', fb: 'Explica que hay dos nombres para una sola variable y sigue cada línea.' },
          { k: 'incompleta', t: 'Porque z se pasó dos veces a la misma función.', fb: 'Describe la llamada, pero no explica qué mecanismo hace que las dos sumas se acumulen.' },
          { k: 'error', t: 'Porque cada parámetro recibe su propia copia de z, y al terminar Kuarahy suma las dos copias en z.', fb: 'Con R2 no hay copias: a y b son z. Ningún mecanismo de paso «suma copias».' }
        ],
        modelo: 'R2: a y b son alias de z (dos nombres ligados a la misma variable). a = a + 1 → z = 6; b = b + 1 lee el 6 → z = 7. Con valor-resultado daría 6 y con valor, 5.' },

      { t: 'razonada', u: [3, 6], titulo: 'R1 y R2 al mismo tiempo', tema: 'Kuarahy · R1 + R2', lang: 'Kuarahy',
        code: `var c = 0

func contar()
    c = c + 1

func ronda(c)
    contar()
    contar()

// programa principal
var k = 10
ronda(k)
imprimir(k)
imprimir(c)`,
        q: '¿Qué imprime?',
        o: [
          { t: '`12` y `0`', ok: true, por: 'contar encuentra la c de ronda (su parámetro), que es un alias de k.' },
          { t: '`10` y `2`', por: 'Eso sería con alcance estático: contar vería la c global.' },
          { t: '`12` y `2`', por: 'Cada llamada a contar cambia una sola c: la primera que encuentra. La global nunca se toca.' },
          { t: '`10` y `0`', por: 'Alguna c cambia: contar suma 1 dos veces.' }
        ],
        concepto: { o: ['R1 y R2 juntas: alcance dinámico + alias', 'Solo R1', 'Solo R2', 'R3 · texto + número'], a: 0 },
        porque: [
          { k: 'completa', t: 'contar usa c sin declararla: por R1 la busca en quien la llamó, ronda, y ahí c es su parámetro; por R2 ese parámetro es un alias de k. Por eso las dos sumas van a k (12) y la c global sigue en 0.', fb: 'Usa las dos reglas en el orden en que actúan.' },
          { k: 'incompleta', t: 'contar se ejecuta dos veces dentro de ronda y cada vez suma 1. Como ronda recibió k, que valía 10, después de las dos llamadas k vale 12. La c del principio del programa no se tocó en ningún momento, así que sigue valiendo 0 cuando se imprime al final.', fb: 'Narra lo que hace el código, pero no nombra el concepto ni explica por qué pasa. Contar la traza no alcanza: es una justificación incompleta.' },
          { k: 'error', t: 'Porque contar modifica la c global dos veces, pero `imprimir(c)` muestra el valor que tenía c al empezar el programa.', fb: '`imprimir` muestra el valor actual. La c global no cambió porque contar encontró otra c antes.' }
        ],
        modelo: 'R1: contar no declara c y la busca en su llamador, ronda; ahí c es un parámetro. R2: ese parámetro es alias de k. Cada c = c + 1 cambia k: 10 → 12. La c global no se toca: 0.' }
    ],
    trazas: [
      { t: 'traza', u: [2, 3, 4, 6], titulo: 'Kuarahy: completa la traza', tema: 'Kuarahy · traza con variantes',
        programa: ` 1  var total = 3
 2
 3  func ver()
 4      imprimir(total)
 5
 6  func cobrar(m)
 7      m = m * 2
 8      ver()
 9
10  func caja()
11      var total = 20
12      cobrar(total)
13      ver()
14
15  // programa principal
16  caja()
17  imprimir(total)
18  imprimir("Gs " + total)`,
        filas: [
          { nombre: 'Original (R1, R2 y R3)', v: ['40', '40', '3', 'Gs 3'],
            exp: 'caja declara su total = 20 y lo pasa a cobrar: m es alias (R2) y lo deja en 40. ver no declara total: R1 lo busca en cobrar (no está) y en caja (40). Las dos llamadas a ver imprimen 40. En el programa principal total es la global, 3, y R3 une `"Gs "` con 3.' },
          { nombre: 'Variante 1 · R1 cambia a alcance estático', desc: 'El nombre se busca en el bloque donde la función fue escrita y, si no está, en los que la rodean, hasta las globales.', v: ['3', '3', '3', 'Gs 3'],
            exp: 'ver fue escrita fuera de toda función: su total es la global, 3. cobrar igual cambia el total de caja a 40, pero ver no lo ve.' },
          { nombre: 'Variante 2 · R2 cambia a paso por valor', desc: 'El parámetro recibe una copia; cambiarlo no cambia la variable original.', v: ['20', '20', '3', 'Gs 3'],
            exp: 'm recibe una copia de 20: la copia pasa a 40 y el total de caja sigue en 20. ver encuentra (R1) el total de caja: 20 y 20.' },
          { nombre: 'Variante 3 · R3 cambia: texto + número es un error de tipos', desc: 'Se detecta al llegar a esa línea.', v: ['40', '40', '3', 'error'],
            exp: 'Todo igual hasta la última línea: `"Gs " + total` mezcla texto y número y ahora eso es un error.' }
        ],
        d2: { t: 'elige', titulo: 'D2 · Explica una diferencia', leyenda: 'Elige la explicación que usa bien alias y ligadura',
          q: '¿Por qué el 1er valor de la fila «Original» (40) es distinto del 1er valor de la Variante 2 (20)? Usa las palabras **alias** y **ligadura**.',
          porque: [
            { k: 'completa', t: 'En el original, m es un alias del total de caja: el nombre m está ligado a la misma variable, así que m = m * 2 la deja en 40, y ver, que por R1 encuentra el total de caja, imprime 40. En la Variante 2, m está ligado a una copia: el 40 queda en la copia y el total de caja sigue en 20.', fb: 'Usa las dos palabras con sentido y conecta el cambio con lo que imprime ver.' },
            { k: 'incompleta', t: 'En el original, cobrar cambia m a 40 y cuando se llama a ver se imprime 40. En la Variante 2, cobrar también hace m = m * 2, pero cuando ver imprime aparece 20, porque el total de caja quedó en 20 y no en 40 como en el original. Entonces el primer valor de las dos filas no es el mismo, aunque el programa sea idéntico.', fb: 'Narra la diferencia, pero no usa alias ni ligadura, que es lo que pide la consigna, ni explica por qué el total de caja no cambia.' },
            { k: 'error', t: 'Porque en la Variante 2 ver ya no encuentra el total de caja y usa el total global.', fb: 'Eso cambia en la Variante 1 (alcance estático), no en la 2. En la 2, ver sigue encontrando el total de caja; lo que cambia es que cobrar no lo modificó.' }
          ],
          modelo: 'Original: m es alias del total de caja (m y total están ligados a la misma variable), por eso m = m * 2 la deja en 40 y ver imprime 40. Variante 2: m está ligado a una copia; cambia la copia y el total de caja queda en 20.' },
        d3: { t: 'elige', titulo: 'D3 · Decide como diseñador', leyenda: 'Elige el argumento mejor construido (puede haber más de una decisión válida)',
          q: 'Si fueras el diseñador de Kuarahy, ¿mantendrías R1 (alcance dinámico)? La respuesta tiene que decidir y justificar con dos criterios de diseño de la U2, conectados con algo que pasa en este programa.',
          porque: [
            { k: 'completa', t: 'No la mantendría. Legibilidad: leyendo solo `func ver()` no puedo saber qué total imprime; depende de quién la llame (40 desde cobrar; 3 si la llamara el programa principal). Confiabilidad: si alguien agrega un `var total` en otra función que llama a ver, ver cambia de resultado sin que nadie la toque.', fb: 'Decide, nombra dos criterios y conecta cada uno con ver(). La decisión contraria también puede valer 2 pts si se justifica así.' },
            { k: 'completa', t: 'La mantendría, aceptando el costo. Escribibilidad: ver puede usar el total de la función que la llama sin recibirlo como parámetro, y el código queda más corto. Pero pierdo legibilidad: para saber qué imprime ver tengo que seguir la cadena de llamadas caja → cobrar → ver.', fb: 'Decide, nombra dos criterios y los conecta con este programa. La decisión contraria también puede valer 2 pts si se justifica así.' },
            { k: 'incompleta', t: 'No la mantendría, porque el alcance dinámico es más difícil de entender y genera errores.', fb: 'Decide, pero no nombra criterios de la U2 ni los conecta con ver() o cobrar().' },
            { k: 'error', t: 'La mantendría, porque el alcance dinámico mejora la eficiencia y la confiabilidad: el compilador ya sabe antes de ejecutar en qué variable está cada nombre, y así ver siempre encuentra el total correcto sin que el programador tenga que pasarlo como parámetro, lo que también evita errores de escritura cuando se hace la llamada.', fb: 'Es al revés: con alcance dinámico el nombre solo se resuelve durante la ejecución, mirando la pila de llamadas. Es el alcance estático el que se puede resolver antes.' }
          ] },
        terminaste: 'tienes las 16 celdas completas, D2 usa alias y ligadura, y D3 nombra dos criterios conectados con ver() o cobrar().' }
    ]
  },

  jasy: {
    nombre: 'Jasy', lema: '«luna» en guaraní', unidades: 'U3 · U4 · U6',
    foco: 'Las mismas R1 y R2 que Kuarahy, pero R3 convierte en el otro sentido: de texto a número.',
    aviso: 'Jasy es un lenguaje inventado. No funciona como Python, Java ni C: aplica **solo** estas reglas, aunque contradigan lo que conoces.',
    base: BASE_COMUN,
    reglas: [
      { id: 'R1', nombre: 'Alcance dinámico', texto: 'Cuando una función usa un nombre que no declaró con `var` y que no es uno de sus parámetros, lo busca en la función que la llamó (sus variables y sus parámetros); si no está ahí, en la que llamó a esa, y así hasta las variables globales.' },
      { id: 'R2', nombre: 'Paso por referencia', texto: 'El parámetro es otro nombre para la misma variable que se pasó al llamar. Si se cambia el parámetro, cambia la variable original.' },
      { id: 'R3', nombre: 'Texto + número', texto: 'Si se suman un texto y un número, el texto se convierte a número y se hace una suma aritmética: `"4" + 1` vale 5. Si el texto no representa un número, es un error. Dos textos se unen: `"4" + "1"` vale `"41"`.' }
    ],
    puntuales: [
      { t: 'razonada', u: [4, 5], titulo: 'Conversión paso a paso', tema: 'Jasy · R3 por operación', lang: 'Jasy',
        code: `imprimir("4" + 1 + "1")`,
        q: '¿Qué imprime Jasy?',
        o: [
          { t: '`6`', ok: true, por: '`"4" + 1` = 5 (R3) y `5 + "1"` = 6 (R3 otra vez).' },
          { t: '`411`', por: 'Eso haría Kuarahy, que convierte el número a texto. Jasy convierte el texto a número.' },
          { t: '`51`', por: 'Después del primer paso hay un número (5) y un texto ("1"): R3 vuelve a convertir y suma.' },
          { t: 'Error', por: '"4" y "1" representan números: R3 los convierte sin error.' }
        ],
        concepto: { o: ['R3 · conversión implícita de texto a número', 'R1 · alcance dinámico', 'R2 · paso por referencia', 'Tipado fuerte'], a: 0 },
        porque: [
          { k: 'completa', t: 'Se evalúa de izquierda a derecha: `"4" + 1` mezcla texto y número, R3 convierte "4" en 4 y suma: 5. Después `5 + "1"` vuelve a mezclar: "1" pasa a 1 y da 6.', fb: 'Aplica R3 a cada suma, en orden.' },
          { k: 'incompleta', t: 'Porque Jasy convierte los textos a números para poder sumar.', fb: 'Es la idea, pero no muestra los dos pasos ni el orden.' },
          { k: 'error', t: 'Porque Jasy primero convierte todos los textos de la línea a números y después suma todo junto: 4 + 1 + 1.', fb: 'Llega al 6 de casualidad. R3 actúa en cada suma de a dos: con `"4" + "1" + 1`, primero se unen los textos ("41") y recién después se suma 1: 42.' }
        ],
        modelo: 'R3 se aplica en cada suma, de izquierda a derecha: `"4" + 1` → 4 + 1 = 5; `5 + "1"` → 5 + 1 = 6. Es conversión implícita: el programador no pidió convertir.' },

      { t: 'razonada', u: [4, 5], titulo: 'Cuando el texto no es un número', tema: 'Jasy · R3 error y detención', lang: 'Jasy',
        code: `imprimir("2" + 2)
imprimir("dos" + 2)
imprimir(2 + 2)`,
        q: '¿Qué se ve al ejecutar?',
        o: [
          { t: '`4` y un error que detiene el programa', ok: true, por: '"2" se convierte; "dos" no representa un número: error y fin.' },
          { t: '`4`, un aviso de error en la 2ª línea y después `4`', por: 'Jasy se detiene en la línea del error: la 3ª nunca se ejecuta.' },
          { t: '`22`, `dos2` y `4`', por: 'Eso sería convertir el número a texto (Kuarahy).' },
          { t: '`4`, `2` y `4`', por: 'Un texto que no es número no vale 0 ni se ignora: R3 dice que es un error.' }
        ],
        concepto: { o: ['R3 · texto que no representa un número = error', 'R1 · alcance dinámico', 'Tipado estático', 'Guarda'], a: 0 },
        porque: [
          { k: 'completa', t: 'En la 1ª línea "2" representa un número, así que R3 lo convierte y suma: 4. En la 2ª, "dos" no representa un número: R3 dice que es error y el programa se detiene ahí, por eso la 3ª línea no se ejecuta.', fb: 'Explica las dos primeras líneas y por qué no llega a la tercera.' },
          { k: 'incompleta', t: 'Porque "dos" no es un número.', fb: 'Explica el error, pero no qué pasa con la 1ª y la 3ª línea.' },
          { k: 'error', t: 'Porque Jasy revisa todo el programa antes de ejecutarlo, encuentra el error de la 2ª línea y solo ejecuta las líneas correctas.', fb: 'Jasy detecta el problema al llegar a esa línea, no antes; y al detectarlo se detiene. No salta líneas.' }
        ],
        modelo: 'R3: "2" + 2 → 4. "dos" + 2: el texto no representa un número, es error. La regla base dice que el programa se detiene en la línea del error: se ve 4 y el error; `2 + 2` nunca se ejecuta.' },

      { t: 'razonada', u: [4], titulo: 'Sol y luna', tema: 'Kuarahy vs Jasy · tipado débil', lang: 'Kuarahy y Jasy',
        code: `imprimir("10" + 5)`,
        q: 'La misma línea en Kuarahy y en Jasy. ¿Qué imprime cada uno?',
        o: [
          { t: 'Jasy `15`; Kuarahy `105`', ok: true, por: 'Jasy pasa el texto a número y suma; Kuarahy pasa el número a texto y une.' },
          { t: 'Jasy `105`; Kuarahy `15`', por: 'Está al revés: revisa R3 de cada lenguaje.' },
          { t: 'Los dos `15`', por: 'Kuarahy convierte el número a texto, no el texto a número.' },
          { t: 'Los dos dan error', por: 'Ninguno de los dos es fuerte: los dos tienen una regla para convertir.' }
        ],
        concepto: { o: ['Los dos tienen tipado débil, con conversiones opuestas', 'Jasy es fuerte y Kuarahy es débil', 'Los dos son fuertes', 'Alcance dinámico'], a: 0 },
        porque: [
          { k: 'completa', t: 'Los dos convierten tipos sin que el programador lo pida (tipado débil), pero en sentido contrario: Jasy pasa el texto a número y suma (15); Kuarahy pasa el número a texto y une (105). Un lenguaje fuerte, como Python, daría error en los dos casos.', fb: 'Clasifica, compara el sentido de la conversión y contrasta con un lenguaje fuerte.' },
          { k: 'incompleta', t: 'Porque cada lenguaje tiene su propia regla R3.', fb: 'Verdadero pero vacío: no dice qué concepto representan esas reglas ni por qué dan distinto.' },
          { k: 'error', t: 'Porque Jasy es fuertemente tipado: obliga a que todo sea número antes de sumar, mientras Kuarahy deja mezclar.', fb: 'Si Jasy fuera fuerte no convertiría nada: daría error. Convertir en silencio es tipado débil.' }
        ],
        modelo: 'Los dos tienen tipado débil (conversión implícita). Jasy: "10" → 10, suma 15. Kuarahy: 5 → "5", une "105". Un lenguaje fuerte no convierte: da error.' },

      { t: 'razonada', u: [3, 4, 6], titulo: 'Texto más texto', tema: 'Jasy · R1, R2 y R3', lang: 'Jasy',
        code: `var nivel = 1

func mostrar()
    imprimir(nivel)

func subir(n)
    n = n + "1"
    mostrar()

func jugar()
    var nivel = "5"
    subir(nivel)

// programa principal
jugar()
mostrar()`,
        q: '¿Qué imprime?',
        o: [
          { t: '`51` y `1`', ok: true, por: '"5" + "1" son dos textos: se unen. mostrar encuentra primero la nivel de jugar y después la global.' },
          { t: '`6` y `1`', por: 'R3 solo actúa cuando se mezclan un texto y un número. Aquí son dos textos: se unen.' },
          { t: '`51` y `51`', por: 'La 2ª llamada a mostrar la hace el programa principal: llega a la nivel global, que nunca cambió.' },
          { t: '`6` y `6`', por: 'Ni se suma (son dos textos) ni la global cambia.' }
        ],
        concepto: { o: ['R1 y R2; R3 no se aplica porque son dos textos', 'Solo R3: siempre convierte a número', 'Solo R1', 'Alcance estático'], a: 0 },
        porque: [
          { k: 'completa', t: 'jugar declara nivel = "5" (texto) y la pasa por referencia: n es alias de esa nivel. "5" + "1" son dos textos, así que se unen ("51"). mostrar, llamada desde subir, busca nivel por R1: subir no la tiene (su parámetro es n) y jugar sí: "51". La 2ª llamada la hace el programa principal: nivel global, 1.', fb: 'Identifica que R3 no aplica y sigue R1 y R2 en cada llamada.' },
          { k: 'incompleta', t: 'Porque nivel es un texto y, por alcance dinámico, mostrar la encuentra en jugar.', fb: 'Explica el 1er valor a medias: falta el alias y por qué el 2° es 1.' },
          { k: 'error', t: 'Porque mostrar imprime el parámetro n de subir: en alcance dinámico se usa siempre la última variable que se modificó antes de la llamada, sin importar cómo se llame, y la última que cambió fue n con "51". En la segunda llamada, la última variable que tocó el programa principal es la nivel global, que vale 1, y por eso se imprime 1.', fb: 'R1 busca el mismo nombre (nivel), no «la última variable modificada». n se llama distinto.' }
        ],
        modelo: 'R2: n es alias de la nivel de jugar. Texto + texto se une: "51". R1: mostrar busca nivel en subir (no está) y en jugar ("51"). Desde el programa principal llega a la global: 1.' }
    ],
    trazas: [
      { t: 'traza', u: [2, 3, 4, 6], titulo: 'Jasy: completa la traza', tema: 'Jasy · traza con variantes',
        programa: ` 1  var p = 1
 2
 3  func anotar()
 4      imprimir(p)
 5
 6  func subir(q)
 7      q = q + "4"
 8      anotar()
 9
10  func ronda()
11      var p = 6
12      subir(p)
13      anotar()
14
15  // programa principal
16  ronda()
17  subir(p)
18  imprimir(p + "x")`,
        filas: [
          { nombre: 'Original (R1, R2 y R3)', v: ['10', '10', '5', 'error'],
            exp: 'ronda declara p = 6; subir recibe un alias (R2) y `q + "4"` convierte "4" a número (R3): 10. anotar busca p (R1) en subir (no está: su parámetro es q) y en ronda: 10, dos veces. Desde el programa principal, subir(p) liga q a la p global: 1 + 4 = 5, y anotar llega a la global: 5. "x" no representa un número: error.' },
          { nombre: 'Variante 1 · R1 cambia a alcance estático', desc: 'El nombre se busca en el bloque donde la función fue escrita y, si no está, en los que la rodean, hasta las globales.', v: ['1', '1', '5', 'error'],
            exp: 'anotar fue escrita fuera de toda función: ve siempre la p global. En la ronda imprime 1 dos veces (la p de ronda cambió a 10, pero anotar no la ve). Después subir(p) cambia la global a 5. La última línea sigue siendo error.' },
          { nombre: 'Variante 2 · R2 cambia a paso por valor', desc: 'El parámetro recibe una copia; cambiarlo no cambia la variable original.', v: ['6', '6', '1', 'error'],
            exp: 'q es una copia: la p de ronda queda en 6 y la global en 1. anotar encuentra (R1) la p de ronda: 6 y 6; desde el programa principal, la global: 1.' },
          { nombre: 'Variante 3 · R3 cambia: texto + número es un error de tipos', desc: 'Se detecta al llegar a esa línea.', v: ['error', '—', '—', '—'],
            exp: 'La primera suma de texto y número es la línea 7, en la primera llamada a subir: el programa se detiene antes de imprimir nada.' }
        ],
        d2: { t: 'elige', titulo: 'D2 · Explica una diferencia', leyenda: 'Elige la explicación que usa bien alias y ligadura',
          q: '¿Por qué el 3er valor de la fila «Original» (5) es distinto del 3er valor de la Variante 2 (1)? Usa las palabras **alias** y **ligadura**.',
          porque: [
            { k: 'completa', t: 'En el original, `subir(p)` desde el programa principal liga q a la misma variable que la p global (q es un alias): `q = q + "4"` deja la p global en 5 y anotar la imprime. En la Variante 2, q está ligado a una copia: la suma cambia la copia y la p global sigue en 1.', fb: 'Usa las dos palabras con sentido y las conecta con la línea 17.' },
            { k: 'incompleta', t: 'En el original el tercer valor es 5, porque al llamar a subir(p) desde el programa principal la p global pasa de 1 a 5 y anotar la imprime. En la Variante 2 el tercer valor es 1, porque la p global sigue valiendo 1 después de esa misma llamada, entonces anotar imprime 1 y no 5.', fb: 'Narra la diferencia, pero no usa alias ni ligadura ni explica por qué la p global no cambia en la Variante 2.' },
            { k: 'error', t: 'Porque en la Variante 2 "4" ya no se convierte a número y la suma no se hace.', fb: 'R3 sigue igual en la Variante 2: la suma se hace (q vale 5), pero sobre una copia.' }
          ],
          modelo: 'Original: q es alias de la p global (q y p ligados a la misma variable): la suma deja p en 5. Variante 2: q está ligado a una copia; la p global sigue en 1.' },
        d3: { t: 'elige', titulo: 'D3 · Decide como diseñador', leyenda: 'Elige el argumento mejor construido (puede haber más de una decisión válida)',
          q: 'Si fueras el diseñador de Jasy, ¿mantendrías R3 (convertir el texto a número)? Decide y justifica con dos criterios de la U2 conectados con este programa.',
          porque: [
            { k: 'completa', t: 'No la mantendría. Confiabilidad: en la línea 7 "4" se convierte en silencio y la suma «funciona», pero el mismo + con "x" detiene el programa en la línea 18: el error depende del contenido del dato, no del código. Legibilidad: al leer `q + "4"` no sé si es una suma o una unión sin conocer el tipo de q, porque texto + texto se une.', fb: 'Decide, nombra dos criterios y los conecta con las líneas 7 y 18.' },
            { k: 'completa', t: 'La mantendría para un lenguaje de formularios. Escribibilidad: los datos que llegan como texto ("4") se suman sin convertirlos a mano. Pero lo pago en confiabilidad: `imprimir(p + "x")` da error recién al ejecutar la línea 18, y nada avisa antes.', fb: 'Decide, nombra dos criterios y los conecta con el programa. La decisión contraria también vale si se justifica así.' },
            { k: 'incompleta', t: 'No, porque mezclar tipos es peligroso.', fb: 'Decide, pero sin criterios de la U2 ni conexión con el programa.' },
            { k: 'error', t: 'Sí la mantendría, porque R3 le da a Jasy tipado fuerte: obliga a que todo sea número antes de sumar, y eso aumenta la confiabilidad, porque en la línea 7 nunca se va a mezclar un texto con un número. Además mejora la legibilidad, porque quien lee el programa sabe que el + siempre suma números, también en la línea 18 con p + "x", y eso hace que el lenguaje sea más fácil de aprender.', fb: 'Convertir en silencio es tipado débil. Un lenguaje fuerte daría error en la línea 7.' }
          ] },
        terminaste: 'tienes las 16 celdas completas, D2 usa alias y ligadura, y D3 nombra dos criterios conectados con las líneas del programa.' }
    ]
  },

  nee: {
    nombre: 'Ñe’ẽ', lema: '«palabra» en guaraní', unidades: 'U5 · U6',
    foco: 'Expresiones sin precedencia, condiciones sin cortocircuito y paso por valor-resultado.',
    aviso: 'Ñe’ẽ es un lenguaje inventado. No funciona como Python, Java ni C: aplica **solo** estas reglas, aunque contradigan lo que conoces.',
    base: BASE_COMUN.concat([
      'Alcance estático, como en Python: una función ve sus variables, sus parámetros y las globales.',
      '`devolver e` termina la función y entrega el valor de `e`. `si condición` ejecuta las líneas con sangría solo si la condición es verdadera.',
      'Las comparaciones (`>`, `<`, `==`) se hacen después de la aritmética y antes de `y` / `o`. `[3, 8]` es una lista; `lista[i]` empieza en 0 y fuera de rango es un error.'
    ]),
    reglas: [
      { id: 'R1', nombre: 'Sin precedencia', texto: 'Los operadores aritméticos (+ − * /) tienen todos la misma precedencia y se resuelven de izquierda a derecha: `2 + 3 * 4` vale 20. Los paréntesis sí se respetan.' },
      { id: 'R2', nombre: 'Evaluación completa', texto: '`y` y `o` siempre evalúan los dos lados, aunque el primero ya decida el resultado. Primero el izquierdo, después el derecho.' },
      { id: 'R3', nombre: 'Paso por valor-resultado', texto: 'El parámetro recibe una copia del valor. Al terminar la función, el valor final de cada parámetro se copia de vuelta a la variable que se pasó, de izquierda a derecha.' }
    ],
    puntuales: [
      { t: 'razonada', u: [5], titulo: 'Sin precedencia', tema: 'Ñe’ẽ · R1 sin precedencia', lang: 'Ñe’ẽ',
        code: `imprimir(10 - 4 - 3)
imprimir(2 + 8 / 2)`,
        q: '¿Qué imprime Ñe’ẽ?',
        o: [
          { t: '`3` y `5`', ok: true, por: '(10 − 4) − 3 = 3 y (2 + 8) / 2 = 5.' },
          { t: '`3` y `6`', por: '6 sería con la precedencia habitual (8 / 2 primero). R1 dice que la división no se adelanta.' },
          { t: '`9` y `5`', por: '9 sería 10 − (4 − 3): asociar por la derecha. Ñe’ẽ resuelve de izquierda a derecha.' },
          { t: '`9` y `6`', por: 'Los dos están mal: revisa la dirección (izquierda a derecha) y que no hay precedencia.' }
        ],
        concepto: { o: ['R1 · sin precedencia, de izquierda a derecha', 'Precedencia habitual', 'Asociatividad por derecha', 'R2 · evaluación completa'], a: 0 },
        porque: [
          { k: 'completa', t: 'Sin precedencia, todos los operadores esperan su turno de izquierda a derecha: (10 − 4) − 3 = 3, igual que en matemática; pero (2 + 8) / 2 = 5, porque la división no se adelanta a la suma.', fb: 'Muestra el agrupamiento de las dos líneas.' },
          { k: 'incompleta', t: 'La primera línea hace 10 menos 4, que da 6, y después a ese 6 le resta 3, que da 3. La segunda línea hace 2 más 8, que da 10, y después ese 10 lo divide entre 2, que da 5. Así salen el 3 y el 5 que aparecen en la pantalla.', fb: 'Narra lo que hace el código, pero no nombra el concepto ni explica por qué pasa. Contar la traza no alcanza: es una justificación incompleta.' },
          { k: 'error', t: 'Porque Ñe’ẽ resuelve primero las sumas y las restas, y después las multiplicaciones y divisiones.', fb: 'Eso también es una precedencia, al revés. Con `2 * 3 + 1` tu regla daría 8; Ñe’ẽ da 7.' }
        ],
        modelo: 'R1: no hay precedencia; se agrupa de izquierda a derecha. (10 − 4) − 3 = 3; (2 + 8) / 2 = 5. Con la precedencia habitual la 2ª daría 6.' },

      { t: 'razonada', u: [5], titulo: 'Una cuenta más larga', tema: 'Ñe’ẽ · R1 sin precedencia', lang: 'Ñe’ẽ',
        code: `imprimir(1 + 2 * 3 - 4)`,
        q: '¿Qué imprime?',
        o: [
          { t: '`5`', ok: true, por: '1 + 2 = 3; 3 * 3 = 9; 9 − 4 = 5.' },
          { t: '`3`', por: 'Ese es el resultado con la precedencia habitual: 1 + 6 − 4.' },
          { t: '`-3`', por: 'Agrupaste (1 + 2) * (3 − 4): eso no es de izquierda a derecha, es de a pares.' },
          { t: '`9`', por: 'Falta la resta del final.' }
        ],
        concepto: { o: ['R1 · sin precedencia, de izquierda a derecha', 'Precedencia habitual', 'Asociatividad por derecha', 'R3 · valor-resultado'], a: 0 },
        porque: [
          { k: 'completa', t: 'Se resuelve de izquierda a derecha sin adelantar la multiplicación: 1 + 2 = 3; 3 * 3 = 9; 9 − 4 = 5.', fb: 'Muestra cada paso en el orden de R1.' },
          { k: 'incompleta', t: 'Porque en Ñe’ẽ todos los operadores valen lo mismo.', fb: 'Nombra la idea sin mostrar el cálculo.' },
          { k: 'error', t: 'Porque en Ñe’ẽ la resta siempre se hace al final, después de las demás operaciones.', fb: 'Coincide aquí, pero no es la regla: con `10 - 2 * 3` tu idea da 10 − 6 = 4; Ñe’ẽ da (10 − 2) * 3 = 24.' }
        ],
        modelo: 'R1: izquierda a derecha, sin precedencia. ((1 + 2) * 3) − 4 = 5.' },

      { t: 'razonada', u: [5], titulo: 'Una guarda que no protege', tema: 'Ñe’ẽ · R2 sin cortocircuito', lang: 'Ñe’ẽ',
        code: `var lista = [3, 8]
var i = 5
si i < 2 y lista[i] > 0
    imprimir("ok")
imprimir("fin")`,
        q: '¿Qué se ve al ejecutar?',
        o: [
          { t: 'Un error en la línea del `si`, sin imprimir nada', ok: true, por: 'Aunque `i < 2` sea falso, R2 calcula igual `lista[5]`, que está fuera de rango.' },
          { t: '`fin`', por: 'Eso pasaría con cortocircuito (Python, Java, C): como `i < 2` es falso, no se miraría `lista[i]`.' },
          { t: '`ok` y `fin`', por: '`i < 2` es falso: aunque no hubiera error, la condición completa sería falsa.' },
          { t: '`fin`, y después un error de rango al terminar el programa', por: 'El error ocurre en la línea del `si`, antes de llegar a `imprimir("fin")`.' }
        ],
        concepto: { o: ['R2 · evaluación completa (sin cortocircuito)', 'R1 · sin precedencia', 'R3 · valor-resultado', 'Excepción capturada'], a: 0 },
        porque: [
          { k: 'completa', t: 'Con R2, `y` evalúa los dos lados aunque el primero ya sea falso: después de `i < 2` igual se calcula `lista[5]`, que está fuera de rango y da error. La condición `i < 2` no sirve de guarda porque no evita la segunda parte.', fb: 'Explica el error y por qué la primera condición no protege.' },
          { k: 'incompleta', t: 'Porque `lista[5]` no existe.', fb: 'Explica el error, pero no por qué se llega a calcularlo si la primera parte ya era falsa.' },
          { k: 'error', t: 'Porque Ñe’ẽ evalúa primero el lado derecho del y, ya que el acceso a una lista tiene más precedencia que una comparación: al calcular lista[5] se produce el error de rango y el programa se detiene antes de llegar a mirar si i < 2, así que no se imprime nada.', fb: 'Los lados se evalúan de izquierda a derecha. El error no viene del orden: viene de que no hay cortocircuito.' }
        ],
        modelo: 'R2 (evaluación completa): `i < 2` es falso, pero igual se evalúa `lista[i] > 0`; `lista[5]` está fuera de rango → error y el programa se detiene. En un lenguaje con cortocircuito, `i < 2` funcionaría como guarda e imprimiría «fin».' },

      { t: 'razonada', u: [6], titulo: 'Valor-resultado con la misma variable', tema: 'Ñe’ẽ · R3 valor-resultado', lang: 'Ñe’ẽ',
        code: `func ajustar(a, b)
    a = a + 1
    b = b * 10

// programa principal
var x = 2
ajustar(x, x)
imprimir(x)`,
        q: '¿Qué imprime?',
        o: [
          { t: '`20`', ok: true, por: 'a = 3 y b = 20 en sus copias; al volver se copian de izquierda a derecha y gana la última: 20.' },
          { t: '`30`', por: 'Ese es el resultado por referencia: a = x deja x en 3 y b = x * 10 lee ese 3.' },
          { t: '`3`', por: 'Saldría si la copia de vuelta fuera de derecha a izquierda: primero x = 20 y después x = 3.' },
          { t: '`2`', por: 'Ese es el paso por valor: no se copia nada de vuelta.' }
        ],
        concepto: { o: ['R3 · paso por valor-resultado', 'Paso por referencia', 'Paso por valor', 'R1 · sin precedencia'], a: 0 },
        porque: [
          { k: 'completa', t: 'a y b reciben copias de x (2). Dentro, a = 3 y b = 20; x no cambia mientras la función corre. Al terminar se copian de vuelta de izquierda a derecha: primero x = 3, después x = 20, y queda la última copia.', fb: 'Distingue lo que pasa durante la función y al terminar, y el orden de la copia.' },
          { k: 'incompleta', t: 'Porque al final se copia el valor de b.', fb: 'Dice qué copia gana, pero no por qué (orden de izquierda a derecha) ni qué valor tiene b.' },
          { k: 'error', t: 'Porque a y b son el mismo x, y la última asignación, `b = b * 10`, es la que gana.', fb: 'Si a y b fueran x (referencia), b * 10 leería el 3 y daría 30. En valor-resultado son copias distintas.' }
        ],
        modelo: 'R3: a y b son copias de x (2). a = 3, b = 20. Al terminar se copian de vuelta de izquierda a derecha: x = 3 y luego x = 20. Por referencia daría 30; por valor, 2.' },

      { t: 'razonada', u: [6], titulo: '¿Cuándo vuelve la copia?', tema: 'Ñe’ẽ · R3 momento de la copia', lang: 'Ñe’ẽ',
        code: `var s = 1

func mirar()
    imprimir(s)

func poner(p)
    p = 9
    mirar()

// programa principal
poner(s)
imprimir(s)`,
        q: '¿Qué imprime?',
        o: [
          { t: '`1` y `9`', ok: true, por: 'Mientras poner corre, s sigue en 1; la copia vuelve recién al terminar.' },
          { t: '`9` y `9`', por: 'Ese es el resultado por referencia: p sería s desde el principio.' },
          { t: '`1` y `1`', por: 'Ese es el paso por valor: en valor-resultado la copia sí vuelve al terminar.' },
          { t: '`9` y `1`', por: 'La s global no puede valer 9 durante la función y volver a 1 después.' }
        ],
        concepto: { o: ['R3 · valor-resultado: la copia vuelve al terminar', 'Paso por referencia', 'Alcance dinámico', 'R2 · evaluación completa'], a: 0 },
        porque: [
          { k: 'completa', t: 'Con valor-resultado, p es una copia de s: `p = 9` cambia solo la copia. Cuando mirar() imprime, poner todavía no terminó, así que s sigue en 1. Al terminar poner se copia 9 de vuelta y la última línea imprime 9.', fb: 'Ubica el momento de la copia de vuelta respecto de cada impresión.' },
          { k: 'incompleta', t: 'Porque el valor se copia de vuelta al final.', fb: 'Es la clave, pero no la conecta con lo que imprime mirar().' },
          { k: 'error', t: 'Porque mirar() tiene alcance estático y por eso ve una versión vieja de s, que Ñe’ẽ guardó antes de llamar a poner. Recién cuando poner termina se actualiza esa versión guardada con el 9, y por eso la primera vez se ve 1 y la segunda vez se ve 9.', fb: 'mirar ve la s global (alcance estático), y la s global de verdad vale 1 en ese momento: no hay ninguna «versión vieja» guardada.' }
        ],
        modelo: 'R3: p es copia de s. Durante poner, s sigue en 1 → mirar imprime 1. Al terminar, p (9) se copia a s → imprimir(s) da 9. Por referencia, las dos darían 9.' }
    ],
    trazas: [
      { t: 'traza', u: [2, 5, 6], titulo: 'Ñe’ẽ: completa la traza', tema: 'Ñe’ẽ · traza con variantes',
        programa: ` 1  var n = 2
 2
 3  func avisar(v)
 4      imprimir(v)
 5      devolver v
 6
 7  func doblar(a, b)
 8      a = a * 2
 9      b = b + a
10
11  // programa principal
12  imprimir(1 + n * 3)
13  si avisar(0) > 0 y avisar(5) > 0
14      imprimir("entra")
15  doblar(n, n)
16  imprimir(n)`,
        filas: [
          { nombre: 'Original (R1, R2 y R3)', v: ['9', '0', '5', '6'],
            exp: 'Línea 12 sin precedencia: (1 + 2) * 3 = 9. Línea 13: avisar(0) imprime 0 y la comparación da falso, pero R2 evalúa igual el otro lado: avisar(5) imprime 5. Falso y verdadero es falso: no entra. doblar recibe copias (a = 2, b = 2): a = 4, b = 2 + 4 = 6; al terminar se copian de vuelta de izquierda a derecha: n = 4 y después n = 6.' },
          { nombre: 'Variante 1 · R1 cambia a la precedencia habitual', desc: '* y / antes que + y −.', v: ['7', '0', '5', '6'],
            exp: '1 + (2 * 3) = 7. El resto no cambia.' },
          { nombre: 'Variante 2 · R2 cambia a cortocircuito', desc: 'Si el lado izquierdo ya decide el resultado, el derecho no se evalúa.', v: ['9', '0', '6', '—'],
            exp: 'Como el lado izquierdo del `y` ya es falso, avisar(5) no se llama: el 5 no se imprime. Por eso el 6 de doblar pasa a ser el 3er valor y el 4° queda vacío (—).' },
          { nombre: 'Variante 3 · R3 cambia a paso por referencia', desc: 'El parámetro es otro nombre de la variable que se pasó.', v: ['9', '0', '5', '8'],
            exp: 'a y b son alias de n: a = 2 * 2 deja n en 4; b = b + a lee n dos veces: 4 + 4 = 8.' }
        ],
        d2: { t: 'elige', titulo: 'D2 · Explica una diferencia', leyenda: 'Elige la explicación que usa bien alias y copia',
          q: '¿Por qué el 4° valor de la fila «Original» (6) es distinto del 4° valor de la Variante 3 (8)? Usa las palabras **alias** y **copia**.',
          porque: [
            { k: 'completa', t: 'En el original (valor-resultado) a y b son copias de n: a = 4, b = 2 + 4 = 6, y al terminar se copian de vuelta de izquierda a derecha, así que gana la última: n = 6. En la Variante 3 (referencia) a y b son dos alias de n: a = a * 2 deja n en 4 y b = b + a lee ese 4 dos veces: 8.', fb: 'Sigue las dos líneas de doblar con cada mecanismo.' },
            { k: 'incompleta', t: 'En el original doblar deja a n en 6 y en la Variante 3 la deja en 8. La diferencia aparece en la línea 9, cuando b se suma con a: en el original da 6 y en la Variante 3 da 8, y por eso el último número que se imprime no es el mismo en las dos filas de la tabla, aunque la función doblar y la llamada de la línea 15 sean exactamente iguales.', fb: 'Narra dónde aparece la diferencia, pero no usa alias ni copia ni explica por qué b + a da distinto.' },
            { k: 'error', t: 'Porque en la Variante 3 doblar se ejecuta dos veces, una por cada parámetro.', fb: 'doblar se ejecuta una sola vez. Lo que se duplica es la cantidad de nombres para n.' }
          ],
          modelo: 'Original: a y b son copias (2 y 2) → a = 4, b = 6; al volver, n = 4 y luego n = 6. Variante 3: a y b son alias de n → n = 4 y luego n = 4 + 4 = 8.' },
        d3: { t: 'elige', titulo: 'D3 · Decide como diseñador', leyenda: 'Elige el argumento mejor construido (puede haber más de una decisión válida)',
          q: 'Si fueras el diseñador de Ñe’ẽ, ¿mantendrías R1 (sin precedencia)? Decide y justifica con dos criterios de la U2 conectados con este programa.',
          porque: [
            { k: 'completa', t: 'No la mantendría. Legibilidad: `1 + n * 3` da 9 y cualquiera que sabe matemática lee 7; el código dice una cosa y hace otra. Confiabilidad: una fórmula copiada de un libro o de una planilla da otro resultado sin ningún error ni aviso.', fb: 'Decide, nombra dos criterios y los conecta con la línea 12.' },
            { k: 'completa', t: 'La mantendría. Simplicidad y regularidad: hay una sola regla para todos los operadores (izquierda a derecha) y no hay tabla de precedencias que memorizar; así funciona, por ejemplo, Smalltalk. A cambio, para escribir la línea 12 como en matemática hay que poner paréntesis: `1 + (n * 3)`.', fb: 'Decide, nombra criterios y los conecta con la línea 12. La decisión contraria también vale si se justifica así.' },
            { k: 'incompleta', t: 'No, porque es raro y confunde a los programadores.', fb: 'Decide, pero sin criterios de la U2 ni conexión con el programa.' },
            { k: 'error', t: 'Sí la mantendría, porque sin precedencia el programa se ejecuta más rápido: el compilador no tiene que ordenar los operadores ni revisar una tabla de precedencias en cada expresión, y además no se puede equivocar al calcular, así que se ganan a la vez eficiencia y confiabilidad en líneas como la 12, donde se mezclan suma y multiplicación.', fb: 'La eficiencia no cambia: el costo de calcular es el mismo. La regla cambia qué se calcula, no cuánto cuesta.' }
          ] },
        terminaste: 'tienes las 16 celdas completas (incluido el — de la Variante 2), D2 usa alias y copia, y D3 conecta dos criterios con la línea 12.' }
    ]
  }
};

/* Para que cada traza sepa a qué lenguaje pertenece */
Object.values(LENGUAJES).forEach(L => L.trazas.forEach(tz => { tz.leng = L; }));
