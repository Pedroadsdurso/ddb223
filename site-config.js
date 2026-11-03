/**
 * CONFIGURAÇÃO GLOBAL DO SITE & RASTREAMENTO DINÂMICO
 * Desacopla as URLs de destino e preserva parâmetros de tráfego (Google Ads / Meta Ads).
 */
window.SITE = {
  destino: "1/index.html",
  destinoFinal: "#",
  ano: 2026
};

(function () {
  function initConfig() {
    var cfg = window.SITE || {};

    try {
      var yearEls = document.querySelectorAll('.dynamic-year, #year');
      var currentYear = new Date().getFullYear();
      yearEls.forEach(function (el) {
        el.textContent = currentYear;
      });
    } catch (e) {}

    try {
      var DEST = String(cfg.destino || '1/index.html').trim();

      function buildDestino(customTarget) {
        var target = customTarget || DEST;
        if (!target || target === '#' || target === 'javascript:void(0)') {
          return target;
        }

        var KEEP = [
          'gclid', 'gclsrc', 'wbraid', 'wbraidcd',
          'utm_source', 'utm_medium', 'utm_campaign', 'utm_term', 'utm_content',
          'subid', 'sub_id', 'aff_id', 'aff_sub', 'pid', 'fbclid', 'ttclid'
        ];

        var qp = new URLSearchParams(window.location.search);
        var u;
        try {
          u = new URL(target, window.location.href);
        } catch (err) {
          return target;
        }

        var temConhecido = KEEP.some(function (k) { return qp.get(k); });
        if (!temConhecido && window.location.search.length > 1) {
          u.search = window.location.search;
        } else {
          KEEP.forEach(function (k) {
            var v = qp.get(k);
            if (v) {
              u.searchParams.set(k, v);
            }
          });
        }
        return u.href;
      }

      document.querySelectorAll('a.cta[href], a.cta-button[href]').forEach(function (a) {
        try {
          var custom = a.getAttribute('data-destino');
          a.setAttribute('href', buildDestino(custom));
        } catch (err) {}
      });
    } catch (e) {}
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initConfig);
  } else {
    initConfig();
  }
})();
