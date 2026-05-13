# One-Click API-Key Setup — Prototype Implementation Plan

> **⚠️ Superseded — kept as build history.** This plan describes the original Lovable-IDE mockups (screens 1 & 4). Those screens were later rewritten as a Claude Code terminal session — the launch surface, file names, copy, and animation behavior have all changed. See `README.md` for the current state. File names mentioned below (`01-lovable-trigger.html`, `04-lovable-handoff.html`, `05-lovable-secrets.html`) no longer exist as active screens; redirect stubs at those paths point to the current files (`01-claude-code-trigger.html`, `04-claude-code-resume.html`).

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build four static HTML mockup pages that visually mimic Lovable (screens 1, 4) and a custom Anthropic-branded `claude.com/setup` flow (screens 2, 3) so Eric can take screenshots for the take-home submission. Pages are screenshottable, not deployed.

**Architecture:** Pure static HTML + Tailwind CSS via CDN + Lucide icons via CDN + Google Fonts (Inter for body, Charter / system serif for headers to mimic Anthropic's Tiempos). One HTML file per screen, plus a small `index.html` router. No JS framework; minimal vanilla JS only for the success-screen "show/hide key" toggle. No build step. Open files directly in browser or run `python3 -m http.server` from the prototype folder.

**Tech Stack:** HTML5, Tailwind v3 CDN, Lucide icons CDN, Google Fonts (Inter, Charter fallbacks). No backend, no real auth, no real API.

**Reference screenshots already saved:**
- `assets/reference/lovable-reference.png` — Lovable IDE chrome to mimic on screens 1 & 4
- `assets/reference/console-reference.png` — Anthropic Console fonts/spacing/colors to draw from on screens 2 & 3

**Spec source of truth:** `../Setup_Prototype_Spec.md` (one folder up). All copy, key names, fingerprints, button labels come from Section 3a/3b/5 of the spec.

---

## File structure

```
prototype/api-key-setup/
├── PLAN.md                        # this file
├── README.md                      # how to view + screenshot
├── index.html                     # router with thumbnails of the 4 screens
├── 01-lovable-trigger.html        # Screen 1: AI initiates setup in Lovable
├── 02-setup-consent.html          # Screen 2: claude.com/setup consent
├── 03-setup-success.html          # Screen 3: claude.com/setup success (copy/download)
├── 04-lovable-handoff.html        # Screen 4: User says "done", AI retries, succeeds
├── styles/
│   ├── shared.css                 # font imports, base resets shared by all pages
│   ├── lovable.css                # Lovable IDE chrome styles (used by 01, 04)
│   └── console.css                # Anthropic setup page styles (used by 02, 03)
└── assets/
    ├── reference/                 # source screenshots (already populated)
    │   ├── lovable-reference.png
    │   └── console-reference.png
    └── icons/                     # any custom SVGs we need (logos)
        ├── lovable-logo.svg       # Lovable "L" mark
        └── anthropic-logo.svg     # Anthropic icon for setup page
```

**Why one HTML file per screen instead of one SPA with routing:**
- Each screen needs to look pixel-correct in isolation for screenshots
- Easier to iterate one screen at a time without breaking siblings
- No router code, no JS state — open the file, it just renders

**Why per-UI CSS files instead of one giant stylesheet:**
- Lovable uses a different visual language (white/zinc IDE chrome with dark preview embed) vs. the Anthropic setup card (light, minimal, centered, serif headers)
- Splitting prevents class-name collisions and keeps each file holdable in context

---

## Visual reference notes (lock these before building)

**From `lovable-reference.png`:**
- Top bar: white bg, ~56px tall, thin bottom border (`#e5e5e5`-ish)
- Project name: bold, small, with "Previewing last saved version" subtle label
- Action buttons in top bar (left to right): history clock, sidebar toggle, **Preview** (blue-tinted active), code/file icons, cloud, chart, more dots, then a URL pill, external-link, refresh, comments bubble, Share (with avatar), GitHub mark, **Upgrade** (purple gradient with lightning), **Publish** (blue)
- Chat panel left: ~30% width, light gray background, AI response as bullet list, user message as gray pill bubble centered-ish, AI continues below
- Composer at bottom: rounded, "Ask Lovable…" placeholder, `+` button left, `Visual edits` toggle, `Build` dropdown right, audio mic, blue send arrow
- Preview right: ~70%, the user's *app* dark theme (not Lovable's chrome)

**From `console-reference.png`:**
- Background: white
- Heading uses serif (Anthropic uses Tiempos; substitute with `Charter, "Iowan Old Style", "Times New Roman", serif`)
- Body uses humanist sans (Anthropic uses Styrene; substitute with `Inter, system-ui, sans-serif`)
- "Claude Console" wordmark is serif, ~22px, with a small geometric icon
- Sidebar bg: `#f5f5f3` (warm off-white)
- Active nav item: light gray pill with darker text
- Subdued copy color: `#6b6b6b`
- Buttons: full black bg, white text, small radius (`+ Create key` style)
- Table rows: light borders, no zebra
- Monospace key strings (use `JetBrains Mono` or `ui-monospace`)

**Note on the setup page (screens 2 & 3):** the consent/success pages are NOT full Console pages with sidebar. They are standalone, centered-card, OAuth-style consent pages, but they use Anthropic's typography and color palette so they feel like part of the Console family. Think GitHub OAuth or Stripe Connect consent — single card, no chrome.

---

## Task 1 — Folder bootstrap, README, router, shared styles

**Files:**
- Create: `prototype/api-key-setup/README.md`
- Create: `prototype/api-key-setup/index.html`
- Create: `prototype/api-key-setup/styles/shared.css`

