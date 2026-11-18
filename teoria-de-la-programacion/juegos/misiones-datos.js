/* =========================================================
   Misiones del repaso · Teoría de la Programación
   Los ejercicios de las guías de repaso (Parte 1 y Parte 2) y del
   Repaso 1, convertidos en misiones: predice, justifica y ejecuta.
   Cada salida registrada se obtuvo ejecutando el código (Python, Java, C).
   ========================================================= */

const MUNDOS = [
  { n: 1, nombre: 'Guía de repaso · Parte 1', unidades: 'U1 a U6', sello: 'Sello de la semántica' },
  { n: 2, nombre: 'Guía de repaso · Parte 2', unidades: 'U7 · U8 · Kuarahy', sello: 'Sello de objetos y funciones' },
  { n: 3, nombre: 'Repaso 1 · casos', unidades: 'U3 a U8', sello: 'Sello del análisis' }
];

const CPT_PASO = ['Paso por compartición: mutar vs. reasignar', 'Paso por referencia', 'Paso por valor-resultado', 'Alcance dinámico'];

const MISIONES = [
  /* ===================== MUNDO 1 ===================== */
  { id: 'm1', mundo: 1, ada: 'Las tres líneas preguntan lo mismo. Fíjate en cómo lo preguntan.', pista: 'Ninguna línea da error. Lo interesante es cómo se escribe cada una.',
    item: { t: 'razonada', u: [2], titulo: 'Tres formas de contar', tema: 'Regularidad: uniformidad', lang: 'Java',
      code: `int[] arr = {1, 2};
String s = "ab";
List<Integer> l = new ArrayList<>();
System.out.println(arr.length + " " + s.length() + " " + l.size());`,
      q: '¿Qué imprime?',
      o: [
        { t: '`2 2 0`', ok: true, por: 'Dos elementos en el arreglo, dos caracteres en el texto y una lista vacía.' },
        { t: '`2 2 2`', por: 'l es una lista nueva y vacía: size() da 0.' },
        { t: 'No compila: `arr.length` necesita paréntesis como los otros', por: 'Compila: en un arreglo length es un atributo y en String es un método. Esa diferencia es justamente lo irregular.' },
        { t: '`1 1 0`', por: 'length cuenta elementos, no el último índice.' }
      ],
      concepto: { o: ['Falta de uniformidad (regularidad)', 'Ortogonalidad', 'Tipado estático', 'Sobrecarga'], a: 0 },
      porque: [
        { k: 'completa', t: 'Las tres líneas preguntan lo mismo (cuántos elementos hay), pero Java usa tres formas distintas: el atributo `length` en el arreglo, el método `length()` en String y `size()` en la lista. Cosas que hacen lo mismo se escriben distinto: falta de uniformidad, que obliga a memorizar casos especiales.', fb: 'Nombra el principio y señala las tres formas.' },
        { k: 'incompleta', t: 'Porque en Java cada tipo tiene su propia manera de dar el tamaño.', fb: 'Describe el fenómeno, pero no nombra el principio ni por qué es un problema.' },
        { k: 'error', t: 'Porque Java es débilmente tipado y por eso cada tipo de dato devuelve su tamaño de una manera diferente, según cómo convierte el valor.', fb: 'Java es fuertemente tipado, y esto no tiene que ver con tipos: es una decisión de diseño del lenguaje (regularidad).' }
      ],
      modelo: 'Falta de uniformidad: la misma pregunta («¿cuántos hay?») se escribe `arr.length`, `s.length()` y `l.size()`. Un lenguaje más regular usaría una sola forma, como `len()` en Python.' },
    ejec: { lang: 'Java', salida: '2 2 0' } },

  { id: 'm2', mundo: 1, ada: 'f termina antes de que se llame a h(). ¿Qué queda vivo después?', pista: '¿Dónde fue escrita g? Busca x ahí primero.',
    item: { t: 'razonada', u: [3], titulo: 'La x que sobrevive', tema: 'Alcance estático y clausura', lang: 'Python',
      code: `x = 10
def f():
    x = 20
    def g():
        return x
    return g

h = f()
x = 30
print(h())`,
      q: '¿Qué imprime?',
      o: [
        { t: '`20`', ok: true, por: 'g usa la x de f, donde fue escrita, y esa x sigue viva en la clausura.' },
        { t: '`30`', por: 'Eso pasaría con alcance dinámico: g buscaría x en quien la llama (el programa principal), donde x ya vale 30.' },
        { t: '`10`', por: 'La x global ya vale 30, y además g no usa la global.' },
        { t: 'Error: f ya terminó', por: 'La x de f sigue viva porque g la recuerda (clausura).' }
      ],
      concepto: { o: ['Alcance estático + clausura', 'Alcance dinámico', 'Tipado dinámico', 'Paso por referencia'], a: 0 },
      porque: [
        { k: 'completa', t: 'g busca x donde fue escrita (alcance estático): en f, donde x = 20. Aunque f ya terminó cuando se ejecuta h(), esa x sigue viva porque g la recuerda (clausura): su tiempo de vida es más largo que la ejecución de f. La x = 30 global no se usa.', fb: 'Combina alcance y tiempo de vida.' },
        { k: 'incompleta', t: 'Primero se crea x con 10, después f crea otra x con 20 y devuelve g, después la x de afuera pasa a 30, y cuando se llama a h() aparece 20 en la pantalla, que es el valor que tenía x adentro de f cuando se la creó, y no el 30 que tiene la x de afuera en ese momento.', fb: 'Narra la ejecución, pero no nombra el alcance estático ni explica por qué la x de f sigue existiendo.' },
        { k: 'error', t: 'Porque g se ejecuta antes de que la x global cambie a 30.', fb: 'g se ejecuta después (en `print(h())`). No es una cuestión de orden: g nunca usa la global.' }
      ],
      modelo: 'Alcance estático: g busca x en f (donde fue escrita) → 20. Clausura: la x de f sigue viva después de que f terminó porque g la referencia. Con alcance dinámico daría 30.' },
    ejec: { lang: 'Python', salida: '20' } },

  { id: 'm3', mundo: 1, ada: 'contador existe en el programa. Y aun así, error. ¿Por qué?', pista: '`contador += 1` es una asignación. ¿Qué hace Python con los nombres que se asignan dentro de una función?',
    item: { t: 'razonada', u: [3], titulo: 'El contador que no cuenta', tema: 'Asignación que vuelve local un nombre', lang: 'Python',
      code: `contador = 0
def sumar():
    contador += 1
sumar()`,
      q: '¿Qué pasa al ejecutarlo?',
      o: [
        { t: 'UnboundLocalError', ok: true, por: 'contador es local de sumar por la asignación, y se lee antes de tener valor.' },
        { t: 'Nada: contador pasa a 1', por: 'Sin `global contador`, la asignación hace que contador sea local en sumar.' },
        { t: 'NameError: contador no existe', por: 'Existe como global; el error dice que la local no tiene valor todavía.' },
        { t: 'Imprime `0`', por: 'No hay ningún print, y además hay un error.' }
      ],
      concepto: { o: ['Alcance: la asignación vuelve local al nombre', 'Tiempo de vida', 'Paso por valor', 'Tipado fuerte'], a: 0 },
      porque: [
        { k: 'completa', t: '`contador += 1` es una asignación, así que Python liga contador como local de sumar (lo decide al traducir la función). Para calcular contador + 1 lee esa local, que todavía no tiene valor: UnboundLocalError. La global existe, pero no se usa sin `global contador`.', fb: 'Explica la ligadura y cuándo se decide.' },
        { k: 'incompleta', t: 'Porque falta poner `global contador`.', fb: 'Es el arreglo, pero no explica por qué sin él falla.' },
        { k: 'error', t: 'Porque contador es una variable global, y en Python las funciones no pueden leer variables globales: solo pueden usar sus parámetros y las variables que crean adentro. Como sumar no recibe contador como parámetro y tampoco lo creó antes de usarlo, Python no encuentra ninguna variable con ese nombre y lanza el error.', fb: 'Sí pueden leerlas si no las asignan. El problema es la asignación.' }
      ],
      modelo: 'Ligadura y alcance: como sumar asigna contador, Python lo trata como local en toda la función. Se lee esa local sin valor → UnboundLocalError. Con `global contador` usaría la global.' },
    ejec: { lang: 'Python', salida: "UnboundLocalError: cannot access local variable 'contador' where it is not associated with a value" } },

  { id: 'm4', mundo: 1, ada: 'Mismos números, mismo texto, distinto orden. ¿Mismo resultado?', pista: 'El + de Java se resuelve de izquierda a derecha. ¿Cuándo aparece el texto en cada línea?',
    item: { t: 'razonada', u: [4, 5], titulo: 'Texto y números en Java', tema: 'Conversión a String y asociatividad', lang: 'Java',
      code: `System.out.println("1" + 2 + 3);
System.out.println(1 + 2 + "3");`,
      q: '¿Qué imprime?',
      o: [
        { t: '`123` y `33`', ok: true, por: 'Izquierda a derecha: en la 1ª el texto está desde el principio; en la 2ª primero se suman 1 y 2.' },
        { t: '`6` y `6`', por: 'Java no convierte el texto a número: convierte el número a texto.' },
        { t: '`123` y `123`', por: 'En la 2ª, 1 + 2 se resuelve como suma de int antes de que aparezca el texto.' },
        { t: '`6` y `33`', por: 'La 1ª empieza con un texto: "1" + 2 ya es "12".' }
      ],
      concepto: { o: ['Conversión a String + asociatividad izquierda', 'Sobrecarga de métodos', 'Ligadura dinámica', 'Tipado dinámico'], a: 0 },
      porque: [
        { k: 'completa', t: 'El + se evalúa de izquierda a derecha y, si uno de los operandos es String, Java convierte el otro a texto y los une. En `"1" + 2 + 3` el texto aparece primero: "12" y luego "123". En `1 + 2 + "3"` primero 1 + 2 es una suma de int (3) y recién después 3 + "3" da "33".', fb: 'Combina la conversión con el orden de evaluación.' },
        { k: 'incompleta', t: 'En la primera línea se escribe el "1" y al lado se van pegando el 2 y el 3, y queda 123. En la segunda línea primero se hace 1 + 2, que da 3, y después se le pega el "3" que está al final, y queda 33. Por eso las dos líneas no muestran lo mismo, aunque tengan los mismos números y el mismo texto.', fb: 'Narra lo que hace el código, pero no nombra el concepto ni explica por qué pasa. Contar la traza no alcanza: es una justificación incompleta.' },
        { k: 'error', t: 'Porque Java convierte toda la línea a texto en cuanto encuentra un String en cualquier lugar de la expresión.', fb: 'Si fuera así, la 2ª daría "123". La conversión ocurre en cada + de a dos.' }
      ],
      modelo: 'Asociatividad izquierda + conversión a String: ("1" + 2) + 3 = "12" + 3 = "123"; (1 + 2) + "3" = 3 + "3" = "33".' },
    ejec: { lang: 'Java', salida: '123\n33' } },

  { id: 'm5', mundo: 1, ada: 'C no se queja de nada. Eso no significa que no esté haciendo cosas raras.', pista: '%d muestra un número entero. ¿Qué tipo tienen 7 y 2?',
    item: { t: 'razonada', u: [4], titulo: 'C y sus caracteres', tema: 'Tipado débil y división entera en C', lang: 'C',
      code: `char c = 'A';
printf("%d\\n", c + 1);
printf("%d\\n", 7 / 2);`,
      q: '¿Qué imprime?',
      o: [
        { t: '`66` y `3`', ok: true, por: '\'A\' vale 65 como entero; 7 / 2 entre int es división entera.' },
        { t: '`B` y `3.5`', por: '%d muestra el número, no la letra; y 7 / 2 entre enteros no da decimales.' },
        { t: '`66` y `3.5`', por: '7 y 2 son int: la división descarta la parte decimal.' },
        { t: '`B` y `3`', por: 'Con %d se ve el número del carácter (66), no la letra.' }
      ],
      concepto: { o: ['Conversión implícita (tipado débil) y división entera', 'Tipado fuerte', 'Sobrecarga', 'Alcance'], a: 0 },
      porque: [
        { k: 'completa', t: 'C promueve el char \'A\' a int (65) sin aviso y suma: 66, que %d muestra como número. En 7 / 2 los dos operandos son int, así que la división es entera y se descarta la parte decimal: 3.', fb: 'Explica las dos líneas con el tipo de cada operando.' },
        { k: 'incompleta', t: 'Porque en C los caracteres son números.', fb: 'Explica la mitad de la primera línea: falta el 66 y la división entera.' },
        { k: 'error', t: 'Porque C redondea las divisiones hacia abajo y, antes de sumar, convierte cada letra en su posición dentro del abecedario y le suma 64 para dejarla en el rango de los caracteres imprimibles; por eso aparecen el 66 y el 3.', fb: 'No redondea: descarta la parte decimal porque ambos son int. Y \'A\' vale 65 (su código), no su posición.' }
      ],
      modelo: 'Tipado débil: \'A\' se promueve a int (65) y 65 + 1 = 66. División entera: int / int descarta decimales → 3.' },
    ejec: { lang: 'C', salida: '66\n3' } },

  { id: 'm6', mundo: 1, ada: 'b = a y u = t se parecen mucho. Los resultados, no tanto.', pista: '¿Qué tipo se puede modificar después de creado: la lista o la tupla?',
    item: { t: 'razonada', u: [4, 6], titulo: 'Mutable o inmutable', tema: 'Referencias, mutable e inmutable', lang: 'Python',
      code: `a = [1, 2]
b = a
b.append(3)
print(a)
t = (1, 2)
u = t
u += (3,)
print(t, u)`,
      q: '¿Qué imprime?',
      o: [
        { t: '`[1, 2, 3]` y `(1, 2) (1, 2, 3)`', ok: true, por: 'a y b son la misma lista; u += crea otra tupla y t no cambia.' },
        { t: '`[1, 2]` y `(1, 2) (1, 2, 3)`', por: 'b = a no copia: b es otra referencia a la misma lista.' },
        { t: '`[1, 2, 3]` y `(1, 2, 3) (1, 2, 3)`', por: 'La tupla es inmutable: u += (3,) crea una tupla nueva y religa u; t sigue con la vieja.' },
        { t: 'Error: las tuplas no admiten +=', por: '+= funciona: no modifica la tupla, crea una nueva.' }
      ],
      concepto: { o: ['Referencias a objetos mutables e inmutables', 'Paso por valor', 'Alcance', 'Tipado débil'], a: 0 },
      porque: [
        { k: 'completa', t: 'a y b son dos referencias a la misma lista, que es mutable: append la modifica y el cambio se ve por a. La tupla es inmutable: `u += (3,)` no puede modificarla, así que crea una tupla nueva y religa solo u; t sigue con la original (1, 2).', fb: 'Usa referencia, mutable e inmutable, como pide la guía.' },
        { k: 'incompleta', t: 'Después de b.append(3), cuando se imprime a aparece [1, 2, 3], aunque el append se hizo con b. En cambio, después de u += (3,), cuando se imprime t sigue apareciendo (1, 2) y solo u muestra (1, 2, 3). Con la lista el cambio se ve por los dos nombres y con la tupla no.', fb: 'Narra lo que hace el código, pero no nombra el concepto ni explica por qué pasa. Contar la traza no alcanza: es una justificación incompleta.' },
        { k: 'error', t: 'Porque `b = a` copia la lista y después Python sincroniza las dos copias cada vez que una cambia; con las tuplas no lo hace.', fb: 'No hay copias que sincronizar: hay una sola lista con dos nombres.' }
      ],
      modelo: 'Referencia: b = a no copia; append muta la única lista → a = [1, 2, 3]. Inmutable: u += (3,) crea otra tupla y religa u → t = (1, 2), u = (1, 2, 3).' },
    ejec: { lang: 'Python', salida: '[1, 2, 3]\n(1, 2) (1, 2, 3)' } },

  { id: 'm7', mundo: 1, ada: 'Cuenta cuántas veces aparece «evalúa». Ahí está la respuesta.', pista: 'Con and, si el primero es falso, ¿hace falta mirar el segundo? Y en la última línea: ** va antes que * y //.',
    item: { t: 'razonada', u: [5], titulo: '¿Quién se evalúa?', tema: 'Cortocircuito y precedencia', lang: 'Python',
      code: `def avisa(n):
    print("evalúa", n)
    return n

print(avisa(0) and avisa(1))
print(avisa(0) or avisa(2))
print(2 + 3 * 4 ** 2 // 5)`,
      q: '¿Qué líneas se imprimen, en orden?',
      o: [
        { t: '`evalúa 0` · `0` · `evalúa 0` · `evalúa 2` · `2` · `11`', ok: true, por: 'and corta con el 0; or necesita el segundo; la cuenta da 11.' },
        { t: '`evalúa 0` · `evalúa 1` · `0` · `evalúa 0` · `evalúa 2` · `2` · `11`', por: 'and no evalúa avisa(1): con 0 (falso) el resultado ya está decidido.' },
        { t: '`evalúa 0` · `False` · `evalúa 0` · `evalúa 2` · `True` · `11`', por: 'and y or devuelven uno de los operandos, no True o False.' },
        { t: '`evalúa 0` · `0` · `evalúa 0` · `evalúa 2` · `2` · `80`', por: '80 es resolver de izquierda a derecha sin precedencia (como en Ñe’ẽ). En Python ** va primero, después * y //, y al final +.' }
      ],
      concepto: { o: ['Cortocircuito y precedencia', 'Evaluación perezosa de generadores', 'Tipado dinámico', 'Paso por referencia'], a: 0 },
      porque: [
        { k: 'completa', t: 'and con cortocircuito: avisa(0) devuelve 0, que es falso, así que el resultado ya está decidido y avisa(1) nunca se llama; and devuelve ese 0. En el or, avisa(0) es falso, entonces sí evalúa avisa(2) y devuelve 2. En la última línea manda la precedencia: 4 ** 2 = 16, 3 * 16 = 48, 48 // 5 = 9 y 2 + 9 = 11.', fb: 'Explica las tres líneas con su concepto.' },
        { k: 'incompleta', t: 'Porque Python tiene cortocircuito.', fb: 'Nombra el concepto, pero no lo aplica a cada línea ni explica el 11.' },
        { k: 'error', t: 'Porque Python evalúa primero el lado derecho de and y de or, y si ese lado da falso, ya no evalúa el izquierdo.', fb: 'Se evalúa de izquierda a derecha. Si fuera al revés, se vería «evalúa 1».' }
      ],
      modelo: 'Cortocircuito: `0 and …` no evalúa avisa(1); `0 or …` sí evalúa avisa(2). Precedencia: ** > * y // > +: 2 + ((3 * 16) // 5) = 2 + 9 = 11.' },
    ejec: { lang: 'Python', salida: 'evalúa 0\n0\nevalúa 0\nevalúa 2\n2\n11' } },

  { id: 'm8', mundo: 1, ada: 'Un else pegado a un for. Raro, ¿no? Python lo permite.', pista: '¿Cuándo se ejecuta el else de un for: cuando hay break o cuando no lo hay?',
    item: { t: 'razonada', u: [5], titulo: 'El else del for', tema: 'for-else y break', lang: 'Python',
      code: `for n in [3, 5, 7]:
    if n % 2 == 0:
        print("par", n)
        break
else:
    print("sin pares")`,
      q: '¿Qué imprime?',
      o: [
        { t: '`sin pares`', ok: true, por: 'El for termina sin break, y en ese caso se ejecuta el else.' },
        { t: 'Nada', por: 'El else del for se ejecuta cuando el bucle termina sin break.' },
        { t: '`sin pares` tres veces', por: 'El else no es parte del cuerpo: se ejecuta una sola vez, al final.' },
        { t: 'Error de sintaxis: un for no puede tener else', por: 'Python lo permite: es una forma de saber si el bucle terminó sin break.' }
      ],
      concepto: { o: ['Enunciados de control: for-else y break', 'Guarda', 'Cortocircuito', 'Excepción'], a: 0 },
      porque: [
        { k: 'completa', t: 'Ningún número de [3, 5, 7] es par, así que el if nunca ejecuta el break y el for recorre toda la lista. En Python, el else de un for se ejecuta justamente cuando el bucle termina sin break: imprime «sin pares» una vez.', fb: 'Explica la regla del for-else aplicada a esta lista.' },
        { k: 'incompleta', t: 'Porque en la lista no hay números pares.', fb: 'Es la causa, pero falta la regla: cuándo se ejecuta el else de un for.' },
        { k: 'error', t: 'Porque el else se ejecuta cada vez que el if da falso, igual que en un if común, y en esta lista el if da falso en todas las vueltas: 3, 5 y 7 son impares, así que en cada una se salta el print del par y se pasa directamente al else.', fb: 'Si fuera así, se imprimiría tres veces. El else pertenece al for, no al if.' }
      ],
      modelo: 'for-else: el else se ejecuta si el for termina sin break. Aquí no hay pares, nunca hay break → «sin pares». Con [3, 4, 7] imprimiría «par 4».' },
    ejec: { lang: 'Python', salida: 'sin pares' } },

  { id: 'm9', mundo: 1, ada: 'Tres cosas cambian adentro de la función. ¿Cuántas se notan afuera?', pista: 'Separa las líneas que modifican un objeto de las que solo cambian a qué apunta un nombre.',
    item: { t: 'razonada', u: [6], titulo: 'Mutar o reasignar', tema: 'Compartición: mutar y reasignar', lang: 'Python',
      code: `def modificar(lista, numero):
    lista.append(numero)
    numero = numero * 2
    lista = [0]
    return numero

datos = [1]
n = 5
r = modificar(datos, n)
print(datos, n, r)`,
      q: '¿Qué imprime?',
      o: [
        { t: '`[1, 5] 5 10`', ok: true, por: 'append muta la lista compartida; las otras dos líneas solo religan parámetros.' },
        { t: '`[0] 5 10`', por: '`lista = [0]` religa el parámetro, no cambia datos.' },
        { t: '`[1, 5] 10 10`', por: '`numero = numero * 2` religa el parámetro: n sigue en 5.' },
        { t: '`[1] 5 10`', por: 'append modifica el objeto compartido: datos cambia.' }
      ],
      concepto: { o: CPT_PASO, a: 0 },
      porque: [
        { k: 'completa', t: 'datos y lista apuntan al mismo objeto: append lo modifica (mutar) y datos queda [1, 5]. `numero = numero * 2` y `lista = [0]` solo religan los parámetros (reasignar): no cambian n ni datos. La función devuelve 10.', fb: 'Clasifica cada línea como mutar o reasignar.' },
        { k: 'incompleta', t: 'Porque append cambia la lista y lo demás no.', fb: 'Dice qué pasa, pero no por qué: falta la diferencia entre mutar el objeto y religar el nombre.' },
        { k: 'error', t: 'Porque Python pasa las listas por referencia y los números por valor: por eso lo que se hace con la lista adentro de la función se ve afuera, y lo que se hace con el número no se ve. La línea lista = [0] no cambia datos porque se ejecuta después del append.', fb: 'Si la lista fuera por referencia, `lista = [0]` cambiaría datos. Python pasa referencias a objetos a todos: lo que cambia es mutar o reasignar.' }
      ],
      modelo: 'Compartición de objetos: lista apunta a la lista de datos; append la muta → [1, 5]. `numero = …` y `lista = [0]` religan parámetros: n = 5. r = 10.' },
    ejec: { lang: 'Python', salida: '[1, 5] 5 10' } },

  { id: 'm10', mundo: 1, ada: 'Dos funciones que intercambian. Solo una lo logra.', pista: '¿Qué recibe cada función: los valores o las direcciones de x e y?',
    item: { t: 'razonada', u: [6], titulo: 'Intercambio en C', tema: 'C: valor y punteros', lang: 'C',
      code: `void cambiar1(int a, int b) { int t = a; a = b; b = t; }
void cambiar2(int *a, int *b) { int t = *a; *a = *b; *b = t; }

int x = 1, y = 2;
cambiar1(x, y);
printf("%d %d\\n", x, y);
cambiar2(&x, &y);
printf("%d %d\\n", x, y);`,
      q: '¿Qué imprime?',
      o: [
        { t: '`1 2` y `2 1`', ok: true, por: 'cambiar1 trabaja con copias; cambiar2 escribe en las direcciones.' },
        { t: '`2 1` y `2 1`', por: 'cambiar1 recibe copias: x e y no cambian.' },
        { t: '`1 2` y `1 2`', por: 'cambiar2 escribe con *a y *b en las direcciones de x e y.' },
        { t: '`2 1` y `1 2`', por: 'cambiar1 no cambia nada, así que cambiar2 parte de 1 y 2.' }
      ],
      concepto: { o: ['C pasa por valor; los punteros simulan la referencia', 'Paso por referencia nativo de C', 'Compartición de objetos', 'Alcance dinámico'], a: 0 },
      porque: [
        { k: 'completa', t: 'C pasa por valor: cambiar1 intercambia sus copias a y b, y x e y no cambian (1 2). En cambiar2 se pasan &x y &y, copias de las direcciones; con *a y *b se escribe en esas direcciones, así que x e y sí se intercambian (2 1).', fb: 'Explica qué se copia en cada caso y qué hace &.' },
        { k: 'incompleta', t: 'Después de llamar a cambiar1, x sigue valiendo 1 e y sigue valiendo 2, así que la primera línea muestra 1 2. Después de llamar a cambiar2 con &x y &y, x pasa a valer 2 e y pasa a valer 1, así que la segunda línea muestra 2 1, con los valores al revés.', fb: 'Narra lo que hace el código, pero no nombra el concepto ni explica por qué pasa. Contar la traza no alcanza: es una justificación incompleta.' },
        { k: 'error', t: 'Porque cambiar1 sí intercambia los valores, pero C los vuelve a su estado anterior al terminar la función para proteger las variables.', fb: 'C no deshace nada: cambiar1 nunca tocó x ni y, solo sus copias.' }
      ],
      modelo: 'Paso por valor: cambiar1 intercambia copias → 1 2. Con & se pasan direcciones (también por valor) y *a / *b escriben en x e y → 2 1.' },
    ejec: { lang: 'C', salida: '1 2\n2 1' } },

  { id: 'm11', mundo: 1, ada: 'Dibuja la pila en un papel antes de responder. Cada llamada es un piso.', pista: 'Cuando se ejecuta f(0), ¿alguna de las llamadas anteriores ya terminó?',
    item: { t: 'razonada', u: [6], titulo: 'La pila de f(3)', tema: 'Registro de activación y pila', lang: 'Python',
      code: `def f(n):
    if n == 0:
        return 0
    return n + f(n - 1)

f(3)`,
      q: '¿Cuántos registros de activación de f hay en la pila justo al llegar a `n == 0`?',
      o: [
        { t: '4: f(3), f(2), f(1) y f(0)', ok: true, por: 'Ninguna llamada terminó: todas esperan el resultado para sumar.' },
        { t: '1: Python reutiliza el mismo registro en cada llamada', por: 'Cada llamada tiene su propio n: necesita su propio registro.' },
        { t: '3: f(0) no cuenta porque no suma nada', por: 'f(0) también es una llamada activa, con su registro.' },
        { t: '0: los registros se crean cuando cada llamada termina', por: 'Se crean al llamar y se liberan al terminar.' }
      ],
      concepto: { o: ['Registro de activación y pila de llamadas', 'Tiempo de vida estático', 'Alcance dinámico', 'Evaluación perezosa'], a: 0 },
      porque: [
        { k: 'completa', t: 'Cada llamada crea su propio registro de activación con su n, su punto de retorno y su suma pendiente. Cuando f(0) se ejecuta, ninguna llamada anterior terminó (todas esperan el resultado para sumar), así que hay 4 registros de f apilados, además del programa principal.', fb: 'Explica qué guarda cada registro y por qué siguen todos.' },
        { k: 'incompleta', t: 'Porque la función se llama cuatro veces.', fb: 'Cuenta las llamadas, pero no explica por qué siguen todas en la pila al mismo tiempo.' },
        { k: 'error', t: 'Porque cada llamada recursiva reemplaza el registro anterior en la pila, pero Python guarda aparte una lista con los cuatro valores de n para poder sumar al final.', fb: 'No hay reemplazo ni lista aparte: cada registro guarda su n y queda apilado hasta que su llamada termina.' }
      ],
      modelo: 'Pila de llamadas: f(3) → f(2) → f(1) → f(0); cada una con su registro (n, retorno, suma pendiente). Al llegar a n == 0 hay 4 registros de f apilados; se liberan al volver: 0, 1, 3, 6.' },
    ejec: { lang: 'Python', nota: 'Se ejecuta una versión que cuenta la profundidad de la pila.', code: `def f(n, prof=1):
    if n == 0:
        print("registros de f en la pila:", prof)
        return 0
    return n + f(n - 1, prof + 1)

print(f(3))`, salida: 'registros de f en la pila: 4\n6' } },

  /* ===================== MUNDO 2 ===================== */
  { id: 'm12', mundo: 2, ada: 'enviar está escrito una sola vez. ¿Cómo sabe qué canal usar?', pista: 'self es el objeto real. ¿En qué clase busca Python canal() y costo()?',
    item: { t: 'razonada', u: [7], titulo: 'Notificaciones', tema: 'Ligadura dinámica en Python', lang: 'Python',
      code: `class Notificacion:
    def __init__(self, destino):
        self.destino = destino
    def costo(self):
        return 0
    def canal(self):
        return "genérica"
    def enviar(self):
        return f"{self.canal()} a {self.destino} (costo {self.costo()})"

class Email(Notificacion):
    def canal(self):
        return "Email"

class SMS(Notificacion):
    def costo(self):
        return 150
    def canal(self):
        return "SMS"

for m in [Email("ana@correo.com"), SMS("0981 123456"), Notificacion("sin destino")]:
    print(m.enviar())`,
      q: '¿Qué tres líneas imprime?',
      o: [
        { t: '`Email a ana@correo.com (costo 0)` · `SMS a 0981 123456 (costo 150)` · `genérica a sin destino (costo 0)`', ok: true, por: 'Cada objeto responde con sus propios canal() y costo().' },
        { t: '`genérica a ana@correo.com (costo 0)` · `genérica a 0981 123456 (costo 0)` · `genérica a sin destino (costo 0)`', por: 'enviar llama a self.canal(): se busca en la clase del objeto real, no en Notificacion.' },
        { t: '`Email a ana@correo.com (costo 0)` · `SMS a 0981 123456 (costo 0)` · `genérica a sin destino (costo 0)`', por: 'SMS redefine costo(): devuelve 150.' },
        { t: 'Error: Email no define costo()', por: 'Email lo hereda de Notificacion.' }
      ],
      concepto: { o: ['Ligadura dinámica (sobrescritura)', 'Sobrecarga', 'Tipado dinámico', 'Clausura'], a: 0 },
      porque: [
        { k: 'completa', t: 'enviar está escrito una sola vez, pero llama a self.canal() y self.costo(); en cada vuelta self es el objeto real, y Python busca esos métodos en su clase al ejecutar: Email redefine canal (y hereda costo: 0), SMS redefine los dos (150) y Notificacion usa los suyos.', fb: 'Explica cómo «sabe» enviar qué llamar.' },
        { k: 'incompleta', t: 'El primer objeto es un Email, que tiene su propio canal() y usa el costo() de Notificacion; el segundo es un SMS, que tiene canal() y costo() propios; y el tercero es una Notificacion común. Por eso cada línea muestra un canal distinto y el SMS es el único que muestra un costo de 150.', fb: 'Describe qué tiene cada clase, pero no explica el mecanismo: cómo «sabe» enviar, escrito una sola vez, qué versión llamar (self y ligadura dinámica).' },
        { k: 'error', t: 'Porque Python copia el método enviar dentro de cada subclase cuando se la crea, y lo adapta a los datos de esa subclase.', fb: 'No hay copias: enviar existe una sola vez y la decisión ocurre en cada llamada, según self.' }
      ],
      modelo: 'Ligadura dinámica: `self.canal()` y `self.costo()` se resuelven al ejecutar, en la clase del objeto real. Agregar WhatsApp = una subclase nueva, sin tocar enviar (extensibilidad).' },
    ejec: { lang: 'Python', salida: 'Email a ana@correo.com (costo 0)\nSMS a 0981 123456 (costo 150)\ngenérica a sin destino (costo 0)' } },

  { id: 'm13', mundo: 2, ada: 'o tiene un texto adentro. ¿Lo sabe el compilador?', pista: 'La sobrecarga se decide antes de ejecutar. ¿Qué sabe el compilador de o?',
    item: { t: 'razonada', u: [7], titulo: 'Sobrecarga en Java', tema: 'Sobrecarga: decide el tipo declarado', lang: 'Java',
      code: `static String que(Object o) { return "Object"; }
static String que(String s) { return "String"; }

Object o = "hola";
System.out.println(que(o));`,
      q: '¿Qué imprime?',
      o: [
        { t: '`Object`', ok: true, por: 'El compilador elige con el tipo declarado de o: Object.' },
        { t: '`String`', por: 'Eso sería si decidiera el objeto real. La sobrecarga la resuelve el compilador con el tipo declarado.' },
        { t: 'No compila: la llamada es ambigua', por: 'No es ambigua: con un argumento declarado Object, solo que(Object) aplica.' },
        { t: '`hola`', por: 'que devuelve un texto fijo, no su argumento.' }
      ],
      concepto: { o: ['Sobrecarga resuelta al compilar (tipo declarado)', 'Ligadura dinámica', 'Tipado dinámico', 'Conversión implícita'], a: 0 },
      porque: [
        { k: 'completa', t: 'que tiene dos versiones sobrecargadas, y la sobrecarga se resuelve al compilar con el tipo declarado del argumento. o está declarada como Object, así que el compilador elige que(Object), aunque en ejecución contenga un String. Por eso aquí no decide el objeto real, a diferencia de la sobrescritura.', fb: 'Nombra el mecanismo, el momento y lo contrasta con la sobrescritura.' },
        { k: 'incompleta', t: 'Porque o está declarada como Object.', fb: 'Es el dato clave, pero falta el mecanismo (sobrecarga) y el momento (compilación).' },
        { k: 'error', t: 'Porque Java convierte el String a Object cuando lo guarda en o, y en esa conversión se pierde el texto original.', fb: 'El objeto sigue siendo un String con «hola». Lo que no cambia es el tipo declarado, que es lo que mira el compilador.' }
      ],
      modelo: 'Sobrecarga = ligadura estática: el compilador elige que(Object) por el tipo declarado de o. La sobrescritura, en cambio, decide en ejecución con el objeto real.' },
    ejec: { lang: 'Java', salida: 'Object' } },

  { id: 'm14', mundo: 2, ada: 'Tres herramientas en fila. Sigue los valores de una a otra.', pista: 'filter elige, map transforma, reduce combina. p // 10 es el 10 % sin decimales.',
    item: { t: 'razonada', u: [8], titulo: 'filter, map y reduce', tema: 'Orden superior: filter, map, reduce', lang: 'Python',
      code: `from functools import reduce
precios = [12000, 8500, 30000, 4500]
caros = list(filter(lambda p: p > 10000, precios))
con_recargo = list(map(lambda p: p + p // 10, caros))
total = reduce(lambda a, b: a + b, con_recargo, 0)
print(caros, con_recargo, total)`,
      q: '¿Qué imprime?',
      o: [
        { t: '`[12000, 30000] [13200, 33000] 46200`', ok: true, por: 'Quedan dos precios, cada uno con 10 % más, y se suman.' },
        { t: '`[12000, 30000] [13200, 33000] 42000`', por: 'reduce suma los valores con recargo, no los originales.' },
        { t: '`[12000, 8500, 30000] [13200, 9350, 33000] 55550`', por: 'filter deja solo los mayores a 10000: 8500 queda afuera.' },
        { t: '`[13200, 33000] [13200, 33000] 46200`', por: 'filter no cambia los valores: solo elige cuáles quedan.' }
      ],
      concepto: { o: ['Funciones de orden superior: filter, map, reduce', 'Evaluación perezosa', 'Recursión', 'Alcance'], a: 0 },
      porque: [
        { k: 'completa', t: 'filter se queda con los precios mayores a 10000: [12000, 30000]. map aplica la lambda a cada uno sin modificar la lista original: 12000 + 1200 y 30000 + 3000. reduce los combina de a dos empezando en 0: 13200 + 33000 = 46200. Ninguna variable cambia de valor.', fb: 'Sigue los datos por las tres funciones.' },
        { k: 'incompleta', t: 'De la lista de precios quedan solo el 12000 y el 30000, que son los mayores a 10000. A cada uno se le suma su décima parte y quedan 13200 y 33000. Después se suman esos dos y da 46200, que se imprime en la misma línea que las dos listas anteriores.', fb: 'Narra lo que hace el código, pero no nombra el concepto ni explica por qué pasa. Contar la traza no alcanza: es una justificación incompleta.' },
        { k: 'error', t: 'Porque map modifica la lista caros en su lugar, y después reduce suma la lista original de precios con los recargos.', fb: 'map no modifica nada: crea valores nuevos. Y reduce suma con_recargo, no precios.' }
      ],
      modelo: 'filter → [12000, 30000]; map (p + p // 10) → [13200, 33000]; reduce (a + b, desde 0) → 46200. Con un for, el acumulador total sería estado mutable.' },
    ejec: { lang: 'Python', salida: '[12000, 30000] [13200, 33000] 46200' } },

  { id: 'm15', mundo: 2, ada: 'multiplicador ya terminó. ¿Dónde vive k?', pista: 'Para la pureza: si alguien cambia descuento, ¿aplicar(100) sigue dando lo mismo?',
    item: { t: 'razonada', u: [8], titulo: 'Clausuras y pureza', tema: 'Clausura y transparencia referencial', lang: 'Python',
      code: `def multiplicador(k):
    return lambda x: x * k

doble = multiplicador(2)
print(doble(21))

descuento = 0.1
def aplicar(p):
    return p - p * descuento`,
      q: '¿Qué imprime `print(doble(21))` y es pura `aplicar`?',
      o: [
        { t: '`42`; aplicar no es pura: lee descuento, una global que puede cambiar', ok: true, por: 'k vive en la clausura; aplicar depende de estado externo mutable.' },
        { t: '`42`; aplicar es pura, porque no modifica ninguna variable ni su parámetro', por: 'No modifica, pero lee estado externo mutable: si descuento cambia, el mismo p da otro resultado.' },
        { t: 'Error: k ya no existe; aplicar es pura', por: 'k sigue viva en la clausura.' },
        { t: '`21`; aplicar no es pura', por: 'k vale 2: doble(21) = 42.' }
      ],
      concepto: { o: ['Clausura y transparencia referencial', 'Sobrecarga', 'Paso por referencia', 'Tipado débil'], a: 0 },
      porque: [
        { k: 'completa', t: 'doble es una clausura: la lambda guarda la ligadura a la k = 2 de multiplicador, que sigue viva aunque multiplicador terminó, así que doble(21) = 42. aplicar no modifica nada, pero lee descuento, una global mutable: si alguien la cambia, aplicar(100) devuelve otro valor con la misma entrada y pierde transparencia referencial.', fb: 'Responde las dos preguntas con su concepto.' },
        { k: 'incompleta', t: 'Porque doble multiplica por 2 y aplicar usa una variable global.', fb: 'Describe, pero no explica dónde vive k ni por qué usar una global rompe la pureza.' },
        { k: 'error', t: 'Porque Python copia el valor de k dentro de la lambda al crearla, y toda función que lee una global es impura siempre, aunque nadie la modifique nunca.', fb: 'No hay copia: la lambda guarda la ligadura. Y si la global nunca cambia, el caso es discutible: el problema es que puede cambiar.' }
      ],
      modelo: 'Clausura: k = 2 sobrevive en la lambda → 42. aplicar lee una global mutable: con descuento = 0.1 da 90.0 y con 0.5 da 50.0 para la misma entrada → no es pura. Versión pura: `def aplicar(p, d): return p - p * d`.' },
    ejec: { lang: 'Python', nota: 'Se agrega una prueba: el mismo aplicar(100) antes y después de cambiar descuento.', code: `def multiplicador(k):
    return lambda x: x * k

doble = multiplicador(2)
print(doble(21))

descuento = 0.1
def aplicar(p):
    return p - p * descuento

print(aplicar(100))
descuento = 0.5
print(aplicar(100))`, salida: '42\n90.0\n50.0' } },

  { id: 'm16', mundo: 2, ada: 'Kuarahy no existe. Sus reglas sí: aplícalas aunque parezcan raras.', pista: 'R1: mostrar busca x en quien la llamó. R2: a es otro nombre de la x global. R3: el número se vuelve texto.',
    item: { t: 'razonada', u: [3, 4, 6], titulo: 'El caso Kuarahy', tema: 'Kuarahy: R1, R2 y R3', lang: 'Kuarahy',
      ctx: 'Kuarahy aplica **solo** estas reglas. R1 · alcance dinámico: si una función usa un nombre que no declaró, lo busca en la función que la llamó, y así hasta el programa principal. R2 · paso por referencia: el parámetro es otro nombre de la variable que se pasó. R3 · texto + número: el número se convierte a texto y se unen.',
      code: `var x = 1

func mostrar()
    imprimir(x)

func cambiar(a)
    a = a + 10
    var x = 5
    mostrar()

cambiar(x)
imprimir(x)
imprimir("total: " + x)`,
      q: '¿Qué tres líneas se imprimen?',
      o: [
        { t: '`5` · `11` · `total: 11`', ok: true, por: 'mostrar encuentra la x de cambiar; la global quedó en 11 por el alias.' },
        { t: '`11` · `11` · `total: 11`', por: 'Eso sería con alcance estático: mostrar vería la x global (11). R1 hace que la busque en cambiar, que tiene x = 5.' },
        { t: '`5` · `1` · `total: 1`', por: 'Por R2, a es alias de la x global: a = a + 10 la deja en 11.' },
        { t: '`5` · `11` · `21`', por: 'R3 convierte el número a texto y une: no suma.' }
      ],
      concepto: { o: ['R1 + R2 + R3: alcance dinámico, alias y conversión a texto', 'Solo alcance estático', 'Paso por valor', 'Tipado fuerte'], a: 0 },
      porque: [
        { k: 'completa', t: 'cambiar(x) liga a como alias de la x global (R2): a = a + 10 la deja en 11. Después cambiar declara su propia x = 5 y llama a mostrar, que no declara x: por R1 la busca en quien la llamó, cambiar, y encuentra 5. En el programa principal, x es la global: 11, y R3 convierte 11 a texto y lo une: «total: 11».', fb: 'Usa cada regla en el momento en que actúa.' },
        { k: 'incompleta', t: 'Porque Kuarahy tiene alcance dinámico y paso por referencia.', fb: 'Nombra dos reglas, pero no las aplica a cada línea ni menciona R3.' },
        { k: 'error', t: 'Porque mostrar imprime siempre la última x que se declaró en el programa, que es la de cambiar, y la global cambió porque en Kuarahy las globales se pueden modificar desde cualquier función.', fb: 'R1 busca en la cadena de llamadas, no «la última declarada». Y la global cambió por el alias de R2, no por ser global.' }
      ],
      modelo: 'R2: a es alias de la x global → 11. R1: mostrar busca x en cambiar → 5. Programa principal: x global → 11. R3: "total: " + 11 → "total: 11".' },
    ejec: { lang: 'Kuarahy', nota: 'Kuarahy no existe: esta es la salida que se obtiene aplicando sus reglas. Practica más en «Lenguajes inventados».', salida: '5\n11\ntotal: 11' } },

  /* ===================== MUNDO 3 ===================== */
  { id: 'm17', mundo: 3, ada: 'La misma variable entra dos veces. Cada mecanismo la trata distinto.', pista: 'En valor-resultado, las copias vuelven al terminar, de izquierda a derecha. Gana la última.',
    item: { t: 'razonada', u: [6], titulo: 'Tres mecanismos, una variable', tema: 'Valor, referencia y valor-resultado', lang: 'Pseudocódigo TPR',
      code: `procedimiento ajustar(a, b)
    a ← a + 1
    b ← b * 2
fin

principal
    x ← 3
    ajustar(x, x)
    escribir x
fin`,
      q: '¿Qué se escribe con cada mecanismo? (En valor-resultado, las copias vuelven de izquierda a derecha.)',
      o: [
        { t: 'Valor: `3` · Referencia: `8` · Valor-resultado: `6`', ok: true, por: 'Copias sin vuelta; dos alias de x; copias que vuelven y gana la última.' },
        { t: 'Valor: `3` · Referencia: `8` · Valor-resultado: `8`', por: 'En valor-resultado a y b son copias: a = 4, b = 6; al volver gana b, que vale 6.' },
        { t: 'Valor: `3` · Referencia: `7` · Valor-resultado: `6`', por: 'Por referencia, b ← b * 2 lee el x que a ya dejó en 4: 8.' },
        { t: 'Valor: `4` · Referencia: `8` · Valor-resultado: `6`', por: 'Por valor, nada vuelve a x: 3.' }
      ],
      concepto: { o: ['Mecanismos de paso: valor, referencia y valor-resultado', 'Alcance dinámico', 'Tipado débil', 'Cortocircuito'], a: 0 },
      porque: [
        { k: 'completa', t: 'Por valor, a y b son copias y x queda en 3. Por referencia, a y b son alias de x: a ← a + 1 deja x en 4 y b ← b * 2 lee ese 4: 8. Por valor-resultado, las copias quedan en a = 4 y b = 6, y al terminar se copian de vuelta de izquierda a derecha: x = 4 y después x = 6.', fb: 'Sigue las dos líneas con cada mecanismo.' },
        { k: 'incompleta', t: 'Porque cada mecanismo de paso trata distinto a los parámetros.', fb: 'Verdadero pero vacío: no explica ningún valor.' },
        { k: 'error', t: 'Porque por referencia el procedimiento se ejecuta dos veces, una por cada parámetro que recibe la misma variable, y por eso x se duplica dos veces; y por valor-resultado se suman las dos copias cuando el procedimiento termina y se guarda la mitad de esa suma en x.', fb: 'El procedimiento se ejecuta una vez; y en valor-resultado las copias no se suman: se copian de vuelta y la última pisa a la anterior.' }
      ],
      modelo: 'Valor: copias, x = 3. Referencia: alias (efecto secundario): x = 4, luego 4 * 2 = 8. Valor-resultado: a = 4, b = 6; vuelven en orden → x = 6.' },
    ejec: { lang: 'Pseudocódigo', nota: 'El pseudocódigo no se ejecuta: verifica con la traza de cada mecanismo.', salida: 'Valor: 3\nReferencia: 8\nValor-resultado: 6' } },

  { id: 'm18', mundo: 3, ada: 'Dos tickets, un contador. ¿Cuánto vive cada variable?', pista: 'Una variable local se crea de nuevo en cada llamada. ¿Con qué valor arranca?',
    item: { t: 'razonada', u: [3, 6], titulo: 'El contador del estacionamiento', tema: 'Tiempo de vida: global vs. local', lang: 'Python',
      code: `contador = 0

def crear_ticket(patente):
    global contador
    contador += 1
    numero = contador
    ticket = Ticket(patente, numero)
    return ticket

t1 = crear_ticket("ABC123")
t2 = crear_ticket("XYZ789")`,
      q: '¿Qué valor tiene contador al final? Y si contador fuera local de crear_ticket, ¿qué número tendría t2?',
      o: [
        { t: '2; y si fuera local, t2 tendría el número 1', ok: true, por: 'La global acumula; una local renace en cada llamada.' },
        { t: '2; y si fuera local, también tendría el 2', por: 'Una local se crea de nuevo en cada llamada: arranca en 0 y llega a 1.' },
        { t: '1; y si fuera local, también 1', por: 'Con `global contador`, la misma variable acumula las dos llamadas.' },
        { t: '0; las funciones no cambian variables globales', por: '`global contador` permite modificarla.' }
      ],
      concepto: { o: ['Tiempo de vida: estático vs. de pila', 'Alcance dinámico', 'Paso por valor', 'Sobrecarga'], a: 0 },
      porque: [
        { k: 'completa', t: 'contador es global: vive toda la ejecución y, con `global contador`, cada llamada modifica la misma variable: 1 y después 2. Si fuera local, viviría en el registro de activación de cada llamada: se crearía en 0 al entrar y se perdería al salir, así que t2 también tendría el número 1.', fb: 'Compara los dos tiempos de vida con este código.' },
        { k: 'incompleta', t: 'En la primera llamada contador pasa de 0 a 1 y el ticket de ABC123 recibe el número 1; en la segunda llamada pasa de 1 a 2 y el ticket de XYZ789 recibe el número 2. Si contador estuviera escrito adentro de la función, empezaría en 0 cada vez que se la llama y el segundo ticket también recibiría el 1.', fb: 'Narra bien los dos casos, pero no nombra el concepto (tiempo de vida estático y de pila) ni dónde vive cada variable.' },
        { k: 'error', t: 'Porque una variable local guarda su valor entre una llamada y la siguiente cuando la función se llama dos veces seguidas en el programa.', fb: 'Una local vive en el registro de activación: cuando la llamada termina, se pierde.' }
      ],
      modelo: 'Global (vida estática): 1 → 2. Local (vida de pila): se crea en cada llamada y muere al salir → t2 sería el ticket 1.' },
    ejec: { lang: 'Python', nota: 'Se agrega una clase Ticket mínima y un print para ver los números.', code: `contador = 0

class Ticket:
    def __init__(self, patente, numero):
        self.patente, self.numero = patente, numero

def crear_ticket(patente):
    global contador
    contador += 1
    numero = contador
    ticket = Ticket(patente, numero)
    return ticket

t1 = crear_ticket("ABC123")
t2 = crear_ticket("XYZ789")
print(contador, t1.numero, t2.numero)`, salida: '2 1 2' } },

  { id: 'm19', mundo: 3, ada: 'Cada línea tiene dos decisiones: qué atender y qué sonido. No las toma el mismo.', pista: 'atender está sobrecargado (lo decide el compilador). sonido() está sobrescrito (lo decide el objeto).',
    item: { t: 'razonada', u: [7], titulo: 'La veterinaria', tema: 'Sobrecarga y sobrescritura juntas', lang: 'Java',
      code: `class Animal { String sonido() { return "..."; } }
class Perro extends Animal { String sonido() { return "guau"; } }
class Veterinaria {
    String atender(Animal a) { return "consulta general: " + a.sonido(); }
    String atender(Perro p) { return "consulta canina: " + p.sonido(); }
}

Veterinaria v = new Veterinaria();
Animal a = new Perro();
Perro p = new Perro();
Animal g = new Animal();
System.out.println(v.atender(a));          // (1)
System.out.println(v.atender(p));          // (2)
System.out.println(v.atender(g));          // (3)
System.out.println(v.atender((Animal) p)); // (4)`,
      q: '¿Qué imprime cada línea?',
      o: [
        { t: '(1) `consulta general: guau` · (2) `consulta canina: guau` · (3) `consulta general: ...` · (4) `consulta general: guau`', ok: true, por: 'atender lo elige el tipo declarado; sonido() lo elige el objeto real.' },
        { t: '(1) `consulta canina: guau` · (2) `consulta canina: guau` · (3) `consulta general: ...` · (4) `consulta canina: guau`', por: 'La sobrecarga la elige el compilador con el tipo declarado: a es Animal → atender(Animal).' },
        { t: '(1) `consulta general: ...` · (2) `consulta canina: guau` · (3) `consulta general: ...` · (4) `consulta general: ...`', por: 'sonido() se elige al ejecutar: el objeto es un Perro → guau.' },
        { t: '(1) `consulta general: guau` · (2) `consulta canina: guau` · (3) `consulta general: ...` · (4) `consulta canina: guau`', por: 'El cast (Animal) cambia el tipo declarado: el compilador elige atender(Animal).' }
      ],
      concepto: { o: ['Sobrecarga (compilación) + sobrescritura (ejecución)', 'Solo ligadura dinámica', 'Solo sobrecarga', 'Tipado dinámico'], a: 0 },
      porque: [
        { k: 'completa', t: 'Qué versión de atender se usa lo decide la sobrecarga, al compilar, con el tipo declarado del argumento: en (1) y (4) es Animal → «consulta general». Qué sonido() se ejecuta lo decide la sobrescritura, al ejecutar, con el objeto real: en (1), (2) y (4) es un Perro → «guau»; en (3) es un Animal → «...».', fb: 'Separa las dos decisiones y su momento.' },
        { k: 'incompleta', t: 'Porque Java usa sobrecarga y sobrescritura en el mismo código.', fb: 'Nombra los dos conceptos, pero no dice cuál decide qué ni cuándo.' },
        { k: 'error', t: 'Porque Java decide todo al ejecutar mirando el objeto real, salvo cuando hay un cast, que obliga a usar la versión de la clase Animal.', fb: 'Si todo lo decidiera el objeto real, (1) diría «consulta canina». La elección de atender ocurre al compilar.' }
      ],
      modelo: 'Sobrecarga (estática): atender se elige por el tipo declarado → (1) y (4) general. Sobrescritura (dinámica): sonido() por el objeto real → guau en (1), (2), (4).' },
    ejec: { lang: 'Java', salida: 'consulta general: guau\nconsulta canina: guau\nconsulta general: ...\nconsulta general: guau' } },

  { id: 'm20', mundo: 3, ada: 'Cuatro funciones de una tienda. Una le cambia los datos a quien la llama.', pista: 'Busca una asignación a un elemento del argumento: `algo[i] = …`.',
    item: { t: 'razonada', u: [8], titulo: '¿Quién toca lo que no es suyo?', tema: 'Efecto secundario sobre el argumento', lang: 'Python',
      code: `IVA = 0.10
historial = []

def precio_final(precio):
    return precio * (1 + IVA)

def registrar(precio):
    historial.append(precio)
    return len(historial)

def aplicar_descuento(precios, d):
    for i in range(len(precios)):
        precios[i] = precios[i] * (1 - d)
    return precios

def total(precios):
    return sum(precios)`,
      q: '¿Cuál es impura porque modifica su argumento?',
      o: [
        { t: '`aplicar_descuento`', ok: true, por: 'Asigna `precios[i] = …`: cambia la lista que recibió.' },
        { t: '`registrar`', por: 'Es impura, pero por otra razón: modifica una global (historial), no su argumento.' },
        { t: '`total`', por: 'sum no modifica la lista.' },
        { t: '`precio_final`', por: 'No modifica nada; su pureza depende de que IVA no cambie.' }
      ],
      concepto: { o: ['Efecto secundario sobre el argumento (mutación)', 'Clausura', 'Cortocircuito', 'Sobrecarga'], a: 0 },
      porque: [
        { k: 'completa', t: 'aplicar_descuento recorre precios y asigna `precios[i] = …`: modifica la lista que recibió, que es la misma que tiene quien la llamó. Es un efecto secundario: después de llamarla, el que llamó encuentra su lista cambiada. registrar también es impura, pero porque modifica una global.', fb: 'Señala la línea, nombra el efecto y distingue el otro caso.' },
        { k: 'incompleta', t: 'Porque aplicar_descuento cambia los precios.', fb: 'Falta decir de quién son esos precios (la lista del que llamó) y que eso es un efecto secundario.' },
        { k: 'error', t: 'Porque aplicar_descuento usa un for, y las funciones que tienen bucles no pueden ser puras: cada vuelta del for cambia el valor de i, y una función pura no puede tener ninguna variable que cambie de valor. registrar, total y precio_final no tienen bucles, así que las tres son puras aunque usen variables de afuera.', fb: 'Un bucle puede estar en una función pura si solo usa variables locales. El problema es modificar el argumento.' }
      ],
      modelo: 'Efecto secundario: `precios[i] = …` muta la lista recibida (la misma del que llamó). Versión pura: `return list(map(lambda p: p * (1 - d), precios))`.' },
    ejec: { lang: 'Python', nota: 'Se prueba aplicar_descuento: la lista original cambió y la función devolvió la misma lista.', code: `def aplicar_descuento(precios, d):
    for i in range(len(precios)):
        precios[i] = precios[i] * (1 - d)
    return precios

lista = [100, 200]
nueva = aplicar_descuento(lista, 0.5)
print(lista, nueva, lista is nueva)`, salida: '[50.0, 100.0] [50.0, 100.0] True' } },

  { id: 'm21', mundo: 3, ada: '¿«antes» aparece antes o después de convertir? Ahí está el truco.', pista: 'map y filter no calculan nada hasta que alguien les pide los valores.',
    item: { t: 'razonada', u: [8], titulo: 'Evaluación perezosa', tema: 'map y filter diferidos', lang: 'Python',
      code: `def convertir(c):
    print("convirtiendo", c)
    return c * 9 / 5 + 32

lecturas = [20, 35, 18]
f = map(convertir, lecturas)
print("antes")
calientes = list(filter(lambda x: x > 80, f))
print(calientes)
print(list(f))`,
      q: '¿Qué se imprime, línea por línea?',
      o: [
        { t: '`antes` · `convirtiendo 20` · `convirtiendo 35` · `convirtiendo 18` · `[95.0]` · `[]`', ok: true, por: 'map convierte recién cuando filter pide valores; después queda agotado.' },
        { t: '`convirtiendo 20` · `convirtiendo 35` · `convirtiendo 18` · `antes` · `[95.0]` · `[68.0, 95.0, 64.4]`', por: 'map no convierte al crearse: lo hace cuando filter le pide cada valor. Y un map ya recorrido queda vacío.' },
        { t: '`antes` · `convirtiendo 20` · `convirtiendo 35` · `convirtiendo 18` · `[95.0]` · `[68.0, 95.0, 64.4]`', por: 'list(f) recorre un map que filter ya agotó: [].' },
        { t: '`antes` · `convirtiendo 20` · `convirtiendo 35` · `[95.0]` · `[]`', por: 'filter recorre todos los valores: también se convierte el 18.' }
      ],
      concepto: { o: ['Evaluación perezosa (map y filter diferidos)', 'Evaluación ansiosa', 'Cortocircuito', 'Recursión'], a: 0 },
      porque: [
        { k: 'completa', t: 'map y filter son perezosos: crear f no convierte nada, por eso «antes» sale primero. Recién list(filter(...)) le pide los valores uno por uno y ahí se imprime cada «convirtiendo». Un map se recorre una sola vez: cuando la última línea hace list(f), ya está agotado y da [].', fb: 'Explica el orden de las impresiones y la lista vacía.' },
        { k: 'incompleta', t: 'Primero aparece «antes», después aparecen los tres «convirtiendo», uno por cada lectura, después la lista con el único valor mayor a 80, que es 95.0, y al final una lista vacía. Las temperaturas convertidas son 68.0, 95.0 y 64.4, y solo una de las tres pasa el filtro de calientes.', fb: 'Narra lo que hace el código, pero no nombra el concepto ni explica por qué pasa. Contar la traza no alcanza: es una justificación incompleta.' },
        { k: 'error', t: 'Porque Python ejecuta los print en orden inverso cuando hay funciones de orden superior en el medio del programa.', fb: 'No hay ningún orden inverso: las conversiones se hacen recién cuando filter pide los valores.' }
      ],
      modelo: 'Evaluación perezosa: map no calcula al crearse → «antes» primero; list(filter(...)) consume f y dispara las 3 conversiones; 68.0, 95.0 y 64.4 → solo 95.0 > 80. f quedó agotado → [].' },
    ejec: { lang: 'Python', salida: 'antes\nconvirtiendo 20\nconvirtiendo 35\nconvirtiendo 18\n[95.0]\n[]' } },

  { id: 'm22', mundo: 3, ada: 'Mismo error de diseño en dos lenguajes. Distinto momento para descubrirlo.', pista: 'Java revisa los tipos antes de ejecutar; Python, durante la ejecución.',
    item: { t: 'razonada', u: [3, 4, 7], titulo: 'Ligadura no es tipado', tema: 'Tipado estático/dinámico y ligadura dinámica', lang: 'Java y Python',
      code: `// Java
Vehiculo v = new Ambulancia();
v.encenderSirena();   // (A) Vehiculo no declara encenderSirena()
v.avanzar();          // (B) Ambulancia redefine avanzar()

# Python
v = Ambulancia()
v.encender_sirena()   # (C)
v = Bicicleta()
v.encender_sirena()   # (D) Bicicleta no tiene ese método`,
      q: '¿Qué pasa en (A), (B), (C) y (D)?',
      o: [
        { t: '(A) no compila · (B) se ejecuta avanzar() de Ambulancia · (C) funciona · (D) AttributeError al ejecutar', ok: true, por: 'Java verifica con el tipo declarado al compilar; el método lo elige el objeto real; Python verifica al ejecutar.' },
        { t: '(A) no compila · (B) se ejecuta avanzar() de Vehiculo · (C) funciona · (D) AttributeError al ejecutar', por: 'Ambulancia redefine avanzar: la ligadura dinámica elige la del objeto real.' },
        { t: '(A) funciona porque el objeto es una Ambulancia · (B) avanzar() de Ambulancia · (C) funciona · (D) AttributeError', por: 'Java verifica al compilar con el tipo declarado: Vehiculo no tiene encenderSirena().' },
        { t: '(A) error al ejecutar · (B) avanzar() de Ambulancia · (C) funciona · (D) no se puede ejecutar el programa', por: 'Al revés: Java detecta (A) antes de ejecutar y Python detecta (D) recién al ejecutar esa línea.' }
      ],
      concepto: { o: ['Tipado estático/dinámico (U4) y ligadura dinámica (U3)', 'Sobrecarga', 'Alcance', 'Paso por valor'], a: 0 },
      porque: [
        { k: 'completa', t: 'En Java, el tipo declarado (Vehiculo) decide al compilar qué se puede llamar: (A) no compila porque Vehiculo no declara encenderSirena(). Qué versión se ejecuta lo decide el objeto real en ejecución: (B) usa avanzar() de Ambulancia. Python no verifica antes: (C) funciona y (D) falla recién al ejecutar, con AttributeError, porque Bicicleta no tiene ese método.', fb: 'Separa tipado (cuándo se verifica) de ligadura (qué versión se ejecuta).' },
        { k: 'incompleta', t: 'Porque Java tiene tipado estático y Python tiene tipado dinámico.', fb: 'Es cierto, pero no explica (B), que es ligadura dinámica en un lenguaje estático.' },
        { k: 'error', t: 'Porque Java y Python tienen ligadura dinámica, y por eso los dos detectan el error recién al ejecutar la línea que llama al método inexistente.', fb: 'Java detecta (A) al compilar. Ligadura dinámica y tipado dinámico son cosas distintas.' }
      ],
      modelo: 'Tipado (U4): Java verifica al compilar con el tipo declarado → (A) no compila; Python verifica al ejecutar → (D) AttributeError. Ligadura (U3): el método que se ejecuta lo elige el objeto real → (B) Ambulancia.avanzar(). Ligadura dinámica ≠ tipado dinámico.' },
    ejec: { lang: 'Python', nota: 'Se ejecuta la parte de Python con clases mínimas.', code: `class Ambulancia:
    def encender_sirena(self):
        return "¡uiu uiu!"

class Bicicleta:
    pass

v = Ambulancia()
print(v.encender_sirena())   # (C)
v = Bicicleta()
print(v.encender_sirena())   # (D)`, salida: "¡uiu uiu!\nTraceback (most recent call last):\n  ...\nAttributeError: 'Bicicleta' object has no attribute 'encender_sirena'" } }
];
