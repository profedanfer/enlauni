/* Modo liviano: ejecuta en JavaScript una reproducción del mismo fenómeno.
   tick(v) cuenta pasos (vueltas, llamadas) y avisa a la página como mucho 10 veces por segundo. */
self.onmessage = (ev) => {
  const { codigo } = ev.data;
  let pasos = 0, ultimo = 0, valor = null, maxProf = 0;
  const tick = (v) => {
    pasos++; valor = v;
    if (typeof v === "number" && v < 0) maxProf = Math.max(maxProf, -v);
    const ahora = performance.now();
    if (ahora - ultimo > 100) { ultimo = ahora; self.postMessage({ t: "progreso", pasos, valor }); }
  };
  const t0 = performance.now();
  let error = null;
  try { new Function("tick", codigo)(tick); }
  catch (e) { error = { tipo: e.name, ultima: e.name + ": " + e.message }; }
  self.postMessage({ t: "fin", ms: performance.now() - t0, pasos, valor, error, profundidad: pasos });
};