- [ ] **Step 1.1: Write README.md**

```markdown
# One-Click API-Key Setup — Prototype

Static mockup pages for the take-home prototype. Companion to `../Setup_Prototype_Spec.md`.

## View

Open `index.html` directly in a browser, or:

```bash
cd prototype/api-key-setup
python3 -m http.server 8000
# then visit http://localhost:8000
```

## Screens

1. `01-lovable-trigger.html` — Lovable AI says "opening setup"
2. `02-setup-consent.html` — claude.com/setup consent (first-time user, $5 banner)
3. `03-setup-success.html` — claude.com/setup success (copy + download)
4. `04-lovable-handoff.html` — User says "done", AI retries, succeeds

## Screenshots

Use Cmd+Shift+4 (macOS). Set browser zoom to 100%. Capture at 1440×900 (Lovable screens) or 1200×800 (setup screens) for consistency.
```

- [ ] **Step 1.2: Write `styles/shared.css` with font + reset**

```css
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');
@import url('https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500&display=swap');

:root {
  --font-sans: 'Inter', system-ui, -apple-system, sans-serif;
  --font-serif: Charter, 'Iowan Old Style', 'Times New Roman', serif;
  --font-mono: 'JetBrains Mono', ui-monospace, 'SF Mono', monospace;
}

* { box-sizing: border-box; }
html, body { margin: 0; padding: 0; font-family: var(--font-sans); -webkit-font-smoothing: antialiased; }
button { font-family: inherit; cursor: pointer; }
a { color: inherit; }
```

- [ ] **Step 1.3: Write `index.html` (router with thumbnails)**

```html
<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <title>One-Click API Key Setup — Prototype Index</title>
  <link rel="stylesheet" href="styles/shared.css" />
  <style>
    body { background: #fafaf9; color: #1a1a1a; padding: 48px; }
    h1 { font-family: var(--font-serif); font-size: 32px; margin: 0 0 8px; }
    p.lede { color: #6b6b6b; margin: 0 0 32px; max-width: 640px; }
    .grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 24px; max-width: 960px; }
    .card { background: white; border: 1px solid #e5e5e5; border-radius: 12px; padding: 20px; text-decoration: none; color: inherit; transition: border-color 120ms; }
    .card:hover { border-color: #1a1a1a; }
    .card .num { font-family: var(--font-mono); color: #6b6b6b; font-size: 12px; }
    .card h3 { margin: 4px 0 8px; font-size: 16px; font-weight: 600; }
    .card p { margin: 0; color: #6b6b6b; font-size: 13px; }
  </style>
</head>
<body>
  <h1>One-Click API Key Setup</h1>
  <p class="lede">Static mockups for the Anthropic take-home prototype. Click each to open. Take screenshots at 100% browser zoom.</p>
  <div class="grid">
    <a class="card" href="01-lovable-trigger.html">
      <div class="num">01</div><h3>Lovable — AI trigger</h3>
      <p>Lovable AI announces it needs a Claude API key and opens setup in the browser.</p>
    </a>
    <a class="card" href="02-setup-consent.html">
      <div class="num">02</div><h3>claude.com/setup — consent</h3>
      <p>First-time user variant with $5 credits banner and "Lovable ✓ verified".</p>
    </a>
    <a class="card" href="03-setup-success.html">
      <div class="num">03</div><h3>claude.com/setup — success</h3>
      <p>Copy key + download .env.anthropic + paste into Lovable Secrets instructions.</p>
    </a>
    <a class="card" href="04-lovable-handoff.html">
      <div class="num">04</div><h3>Lovable — handoff</h3>
      <p>User says "done"; AI retries the original request and it succeeds.</p>
    </a>
  </div>
</body>
</html>
```

- [ ] **Step 1.4: Verify**

Run from `prototype/api-key-setup`:
```bash
python3 -m http.server 8000
```
Open `http://localhost:8000`. Expected: index page with 4 cards. Cards link to dead URLs for now (404 OK — we build them next).

- [ ] **Step 1.5: Checkpoint**

Confirm folder layout matches the File structure section. No commit (workspace is not a git repo).

---

## Task 2 — Screen 1: Lovable trigger (`01-lovable-trigger.html`)

**Files:**
- Create: `prototype/api-key-setup/01-lovable-trigger.html`
- Create: `prototype/api-key-setup/styles/lovable.css`

**Reference:** `assets/reference/lovable-reference.png`. Mimic top bar + chat panel exactly. Right-side preview is the user's app — for our screen 1, we'll show a half-built dark-themed app preview (placeholder content is fine; the focus is the chat panel).

- [ ] **Step 2.1: Write `styles/lovable.css` (Lovable IDE chrome)**

