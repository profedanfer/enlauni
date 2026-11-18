/* =========================================================
   Ítems razonados · Teoría de la Programación
   Cada ítem se responde en tres pasos:
   eliges la opción, nombras el concepto y justificas por qué.

   Razonada.crear(item, opciones) → { el, corregir(), respondido() }
   opciones: { num: "A1", inmediato: false, escribir: true, alPuntuar: fn }

   Tipos de ítem (campo t):
     razonada → opción múltiple + concepto + por qué   (2 pts)
     vf       → verdadero o falso + por qué            (2 pts)
     elige    → solo la justificación                  (2 pts)
     parea    → fragmento ↔ concepto, sobran conceptos (1 pt por par)
     traza    → lenguaje inventado: tabla de valores + D2 y D3
     completa → huecos de código + preguntas cortas    (1 pt cada uno)

   Justificaciones (porque): k = "completa" | "incompleta" | "error"
   Regla de corrección:
     opción correcta + justificación completa  = 2
     opción correcta + justificación incompleta = 1
     sin justificación, razonamiento equivocado u opción incorrecta = 0
   ========================================================= */
(function () {
  const LETRAS = "abcdefghij";
  let contador = 0;

  const esc = s => String(s).replace(/[&<>"]/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));
  const md = s => esc(s).replace(/`([^`]+)`/g, "<code>$1</code>").replace(/\*\*([^*]+)\*\*/g, "<b>$1</b>");
  function barajar(a) { a = a.slice(); for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a; }
  function norm(s) {
    return String(s == null ? "" : s).toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "")
      .replace(/["'«»“”‘’`]/g, "").replace(/\s+/g, "");
  }
  const VACIO = ["—", "-", "–", "nada", "noimprime", "noseimprime", "ninguno", "x", "/"].map(norm);
  function coincide(resp, ok) {
    const r = norm(resp);
    if (!r) return false;
    return [].concat(ok).some(o => norm(o) === norm("—") ? VACIO.includes(r) : norm(o) === r);
  }
  function bloqueCodigo(code, lang) {
    if (!code) return "";
    return `<div class="rz-cod">${lang ? `<span class="rz-lang">${esc(lang)}</span>` : ""}<pre class="codigo">${esc(code)}</pre></div>`;
  }
  const elegido = (el, name) => { const x = el.querySelector(`input[name="${name}"]:checked`); return x ? Number(x.value) : null; };

  /* ---------- Bloque «¿por qué?» (escribir y después elegir) ---------- */
  function htmlPorque(id, pq, escribir, leyenda) {
    return `<div class="rz-paso" data-bloque-pq="${id}">
      <div class="rz-leyenda">${leyenda}</div>
      ${escribir ? `<p class="rz-ayuda">Escríbela primero con tus palabras; después compárala con las opciones y elige la que mejor la expresa.</p>
      <textarea class="rz-escribe" data-escribe="${id}" aria-label="Tu justificación" placeholder="El concepto que lo decide es… porque en este código…"></textarea>
      <div class="rz-cuenta" data-cuenta="${id}">0 palabras</div>
      <button type="button" class="btn sec peq rz-ver" data-ver="${id}">Ver opciones de justificación</button>` : ""}
      <div class="rz-ops" data-pq="${id}" ${escribir ? "hidden" : ""}>
        ${pq.map((x, k) => `<label class="rz-op" data-pqk="${k}"><input type="radio" name="${id}-p" value="${k}"><span class="l">${k + 1}.</span><span class="t">${md(x.t)}</span></label>`).join("")}
      </div>
    </div>`;
  }
  function activarPorque(el, id) {
    const ta = el.querySelector(`[data-escribe="${id}"]`);
    if (!ta) return;
    const cuenta = el.querySelector(`[data-cuenta="${id}"]`);
    ta.addEventListener("input", () => {
      const n = ta.value.trim() ? ta.value.trim().split(/\s+/).length : 0;
      cuenta.textContent = n + (n === 1 ? " palabra" : " palabras") + (n > 0 && n < 12 ? " · una justificación completa suele necesitar más" : "");
    });
    el.querySelector(`[data-ver="${id}"]`).addEventListener("click", ev => {
      el.querySelector(`[data-pq="${id}"]`).hidden = false;
      ev.currentTarget.hidden = true;
    });
  }
  function textoEscrito(el, id) { const ta = el.querySelector(`[data-escribe="${id}"]`); return ta ? ta.value.trim() : ""; }
  function marcarPorque(el, id, pq, pi) {
    const caja = el.querySelector(`[data-pq="${id}"]`);
    caja.hidden = false;
    const ver = el.querySelector(`[data-ver="${id}"]`); if (ver) ver.hidden = true;
    caja.querySelectorAll(".rz-op").forEach(lab => {
      const k = Number(lab.dataset.pqk), x = pq[k];
      lab.classList.add(x.k === "completa" ? "ok" : (k === pi ? (x.k === "incompleta" ? "medio" : "mal") : "x"));
      const nombre = { completa: "Completa", incompleta: "Incompleta", error: "Razonamiento equivocado" }[x.k];
      lab.querySelector(".t").insertAdjacentHTML("afterbegin", `<span class="rz-etq ${x.k}">${nombre}</span>`);
    });
  }
  function fbPorque(pq, pi, escrito, modelo) {
    let h = "";
    if (pi === null) h += `<p><b>Justificación:</b> no elegiste ninguna. Sin justificación el ítem vale 0, aunque la opción sea correcta.</p>`;
    else {
      const x = pq[pi];
      h += `<p><b>La justificación que elegiste es ${x.k === "completa" ? "completa" : x.k === "incompleta" ? "incompleta" : "un razonamiento equivocado"}.</b> ${x.fb ? md(x.fb) : ""}</p>`;
      if (x.k !== "completa") { const c = pq.find(p => p.k === "completa"); if (c && c.fb) h += `<p><b>Por qué la completa sí alcanza:</b> ${md(c.fb)}</p>`; }
    }
    if (modelo) h += `<div class="rz-modelo"><b>Así se ve una justificación de 2 pts:</b> ${md(modelo)}</div>`;
    if (escrito) h += `<p style="margin-top:.6rem"><b>Lo que escribiste:</b></p><div class="rz-tuyo">${esc(escrito)}</div>
      <p class="rz-ayuda" style="margin-top:.4rem">Revísala con tres preguntas: ¿nombra el concepto de la materia? ¿Señala la línea o el valor del código que lo muestra? ¿Explica el mecanismo (por qué pasa), no solo el resultado?</p>`;
    return h;
  }
  const mensaje = {
    2: "Opción correcta y justificación completa.",
    1: "Opción correcta, justificación incompleta: pierdes 1 pt.",
    opcion: "Opción incorrecta.",
    sinjust: "Opción correcta, pero sin justificación: vale 0.",
    razonamiento: "Opción correcta con un razonamiento equivocado: no suma."
  };
  function bloquear(el) {
    el.classList.add("rz-bloq");
    el.querySelectorAll("input, select").forEach(x => x.disabled = true);
    el.querySelectorAll("textarea").forEach(x => x.readOnly = true);
  }
  function cabecera(item, o, max) {
    return `<header>${o.num ? `<span class="rz-num">${esc(o.num)}</span>` : ""}<h3>${md(item.titulo || "")}</h3><span class="rz-max">${max} ${max === 1 ? "pt" : "pts"}</span></header>`;
  }

  /* ---------- razonada ---------- */
  function razonada(item, o) {
    const id = "rz" + (++contador);
    const ops = barajar(item.o.map((x, i) => Object.assign({ i }, x)));
    const conc = barajar(item.concepto.o.map((t, i) => ({ t, ok: i === item.concepto.a })));
    const pq = barajar(item.porque);
    const el = document.createElement("article");
    el.className = "rz-item";
    el.innerHTML = cabecera(item, o, 2)
      + (item.ctx ? `<p class="rz-ctx">${md(item.ctx)}</p>` : "")
      + bloqueCodigo(item.code, item.lang)
      + `<p class="rz-q">${md(item.q)}</p>`
      + `<fieldset class="rz-paso"><legend>1 · Elige la opción correcta</legend><div class="rz-ops">
          ${ops.map((x, k) => `<label class="rz-op" data-i="${x.i}"><input type="radio" name="${id}-o" value="${x.i}"><span class="l">${LETRAS[k]}.</span><span class="t">${md(x.t)}</span></label>`).join("")}
        </div></fieldset>`
      + `<fieldset class="rz-paso"><legend>2 · Lo decide: ¿qué concepto de la materia?</legend><div class="rz-chips">
          ${conc.map((x, k) => `<label class="rz-chip" data-k="${k}"><input type="radio" name="${id}-c" value="${k}"><span>${md(x.t)}</span></label>`).join("")}
        </div></fieldset>`
      + htmlPorque(id, pq, o.escribir, "3 · Lo decide: ¿por qué se aplica a este código?");
    activarPorque(el, id);
    return {
      el, max: 2,
      respondido() { return elegido(el, id + "-o") !== null; },
      corregir() {
        const oi = elegido(el, id + "-o"), ci = elegido(el, id + "-c"), pi = elegido(el, id + "-p");
        const opOk = oi !== null && !!item.o[oi].ok;
        const concOk = ci !== null && conc[ci].ok;
        const pqk = pi !== null ? pq[pi].k : null;
        let pts, estado;
        if (!opOk) { pts = 0; estado = "opcion"; }
        else if (pqk === null) { pts = 0; estado = "sinjust"; }
        else if (pqk === "error") { pts = 0; estado = "razonamiento"; }
        else if (pqk === "completa" && concOk) { pts = 2; estado = "completa"; }
        else { pts = 1; estado = "incompleta"; }
        bloquear(el);
        el.querySelectorAll(".rz-op[data-i]").forEach(lab => {
          const i = Number(lab.dataset.i);
          if (item.o[i].ok) lab.classList.add("ok"); else if (i === oi) lab.classList.add("mal");
        });
        el.querySelectorAll(".rz-chip").forEach(lab => {
          const k = Number(lab.dataset.k);
          if (conc[k].ok) lab.classList.add("ok"); else if (k === ci) lab.classList.add("mal");
        });
        marcarPorque(el, id, pq, pi);
        const correcta = item.o.find(x => x.ok);
        let h = `<h4>${pts}/2 · ${mensaje[pts === 2 ? 2 : pts === 1 ? 1 : estado]}</h4>`;
        if (oi === null) h += `<p>No elegiste opción.</p>`;
        else h += `<p><b>Tu opción:</b> ${md(item.o[oi].por || "")}</p>`;
        if (!opOk) h += `<p><b>La correcta es «${md(correcta.t)}».</b> ${md(correcta.por || "")}</p>`;
        h += `<p><b>Concepto:</b> ${md(item.concepto.o[item.concepto.a])}${ci === null ? " (no elegiste concepto)" : concOk ? " ✓" : ` (elegiste «${md(conc[ci].t)}»)`}.</p>`;
        h += fbPorque(pq, pi, textoEscrito(el, id), item.modelo);
        const otras = item.o.filter((x, i) => !x.ok && i !== oi && x.por);
        if (otras.length) h += `<details><summary>Por qué las otras opciones no</summary><ul>${otras.map(x => `<li><b>«${md(x.t)}»:</b> ${md(x.por)}</li>`).join("")}</ul></details>`;
        el.insertAdjacentHTML("beforeend", `<div class="rz-fb p${pts}">${h}</div>`);
        return { pts, max: 2, estado, u: item.u || [], tema: item.tema || item.titulo };
      }
    };
  }

  /* ---------- verdadero o falso ---------- */
  function vf(item, o) {
    const id = "rz" + (++contador);
    const pq = barajar(item.porque);
    const el = document.createElement("article");
    el.className = "rz-item";
    el.innerHTML = cabecera(item, o, 2)
      + `<p class="rz-q">${md(item.q)}</p>` + bloqueCodigo(item.code, item.lang)
      + `<fieldset class="rz-paso"><legend>1 · ¿Verdadera o falsa?</legend><div class="rz-ops dos">
          <label class="rz-op" data-v="1"><input type="radio" name="${id}-o" value="1"><span class="l">V</span><span class="t">Verdadera</span></label>
          <label class="rz-op" data-v="0"><input type="radio" name="${id}-o" value="0"><span class="l">F</span><span class="t">Falsa</span></label>
        </div></fieldset>`
      + htmlPorque(id, pq, o.escribir, "2 · Justifica siempre, también si es verdadera: si es falsa, qué parte falla; si es verdadera, por qué se cumple.");
    activarPorque(el, id);
    return {
      el, max: 2,
      respondido() { return elegido(el, id + "-o") !== null; },
      corregir() {
        const oi = elegido(el, id + "-o"), pi = elegido(el, id + "-p");
        const ok = oi !== null && (oi === 1) === item.a;
        const pqk = pi !== null ? pq[pi].k : null;
        let pts, estado;
        if (!ok) { pts = 0; estado = "opcion"; }
        else if (pqk === null) { pts = 0; estado = "sinjust"; }
        else if (pqk === "error") { pts = 0; estado = "razonamiento"; }
        else if (pqk === "completa") { pts = 2; estado = "completa"; }
        else { pts = 1; estado = "incompleta"; }
        bloquear(el);
        el.querySelectorAll(".rz-op[data-v]").forEach(lab => {
          const v = lab.dataset.v === "1";
          if (v === item.a) lab.classList.add("ok"); else if (oi !== null && (oi === 1) === v) lab.classList.add("mal");
        });
        marcarPorque(el, id, pq, pi);
        let h = `<h4>${pts}/2 · ${pts === 2 ? "Bien decidida y bien justificada." : pts === 1 ? "Bien decidida, justificación incompleta: pierdes 1 pt." : estado === "opcion" ? `Es ${item.a ? "verdadera" : "falsa"}.` : mensaje[estado]}</h4>`;
        h += fbPorque(pq, pi, textoEscrito(el, id), item.modelo);
        el.insertAdjacentHTML("beforeend", `<div class="rz-fb p${pts}">${h}</div>`);
        return { pts, max: 2, estado, u: item.u || [], tema: item.tema || item.titulo };
      }
    };
  }

  /* ---------- solo justificación ---------- */
  function elige(item, o, dentro) {
    const id = "rz" + (++contador);
    const pq = barajar(item.porque);
    const el = document.createElement(dentro ? "div" : "article");
    el.className = dentro ? "rz-sub" : "rz-item";
    el.innerHTML = (dentro ? `<h4>${md(item.titulo)} · 2 pts</h4>` : cabecera(item, o, 2))
      + `<p class="rz-q">${md(item.q)}</p>` + bloqueCodigo(item.code, item.lang)
      + htmlPorque(id, pq, o.escribir, item.leyenda || "Elige la mejor respuesta");
    activarPorque(el, id);
    return {
      el, max: 2,
      respondido() { return elegido(el, id + "-p") !== null; },
      corregir() {
        const pi = elegido(el, id + "-p");
        const pqk = pi !== null ? pq[pi].k : null;
        const pts = pqk === "completa" ? 2 : pqk === "incompleta" ? 1 : 0;
        bloquear(el);
        marcarPorque(el, id, pq, pi);
        const h = `<h4>${pts}/2</h4>` + fbPorque(pq, pi, textoEscrito(el, id), item.modelo);
        el.insertAdjacentHTML("beforeend", `<div class="rz-fb p${pts}">${h}</div>`);
        return { pts, max: 2, estado: pts === 2 ? "completa" : pts === 1 ? "incompleta" : (pi === null ? "sinjust" : "razonamiento"), u: item.u || [], tema: item.tema || item.titulo };
      }
    };
  }

  /* ---------- pareo ---------- */
  function parea(item, o) {
    const id = "rz" + (++contador);
    const n = Math.min(item.cantidad || 6, item.fragmentos.length);
    const frags = barajar(item.fragmentos).slice(0, n);
    const conceptos = barajar(item.conceptos);
    const letraDe = cid => LETRAS[conceptos.findIndex(c => c.id === cid)];
    const sobran = conceptos.length - n;
    const el = document.createElement("article");
    el.className = "rz-item";
    el.innerHTML = cabecera(item, o, n)
      + `<p class="rz-q">${md(item.q || `Elige la letra del concepto que mejor describe lo que ocurre en cada fragmento. Cada letra se usa una sola vez y sobran ${sobran} conceptos.`)}</p>`
      + `<ul class="rz-conceptos">${conceptos.map((c, k) => `<li><b>${LETRAS[k]}.</b>${md(c.t)}</li>`).join("")}</ul>`
      + `<div class="rz-scroll"><table class="rz-tabla"><thead><tr><th>Fragmento</th><th style="width:7.5rem">Letra</th></tr></thead><tbody>
        ${frags.map((f, k) => `<tr><td><b>${k + 1}.</b>${f.lang ? ` <span class="rz-etq completa" style="font-weight:600">${esc(f.lang)}</span>` : ""}<pre class="codigo">${esc(f.code)}</pre></td>
          <td><select class="rz-sel" data-f="${k}" aria-label="Letra del fragmento ${k + 1}"><option value="">—</option>${conceptos.map((c, j) => `<option value="${c.id}">${LETRAS[j]}</option>`).join("")}</select></td></tr>`).join("")}
      </tbody></table></div>
      <div class="rz-terminaste"><b>Terminaste cuando…</b> cada fragmento tiene una letra, ninguna letra se repite y quedaron ${sobran} conceptos sin usar.</div>`;
    return {
      el, max: n,
      respondido() { return [...el.querySelectorAll("select")].some(s => s.value); },
      corregir() {
        let pts = 0; const filas = [];
        el.querySelectorAll("select").forEach(s => {
          const f = frags[Number(s.dataset.f)];
          const ok = s.value === f.c;
          if (ok) pts++;
          s.classList.add(ok ? "ok" : "mal");
          const c = item.conceptos.find(x => x.id === f.c);
          s.insertAdjacentHTML("afterend", `<span class="rz-sol">${letraDe(f.c)}. ${esc(c.t)}</span>`);
          filas.push(`<li><b>${Number(s.dataset.f) + 1}. ${esc(c.t)}:</b> ${md(f.exp)}</li>`);
        });
        bloquear(el);
        const nombresSobra = conceptos.filter(c => !frags.some(f => f.c === c.id)).map(c => c.t);
        const cls = pts === n ? 2 : pts >= n / 2 ? 1 : 0;
        el.insertAdjacentHTML("beforeend", `<div class="rz-fb p${cls}"><h4>${pts}/${n} pares correctos</h4><ul>${filas.join("")}</ul><p><b>Sobraban:</b> ${nombresSobra.map(esc).join(" y ")}.</p></div>`);
        return { pts, max: n, estado: pts === n ? "completa" : "incompleta", u: item.u || [], tema: item.titulo };
      }
    };
  }

  /* ---------- traza en lenguaje inventado ---------- */
  function htmlReglas(L) {
    return `<div class="rz-reglas"><h4>${esc(L.nombre)} · ${esc(L.lema)}</h4>
      <p class="rz-ayuda" style="margin:0 0 .5rem">${md(L.aviso)}</p>
      <ul>${L.base.map(b => `<li>${md(b)}</li>`).join("")}</ul>
      <div style="margin-top:.7rem">${L.reglas.map(r => `<div class="rz-regla"><b>${esc(r.id)}</b><div><b style="font-family:inherit;color:var(--verde-oscuro)">${esc(r.nombre)}.</b> ${md(r.texto)}</div></div>`).join("")}</div></div>`;
  }
  function traza(item, o) {
    const L = item.leng;
    const el = document.createElement("article");
    el.className = "rz-item";
    const ncols = item.filas[0].v.length;
    const ord = ["1er", "2°", "3er", "4°", "5°", "6°"];
    const sub = [];
    const max = item.filas.length * 2 + (item.d2 ? 2 : 0) + (item.d3 ? 2 : 0);
    el.innerHTML = cabecera(item, o, max) + htmlReglas(L)
      + `<p class="rz-q" style="margin-top:1rem">Programa</p>` + bloqueCodigo(item.programa, L.nombre)
      + `<p class="rz-ctx">${md(item.consigna || `Completa la fila «Original» con las reglas como están arriba. En cada variante cambia **una sola** regla y las otras siguen como en el original. Si una línea provoca un error, escribe **error**; si después de un error ya no se imprime nada, escribe **—**. Cada fila completa vale 2 pts (una celda mal: 1 pt).`)}</p>`
      + `<div class="rz-scroll"><table class="rz-tabla"><thead><tr><th>Versión de ${esc(L.nombre)}</th>${Array.from({ length: ncols }, (_, k) => `<th>${ord[k]} valor</th>`).join("")}</tr></thead><tbody>
        ${item.filas.map((f, i) => `<tr><td><b>${md(f.nombre)}</b>${f.desc ? `<br><span class="rz-ayuda">${md(f.desc)}</span>` : ""}</td>${f.v.map((_, j) => `<td><input class="rz-in" data-f="${i}" data-c="${j}" aria-label="${esc(f.nombre)}, ${ord[j]} valor" autocomplete="off" spellcheck="false"></td>`).join("")}</tr>`).join("")}
      </tbody></table></div>`;
    ["d2", "d3"].forEach(k => { if (item[k]) { const s = elige(item[k], o, true); sub.push(s); el.appendChild(s.el); } });
    if (item.terminaste) el.insertAdjacentHTML("beforeend", `<div class="rz-terminaste"><b>Terminaste cuando…</b> ${md(item.terminaste)}</div>`);
    return {
      el, max,
      respondido() { return [...el.querySelectorAll(".rz-in")].some(x => x.value.trim()); },
      corregir() {
        let pts = 0; const det = [];
        item.filas.forEach((f, i) => {
          let malas = 0;
          f.v.forEach((v, j) => {
            const inp = el.querySelector(`.rz-in[data-f="${i}"][data-c="${j}"]`);
            const ok = coincide(inp.value, v);
            if (!ok) malas++;
            inp.classList.add(ok ? "ok" : "mal");
            inp.insertAdjacentHTML("afterend", `<span class="rz-sol">${esc([].concat(v)[0])}</span>`);
          });
          const p = malas === 0 ? 2 : malas === 1 ? 1 : 0;
          pts += p;
          det.push(`<li><b>${md(f.nombre)} · ${p}/2.</b> ${md(f.exp || "")}</li>`);
        });
        el.querySelectorAll(".rz-in").forEach(x => x.disabled = true);
        el.querySelector(".rz-scroll").insertAdjacentHTML("afterend", `<div class="rz-fb p${pts === item.filas.length * 2 ? 2 : pts >= item.filas.length ? 1 : 0}"><h4>Traza: ${pts}/${item.filas.length * 2}</h4><ul>${det.join("")}</ul></div>`);
        let estado = "completa";
        sub.forEach(s => { const r = s.corregir(); pts += r.pts; if (r.pts < 2) estado = "incompleta"; });
        if (pts < max) estado = "incompleta";
        return { pts, max, estado, u: item.u || [], tema: item.titulo };
      }
    };
  }

  /* ---------- completar código ---------- */
  function completa(item, o) {
    const id = "rz" + (++contador);
    const el = document.createElement("article");
    el.className = "rz-item";
    const extras = (item.extras || []).map(x => Object.assign({}, x, { ops: barajar(x.o.map((t, i) => ({ t, i }))) }));
    const max = item.huecos.length + (item.salida ? 1 : 0) + extras.length;
    el.innerHTML = cabecera(item, o, max)
      + (item.ctx ? `<p class="rz-ctx">${md(item.ctx)}</p>` : "")
      + bloqueCodigo(item.antes, item.lang)
      + (item.medio ? `<p class="rz-ctx">${md(item.medio)}</p>` : "")
      + bloqueCodigo(item.code, item.lang)
      + `<div class="rz-scroll"><table class="rz-tabla"><thead><tr><th style="width:4rem">Hueco</th><th>Lo que va en el hueco</th></tr></thead><tbody>
        ${item.huecos.map((hh, k) => `<tr><td><b>(${k + 1})</b></td><td><select class="rz-sel" data-h="${k}" aria-label="Hueco ${k + 1}"><option value="">Elige…</option>${barajar(hh.o.map((t, i) => ({ t, i }))).map(x => `<option value="${x.i}">${esc(x.t)}</option>`).join("")}</select></td></tr>`).join("")}
      </tbody></table></div>`
      + (item.salida ? `<div class="rz-paso"><label class="rz-leyenda" for="${id}-s">${md(item.salida.q)}</label><input class="rz-in ancho" id="${id}-s" data-salida autocomplete="off" spellcheck="false"></div>` : "")
      + extras.map((x, k) => `<fieldset class="rz-paso"><legend>${md(x.q)}</legend><div class="rz-ops">${x.ops.map((op, j) => `<label class="rz-op" data-x="${k}" data-i="${op.i}"><input type="radio" name="${id}-x${k}" value="${op.i}"><span class="l">${LETRAS[j]}.</span><span class="t">${md(op.t)}</span></label>`).join("")}</div></fieldset>`).join("")
      + (item.terminaste ? `<div class="rz-terminaste"><b>Terminaste cuando…</b> ${md(item.terminaste)}</div>` : "");
    return {
      el, max,
      respondido() { return [...el.querySelectorAll("select")].some(s => s.value) || !!el.querySelector("input:checked"); },
      corregir() {
        let pts = 0; const det = [];
        el.querySelectorAll("select[data-h]").forEach(s => {
          const k = Number(s.dataset.h), hh = item.huecos[k];
          const ok = s.value !== "" && Number(s.value) === hh.a;
          if (ok) pts++;
          s.classList.add(ok ? "ok" : "mal");
          s.insertAdjacentHTML("afterend", `<span class="rz-sol">${esc(hh.o[hh.a])}</span>`);
          det.push(`<li><b>(${k + 1}) ${ok ? "✓" : "✗"}</b> ${md(hh.exp || "")}</li>`);
        });
        if (item.salida) {
          const inp = el.querySelector("[data-salida]");
          const ok = coincide(inp.value, item.salida.a);
          if (ok) pts++;
          inp.classList.add(ok ? "ok" : "mal");
          inp.insertAdjacentHTML("afterend", `<span class="rz-sol">${esc([].concat(item.salida.a)[0])}</span>`);
          det.push(`<li><b>Salida ${ok ? "✓" : "✗"}</b> ${md(item.salida.exp || "")}</li>`);
        }
        extras.forEach((x, k) => {
          const v = elegido(el, `${id}-x${k}`);
          const ok = v === x.a;
          if (ok) pts++;
          el.querySelectorAll(`.rz-op[data-x="${k}"]`).forEach(lab => { const i = Number(lab.dataset.i); if (i === x.a) lab.classList.add("ok"); else if (i === v) lab.classList.add("mal"); });
          det.push(`<li><b>${md(x.q.replace(/\s*\(\d+ pts?\)/, ""))} ${ok ? "✓" : "✗"}</b> ${md(x.fb || "")}</li>`);
        });
        bloquear(el);
        el.insertAdjacentHTML("beforeend", `<div class="rz-fb p${pts === max ? 2 : pts >= max / 2 ? 1 : 0}"><h4>${pts}/${max}</h4><ul>${det.join("")}</ul>${item.modelo ? `<div class="rz-modelo"><b>Solución completa:</b><pre class="codigo" style="margin:.4rem 0 0">${esc(item.modelo)}</pre></div>` : ""}</div>`);
        return { pts, max, estado: pts === max ? "completa" : "incompleta", u: item.u || [], tema: item.titulo };
      }
    };
  }

  const TIPOS = { razonada, vf, elige, parea, traza, completa };

  /* Crea un ítem. En modo inmediato agrega «Revisar» e «Intentar de nuevo». */
  function crear(item, opciones) {
    const o = Object.assign({ escribir: true, inmediato: false }, opciones || {});
    const ctrl = TIPOS[item.t](item, o);
    ctrl.el.__rz = { item };
    if (!o.inmediato) return ctrl;
    const acc = document.createElement("div");
    acc.className = "rz-acciones";
    acc.innerHTML = `<button type="button" class="btn" data-rev>Revisar</button>`;
    ctrl.el.appendChild(acc);
    acc.querySelector("[data-rev]").addEventListener("click", () => {
      if (!ctrl.respondido()) { acc.querySelector("[data-rev]").textContent = "Responde primero y vuelve a tocar"; return; }
      const r = ctrl.corregir();
      acc.remove();
      const otra = document.createElement("div");
      otra.className = "rz-acciones";
      otra.innerHTML = `<button type="button" class="btn sec" data-otra>Intentar de nuevo</button>`;
      ctrl.el.appendChild(otra);
      otra.querySelector("[data-otra]").addEventListener("click", () => {
        const nuevo = crear(item, opciones);
        ctrl.el.replaceWith(nuevo.el);
        nuevo.el.scrollIntoView({ behavior: "smooth", block: "start" });
        if (o.alReiniciar) o.alReiniciar(nuevo);
      });
      if (o.alPuntuar) o.alPuntuar(r, ctrl);
    });
    return ctrl;
  }

  window.Razonada = { crear, barajar, esc, md, htmlReglas, coincide, bloqueCodigo };
})();
