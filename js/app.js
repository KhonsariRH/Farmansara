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

        generationLine.textContent = gen === 0
            ? `${person.name} is the root of the tree.`
            : `${person.name} is generation ${gen} — a ${ordinalDescendant(gen)} of Prince Abdol Hossein Mirza Farmanfarma.`;

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
        detailChildNumber.textContent = node.childNumber ? `Birth order: ${node.childNumber}` : '';
        detailChildNumber.hidden = !node.childNumber;
        detailMother.innerHTML = node.mother ? `<strong>Mother:</strong> ${escapeHtml(node.mother)}` : '';
        detailMother.hidden = !node.mother;
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

    /* ---------------------------------------------------------------- */
    /* Selection                                                          */
    /* ---------------------------------------------------------------- */

    function selectPerson(id, focusTree) {
        if (!byId.has(id)) return;
        selectedId = id;
        pendingFocusScale = null;
        renderPosition(id);
        renderDetail(id);
        renderTree(focusTree);
    }

    function focusSubtree(id) {
        if (!byId.has(id)) return;
        const count = countDescendants(byId.get(id));
        pendingFocusScale = Math.max(1, Math.min(2.5, 3 / Math.sqrt(count + 1)));
        selectedId = id;
        renderPosition(id);
        renderDetail(id);
        renderTree(true);
    }

    /* ---------------------------------------------------------------- */
    /* D3 radial tree                                                    */
    /* ---------------------------------------------------------------- */

    const canvas = document.getElementById('tree-canvas');
    let svg, gZoom, zoomBehavior;

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

        const root = d3.hierarchy(tree);
        const treeLayout = d3.tree()
            .size([2 * Math.PI, radius])
            .separation((a, b) => (a.parent === b.parent ? 1 : 2) / a.depth || 1);
        treeLayout(root);

        const pathIds = new Set(ancestryPath(selectedId).map(n => n.id));

        const linkGen = d3.linkRadial().angle(d => d.x).radius(d => d.y);

        gZoom.append('g')
            .attr('fill', 'none')
            .selectAll('path')
            .data(root.links())
            .join('path')
            .attr('class', d => 'link' + (pathIds.has(d.source.data.id) && pathIds.has(d.target.data.id) ? ' highlighted' : ''))
            .attr('d', linkGen);

        const node = gZoom.append('g')
            .selectAll('g')
            .data(root.descendants())
            .join('g')
            .attr('class', d => 'node' + (d.data.id === selectedId ? ' selected' : '') + (pathIds.has(d.data.id) ? ' highlighted' : '') + (d.data.photo ? ' has-photo' : ''))
            .attr('transform', d => `rotate(${(d.x * 180 / Math.PI) - 90}) translate(${d.y},0)`)
            .style('cursor', 'pointer')
            .on('click', (event, d) => { event.stopPropagation(); selectPerson(d.data.id, false); });

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

        node.append('circle').attr('r', d => d.data.id === tree.id ? 8 : 5);

        node.append('text')
            .attr('dy', '0.31em')
            .attr('x', d => (d.x < Math.PI === !d.children) ? 8 : -8)
            .attr('text-anchor', d => (d.x < Math.PI === !d.children) ? 'start' : 'end')
            .attr('transform', d => (d.x >= Math.PI) ? 'rotate(180)' : null)
            .text(d => d.data.name);

        if (focusSelected) {
            const target = root.descendants().find(d => d.data.id === selectedId);
            if (target) {
                const scale = pendingFocusScale || 1;
                const angle = target.x - Math.PI / 2;
                const tx = -Math.cos(angle) * target.y * scale;
                const ty = -Math.sin(angle) * target.y * scale;
                svg.transition().duration(500).call(
                    zoomBehavior.transform,
                    d3.zoomIdentity.translate(tx, ty).scale(scale)
                );
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
    /* Qajar reference chart (static, read-only tree render)             */
    /* ---------------------------------------------------------------- */

    function renderReferenceTree() {
        const container = document.getElementById('reference-tree');
        container.innerHTML = '';
        container.appendChild(buildRefList(window.SEED_QAJAR_REFERENCE));
    }

    function buildRefList(node) {
        const ul = document.createElement('ul');
        const li = document.createElement('li');
        const dates = [node.born, node.died].filter(d => d !== null && d !== undefined) ;
        li.innerHTML = `<span class="ref-node">
            <span class="ref-name">${escapeHtml(node.name)}</span>
            ${node.nameFa ? `<span class="ref-name-fa">${escapeHtml(node.nameFa)}</span>` : ''}
            ${dates.length ? `<span class="ref-dates">(${node.born ?? '?'}–${node.died ?? '?'})</span>` : ''}
        </span>`;
        if (node.note) {
            const note = document.createElement('div');
            note.className = 'ref-dates';
            note.style.marginTop = '0.15rem';
            note.textContent = node.note;
            li.appendChild(note);
        }
        (node.children || []).forEach(child => li.appendChild(buildRefList(child)));
        ul.appendChild(li);
        return ul;
    }

    /* ---------------------------------------------------------------- */
    /* Init                                                               */
    /* ---------------------------------------------------------------- */

    renderReferenceTree();
    selectPerson(tree.id, true);
})();
