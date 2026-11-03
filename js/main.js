document.addEventListener('DOMContentLoaded', function () {
  const cta = document.querySelector('.cta-button');
  if (cta && window.location.search) {
    const sep = cta.href.indexOf('?') >= 0 ? '&' : '?';
    cta.href = cta.href + sep + window.location.search.slice(1);
  }
});
