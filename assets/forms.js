/* Peak & Pillar form helper — Web3Forms
   Replace the WEB3FORMS_ACCESS_KEY string with the live access key before deploy. */
(function () {
  "use strict";

  var WEB3FORMS_ACCESS_KEY = "05733f80-e41d-4c95-ab43-9b3bbe3f9129";
  var ENDPOINT = "https://api.web3forms.com/submit";
  var THANKS = "/contact/thanks/";
  var TIMEOUT_MS = 12000;
  var PHONE_DISPLAY = "647-885-9183";
  var PHONE_TEL = "+16478859183";
  var MAILTO = "info@peakandpillar.ca";

  function setAccessKeys() {
    document.querySelectorAll('form input[name="access_key"]').forEach(function (el) {
      el.value = WEB3FORMS_ACCESS_KEY;
    });
  }

  function fieldLabel(el) {
    if (!el || !el.name) return "";
    if (el.type === "hidden" || el.name === "botcheck" || el.name === "access_key") return "";
    var id = el.id;
    if (id) {
      var lab = document.querySelector('label[for="' + id + '"]');
      if (lab) return lab.textContent.replace(/\s*\*\s*$/, "").replace(/\s+/g, " ").trim();
    }
    var fs = el.closest("fieldset");
    if (fs) {
      var leg = fs.querySelector("legend");
      if (leg) return leg.textContent.replace(/\s*\*\s*$/, "").replace(/\s+/g, " ").trim();
    }
    return el.name;
  }

  function collectPairs(form) {
    var pairs = [];
    var seenRadio = {};
    Array.prototype.forEach.call(form.elements, function (el) {
      if (!el.name || el.disabled) return;
      if (el.type === "hidden" && (el.name === "access_key" || el.name === "redirect" || el.name === "subject" || el.name === "from_name")) return;
      if (el.name === "botcheck") return;
      if (el.type === "checkbox" || el.type === "radio") {
        if (!el.checked) return;
        if (el.type === "radio") {
          if (seenRadio[el.name]) return;
          seenRadio[el.name] = true;
        }
      }
      var val = (el.value || "").trim();
      if (!val) return;
      var label = fieldLabel(el);
      pairs.push({ label: label || el.name, value: val });
    });
    return pairs;
  }

  function buildMailto(subject, pairs) {
    var lines = pairs.map(function (p) { return p.label + ": " + p.value; });
    var body = lines.join("\n");
    return "mailto:" + MAILTO +
      "?subject=" + encodeURIComponent(subject) +
      "&body=" + encodeURIComponent(body);
  }

  function ensureFallback(form) {
    var box = form.querySelector(".form-fallback");
    if (box) return box;
    box = document.createElement("div");
    box.className = "form-fallback";
    box.setAttribute("role", "alert");
    box.hidden = true;
    box.innerHTML =
      '<p>Our form is having trouble right now. Your message is ready to send by email, or call/text ' +
      '<a class="form-fallback-tel" href="tel:' + PHONE_TEL + '">' + PHONE_DISPLAY + '</a>.</p>' +
      '<div class="form-fallback-actions">' +
      '<a class="btn btn-primary form-fallback-mail" href="#">Send by email</a>' +
      '<a class="btn btn-outline form-fallback-call" href="tel:' + PHONE_TEL + '">Call or text ' + PHONE_DISPLAY + '</a>' +
      "</div>";
    var btn = form.querySelector('[type="submit"]');
    if (btn && btn.parentNode === form) {
      form.insertBefore(box, btn);
    } else {
      form.appendChild(box);
    }
    return box;
  }

  function showFallback(form, subject) {
    var box = ensureFallback(form);
    var pairs = collectPairs(form);
    var mail = box.querySelector(".form-fallback-mail");
    if (mail) mail.setAttribute("href", buildMailto(subject, pairs));
    box.hidden = false;
    box.scrollIntoView({ behavior: "smooth", block: "nearest" });
  }

  function hideFallback(form) {
    var box = form.querySelector(".form-fallback");
    if (box) box.hidden = true;
  }

  function payloadFromForm(form) {
    var data = {};
    var fd = new FormData(form);
    fd.forEach(function (value, key) {
      if (key === "botcheck") {
        // unchecked checkbox is omitted from FormData — good
        data[key] = value;
        return;
      }
      if (Object.prototype.hasOwnProperty.call(data, key)) {
        var cur = data[key];
        data[key] = Array.isArray(cur) ? cur.concat([value]) : [cur, value];
      } else {
        data[key] = value;
      }
    });
    data.access_key = WEB3FORMS_ACCESS_KEY;
    // Do not send redirect on JSON path (Web3Forms recommends JS-side redirect)
    delete data.redirect;
    return data;
  }

  function wireReach(form, phoneName, emailName, reachId, errId) {
    var p = form.elements[phoneName];
    var m = form.elements[emailName];
    var g = document.getElementById(reachId);
    var err = document.getElementById(errId);
    if (!p || !m || !g || !err) return function () { return true; };
    function ok() { return p.value.trim() !== "" || m.value.trim() !== ""; }
    function clear() {
      if (ok()) {
        err.hidden = true;
        g.classList.remove("invalid");
        p.removeAttribute("aria-invalid");
        m.removeAttribute("aria-invalid");
      }
    }
    p.addEventListener("input", clear);
    m.addEventListener("input", clear);
    return function validate() {
      if (ok()) return true;
      err.hidden = false;
      g.classList.add("invalid");
      p.setAttribute("aria-invalid", "true");
      m.setAttribute("aria-invalid", "true");
      p.focus();
      return false;
    };
  }

  function wireForm(opts) {
    var form = document.getElementById(opts.formId);
    if (!form) return;
    var btn = form.querySelector('[type="submit"]');
    var originalLabel = btn ? btn.textContent : "Submit";
    var subjectEl = form.querySelector('input[name="subject"]');
    var subject = (subjectEl && subjectEl.value) || "Peak & Pillar inquiry";
    var validateReach = wireReach(form, opts.phoneName, opts.emailName, opts.reachId, opts.errId);

    form.addEventListener("submit", function (e) {
      e.preventDefault();
      hideFallback(form);
      if (!validateReach()) return;
      if (btn) {
        btn.disabled = true;
        btn.textContent = "Sending…";
      }

      var controller = typeof AbortController !== "undefined" ? new AbortController() : null;
      var timer = setTimeout(function () {
        if (controller) controller.abort();
      }, TIMEOUT_MS);

      var body = JSON.stringify(payloadFromForm(form));

      fetch(ENDPOINT, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        body: body,
        signal: controller ? controller.signal : undefined
      })
        .then(function (res) {
          return res.json().then(function (json) {
            return { res: res, json: json };
          }).catch(function () {
            return { res: res, json: null };
          });
        })
        .then(function (pack) {
          clearTimeout(timer);
          var okHttp = pack.res && pack.res.ok;
          var okJson = pack.json && pack.json.success === true;
          if (okHttp && okJson) {
            window.location.href = THANKS;
            return;
          }
          showFallback(form, subject);
          if (btn) { btn.disabled = false; btn.textContent = originalLabel; }
        })
        .catch(function () {
          clearTimeout(timer);
          showFallback(form, subject);
          if (btn) { btn.disabled = false; btn.textContent = originalLabel; }
        });
    });
  }

  function init() {
    setAccessKeys();
    wireForm({
      formId: "inquiry",
      phoneName: "phone",
      emailName: "email",
      reachId: "reach",
      errId: "reach-error"
    });
    wireForm({
      formId: "supplies-quote-form",
      phoneName: "phone",
      emailName: "email",
      reachId: "sq-reach",
      errId: "sq-reach-error"
    });
    wireForm({
      formId: "request-item-form",
      phoneName: "phone",
      emailName: "email",
      reachId: "ri-reach",
      errId: "ri-reach-error"
    });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
