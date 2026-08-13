/* ============================================
   Mavzu (yorug' / qorong'i) almashtirish
   ============================================
   Tanlov brauzer xotirasida saqlanadi, shuning uchun
   sahifa yangilangandan keyin ham o'sha holatda qoladi.
*/

(function () {
  var KEY = 'mavzu';
  var root = document.documentElement;

  function qoy(mavzu) {
    root.setAttribute('data-theme', mavzu);
  }

  /* 1. Saqlangan tanlovni o'qish */
  var saqlangan = null;
  try {
    saqlangan = localStorage.getItem(KEY);
  } catch (e) {
    /* ba'zi brauzerlarda localStorage yopiq bo'lishi mumkin */
  }

  /* 2. Tanlov bo'lmasa - tizim sozlamasiga qarab */
  if (saqlangan === 'dark' || saqlangan === 'light') {
    qoy(saqlangan);
  } else {
    var qorongi = window.matchMedia &&
                  window.matchMedia('(prefers-color-scheme: dark)').matches;
    qoy(qorongi ? 'dark' : 'light');
  }

  /* 3. Tugmani ulash */
  document.addEventListener('DOMContentLoaded', function () {
    var tugma = document.getElementById('themeBtn');
    if (!tugma) return;

    tugma.addEventListener('click', function () {
      var keyingi = root.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
      qoy(keyingi);
      try {
        localStorage.setItem(KEY, keyingi);
      } catch (e) {}
    });
  });
})();
