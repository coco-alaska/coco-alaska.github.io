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
