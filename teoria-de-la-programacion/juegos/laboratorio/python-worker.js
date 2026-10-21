/* Ejecuta Python real (Pyodide) en un proceso aparte de la página.
   La página controla el tiempo: si el programa no termina, termina este worker. */
const BASE_CDN = "https://cdn.jsdelivr.net/npm/pyodide@314.0.7/";
const base = new URL(self.location.href).searchParams.get("base") || BASE_CDN;

let pyodide = null;
let lineas = 0, primeras = [], ultimas = [], ultimoEnvio = 0;
const MAX = 40;

function guardar(linea) {
  lineas++;
  if (primeras.length < MAX) primeras.push(linea);
  else { ultimas.push(linea); if (ultimas.length > MAX) ultimas.shift(); }
  const ahora = performance.now();
  if (ahora - ultimoEnvio > 100) {          // a lo sumo 10 avisos por segundo
    ultimoEnvio = ahora;
    self.postMessage({ t: "progreso", lineas, ultima: linea });
  }
}

async function iniciar() {
  try {
    const mod = await import(base + "pyodide.mjs");
    pyodide = await mod.loadPyodide({ indexURL: base });
    pyodide.setStdout({ batched: guardar });
    pyodide.setStderr({ batched: guardar });
    self.postMessage({ t: "listo", version: pyodide.version });
  } catch (e) {
    self.postMessage({ t: "fallo", mensaje: String(e && e.message || e) });
  }
}

self.onmessage = (ev) => {
  const { codigo } = ev.data;
  lineas = 0; primeras = []; ultimas = []; ultimoEnvio = 0;
  const t0 = performance.now();
  let error = null;
  try {
    pyodide.runPython(codigo, { globals: pyodide.toPy({}) });
  } catch (e) {
    const texto = String(e && e.message || e);
    let lin = texto.trim().split("\n");
    // quita las líneas internas de Pyodide para que la traza se vea como en CPython
    const corte = lin.findIndex(l => l.includes('File "<exec>"'));
    if (corte > 0) lin = ["Traceback (most recent call last):"].concat(lin.slice(corte));
    lin = lin.map(l => l.replace('File "<exec>"', 'File "programa.py"'));
    const ultima = lin[lin.length - 1];
    const tipo = (ultima.match(/^([A-Za-z_][A-Za-z0-9_]*(Error|Exception|Warning|Interrupt))/) || [null, ultima])[1];
    const repetidas = (texto.match(/Previous line repeated (\d+) more times/) || [])[1];
    error = { tipo, ultima, traza: lin.slice(-6).join("\n"), repetidas: repetidas ? Number(repetidas) : null };
  }
  self.postMessage({ t: "fin", ms: performance.now() - t0, lineas, primeras, ultimas, error });
};

iniciar();