```css
.lovable-app {
  display: flex;
  flex-direction: column;
  height: 100vh;
  background: white;
  color: #1a1a1a;
  font-size: 14px;
}

/* ---------- Top bar ---------- */
.top-bar {
  display: flex;
  align-items: center;
  height: 56px;
  padding: 0 12px;
  border-bottom: 1px solid #e7e5e4;
  gap: 8px;
  flex-shrink: 0;
}
.top-bar .brand { display: flex; align-items: center; gap: 8px; padding: 0 8px; }
.top-bar .brand .logo {
  width: 28px; height: 28px; border-radius: 6px;
  background: linear-gradient(135deg, #ff8a8a, #d4a4ff);
  display: grid; place-items: center; color: white; font-weight: 700;
}
.top-bar .brand-text { display: flex; flex-direction: column; line-height: 1.1; }
.top-bar .brand-text .name { font-weight: 600; font-size: 13px; }
.top-bar .brand-text .sub { font-size: 11px; color: #78716c; }
.top-bar .icon-btn {
  width: 32px; height: 32px; border-radius: 6px;
  display: grid; place-items: center; border: none; background: transparent; color: #57534e;
}
.top-bar .icon-btn:hover { background: #f5f5f4; }
.top-bar .preview-pill {
  display: flex; align-items: center; gap: 6px; padding: 6px 12px;
  background: #eff6ff; color: #1d4ed8; border-radius: 999px; font-weight: 500; font-size: 13px;
}
.top-bar .url-pill {
  flex: 1; max-width: 480px; height: 32px; padding: 0 12px;
  border: 1px solid #e7e5e4; border-radius: 8px;
  display: flex; align-items: center; color: #78716c; font-size: 13px; margin: 0 8px;
}
.top-bar .spacer { flex: 1; }
.top-bar .share-btn {
  display: flex; align-items: center; gap: 6px; padding: 6px 12px;
  background: white; border: 1px solid #e7e5e4; border-radius: 8px; font-size: 13px; font-weight: 500;
}
.top-bar .share-btn .avatar {
  width: 20px; height: 20px; border-radius: 999px; background: linear-gradient(135deg, #f59e0b, #ef4444);
}
.top-bar .upgrade-btn {
  display: flex; align-items: center; gap: 6px; padding: 6px 12px;
  background: linear-gradient(135deg, #7c3aed, #a855f7); color: white;
  border-radius: 8px; font-size: 13px; font-weight: 600; border: none;
}
.top-bar .publish-btn {
  padding: 6px 14px; background: #2563eb; color: white;
  border-radius: 8px; font-size: 13px; font-weight: 600; border: none;
}

/* ---------- Body split ---------- */
.body-split { display: flex; flex: 1; min-height: 0; }
.chat-panel {
  width: 32%; min-width: 360px; max-width: 520px;
  border-right: 1px solid #e7e5e4;
  display: flex; flex-direction: column; background: white;
}
.chat-scroll { flex: 1; overflow-y: auto; padding: 16px 20px; }

/* ---------- Chat messages ---------- */
.msg-ai { font-size: 14px; color: #292524; line-height: 1.55; margin: 12px 0 16px; }
.msg-ai p { margin: 0 0 8px; }
.msg-ai ul { padding-left: 18px; margin: 8px 0; }
.msg-ai li { margin: 6px 0; }
.msg-actions { display: flex; gap: 4px; margin-top: 8px; color: #78716c; }
.msg-actions .icon-btn { width: 24px; height: 24px; }

.msg-user {
  align-self: flex-end;
  background: #f5f5f4;
  padding: 10px 14px;
  border-radius: 10px;
  font-size: 14px;
  margin: 12px 0;
  max-width: 80%;
  margin-left: auto;
}
.msg-timestamp { color: #a8a29e; font-size: 12px; text-align: center; margin: 16px 0 8px; }

/* Setup-specific cards inside chat */
.setup-card {
  border: 1px solid #e7e5e4;
  border-radius: 10px;
  padding: 14px;
  margin: 10px 0;
  background: #fafaf9;
}
.setup-card .title { font-weight: 600; font-size: 13px; margin-bottom: 6px; display: flex; align-items: center; gap: 6px; }
.setup-card .title .dot { width: 6px; height: 6px; border-radius: 999px; background: #f59e0b; }
.setup-card .title .dot.done { background: #16a34a; }
.setup-card .body { font-size: 13px; color: #57534e; line-height: 1.5; }
.setup-card .open-link {
  display: inline-flex; align-items: center; gap: 6px;
  margin-top: 10px; padding: 8px 12px;
  background: white; border: 1px solid #d6d3d1; border-radius: 8px;
  text-decoration: none; color: #1a1a1a; font-weight: 500; font-size: 13px;
}
.setup-card code {
  font-family: var(--font-mono); font-size: 12px;
  background: white; border: 1px solid #e7e5e4; border-radius: 4px; padding: 1px 5px;
}

/* ---------- Composer ---------- */
.composer {
  border-top: 1px solid #e7e5e4;
  padding: 12px 16px;
  background: white;
}
.composer-box {
  border: 1px solid #e7e5e4;
  border-radius: 12px;
  padding: 10px 12px;
  display: flex;
  flex-direction: column;
  gap: 8px;
}
.composer-input { font-size: 14px; color: #a8a29e; min-height: 24px; }
.composer-row { display: flex; align-items: center; gap: 4px; }
.composer-row .pill {
  display: inline-flex; align-items: center; gap: 4px;
  padding: 4px 8px; border: 1px solid #e7e5e4; border-radius: 999px;
  font-size: 12px; color: #57534e;
}
.composer-row .spacer { flex: 1; }
.composer-row .send {
  width: 28px; height: 28px; border-radius: 999px;
  background: #d6d3d1; display: grid; place-items: center; border: none; color: #57534e;
}

/* ---------- Preview pane (right) ---------- */
.preview-pane {
  flex: 1;
  background: #1a1a1a;
  color: white;
  padding: 32px;
  overflow-y: auto;
}
.preview-pane .preview-nav { display: flex; justify-content: space-between; align-items: center; }
.preview-pane .preview-brand { display: flex; align-items: center; gap: 12px; font-size: 22px; font-weight: 600; }
.preview-pane .preview-brand .mark {
  width: 36px; height: 36px; background: #16a34a; border-radius: 8px; display: grid; place-items: center; font-weight: 700;
}
.preview-pane .preview-nav .right { display: flex; align-items: center; gap: 16px; font-size: 14px; }
.preview-pane .preview-nav .signin {
  background: white; color: #1a1a1a; padding: 8px 18px; border-radius: 8px; font-weight: 500;
}
.preview-pane h1 {
  font-size: 56px; line-height: 1.05; font-weight: 700; margin: 64px 0 24px;
}
.preview-pane .lede { font-size: 18px; color: #a8a29e; max-width: 540px; line-height: 1.6; }
.preview-pane .cta {
  display: inline-block; margin-top: 32px; background: #16a34a; color: white;
  padding: 16px 28px; border-radius: 10px; font-weight: 600; font-size: 16px;
}
```

