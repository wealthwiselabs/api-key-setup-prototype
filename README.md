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

1. `01-claude-code-trigger.html` — Claude Code (terminal) detects no key, prompts user to press ⏎
2. `02-setup-consent.html` — platform.claude.com/setup consent (first-time user, $5 banner)
3. `03-setup-success.html` — platform.claude.com/setup success (one-click send to `frontend/.env`)
4. `04-claude-code-resume.html` — Claude Code resumes, calls /v1/messages, writes lesson file

## Screenshots

Use Cmd+Shift+4 (macOS). Set browser zoom to 100%. Capture at 1440×900 (terminal screens) or 1200×800 (setup screens) for consistency.

After capturing each screen, save into `assets/`:

- `screen-01.png` — Claude Code initiates setup (1440×900)
- `screen-02.png` — Setup consent (1200×900)
- `screen-03.png` — Setup success with one-click send (1200×900)
- `screen-04.png` — Claude Code resumes, lesson generated (1440×900)

These get embedded in the take-home doc next to the Setup deep-dive section.

## Known mimicry caveats

- Anthropic's Tiempos / Styrene fonts are licensed; we use Charter / Inter as visual stand-ins.
- The Console wordmark icon is a simple "A" tile; close enough for screenshot purposes.
- Lucide icons are loaded from a CDN — internet connection required to render.
- The Claude Code terminal uses JetBrains Mono (loaded via Google Fonts).

## Files

- `index.html` — instant redirect to screen 1 (so the root URL drops viewers into the demo)
- `screens.html` — developer router with thumbnails of all 4 screens (use this to jump around)
- `flow.html` — composite page rendering all 4 frames in one shot for the take-home figure
- `01-claude-code-trigger.html`, `04-claude-code-resume.html` — share `styles/terminal.css` + `styles/stream.js`
- `02-setup-consent.html`, `03-setup-success.html` — share `styles/console.css`
- `styles/shared.css` — Google Fonts imports + base reset (used everywhere)
- `styles/stream.js` — character-by-character streaming engine used by the terminal screens
- `assets/icons/claude-code-mascot.png` — pixel mascot shown in the Claude Code welcome banner
- `assets/reference/` — source screenshots from the real Anthropic Console
- `PLAN.md` — original implementation plan (historical; predates the Claude Code rewrite)
