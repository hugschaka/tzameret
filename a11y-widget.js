/* צמרת — accessibility toolbar (self-hosted, no third-party "auto-fix" overlay).
 * Real user-preference controls layered ON TOP of the source-level accessibility.
 * Settings persist in localStorage and apply across pages. The widget is itself
 * keyboard-accessible (focus trap, Esc, aria-pressed/expanded). */
(function () {
  'use strict';
  var KEY = 'tz-a11y';
  var state = { fs: 100, contrast: false, links: false, spacing: false, stopmotion: false };
  try { Object.assign(state, JSON.parse(localStorage.getItem(KEY) || '{}')); } catch (e) {}

  var root = document.documentElement;
  function apply() {
    root.style.zoom = (state.fs / 100) || 1;
    root.classList.toggle('tza-contrast', !!state.contrast);
    root.classList.toggle('tza-links', !!state.links);
    root.classList.toggle('tza-spacing', !!state.spacing);
    root.classList.toggle('tza-stopmotion', !!state.stopmotion);
    if (state.stopmotion) { var v = document.getElementById('demo-video'); if (v) { try { v.pause(); } catch (e) {} } }
    try { localStorage.setItem(KEY, JSON.stringify(state)); } catch (e) {}
  }

  function css() {
    return '' +
    '.tza-btn{position:fixed;bottom:20px;inset-inline-start:20px;z-index:2147483000;width:56px;height:56px;border-radius:50%;' +
      'border:none;background:#1f3a5f;color:#fff;cursor:pointer;box-shadow:0 6px 20px rgba(0,0,0,.28);display:flex;align-items:center;justify-content:center;transition:transform .15s ease,background .15s ease}' +
    '.tza-btn:hover{transform:translateY(-2px);background:#15304d}' +
    '.tza-btn svg{width:30px;height:30px}' +
    '.tza-panel{position:fixed;bottom:86px;inset-inline-start:20px;z-index:2147483000;width:300px;max-width:calc(100vw - 40px);' +
      'background:#fff;color:#1f2937;border:1px solid #e5e7eb;border-radius:16px;box-shadow:0 20px 60px rgba(0,0,0,.25);' +
      'padding:16px;font-family:"Heebo",Arial,sans-serif;direction:rtl;display:none}' +
    '.tza-panel.open{display:block}' +
    '.tza-panel h2{font-size:17px;font-weight:800;color:#15304d;margin:0 0 4px}' +
    '.tza-panel .tza-note{font-size:11.5px;color:#6b7280;margin:0 0 12px}' +
    '.tza-row{display:flex;align-items:center;gap:8px;margin-bottom:8px}' +
    '.tza-opt{flex:1;display:flex;align-items:center;justify-content:space-between;gap:8px;background:#f7f9fb;border:1.5px solid #e5e7eb;border-radius:10px;' +
      'padding:11px 13px;font-size:14.5px;font-weight:600;color:#1f2937;cursor:pointer;font-family:inherit;text-align:start}' +
    '.tza-opt[aria-pressed="true"]{background:#eaeff5;border-color:#1f3a5f;color:#15304d}' +
    '.tza-opt .tza-state{font-size:12px;font-weight:700;color:#1f3a5f}' +
    '.tza-fs{display:flex;align-items:center;gap:8px;margin-bottom:8px}' +
    '.tza-fs span{flex:1;font-size:14.5px;font-weight:600}' +
    '.tza-fs button{width:38px;height:38px;border-radius:9px;border:1.5px solid #e5e7eb;background:#fff;font-size:18px;font-weight:800;color:#1f3a5f;cursor:pointer}' +
    '.tza-fs button:hover{border-color:#1f3a5f}' +
    '.tza-fs b{min-width:52px;text-align:center;font-size:13px;color:#4b5563}' +
    '.tza-reset{width:100%;margin-top:6px;background:#fff;border:1.5px solid #e5e7eb;border-radius:10px;padding:10px;font-size:14px;font-weight:700;color:#b4232a;cursor:pointer;font-family:inherit}' +
    '.tza-reset:hover{background:#fdf0f0}' +
    '.tza-link{display:block;text-align:center;margin-top:10px;font-size:13px;color:#1f3a5f;font-weight:600}' +
    '.tza-btn:focus-visible,.tza-opt:focus-visible,.tza-fs button:focus-visible,.tza-reset:focus-visible,.tza-link:focus-visible{outline:3px solid #1f3a5f;outline-offset:2px}' +
    /* applied preferences */
    'html.tza-links a{text-decoration:underline !important;outline:1px solid currentColor;outline-offset:2px}' +
    'html.tza-spacing p,html.tza-spacing li,html.tza-spacing .sub,html.tza-spacing .sec-sub{letter-spacing:.03em !important;word-spacing:.12em !important;line-height:1.95 !important}' +
    'html.tza-stopmotion *,html.tza-stopmotion *::before,html.tza-stopmotion *::after{animation:none !important;transition:none !important;scroll-behavior:auto !important}' +
    'html.tza-contrast body{background:#fff !important}' +
    'html.tza-contrast nav,html.tza-contrast .hero,html.tza-contrast .strip,html.tza-contrast #features,html.tza-contrast #plans,html.tza-contrast #how,html.tza-contrast footer,html.tza-contrast .top{background:#fff !important;background-image:none !important}' +
    'html.tza-contrast #contact{background:#000 !important;background-image:none !important}' +
    'html.tza-contrast h1,html.tza-contrast h2,html.tza-contrast h3,html.tza-contrast p,html.tza-contrast li,html.tza-contrast .sub,html.tza-contrast .sec-sub,html.tza-contrast .nav-links a,html.tza-contrast .strip-inner,html.tza-contrast .feat p,html.tza-contrast .step p,html.tza-contrast td{color:#000 !important}' +
    'html.tza-contrast #contact *{color:#fff !important}' +
    'html.tza-contrast a:not(.btn){color:#0033cc !important;text-decoration:underline !important}' +
    'html.tza-contrast .btn-primary,html.tza-contrast .wizbtn{background:#15304d !important;color:#fff !important}' +
    'html.tza-contrast .card,html.tza-contrast .feat,html.tza-contrast .step,html.tza-contrast .plan{border:2px solid #000 !important}';
  }

  var PERSON = '<svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><circle cx="12" cy="4" r="2" fill="currentColor"/><path d="M12 7c-3 0-8 .5-8 2s5 1.5 5 1.5v3l-2 6h2l2-5 2 5h2l-2-6v-3s5 .5 5-1.5-5-2-8-2Z" fill="currentColor"/></svg>';

  function build() {
    var style = document.createElement('style'); style.textContent = css(); document.head.appendChild(style);

    var btn = document.createElement('button');
    btn.className = 'tza-btn'; btn.type = 'button';
    btn.setAttribute('aria-label', 'פתיחת תפריט נגישות'); btn.setAttribute('aria-expanded', 'false'); btn.setAttribute('aria-controls', 'tza-panel');
    btn.innerHTML = PERSON;

    var panel = document.createElement('div');
    panel.className = 'tza-panel'; panel.id = 'tza-panel'; panel.setAttribute('role', 'dialog'); panel.setAttribute('aria-label', 'הגדרות נגישות');
    panel.innerHTML =
      '<h2>נגישות</h2><p class="tza-note">ההעדפות נשמרות בדפדפן שלך.</p>' +
      '<div class="tza-fs"><span>גודל טקסט</span>' +
        '<button type="button" data-act="fs-" aria-label="הקטנת טקסט">A−</button>' +
        '<b id="tza-fsval">100%</b>' +
        '<button type="button" data-act="fs+" aria-label="הגדלת טקסט">A+</button></div>' +
      '<div class="tza-row"><button class="tza-opt" type="button" data-t="contrast" aria-pressed="false">ניגודיות גבוהה <span class="tza-state">כבוי</span></button></div>' +
      '<div class="tza-row"><button class="tza-opt" type="button" data-t="links" aria-pressed="false">הדגשת קישורים <span class="tza-state">כבוי</span></button></div>' +
      '<div class="tza-row"><button class="tza-opt" type="button" data-t="spacing" aria-pressed="false">ריווח קריא <span class="tza-state">כבוי</span></button></div>' +
      '<div class="tza-row"><button class="tza-opt" type="button" data-t="stopmotion" aria-pressed="false">עצירת אנימציות <span class="tza-state">כבוי</span></button></div>' +
      '<button class="tza-reset" type="button" data-act="reset">איפוס הגדרות</button>' +
      '<a class="tza-link" href="accessibility.html">הצהרת נגישות</a>';

    document.body.appendChild(btn); document.body.appendChild(panel);

    function refreshUI() {
      document.getElementById('tza-fsval').textContent = state.fs + '%';
      panel.querySelectorAll('.tza-opt').forEach(function (o) {
        var on = !!state[o.dataset.t];
        o.setAttribute('aria-pressed', String(on));
        o.querySelector('.tza-state').textContent = on ? 'פועל' : 'כבוי';
      });
    }
    var open = false, lastFocus = null;
    function setOpen(v) {
      open = v; panel.classList.toggle('open', v); btn.setAttribute('aria-expanded', String(v));
      if (v) { lastFocus = document.activeElement; setTimeout(function () { panel.querySelector('button,a').focus(); }, 20); }
      else if (lastFocus && lastFocus.focus) { try { lastFocus.focus(); } catch (e) {} }
    }
    btn.addEventListener('click', function () { setOpen(!open); });
    document.addEventListener('click', function (e) { if (open && !panel.contains(e.target) && e.target !== btn && !btn.contains(e.target)) setOpen(false); });
    panel.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') { setOpen(false); btn.focus(); return; }
      if (e.key !== 'Tab') return;
      var f = [].slice.call(panel.querySelectorAll('button,a')); if (!f.length) return;
      var first = f[0], last = f[f.length - 1];
      if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
      else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
    });
    panel.addEventListener('click', function (e) {
      var t = e.target.closest('[data-t],[data-act]'); if (!t) return;
      if (t.dataset.t) { state[t.dataset.t] = !state[t.dataset.t]; }
      else if (t.dataset.act === 'fs+') { state.fs = Math.min(160, state.fs + 15); }
      else if (t.dataset.act === 'fs-') { state.fs = Math.max(90, state.fs - 15); }
      else if (t.dataset.act === 'reset') { state = { fs: 100, contrast: false, links: false, spacing: false, stopmotion: false }; }
      apply(); refreshUI();
    });
    refreshUI();
  }

  apply(); // apply saved prefs immediately (zoom/classes), before building UI
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', build); else build();
})();
