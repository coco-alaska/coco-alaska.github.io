/* The email address is assembled here so it never appears as plain text in the page source. */
(function () {
  var d = document.getElementById('cd');
  var parts = ['c.kuehnapfel', 'tu-berlin.de'];
  var addr = parts[0] + '@' + parts[1];
  document.querySelectorAll('[data-contact]').forEach(function (b) {
    b.addEventListener('click', function (e) {
      e.preventDefault();
      d.querySelector('.addr').textContent = addr;
      d.querySelector('.mail').href = 'mailto:' + addr;
      d.showModal();
    });
  });
  d.querySelector('.copy-btn').addEventListener('click', function () {
    var b = this;
    (navigator.clipboard ? navigator.clipboard.writeText(addr) : Promise.reject()).then(
      function () { b.textContent = 'Copied'; },
      function () { b.textContent = 'Select and copy above'; });
  });
  d.querySelector('.close').addEventListener('click', function () { d.close(); });
  d.addEventListener('click', function (e) { if (e.target === d) d.close(); });
})();

/* Past events slider */
(function () {
  var r = document.querySelector('.rail');
  if (!r) return;
  var b = Array.prototype.slice.call(document.querySelectorAll('.evbtn'));
  function step() { return r.querySelector('.ev').getBoundingClientRect().width + 26; }
  function upd() { b[0].disabled = r.scrollLeft < 4; b[1].disabled = r.scrollLeft > r.scrollWidth - r.clientWidth - 4; }
  b.forEach(function (x) { x.addEventListener('click', function () { r.scrollBy({ left: x.dataset.dir * step() * 2, behavior: 'smooth' }); }); });
  r.addEventListener('scroll', upd); upd();
  r.addEventListener('keydown', function (e) {
    if (e.key === 'ArrowRight') r.scrollBy({ left: step(), behavior: 'smooth' });
    if (e.key === 'ArrowLeft') r.scrollBy({ left: -step(), behavior: 'smooth' });
  });
  var d = 0, sx = 0, sl = 0, moved = 0;
  r.addEventListener('pointerdown', function (e) { if (e.pointerType !== 'mouse') return; d = 1; moved = 0; sx = e.clientX; sl = r.scrollLeft; });
  addEventListener('pointermove', function (e) { if (!d) return; var dx = e.clientX - sx; if (Math.abs(dx) > 4) { moved = 1; r.classList.add('drag'); } r.scrollLeft = sl - dx; });
  addEventListener('pointerup', function () { d = 0; r.classList.remove('drag'); });
  r.addEventListener('click', function (e) { if (moved) { e.preventDefault(); moved = 0; } }, true);
})();
