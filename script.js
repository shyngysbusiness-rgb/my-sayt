/* ============================================
   1. Mavzu (yorug' / qorong'i) almashtirish
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

  /* saqlangan tanlovni o'qish */
  var saqlangan = null;
  try {
    saqlangan = localStorage.getItem(KEY);
  } catch (e) {
    /* ba'zi brauzerlarda localStorage yopiq bo'lishi mumkin */
  }

  /* tanlov bo'lmasa - tizim sozlamasiga qarab */
  if (saqlangan === 'dark' || saqlangan === 'light') {
    qoy(saqlangan);
  } else {
    var qorongi = window.matchMedia &&
                  window.matchMedia('(prefers-color-scheme: dark)').matches;
    qoy(qorongi ? 'dark' : 'light');
  }

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


/* ============================================
   2. Savol-javob akkordeoni
   ============================================
   Bitta savol ochilganda qolganlari yopiladi.
*/

document.addEventListener('DOMContentLoaded', function () {
  var savollar = document.querySelectorAll('.faq-q');

  savollar.forEach(function (tugma) {
    tugma.addEventListener('click', function () {
      var blok = tugma.parentElement;
      var ochiqEdi = blok.classList.contains('open');

      /* avval hammasini yopamiz */
      document.querySelectorAll('.faq-item.open').forEach(function (b) {
        b.classList.remove('open');
        b.querySelector('.faq-q').setAttribute('aria-expanded', 'false');
      });

      /* bosilgani yopiq bo'lsa - ochamiz */
      if (!ochiqEdi) {
        blok.classList.add('open');
        tugma.setAttribute('aria-expanded', 'true');
      }
    });
  });
});


/* ============================================
   3. Scroll qilganda bo'limlar paydo bo'lishi
   ============================================
   Bo'lim ekranga kirganda unga "in" klassi qo'shiladi,
   qolganini CSS bajaradi. Har bo'lim bir marta ishlaydi.
*/

document.addEventListener('DOMContentLoaded', function () {
  var elementlar = document.querySelectorAll('.reveal');
  if (!elementlar.length) return;

  var kamHarakat = window.matchMedia &&
                   window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* eski brauzer yoki "harakatni kamaytir" yoqilgan bo'lsa -
     animatsiyasiz, hammasi darhol ko'rinadi */
  if (kamHarakat || !('IntersectionObserver' in window)) {
    elementlar.forEach(function (el) { el.classList.add('in'); });
    return;
  }

  var kuzatuvchi = new IntersectionObserver(function (yozuvlar) {
    yozuvlar.forEach(function (yozuv) {
      if (yozuv.isIntersecting) {
        yozuv.target.classList.add('in');
        kuzatuvchi.unobserve(yozuv.target);
      }
    });
  }, {
    threshold: 0.08,
    rootMargin: '0px 0px -60px 0px'
  });

  elementlar.forEach(function (el) { kuzatuvchi.observe(el); });
});
