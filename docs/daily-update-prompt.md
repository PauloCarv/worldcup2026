# Daily World Cup 2026 data update

Run from the `worldcup2026` repo root (already cloned/checked out).

1. Web-search for FIFA World Cup 2026 results, fixtures, and notable
   storylines from the last 24 hours (results, records, upsets, standout
   performances — for the men's tournament running June 11 - July 19, 2026).
2. Open `data.js`. For any match in `groups[*].matches` whose score is
   currently `null` but has actually been played per your search, fill in
   the real `hs`/`as` scores. Do not alter matches with no confirmed result
   yet — leave them `null`.
3. If the group stage has concluded (after Jun 27, 2026) and real Round-of-32
   pairings are confirmed by official sources, replace the projected `ko.r32`
   entries' `a`/`b` fields with the real teams, and likewise for later
   rounds as their real matchups become known. Do not guess pairings before
   they're confirmed.
4. Open `index.html`. In the `<script data-dc-script>` block, find
   `hMessiObj`, `hGerObj`, `hCanObj`, `hMexObj` (and the `find(...)` calls
   that feed them). Replace their hardcoded `find("J",2)`-style match
   references and note text with up to 4 real storylines from today's
   search results — biggest result, a record broken, a star performance, a
   host-nation story, etc. Keep the same object shape (`o.note = "..."` set
   on a `matchObj(...)` result).
5. Validate before committing:
   `node --check data.js && node --check index.html` — note `index.html`
   isn't pure JS, so instead extract just the script content and check that,
   e.g.: `node -e "require('fs').writeFileSync('/tmp/_chk.js', require('fs').readFileSync('index.html','utf8').split('<script type=\"text/x-dc\" data-dc-script>')[1].split('</script>')[0])" && node --check /tmp/_chk.js`
   If this fails, revert your edits to `index.html`/`data.js` with
   `git checkout -- index.html data.js` and stop — do not commit broken data.
6. Commit and push:
   `git add data.js index.html && git commit -m "Daily update: $(date +%Y-%m-%d) results"  && git push`
