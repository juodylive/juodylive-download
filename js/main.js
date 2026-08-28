(function () {
  'use strict';

  var langBtns = document.querySelectorAll('.lang-btn');
  var defaultLang = 'ar';

  function getSaved() {
    try {
      return localStorage.getItem('prefLang');
    } catch (e) {
      return null;
    }
  }

  function saveLang(lang) {
    try {
      localStorage.setItem('prefLang', lang);
    } catch (e) {
      // تجاهل أخطاء التخزين (وضع التصفح الخاص)
    }
  }

  function applyLang(lang) {
    var isAr = lang === 'ar';
    document.documentElement.lang = lang;
    document.documentElement.dir = isAr ? 'rtl' : 'ltr';
    document.title = isAr
      ? 'سياسة الخصوصية | تطبيق البث المباشر والغرف الصوتية'
      : 'Privacy Policy | Live Streaming & Voice Rooms App';

    document.querySelectorAll('[data-ar], [data-en]').forEach(function (el) {
      var value = isAr ? el.getAttribute('data-ar') : el.getAttribute('data-en');
      if (value !== null && el.textContent !== value) {
        el.textContent = value;
      }
    });

    langBtns.forEach(function (btn) {
      var active = btn.getAttribute('data-lang') === lang;
      btn.classList.toggle('active', active);
      btn.setAttribute('aria-pressed', String(active));
    });

    saveLang(lang);
  }

  langBtns.forEach(function (btn) {
    btn.addEventListener('click', function () {
      applyLang(btn.getAttribute('data-lang'));
    });
  });

  applyLang(getSaved() === 'en' ? 'en' : 'ar');
})();