- [ ] **Step 2.2: Write `01-lovable-trigger.html`**

The chat shows: a prior AI bullet response (mimicking the reference); a user message ("set up the api key for me to test"); then a NEW AI response that contains a setup-card with status dot pending and an "Open setup ↗" button. Composer is in the resting state.

```html
<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <title>Lovable — money-wise-adventures</title>
  <link rel="stylesheet" href="styles/shared.css" />
  <link rel="stylesheet" href="styles/lovable.css" />
  <script src="https://unpkg.com/lucide@latest"></script>
</head>
<body>
  <div class="lovable-app">
    <!-- Top bar -->
    <div class="top-bar">
      <div class="brand">
        <div class="logo">L</div>
        <div class="brand-text">
          <span class="name">money-wise-adventures ▾</span>
          <span class="sub">Previewing last saved version</span>
        </div>
      </div>
      <button class="icon-btn"><i data-lucide="history"></i></button>
      <button class="icon-btn"><i data-lucide="panel-left"></i></button>
      <div class="preview-pill"><i data-lucide="globe" style="width:14px;height:14px"></i> Preview</div>
      <button class="icon-btn"><i data-lucide="file-text"></i></button>
      <button class="icon-btn"><i data-lucide="code-2"></i></button>
      <button class="icon-btn"><i data-lucide="cloud"></i></button>
      <button class="icon-btn"><i data-lucide="bar-chart-3"></i></button>
      <button class="icon-btn"><i data-lucide="more-horizontal"></i></button>
      <div class="url-pill"><i data-lucide="layout-grid" style="width:14px;height:14px;margin-right:6px"></i> /</div>
      <button class="icon-btn"><i data-lucide="external-link"></i></button>
      <button class="icon-btn"><i data-lucide="refresh-cw"></i></button>
      <div class="spacer"></div>
      <button class="icon-btn"><i data-lucide="message-square"></i></button>
      <button class="share-btn"><span class="avatar"></span> Share</button>
      <button class="icon-btn"><i data-lucide="github"></i></button>
      <button class="upgrade-btn"><i data-lucide="zap" style="width:14px;height:14px"></i> Upgrade</button>
      <button class="publish-btn">Publish</button>
    </div>

    <div class="body-split">
      <!-- Chat -->
      <div class="chat-panel">
        <div class="chat-scroll">
          <div class="msg-ai">
            <p>I'll wire up the Claude API call for the lesson generator. To do that I need a Claude API key set as <code>ANTHROPIC_API_KEY</code> in your project secrets.</p>
          </div>

          <div class="msg-timestamp">May 9, 2026 · 11:42 AM</div>
          <div class="msg-user">set up the api key for me to test</div>

          <div class="msg-ai">
            <p>I've started a one-click setup with Anthropic. Complete it in your browser, paste the key into your project secrets, then say "done" and I'll continue.</p>
            <div class="setup-card">
              <div class="title"><span class="dot"></span> Anthropic API key setup</div>
              <div class="body">
                Status: <strong>waiting for your approval</strong><br/>
                Key name: <code>Lovable - money-wise-adventures - May 2026</code><br/>
                Env var: <code>ANTHROPIC_API_KEY</code>
              </div>
              <a class="open-link" href="02-setup-consent.html" target="_blank">
                <i data-lucide="external-link" style="width:14px;height:14px"></i>
                Open setup at claude.com/setup
              </a>
            </div>
            <div class="msg-actions">
              <button class="icon-btn"><i data-lucide="corner-up-left" style="width:14px;height:14px"></i></button>
              <button class="icon-btn"><i data-lucide="thumbs-up" style="width:14px;height:14px"></i></button>
              <button class="icon-btn"><i data-lucide="thumbs-down" style="width:14px;height:14px"></i></button>
              <button class="icon-btn"><i data-lucide="copy" style="width:14px;height:14px"></i></button>
              <button class="icon-btn"><i data-lucide="more-horizontal" style="width:14px;height:14px"></i></button>
            </div>
          </div>
        </div>

        <!-- Composer -->
        <div class="composer">
          <div class="composer-box">
            <div class="composer-input">Ask Lovable…</div>
            <div class="composer-row">
              <button class="icon-btn"><i data-lucide="plus" style="width:16px;height:16px"></i></button>
              <span class="pill"><i data-lucide="eye" style="width:12px;height:12px"></i> Visual edits</span>
              <div class="spacer"></div>
              <span class="pill">Build <i data-lucide="chevron-down" style="width:12px;height:12px"></i></span>
              <button class="icon-btn"><i data-lucide="mic" style="width:16px;height:16px"></i></button>
              <button class="send"><i data-lucide="arrow-up" style="width:14px;height:14px"></i></button>
            </div>
          </div>
        </div>
      </div>

      <!-- Preview -->
      <div class="preview-pane">
        <div class="preview-nav">
          <div class="preview-brand"><div class="mark">W</div> Wealthwise Adventure</div>
          <div class="right"><span>How It Works</span><span class="signin">Sign In</span></div>
        </div>
        <h1>Master Your<br/>Finance Through<br/>Play</h1>
        <p class="lede">Learn essential finance skills through interactive, fun gameplay. Apply the knowledge to your real life and achieve financial freedom.</p>
        <a class="cta">Start Your Financial Journey</a>
      </div>
    </div>
  </div>

  <script>lucide.createIcons();</script>
</body>
</html>
```

