/* Aula Danfer · botón claro/oscuro.
   Se carga en el <head> para aplicar el tema antes de pintar (sin parpadeo).
   La elección se guarda en este navegador; si no hay elección, sigue al sistema. */
(function () {
  var CLAVE = "aula-danfer-tema";
  var raiz = document.documentElement;
  var oscuroSistema = window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)");
  function guardado() { try { return localStorage.getItem(CLAVE); } catch (e) { return null; } }
  function actual() { return raiz.getAttribute("data-theme") || (oscuroSistema && oscuroSistema.matches ? "dark" : "light"); }
  var g = guardado();
  if (g === "dark" || g === "light") raiz.setAttribute("data-theme", g);

  function pintar(boton) {
    var oscuro = actual() === "dark";
    boton.setAttribute("aria-pressed", oscuro ? "true" : "false");
    boton.setAttribute("aria-label", oscuro ? "Cambiar a modo claro" : "Cambiar a modo oscuro");
    boton.innerHTML = '<span aria-hidden="true">' + (oscuro ? "☀" : "☾") + "</span>" + (oscuro ? "Modo claro" : "Modo oscuro");
  }
  document.addEventListener("DOMContentLoaded", function () {
    var cab = document.querySelector("header.inst");
    if (!cab) return;
    var boton = document.createElement("button");
    boton.type = "button"; boton.className = "tema-btn";
    var der = document.createElement("span"); der.className = "inst-der";
    var ultimo = cab.lastElementChild;
    if (ultimo && cab.children.length > 1) { cab.insertBefore(der, ultimo); der.appendChild(ultimo); } else { cab.appendChild(der); }
    der.appendChild(boton);
    pintar(boton);
    boton.addEventListener("click", function () {
      var nuevo = actual() === "dark" ? "light" : "dark";
      raiz.setAttribute("data-theme", nuevo);
      try { localStorage.setItem(CLAVE, nuevo); } catch (e) {}
      pintar(boton);
    });
    if (oscuroSistema && oscuroSistema.addEventListener) oscuroSistema.addEventListener("change", function () { pintar(boton); });
  });
})();
