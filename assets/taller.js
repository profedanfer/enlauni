/* Aula Danfer · Taller de IA con criterio: copiar el prompt y descargar plantillas. */
(function () {
  document.querySelectorAll("[data-copiar]").forEach(function (b) {
    b.hidden = false;
    b.addEventListener("click", function () {
      var pre = document.getElementById(b.getAttribute("data-copiar"));
      var texto = pre.innerText;
      function listo() { var t = b.textContent; b.textContent = "✓ Copiado"; setTimeout(function () { b.textContent = t; }, 1800); }
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(texto).then(listo, function () { seleccionar(pre); });
      } else { seleccionar(pre); }
    });
  });
  function seleccionar(el) { var r = document.createRange(); r.selectNodeContents(el); var s = window.getSelection(); s.removeAllRanges(); s.addRange(r); }
  document.querySelectorAll("[data-csv]").forEach(function (b) {
    b.hidden = false;
    b.addEventListener("click", function () {
      var tabla = document.getElementById(b.getAttribute("data-csv"));
      var filas = Array.from(tabla.querySelectorAll("tr")).map(function (tr) {
        return Array.from(tr.children).map(function (c) { return '"' + c.innerText.replace(/"/g, '""') + '"'; }).join(";");
      });
      var blob = new Blob(["﻿" + filas.join("\r\n")], { type: "text/csv;charset=utf-8" });
      var a = document.createElement("a"); a.href = URL.createObjectURL(blob); a.download = b.getAttribute("data-nombre") || "plantilla.csv";
      document.body.appendChild(a); a.click(); a.remove();
    });
  });
})();
