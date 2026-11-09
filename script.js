
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
})();