- [ ] **Step 2.3: Open in browser, side-by-side with `assets/reference/lovable-reference.png`**

Compare:
- Top bar height, button order, button colors (purple gradient on Upgrade, blue Publish, blue-tinted Preview pill)
- Chat panel width and the bullet/user/AI rhythm
- Composer styling (rounded box, Visual edits pill, Build dropdown, mic, blue send arrow)
- Preview pane dark theme + green CTA

If anything is off, tweak `styles/lovable.css`. Don't worry about pixel-perfect — close enough for a recognizable mimic is the bar.

- [ ] **Step 2.4: Checkpoint**

Take a 1440×900 screenshot. Save to `assets/screen-01.png`. Move on.

---

## Task 3 — Screen 2: Setup consent (`02-setup-consent.html`)

**Files:**
- Create: `prototype/api-key-setup/02-setup-consent.html`
- Create: `prototype/api-key-setup/styles/console.css`

**Reference:** `assets/reference/console-reference.png` for fonts, colors, button style. Layout is a centered card on a clean off-white background — NOT the full Console with sidebar. Think OAuth consent page styled in Anthropic's brand.

**Copy comes verbatim from spec Section 3a.**

- [ ] **Step 3.1: Write `styles/console.css` (setup-page styles)**

```css
.setup-page {
  min-height: 100vh;
  background: #faf9f7; /* Anthropic warm off-white */
  display: flex;
  flex-direction: column;
}
.setup-topbar {
  display: flex; align-items: center; gap: 10px;
  padding: 16px 24px; font-family: var(--font-serif); font-size: 22px; color: #1a1a1a;
}
.setup-topbar .icon {
  width: 22px; height: 22px; background: #1a1a1a; border-radius: 4px;
  display: grid; place-items: center; color: white; font-family: var(--font-sans); font-size: 13px; font-weight: 700;
}

.setup-main { flex: 1; display: grid; place-items: center; padding: 32px 16px 64px; }

.setup-card {
  background: white;
  border: 1px solid #e7e5e4;
  border-radius: 16px;
  width: 100%;
  max-width: 520px;
  padding: 32px;
  box-shadow: 0 1px 3px rgba(0,0,0,0.04);
}

.setup-card .eyebrow {
  display: flex; align-items: center; gap: 10px;
  font-size: 13px; color: #57534e;
  margin-bottom: 20px;
}
.setup-card .eyebrow .verified {
  display: inline-flex; align-items: center; gap: 4px;
  background: #ecfdf5; color: #047857;
  padding: 2px 8px; border-radius: 999px; font-weight: 500; font-size: 12px;
}

.setup-card h1 {
  font-family: var(--font-serif);
  font-size: 28px;
  line-height: 1.2;
  margin: 0 0 8px;
  color: #1a1a1a;
  font-weight: 500;
}
.setup-card .sub { font-size: 14px; color: #57534e; line-height: 1.55; margin: 0 0 20px; }

.kv-list { border-top: 1px solid #f0eeec; margin: 16px 0 20px; }
.kv-row {
  display: flex; align-items: center; justify-content: space-between;
  padding: 10px 0; border-bottom: 1px solid #f0eeec;
  font-size: 14px;
}
.kv-row .k { color: #78716c; }
.kv-row .v { color: #1a1a1a; font-weight: 500; display: flex; align-items: center; gap: 8px; }
.kv-row .v code, .kv-row .v .editable {
  font-family: var(--font-mono); font-size: 13px;
  background: #faf9f7; border: 1px solid #e7e5e4; border-radius: 6px; padding: 4px 8px;
  color: #1a1a1a;
}
.kv-row .v .editable { display: inline-flex; align-items: center; gap: 6px; cursor: text; }

.banner {
  display: flex; gap: 10px; padding: 12px 14px;
  background: #fef9c3; border: 1px solid #fde68a; border-radius: 10px;
  font-size: 13px; color: #713f12; margin: 16px 0 20px;
}
.banner .emoji { font-size: 18px; line-height: 1; }

.fineprint { font-size: 12px; color: #78716c; line-height: 1.55; margin: 16px 0 24px; }

.btn-row { display: flex; gap: 12px; justify-content: flex-end; }
.btn {
  padding: 10px 18px; border-radius: 8px; font-weight: 500; font-size: 14px;
  border: 1px solid transparent; cursor: pointer;
}
.btn-secondary { background: white; color: #1a1a1a; border-color: #d6d3d1; }
.btn-primary { background: #1a1a1a; color: white; }

.device-line {
  display: flex; align-items: center; gap: 6px;
  font-size: 12px; color: #78716c; margin-top: 4px;
}
```

- [ ] **Step 3.2: Write `02-setup-consent.html`**

