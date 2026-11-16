/* Aula Danfer · Casos para el final: muestra CASOS (casos-examen.js) para estudio.
   Preguntas cerradas con devolución inmediata por opción; desarrollo con criterios. */
(function () {
  const zona = document.getElementById("casos");
  const indice = document.getElementById("indice-casos");
  const BLOQUES = window.BLOQUES_CASOS || {};
  const LETRAS = ["A", "B", "C", "D", "E"];
  function esc(s) { return String(s).replace(/[&<>"]/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c])); }
  function mezclar(a) { a = a.slice(); for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a; }
  const nivel = n => `<span class="nivel n${n}">${esc(NIVELES[n])}</span>`;

  indice.innerHTML = Object.keys(BLOQUES).map(b => {
    const cs = CASOS.filter(c => String(c.bloque) === b);
    if (!cs.length) return "";
    return `<div class="grupo-u"><h3>Bloque ${b} · ${esc(BLOQUES[b])}</h3><div class="rejilla">${cs.map(c =>
      `<a class="ficha-link" href="#caso-${c.id}"><span class="sigla">U${c.unidades.join(" · U")}</span><h3>${esc(c.titulo)}</h3><p>${c.preguntas.length} cerradas · ${c.abiertas.length} de desarrollo</p></a>`).join("")}</div></div>`;
  }).join("");

  zona.innerHTML = CASOS.map(c => `
    <section class="seccion caso-examen" id="caso-${c.id}">
      <p class="etiqueta">Bloque ${c.bloque} · Unidad${c.unidades.length > 1 ? "es" : ""} ${c.unidades.join(" y ")}</p>
      <h2>${esc(c.titulo)}</h2>
      <div class="caso-usf"><span class="tit">El caso</span><p>${esc(c.texto)}</p></div>
      <h3 class="sub-caso">Preguntas cerradas</h3>
      <ol class="cerradas">${c.preguntas.map((p, k) => {
        const orden = mezclar(p.o.map((_, i) => i));
        return `<li class="cerrada" data-caso="${c.id}" data-k="${k}">
          <p class="enunciado-caso">${nivel(p.n)} ${esc(p.q)}</p>
          <div class="opciones">${orden.map((i, pos) => `<button type="button" class="opcion" data-i="${i}"><span class="letra">${LETRAS[pos]}</span><span>${esc(p.o[i])}</span></button>`).join("")}</div>
          <p class="devolucion" aria-live="polite" hidden></p>
        </li>`;
      }).join("")}</ol>
      <h3 class="sub-caso">Desarrollo</h3>
      ${c.abiertas.map(a => `<div class="abierta">
        <p class="enunciado-caso">${nivel(a.n)} ${esc(a.q)}</p>
        <p class="nota-local">Escríbela primero en papel, como en el examen. Después abre los criterios y corrígete.</p>
        <details class="criterios"><summary>Criterios para autocorregirte</summary>
          <p><b>Una buena respuesta…</b></p><ul>${a.criterios.map(x => `<li>${esc(x)}</li>`).join("")}</ul>
          <p><b>Resta…</b></p><ul class="restan">${a.restan.map(x => `<li>${esc(x)}</li>`).join("")}</ul>
        </details></div>`).join("")}
      <p class="volver-indice"><a href="#indice">↑ Volver a la lista de casos</a></p>
    </section>`).join("");

  window.addEventListener("beforeprint", () => document.querySelectorAll("details.criterios").forEach(d => { d.open = true; }));

  zona.addEventListener("click", ev => {
    const b = ev.target.closest(".opcion"); if (!b) return;
    const li = b.closest(".cerrada");
    const c = CASOS.find(x => x.id === li.dataset.caso), p = c.preguntas[Number(li.dataset.k)];
    const i = Number(b.dataset.i), ok = i === p.a;
    b.classList.add(ok ? "ok" : "mal");
    const dev = li.querySelector(".devolucion");
    dev.hidden = false;
    dev.className = "devolucion " + (ok ? "bien" : "mal");
    dev.textContent = p.fb[i] + (ok ? "" : " Prueba otra opción.");
    if (ok) li.querySelectorAll(".opcion").forEach(x => { x.disabled = true; if (x !== b && !x.classList.contains("mal")) x.classList.add("descartada"); });
    else b.disabled = true;
  });
})();
