/* Peak & Pillar GA4 click tracking */
(function () {
  "use strict";
  document.addEventListener("click", function (e) {
    if (typeof gtag !== "function" || !e.target || !e.target.closest) return;
    var a = e.target.closest('a[href^="tel:"], a[href^="mailto:"]');
    if (!a) return;
    var href = a.getAttribute("href");
    gtag("event", href.indexOf("tel:") === 0 ? "phone_click" : "email_click", {
      link_url: href,
      page_path: location.pathname
    });
  });
})();