```html
<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <title>Set up Claude — Anthropic</title>
  <link rel="stylesheet" href="styles/shared.css" />
  <link rel="stylesheet" href="styles/console.css" />
  <script src="https://unpkg.com/lucide@latest"></script>
</head>
<body>
  <div class="setup-page">
    <div class="setup-topbar">
      <div class="icon">A</div>
      <span>Claude Console</span>
    </div>

    <div class="setup-main">
      <div class="setup-card">
        <div class="eyebrow">
          <span class="verified"><i data-lucide="check" style="width:12px;height:12px"></i> Lovable verified</span>
          <span>requesting an API key</span>
        </div>

        <h1>Set up Claude for Lovable</h1>
        <p class="sub">Lovable wants to create a Claude API key on your Anthropic account for the project <strong>"money-wise-adventures."</strong> The key will be billed to your account. You can revoke it anytime in the Console.</p>

        <div class="device-line">
          <i data-lucide="laptop" style="width:14px;height:14px"></i>
          Request from your MacBook · San Francisco · just now
        </div>

        <div class="kv-list">
          <div class="kv-row">
            <span class="k">Key name</span>
            <span class="v"><span class="editable">Lovable - money-wise-adventures - May 2026 <i data-lucide="pencil" style="width:12px;height:12px"></i></span></span>
          </div>
          <div class="kv-row">
            <span class="k">Env var</span>
            <span class="v"><code>ANTHROPIC_API_KEY</code></span>
          </div>
          <div class="kv-row">
            <span class="k">Permissions</span>
            <span class="v">Standard API access</span>
          </div>
          <div class="kv-row">
            <span class="k">Billing</span>
            <span class="v">Your Anthropic account</span>
          </div>
        </div>

        <div class="banner">
          <span class="emoji">🎁</span>
          <div><strong>New to Anthropic?</strong> You'll get $5 in free credits applied automatically when you create your first key.</div>
        </div>

        <p class="fineprint">By approving, you authorize Anthropic to mint a standard API key on your account. Lovable will receive instructions to add it to your project secrets — Anthropic does not share the key with Lovable's AI model. <a href="#" style="color:#0f766e;text-decoration:underline">Learn more</a>.</p>

        <div class="btn-row">
          <button class="btn btn-secondary">Deny</button>
          <button class="btn btn-primary">Approve</button>
        </div>
      </div>
    </div>
  </div>

  <script>lucide.createIcons();</script>
</body>
</html>
```

- [ ] **Step 3.3: Open and compare against `console-reference.png`**

Check:
- "Claude Console" wordmark uses serif (compare with reference top-left)
- Card uses serif heading + sans body (matches Console pages)
- Buttons match Console style: black primary, white secondary
- Off-white page background `#faf9f7` matches the sidebar bg from the reference (close enough)
- Editable key-name field reads as inline-editable

Tweak `styles/console.css` until close.

- [ ] **Step 3.4: Checkpoint**

Take a 1200×900 screenshot. Save to `assets/screen-02.png`.

---

## Task 4 — Screen 3: Setup success (`03-setup-success.html`)

**Files:**
- Create: `prototype/api-key-setup/03-setup-success.html`
- Modify: `prototype/api-key-setup/styles/console.css` (add success-screen specific classes)

**Reference:** Same console.css base. Reuses `.setup-card`, `.kv-list`, etc. Adds key-display field, copy/download buttons, paste-instructions block.

**Copy comes verbatim from spec Section 3b.**

- [ ] **Step 4.1: Append to `styles/console.css`**

```css
.success-eyebrow {
  display: flex; align-items: center; gap: 8px;
  color: #047857; font-weight: 500; font-size: 14px; margin-bottom: 8px;
}
.credits-pill {
  display: inline-flex; align-items: center; gap: 6px;
  background: #ecfdf5; color: #047857;
  padding: 4px 10px; border-radius: 999px; font-size: 12px; font-weight: 500;
  margin-bottom: 20px;
}

.key-name { font-family: var(--font-mono); font-size: 13px; color: #57534e; margin: 4px 0 8px; }

.key-field {
  display: flex; align-items: center; gap: 8px;
  background: #faf9f7; border: 1px solid #e7e5e4; border-radius: 8px;
  padding: 10px 12px; margin: 8px 0 16px;
}
.key-field code {
  flex: 1; font-family: var(--font-mono); font-size: 13px; color: #1a1a1a;
  letter-spacing: 0.02em;
}
.key-field .reveal-btn {
  background: transparent; border: none; padding: 4px; color: #78716c;
  display: grid; place-items: center;
}

.action-row { display: flex; gap: 10px; margin: 16px 0 24px; }
.action-row .btn { flex: 1; display: inline-flex; align-items: center; justify-content: center; gap: 8px; }

.next-steps {
  background: #faf9f7; border: 1px solid #f0eeec; border-radius: 10px;
  padding: 14px 16px; margin: 16px 0;
}
.next-steps h4 { margin: 0 0 8px; font-size: 13px; font-weight: 600; color: #1a1a1a; }
.next-steps ol { margin: 0; padding-left: 20px; color: #57534e; font-size: 13px; line-height: 1.7; }
.next-steps a { color: #0f766e; text-decoration: underline; }

.footer-links { display: flex; gap: 16px; justify-content: flex-end; margin-top: 16px; font-size: 13px; }
.footer-links a {
  display: inline-flex; align-items: center; gap: 4px;
  color: #1a1a1a; text-decoration: none; padding: 8px 14px;
  border: 1px solid #d6d3d1; border-radius: 8px;
}
```

- [ ] **Step 4.2: Write `03-setup-success.html`**

