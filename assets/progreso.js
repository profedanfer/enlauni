/* =========================================================
   Aula Danfer · Mi progreso (motor compartido)
   Junta lo que guardan, en este navegador, las páginas de la materia:
   unidades marcadas como repasadas, la Ruta de Repaso y los simulacros.
   Necesita BANCO y UNIDADES (banco-preguntas.js) y PROGRESO (configuración).
   ========================================================= */
(function () {
  const C = window.PROGRESO;
  const UNIS = Object.keys(UNIDADES).map(Number).sort((a, b) => a - b);
  const N = UNIS.length;
  const zona = document.getElementById("zona");
  function leer(k, def) { try { return JSON.parse(localStorage.getItem(k)) || def; } catch (e) { return def; } }
  function esc(s) { return String(s).replace(/[&<>"]/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c])); }
  const pct = x => Math.round(x * 100) + "%";

  function pintar() {
    const rep = leer(C.claveRepaso, {});
    const ruta = leer(C.claveRuta, {});
    const sims = leer(C.claveSim, []);
    const maxRuta = u => BANCO.filter(p => p.u === u).length * 2;

    const repasadas = UNIS.filter(u => rep[u]).length;
    const estaciones = UNIS.filter(u => ruta[u] !== undefined);
    const rutaPts = estaciones.reduce((s, u) => s + ruta[u], 0);
    const rutaMax = UNIS.reduce((s, u) => s + maxRuta(u), 0);
    const mejorSim = sims.reduce((m, s) => Math.max(m, s.ok / s.n), 0);
    const ultSim = sims[sims.length - 1];

    /* Último resultado de simulacro por unidad */
    const simU = {};
    sims.forEach(s => Object.keys(s.porU).forEach(u => { simU[u] = s.porU[u]; }));

    /* Sellos de Ada */
    const completoConBuenaNota = sims.some(s => (s.unis || []).length === N && s.ok / s.n >= .7);
    const sellos = [
      ["🌱", "Primer paso", "Marcaste tu primera unidad como repasada.", repasadas >= 1],
      ["🧭", "Mitad del camino", "Repasaste la mitad de las unidades.", repasadas >= Math.ceil(N / 2)],
      ["📚", "Todo repasado", "Marcaste todas las unidades.", repasadas === N],
      ["🚉", "En ruta", "Completaste tu primera estación de la Ruta.", estaciones.length >= 1],
      ["🏁", "Ruta completa", "Pasaste por todas las estaciones.", estaciones.length === N],
      ["🥇", "Ruta de oro", "Todas las estaciones con 80% o más.", estaciones.length === N && UNIS.every(u => ruta[u] / maxRuta(u) >= .8)],
      ["📝", "Primer simulacro", "Hiciste tu primer simulacro.", sims.length >= 1],
      ["🔁", "Constancia", "Hiciste tres simulacros o más.", sims.length >= 3],
      ["🎓", "Preparación completa", "Simulacro con todas las unidades y 70% o más.", completoConBuenaNota]
    ];
    const ganados = sellos.filter(s => s[3]).length;

    /* Próximo paso según Ada */
    let paso;
    const sinRepasar = UNIS.find(u => !rep[u]);
    const flojas = Object.keys(simU).map(Number).filter(u => simU[u][0] / simU[u][1] < .6);
    if (!repasadas && !sims.length && !estaciones.length) paso = `Empieza por la <a href="u${UNIS[0]}.html">Unidad ${UNIS[0]}</a>: lee el repaso, resuelve la autoevaluación y márcala como repasada.`;
    else if (flojas.length) paso = `En tu último simulacro te costó la <a href="u${flojas[0]}.html">Unidad ${flojas[0]}</a>. Repásala y juega su <a href="juegos/ruta-de-repaso.html#u${flojas[0]}">estación de la Ruta</a>.`;
    else if (sinRepasar) paso = `Te falta repasar la <a href="u${sinRepasar}.html">Unidad ${sinRepasar} · ${esc(UNIDADES[sinRepasar].nombre)}</a>.`;
    else if (!completoConBuenaNota) paso = `Ya repasaste todo. Ahora haz un <a href="juegos/simulacro.html">simulacro con todas las unidades</a> y apunta a 70% o más.`;
    else paso = "Estás en muy buena forma. Antes del examen, haz otro simulacro para confirmar que no se te olvidó nada.";

    zona.innerHTML = `
      <div class="escena"><img src="../assets/personajes/ada.svg" alt="" width="68" height="80"><div class="globo"><span class="quien">Ada · tu próximo paso</span><p>${paso}</p></div></div>

      <section class="seccion">
        <h2>Resumen</h2>
        <div class="fechas">
          <div class="fecha"><span class="etapa">Unidades repasadas</span><span class="num"><b>${repasadas} de ${N}</b></span></div>
          <div class="fecha"><span class="etapa">Ruta de Repaso</span><span class="num">${estaciones.length ? `<b>${estaciones.length} de ${N}</b> estaciones · ${pct(rutaPts / rutaMax)} de los puntos` : `Todavía no jugaste. <a href="juegos/ruta-de-repaso.html">Empezar</a>`}</span></div>
          <div class="fecha"><span class="etapa">Simulacros</span><span class="num">${sims.length ? `<b>${sims.length}</b> · el último ${pct(ultSim.ok / ultSim.n)} · el mejor ${pct(mejorSim)}` : `Todavía no hiciste ninguno. <a href="juegos/simulacro.html">Hacer uno</a>`}</span></div>
          <div class="fecha"><span class="etapa">Sellos de Ada</span><span class="num"><b>${ganados} de ${sellos.length}</b></span></div>
        </div>
      </section>

      <section class="seccion">
        <h2>Unidad por unidad</h2>
        <div class="tabla-scroll"><table class="comp tabla-unidades">
          <thead><tr><th scope="col">Unidad</th><th scope="col">Repasada</th><th scope="col">Ruta</th><th scope="col">Último simulacro</th></tr></thead>
          <tbody>${UNIS.map(u => `<tr><th scope="row"><a href="u${u}.html">U${u}</a> · ${esc(UNIDADES[u].nombre)}</th>
            <td class="${rep[u] ? "si" : "no"}">${rep[u] ? "✓ Sí" : "—"}</td>
            <td class="num">${ruta[u] !== undefined ? pct(ruta[u] / maxRuta(u)) : "—"}</td>
            <td class="num">${simU[u] ? `${simU[u][0]}/${simU[u][1]}` : "—"}</td></tr>`).join("")}</tbody>
        </table></div>
      </section>

      ${sims.length ? `<section class="seccion">
        <h2>Tus simulacros</h2>
        <div class="barras">${sims.slice(-6).map(s => `<div class="fila-barra" style="grid-template-columns:5.2rem 1fr 3.6rem"><span class="num">${new Date(s.fecha).toLocaleDateString("es-PY", { day: "2-digit", month: "2-digit" })}</span><div class="pista-barra"><i class="${s.ok / s.n < .6 ? "baja" : ""}" style="width:${s.ok / s.n * 100}%"></i></div><span class="num">${pct(s.ok / s.n)}</span></div>`).join("")}</div>
      </section>` : ""}

      <section class="seccion">
        <h2>Sellos de Ada</h2>
        <div class="sellos">${sellos.map(([m, t, d, ok]) => `<div class="sello${ok ? "" : " bloqueado"}"><span class="medalla" aria-hidden="true">${m}</span><b>${t}</b><small>${ok ? d : "Bloqueado · " + d}</small></div>`).join("")}</div>
      </section>

      <section class="seccion">
        <p class="nota-local">Tu progreso se guarda solo en este navegador y en este dispositivo. Nadie más lo ve, ni siquiera tu docente. Si borras los datos del navegador o cambias de dispositivo, empiezas de cero.</p>
        <div class="fila-botones"><button type="button" class="btn sec" id="btnBorrar">Borrar mi progreso</button></div>
        <div id="confirmar"></div>
      </section>`;

    document.getElementById("btnBorrar").addEventListener("click", () => {
      document.getElementById("confirmar").innerHTML = `<div class="escena der"><img src="../assets/personajes/bug.svg" alt="" width="68" height="72"><div class="globo"><span class="quien">Bug</span><p>¿Seguro? Se borran las unidades marcadas, la Ruta y los simulacros de esta materia. No hay vuelta atrás.</p>
        <div class="fila-botones"><button type="button" class="btn" id="siBorrar">Sí, borrar todo</button><button type="button" class="btn sec" id="noBorrar">Cancelar</button></div></div></div>`;
      document.getElementById("siBorrar").addEventListener("click", () => {
        [C.claveRepaso, C.claveRuta, C.claveSim].forEach(k => { try { localStorage.removeItem(k); } catch (e) {} });
        pintar();
      });
      document.getElementById("noBorrar").addEventListener("click", () => document.getElementById("confirmar").innerHTML = "");
    });
  }
  pintar();
})();
