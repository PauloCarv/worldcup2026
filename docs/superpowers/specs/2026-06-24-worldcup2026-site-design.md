# World Cup 2026 live tracker — design

Date: 2026-06-24

## Summary

A static website that tracks FIFA World Cup 2026 (groups, knockout bracket,
results/highlights), imported from a Claude Design project
(`claude.ai/design/p/40cc6a62-1f20-4400-969e-0e224f4b39e7`). Hosted on GitHub
Pages. A daily scheduled Claude Code agent updates match results, the
knockout bracket, and highlight cards with real data via web search.

Note: the working folder and original request mentioned "World Cup 2006",
but the imported design content (data model, group draw, host cities) is
entirely about the 2026 tournament, currently in progress. Confirmed with
user: this project tracks **World Cup 2026**.

## Source material

Imported from the Claude Design project via the `DesignSync` MCP tool
(read-only `get_file`/`list_files` — that tool only writes to
design-system-type projects, not this one, so files are recreated locally
rather than synced):

- `World Cup 2026.dc.html` — root page: tabs for Group Stage, Knockout
  Bracket, Results & Highlights. Uses Claude's `.dc.html` component format
  (`<x-dc>` template, `sc-for`/`sc-if` directives, a `<script data-dc-script>`
  class extending `DCLogic`).
- `bracket-node.dc.html` — sub-component rendering one bracket match card,
  referenced from the root page via `<dc-import name="bracket-node">`.
- `data.js` — data model: `T` (team metadata), `groups` (A–L, fixtures with
  scores), `ko` (projected knockout bracket r32→final).
- `support.js` — the "dc-runtime": parses `.dc.html` files, loads
  React/ReactDOM from a CDN, and renders. Generated/minified; not meant to be
  hand-edited.

## Known risk: `dc-import` resolution outside the design preview

`support.js` is built to run inside Claude's design-preview iframe. The root
page self-registers automatically (`boot()` parses the current document's
`<x-dc>` as the "Root" component), but `<dc-import name="bracket-node">`
looks up the name in a runtime registry that nothing populates by default
outside that iframe — there's no built-in fetch-by-name for `dc-import`
(unlike `x-import`, which takes an explicit URL).

**Mitigation, in order of preference:**
1. Spike: write `boot.js` to fetch `bracket-node.dc.html`, extract its
   template/script (same shape as the root page), and register it into the
   runtime via the exposed `window.__dcUpdate(name, kind, content, streaming)`
   hook before/while the root boots.
2. Fallback if (1) doesn't reliably converge: inline the bracket-node
   template and render logic directly into the root page's template in place
   of each `<dc-import>` usage, and drop `bracket-node.dc.html` entirely.

This is resolved by direct testing during implementation (load in a browser,
check the knockout tab renders real cards, not "unknown element").

## File layout

```
/Users/paucarv/Sites/worldcup_2006/
  index.html          (from "World Cup 2026.dc.html", unmodified template/logic)
  bracket-node.dc.html (copied as-is, unless fallback above is used)
  support.js          (copied as-is — generated file, do not hand-edit)
  data.js             (copied as-is initially; edited daily going forward)
  boot.js             (new — registers bracket-node before boot; see risk above)
  docs/superpowers/specs/  (design docs)
```

## Local preview

`fetch()` calls in `boot.js` require an HTTP origin (not `file://`). Preview
with a simple local server, e.g. `python3 -m http.server` from this folder,
then open `http://localhost:8000/index.html`.

## Hosting

- New GitHub repository: `worldcup2026`, public (required for free GitHub
  Pages on a personal account).
- GitHub Pages serves directly from the repo (no build step needed — it's
  already static files).
- Local folder name (`worldcup_2006`) intentionally does not need to match
  the repo name (`worldcup2026`); git has no constraint here.

## Daily update mechanism

A Claude Code scheduled cloud agent (created via the `schedule` skill/cron),
running once per day. Each run:

1. Web-searches for that day's real World Cup 2026 results, fixtures, and
   notable storylines (records, upsets, standout performances).
2. Edits `data.js`:
   - Fills in real scores (`hs`/`as`) for `groups[*].matches` that were
     played.
   - Once the group stage concludes (after Jun 27, 2026) and real knockout
     pairings are confirmed, replaces the projected `ko.r32` entries (and
     downstream rounds as they resolve) with actual matchups.
3. Updates the 4 highlight cards in `index.html`'s component script
   (`hMessiObj`/`hGerObj`/`hCanObj`/`hMexObj` and their underlying match
   refs) with real storylines found via search — replacing the placeholder
   narrative content, not the structural rendering code.
4. Validates the edit with `node --check data.js` before committing.
5. Commits and pushes to `worldcup2026` on GitHub → Pages rebuilds
   automatically.

### Error handling

- No confirmed result found for a match → leave score as `null` (renders as
  upcoming fixture) rather than guessing.
- `node --check data.js` fails after an edit → revert the file, skip the
  commit for that run, leave previous day's data live.

## Out of scope

- No backend/API server — static files + scheduled commits only.
- No live in-play minute-by-minute scores — daily granularity, matching the
  "diariamente" requirement.
- No private/paid sports-data API integration (web search only, per user
  choice).
