
(function () {
  // 1. Find all menu links (the ones starting with #) in the sidebar
  var links = document.querySelectorAll('nav.side a[href^="#"]');

  // 2. Build a list of the matching sections on the page
  var map = {};
  links.forEach(function (a) {
    map[a.getAttribute('href').slice(1)] = a;
  });

  var sections = Object.keys(map)
    .map(function (id) { return document.getElementById(id); })
    .filter(Boolean);

  // 3. Decide which section is current and highlight its menu item
  function update() {
    var current = sections[0].id;
    sections.forEach(function (s) {
      // A section counts as "current" once its top is near the top of the screen
      if (s.getBoundingClientRect().top <= 120) current = s.id;
    });

    links.forEach(function (a) {
      a.setAttribute('aria-current',
        a.getAttribute('href') === '#' + current ? 'true' : 'false');
    });
  }

  // 4. Run when the page scrolls and when it first loads
  window.addEventListener('scroll', update, { passive: true });
  update();


  

/* =====================================================================
   THEME TOGGLE
   Switches between light and dark colors when the button is clicked.
   The choice is remembered on this device. If the button has never been
   clicked, the site follows the device setting.
   ===================================================================== */
(function () {
  var root = document.documentElement;
  var button = document.getElementById('theme-toggle');
  if (!button) return;

  // Current theme: the saved choice, or the device setting if none
  function currentTheme() {
    var saved = root.getAttribute('data-theme');
    if (saved === 'light' || saved === 'dark') return saved;
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  }

  // Update the button text to offer the opposite theme
  function updateLabel() {
    button.textContent = currentTheme() === 'dark' ? 'Maliwanag na tema' : 'Madilim na tema';
  }

  // Apply the theme saved from an earlier visit (if any)
  try {
    var saved = localStorage.getItem('theme');
    if (saved === 'light' || saved === 'dark') root.setAttribute('data-theme', saved);
  } catch (e) { /* storage not available: use device setting */ }

  button.addEventListener('click', function () {
    var next = currentTheme() === 'dark' ? 'light' : 'dark';
    root.setAttribute('data-theme', next);
    try { localStorage.setItem('theme', next); } catch (e) { /* ignore */ }
    updateLabel();
  });

  updateLabel();
})();
})();