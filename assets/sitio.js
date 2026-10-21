/* Pestañas de código y fechas pasadas. Sin JavaScript, todo queda visible. */
(function () {
  document.querySelectorAll(".tabs").forEach(function (tabs) {
    var botones = tabs.querySelectorAll(".tabs-botones button");
    var paneles = tabs.querySelectorAll(".tab-panel");
    function mostrar(i) {
      botones.forEach(function (b, k) { b.setAttribute("aria-selected", k === i ? "true" : "false"); b.tabIndex = k === i ? 0 : -1; });
      paneles.forEach(function (p, k) { p.hidden = k !== i; });
    }
    botones.forEach(function (b, i) {
      b.addEventListener("click", function () { mostrar(i); });
      b.addEventListener("keydown", function (e) {
        if (e.key === "ArrowRight" || e.key === "ArrowLeft") {
          var j = (i + (e.key === "ArrowRight" ? 1 : botones.length - 1)) % botones.length;
          mostrar(j); botones[j].focus();
        }
      });
    });
    tabs.querySelector(".tabs-botones").hidden = false;
    mostrar(0);
  });

  var hoy = new Date(); hoy.setHours(0, 0, 0, 0);
  document.querySelectorAll(".fecha time[datetime]").forEach(function (t) {
    var d = new Date(t.getAttribute("datetime") + "T23:59:59");
    if (d < hoy) t.closest(".fecha").classList.add("pasada");
  });
})();
