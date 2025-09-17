// translate.js
function googleTranslateElementInit() {
  new google.translate.TranslateElement(
    {
      pageLanguage: 'en',          // Default English
      includedLanguages: 'en,mr',  // Only English + Marathi
      layout: google.translate.TranslateElement.InlineLayout.HORIZONTAL
    },
    'google_translate_element'
  );
}

// Save selected language into localStorage (attach once)
(function setupLangPersistence() {
  function attachComboListener() {
    var combo = document.querySelector(".goog-te-combo");
    if (combo && !combo.__hasListener) {
      combo.addEventListener("change", function () {
        try { localStorage.setItem("preferredLang", combo.value); } catch(e){}
      });
      combo.__hasListener = true;
      var saved = localStorage.getItem("preferredLang");
      if (saved && saved !== 'en') {
        combo.value = saved;
        combo.dispatchEvent(new Event("change"));
      }
    }
  }

  var obs = new MutationObserver(function() { attachComboListener(); });
  obs.observe(document.body, { childList: true, subtree: true });

  window.addEventListener('load', function() {
    setTimeout(attachComboListener, 800);
    var savedLang = localStorage.getItem("preferredLang");
    if (savedLang && savedLang !== 'en') {
      setTimeout(function () {
        var combo = document.querySelector(".goog-te-combo");
        if (combo) {
          combo.value = savedLang;
          combo.dispatchEvent(new Event("change"));
        } else {
          setTimeout(function(){
            var combo2 = document.querySelector(".goog-te-combo");
            if (combo2){ combo2.value = savedLang; combo2.dispatchEvent(new Event("change")); }
          }, 800);
        }
      }, 1000);
    }

    try {
      var els = document.querySelectorAll('.site-year');
      els.forEach(function(e){ e.textContent = new Date().getFullYear(); });
      var el = document.getElementById('yr');
      if (el) el.textContent = new Date().getFullYear();
    } catch(e){}
  });
})();