```html
<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <title>Key ready — Anthropic</title>
  <link rel="stylesheet" href="styles/shared.css" />
  <link rel="stylesheet" href="styles/console.css" />
  <script src="https://unpkg.com/lucide@latest"></script>
</head>
<body>
  <div class="setup-page">
    <div class="setup-topbar">
      <div class="icon">A</div>
      <span>Claude Console</span>
    </div>

    <div class="setup-main">
      <div class="setup-card">
        <div class="success-eyebrow">
          <i data-lucide="check-circle-2" style="width:18px;height:18px"></i>
          Your Claude API key is ready
        </div>
        <span class="credits-pill">+ $5 free credits added to your account</span>

        <div class="key-name">Lovable - money-wise-adventures - May 2026</div>

        <div class="key-field">
          <code id="key">sk-ant-api03-•••••••••••••••••••••••••••••••••a3f2</code>
          <button class="reveal-btn" onclick="
            var el = document.getElementById('key');
            var hidden = 'sk-ant-api03-•••••••••••••••••••••••••••••••••a3f2';
            var shown = 'sk-ant-api03-Hml7K3pX2qN4vT8jR5sB9wL1cM6yZ0fE-swAA';
            el.textContent = el.textContent === hidden ? shown : hidden;
          "><i data-lucide="eye"></i></button>
        </div>

        <div class="action-row">
          <button class="btn btn-secondary"><i data-lucide="copy" style="width:14px;height:14px"></i> Copy key</button>
          <button class="btn btn-secondary"><i data-lucide="download" style="width:14px;height:14px"></i> Download .env.anthropic</button>
        </div>

        <div class="next-steps">
          <h4>Next: paste into Lovable</h4>
          <ol>
            <li>Open <a href="#">Lovable → Project Settings → Secrets</a></li>
            <li>Add a new secret named <code style="font-family:var(--font-mono);background:white;border:1px solid #e7e5e4;border-radius:4px;padding:1px 5px">ANTHROPIC_API_KEY</code> and paste the key</li>
            <li>Return to your Lovable chat and say <strong>"done"</strong></li>
          </ol>
        </div>

        <p class="fineprint">This key is unused for 24 hours and will auto-revoke. You can manage all keys in your Console at any time.</p>

        <div class="footer-links">
          <a href="#"><i data-lucide="external-link" style="width:13px;height:13px"></i> Open Lovable Secrets</a>
          <a href="#"><i data-lucide="settings" style="width:13px;height:13px"></i> Manage in Console</a>
        </div>
      </div>
    </div>
  </div>

  <script>lucide.createIcons();</script>
</body>
</html>
```

- [ ] **Step 4.3: Open and compare**

Check:
- Visual rhythm is consistent with consent page (same card width, same paddings)
- Key field with reveal eye-icon works (click toggles full key)
- Copy / Download buttons sit equal-width side by side
- Next-steps block reads as a clear "what to do now"
- Credits pill is subtle, not loud

- [ ] **Step 4.4: Checkpoint**

Take a 1200×900 screenshot. Save to `assets/screen-03.png`.

---

## Task 5 — Screen 4: Lovable handoff (`04-lovable-handoff.html`)

**Files:**
- Create: `prototype/api-key-setup/04-lovable-handoff.html`

Reuses `styles/lovable.css` from Task 2. Differences vs. screen 1:
- Setup card now shows status dot **green** + "completed"
- New user message: "done"
- New AI message: "Got it — re-running your request now." Then a code-execution card showing the API call succeeded, lesson generated.
- Preview pane stays the same (or could show updated content — keep same for screenshot consistency)

- [ ] **Step 5.1: Write `04-lovable-handoff.html`**

```html
<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <title>Lovable — money-wise-adventures</title>
  <link rel="stylesheet" href="styles/shared.css" />
  <link rel="stylesheet" href="styles/lovable.css" />
  <script src="https://unpkg.com/lucide@latest"></script>
</head>
<body>
  <div class="lovable-app">
    <div class="top-bar">
      <div class="brand">
        <div class="logo">L</div>
        <div class="brand-text">
          <span class="name">money-wise-adventures ▾</span>
          <span class="sub">Previewing last saved version</span>
        </div>
      </div>
      <button class="icon-btn"><i data-lucide="history"></i></button>
      <button class="icon-btn"><i data-lucide="panel-left"></i></button>
      <div class="preview-pill"><i data-lucide="globe" style="width:14px;height:14px"></i> Preview</div>
      <button class="icon-btn"><i data-lucide="file-text"></i></button>
      <button class="icon-btn"><i data-lucide="code-2"></i></button>
      <button class="icon-btn"><i data-lucide="cloud"></i></button>
      <button class="icon-btn"><i data-lucide="bar-chart-3"></i></button>
      <button class="icon-btn"><i data-lucide="more-horizontal"></i></button>
      <div class="url-pill"><i data-lucide="layout-grid" style="width:14px;height:14px;margin-right:6px"></i> /</div>
      <button class="icon-btn"><i data-lucide="external-link"></i></button>
      <button class="icon-btn"><i data-lucide="refresh-cw"></i></button>
      <div class="spacer"></div>
      <button class="icon-btn"><i data-lucide="message-square"></i></button>
      <button class="share-btn"><span class="avatar"></span> Share</button>
      <button class="icon-btn"><i data-lucide="github"></i></button>
      <button class="upgrade-btn"><i data-lucide="zap" style="width:14px;height:14px"></i> Upgrade</button>
      <button class="publish-btn">Publish</button>
    </div>

    <div class="body-split">
      <div class="chat-panel">
        <div class="chat-scroll">
          <!-- prior AI message (truncated for context) -->
          <div class="msg-ai">
            <p>I've started a one-click setup with Anthropic. Complete it in your browser, paste the key into your project secrets, then say "done" and I'll continue.</p>
            <div class="setup-card">
              <div class="title"><span class="dot done"></span> Anthropic API key setup</div>
              <div class="body">
                Status: <strong>completed</strong><br/>
                Key name: <code>Lovable - money-wise-adventures - May 2026</code><br/>
                Env var: <code>ANTHROPIC_API_KEY</code> · added to project secrets
              </div>
            </div>
          </div>

          <div class="msg-timestamp">May 9, 2026 · 11:43 AM</div>
          <div class="msg-user">done</div>

          <div class="msg-ai">
            <p>Got it — re-running your request now…</p>
            <div class="setup-card" style="background:#f0fdf4;border-color:#bbf7d0">
              <div class="title"><span class="dot done"></span> Lesson generated</div>
              <div class="body">
                Called <code>POST /v1/messages</code> with the budgeting prompt. Response stored to <code>src/lessons/budgeting-101.json</code>. Linked from the "Lay the foundations" pin on the journey path.
              </div>
            </div>
            <div class="msg-actions">
              <button class="icon-btn"><i data-lucide="corner-up-left" style="width:14px;height:14px"></i></button>
              <button class="icon-btn"><i data-lucide="thumbs-up" style="width:14px;height:14px"></i></button>
              <button class="icon-btn"><i data-lucide="thumbs-down" style="width:14px;height:14px"></i></button>
              <button class="icon-btn"><i data-lucide="copy" style="width:14px;height:14px"></i></button>
              <button class="icon-btn"><i data-lucide="more-horizontal" style="width:14px;height:14px"></i></button>
            </div>
          </div>
        </div>

        <div class="composer">
          <div class="composer-box">
            <div class="composer-input">Ask Lovable…</div>
            <div class="composer-row">
              <button class="icon-btn"><i data-lucide="plus" style="width:16px;height:16px"></i></button>
              <span class="pill"><i data-lucide="eye" style="width:12px;height:12px"></i> Visual edits</span>
              <div class="spacer"></div>
              <span class="pill">Build <i data-lucide="chevron-down" style="width:12px;height:12px"></i></span>
              <button class="icon-btn"><i data-lucide="mic" style="width:16px;height:16px"></i></button>
              <button class="send"><i data-lucide="arrow-up" style="width:14px;height:14px"></i></button>
            </div>
          </div>
        </div>
      </div>

      <div class="preview-pane">
        <div class="preview-nav">
          <div class="preview-brand"><div class="mark">W</div> Wealthwise Adventure</div>
          <div class="right"><span>How It Works</span><span class="signin">Sign In</span></div>
        </div>
        <h1>Master Your<br/>Finance Through<br/>Play</h1>
        <p class="lede">Learn essential finance skills through interactive, fun gameplay. Apply the knowledge to your real life and achieve financial freedom.</p>
        <a class="cta">Start Your Financial Journey</a>
      </div>
    </div>
  </div>

  <script>lucide.createIcons();</script>
</body>
</html>
```

