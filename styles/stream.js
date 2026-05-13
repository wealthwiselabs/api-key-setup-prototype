// Tiny "streaming" engine for the Claude Code mockup screens.
// Renders text into an element character-by-character so it reads as
// terminal output landing, not a CSS fade.

(function (global) {
  'use strict';

  function delay(ms) {
    return new Promise(function (resolve) { setTimeout(resolve, ms); });
  }

  // Fade in by toggling .is-visible on a [data-step=N] element.
  // Use for UI chrome (banners, composer) where streaming feels wrong.
  function fadeIn(step) {
    var el = document.querySelector('[data-step="' + step + '"]');
    if (el) el.classList.add('is-visible');
  }

  // Spinner: cycles braille frames on every [data-spinner] element until stopped.
  var SPINNER_FRAMES = ['⠋','⠙','⠹','⠸','⠼','⠴','⠦','⠧','⠇','⠏'];
  function startSpinner() {
    var nodes = document.querySelectorAll('[data-spinner]');
    var idx = 0;
    var t = setInterval(function () {
      nodes.forEach(function (el) { el.textContent = SPINNER_FRAMES[idx]; });
      idx = (idx + 1) % SPINNER_FRAMES.length;
    }, 80);
    return function stop() { clearInterval(t); };
  }

  // Stream all text content inside `el` character-by-character, preserving the
  // DOM structure (spans, code tags, etc.) — we only mutate text-node values.
  //
  //   el            — root element to stream
  //   cps           — characters per second (~600–800 reads like a Claude Code response)
  //   scrollTarget  — optional scrollable parent; we keep its bottom in view
  //
  // Resolves once every text node has been fully restored.
  function streamElement(el, cps, scrollTarget) {
    return new Promise(function (resolve) {
      if (!el) { resolve(); return; }

      // Collect every text node inside the element in document order.
      var walker = document.createTreeWalker(el, NodeFilter.SHOW_TEXT, null);
      var buffers = [];
      var node;
      while ((node = walker.nextNode())) {
        buffers.push({ node: node, full: node.nodeValue, idx: 0 });
      }

      // If there's no text at all, just show it and bail.
      if (buffers.length === 0) {
        el.classList.add('is-visible');
        resolve();
        return;
      }

      // Stash and clear the text, then make the element visible.
      buffers.forEach(function (b) { b.node.nodeValue = ''; });
      el.classList.add('is-visible');
      el.classList.add('is-streaming');

      var tickMs = 24;
      var charsPerTick = Math.max(1, Math.round((cps || 600) * tickMs / 1000));

      var bufIdx = 0;
      var timer = setInterval(function () {
        var budget = charsPerTick;
        while (budget > 0 && bufIdx < buffers.length) {
          var b = buffers[bufIdx];
          var remaining = b.full.length - b.idx;
          var take = Math.min(budget, remaining);
          b.idx += take;
          b.node.nodeValue = b.full.slice(0, b.idx);
          budget -= take;
          if (b.idx >= b.full.length) {
            bufIdx++;
          } else {
            break;
          }
        }

        // Once content overflows the body, scroll so the newest line stays
        // visible — same behavior as a real terminal pushing text up.
        if (scrollTarget) {
          scrollTarget.scrollTop = scrollTarget.scrollHeight;
        }
        if (bufIdx >= buffers.length) {
          clearInterval(timer);
          el.classList.remove('is-streaming');
          resolve();
        }
      }, tickMs);
    });
  }

  global.delay = delay;
  global.fadeIn = fadeIn;
  global.startSpinner = startSpinner;
  global.streamElement = streamElement;
})(window);
