(() => {
    'use strict';

    /* ---------------------------------------------------------------- */
    /* State -- this is a read-only reference site, so the tree is always */
    /* the seed data as shipped; nothing here mutates or persists it.     */
    /* ---------------------------------------------------------------- */

    function structuredCloneCompat(obj) {
        return typeof structuredClone === 'function' ? structuredClone(obj) : JSON.parse(JSON.stringify(obj));
    }

    let tree = structuredCloneCompat(window.SEED_FAMILY_TREE);
    let selectedId = tree.id;
    let pendingFocusScale = null;
    let byId = new Map();     // id -> node
    let parentOf = new Map(); // id -> parent node (or null for root)
    rebuildIndex();

    function rebuildIndex() {
        byId = new Map();
        parentOf = new Map();
        (function walk(node, parent) {
            byId.set(node.id, node);
            parentOf.set(node.id, parent);
            (node.children || []).forEach(child => walk(child, node));
        })(tree, null);
    }

    function ancestryPath(id) {
        const path = [];
        let node = byId.get(id);
        while (node) {
            path.unshift(node);
            node = parentOf.get(node.id);
        }
        return path;
    }

    /* ---------------------------------------------------------------- */
    /* Search                                                             */
    /* ---------------------------------------------------------------- */

    const searchInput = document.getElementById('person-search');
    const searchResults = document.getElementById('search-results');

    searchInput.addEventListener('input', () => renderSearchResults(searchInput.value));
    searchInput.addEventListener('focus', () => renderSearchResults(searchInput.value));
    document.addEventListener('click', (e) => {
        if (!e.target.closest('.search-box')) searchResults.hidden = true;
    });

    function renderSearchResults(query) {
        const q = query.trim().toLowerCase();
        searchResults.innerHTML = '';
        if (!q) { searchResults.hidden = true; return; }

        const matches = [...byId.values()].filter(p =>
            p.name.toLowerCase().includes(q) || (p.nameFa || '').includes(query.trim())
        ).slice(0, 25);

        if (matches.length === 0) {
            searchResults.innerHTML = '<div class="search-empty">No one matches that name yet.</div>';
        } else {
            matches.forEach(p => {
                const item = document.createElement('div');
                item.className = 'search-result-item';
                item.innerHTML = `${escapeHtml(p.name)}${p.nameFa ? `<span class="name-fa-inline">${escapeHtml(p.nameFa)}</span>` : ''}`;
                item.addEventListener('click', () => {
                    searchInput.value = p.name;
                    searchResults.hidden = true;
                    selectPerson(p.id, true);
                });
                searchResults.appendChild(item);
            });
        }
        searchResults.hidden = false;
    }

    function escapeHtml(str) {
        return String(str).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
    }

    /* ---------------------------------------------------------------- */
    /* Position / ancestry panel                                         */
    /* ---------------------------------------------------------------- */

    const positionResult = document.getElementById('position-result');
    const generationLine = document.getElementById('generation-line');
    const ancestryPathEl = document.getElementById('ancestry-path');

    function renderPosition(id) {
        const path = ancestryPath(id);
        const gen = path.length - 1;
        const person = path[path.length - 1];

        if (gen === 0) {
            generationLine.textContent = `${person.name} is the root of the tree.`;
        } else if (person.role === 'spouse') {
            generationLine.textContent = `${person.name} married into the family.`;
        } else {
            generationLine.textContent = `${person.name} is generation ${gen} — a ${ordinalDescendant(gen)} of Prince Abdol Hossein Mirza Farmanfarma.`;
        }

        ancestryPathEl.innerHTML = '';
        path.forEach((node, i) => {
            const li = document.createElement('li');
            if (i === path.length - 1) {
                li.innerHTML = `<span class="current">${escapeHtml(node.name)}</span>`;
            } else {
                const btn = document.createElement('button');
                btn.type = 'button';
                btn.textContent = node.name;
                btn.addEventListener('click', () => selectPerson(node.id, true));
                li.appendChild(btn);
            }
            ancestryPathEl.appendChild(li);
        });

        positionResult.hidden = false;
    }

    function ordinalDescendant(n) {
        const map = { 1: 'child', 2: 'grandchild', 3: 'great-grandchild' };
        if (map[n]) return map[n];
        return `great-${'great-'.repeat(n - 3)}grandchild`;
    }

    /* ---------------------------------------------------------------- */
    /* Detail panel                                                      */
    /* ---------------------------------------------------------------- */

    const detailPanel = document.getElementById('detail-panel');
    const detailPhoto = document.getElementById('detail-photo');
    const detailName = document.getElementById('detail-name');
    const detailNameFa = document.getElementById('detail-name-fa');
    const detailDates = document.getElementById('detail-dates');
    const detailChildNumber = document.getElementById('detail-child-number');
    const detailMother = document.getElementById('detail-mother');
    const detailNote = document.getElementById('detail-note');
    const detailDescendants = document.getElementById('detail-descendants');
    const detailSiblings = document.getElementById('detail-siblings');
    const detailSiblingsList = document.getElementById('detail-siblings-list');

    function renderAvatar(container, node, sizeClass) {
        container.innerHTML = '';
        if (node.photo) {
            const img = document.createElement('img');
            img.src = node.photo;
            img.alt = '';
            container.appendChild(img);
        } else {
            container.textContent = (node.name || '?').trim().charAt(0).toUpperCase();
        }
    }

    function siblingsBySameMother(id) {
        const node = byId.get(id);
        const parent = parentOf.get(id);
        if (!node || !parent || !node.mother) return [];
        return (parent.children || []).filter(c => c.id !== id && c.mother && c.mother === node.mother);
    }

    function renderDetail(id) {
        const node = byId.get(id);
        if (!node) { detailPanel.hidden = true; return; }
        renderAvatar(detailPhoto, node);
        detailName.textContent = node.name;
        detailNameFa.textContent = node.nameFa || '';
        detailNameFa.hidden = !node.nameFa;
        const dates = [node.born, node.died].filter(d => d !== null && d !== undefined && d !== '');
        detailDates.textContent = dates.length ? `${node.born ?? '?'} – ${node.died ?? '?'}` : '';
        detailDates.hidden = dates.length === 0;
        if (node.role === 'spouse') {
            const parent = parentOf.get(id);
            detailChildNumber.textContent = `Married into the family${parent ? ` — spouse of ${parent.name}` : ''}`;
            detailChildNumber.hidden = false;
            detailMother.hidden = true;
        } else {
            detailChildNumber.textContent = node.childNumber ? `Birth order: ${node.childNumber}` : '';
            detailChildNumber.hidden = !node.childNumber;
            detailMother.innerHTML = node.mother ? `<strong>Mother:</strong> ${escapeHtml(node.mother)}` : '';
            detailMother.hidden = !node.mother;
        }
        detailNote.textContent = node.note || '';
        detailNote.hidden = !node.note;

        const descCount = countDescendants(node);
        if (descCount > 0) {
            detailDescendants.textContent = `${descCount} descendant${descCount > 1 ? 's' : ''} →`;
            detailDescendants.hidden = false;
            detailDescendants.onclick = () => focusSubtree(id);
        } else {
            detailDescendants.hidden = true;
        }

        const siblings = siblingsBySameMother(id);
        if (siblings.length > 0) {
            detailSiblingsList.innerHTML = '';
            siblings.forEach(sib => {
                const btn = document.createElement('button');
                btn.type = 'button';
                btn.textContent = sib.name;
                btn.addEventListener('click', () => addPerson(sib.id, true));
                detailSiblingsList.appendChild(btn);
            });
            detailSiblings.hidden = false;
        } else {
            detailSiblings.hidden = true;
        }

        detailPanel.hidden = false;
    }

    document.getElementById('btn-close-detail').addEventListener('click', () => { detailPanel.hidden = true; });
    document.getElementById('btn-view-profile').addEventListener('click', () => { location.hash = '#p/' + selectedId; });

    /* ---------------------------------------------------------------- */
    /* Selection                                                          */
    /* ---------------------------------------------------------------- */

    // A fresh look at someone -- shows only their own path from Farmanfarma,
    // dropping any other paths that were pinned before.
    function selectPerson(id, focusTree) {
        if (!byId.has(id)) return;
        selectedId = id;
        pendingFocusScale = null;
        resetPins(id);
        renderPosition(id);
        renderDetail(id);
        renderTree(focusTree);
    }

    // Adds someone alongside whatever's already pinned -- used when browsing
    // from one relative's profile to another, so the tree accumulates their
    // paths instead of losing what was already there.
    function addPerson(id, focusTree) {
        if (!byId.has(id)) return;
        selectedId = id;
        pendingFocusScale = null;
        addPin(id);
        renderPosition(id);
        renderDetail(id);
        renderTree(focusTree);
    }

    function focusSubtree(id) {
        if (!byId.has(id)) return;
        const count = countDescendants(byId.get(id));
        pendingFocusScale = Math.max(1, Math.min(2.5, 3 / Math.sqrt(count + 1)));
        selectedId = id;
        addPin(id);
        fullyExpandedIds.add(id);
        renderPosition(id);
        renderDetail(id);
        renderTree(true);
        // On mobile the detail panel and tree canvas are stacked, not side by
        // side -- without this, tapping "N descendants" updates the tree
        // off-screen below and looks like the button does nothing at all.
        if (isMobileCanvas()) canvas.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }

    /* ---------------------------------------------------------------- */
    /* D3 radial tree                                                    */
    /* ---------------------------------------------------------------- */

    const canvas = document.getElementById('tree-canvas');
    let svg, gZoom, zoomBehavior;

    // Wife-group colors: a distinct color per wife, applied to G1 children (and,
    // via their ancestry, their descendants) on the round tree only -- full
    // formal names/mother text elsewhere are untouched.
    const WIFE_COLORS = ['#2a9d8f', '#e76f51', '#457b9d', '#e9c46a', '#6a4c93', '#3a86ff', '#bc6c25', '#8a5a44'];
    // Portraits cropped from the genealogy book's per-wife biography pages.
    const WIFE_PHOTOS = {
        1: 'images/wives/ezzat-ed-dowleh.jpg',
        2: 'images/wives/mah-bagum.jpg',
        3: 'images/wives/massoumeh-tafreshi.jpg',
        4: 'images/wives/batoul-ahshami.jpg',
        5: 'images/wives/fatemeh-alinaghi.jpg',
        6: 'images/wives/akhtarzaman-hormozian.jpg',
        7: 'images/wives/hamdam-talai.jpg',
        8: 'images/wives/batoul-chizar-doost.jpg',
    };

    function wifeIndexOf(g1Node) {
        const m = /\(wife #(\d+)/.exec((g1Node && g1Node.mother) || '');
        return m ? parseInt(m[1], 10) : null;
    }

    function wifeColorForNode(id) {
        const path = ancestryPath(id);
        if (path.length < 2) return null; // the root itself has no wife group
        const idx = wifeIndexOf(path[1]);
        return idx ? WIFE_COLORS[(idx - 1) % WIFE_COLORS.length] : null;
    }

    function renderWifeLegend() {
        const legend = document.getElementById('wife-legend');
        const seen = new Map();
        tree.children.forEach((c) => {
            const idx = wifeIndexOf(c);
            if (idx && !seen.has(idx)) {
                seen.set(idx, c.mother.replace(/\s*\(wife #\d+.*\)$/, ''));
            }
        });
        const counts = new Map();
        tree.children.forEach((c) => {
            const idx = wifeIndexOf(c);
            if (idx) counts.set(idx, (counts.get(idx) || 0) + 1);
        });
        legend.innerHTML = '';
        legend.classList.toggle('is-tappable', isMobileCanvas());
        [...seen.entries()].sort((a, b) => a[0] - b[0]).forEach(([idx, name]) => {
            const clusterId = `wife-cluster-${idx}`;
            const expanded = browsingClusterId === clusterId;
            const item = document.createElement('button');
            item.type = 'button';
            item.className = 'wife-legend-item' + (expanded ? ' expanded' : '');
            item.innerHTML = `<span class="wife-legend-swatch" style="background:${WIFE_COLORS[(idx - 1) % WIFE_COLORS.length]}"></span>`
                + `<span class="wife-legend-name">${escapeHtml(name)}</span>`
                + (isMobileCanvas() ? `<span class="wife-legend-count">${counts.get(idx) || 0}</span><span class="wife-legend-chevron">${expanded ? '⌄' : '›'}</span>` : '');
            item.addEventListener('click', () => {
                toggleCluster(clusterId);
                renderTree(false);
            });
            legend.appendChild(item);
        });
    }

    /* 40+ siblings fanned out in one ring overlap badly no matter how they're
       colored or how wide the canvas is -- group them by wife into
       collapsible clusters instead, each expandable by tap, on every screen
       size. Names must never overlap, full stop. */
    function isMobileCanvas() {
        return true;
    }
    // The tree only ever draws the *paths* of people you've actually looked
    // at, not whole sibling groups -- selecting someone shows only their line
    // from Farmanfarma down to them (plus their own direct children, so you
    // can see who they had); browsing through relatives' profiles adds each
    // one's path alongside what's already there, so the tree accumulates as
    // you explore instead of forcing one lineage open at a time.
    let pinnedIds = new Set();
    // "N descendants" additionally unfolds a person's whole subtree, not just
    // their direct kids -- tracked separately since it's a deliberate,
    // heavier action distinct from ordinary path pinning.
    let fullyExpandedIds = new Set();
    // A single wife-cluster can also be opened as a flat browse list (tap the
    // cluster dot or its legend row) independent of any pinned path -- one at
    // a time, since two full sibling groups open together still crowd the
    // wheel even with horizontal labels.
    let browsingClusterId = null;
    function resetPins(id) {
        pinnedIds = new Set([id]);
        fullyExpandedIds = new Set();
        browsingClusterId = null;
    }
    function addPin(id) {
        pinnedIds.add(id);
    }
    function toggleCluster(clusterId) {
        browsingClusterId = (browsingClusterId === clusterId) ? null : clusterId;
    }
    const UNATTRIBUTED_CLUSTER_ID = 'wife-cluster-unattributed';
    // Nodes lying on the route to a pin (every ancestor plus the pinned
    // person themself). Reaching a node this way opens it -- but "open" means
    // showing ALL of its children, siblings included, never just the one
    // being followed. Drilling only continues into whichever child is
    // itself on this same set.
    function computeOnPathIds() {
        const ids = new Set([tree.id]);
        pinnedIds.forEach((pid) => {
            if (!byId.has(pid)) return;
            ancestryPath(pid).forEach((n) => ids.add(n.id));
        });
        return ids;
    }
    // "N descendants" force-opens a whole subtree regardless of the path
    // rule above -- every descendant of a fully-expanded person is visible.
    function computeFullyExpandedIds() {
        const ids = new Set();
        fullyExpandedIds.forEach((pid) => {
            if (!byId.has(pid)) return;
            (function walk(n) { ids.add(n.id); (n.children || []).forEach(walk); })(byId.get(pid));
        });
        return ids;
    }
    // A spouse married into the family isn't a descendant -- pull any out of
    // a node's own children so they never get treated as one (counted,
    // recursed into as a generation, etc.), and carry them separately as
    // `.spouses` so the round tree can draw them as a marriage tie beside
    // their partner instead of a child hanging below.
    function splitSpouses(node) {
        const kids = node.children || [];
        return {
            spouses: kids.filter((c) => c.role === 'spouse'),
            bloodChildren: kids.filter((c) => c.role !== 'spouse'),
        };
    }
    // Builds the display copy of a real subtree. `node` is already open, so
    // every one of its children is kept (siblings never disappear); a child
    // only keeps its own children if it's on the path/fully-expanded set
    // too, otherwise it renders as a closed leaf with a hidden-count.
    function buildVisibleSubtree(node, onPath, fullSet) {
        const { spouses, bloodChildren } = splitSpouses(node);
        const clone = { ...node, spouses };
        clone.children = bloodChildren.map((c) => (onPath.has(c.id) || fullSet.has(c.id))
            ? buildVisibleSubtree(c, onPath, fullSet)
            : { ...c, spouses: splitSpouses(c).spouses, children: [], _hiddenChildCount: splitSpouses(c).bloodChildren.length });
        return clone;
    }
    // A cluster opens (full flat sibling list) if it's being actively
    // browsed, or if any of its G1 kids is on the path to a pin -- each kid
    // then keeps drilling only if it's on that same path itself.
    function clusterChildren(realChildren, clusterId, onPath, fullSet) {
        const isOpen = browsingClusterId === clusterId || realChildren.some((ch) => onPath.has(ch.id) || fullSet.has(ch.id));
        if (!isOpen) return [];
        return realChildren.map((ch) => (onPath.has(ch.id) || fullSet.has(ch.id))
            ? buildVisibleSubtree(ch, onPath, fullSet)
            : { ...ch, spouses: splitSpouses(ch).spouses, children: [], _hiddenChildCount: splitSpouses(ch).bloodChildren.length });
    }
    function buildDisplayTree() {
        const onPath = computeOnPathIds();
        const fullSet = computeFullyExpandedIds();
        const clusters = new Map(); // wife index -> cluster node
        const passthrough = [];
        (tree.children || []).forEach((child) => {
            const idx = wifeIndexOf(child);
            if (!idx) { passthrough.push(child); return; }
            if (!clusters.has(idx)) {
                clusters.set(idx, {
                    id: `wife-cluster-${idx}`,
                    isCluster: true,
                    wifeIndex: idx,
                    name: child.mother.replace(/\s*\(wife #\d+.*\)$/, ''),
                    photo: WIFE_PHOTOS[idx] || null,
                    realChildren: [],
                });
            }
            clusters.get(idx).realChildren.push(child);
        });
        const clusterNodes = [...clusters.values()].sort((a, b) => a.wifeIndex - b.wifeIndex).map((c) => ({
            ...c,
            children: clusterChildren(c.realChildren, c.id, onPath, fullSet),
        }));
        // Children with no recorded mother (e.g. still-unattributed Wikipedia
        // entries) get their own cluster too, instead of sitting loose next to
        // the root looking like they belong there structurally.
        const extra = [];
        if (passthrough.length) {
            extra.push({
                id: UNATTRIBUTED_CLUSTER_ID,
                isCluster: true,
                wifeIndex: null,
                name: 'Mother not recorded',
                realChildren: passthrough,
                children: clusterChildren(passthrough, UNATTRIBUTED_CLUSTER_ID, onPath, fullSet),
            });
        }
        return { ...tree, children: [...clusterNodes, ...extra] };
    }
    function colorForRenderNode(d) {
        if (d.data.isCluster) return d.data.wifeIndex ? WIFE_COLORS[(d.data.wifeIndex - 1) % WIFE_COLORS.length] : '#9a9a9a';
        return wifeColorForNode(d.data.id);
    }

    // Trim the repetitive shared surname/title so labels on the crowded round
    // tree stay legible; full formal names remain everywhere else (search,
    // detail panel, profile pages, exports).
    const DROP_LEADING_WORDS = new Set(['prince', 'princess']);
    const DROP_TRAILING_WORDS = new Set(['farmanfarmaian', 'farman-farmaian', 'farman', 'farmaian', 'farmanfarma', 'firouz']);
    function shortDisplayName(fullName) {
        const words = fullName.replace(/\s*\(.*?\)\s*$/, '').trim().split(/\s+/);
        while (words.length > 1 && DROP_LEADING_WORDS.has(words[0].toLowerCase())) words.shift();
        while (words.length > 1 && DROP_TRAILING_WORDS.has(words[words.length - 1].toLowerCase().replace(/[^a-z-]/g, ''))) words.pop();
        return words.join(' ') || fullName;
    }

    function initSvg() {
        canvas.innerHTML = '';
        svg = d3.select(canvas).append('svg');
        gZoom = svg.append('g').attr('class', 'zoom-layer');
        // A big pinned-open tree can need a lot more room than the screen --
        // let people zoom out further to see it all, not just further in.
        zoomBehavior = d3.zoom().scaleExtent([0.12, 3]).on('zoom', (event) => {
            gZoom.attr('transform', event.transform);
        });
        svg.call(zoomBehavior);
    }

    // Same string the label <text> below renders -- shared so the width
    // estimate used for layout never drifts from what's actually drawn.
    function labelTextFor(d) {
        return d.data.isCluster
            ? `${shortDisplayName(d.data.name).replace(/\bKhanum\b\s*/gi, '')} (${d.data.realChildren.length})${d.children ? '' : ' ›'}`
            : shortDisplayName(d.data.name);
    }
    // Rough glyph width for the 11px label font -- doesn't need to be exact,
    // just a safe-sized upper bound so the collision pass below never
    // under-reserves room for a label.
    function estimateLabelPx(d) {
        const perChar = d.data.isCluster ? 7.8 : 6.8;
        return labelTextFor(d).length * perChar + 16;
    }
    const SPOUSE_TIE_GAP = 20;
    function estimateSpouseLabelPx(spouseNode) {
        return (shortDisplayName(spouseNode.name).length + 2) * 6.4 + 14; // +2 chars for the "⚭ " mark
    }
    // A node's real on-screen footprint, including any marriage tie(s)
    // trailing off it -- what the ring-sizing pass below needs to reserve
    // room for, as opposed to `estimateLabelPx`, which is just the person's
    // own name (used for the label itself and for same-ring neighbour math,
    // since a spouse tie doesn't compete with a sibling for THAT gap).
    function estimateNodeFootprintPx(d) {
        let w = estimateLabelPx(d);
        (d.data.spouses || []).forEach((sp) => { w += SPOUSE_TIE_GAP + estimateSpouseLabelPx(sp); });
        return w;
    }
    // Which horizontal side a node's label (and any spouse tie) extends
    // toward -- outward on the right half of the wheel, inward on the left,
    // matching the label's own text-anchor logic below.
    function labelSide(d) {
        return (d.x < Math.PI === !d.children) ? 1 : -1;
    }
    function radialPoint(angle, r) {
        return [r * Math.sin(angle), -r * Math.cos(angle)];
    }

    function renderTree(focusSelected) {
        const width = canvas.clientWidth || 600;
        const height = canvas.clientHeight || 600;
        const radius = Math.min(width, height) / 2 - 60;

        if (!svg) initSvg();
        svg.attr('viewBox', [-width / 2, -height / 2, width, height]);
        gZoom.selectAll('*').remove();
        renderWifeLegend();

        // No crossing lines and no overlapping labels is a hard rule, not
        // just a starting spacing -- so the angle each node gets is laid out
        // like a sunburst chart (d3.partition()), not a free-form tree. Every
        // node's angular slice is, by construction, entirely contained
        // inside its own parent's slice, sized proportionally to how many
        // visible leaves it has, so one heavily-opened branch (e.g. a wife's
        // 9 shown children) can take a wide share of the circle without ever
        // reaching into an unrelated branch's territory. That containment is
        // what a plain width-aware tree layout *can't* promise: a node whose
        // children fan out wide can still sit at a single point itself, so a
        // straight (or curved) line out to one of those children can sweep
        // across another branch's space even though no two node POSITIONS
        // actually overlap. Fixed, non-overlapping wedges rule that out
        // entirely -- neither nodes nor the links between them can ever
        // leave the wedge their whole lineage was given.
        const root = d3.hierarchy(buildDisplayTree()).sort((a, b) => (wifeIndexOf(a.data) || 0) - (wifeIndexOf(b.data) || 0));
        root.count(); // d.value = number of visible leaves under each node (>=1)
        d3.partition().size([2 * Math.PI, 1])(root);
        root.each(d => { d.x = (d.x0 + d.x1) / 2; d.sliceWidth = d.x1 - d.x0; });

        const maxDepth = Math.max(1, d3.max(root.descendants(), d => d.depth));
        const baseRing1Radius = Math.min(radius * 0.4, 150);
        function baselineRingRadius(depth) {
            if (depth <= 1) return baseRing1Radius;
            return baseRing1Radius + (depth - 1) * (radius - baseRing1Radius) / Math.max(1, maxDepth - 1);
        }
        const RING_GAP_PADDING = 14;
        const SLICE_SAFETY = 1.3; // buffer since a label only needs to fit ~half its slice, not the whole thing
        const byDepth = d3.group(root.descendants(), d => d.depth);

        // Labels render horizontally, not radially, so a label can reach
        // sideways into a whole different ring -- not just crowd its own.
        // Track the widest label at each depth (root included) so the ring
        // spacing below can guarantee neighbouring rings stay out of reach
        // of each other too.
        const maxWidthByDepth = new Map();
        for (let depth = 0; depth <= maxDepth; depth++) {
            const nodes = byDepth.get(depth) || [];
            maxWidthByDepth.set(depth, nodes.reduce((m, d) => Math.max(m, estimateNodeFootprintPx(d)), 0));
        }

        const ringRadius = new Map([[0, 0]]);
        for (let depth = 1; depth <= maxDepth; depth++) {
            const nodes = byDepth.get(depth) || [];
            // wide enough that every node's own label fits inside the wedge
            // partition() already gave it, so it can never reach a neighbour's.
            const minForSliceFit = nodes.reduce((m, d) => Math.max(m, (estimateNodeFootprintPx(d) * SLICE_SAFETY) / Math.max(d.sliceWidth, 1e-6)), 0);
            const minForRingGap = ringRadius.get(depth - 1) + maxWidthByDepth.get(depth - 1) + maxWidthByDepth.get(depth) + RING_GAP_PADDING;
            ringRadius.set(depth, Math.max(baselineRingRadius(depth), minForSliceFit, minForRingGap));
        }
        root.each(d => { d.y = ringRadius.get(d.depth) || 0; });

        const pathIds = new Set(ancestryPath(selectedId).map(n => n.id));

        // Straight radial segments, not d3's default bump curve -- a bump
        // curve bulges outward between two polar points and can visually
        // cross into a neighbouring branch's wedge even when the underlying
        // tree has no actual crossing; a straight line never leaves the
        // angular wedge d3.tree() already guaranteed doesn't overlap anyone
        // else's.
        const linkGen = d => {
            const [sx, sy] = radialPoint(d.source.x, d.source.y);
            const [tx, ty] = radialPoint(d.target.x, d.target.y);
            return `M${sx},${sy}L${tx},${ty}`;
        };

        gZoom.append('g')
            .attr('fill', 'none')
            .selectAll('path')
            .data(root.links())
            .join('path')
            .attr('class', d => 'link' + (pathIds.has(d.source.data.id) && pathIds.has(d.target.data.id) ? ' highlighted' : ''))
            .style('stroke', d => (pathIds.has(d.source.data.id) && pathIds.has(d.target.data.id)) ? null : colorForRenderNode(d.target))
            .attr('d', linkGen);

        const node = gZoom.append('g')
            .selectAll('g')
            .data(root.descendants())
            .join('g')
            .attr('class', d => 'node'
                + (d.data.id === selectedId ? ' selected' : '')
                + (pathIds.has(d.data.id) ? ' highlighted' : '')
                + (d.data.photo ? ' has-photo' : '')
                + (d.data.isCluster ? ' wife-cluster' : ''))
            .attr('transform', d => d.data.id === tree.id ? 'translate(0,0)' : `rotate(${(d.x * 180 / Math.PI) - 90}) translate(${d.y},0)`)
            .style('cursor', 'pointer')
            .on('click', (event, d) => {
                event.stopPropagation();
                if (d.data.isCluster) {
                    toggleCluster(d.data.id);
                    renderTree(false);
                } else {
                    selectPerson(d.data.id, false);
                }
            });

        // An invisible, generously-sized tap target per node -- the visible
        // circle (as small as 5px) plus a rotated text label with gaps between
        // glyphs is too fiddly a hit area for a real finger, especially for
        // cluster nodes that must be tappable to get anywhere on mobile.
        node.append('circle')
            .attr('class', 'node-hit-target')
            .attr('r', d => d.data.isCluster ? 28 : 14)
            .attr('fill', 'transparent')
            .style('stroke', 'none')
            .style('pointer-events', 'all');

        const photoRadius = d => d.data.id === tree.id ? 8 : (d.data.isCluster ? 13 : 5);

        const defs = gZoom.append('defs');
        node.filter(d => !!d.data.photo).each(function (d) {
            defs.append('clipPath')
                .attr('id', `clip-${d.data.id}`)
                .append('circle')
                .attr('r', photoRadius(d));
        });

        // Photos must stay upright regardless of where they sit on the wheel --
        // the enclosing node is rotated to its angular position, so counter-
        // rotate a wrapper group by the same amount (the same trick used for
        // the text labels below) rather than letting the portrait itself tilt.
        node.filter(d => !!d.data.photo)
            .append('g')
            .attr('transform', d => d.data.id === tree.id ? null : `rotate(${90 - (d.x * 180 / Math.PI)})`)
            .append('image')
            .attr('href', d => d.data.photo)
            .attr('x', d => -photoRadius(d))
            .attr('y', d => -photoRadius(d))
            .attr('width', d => photoRadius(d) * 2)
            .attr('height', d => photoRadius(d) * 2)
            .attr('preserveAspectRatio', 'xMidYMid slice')
            .attr('clip-path', d => `url(#clip-${d.data.id})`);

        // The frame ring needs a bold stroke on photo nodes -- a hairline
        // reads as swallowed by a dark vintage portrait and looks like a
        // solid black disc rather than a coloured frame around it.
        node.append('circle')
            .attr('r', d => d.data.isCluster ? 13 : (d.data.id === tree.id ? 8 : 5))
            .style('fill', d => (d.data.isCluster && !d.data.photo) ? colorForRenderNode(d) : null)
            .style('stroke', d => d.data.id === selectedId ? null : colorForRenderNode(d))
            .style('stroke-width', d => d.data.photo ? '3px' : null);

        // Labels stay upright and horizontal everywhere, never following the
        // wheel's rotation -- sideways or upside-down text was the whole
        // problem. Counter-rotate each label by the negative of its node's
        // own rotation so it renders flat regardless of where it sits.
        node.append('text')
            .attr('dy', '0.31em')
            .attr('x', d => d.data.id === tree.id ? 12 : (labelSide(d) > 0 ? 8 : -8))
            .attr('text-anchor', d => d.data.id === tree.id ? 'start' : (labelSide(d) > 0 ? 'start' : 'end'))
            .attr('transform', d => d.data.id === tree.id ? null : `rotate(${90 - (d.x * 180 / Math.PI)})`)
            .style('fill', d => d.data.id === selectedId ? null : (d.data.isCluster ? null : colorForRenderNode(d)))
            .style('font-weight', d => d.data.isCluster ? '700' : null)
            .style('pointer-events', 'all') // hit-test the label's full box, not just painted glyph pixels
            .text(d => labelTextFor(d));

        // Cluster labels are the main visible thing to tap, but they're long
        // rotated text trailing 100+ px away from the small dot -- cover that
        // whole span too, or a tap on the label itself (the natural thing to
        // tap) silently misses everything and does nothing.
        node.filter(d => d.data.isCluster).append('rect')
            .attr('class', 'node-hit-target')
            .attr('x', d => labelSide(d) > 0 ? 0 : -230)
            .attr('y', -16)
            .attr('width', 230)
            .attr('height', 32)
            .attr('transform', d => `rotate(${90 - (d.x * 180 / Math.PI)})`)
            .attr('fill', 'transparent')
            .style('pointer-events', 'all');

        // A spouse married into the family sits beside their partner on a
        // dashed marriage tie, at the same generation -- the standard
        // genealogy-chart convention -- rather than hanging below like a
        // child, and is drawn hollow/muted/italic so it's unmistakably not
        // a blood descendant. Chained outward from wherever the partner's
        // own name ends, one tie+name per recorded marriage.
        node.filter(d => (d.data.spouses || []).length > 0)
            .append('g')
            .attr('class', 'spouse-group')
            .attr('transform', d => d.data.id === tree.id ? null : `rotate(${90 - (d.x * 180 / Math.PI)})`)
            .each(function (d) {
                const g = d3.select(this);
                const side = d.data.id === tree.id ? 1 : labelSide(d);
                let cursor = side * (8 + estimateLabelPx(d));
                (d.data.spouses || []).forEach((sp) => {
                    const tieEnd = cursor + side * SPOUSE_TIE_GAP;
                    g.append('line')
                        .attr('class', 'spouse-tie')
                        .attr('x1', cursor).attr('y1', 0)
                        .attr('x2', tieEnd).attr('y2', 0);
                    g.append('circle')
                        .attr('class', 'spouse-dot')
                        .attr('cx', tieEnd).attr('cy', 0)
                        .attr('r', 4)
                        .style('fill', 'none')
                        .style('cursor', 'pointer')
                        .style('pointer-events', 'all')
                        .on('click', (event) => { event.stopPropagation(); selectPerson(sp.id, false); });
                    g.append('text')
                        .attr('class', 'spouse-label')
                        .attr('x', tieEnd + side * 7)
                        .attr('dy', '0.31em')
                        .attr('text-anchor', side > 0 ? 'start' : 'end')
                        .style('cursor', 'pointer')
                        .style('pointer-events', 'all')
                        .text(`⚭ ${shortDisplayName(sp.name)}`)
                        .on('click', (event) => { event.stopPropagation(); selectPerson(sp.id, false); });
                    cursor = tieEnd + side * (7 + estimateSpouseLabelPx(sp));
                });
            });

        if (focusSelected) {
            const target = root.descendants().find(d => d.data.id === selectedId);
            if (target) {
                const scale = pendingFocusScale || 1;
                const angle = target.x - Math.PI / 2;
                const tx = -Math.cos(angle) * target.y * scale;
                const ty = -Math.sin(angle) * target.y * scale;
                const current = d3.zoomTransform(svg.node());
                const isNoop = Math.abs(current.x - tx) < 0.5 && Math.abs(current.y - ty) < 0.5 && Math.abs(current.k - scale) < 0.01;
                if (isNoop) {
                    // The target transform matches the current view exactly (e.g. clicking
                    // the root's own "N descendants" button, whose subtree is already the
                    // whole visible tree) -- a transition to identical values is invisible,
                    // so pulse instead to confirm the click actually did something.
                    svg.transition().duration(180)
                        .call(zoomBehavior.transform, d3.zoomIdentity.translate(tx, ty).scale(scale * 0.92))
                        .transition().duration(320)
                        .call(zoomBehavior.transform, d3.zoomIdentity.translate(tx, ty).scale(scale));
                } else {
                    svg.transition().duration(500).call(
                        zoomBehavior.transform,
                        d3.zoomIdentity.translate(tx, ty).scale(scale)
                    );
                }
            }
            pendingFocusScale = null;
        }
    }

    document.getElementById('btn-zoom-reset').addEventListener('click', () => {
        resetPins(selectedId);
        renderTree(false);
        if (svg && zoomBehavior) svg.transition().duration(300).call(zoomBehavior.transform, d3.zoomIdentity);
    });

    window.addEventListener('resize', () => renderTree(false));

    // Spouses married into the family aren't descendants -- don't count them.
    function countDescendants(node) {
        return (node.children || []).filter((c) => c.role !== 'spouse')
            .reduce((acc, c) => acc + 1 + countDescendants(c), 0);
    }

    /* ---------------------------------------------------------------- */
    /* Qajar reference chart: top-down box-and-line org chart, D3-laid-out */
    /* ---------------------------------------------------------------- */

    function renderQajarChart() {
        const container = document.getElementById('qajar-chart');
        container.innerHTML = '';

        const nodeWidth = 160;
        const nodeHeight = 175;

        const root = d3.hierarchy(window.SEED_QAJAR_REFERENCE);
        const hasAnySpouse = root.descendants().some(d => !!d.data.spouse);
        d3.tree()
            .nodeSize([nodeWidth, nodeHeight])
            .separation((a, b) => (a.parent === b.parent ? 1 : 2) + ((a.data.spouse || b.data.spouse) ? 1.5 : 0))
            (root);

        let minX = Infinity, maxX = -Infinity, maxY = 0;
        root.each(d => {
            minX = Math.min(minX, d.x);
            maxX = Math.max(maxX, d.x);
            maxY = Math.max(maxY, d.y);
        });
        const offsetX = -minX + nodeWidth / 2 + 20;
        const totalWidth = (maxX - minX) + nodeWidth + 40 + (hasAnySpouse ? nodeWidth + 30 : 0);
        const totalHeight = maxY + nodeHeight + 20;

        container.style.width = totalWidth + 'px';
        container.style.height = totalHeight + 'px';

        const svgNS = 'http://www.w3.org/2000/svg';
        const svg = document.createElementNS(svgNS, 'svg');
        svg.setAttribute('class', 'qajar-links');
        svg.setAttribute('width', totalWidth);
        svg.setAttribute('height', totalHeight);
        container.appendChild(svg);

        root.links().forEach(link => {
            const sx = link.source.x + offsetX, sy = link.source.y + 20 + 84;
            const tx = link.target.x + offsetX, ty = link.target.y + 20;
            const midY = (sy + ty) / 2;
            const path = document.createElementNS(svgNS, 'path');
            path.setAttribute('class', 'qajar-link');
            path.setAttribute('d', `M${sx},${sy} V${midY} H${tx} V${ty}`);
            svg.appendChild(path);
        });

        root.each(d => {
            const node = d.data;
            const isLink = !!node.linkToMainTree;
            const div = document.createElement('div');
            div.className = 'qajar-node' + (isLink ? ' linkable' : '');
            div.style.left = (d.x + offsetX - nodeWidth / 2) + 'px';
            div.style.top = (d.y + 20) + 'px';

            const avatar = document.createElement('div');
            avatar.className = 'qajar-node-avatar';
            renderAvatar(avatar, node);
            div.appendChild(avatar);

            const name = document.createElement('div');
            name.className = 'qajar-node-name';
            name.textContent = node.name;
            div.appendChild(name);

            if (node.nameFa) {
                const nameFa = document.createElement('div');
                nameFa.className = 'qajar-node-name-fa';
                nameFa.dir = 'rtl';
                nameFa.textContent = node.nameFa;
                div.appendChild(nameFa);
            }

            const dates = [node.born, node.died].filter(v => v !== null && v !== undefined);
            if (dates.length) {
                const datesEl = document.createElement('div');
                datesEl.className = 'qajar-node-dates';
                datesEl.textContent = `${node.born ?? '?'}–${node.died ?? '?'}`;
                div.appendChild(datesEl);
            }

            if (node.social && Object.keys(node.social).length) {
                const socialRow = document.createElement('div');
                socialRow.className = 'qajar-node-social';
                ['wikipedia', 'website', 'instagram', 'linkedin', 'facebook'].forEach((key) => {
                    const href = socialHref(key, node.social[key]);
                    if (!href) return;
                    const a = document.createElement('a');
                    a.className = 'qajar-node-wiki';
                    a.href = href;
                    a.target = '_blank';
                    a.rel = 'noopener noreferrer';
                    a.title = SOCIAL_LABELS[key];
                    a.innerHTML = SOCIAL_ICONS[key];
                    a.addEventListener('click', (e) => e.stopPropagation());
                    socialRow.appendChild(a);
                });
                if (socialRow.children.length) div.appendChild(socialRow);
            }

            if (isLink) {
                div.title = 'Click to jump to the interactive tree above';
                div.addEventListener('click', () => {
                    selectPerson(node.linkToMainTree, true);
                    mainEl.scrollIntoView({ behavior: 'smooth' });
                });
            } else if (node.note) {
                div.title = node.note;
            }

            container.appendChild(div);

            // Spouse box: rendered beside this node, connected by a short
            // horizontal "married" line rather than a parent-child link, since
            // this represents a marriage, not descent.
            if (node.spouse) {
                const spouse = node.spouse;
                const boxLeft = d.x + offsetX - nodeWidth / 2;
                const spouseLeft = boxLeft + nodeWidth + 20;
                const spouseIsLink = !!spouse.linkToMainTree;

                const marriageLine = document.createElementNS(svgNS, 'path');
                marriageLine.setAttribute('class', 'qajar-link qajar-marriage-link');
                const midY = d.y + 20 + 26;
                marriageLine.setAttribute('d', `M${boxLeft + nodeWidth},${midY} H${spouseLeft}`);
                svg.appendChild(marriageLine);

                const sDiv = document.createElement('div');
                sDiv.className = 'qajar-node qajar-spouse-node' + (spouseIsLink ? ' linkable' : '');
                sDiv.style.left = spouseLeft + 'px';
                sDiv.style.top = (d.y + 20) + 'px';

                const sAvatar = document.createElement('div');
                sAvatar.className = 'qajar-node-avatar';
                renderAvatar(sAvatar, spouse);
                sDiv.appendChild(sAvatar);

                const sName = document.createElement('div');
                sName.className = 'qajar-node-name';
                sName.textContent = spouse.name;
                sDiv.appendChild(sName);

                if (spouseIsLink) {
                    sDiv.title = 'Click to jump to the interactive tree above';
                    sDiv.addEventListener('click', () => {
                        selectPerson(spouse.linkToMainTree, true);
                        mainEl.scrollIntoView({ behavior: 'smooth' });
                    });
                }

                container.appendChild(sDiv);
            }
        });
    }

    /* ---------------------------------------------------------------- */
    /* Profile page (hash-routed, e.g. #p/sattareh-farmanfarmaian)        */
    /* ---------------------------------------------------------------- */

    const mainEl = document.querySelector('main');
    const profileView = document.getElementById('profile-view');
    const profilePhoto = document.getElementById('profile-photo');
    const profileSpouseBadge = document.getElementById('profile-spouse-badge');
    const profileName = document.getElementById('profile-name');
    const profileNameFa = document.getElementById('profile-name-fa');
    const profileDates = document.getElementById('profile-dates');
    const profileResidence = document.getElementById('profile-residence');
    const profileLineage = document.getElementById('profile-lineage');
    const profileBio = document.getElementById('profile-bio');
    const profileSocial = document.getElementById('profile-social');
    const profileParentHeading = document.getElementById('profile-parent-heading');
    const profileParent = document.getElementById('profile-parent');
    const profileChildren = document.getElementById('profile-children');
    const profileSiblingsBlock = document.getElementById('profile-siblings-block');
    const profileSiblingsHeading = document.getElementById('profile-siblings-heading');
    const profileSiblings = document.getElementById('profile-siblings');
    const profileSpouseBlock = document.getElementById('profile-spouse-block');
    const profileSpouse = document.getElementById('profile-spouse');

    function socialHref(type, value) {
        if (!value) return null;
        if (/^https?:\/\//i.test(value)) return value;
        if (type === 'instagram') return `https://instagram.com/${value.replace(/^@/, '')}`;
        if (type === 'linkedin') return `https://www.linkedin.com/in/${value.replace(/^@/, '')}`;
        if (type === 'facebook') return `https://facebook.com/${value.replace(/^@/, '')}`;
        return `https://${value}`;
    }

    const SOCIAL_ICONS = {
        wikipedia: '<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm5.6 6.5-3.1 8h-.9l-1.9-5-1.95 5h-.9l-3.1-8h1.15l2.35 6.15L11 8.5h1l1.85 6.15 2.35-6.15h1.4z"/></svg>',
        linkedin: '<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M4.98 3.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5zM3 9h4v12H3zM9 9h3.8v1.64h.05c.53-1 1.83-2.05 3.77-2.05 4.03 0 4.78 2.65 4.78 6.1V21H17.4v-5.7c0-1.36-.02-3.1-1.89-3.1-1.9 0-2.19 1.48-2.19 3v5.8H9z"/></svg>',
        instagram: '<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 2c2.72 0 3.06.01 4.12.06 1.06.05 1.79.22 2.43.47.66.26 1.22.6 1.77 1.15.55.55.9 1.11 1.15 1.77.25.64.42 1.37.47 2.43.05 1.06.06 1.4.06 4.12s-.01 3.06-.06 4.12c-.05 1.06-.22 1.79-.47 2.43a4.9 4.9 0 0 1-1.15 1.77 4.9 4.9 0 0 1-1.77 1.15c-.64.25-1.37.42-2.43.47-1.06.05-1.4.06-4.12.06s-3.06-.01-4.12-.06c-1.06-.05-1.79-.22-2.43-.47a4.9 4.9 0 0 1-1.77-1.15 4.9 4.9 0 0 1-1.15-1.77c-.25-.64-.42-1.37-.47-2.43C2.01 15.06 2 14.72 2 12s.01-3.06.06-4.12c.05-1.06.22-1.79.47-2.43.26-.66.6-1.22 1.15-1.77A4.9 4.9 0 0 1 5.45.53C6.09.28 6.82.11 7.88.06 8.94.01 9.28 0 12 0zm0 5a5 5 0 1 0 0 10 5 5 0 0 0 0-10zm0 8.2a3.2 3.2 0 1 1 0-6.4 3.2 3.2 0 0 1 0 6.4zm5.2-8.4a1.17 1.17 0 1 1 0-2.34 1.17 1.17 0 0 1 0 2.34z" transform="translate(0 2)"/></svg>',
        facebook: '<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M13.5 21v-8h2.7l.4-3.1h-3.1V8c0-.9.25-1.5 1.55-1.5H16.7V3.7C16.4 3.66 15.4 3.58 14.24 3.58c-2.4 0-4.04 1.47-4.04 4.16V9.9H7.5V13h2.7v8h3.3z"/></svg>',
        website: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" aria-hidden="true"><circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3a14 14 0 0 1 0 18M12 3a14 14 0 0 0 0 18"/></svg>'
    };
    const SOCIAL_LABELS = { wikipedia: 'Wikipedia', website: 'Website', instagram: 'Instagram', linkedin: 'LinkedIn', facebook: 'Facebook' };

    function renderProfile(id) {
        const node = byId.get(id);
        if (!node) { location.hash = ''; return; }

        renderAvatar(profilePhoto, node);
        profileSpouseBadge.hidden = node.role !== 'spouse';
        profileName.textContent = node.name;
        profileNameFa.textContent = node.nameFa || '';
        profileNameFa.hidden = !node.nameFa;
        const dates = [node.born, node.died].filter(d => d !== null && d !== undefined && d !== '');
        profileDates.textContent = dates.length ? `${node.born ?? '?'} – ${node.died ?? '?'}` : '';
        profileDates.hidden = dates.length === 0;
        profileResidence.textContent = node.residence || '';
        profileResidence.hidden = !node.residence;

        const lineageParts = [];
        if (node.role === 'spouse') {
            const parent = parentOf.get(id);
            lineageParts.push(`Married into the family${parent ? ` — spouse of ${escapeHtml(parent.name)}` : ''}.`);
        } else {
            if (node.childNumber) lineageParts.push(`Birth order: ${escapeHtml(node.childNumber)}.`);
            if (node.mother) lineageParts.push(`Mother: ${escapeHtml(node.mother)}.`);
        }
        profileLineage.innerHTML = lineageParts.join(' ');
        profileLineage.hidden = lineageParts.length === 0;

        profileBio.textContent = node.note || 'No biography recorded yet.';

        profileSocial.innerHTML = '';
        const social = node.social || {};
        // Show every social link on file -- Wikipedia first, then the rest in a fixed order.
        const linkTypes = ['wikipedia', 'website', 'instagram', 'linkedin', 'facebook'];
        linkTypes.forEach((key) => {
            const href = socialHref(key, social[key]);
            if (!href) return;
            const a = document.createElement('a');
            a.href = href;
            a.target = '_blank';
            a.rel = 'noopener noreferrer';
            a.className = 'profile-social-link';
            a.innerHTML = SOCIAL_ICONS[key] + `<span>${SOCIAL_LABELS[key]}</span>`;
            profileSocial.appendChild(a);
        });

        const siblings = siblingsBySameMother(id);
        if (siblings.length > 0 && node.mother) {
            const wifeName = node.mother.replace(/\s*\(wife #\d+.*\)$/, '');
            profileSiblingsHeading.textContent = `Siblings via ${wifeName} (${siblings.length + 1} children)`;
            profileSiblings.innerHTML = '';
            [node, ...siblings].forEach(sib => {
                const btn = document.createElement('button');
                btn.type = 'button';
                btn.textContent = sib.name;
                if (sib.id === id) btn.disabled = true;
                else btn.addEventListener('click', () => { location.hash = '#p/' + sib.id; });
                profileSiblings.appendChild(btn);
            });
            profileSiblingsBlock.hidden = false;
        } else {
            profileSiblingsBlock.hidden = true;
        }

        // A spouse is nested under their partner in the data purely for
        // display attachment -- parentOf still resolves to that partner,
        // but calling them "Parent" would be wrong; it's a marriage, not
        // descent, so the section is relabelled "Spouse" for them instead.
        const parent = parentOf.get(id);
        const hasMother = node.role !== 'spouse' && !!node.mother;
        profileParentHeading.textContent = node.role === 'spouse' ? 'Spouse' : (hasMother ? 'Parents' : 'Parent');
        profileParent.innerHTML = '';
        if (parent) {
            const btn = document.createElement('button');
            btn.type = 'button';
            btn.textContent = parent.name;
            btn.addEventListener('click', () => { location.hash = '#p/' + parent.id; });
            profileParent.appendChild(btn);
        } else {
            profileParent.innerHTML = '<span class="profile-empty">Root of the tree</span>';
        }
        // The tree only tracks blood descent through the father's line, so
        // "Parent" would otherwise mean only him -- the mother is recorded
        // too (at least for Farmanfarma's own children) and belongs here
        // just as much, even though she isn't a separate node to link to.
        if (hasMother) {
            const motherLine = document.createElement('p');
            motherLine.className = 'profile-mother-line';
            motherLine.textContent = `Mother: ${node.mother.replace(/\s*\(wife #\d+.*\)$/, '')}`;
            profileParent.appendChild(motherLine);
        }

        const allKids = node.children || [];
        const spouses = allKids.filter(c => c.role === 'spouse');
        profileSpouse.innerHTML = '';
        if (spouses.length > 0) {
            spouses.forEach(sp => {
                const btn = document.createElement('button');
                btn.type = 'button';
                btn.textContent = sp.name;
                btn.addEventListener('click', () => { location.hash = '#p/' + sp.id; });
                profileSpouse.appendChild(btn);
            });
            profileSpouseBlock.hidden = false;
        } else {
            profileSpouseBlock.hidden = true;
        }

        profileChildren.innerHTML = '';
        const children = allKids.filter(c => c.role !== 'spouse');
        if (children.length > 0) {
            children.forEach(child => {
                const btn = document.createElement('button');
                btn.type = 'button';
                btn.textContent = child.name;
                btn.addEventListener('click', () => { location.hash = '#p/' + child.id; });
                profileChildren.appendChild(btn);
            });
        } else {
            profileChildren.innerHTML = '<span class="profile-empty">No children recorded yet.</span>';
        }

        selectedId = id;
    }

    function showProfileView(id) {
        // Browsing to someone's profile pins their path onto the tree too,
        // so it's still there -- alongside whoever else was already pinned --
        // when you go back.
        addPin(id);
        renderProfile(id);
        mainEl.hidden = true;
        profileView.hidden = false;
        window.scrollTo(0, 0);
    }

    function hideProfileView() {
        profileView.hidden = true;
        mainEl.hidden = false;
    }

    document.getElementById('btn-profile-back').addEventListener('click', () => {
        history.pushState('', document.title, location.pathname + location.search);
        hideProfileView();
        // Don't reset here -- everyone whose profile was visited along the
        // way stays pinned, so their paths are all still on the tree.
        renderPosition(selectedId);
        renderDetail(selectedId);
        renderTree(true);
    });

    function checkRoute() {
        const match = /^#p\/(.+)$/.exec(location.hash);
        if (match && byId.has(decodeURIComponent(match[1]))) {
            showProfileView(decodeURIComponent(match[1]));
        } else {
            hideProfileView();
        }
    }

    window.addEventListener('hashchange', checkRoute);

    /* ---------------------------------------------------------------- */
    /* Init                                                               */
    /* ---------------------------------------------------------------- */

    renderQajarChart();
    // Select the root for the tree/detail panel, but skip renderPosition --
    // "X is the root of the tree, with X starred below" is just noise before
    // anyone has actually searched for someone.
    renderDetail(tree.id);
    renderTree(false);
    checkRoute();
})();