- [ ] **Step 5.2: Open in browser**

Verify:
- Setup card now shows green dot + "completed"
- "done" user message reads naturally
- The success card under the new AI response is green-tinted (so it's visually distinct from the pending state in screen 1)

- [ ] **Step 5.3: Checkpoint**

Take a 1440×900 screenshot. Save to `assets/screen-04.png`.

---

## Task 6 — Polish, cross-screen consistency, README finalize

**Files:**
- Modify: any `.html` or `.css` based on review notes
- Modify: `README.md` (add screenshot list)

- [ ] **Step 6.1: Open all four screens in tabs and click through in order**

Screen 1 → 2 (via "Open setup" link) → 3 (no link, manual nav) → 4. Confirm the story reads as a single flow.

- [ ] **Step 6.2: Compare against references one more time**

Side-by-side `lovable-reference.png` vs. screens 1 and 4. Side-by-side `console-reference.png` vs. screens 2 and 3 (font and color family check, even though layouts differ).

Look for:
- Inconsistent paddings between consent + success screens (should match exactly)
- Any leftover `lorem`-style placeholder copy
- Font weights that drift heavier than the reference

Fix inline.

- [ ] **Step 6.3: Update README.md with final notes**

Append to `README.md`:

```markdown
## Saved screenshots

After capturing each screen at the recommended viewport, save into `assets/`:

- `screen-01.png` — Lovable AI initiates setup (1440×900)
- `screen-02.png` — Setup consent (1200×900)
- `screen-03.png` — Setup success with copy/download (1200×900)
- `screen-04.png` — Lovable handoff, AI succeeds (1440×900)

These get embedded in the take-home doc next to the Setup deep-dive section.

## Known mimicry caveats

- Lovable's actual logo is reproduced as a stylized "L" gradient mark; not the production asset
- Anthropic's Tiempos / Styrene fonts are licensed; we use Charter / Inter as visual stand-ins
- The Console wordmark icon is a simple "A" tile; close enough for screenshot purposes
```

- [ ] **Step 6.4: Final checkpoint**

All four screens render. All four screenshots saved. README accurate. Spec (`../Setup_Prototype_Spec.md`) and plan (`PLAN.md`) referenced from README.

---

## Self-review notes

- **Spec coverage:** All four primary screenshots from Section 5 of the spec are covered (tasks 2, 3, 4, 5). The 3 secondary screens (returning-user consent, payment capture, local-tool variant) are explicitly out of scope for v1 of the prototype to keep the take-home tight.
- **Type/string consistency:** key name "Lovable - money-wise-adventures - May 2026" used identically in screens 1, 2, 3, 4. Env var `ANTHROPIC_API_KEY` consistent. Fingerprint `…a3f2` consistent across screens.
- **Path consistency:** Setup URL is `02-setup-consent.html` (the Lovable trigger card links to it directly so the hover-flow demo works during screen recording / live demo).
- **No placeholders:** every step contains the actual HTML/CSS.

## What's NOT in this plan

- Live deploy to `anthropic.growbi.app` — the assignment says static screenshots for Setup, so we stop at the local files
- Build pipeline / minification — unnecessary for a screenshot prototype
- Real auth, real key minting, real API — explicitly out of scope per `Setup_Prototype_Spec.md`
- The 3 secondary screen variants — specced but not built; can add as a Task 7 if time permits
