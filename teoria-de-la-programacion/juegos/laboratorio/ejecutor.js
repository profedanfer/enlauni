/* Controlador de ejecución con vigilante de tiempo.
   Laboratorio.python(codigo, {limite, alProgreso})  → ejecuta Python real (Pyodide).
   Laboratorio.js(codigo, {limite, alProgreso})      → ejecuta la reproducción en JavaScript.
   Si el programa supera el límite, el worker se termina y el resultado es {fin: "detenido"}. */
(function () {
  const dir = new URL(".", document.currentScript.src).href;
  const params = new URLSearchParams(location.search);
  const basePy = params.get("pyodide");             // solo para pruebas locales

  let py = null, estado = "sin-cargar", esperando = null, cola = Promise.resolve();
  const oyentes = new Set();
  function setEstado(e, extra) { estado = e; oyentes.forEach(f => f(e, extra)); }

  function crearPy() {
    py = new Worker(dir + "python-worker.js" + (basePy ? "?base=" + encodeURIComponent(basePy) : ""), { type: "module" });
    setEstado("cargando");
    return new Promise((resolver) => {
      const limite = setTimeout(() => { py.terminate(); py = null; setEstado("fallo", "La carga tardó demasiado."); resolver(false); }, 60000);
      py.onmessage = (ev) => {
        if (ev.data.t === "listo") { clearTimeout(limite); setEstado("listo", ev.data.version); resolver(true); }
        if (ev.data.t === "fallo") { clearTimeout(limite); py.terminate(); py = null; setEstado("fallo", ev.data.mensaje); resolver(false); }
      };
      py.onerror = (e) => { clearTimeout(limite); if (py) py.terminate(); py = null; setEstado("fallo", e.message || "No se pudo iniciar el worker."); resolver(false); };
    });
  }

  async function cargar() {
    if (estado === "listo") return true;
    if (esperando) return esperando;
    esperando = crearPy().finally(() => { esperando = null; });
    return esperando;
  }

  function correr(worker, codigo, { limite = 5000, alProgreso } = {}, alDetener) {
    return new Promise((resolver) => {
      const t0 = performance.now();
      const reloj = setInterval(() => alProgreso && alProgreso({ ms: performance.now() - t0 }), 200);
      const corte = setTimeout(() => {
        clearInterval(reloj); worker.terminate(); alDetener && alDetener();
        resolver({ fin: "detenido", ms: limite });
      }, limite);
      worker.onmessage = (ev) => {
        const d = ev.data;
        if (d.t === "progreso") alProgreso && alProgreso(Object.assign({ ms: performance.now() - t0 }, d));
        if (d.t === "fin") { clearTimeout(corte); clearInterval(reloj); resolver(Object.assign({ fin: d.error ? "error" : "ok" }, d)); }
      };
      worker.postMessage({ codigo });
    });
  }

  window.Laboratorio = {
    get estado() { return estado; },
    alCambiarEstado(f) { oyentes.add(f); f(estado); },
    cargar,
    python(codigo, op) {
      // una ejecución por vez: si se pide otra mientras corre, espera su turno
      const turno = cola.then(async () => {
        if (!(await cargar())) return { fin: "sin-python" };
        const w = py;
        return correr(w, codigo, op, () => { py = null; setEstado("sin-cargar"); });
      });
      cola = turno.catch(() => {});
      return turno;
    },
    js(codigo, op) {
      const w = new Worker(dir + "js-worker.js");
      return correr(w, codigo, op).then(r => { w.terminate(); return r; });
    },
    esCelular: matchMedia("(max-width: 700px)").matches || (navigator.deviceMemory && navigator.deviceMemory < 4)
  };
})();
