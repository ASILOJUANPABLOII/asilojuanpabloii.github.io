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
  // Botón de Stripe (sección "Dona ahora")
  document.querySelectorAll("[data-stripe]").forEach(function (el) {
    if (S.linkDonacion) { el.href = S.linkDonacion; el.target = "_blank"; el.rel = "noopener"; }
    else { el.classList.add("deshabilitado"); el.removeAttribute("href"); el.textContent = "Pago con tarjeta disponible muy pronto"; }
  });
  // Oculta la opción de transferencia mientras no haya CLABE capturada
  if (!S.clabe || S.clabe.indexOf("[") !== -1) {
    document.querySelectorAll(".opcion.transferencia").forEach(function (el) {
      el.style.display = "none";
      if (el.parentElement) el.parentElement.style.gridTemplateColumns = "minmax(0, 520px)";
      if (el.parentElement) el.parentElement.style.justifyContent = "center";
    });
  }
  // Botón de PayPal: se oculta si no hay enlace
  document.querySelectorAll("[data-paypal]").forEach(function (el) {
    if (S.linkPaypal) { el.href = S.linkPaypal; el.target = "_blank"; el.rel = "noopener"; }
    else { var b = el.closest("[data-paypal-bloque]") || el; b.style.display = "none"; }
  });
  // Botones para copiar CLABE, etc.
  document.querySelectorAll("[data-copiar]").forEach(function (btn) {
    btn.addEventListener("click", function () {
      var v = (S[btn.getAttribute("data-copiar")] || "").replace(/\s/g, "");
      var listo = function () { var t = btn.textContent; btn.textContent = "¡Copiado!"; setTimeout(function () { btn.textContent = t; }, 1600); };
      if (navigator.clipboard) navigator.clipboard.writeText(v).then(listo, function () { window.prompt("Copia este dato:", v); });
      else window.prompt("Copia este dato:", v);
    });
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
