# Farmansara

An interactive webapp for the family tree of Prince Abdol Hossein Mirza
Farmanfarma. Search for a person, see exactly where they sit in the tree and
their full ancestry back to Farmanfarma, and explore a radial, zoomable
version of the chart.

## Running it locally

No build step, no dependencies to install. From the project root:

```bash
python3 -m http.server 8000
# then open http://localhost:8000
```

(Opening `index.html` directly by double-clicking also works in most
browsers, since all data and scripts are local files.)

## Using the app

- **Search** — type a name in the box on the left. Click a result to see
  their generation, the full ancestry path back to Farmanfarma, and to jump
  to them in the tree.
- **Tree view** — click and drag to pan, scroll to zoom, click any node to
  select it. The path from the selected person back to the root is
  highlighted in gold.
- **Editing** — select a person, then use **Add child**, **Edit**, or
  **Delete** to build out the tree. Changes are saved automatically to your
  browser's local storage.
- **Export / Import JSON** — use **Export JSON** regularly to save a backup
  file of your work. **Import JSON** loads a previously exported file back
  in (or lets you hand-edit the tree in a text editor and reload it).
- **Reset to seed data** — wipes your local edits and restores the original
  starter data below.

## About the seed data

The source document (a hand-drawn chart) is only reliably legible in one
place: the reference genealogy on the left side, labelled "Etalon – Base",
tracing the Qajar dynasty from Agha Mohammad Khan down to Ahmad Shah, plus
the "Salar Dowleh" branch off Abbas Mirza. That chain is transcribed as-is
in `data/seed-data.js` under `SEED_QAJAR_REFERENCE`, rendered as a
read-only reference chart at the bottom of the page. Four children under
Salar Dowleh were illegible in the photo and are left as clearly marked
placeholders.

The actual Farmanfarma family tree (`SEED_FAMILY_TREE`) starts with just
the root person — Prince Abdol Hossein Mirza Farmanfarma (1857–1939) — since
the descendants fan out across the chart in handwriting too small to
transcribe reliably from a photo. Use the in-app editor (or edit
`data/seed-data.js` directly) to fill it in from the original document.

### Editing the seed data directly

`data/seed-data.js` defines two plain JS objects. Each person looks like:

```js
{
  id: 'unique-id',
  name: 'English name',
  nameFa: 'Persian name',
  born: 1857,   // or null if unknown
  died: 1939,   // or null if unknown
  note: 'Optional notes',
  children: [ /* more people, same shape */ ]
}
```

Edit this file and reload the page (or use **Reset to seed data** in the
app) to pick up your changes as the new starting point.

## Deploying

This site is deployed via **Cloudflare** (Workers & Pages), connected to
this repo's `main` branch — every push auto-deploys, live at
`farmansara.roman-khonsari.workers.dev`. Manage it from the
[Cloudflare dashboard](https://dash.cloudflare.com/) under **Workers & Pages
→ farmansara**.

## Tech

Plain HTML/CSS/JS, no build step. Tree visualization uses
[D3.js](https://d3js.org/) v7 (vendored in `js/d3.v7.min.js`, no CDN
dependency).
