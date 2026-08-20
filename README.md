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

This is a read-only reference site — there's no way to add, edit, or delete
anyone from the browser. All content comes from `data/seed-data.js`; edit
that file directly (see below) to make changes.

- **Search** — type a name in the box on the left. Click a result to see
  their generation, the full ancestry path back to Farmanfarma, and to jump
  to them in the tree.
- **Tree view** — click and drag to pan, scroll to zoom, click any node to
  select it. The path from the selected person back to the root is
  highlighted in gold. On narrow screens the tree groups Farmanfarma's
  children into tappable wife clusters to stay legible; tap a cluster (or
  the wife legend) to expand it.
- **Profile pages** — click "View full profile" on a selected person for
  their bio, photo, residence, links, and parent/children navigation.

## About the seed data

The source document (a hand-drawn chart) is only reliably legible in one
place: the reference genealogy on the left side, labelled "Etalon – Base",
tracing the Qajar dynasty from Agha Mohammad Khan down to Ahmad Shah. That
chain is transcribed in `data/seed-data.js` under `SEED_QAJAR_REFERENCE`,
rendered as a read-only reference chart at the bottom of the page, and has
since been corrected and extended against a physical family genealogy book
("Shahzdeh's Tree").

The actual Farmanfarma family tree (`SEED_FAMILY_TREE`) is rooted at
Prince Abdol Hossein Mirza Farmanfarma (1857–1939) and is filled in from a
mix of Wikipedia, a family genealogy record (via Encyclopaedia Iranica),
and the "Shahzdeh's Tree" book — see the doc comment at the top of
`data/seed-data.js` for the full sourcing notes.

### Editing the seed data

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

Edit this file directly and reload the page to see the changes; there is no
in-app editor.

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
