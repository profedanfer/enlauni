/* =========================================================
   ISO1 · Casos para el final (niveles N3 a N5 de Bloom)
   Casos NUEVOS, distintos de los trabajados en clase, para
   practicar la transferencia a situaciones no memorizadas.
   Cada caso tiene:
   - preguntas cerradas: { u, n, q, o, a, fb } (fb: devolución por opción)
   - preguntas de desarrollo: { n, q, criterios, restan }
   Lo usan casos.html y el simulacro (modo «Solo casos»).
   En las opciones, la correcta se escribe primero; la página las mezcla.
   ========================================================= */
const NIVELES = { 3: "N3 · Aplicación", 4: "N4 · Análisis", 5: "N5 · Evaluación" };

const CASOS = [
  {
    "id": "tasas",
    "bloque": 1,
    "unidades": [
      1
    ],
    "titulo": "Tasas municipales",
    "texto": "Una municipalidad cobra sus tasas con un sistema hecho hace 22 años por un programador que ya no trabaja ahí. No tiene documentación, y cada cambio de la ordenanza tributaria lo hace un técnico que «prueba hasta que anda». Este año, después de tres cambios seguidos, los recibos empezaron a salir con montos mal redondeados. El intendente quiere una app para pagar desde el celular «en dos meses» y propone: «si hace falta, contratamos cinco programadores más y listo».",
    "preguntas": [
      {
        "u": 1,
        "n": 4,
        "q": "Los recibos con errores aparecieron después de varios cambios seguidos. ¿Qué característica del software explica mejor lo que pasó?",
        "o": [
          "El software se deteriora: los cambios introducen errores nuevos antes de que se corrijan los anteriores.",
          "El software se desgasta con el uso, como el hardware: después de 22 años de cálculos, rinde menos.",
          "Es un problema de dominio: un software de gestión de hace 22 años no está preparado para las reglas actuales.",
          "Es un error de redondeo del lenguaje de programación, que aparece igual se cambie o no el sistema."
        ],
        "a": 0,
        "fb": [
          "Correcto. No es desgaste físico: son los cambios sin control los que acumulan defectos.",
          "El software no se desgasta por factores físicos. Los errores aparecieron con los cambios, no con los años de uso.",
          "El dominio no explica por qué los errores aparecen justo después de los cambios: con las reglas anteriores funcionaba.",
          "Si fuera del lenguaje, habría aparecido antes. Aparece después de los cambios: es deterioro."
        ]
      },
      {
        "u": 1,
        "n": 4,
        "q": "¿Qué mito del software expresa la propuesta del intendente?",
        "o": [
          "«Si nos atrasamos, agregamos más programadores.»",
          "«Una descripción general basta para empezar a programar.»",
          "«Cuando el programa funciona, el trabajo terminó.»",
          "Ninguno: más personas siempre reducen el plazo de forma proporcional."
        ],
        "a": 0,
        "fb": [
          "Correcto. Sumar personas a un proyecto exige tiempo para que se integren y más comunicación: no acelera en proporción.",
          "Ese mito también podría aparecer en el caso («una app en dos meses»), pero la frase citada habla de sumar personas.",
          "La frase del intendente no dice nada sobre dar el trabajo por terminado.",
          "Esa es justamente la creencia equivocada que describe el mito."
        ]
      },
      {
        "u": 1,
        "n": 5,
        "q": "El equipo técnico discute dos caminos: (A) reemplazar el sistema viejo desde cero antes de hacer la app; (B) mantenerlo, documentarlo y conectar la app a él. ¿Qué evaluación es la más sólida?",
        "o": [
          "Entender y documentar primero el sistema heredado, que sostiene un proceso crítico, y con eso decidir si se integra o se reemplaza por partes.",
          "A: un sistema sin documentación y con 22 años no se puede integrar con seguridad, así que conviene reemplazarlo antes.",
          "B: si el sistema todavía cobra, reemplazarlo es un riesgo innecesario para el municipio; alcanza con conectar la app y seguir corrigiendo cada error.",
          "Hacer primero la app, que es lo que pidió el intendente, y dejar la decisión sobre el sistema viejo para una segunda etapa."
        ],
        "a": 0,
        "fb": [
          "Correcto. El software heredado no se descarta por viejo: se evalúa qué tan crítico y qué tan extensible es.",
          "La falta de documentación es un problema real, pero no justifica reemplazar sin entender qué hace hoy el sistema.",
          "El caso muestra que «seguir corrigiendo» sin control es justamente lo que está deteriorando el sistema.",
          "La app depende del cálculo de las tasas: sin entender el sistema viejo, la app hereda sus errores."
        ]
      },
      {
        "u": 1,
        "n": 4,
        "q": "El técnico dice: «la app es solo una pantalla para pagar; no hace falta ingeniería, es software chico». ¿Qué responde mejor la ingeniería de software?",
        "o": [
          "Que también necesita proceso, métodos y control de calidad: se conecta con datos críticos y un error cobra mal.",
          "Que tiene razón en parte: en software chico alcanza con probarlo bien al final, sin un proceso formal.",
          "Que tiene razón si usa un framework moderno, porque el framework ya resuelve la seguridad y la calidad.",
          "Que la app debe hacerse en cascada, porque es un sistema del Estado y necesita aprobar cada etapa."
        ],
        "a": 0,
        "fb": [
          "Correcto. El tamaño de la pantalla no mide el riesgo: lo mide lo que el software toca.",
          "Probar solo al final es lo que ya falló con el sistema viejo; además, la app toca datos críticos.",
          "Una herramienta no reemplaza el proceso ni las pruebas.",
          "El modelo de proceso se elige por las características del proyecto, no por el tipo de organización."
        ]
      }
    ],
    "abiertas": [
      {
        "n": 4,
        "q": "Identifica dos mitos del software que aparecen en el caso (uno de gerencia y uno de la práctica) y explica qué consecuencia concreta tendría cada uno si nadie lo cuestiona.",
        "criterios": [
          "Nombra el mito de gerencia («agregar programadores si nos atrasamos»), ligado a la frase del intendente.",
          "Nombra un mito de la práctica (por ejemplo, «cuando el programa funciona, el trabajo terminó»), ligado a «probar hasta que anda».",
          "Cada consecuencia es concreta para este caso: plazos que no se cumplen, recibos mal emitidos, más deterioro."
        ],
        "restan": [
          "Definir los mitos sin conectarlos con el caso.",
          "Inventar mitos que no se vieron en la Unidad 1."
        ]
      }
    ]
  },
  {
    "id": "laboratorio",
    "bloque": 1,
    "unidades": [
      2
    ],
    "titulo": "Laboratorio de análisis clínicos",
    "texto": "Un laboratorio necesita dos cosas. Primero, un módulo para emitir resultados firmados digitalmente: los formatos los define la normativa sanitaria y no cambian hace años, y un error puede afectar un diagnóstico. Segundo, una app para que los pacientes reserven turno y reciban promociones: el área comercial todavía no sabe qué quiere y espera probar ideas con los pacientes. El equipo es de cuatro personas y trabaja en los dos frentes a la vez. En los últimos proyectos, las pruebas siempre se recortaron al final porque «no quedó tiempo».",
    "preguntas": [
      {
        "u": 2,
        "n": 4,
        "q": "¿Qué enfoque de proceso conviene para el módulo de resultados?",
        "o": [
          "Un enfoque prescriptivo, como cascada: requisitos estables, exigencia normativa y un error muy costoso.",
          "Un modelo evolutivo con prototipos, para que médicos y pacientes validen el formato antes de firmarlo.",
          "Un proceso ágil, porque las entregas cortas y frecuentes detectan antes los errores de un diagnóstico.",
          "Cualquiera, siempre que haya pruebas: lo que asegura la calidad son las pruebas, no el modelo de proceso."
        ],
        "a": 0,
        "fb": [
          "Correcto. Es la situación en que se justifica un enfoque prescriptivo: requisitos estables, exigencias normativas y alto costo del error.",
          "El formato ya lo define la normativa: no hay nada que validar con prototipos.",
          "Detectar antes ayuda, pero aquí los requisitos no cambian y la normativa pide documentación formal y trazabilidad.",
          "Las pruebas son parte del proceso: el proceso define cuándo se revisa, qué se documenta y cómo se controla el cambio."
        ]
      },
      {
        "u": 2,
        "n": 4,
        "q": "¿Y para la app de turnos y promociones?",
        "o": [
          "Evolutivo o incremental, con entregas cortas y retroalimentación del área comercial.",
          "Cascada, para que el área comercial defina por escrito todo lo que quiere antes de empezar.",
          "El mismo del módulo de resultados, para que un equipo de cuatro no coordine dos formas de trabajo.",
          "Concurrente, porque la app se desarrolla al mismo tiempo que el módulo de resultados."
        ],
        "a": 0,
        "fb": [
          "Correcto. Requisitos que no están claros y un cliente que quiere probar ideas piden ciclos cortos con retroalimentación.",
          "Forzar requisitos que todavía no existen produce un documento que va a cambiar, y el cambio tardío cuesta más.",
          "Cada parte tiene características distintas; usar el mismo proceso por comodidad ignora esas diferencias.",
          "Que los frentes avancen a la vez describe el proyecto completo, no cómo conviene construir una app con requisitos inciertos."
        ]
      },
      {
        "u": 2,
        "n": 4,
        "q": "Mientras el módulo de resultados está en pruebas, la app está en modelado y en espera de cambios del área comercial. ¿Qué modelo describe mejor la situación del proyecto completo?",
        "o": [
          "Concurrente: actividades como estados en paralelo (en desarrollo, en espera de cambios, en revisión).",
          "Cascada por partes: el módulo de resultados va adelante y la app sigue el mismo camino, con retraso.",
          "Incremental: la app es el segundo incremento del sistema y se entrega después del módulo de resultados.",
          "Espiral: cada frente es una vuelta distinta, con su propio análisis de riesgos antes de avanzar."
        ],
        "a": 0,
        "fb": [
          "Correcto. Distintas partes del sistema avanzan a ritmos diferentes y en estados distintos al mismo tiempo.",
          "En cascada las fases son secuenciales; aquí hay dos frentes en estados distintos al mismo tiempo.",
          "Un incremento agrega funciones al mismo producto en entregas sucesivas; aquí son dos frentes simultáneos en estados distintos.",
          "El espiral organiza vueltas sucesivas con análisis de riesgos; no describe actividades en paralelo."
        ]
      },
      {
        "u": 2,
        "n": 5,
        "q": "Las pruebas se recortan al final en todos los proyectos. ¿Qué propuesta responde mejor desde el proceso?",
        "o": [
          "Evaluar el proceso al cierre de cada proyecto y cambiarlo para que se pruebe en cada incremento.",
          "Contratar personas extra para el último mes de cada proyecto, dedicadas solo a probar.",
          "Automatizar todas las pruebas del final del proyecto, para que se hagan más rápido cuando falte tiempo.",
          "Alargar un mes el plazo de cada proyecto, para que siempre quede tiempo de probar al final."
        ],
        "a": 0,
        "fb": [
          "Correcto. Un problema que se repite en todos los proyectos es del proceso: se detecta evaluándolo y se corrige cambiándolo.",
          "Ataca el síntoma, no la causa. Además repite el mito de sumar gente cuando hay atraso.",
          "Automatizar ayuda, pero si las pruebas siguen al final, el problema de fondo no cambia.",
          "Más tiempo al final no cambia que se prueba tarde, y suele consumirse igual."
        ]
      }
    ],
    "abiertas": [
      {
        "n": 5,
        "q": "El director propone usar un solo proceso para todo el laboratorio «para simplificar». Evalúa la propuesta y justifica tu posición con al menos dos características de cada frente.",
        "criterios": [
          "Compara los dos frentes con criterios explícitos: estabilidad de requisitos, criticidad, necesidad de documentación, disponibilidad del cliente.",
          "Toma posición (a favor, en contra o con matices) y la sostiene con esos criterios.",
          "Reconoce el costo de su propia propuesta (por ejemplo, coordinar dos formas de trabajo en un equipo de cuatro)."
        ],
        "restan": [
          "Responder «depende» sin decidir.",
          "Elegir un modelo por moda o sin relacionarlo con el caso."
        ]
      }
    ]
  },
  {
    "id": "chipa",
    "bloque": 2,
    "unidades": [
      3
    ],
    "titulo": "Delivery de chipa",
    "texto": "Una startup de delivery de chipa trabaja «con Scrum» desde hace tres meses. Los sprints duran tres meses. El dueño hace de Product Owner, pero viaja seguido y nadie más puede decidir prioridades; cuando vuelve, cambia todo y dice: «preferimos responder al cambio antes que seguir un plan». No hacen retrospectivas «porque no hay tiempo». Dos desarrolladores trabajan en Asunción y uno en Encarnación, y se enteran de los cambios por audios sueltos. El código se integra una vez por mes y casi siempre algo se rompe.",
    "preguntas": [
      {
        "u": 3,
        "n": 4,
        "q": "¿Qué elemento de Scrum está mal aplicado en su duración?",
        "o": [
          "El Sprint: dura un mes o menos, para inspeccionar y adaptarse seguido.",
          "La Sprint Planning: con sprints largos debería repetirse cada semana para no perder el rumbo.",
          "La Sprint Review: debería hacerse una sola vez, al final, cuando el producto está completo.",
          "Ninguno: la duración la decide cada equipo según el tamaño del producto."
        ],
        "a": 0,
        "fb": [
          "Correcto. El límite existe para que el equipo inspeccione y se adapte seguido.",
          "Repetir la planificación no corrige el problema: el Sprint mismo excede el límite.",
          "La Review se hace al final de cada Sprint, no del proyecto.",
          "El equipo elige la duración, pero dentro del límite de un mes."
        ]
      },
      {
        "u": 3,
        "n": 3,
        "q": "La integración mensual que siempre rompe algo, ¿qué práctica de XP la atiende directamente?",
        "o": [
          "Integración continua.",
          "Programación en parejas.",
          "Historias de usuario.",
          "Retroalimentación."
        ],
        "a": 0,
        "fb": [
          "Correcto. Integrar seguido hace que los conflictos sean chicos y se detecten enseguida.",
          "Mejora la calidad del código, pero no cambia que se integre una vez por mes.",
          "Sirven para planificar qué construir, no para integrar el código.",
          "Es un valor de XP, no una práctica: la práctica que lo concreta aquí es la integración continua."
        ]
      },
      {
        "u": 3,
        "n": 5,
        "q": "El dueño usa el manifiesto ágil para justificar que cambia todo cuando vuelve de viaje. ¿Qué evaluación corresponde?",
        "o": [
          "Lo usa mal: el manifiesto valora más el cambio, pero no descarta el plan, y el Sprint protege su objetivo.",
          "Lo usa bien: el manifiesto pone responder al cambio por encima del plan, así que cambiar prioridades es lo esperado.",
          "Lo usa bien, porque el Product Owner es responsable del backlog y puede reordenarlo cuando quiera.",
          "Lo usa mal solo porque avisa por audio: si avisara por escrito, cambiar todo sería correcto."
        ],
        "a": 0,
        "fb": [
          "Correcto. El manifiesto compara valores («más que»), no elimina uno de los dos. Y en Scrum el Sprint protege su objetivo.",
          "El manifiesto dice que valora más responder al cambio que seguir un plan, y reconoce que el plan también tiene valor.",
          "El PO ordena el Product Backlog, pero el Sprint en curso protege su objetivo; cambiar todo sin acuerdo rompe la transparencia.",
          "El problema no es el canal del aviso, sino cambiar todo sin acuerdo a mitad del Sprint."
        ]
      },
      {
        "u": 3,
        "n": 5,
        "q": "¿Qué problema de fondo compromete más la agilidad de este equipo?",
        "o": [
          "Factores humanos: nadie decide cuando el PO falta y la colaboración depende de audios sueltos.",
          "La distancia: con dos personas en Asunción y una en Encarnación, no hay comunicación cara a cara posible.",
          "El marco: con tantos cambios, una startup necesita un proceso prescriptivo que fije el alcance.",
          "Las herramientas: sin un tablero digital compartido, un equipo distribuido no puede seguir Scrum."
        ],
        "a": 0,
        "fb": [
          "Correcto. Pressman pone la capacidad de tomar decisiones, la colaboración y la confianza entre los rasgos del equipo ágil.",
          "La distancia complica la comunicación cara a cara, pero no la hace imposible. El problema es cómo se comunican.",
          "Con requisitos que cambian y un producto nuevo, un enfoque ágil tiene sentido. El problema es cómo lo aplican.",
          "Una herramienta no reemplaza la capacidad de decidir ni la colaboración."
        ]
      },
      {
        "u": 3,
        "n": 4,
        "q": "El equipo no hace retrospectivas «porque no hay tiempo». ¿Qué consecuencia es la más probable?",
        "o": [
          "Repetir los mismos problemas: la Retrospectiva es donde el equipo revisa cómo trabaja.",
          "Ninguna grave: lo de la Retrospectiva ya se habla en la Daily Scrum de cada día.",
          "Que el producto tenga menos funciones, porque sin Retrospectiva no se ajusta el alcance.",
          "Que el Product Owner pierda el control del backlog, que se prioriza en la Retrospectiva."
        ],
        "a": 0,
        "fb": [
          "Correcto. Sin Retrospectiva, nadie se detiene a ver por qué la integración siempre se rompe.",
          "La Daily mira el avance hacia el objetivo del Sprint; revisar cómo trabaja el equipo es la Retrospectiva.",
          "La Retrospectiva mira el proceso, no el alcance del producto.",
          "El backlog lo ordena el PO, no se prioriza en la Retrospectiva."
        ]
      }
    ],
    "abiertas": [
      {
        "n": 4,
        "q": "Identifica tres síntomas del caso que contradicen Scrum o XP. Para cada uno, di qué elemento del marco se incumple y propone una acción concreta.",
        "criterios": [
          "Tres síntomas distintos, tomados del caso (sprint de tres meses, PO ausente sin delegación, sin retrospectiva, integración mensual, comunicación por audios).",
          "Cada síntoma se vincula con un elemento preciso: evento, responsabilidad, práctica o valor.",
          "Las acciones son concretas y aplicables a este equipo, no generales («mejorar la comunicación»)."
        ],
        "restan": [
          "Confundir valores de XP con prácticas.",
          "Proponer «cambiar a cascada» sin analizar el caso."
        ]
      }
    ]
  },
  {
    "id": "expedientes",
    "bloque": 2,
    "unidades": [
      4
    ],
    "titulo": "Expedientes de la gobernación",
    "texto": "Un equipo desarrolla el sistema de expedientes de una gobernación. En la reunión de relevamiento, el jefe de mesa de entradas habló 40 minutos y nadie tomó notas; el equipo llegó sin haber leído el reglamento de expedientes. El plan del proyecto se hizo en la primera semana y no se volvió a mirar. En construcción, las pruebas se dejaron «para cuando esté todo». En la fecha de entrega, el equipo propone instalar el sistema «tal como está» y corregir los errores en producción, sin capacitar a nadie.",
    "preguntas": [
      {
        "u": 4,
        "n": 3,
        "q": "¿Qué principios de comunicación se incumplieron en la reunión?",
        "o": [
          "Prepararse antes de comunicarse, y tomar notas y documentar las decisiones.",
          "Tener un facilitador que ordene la reunión y dibujar en la pizarra cuando algo no está claro.",
          "Buscar la colaboración, porque la negociación no es un concurso.",
          "Ninguno: en una primera reunión lo correcto es solo escuchar."
        ],
        "a": 0,
        "fb": [
          "Correcto. Llegaron sin leer el reglamento y no registraron nada de lo que se dijo.",
          "Pueden ayudar, pero lo que el caso muestra es que no se prepararon y no registraron nada.",
          "El caso no describe una negociación ni un conflicto.",
          "Escuchar es un principio, pero no reemplaza prepararse ni registrar."
        ]
      },
      {
        "u": 4,
        "n": 4,
        "q": "El plan no se volvió a mirar desde la primera semana. ¿Qué principio de planeación se incumple?",
        "o": [
          "La planeación es iterativa: hay que darle seguimiento frecuente.",
          "Ajustar la granularidad: el plan inicial tenía demasiado detalle.",
          "Involucrar a los participantes al armar el plan del proyecto.",
          "Ser realista y estimar con lo que se sabe en ese momento."
        ],
        "a": 0,
        "fb": [
          "Correcto. Un plan que no se revisa deja de describir el proyecto real.",
          "El caso no dice cuánto detalle tenía el plan: dice que nunca se revisó.",
          "El caso no dice que hayan planificado sin los participantes.",
          "El problema no es cómo estimaron, sino que nunca revisaron el plan."
        ]
      },
      {
        "u": 4,
        "n": 4,
        "q": "Las pruebas quedaron «para cuando esté todo». ¿Qué dice la práctica de construcción sobre las pruebas?",
        "o": [
          "Probar es buscar errores aún no descubiertos; dejarlo al final deja poco tiempo para corregirlos.",
          "Las pruebas demuestran que el sistema no tiene errores, así que conviene hacerlas cuando está completo.",
          "En un proceso secuencial, probar al final es lo correcto, porque recién ahí se puede probar todo junto.",
          "Las pruebas importantes las hace el cliente en producción, porque solo él conoce el uso real."
        ],
        "a": 0,
        "fb": [
          "Correcto. El objetivo de una prueba es encontrar errores, no confirmar que todo anda.",
          "Esa es la visión equivocada: una prueba que no encuentra nada no demuestra que no haya errores.",
          "Aun en cascada se revisa lo construido; dejar todo para el final es lo que reduce el tiempo para corregir.",
          "El cliente valida, pero no reemplaza las pruebas del equipo."
        ]
      },
      {
        "u": 4,
        "n": 5,
        "q": "Evalúa la propuesta de instalar «tal como está», corregir en producción y no capacitar.",
        "o": [
          "Contradice el despliegue: no se entregan errores conocidos, el apoyo se arma antes y se capacita.",
          "Es aceptable: entregar pronto y mejorar con el uso es como trabajan las metodologías ágiles.",
          "Es aceptable si el cliente firma que conoce los errores y acepta corregirlos en producción.",
          "Es aceptable porque todo software tiene errores, y en producción aparecen los que importan."
        ],
        "a": 0,
        "fb": [
          "Correcto. La propuesta incumple tres principios de despliegue a la vez.",
          "La agilidad entrega incrementos funcionando y probados, no software con errores conocidos.",
          "La firma no cambia que se entregan errores conocidos ni que falta el apoyo a los usuarios.",
          "Que todo software pueda tener errores no autoriza a entregar los que ya se conocen."
        ]
      }
    ],
    "abiertas": [
      {
        "n": 5,
        "q": "Elige las dos fallas más graves del caso y, para cada una, propone qué habría hecho un equipo que aplica los principios de la práctica. Justifica por qué esas dos son las más graves.",
        "criterios": [
          "Elige dos fallas del caso y las asocia con la actividad correcta: comunicación, planeación, construcción o despliegue.",
          "Cada propuesta aplica un principio concreto de la Unidad 4.",
          "La justificación compara consecuencias (por ejemplo, el efecto sobre los usuarios de la gobernación), no solo dice «es importante»."
        ],
        "restan": [
          "Listar principios sin conectarlos con el caso.",
          "Elegir sin justificar."
        ]
      }
    ]
  },
  {
    "id": "club",
    "bloque": 3,
    "unidades": [
      5,
      6
    ],
    "titulo": "Club de barrio: cuotas y canchas",
    "texto": "Un club de barrio quiere un sistema para cobrar cuotas y reservar sus dos canchas. En la entrevista, la presidenta dice que «lo más importante es que nadie juegue sin pagar»; el tesorero quiere «el reporte del mes en un clic»; los socios quieren reservar desde el celular «rápido». El cuidador, que abre y cierra el portón de las canchas, no fue invitado. Un dirigente joven pide: «hagámoslo con blockchain, para que sea transparente». Nadie mencionó que muchos socios mayores pagan en efectivo en la cantina.",
    "preguntas": [
      {
        "u": 5,
        "n": 4,
        "q": "¿Qué participante silencioso es más importante incorporar, y por qué?",
        "o": [
          "El cuidador: abre el portón y sería quien haga cumplir que nadie juegue sin pagar.",
          "El proveedor de internet, porque si la red del club falla, nadie puede reservar.",
          "Los árbitros de los torneos, porque usan las canchas casi todos los fines de semana.",
          "Ninguno: presidenta, tesorero y socios ya representan todos los puntos de vista."
        ],
        "a": 0,
        "fb": [
          "Correcto. Su punto de vista define cómo se verifica una reserva en la puerta.",
          "Es una restricción técnica a considerar, pero no un participante con un punto de vista sobre reservas y cobros.",
          "Usan las canchas, pero no reservan ni cobran: su punto de vista no cambia los requisitos del caso.",
          "Falta quien opera la regla principal del caso."
        ]
      },
      {
        "u": 5,
        "n": 4,
        "q": "¿Cómo se trata el pedido de usar blockchain?",
        "o": [
          "Como solución técnica, no como requisito: se pregunta qué necesidad hay detrás y se registra.",
          "Como requisito no funcional de seguridad, porque blockchain hace que los pagos no se puedan alterar.",
          "Como requisito funcional, porque lo pidió un dirigente y la transparencia es importante para el club.",
          "Se descarta sin registrarlo, porque es una tecnología cara para un club de barrio."
        ],
        "a": 0,
        "fb": [
          "Correcto. Una solución no es un requisito: se identifica y se busca la necesidad real.",
          "Es una tecnología, no una necesidad medible.",
          "Quién lo pide no lo convierte en requisito.",
          "Descartarlo sin registrar pierde la necesidad que puede haber detrás (la transparencia)."
        ]
      },
      {
        "u": 5,
        "n": 3,
        "q": "¿Cuál es la mejor reescritura de «reservar rápido» como requisito no funcional?",
        "o": [
          "Un socio reserva en tres pasos o menos y en menos de 30 segundos desde el celular (supuesto a validar).",
          "El sistema debe ser rápido, simple y moderno, para que los socios reserven sin hacer fila en la secretaría del club.",
          "El sistema debe alojarse en un servidor potente, para que las reservas no demoren nunca.",
          "Las reservas se hacen por WhatsApp, que los socios ya usan y les resulta rápido."
        ],
        "a": 0,
        "fb": [
          "Correcto. Tiene métrica, umbral y condición, y declara que el número es un supuesto.",
          "«Rápido» y «moderno» no se pueden verificar.",
          "Es una decisión de diseño, no un requisito.",
          "Es una solución, no un requisito de calidad."
        ]
      },
      {
        "u": 5,
        "n": 4,
        "q": "Registrar pagos en efectivo nadie lo pidió, pero si falta, los socios mayores quedan afuera. Según QFD, ¿qué tipo de requerimiento es?",
        "o": [
          "Esperado: nadie lo dice, pero si falta deja insatisfechos a los socios.",
          "Normal: el cobro de cuotas es parte del pedido explícito del club.",
          "Emocionante: va más allá de lo que el club esperaba del sistema.",
          "No es un requerimiento: si nadie lo dijo, no se incluye."
        ],
        "a": 0,
        "fb": [
          "Correcto. Por eso hay que buscarlo activamente: no va a aparecer solo.",
          "El cobro de cuotas sí se pidió, pero el efectivo en la cantina nadie lo mencionó: eso lo hace implícito.",
          "No sorprende a nadie: es lo mínimo para que todos los socios puedan pagar.",
          "Los requerimientos esperados existen aunque nadie los diga."
        ]
      },
      {
        "u": 5,
        "n": 5,
        "q": "La presidenta quiere bloquear las reservas de quien debe cuotas; los socios quieren reservar sin trabas. ¿Qué hace el analista?",
        "o": [
          "Registra el conflicto con su origen, lo lleva a negociación y lo deja pendiente hasta que decidan.",
          "Le da la razón a la presidenta, porque es la autoridad del club y la regla protege los ingresos.",
          "Propone un punto medio razonable: bloquear solo a quien deba dos meses o más.",
          "Lo deja para el diseño, cuando se sepa cómo se va a implementar el bloqueo."
        ],
        "a": 0,
        "fb": [
          "Correcto. El analista no resuelve el conflicto por suposición: lo hace visible y lo negocia.",
          "Puede que la decisión final sea de la presidenta, pero el analista no la toma por ella: la registra y la negocia.",
          "Inventar una regla es resolver el conflicto por suposición.",
          "Un conflicto de requisitos sin resolver llega al diseño como un problema más caro."
        ]
      }
    ],
    "abiertas": [
      {
        "n": 4,
        "q": "Arma la lista de participantes del caso (incluye los silenciosos) y, para cada uno, escribe una pregunta libre de contexto o una pregunta del problema que le harías.",
        "criterios": [
          "Incluye a presidenta, tesorero, socios y cuidador; suma a los socios mayores que pagan en efectivo o a la cantina.",
          "Las preguntas libres de contexto no sugieren la respuesta (quién usa, qué beneficio espera, si es la persona indicada).",
          "Al menos una pregunta busca precisar algo ambiguo («¿qué es rápido para usted?»)."
        ],
        "restan": [
          "Preguntas que inducen la respuesta («¿no le parece que...?»).",
          "Tomar «blockchain» como requisito."
        ]
      }
    ]
  },
  {
    "id": "club-cu",
    "bloque": 3,
    "unidades": [
      6
    ],
    "titulo": "Club de barrio: el caso de uso",
    "texto": "Siguiendo con el club, un grupo redactó este caso de uso. Nombre: Gestionar canchas. Actores principales: Socio y Tesorero. Flujo: 1. El socio elige cancha y horario. 2. El sistema muestra el precio. 3. El tesorero registra el pago. 4. El sistema genera el reporte mensual. Postcondición: reserva hecha. La presidenta, el tesorero y el cuidador pueden cobrar en el club.",
    "preguntas": [
      {
        "u": 6,
        "n": 4,
        "q": "¿Cuál es el problema principal de este caso de uso?",
        "o": [
          "Mezcla dos objetivos (reservar y reportar) y tiene dos actores principales.",
          "Le faltan los datos de la tabla de reservas, necesarios para pasar a diseño.",
          "Es demasiado corto: un caso de uso formal necesita al menos diez pasos.",
          "Ninguno: cubre todo el proceso del club en un solo caso, y eso es una ventaja."
        ],
        "a": 0,
        "fb": [
          "Correcto. Un caso de uso es un contrato con un solo objetivo: conviene separar «Reservar cancha» (socio) y «Emitir reporte mensual» (tesorero).",
          "Los datos se modelan aparte; el problema es que el caso no tiene un solo objetivo.",
          "La cantidad de pasos no es un criterio de calidad.",
          "Cubrir todo en un caso es justamente el problema."
        ]
      },
      {
        "u": 6,
        "n": 4,
        "q": "¿Qué flujo alternativo es más importante agregar al paso 1?",
        "o": [
          "1a. La cancha ya está reservada en ese horario: el sistema avisa y ofrece otros.",
          "1a. El socio elige cancha y el sistema guarda la reserva en la base de datos.",
          "1a. El tesorero no está de acuerdo con el monto del reporte mensual.",
          "Ninguno: los flujos alternativos se agregan recién en el diseño."
        ],
        "a": 0,
        "fb": [
          "Correcto. Es lo que más probablemente sale mal al elegir cancha y horario.",
          "Es el flujo normal, con un detalle de diseño: no es una alternativa.",
          "Pertenece a otro caso de uso, con otro objetivo y otro actor.",
          "Los alternativos son parte del caso de uso formal: sin ellos no se pasa a diseño."
        ]
      },
      {
        "u": 6,
        "n": 3,
        "q": "La presidenta, el tesorero y el cuidador pueden registrar un pago. ¿Cómo se modela?",
        "o": [
          "Un actor por rol, por ejemplo «Cobrador»: el actor es un rol, no una persona.",
          "Tres actores, uno por persona, porque cada una tiene permisos distintos en el club.",
          "Como el sistema, porque el pago termina registrado en el sistema.",
          "No se modela: cobrar en efectivo es una tarea manual, fuera del sistema."
        ],
        "a": 0,
        "fb": [
          "Correcto. Distintas personas pueden cumplir el mismo rol, y una persona puede cumplir varios.",
          "Si los permisos difieren, se modela con atributos del rol (patrón rol), no con un actor por persona.",
          "El sistema no es actor de sus propios casos de uso.",
          "El caso dice que cobran en el club y que el sistema registra las cuotas: el registro es parte del sistema."
        ]
      },
      {
        "u": 6,
        "n": 4,
        "q": "Para mostrar quién hace cada paso de la reserva (socio, sistema y cuidador), ¿qué diagrama conviene?",
        "o": [
          "Un diagrama de canal (swimlane).",
          "Un diagrama de actividades simple.",
          "Un diagrama de clases.",
          "Un DFD de nivel 0."
        ],
        "a": 0,
        "fb": [
          "Correcto. Los canales muestran de quién es la responsabilidad de cada paso.",
          "Muestra la secuencia, pero no de quién es cada paso.",
          "Muestra la estructura estática, no el flujo de trabajo.",
          "Muestra el sistema frente a sus entidades, no el orden de los pasos."
        ]
      },
      {
        "u": 6,
        "n": 5,
        "q": "La postcondición dice «reserva hecha». ¿Qué evaluación corresponde?",
        "o": [
          "Insuficiente: falta la de éxito (reserva registrada, horario bloqueado) y la de fracaso (nada se registra).",
          "Correcta: una postcondición debe ser breve, y «reserva hecha» resume el resultado.",
          "Correcta, porque lo que pasa cuando algo falla ya está descrito en los flujos alternativos, y repetirlo en la postcondición sobra.",
          "Sobra: las postcondiciones se escriben en el diseño, no en el caso de uso."
        ],
        "a": 0,
        "fb": [
          "Correcto. Un caso de uso formal distingue lo que queda cuando sale bien y cuando sale mal.",
          "La brevedad no reemplaza la precisión: no dice qué cambia en el sistema.",
          "Los alternativos dicen cómo se llega; la postcondición dice en qué estado queda el sistema.",
          "Las postcondiciones son parte del caso de uso formal."
        ]
      }
    ],
    "abiertas": [
      {
        "n": 5,
        "q": "Reescribe «Reservar cancha» como caso de uso formal: actor principal, actores secundarios, disparador, precondiciones, flujo básico numerado, al menos dos alternativos por paso y postcondiciones de éxito y de fracaso.",
        "criterios": [
          "Un solo objetivo y un solo actor principal (el socio).",
          "Flujo básico numerado, con pasos del actor y del sistema.",
          "Alternativos referidos a su paso (1a, 3a...), por ejemplo horario ocupado o socio con deuda (pendiente de decisión).",
          "Postcondición de éxito y de fracaso.",
          "El conflicto de la deuda aparece como pendiente, no resuelto por suposición."
        ],
        "restan": [
          "Dos actores principales.",
          "Mezclar el reporte mensual dentro del caso.",
          "Inventar la regla de bloqueo por deuda."
        ]
      }
    ]
  },
  {
    "id": "taller",
    "bloque": 4,
    "unidades": [
      7
    ],
    "titulo": "Taller mecánico",
    "texto": "Un taller mecánico quiere registrar sus órdenes de trabajo. El cliente deja el vehículo y el recepcionista carga la orden. El mecánico revisa y registra los repuestos necesarios; el sistema calcula el presupuesto y se lo avisa al cliente, que lo aprueba o lo rechaza. Si lo aprueba, se repara; al terminar, se cobra y se entrega el vehículo. Una orden pasa por estos estados: recibida, presupuestada, aprobada, en reparación, terminada y entregada; también puede quedar rechazada.",
    "preguntas": [
      {
        "u": 7,
        "n": 4,
        "q": "En el DFD de nivel 1 de un grupo, la entidad Mecánico tiene una flecha directa al almacén «D2 Repuestos». ¿Qué está mal?",
        "o": [
          "La entidad no toca el almacén: los datos pasan por un proceso, como «3 Registrar repuestos».",
          "Nada: el mecánico es quien conoce los repuestos, así que es lógico que los cargue en el almacén.",
          "El almacén está mal dibujado: debería ser un cilindro, porque guarda datos en una base.",
          "El Mecánico debería ser un proceso, porque transforma información dentro del taller."
        ],
        "a": 0,
        "fb": [
          "Correcto. Entre una entidad y un almacén siempre hay un proceso que transforma o valida los datos.",
          "Conocer los datos no lo habilita a saltarse el proceso.",
          "En la notación de clase, el almacén va con dos líneas paralelas abiertas.",
          "El mecánico está fuera de la frontera del sistema: es una entidad externa que aporta datos."
        ]
      },
      {
        "u": 7,
        "n": 4,
        "q": "Un flujo rotulado «ok» va de «4 Calcular presupuesto» a «5 Avisar al cliente». ¿Qué evaluación corresponde?",
        "o": [
          "Es un flujo de control: debería nombrar el dato que viaja, por ejemplo «presupuesto».",
          "Es correcto: indica que el cálculo terminó bien y que ya se puede avisar.",
          "Es correcto, siempre que se agregue un rombo de decisión antes del aviso.",
          "Es incorrecto porque dos procesos no se conectan: el dato debe pasar por un almacén."
        ],
        "a": 0,
        "fb": [
          "Correcto. En un DFD los flujos llevan datos con nombre, no señales de control.",
          "Que algo «terminó bien» es control, y el DFD no modela control.",
          "En la notación de clase no hay rombos en el DFD.",
          "Dos procesos pueden conectarse con un flujo de datos; no hace falta un almacén en el medio."
        ]
      },
      {
        "u": 7,
        "n": 5,
        "q": "En el nivel 0 entra el flujo «respuesta al presupuesto» desde el Cliente. En el nivel 1 no aparece. El grupo dice: «es un detalle». ¿Qué evaluación es correcta?",
        "o": [
          "Incorrecta: refinar agrega detalle, pero no elimina lo que entra o sale en el nivel 0.",
          "Correcta: el nivel 1 puede simplificar el nivel 0 si el diagrama queda muy cargado.",
          "Correcta, siempre que el flujo aparezca después en el nivel 2 del proceso.",
          "Incorrecta, porque toda entrada de una entidad debe guardarse antes en un almacén."
        ],
        "a": 0,
        "fb": [
          "Correcto. La aprobación decide si se repara: sin ese flujo, el nivel 1 describe otro sistema.",
          "Refinar agrega detalle; no quita flujos que cruzan la frontera.",
          "El nivel 2 explota un proceso del nivel 1: si el flujo no está en el nivel 1, no tiene de dónde salir.",
          "No hay una regla así: un proceso puede recibir datos directamente de una entidad."
        ]
      },
      {
        "u": 7,
        "n": 3,
        "q": "¿Qué patrón de análisis aplica a la orden de trabajo?",
        "o": [
          "Ciclo de vida: una entidad que atraviesa estados con transiciones válidas.",
          "Rol: la orden la cargan y la actualizan personas con distintos permisos.",
          "Análisis del dominio: todos los talleres manejan órdenes parecidas.",
          "Ninguno: los estados se definen recién en el diseño de la base de datos."
        ],
        "a": 0,
        "fb": [
          "Correcto. La orden pasa de recibida a entregada (o rechazada) por transiciones definidas.",
          "Que varias personas actualicen la orden no la convierte en un rol: lo central es que la orden cambia de estado.",
          "El análisis del dominio busca elementos reutilizables; no describe los estados de la orden.",
          "Los estados se modelan ya en el análisis, con el patrón ciclo de vida y el diagrama de estados."
        ]
      },
      {
        "u": 7,
        "n": 4,
        "q": "En el diagrama de estados de la orden, ¿qué transición es inválida según el caso?",
        "o": [
          "De «rechazada» a «en reparación».",
          "De «presupuestada» a «aprobada».",
          "De «en reparación» a «terminada».",
          "De «presupuestada» a «rechazada»."
        ],
        "a": 0,
        "fb": [
          "Correcto. El caso dice que solo se repara si el cliente aprueba el presupuesto; una orden rechazada no puede pasar a reparación sin un nuevo presupuesto aprobado.",
          "Es válida: el cliente aprueba el presupuesto.",
          "Es válida: el mecánico termina la reparación.",
          "Es válida: el cliente rechaza el presupuesto."
        ]
      },
      {
        "u": 7,
        "n": 3,
        "q": "Con el análisis gramatical del texto, ¿qué lista reúne mejor los candidatos a entidades externas?",
        "o": [
          "Cliente, Recepcionista y Mecánico.",
          "Orden de trabajo, Presupuesto y Repuesto.",
          "Calcular, Avisar y Cobrar.",
          "Taller y Vehículo."
        ],
        "a": 0,
        "fb": [
          "Correcto. Son quienes producen o reciben datos desde fuera del sistema.",
          "Son datos: candidatos a almacenes o a flujos.",
          "Son verbos: candidatos a procesos.",
          "El taller es el contexto donde se usa el sistema, y el vehículo es un dato de la orden."
        ]
      }
    ],
    "abiertas": [
      {
        "n": 4,
        "q": "Describe el DFD de nivel 0 (entidades y flujos que cruzan la frontera) y propone un nivel 1 con al menos cuatro procesos numerados y dos almacenes. Verifica la continuidad entre los dos niveles.",
        "criterios": [
          "Nivel 0 con una sola burbuja, sin almacenes, con Cliente, Recepcionista y Mecánico como entidades.",
          "Flujos con nombre de dato (orden, repuestos usados, presupuesto, respuesta al presupuesto, pago).",
          "Nivel 1 con procesos numerados en círculo y almacenes con dos líneas abiertas (por ejemplo, D1 Órdenes y D2 Repuestos).",
          "Cada flujo del nivel 0 aparece en el nivel 1."
        ],
        "restan": [
          "Rombos de decisión.",
          "Una entidad conectada a un almacén.",
          "Flujos de control como «ok» o «siguiente»."
        ]
      }
    ]
  },
  {
    "id": "becas",
    "bloque": 5,
    "unidades": [
      8,
      9
    ],
    "titulo": "Convocatoria de becas",
    "texto": "La secretaría de juventud de una gobernación abre una convocatoria de becas una vez al año. Durante diez días, unas 15 000 personas postulan desde el celular y suben documentos; el resto del año el sistema casi no se usa. El sistema consulta cada cédula en el registro de identificación del Estado y, al cierre, envía el listado de becados a la Contraloría. El equipo es de tres personas y el presupuesto es ajustado. El documento de requisitos dice: «el sistema debe aguantar bien la carga».",
    "preguntas": [
      {
        "u": 8,
        "n": 3,
        "q": "«Un postulante no puede ver los documentos de otro postulante.» ¿Qué atributo de FURPS expresa principalmente?",
        "o": [
          "Funcionalidad (incluye la seguridad).",
          "Confiabilidad (falla poco y se recupera).",
          "Usabilidad (es fácil de usar).",
          "Soporte (se mantiene y se adapta)."
        ],
        "a": 0,
        "fb": [
          "Correcto. En FURPS la seguridad forma parte de la funcionalidad.",
          "La confiabilidad mide cuánto falla y cómo se recupera, no quién accede a qué.",
          "La usabilidad se refiere a la facilidad de uso.",
          "El soporte se refiere a mantener y adaptar el sistema."
        ]
      },
      {
        "u": 8,
        "n": 5,
        "q": "¿Cuál es la mejor reescritura de «aguantar bien la carga»?",
        "o": [
          "Con 2 000 postulantes a la vez, el 95 % de las cargas termina en menos de 5 segundos.",
          "El sistema debe responder rápido y sin caídas durante los diez días de la convocatoria.",
          "El sistema debe tener servidores suficientes para la cantidad de postulantes esperada.",
          "El sistema debe ser escalable, para crecer con la cantidad de postulantes de cada año."
        ],
        "a": 0,
        "fb": [
          "Correcto. Tiene métrica, umbral y condición de carga: se puede verificar.",
          "«Rápido» y «sin caídas» no tienen umbral: no se puede verificar.",
          "Es una decisión de diseño, no un requisito.",
          "«Escalable» sin cifras no permite evaluar ninguna arquitectura."
        ]
      },
      {
        "u": 9,
        "n": 4,
        "q": "En el diagrama de contexto arquitectónico, ¿cómo se ubica el registro de identificación del Estado, al que el sistema consulta para validar cédulas?",
        "o": [
          "Subordinado: el sistema lo usa para obtener datos que necesita.",
          "Superior: el sistema de becas depende de él y forma parte del Estado.",
          "Par: los dos sistemas intercambian datos sobre la misma persona.",
          "Actor: es quien inicia cada validación de cédula."
        ],
        "a": 0,
        "fb": [
          "Correcto. Como una pasarela de pago, es un servicio que el sistema usa.",
          "Superior es un sistema que usa al nuestro como parte de su procesamiento. Aquí es al revés: nuestro sistema lo usa a él.",
          "No hay intercambio de igual a igual: el sistema solo consulta.",
          "Los actores son personas o dispositivos que interactúan con el sistema; el registro no inicia nada, responde consultas."
        ]
      },
      {
        "u": 9,
        "n": 5,
        "q": "Equipo de tres, presupuesto ajustado, uso intenso diez días al año. ¿Qué decisión arquitectónica es la más defendible?",
        "o": [
          "Monolito en capas con capacidad ampliable para la convocatoria; si el volumen crece, se separa la carga de documentos.",
          "Microservicios, para escalar solo la carga de documentos durante los días de la convocatoria.",
          "Flujo de datos, porque los documentos pasan en etapas del postulante a la validación de identidad, después a la evaluación y al final a la Contraloría.",
          "Centrado en datos, porque todo el sistema gira alrededor de los documentos de los postulantes."
        ],
        "a": 0,
        "fb": [
          "Correcto. Se justifica con el equipo, el presupuesto y la carga estacional, y reconoce su consecuencia.",
          "Escalar una sola parte es atractivo, pero operar microservicios cuesta más de lo que puede sostener un equipo de tres con presupuesto ajustado.",
          "No hay una cadena de transformaciones en etapas: es un sistema interactivo de gestión.",
          "Casi todo sistema de gestión tiene un repositorio central; falta relacionar el estilo con la carga estacional y el equipo."
        ]
      },
      {
        "u": 9,
        "n": 4,
        "q": "¿Qué escenario evalúa mejor la decisión frente al requisito más crítico, como en ATAM?",
        "o": [
          "El último día, 2 000 personas suben documentos y el registro de identificación responde lento.",
          "Una postulante pide que la app tenga modo oscuro para poder leer de noche.",
          "Un martes de julio, sin convocatoria abierta, el sistema responde bien a los diez usuarios administrativos de la secretaría.",
          "El equipo decide cambiar el lenguaje de programación del sistema."
        ],
        "a": 0,
        "fb": [
          "Correcto. Combina el pico de carga con una falla de un sistema externo: pone en riesgo la decisión.",
          "Es un pedido de usabilidad menor: no pone en riesgo la decisión arquitectónica.",
          "Un escenario sin carga no pone a prueba nada.",
          "No es un escenario de uso ni de calidad del sistema."
        ]
      },
      {
        "u": 9,
        "n": 5,
        "q": "Un registro de decisión dice: «Contexto: —. Opciones: monolito. Decisión: monolito. Consecuencias: ninguna.» ¿Qué le falta para ser defendible?",
        "o": [
          "Contexto con los requisitos que pesan, alternativas comparadas y consecuencias, también las negativas.",
          "El nombre del framework, la versión exacta, la base de datos y el servicio de alojamiento que el equipo va a contratar.",
          "Nada: si la decisión es correcta, el registro es solo un trámite.",
          "Cambiar la decisión a microservicios, porque un monolito siempre exige más justificación."
        ],
        "a": 0,
        "fb": [
          "Correcto. Sin alternativas ni consecuencias, es una elección, no una decisión fundamentada.",
          "Más detalle técnico no convierte una elección en una decisión fundamentada.",
          "El registro es lo que permite revisar la decisión cuando cambie el contexto.",
          "No existe una opción siempre correcta: depende de los requisitos."
        ]
      }
    ],
    "abiertas": [
      {
        "n": 5,
        "q": "Escribe el registro de la decisión arquitectónica del caso (contexto, opciones, decisión y consecuencias) y un escenario de evaluación por cada atributo de calidad crítico.",
        "criterios": [
          "El contexto cita requisitos concretos del caso: la carga estacional, el equipo de tres, el presupuesto y el sistema externo de identidad.",
          "Compara al menos dos estilos o enfoques reales.",
          "Las consecuencias incluyen al menos una negativa.",
          "Cada escenario es concreto y medible (cuándo, cuántos usuarios, qué falla)."
        ],
        "restan": [
          "Elegir por moda.",
          "Requisitos sin cifras.",
          "Consecuencias solo positivas."
        ]
      }
    ]
  },
  {
    "id": "farmacia",
    "bloque": 6,
    "unidades": [
      8,
      10
    ],
    "titulo": "Cadena de farmacias",
    "texto": "El sistema de una cadena de farmacias tiene un componente «GestorVentas» con estas operaciones: registrarVenta(), aplicarDescuento(obraSocial), imprimir(modo), enviarPromoPorWhatsApp() y actualizarStock(). aplicarDescuento tiene un if por cada obra social: cada vez que se suma una nueva, hay que modificar ese método. imprimir(modo) hace cosas distintas según la letra que recibe: «A» imprime un ticket, «B» una factura legal y «C» solo guarda un PDF. El módulo Reportes lee la variable global totalDelDia, que GestorVentas también modifica. GestorVentas crea directamente un objeto ImpresoraModeloX para imprimir.",
    "preguntas": [
      {
        "u": 10,
        "n": 4,
        "q": "¿Qué diagnóstico corresponde a GestorVentas?",
        "o": [
          "Baja cohesión: reúne responsabilidades distintas, y cada una es otra razón para cambiar.",
          "Alta cohesión: todas sus operaciones pertenecen al mismo tema, las ventas, así que es lógico que estén juntas en un componente.",
          "Bajo acoplamiento: como hace todo él mismo, casi no depende de otros componentes.",
          "Un buen diseño: tener menos componentes hace el sistema más fácil de mantener."
        ],
        "a": 0,
        "fb": [
          "Correcto. Si para describirlo dices muchas veces «y», hace demasiado.",
          "Compartir el tema «ventas» no alcanza: la cohesión se mide por las responsabilidades.",
          "Concentrar todo no reduce el acoplamiento: esconde el problema adentro.",
          "Menos componentes no es mejor si cada uno hace de todo."
        ]
      },
      {
        "u": 10,
        "n": 4,
        "q": "Reportes y GestorVentas comparten la variable global totalDelDia. ¿Qué tipo de acoplamiento es?",
        "o": [
          "Común.",
          "De datos.",
          "De control.",
          "De contenido."
        ],
        "a": 0,
        "fb": [
          "Correcto. Comparten una variable global: un cambio en uno afecta al otro sin que se note.",
          "En el acoplamiento de datos se pasa solo el dato necesario, como parámetro.",
          "En el de control, uno le pasa una bandera que dirige la lógica del otro.",
          "En el de contenido, un componente modifica datos internos de otro."
        ]
      },
      {
        "u": 10,
        "n": 4,
        "q": "Otro componente llama a imprimir(modo) y la letra decide qué hace por dentro. ¿Qué tipo de acoplamiento es?",
        "o": [
          "De control: la letra dirige la lógica interna del otro.",
          "De datos: solo se pasa un parámetro simple, una letra.",
          "Común: los dos componentes usan el mismo valor de modo.",
          "De contenido: el que llama decide cómo trabaja el otro."
        ],
        "a": 0,
        "fb": [
          "Correcto. Conviene separar «imprimir ticket», «imprimir factura» y «guardar PDF».",
          "No es un dato que el otro procesa: es una orden sobre cómo trabajar.",
          "No comparten una variable global: uno le pasa la letra al otro.",
          "En el de contenido, un componente modifica datos internos de otro; aquí solo le pasa una bandera."
        ]
      },
      {
        "u": 10,
        "n": 5,
        "q": "Cada obra social nueva obliga a modificar aplicarDescuento. ¿Qué principio se incumple y qué propuesta lo resuelve?",
        "o": [
          "Abierto-cerrado: una interfaz de descuento con una clase por obra social; sumar una es agregar, no modificar.",
          "Sustitución de Liskov: reemplazar los if por un switch, que es más fácil de leer y de mantener.",
          "Segregación de interfaces: dividir aplicarDescuento en un método distinto por cada obra social.",
          "Ninguno: un if por obra social es la solución más simple y legible, y la simplicidad es uno de los valores del diseño que vimos en XP."
        ],
        "a": 0,
        "fb": [
          "Correcto. Abierto a la extensión, cerrado a la modificación.",
          "Un switch sigue obligando a modificar el método, y Liskov se refiere a reemplazar una clase base por una subclase.",
          "Igual hay que modificar el componente cada vez que entra una obra social nueva.",
          "Funciona, pero cada cambio toca código que ya andaba y puede romperlo."
        ]
      },
      {
        "u": 10,
        "n": 3,
        "q": "GestorVentas crea directamente un objeto ImpresoraModeloX. Si la farmacia cambia de impresora, hay que modificar GestorVentas. ¿Qué principio ayuda?",
        "o": [
          "Inversión de dependencias: depender de una abstracción «Impresora».",
          "Sustitución de Liskov: la impresora nueva debe heredar de la vieja.",
          "Segregación de interfaces: separar las operaciones de la impresora.",
          "Abierto-cerrado: agregar una clase nueva por cada modelo de impresora."
        ],
        "a": 0,
        "fb": [
          "Correcto. Como el cargador que depende del enchufe estándar y no de la marca del celular.",
          "Liskov exige que una subclase pueda reemplazar a su base; antes hace falta depender de la abstracción.",
          "Trata sobre no obligar a depender de operaciones que no se usan.",
          "Ayuda después, pero mientras GestorVentas cree el modelo concreto hay que modificarlo igual: primero hay que invertir la dependencia."
        ]
      },
      {
        "u": 8,
        "n": 5,
        "q": "¿Qué reorganización es la más sólida?",
        "o": [
          "Separar Ventas, Descuentos, Facturación, Notificador e Inventario; Reportes pide totales a Ventas por una interfaz.",
          "Un componente por método y por obra social, unos treinta, para lograr la máxima modularidad posible.",
          "Dejar el componente como está, pero documentar bien cada método para que cualquiera lo entienda.",
          "Pasar los reportes y el total del día a GestorVentas, así desaparece la variable global compartida y Reportes ya no depende de nada externo."
        ],
        "a": 0,
        "fb": [
          "Correcto. Alta cohesión, bajo acoplamiento y ocultamiento de información a la vez.",
          "Pasa la zona de costo mínimo: cada pieza es simple, pero integrarlas cuesta más que lo que se gana.",
          "La documentación no cambia la cohesión ni el acoplamiento.",
          "Elimina la variable global, pero empeora la cohesión: GestorVentas haría todavía más cosas."
        ]
      }
    ],
    "abiertas": [
      {
        "n": 5,
        "q": "Diseña dos de los componentes de la reorganización: nombre, responsabilidad en una oración sin «y», operaciones públicas, de qué depende y por qué tiene alta cohesión y bajo acoplamiento.",
        "criterios": [
          "La responsabilidad es una sola, en una oración sin «y».",
          "Las operaciones públicas son la interfaz; lo interno queda privado.",
          "Las dependencias pasan datos o interfaces, no banderas ni variables globales.",
          "La justificación usa los conceptos con precisión: cohesión, acoplamiento y el principio que aplica."
        ],
        "restan": [
          "Componentes con nombre genérico («Gestor», «Utilidades»).",
          "Repetir el problema de la variable global."
        ]
      }
    ]
  },
  {
    "id": "licencias",
    "bloque": 6,
    "unidades": [
      11
    ],
    "titulo": "Turnos para la licencia de conducir",
    "texto": "La app de una municipalidad para pedir turno para la licencia de conducir tiene estos problemas: (1) en el paso 4 de 5 no hay forma de volver al paso anterior sin perder todo lo cargado; (2) pide escribir el «código de trámite» que se mostró en la primera pantalla; (3) el botón Confirmar está a la derecha en unas pantallas y a la izquierda en otras; (4) ante cualquier falla muestra «Error 500»; (5) la opción «Recibir publicidad de autoescuelas» viene marcada, en letra gris claro; (6) mucha gente la usa en la vereda de la municipalidad, al sol y con datos móviles.",
    "preguntas": [
      {
        "u": 11,
        "n": 3,
        "q": "El problema (1) incumple principalmente la regla de oro de…",
        "o": [
          "Dejar el control al usuario.",
          "Reducir la carga de memoria.",
          "Ser consistente.",
          "Ninguna: es un problema de rendimiento."
        ],
        "a": 0,
        "fb": [
          "Correcto. La persona tiene que poder volver, deshacer o cancelar sin perder lo hecho.",
          "No se trata de recordar datos, sino de no poder retroceder.",
          "No hay una diferencia entre pantallas: falta una forma de volver.",
          "No es lentitud: es que el usuario no controla el recorrido."
        ]
      },
      {
        "u": 11,
        "n": 3,
        "q": "El problema (2) incumple principalmente la regla de oro de…",
        "o": [
          "Reducir la carga de memoria: el sistema debería mostrar o completar el código.",
          "Dejar el control al usuario: debería poder elegir si escribe el código o no.",
          "Ser consistente: el código debería pedirse siempre en la misma pantalla.",
          "Accesibilidad: el código es difícil de leer para personas con baja visión."
        ],
        "a": 0,
        "fb": [
          "Correcto. El sistema recuerda por la persona.",
          "El usuario puede seguir; el problema es que tiene que recordar.",
          "No hay incoherencia entre pantallas.",
          "La accesibilidad importa, pero la falla es pedirle memoria al usuario."
        ]
      },
      {
        "u": 11,
        "n": 4,
        "q": "¿Cuál es la mejor reescritura del mensaje del problema (4)?",
        "o": [
          "«No se guardó tu turno porque se cortó la conexión. Tus datos siguen ahí: toca Reintentar.»",
          "«Error 500: falla interna del servidor. Código de referencia 0x45. Reintente la operación.»",
          "«Ocurrió un error inesperado al procesar su solicitud. Por favor, intente nuevamente más tarde.»",
          "«No se pudo completar la operación solicitada. Contacte al administrador del sistema.»"
        ],
        "a": 0,
        "fb": [
          "Correcto. Dice qué pasó, en lenguaje de la persona, y qué hacer ahora.",
          "Agregar un código no lo hace comprensible: sigue en lenguaje técnico y no dice si se perdieron los datos.",
          "Es amable, pero no dice qué pasó ni si se perdieron los datos.",
          "La persona no sabe quién es el administrador ni qué hacer."
        ]
      },
      {
        "u": 11,
        "n": 4,
        "q": "¿Qué es el problema (5)?",
        "o": [
          "Un patrón oscuro: empuja a aceptar algo que la persona no eligió.",
          "Una práctica comercial válida, porque la persona puede desmarcar la opción.",
          "Un problema de consistencia, porque esa opción se ve distinta del resto.",
          "Solo un problema de accesibilidad, que se arregla con más contraste."
        ],
        "a": 0,
        "fb": [
          "Correcto. Un buen profesional no diseña para engañar.",
          "Que se pueda desmarcar no cambia que el diseño está hecho para que no se note.",
          "No compara pantallas: es una decisión hecha para confundir.",
          "El contraste importa, pero el problema principal es que viene marcada para que la persona acepte sin elegir."
        ]
      },
      {
        "u": 11,
        "n": 4,
        "q": "El dato (6) corresponde principalmente al análisis de…",
        "o": [
          "El ambiente.",
          "El usuario.",
          "La tarea.",
          "El contenido."
        ],
        "a": 0,
        "fb": [
          "Correcto. Sol, vereda y datos móviles piden alto contraste, poco peso y pantallas que toleren cortes.",
          "El usuario es quién lo usa y con qué experiencia.",
          "La tarea es qué necesita hacer.",
          "El contenido es qué se muestra."
        ]
      },
      {
        "u": 11,
        "n": 5,
        "q": "¿Qué forma de validar los cambios es la más sólida?",
        "o": [
          "Probar prototipos con personas reales en la vereda, con datos móviles, y mejorar en vueltas.",
          "Pedirle a una IA que evalúe cada pantalla con las reglas de oro y aplicar sus sugerencias.",
          "Que el equipo pruebe la app completa en la oficina antes de publicarla.",
          "Publicarla y medir con analíticas en qué paso abandonan el trámite."
        ],
        "a": 0,
        "fb": [
          "Correcto. El diseño de la interfaz es iterativo y se valida con usuarios.",
          "La IA puede ayudar a revisar, pero no reemplaza observar a personas reales, y lo que sugiere también hay que revisarlo.",
          "No reproduce el ambiente real de uso.",
          "Medir el abandono sirve, pero valida tarde y a costa de los usuarios: conviene probar antes."
        ]
      }
    ],
    "abiertas": [
      {
        "n": 4,
        "q": "Arma la tabla de revisión con las tres reglas de oro: para cada problema del caso, la regla que viola, cómo se ve hoy («así no») y cómo lo corregirías («así sí»).",
        "criterios": [
          "Los seis problemas tienen una regla o un aspecto de diseño asociado (el 5 es un patrón oscuro y el 6, un dato del ambiente).",
          "Cada «así sí» es concreto y aplicable en la pantalla.",
          "La justificación usa la regla, no el gusto («está feo» no vale)."
        ],
        "restan": [
          "Confundir control con memoria.",
          "Proponer solo cambios estéticos."
        ]
      }
    ]
  }
];
