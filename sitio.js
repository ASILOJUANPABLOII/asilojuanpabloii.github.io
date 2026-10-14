/* Rellena los datos de config.js en la página. No es necesario editar este archivo. */
(function () {
  var S = window.SITIO || {};
  document.querySelectorAll("[data-campo]").forEach(function (el) {
    var v = S[el.getAttribute("data-campo")];
    if (v) el.textContent = v;
  });
  document.querySelectorAll("[data-correo]").forEach(function (el) {
    if (S.correo) { el.href = "mailto:" + S.correo; el.textContent = S.correo; }
  });
  document.querySelectorAll("[data-correo2]").forEach(function (el) {
    if (S.correo2) { el.href = "mailto:" + S.correo2; el.textContent = S.correo2; }
    else (el.closest("li") || el).style.display = "none";
  });
  ["facebook", "instagram"].forEach(function (red) {
    document.querySelectorAll("[data-" + red + "]").forEach(function (el) {
      if (S[red]) { el.href = S[red]; el.target = "_blank"; el.rel = "noopener"; }
      else (el.closest("li") || el).style.display = "none";
    });
  });
  document.querySelectorAll("[data-telefono]").forEach(function (el) {
    if (S.telefono) { el.href = "tel:" + S.telefono.replace(/[^\d+]/g, ""); el.textContent = S.telefono; }
  });
  document.querySelectorAll("[data-whatsapp]").forEach(function (el) {
    if (S.whatsapp) el.href = "https://wa.me/" + S.whatsapp;
    else el.style.display = "none";
  });
  document.querySelectorAll("[data-donar]").forEach(function (el) {
    if (S.linkDonacion) { el.href = S.linkDonacion; el.target = "_blank"; el.rel = "noopener"; }
    else { el.href = "#contacto"; el.title = "Enlace de donación en configuración"; }
  });
  var y = document.getElementById("anio");
  if (y) y.textContent = new Date().getFullYear();
  // Oculta imágenes que todavía no se han subido
  document.querySelectorAll("img[data-opcional]").forEach(function (img) {
    var ocultar = function () {
      var box = img.closest("[data-contenedor]") || img;
      box.style.display = "none";
      if (box.parentElement && box.parentElement.classList.contains("dos-col")) box.parentElement.style.gridTemplateColumns = "1fr";
    };
    if (img.complete && img.naturalWidth === 0) ocultar();
    else img.addEventListener("error", ocultar);
  });
})();
window.addEventListener("load", function () {
  var g = document.getElementById("galeria");
  if (g && !Array.prototype.some.call(g.querySelectorAll("figure"), function (f) { return f.style.display !== "none"; })) g.style.display = "none";
});
