(() => {
    'use strict';

    const STORAGE_KEY = 'ffTree.v1';

    /* ---------------------------------------------------------------- */
    /* State                                                             */
    /* ---------------------------------------------------------------- */

    let tree = loadTree();
    let selectedId = tree.id;
    let pendingFocusScale = null;
    let byId = new Map();     // id -> node
    let parentOf = new Map(); // id -> parent node (or null for root)
    rebuildIndex();

    function loadTree() {
        const saved = localStorage.getItem(STORAGE_KEY);
        if (saved) {
            try { return JSON.parse(saved); } catch (e) { /* fall through */ }
        }
        return structuredCloneCompat(window.SEED_FAMILY_TREE);
    }

    function saveTree() {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(tree));
    }

    function structuredCloneCompat(obj) {
        return typeof structuredClone === 'function' ? structuredClone(obj) : JSON.parse(JSON.stringify(obj));
    }

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

    function slugify(name) {
        const base = name.toLowerCase().trim().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '') || 'person';
        let id = base, n = 1;
        while (byId.has(id)) { id = `${base}-${++n}`; }
        return id;
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
                btn.addEventListener('click', () => selectPerson(sib.id, true));
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

    function selectPerson(id, focusTree) {
        if (!byId.has(id)) return;
        selectedId = id;
        pendingFocusScale = null;
        ensureClusterExpanded(id);
        renderPosition(id);
        renderDetail(id);
        renderTree(focusTree);
    }

    function focusSubtree(id) {
        if (!byId.has(id)) return;
        const count = countDescendants(byId.get(id));
        pendingFocusScale = Math.max(1, Math.min(2.5, 3 / Math.sqrt(count + 1)));
        selectedId = id;
        ensureClusterExpanded(id);
        renderPosition(id);
        renderDetail(id);
        renderTree(true);
    }

    /* ---------------------------------------------------------------- */
    /* D3 radial tree                                                    */
    /* ---------------------------------------------------------------- */

    const canvas = document.getElementById('tree-canvas');
    let svg, gZoom, zoomBehavior;

    // Wife-group colors: a distinct color per wife, applied to G1 children (and,
    // via their ancestry, their descendants) on the round tree only -- full
    // formal names/mother text elsewhere are untouched.
    const WIFE_COLORS = ['#2a9d8f', '#e76f51', '#457b9d', '#e9c46a', '#6a4c93', '#3a86ff', '#bc6c25'];

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
        legend.innerHTML = '';
        [...seen.entries()].sort((a, b) => a[0] - b[0]).forEach(([idx, name]) => {
            const item = document.createElement('span');
            item.className = 'wife-legend-item';
            item.innerHTML = `<span class="wife-legend-swatch" style="background:${WIFE_COLORS[(idx - 1) % WIFE_COLORS.length]}"></span>${escapeHtml(name)}`;
            item.style.cursor = 'pointer';
            item.addEventListener('click', () => {
                expandedClusters.add(`wife-cluster-${idx}`);
                renderTree(false);
            });
            legend.appendChild(item);
        });
    }

    /* On narrow screens, 40+ siblings fanned out in one ring overlap badly
       no matter how they're colored -- group them by wife into collapsible
       clusters instead, each expandable by tap. Desktop keeps the full fan. */
    let expandedClusters = new Set();
    function isMobileCanvas() {
        return (canvas.clientWidth || 600) < 700;
    }
    function buildDisplayTree() {
        if (!isMobileCanvas()) return tree;
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
                    realChildren: [],
                });
            }
            clusters.get(idx).realChildren.push(child);
        });
        const clusterNodes = [...clusters.values()].sort((a, b) => a.wifeIndex - b.wifeIndex).map((c) => ({
            ...c,
            children: expandedClusters.has(c.id) ? c.realChildren : [],
        }));
        return { ...tree, children: [...clusterNodes, ...passthrough] };
    }
    function colorForRenderNode(d) {
        if (d.data.isCluster) return WIFE_COLORS[(d.data.wifeIndex - 1) % WIFE_COLORS.length];
        return wifeColorForNode(d.data.id);
    }
    // When jumping to a person (search, sibling/child links, descendants
    // button) on a narrow screen, make sure their wife cluster is expanded
    // first, or they won't exist in the collapsed display tree to focus on.
    function ensureClusterExpanded(id) {
        if (!isMobileCanvas()) return;
        const path = ancestryPath(id);
        if (path.length < 2) return;
        const idx = wifeIndexOf(path[1]);
        if (idx) expandedClusters.add(`wife-cluster-${idx}`);
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
        zoomBehavior = d3.zoom().scaleExtent([0.3, 3]).on('zoom', (event) => {
            gZoom.attr('transform', event.transform);
        });
        svg.call(zoomBehavior);
    }

    function renderTree(focusSelected) {
        const width = canvas.clientWidth || 600;
        const height = canvas.clientHeight || 600;
        const radius = Math.min(width, height) / 2 - 60;

        if (!svg) initSvg();
        svg.attr('viewBox', [-width / 2, -height / 2, width, height]);
        gZoom.selectAll('*').remove();
        renderWifeLegend();

        const root = d3.hierarchy(buildDisplayTree()).sort((a, b) => (wifeIndexOf(a.data) || 0) - (wifeIndexOf(b.data) || 0));
        const treeLayout = d3.tree()
            .size([2 * Math.PI, radius])
            .separation((a, b) => {
                // Children of an expanded wife-cluster get generous, flat spacing --
                // depth-based shrinking made sense when everyone shared the circle at
                // once, but now they're the only populated wedge, with plenty of room
                // freed up by the still-collapsed clusters around them.
                if (a.parent === b.parent) return (a.parent && a.parent.data.isCluster) ? 2.2 : 1;
                return 2 / (a.depth || 1);
            });
        treeLayout(root);

        const pathIds = new Set(ancestryPath(selectedId).map(n => n.id));

        const linkGen = d3.linkRadial().angle(d => d.x).radius(d => d.y);

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
            .attr('transform', d => `rotate(${(d.x * 180 / Math.PI) - 90}) translate(${d.y},0)`)
            .style('cursor', 'pointer')
            .on('click', (event, d) => {
                event.stopPropagation();
                if (d.data.isCluster) {
                    if (expandedClusters.has(d.data.id)) expandedClusters.delete(d.data.id);
                    else expandedClusters.add(d.data.id);
                    renderTree(false);
                } else {
                    selectPerson(d.data.id, false);
                }
            });

        const defs = gZoom.append('defs');
        node.filter(d => !!d.data.photo).each(function (d) {
            const r = d.data.id === tree.id ? 8 : 5;
            defs.append('clipPath')
                .attr('id', `clip-${d.data.id}`)
                .append('circle')
                .attr('r', r);
        });

        node.filter(d => !!d.data.photo)
            .append('image')
            .attr('href', d => d.data.photo)
            .attr('x', d => -(d.data.id === tree.id ? 8 : 5))
            .attr('y', d => -(d.data.id === tree.id ? 8 : 5))
            .attr('width', d => (d.data.id === tree.id ? 16 : 10))
            .attr('height', d => (d.data.id === tree.id ? 16 : 10))
            .attr('preserveAspectRatio', 'xMidYMid slice')
            .attr('clip-path', d => `url(#clip-${d.data.id})`);

        node.append('circle')
            .attr('r', d => d.data.isCluster ? 9 : (d.data.id === tree.id ? 8 : 5))
            .style('fill', d => d.data.isCluster ? colorForRenderNode(d) : null)
            .style('stroke', d => d.data.id === selectedId ? null : colorForRenderNode(d));

        node.append('text')
            .attr('dy', '0.31em')
            .attr('x', d => (d.x < Math.PI === !d.children) ? 8 : -8)
            .attr('text-anchor', d => (d.x < Math.PI === !d.children) ? 'start' : 'end')
            .attr('transform', d => (d.x >= Math.PI) ? 'rotate(180)' : null)
            .style('fill', d => d.data.id === selectedId ? null : (d.data.isCluster ? null : colorForRenderNode(d)))
            .style('font-weight', d => d.data.isCluster ? '700' : null)
            .text(d => d.data.isCluster
                ? `${shortDisplayName(d.data.name)} (${d.data.realChildren.length})${d.children ? '' : ' ›'}`
                : shortDisplayName(d.data.name));

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
        if (svg && zoomBehavior) svg.transition().duration(300).call(zoomBehavior.transform, d3.zoomIdentity);
    });

    window.addEventListener('resize', () => renderTree(false));

    /* ---------------------------------------------------------------- */
    /* Editor: add / edit / delete                                       */
    /* ---------------------------------------------------------------- */

    const modal = document.getElementById('edit-modal');
    const editForm = document.getElementById('edit-form');
    const fieldName = document.getElementById('field-name');
    const fieldNameFa = document.getElementById('field-name-fa');
    const fieldBorn = document.getElementById('field-born');
    const fieldDied = document.getElementById('field-died');
    const fieldChildNumber = document.getElementById('field-child-number');
    const fieldMother = document.getElementById('field-mother');
    const fieldIsSpouse = document.getElementById('field-is-spouse');
    const fieldResidence = document.getElementById('field-residence');
    const fieldWikipedia = document.getElementById('field-wikipedia');
    const fieldWebsite = document.getElementById('field-website');
    const fieldInstagram = document.getElementById('field-instagram');
    const fieldLinkedin = document.getElementById('field-linkedin');
    const fieldNote = document.getElementById('field-note');
    const fieldPhoto = document.getElementById('field-photo');
    const fieldPhotoPreview = document.getElementById('field-photo-preview');
    const editModalTitle = document.getElementById('edit-modal-title');

    let editMode = null; // 'add' | 'edit'
    let pendingPhoto; // undefined = unchanged, null = cleared, string = new data URL

    function openModal(mode) {
        editMode = mode;
        pendingPhoto = undefined;
        editModalTitle.textContent = mode === 'add' ? 'Add child' : 'Edit person';
        const current = mode === 'edit' ? byId.get(selectedId) : null;
        fieldName.value = current ? current.name : '';
        fieldNameFa.value = current ? (current.nameFa || '') : '';
        fieldBorn.value = current && current.born != null ? current.born : '';
        fieldDied.value = current && current.died != null ? current.died : '';
        fieldChildNumber.value = current ? (current.childNumber || '') : '';
        fieldMother.value = current ? (current.mother || '') : '';
        fieldIsSpouse.checked = current ? current.role === 'spouse' : false;
        fieldResidence.value = current ? (current.residence || '') : '';
        const social = (current && current.social) || {};
        fieldWikipedia.value = social.wikipedia || '';
        fieldWebsite.value = social.website || '';
        fieldInstagram.value = social.instagram || '';
        fieldLinkedin.value = social.linkedin || '';
        fieldNote.value = current ? (current.note || '') : '';
        fieldPhoto.value = '';
        renderAvatar(fieldPhotoPreview, current || { name: fieldName.value || '?' });
        modal.hidden = false;
        fieldName.focus();
    }

    function closeModal() { modal.hidden = true; editMode = null; }

    fieldPhoto.addEventListener('change', () => {
        const file = fieldPhoto.files[0];
        if (!file) { pendingPhoto = null; return; }
        const reader = new FileReader();
        reader.onload = () => {
            pendingPhoto = reader.result;
            renderAvatar(fieldPhotoPreview, { photo: pendingPhoto, name: fieldName.value });
        };
        reader.readAsDataURL(file);
    });

    document.getElementById('btn-add-child').addEventListener('click', () => openModal('add'));
    document.getElementById('btn-add-root-child').addEventListener('click', () => openModal('add'));
    document.getElementById('btn-edit').addEventListener('click', () => openModal('edit'));
    document.getElementById('btn-cancel-edit').addEventListener('click', closeModal);
    modal.addEventListener('click', (e) => { if (e.target === modal) closeModal(); });

    editForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const values = {
            name: fieldName.value.trim(),
            nameFa: fieldNameFa.value.trim(),
            born: fieldBorn.value === '' ? null : Number(fieldBorn.value),
            died: fieldDied.value === '' ? null : Number(fieldDied.value),
            childNumber: fieldChildNumber.value.trim(),
            mother: fieldMother.value.trim(),
            role: fieldIsSpouse.checked ? 'spouse' : 'descendant',
            residence: fieldResidence.value.trim(),
            social: {
                wikipedia: fieldWikipedia.value.trim(),
                website: fieldWebsite.value.trim(),
                instagram: fieldInstagram.value.trim(),
                linkedin: fieldLinkedin.value.trim()
            },
            note: fieldNote.value.trim()
        };
        if (!values.name) return;
        if (pendingPhoto !== undefined) values.photo = pendingPhoto;

        if (editMode === 'add') {
            const parent = byId.get(selectedId);
            const newNode = { id: slugify(values.name), children: [], photo: null, ...values };
            (parent.children ||= []).push(newNode);
            rebuildIndex();
            saveTree();
            selectPerson(newNode.id, true);
        } else if (editMode === 'edit') {
            const node = byId.get(selectedId);
            Object.assign(node, values);
            saveTree();
            selectPerson(selectedId, false);
        }
        closeModal();
    });

    document.getElementById('btn-delete').addEventListener('click', () => {
        if (selectedId === tree.id) { alert("The root person (Farmanfarma) can't be deleted."); return; }
        const node = byId.get(selectedId);
        const count = countDescendants(node);
        const msg = count > 0
            ? `Delete "${node.name}" and their ${count} descendant${count > 1 ? 's' : ''}?`
            : `Delete "${node.name}"?`;
        if (!confirm(msg)) return;

        const parent = parentOf.get(selectedId);
        parent.children = parent.children.filter(c => c.id !== selectedId);
        rebuildIndex();
        saveTree();
        detailPanel.hidden = true;
        selectPerson(parent.id, true);
    });

    function countDescendants(node) {
        return (node.children || []).reduce((acc, c) => acc + 1 + countDescendants(c), 0);
    }

    /* ---------------------------------------------------------------- */
    /* Export / import / reset                                           */
    /* ---------------------------------------------------------------- */

    document.getElementById('btn-export').addEventListener('click', () => {
        const blob = new Blob([JSON.stringify(tree, null, 2)], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'family-tree.json';
        a.click();
        URL.revokeObjectURL(url);
    });

    const importFileInput = document.getElementById('import-file');
    document.getElementById('btn-import').addEventListener('click', () => importFileInput.click());
    importFileInput.addEventListener('change', () => {
        const file = importFileInput.files[0];
        if (!file) return;
        const reader = new FileReader();
        reader.onload = () => {
            try {
                const data = JSON.parse(reader.result);
                if (!data.id || !data.name) throw new Error('Missing id/name at root');
                tree = data;
                rebuildIndex();
                saveTree();
                selectPerson(tree.id, true);
            } catch (err) {
                alert('That file does not look like a valid family tree JSON export.\n\n' + err.message);
            }
        };
        reader.readAsText(file);
        importFileInput.value = '';
    });

    document.getElementById('btn-reset-data').addEventListener('click', () => {
        if (!confirm('This clears your locally saved edits and reloads the original seed data. Export a backup first if you want to keep your changes. Continue?')) return;
        localStorage.removeItem(STORAGE_KEY);
        tree = structuredCloneCompat(window.SEED_FAMILY_TREE);
        rebuildIndex();
        selectedId = tree.id;
        detailPanel.hidden = true;
        selectPerson(tree.id, true);
    });

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

            if (node.social && node.social.wikipedia) {
                const a = document.createElement('a');
                a.className = 'qajar-node-wiki';
                a.href = node.social.wikipedia;
                a.target = '_blank';
                a.rel = 'noopener noreferrer';
                a.textContent = 'Wikipedia';
                a.addEventListener('click', (e) => e.stopPropagation());
                div.appendChild(a);
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
    const profileParent = document.getElementById('profile-parent');
    const profileChildren = document.getElementById('profile-children');

    function socialHref(type, value) {
        if (!value) return null;
        if (/^https?:\/\//i.test(value)) return value;
        if (type === 'instagram') return `https://instagram.com/${value.replace(/^@/, '')}`;
        if (type === 'linkedin') return `https://www.linkedin.com/in/${value.replace(/^@/, '')}`;
        return `https://${value}`;
    }

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
        // Rule: if a Wikipedia link is on file, lead with that alone; otherwise show whatever other links exist.
        const linkTypes = social.wikipedia
            ? [['wikipedia', 'Wikipedia']]
            : [['website', 'Website'], ['instagram', 'Instagram'], ['linkedin', 'LinkedIn']];
        linkTypes.forEach(([key, label]) => {
            const href = socialHref(key, social[key]);
            if (!href) return;
            const a = document.createElement('a');
            a.href = href;
            a.target = '_blank';
            a.rel = 'noopener noreferrer';
            a.textContent = label;
            profileSocial.appendChild(a);
        });

        const parent = parentOf.get(id);
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

        profileChildren.innerHTML = '';
        const children = node.children || [];
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
        selectPerson(selectedId, true);
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
    selectPerson(tree.id, true);
    checkRoute();
})();
