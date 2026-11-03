/* Peak & Pillar mobile nav */
(function () {
  "use strict";

  function init() {
    var header = document.querySelector(".site-header");
    var toggle = document.querySelector(".nav-toggle");
    var nav = document.getElementById("main-nav");
    if (!header || !toggle || !nav) return;

    var openLabel = "Open menu";
    var closeLabel = "Close menu";

    function isOpen() {
      return header.classList.contains("is-nav-open");
    }

    function setOpen(open) {
      header.classList.toggle("is-nav-open", open);
      document.body.classList.toggle("nav-lock", open);
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
      toggle.setAttribute("aria-label", open ? closeLabel : openLabel);
    }

    function close() { setOpen(false); }
    function open() { setOpen(true); }
    function toggleMenu() { setOpen(!isOpen()); }

    toggle.addEventListener("click", function (e) {
      e.stopPropagation();
      toggleMenu();
    });

    nav.addEventListener("click", function (e) {
      var a = e.target.closest("a");
      if (a) close();
    });

    document.addEventListener("click", function (e) {
      if (!isOpen()) return;
      if (header.contains(e.target)) return;
      close();
    });

    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && isOpen()) {
        close();
        toggle.focus();
      }
    });

    // Close if resized to desktop
    var mq = window.matchMedia("(min-width: 1025px)");
    function onMq(e) {
      if (e.matches) close();
    }
    if (mq.addEventListener) mq.addEventListener("change", onMq);
    else if (mq.addListener) mq.addListener(onMq);
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
