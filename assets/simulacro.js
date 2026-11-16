/* =========================================================
   Aula Danfer · Simulacro de examen (motor compartido)
   Lo usan teoria-de-la-programacion/juegos/simulacro.html e
   ingenieria-del-software-1/juegos/simulacro.html.
   Necesita BANCO y UNIDADES (banco-preguntas.js) y SIMULACRO
   (configuración de la materia, definida en la página).
   Modo examen: sin pistas ni correcciones hasta entregar.
   El historial se guarda solo en este navegador.
   ========================================================= */
(function () {
  const C = window.SIMULACRO;
  const LETRAS = ["A", "B", "C", "D", "E"];
  const UNIS = Object.keys(UNIDADES).map(Number).sort((a, b) => a - b);
  const zona = document.getElementById("zona");
  const BANCO_EX = BANCO.filter(p => p.t === "mc" || p.t === "code" || p.t === "vf");
  const HAY_CASOS = typeof CASOS !== "undefined";
  const CASOS_EX = HAY_CASOS ? CASOS.flatMap(c => c.preguntas.map(p => Object.assign({ t: "caso", caso: c.id }, p))) : [];
  function pozo(tipo) { return tipo === "casos" ? CASOS_EX : tipo === "conceptos" ? BANCO_EX : BANCO_EX.concat(CASOS_EX); }
  function tipoElegido() { const r = zona.querySelector("input[name=tipo]:checked"); return r ? r.value : "conceptos"; }

  function esc(s) { return String(s).replace(/[&<>"]/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c])); }
  function mezclar(arr) { const a = arr.slice(); for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a; }
  function leerHist() { try { return JSON.parse(localStorage.getItem(C.clave)) || []; } catch (e) { return []; } }
  function guardarHist(h) { try { localStorage.setItem(C.clave, JSON.stringify(h.slice(-20))); } catch (e) {} }
  function mmss(seg) { const m = Math.floor(seg / 60), s = seg % 60; return m + ":" + String(s).padStart(2, "0"); }

  let ex = null; // { preguntas, resp, i, limite, restante, timer }

  /* ---------- Configuración ---------- */
  function pintarConfig() {
    const hist = leerHist();
    const ult = hist[hist.length - 1];
    zona.innerHTML = `
      <section class="panel">
        <h2>Arma tu simulacro</h2>
        ${HAY_CASOS ? `<fieldset class="grupo-config">
          <legend>¿Qué tipo de preguntas?</legend>
          <div class="radios">
            <label><input type="radio" name="tipo" value="casos" checked> Solo casos (N3 a N5, como en el examen)</label>
            <label><input type="radio" name="tipo" value="mezcla"> Casos y conceptos</label>
            <label><input type="radio" name="tipo" value="conceptos"> Solo conceptos</label>
          </div>
        </fieldset>` : ""}
        <fieldset class="grupo-config">
          <legend>¿Qué unidades entran?</legend>
          <div class="fila-botones atajos">
            <button type="button" class="btn sec chico" data-atajo="todas">Todas</button>
            <button type="button" class="btn sec chico" data-atajo="mitad1">Primera mitad</button>
            <button type="button" class="btn sec chico" data-atajo="mitad2">Segunda mitad</button>
            <button type="button" class="btn sec chico" data-atajo="ninguna">Ninguna</button>
          </div>
          <div class="unis">${UNIS.map(u => {
            return `<label class="uni"><input type="checkbox" value="${u}" checked><span><b>U${u}</b> ${esc(UNIDADES[u].nombre)} <small data-cuenta="${u}"></small></span></label>`;
          }).join("")}</div>
        </fieldset>
        <fieldset class="grupo-config">
          <legend>¿Cuántas preguntas?</legend>
          <div class="radios">${[10, 20, 30].map((n, k) => `<label><input type="radio" name="cant" value="${n}"${k === 1 ? " checked" : ""}> ${n}</label>`).join("")}</div>
        </fieldset>
        <fieldset class="grupo-config">
          <legend>¿Con tiempo?</legend>
          <div class="radios">
            <label><input type="radio" name="tiempo" value="90" checked> 1 min 30 s por pregunta</label>
            <label><input type="radio" name="tiempo" value="60"> 1 min por pregunta</label>
            <label><input type="radio" name="tiempo" value="0"> Sin límite</label>
          </div>
        </fieldset>
        <p id="avisoConfig" class="aviso-error" hidden></p>
        <div class="fila-botones"><button type="button" class="btn" id="btnEmpezar">Empezar el simulacro</button></div>
        ${ult ? `<p class="bajada">Tu último simulacro: <b>${ult.ok} de ${ult.n}</b> (${Math.round(ult.ok / ult.n * 100)}%), el ${new Date(ult.fecha).toLocaleDateString("es-PY")}. <a href="../progreso.html">Ver Mi progreso</a></p>` : ""}
      </section>`;
    const cajas = () => Array.from(zona.querySelectorAll(".unis input"));
    function contar() {
      const p = pozo(tipoElegido());
      zona.querySelectorAll("[data-cuenta]").forEach(el => { el.textContent = "(" + p.filter(q => q.u === Number(el.dataset.cuenta)).length + ")"; });
    }
    contar();
    zona.querySelectorAll("input[name=tipo]").forEach(r => r.addEventListener("change", contar));
    zona.querySelectorAll("[data-atajo]").forEach(b => b.addEventListener("click", () => {
      const mitad = Math.ceil(UNIS.length / 2);
      cajas().forEach((c, i) => {
        c.checked = b.dataset.atajo === "todas" ? true : b.dataset.atajo === "ninguna" ? false : b.dataset.atajo === "mitad1" ? i < mitad : i >= mitad;
      });
    }));
    document.getElementById("btnEmpezar").addEventListener("click", () => {
      const unis = cajas().filter(c => c.checked).map(c => Number(c.value));
      const aviso = document.getElementById("avisoConfig");
      if (!unis.length) { aviso.textContent = "Elige al menos una unidad."; aviso.hidden = false; return; }
      const cant = Number(zona.querySelector("input[name=cant]:checked").value);
      const seg = Number(zona.querySelector("input[name=tiempo]:checked").value);
      const tipo = tipoElegido();
      if (!pozo(tipo).some(p => unis.includes(p.u))) { aviso.textContent = "No hay preguntas de ese tipo en las unidades elegidas."; aviso.hidden = false; return; }
      empezar(unis, cant, seg, tipo);
    });
  }

  /* Reparte las preguntas entre las unidades elegidas, lo más parejo posible. */
  function elegir(unis, cant, tipo) {
    const base = pozo(tipo);
    const pozos = {}; unis.forEach(u => pozos[u] = mezclar(base.filter(p => p.u === u)));
    const out = []; let vuelta = true;
    while (out.length < cant && vuelta) {
      vuelta = false;
      for (const u of mezclar(unis)) {
        if (out.length >= cant) break;
        if (pozos[u].length) { out.push(pozos[u].pop()); vuelta = true; }
      }
    }
    return mezclar(out).map(p => {
      if (p.t === "vf") return p;
      const orden = mezclar(p.o.map((_, i) => i));
      return Object.assign({}, p, { o: orden.map(i => p.o[i]), a: orden.indexOf(p.a), fb: p.fb ? orden.map(i => p.fb[i]) : undefined });
    });
  }

  /* ---------- Examen ---------- */
  function empezar(unis, cant, segPorPregunta, tipo) {
    const preguntas = elegir(unis, cant, tipo);
    ex = { unis, preguntas, resp: new Array(preguntas.length).fill(null), i: 0,
           limite: segPorPregunta ? segPorPregunta * preguntas.length : 0, inicio: Date.now(), timer: null };
    ex.restante = ex.limite;
    if (ex.limite) ex.timer = setInterval(tic, 1000);
    pintarPregunta();
    zona.scrollIntoView({ behavior: "smooth", block: "start" });
  }
  function tic() {
    ex.restante--;
    const r = document.getElementById("reloj");
    if (r) { r.textContent = mmss(Math.max(0, ex.restante)); r.classList.toggle("urgente", ex.restante <= 60); }
    if (ex.restante <= 0) { entregar(true); }
  }
  function pintarPregunta() {
    const p = ex.preguntas[ex.i], n = ex.preguntas.length, r = ex.resp[ex.i];
    let cuerpo = "";
    if (p.caso) {
      const c = CASOS.find(x => x.id === p.caso);
      cuerpo += `<details class="caso-sim" open><summary>Caso: ${esc(c.titulo)}</summary><div class="caso-usf"><p>${esc(c.texto)}</p></div></details>`;
    }
    if (p.t === "code") cuerpo += `<div class="codigo-lang">${esc(p.lang)}</div><pre class="codigo">${esc(p.code)}</pre>`;
    cuerpo += `<p class="enunciado">${esc(p.q)}</p>`;
    if (p.t === "vf") {
      cuerpo += `<div class="vf">${["v", "f"].map(k => `<button type="button" class="opcion${r === k ? " elegida" : ""}" data-k="${k}" aria-pressed="${r === k}">${k === "v" ? "Verdadero" : "Falso"}</button>`).join("")}</div>`;
    } else {
      cuerpo += `<div class="opciones">${p.o.map((t, k) => `<button type="button" class="opcion${r === k ? " elegida" : ""}" data-k="${k}" aria-pressed="${r === k}"><span class="letra">${LETRAS[k]}</span><span>${esc(t)}</span></button>`).join("")}</div>`;
    }
    const respondidas = ex.resp.filter(x => x !== null).length;
    zona.innerHTML = `
      <section class="panel" aria-live="polite">
        <div class="barra">
          <span class="etiqueta">Pregunta ${ex.i + 1} de ${n} · U${p.u}${p.n ? " · " + NIVELES[p.n] : ""}</span>
          <span class="num">${ex.limite ? `⏱ <b id="reloj" class="reloj">${mmss(ex.restante)}</b> · ` : ""}${respondidas}/${n} respondidas</span>
        </div>
        <div class="progreso"><i style="width:${(respondidas / n) * 100}%"></i></div>
        ${cuerpo}
        <nav class="mapa-preguntas" aria-label="Ir a una pregunta">${ex.preguntas.map((_, k) => `<button type="button" data-ir="${k}" class="${k === ex.i ? "actual" : ""}${ex.resp[k] !== null ? " hecha" : ""}" aria-label="Pregunta ${k + 1}${ex.resp[k] !== null ? ", respondida" : ""}">${k + 1}</button>`).join("")}</nav>
        <div class="fila-botones">
          <button type="button" class="btn sec" id="btnAnt"${ex.i === 0 ? " disabled" : ""}>Anterior</button>
          <button type="button" class="btn" id="btnSig">${ex.i + 1 < n ? "Siguiente" : "Revisar y entregar"}</button>
        </div>
      </section>`;
    zona.querySelectorAll(".opcion").forEach(b => b.addEventListener("click", () => {
      ex.resp[ex.i] = p.t === "vf" ? b.dataset.k : Number(b.dataset.k);
      pintarPregunta();
    }));
    zona.querySelectorAll("[data-ir]").forEach(b => b.addEventListener("click", () => { ex.i = Number(b.dataset.ir); pintarPregunta(); }));
    document.getElementById("btnAnt").addEventListener("click", () => { ex.i--; pintarPregunta(); });
    document.getElementById("btnSig").addEventListener("click", () => {
      if (ex.i + 1 < n) { ex.i++; pintarPregunta(); } else confirmar();
    });
  }
  function confirmar() {
    const faltan = ex.resp.filter(x => x === null).length;
    if (!faltan) { entregar(false); return; }
    zona.insertAdjacentHTML("beforeend", "");
    const panel = zona.querySelector(".panel");
    panel.insertAdjacentHTML("beforeend", `<div class="pista" id="confirmar"><strong>Antes de entregar</strong>Te quedan ${faltan} sin responder. En un examen real, una pregunta en blanco vale cero.
      <div class="fila-botones"><button type="button" class="btn" id="siEntregar">Entregar igual</button><button type="button" class="btn sec" id="noEntregar">Seguir respondiendo</button></div></div>`);
    document.getElementById("siEntregar").addEventListener("click", () => entregar(false));
    document.getElementById("noEntregar").addEventListener("click", () => { ex.i = ex.resp.findIndex(x => x === null); pintarPregunta(); });
  }

  function correcta(p, r) { return r !== null && (p.t === "vf" ? (r === "v") === p.a : r === p.a); }

  /* ---------- Resultados y diagnóstico de Ada ---------- */
  function entregar(porTiempo) {
    if (ex.timer) clearInterval(ex.timer);
    const n = ex.preguntas.length;
    const porU = {};
    ex.preguntas.forEach((p, k) => { porU[p.u] = porU[p.u] || [0, 0]; porU[p.u][1]++; if (correcta(p, ex.resp[k])) porU[p.u][0]++; });
    const ok = Object.values(porU).reduce((s, v) => s + v[0], 0);
    const pct = ok / n;
    const minutos = Math.round((Date.now() - ex.inicio) / 60000);
    const hist = leerHist();
    hist.push({ fecha: Date.now(), n, ok, porU, unis: ex.unis });
    guardarHist(hist);

    const flojas = Object.keys(porU).map(Number).filter(u => porU[u][0] / porU[u][1] < .6).sort((a, b) => porU[a][0] / porU[a][1] - porU[b][0] / porU[b][1]);
    const msj = pct >= .9 ? "Excelente. Así se llega al examen: con dudas resueltas, no con suerte."
      : pct >= .7 ? "Vas bien. Ajusta las unidades que marco abajo y vuelve a intentarlo."
      : pct >= .5 ? "Hay base, pero todavía hay huecos. Empieza por las unidades que marco abajo."
      : "Todavía no estás para rendir. No te preocupes: para eso está el simulacro. Repasa primero las unidades que marco abajo.";
    const filas = Object.keys(porU).map(Number).sort((a, b) => a - b).map(u => {
      const [o, t] = porU[u], q = o / t;
      return `<div class="fila-barra"><b>U${u}</b><div class="pista-barra"><i class="${q < .6 ? "baja" : ""}" style="width:${q * 100}%"></i></div><span class="num">${o}/${t}</span></div>`;
    }).join("");
    const errores = ex.preguntas.map((p, k) => ({ p, r: ex.resp[k] })).filter(x => !correcta(x.p, x.r));
    zona.innerHTML = `
      <section class="panel">
        <p class="etiqueta">${porTiempo ? "Se terminó el tiempo · " : ""}Resultado del simulacro</p>
        <h2 class="num">${ok} de ${n} · ${Math.round(pct * 100)}%</h2>
        <p class="bajada">${ex.limite ? `Usaste ${minutos < 1 ? "menos de 1" : minutos} min de ${Math.round(ex.limite / 60)}.` : `Tardaste ${minutos < 1 ? "menos de 1" : minutos} min.`}${n / Object.keys(porU).length < 3 ? " Con pocas preguntas por unidad, el diagnóstico es orientativo: para afinarlo, elige menos unidades o 30 preguntas." : ""}</p>
        <div class="escena"><img src="${C.raiz}assets/personajes/ada.svg" alt="" width="68" height="80"><div class="globo"><span class="quien">Ada</span><p>${msj}</p>
          ${flojas.length ? `<ul class="repasar">${flojas.map(u => `<li><b>U${u} · ${esc(UNIDADES[u].nombre)}</b> (${porU[u][0]}/${porU[u][1]}): <a href="../u${u}.html">repasa la unidad</a> y después juega la <a href="ruta-de-repaso.html#u${u}">estación U${u}</a>${HAY_CASOS ? ` o trabaja los <a href="../casos.html">casos de esa unidad</a>` : ""}.</li>`).join("")}</ul>` : ""}</div></div>
        <h3 style="margin-top:1.4rem">Por unidad</h3>
        <div class="barras">${filas}</div>
        ${errores.length ? `<details class="revision"><summary>Revisa tus ${errores.length} errores</summary>${errores.map(({ p, r }) => {
          const tuya = r === null ? "En blanco" : p.t === "vf" ? (r === "v" ? "Verdadero" : "Falso") : p.o[r];
          const buena = p.t === "vf" ? (p.a ? "Verdadero" : "Falso") : p.o[p.a];
          const caso = p.caso ? CASOS.find(x => x.id === p.caso) : null;
          return `<div class="error-item"><p class="etiqueta">U${p.u}${p.n ? " · " + NIVELES[p.n] : ""}${caso ? " · Caso: " + esc(caso.titulo) : ""}</p>${p.t === "code" ? `<pre class="codigo">${esc(p.code)}</pre>` : ""}<p><b>${esc(p.q)}</b></p>
            <p class="tuya">Tu respuesta: ${esc(tuya)}</p>${p.fb && r !== null ? `<p class="fb-elegida">${esc(p.fb[r])}</p>` : ""}<p class="buena">Correcta: ${esc(buena)}</p>${p.fb ? `<p class="fb-elegida">${esc(p.fb[p.a])}</p>` : ""}${p.pista ? `<p class="piensa">Piensa en esto: ${esc(p.pista)}</p>` : ""}</div>`;
        }).join("")}</details>` : ""}
        <div class="fila-botones">
          <button type="button" class="btn" id="btnOtro">Otro simulacro</button>
          <a class="btn sec" href="../progreso.html">Ver Mi progreso</a>
        </div>
      </section>`;
    ex = null;
    document.getElementById("btnOtro").addEventListener("click", pintarConfig);
    zona.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  pintarConfig();
})();
