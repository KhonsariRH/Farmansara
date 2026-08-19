/**
 * Seed data for the Farmanfarma Family Tree app.
 *
 * SEED_FAMILY_TREE is the actual family tree, rooted at Prince Abdol
 * Hossein Mirza Farmanfarma. It starts with just the root node — use the
 * "Add child" editor in the app to build it out from your original chart.
 *
 * SEED_QAJAR_REFERENCE is the separate reference chart shown on the left
 * of the original document (labelled "Etalon - Base"), transcribed from
 * the clearly legible portion of the photo. The four children under
 * "Salar Dowleh" were illegible in the photo and are left as placeholders
 * for you to fill in.
 */

window.SEED_FAMILY_TREE = {
    id: 'farmanfarma',
    name: 'Prince Abdol Hossein Mirza Farmanfarma',
    nameFa: 'شاهزاده عبدالحسین میرزا فرمانفرما',
    born: 1857,
    died: 1939,
    note: 'Qajar prince; governor of several Persian provinces; briefly Prime Minister of Persia in 1915. Root of this family tree.',
    children: []
};

window.SEED_QAJAR_REFERENCE = {
    id: 'q-agha-mohammad-khan',
    name: 'Agha Mohammad Khan',
    nameFa: 'آقا محمد خان',
    born: 1742,
    died: 1797,
    note: 'Founder of the Qajar dynasty.',
    children: [
        {
            id: 'q-fath-ali-shah',
            name: 'Fath-Ali Shah',
            nameFa: 'فتح‌علی شاه',
            born: 1772,
            died: 1834,
            note: '2nd Qajar Shah.',
            children: [
                {
                    id: 'q-abbas-mirza',
                    name: 'Abbas Mirza',
                    nameFa: 'عباس میرزا',
                    born: 1789,
                    died: 1833,
                    note: 'Crown Prince; died before he could reign.',
                    children: [
                        {
                            id: 'q-salar-dowleh',
                            name: 'Prince Mirza Hassan Gholi Mirza (Salar Dowleh)',
                            nameFa: 'میرزا حسنقلی میرزا (سالار دوله)',
                            born: null,
                            died: null,
                            note: 'Names of his four children were illegible in the source photo — edit these placeholders once confirmed.',
                            children: [
                                { id: 'q-salar-dowleh-child-1', name: '(unread — edit me)', nameFa: '', born: null, died: null, note: '', children: [] },
                                { id: 'q-salar-dowleh-child-2', name: '(unread — edit me)', nameFa: '', born: null, died: null, note: '', children: [] },
                                { id: 'q-salar-dowleh-child-3', name: '(unread — edit me)', nameFa: '', born: null, died: null, note: '', children: [] },
                                { id: 'q-salar-dowleh-child-4', name: '(unread — edit me)', nameFa: '', born: null, died: null, note: '', children: [] }
                            ]
                        },
                        {
                            id: 'q-mohammad-shah',
                            name: 'Mohammad Shah',
                            nameFa: 'محمد شاه',
                            born: 1808,
                            died: 1848,
                            note: '3rd Qajar Shah.',
                            children: [
                                {
                                    id: 'q-naser-al-din-shah',
                                    name: 'Naser al-Din Shah',
                                    nameFa: 'ناصرالدین شاه',
                                    born: 1831,
                                    died: 1896,
                                    note: '4th Qajar Shah.',
                                    children: [
                                        {
                                            id: 'q-mozaffar-al-din-shah',
                                            name: 'Mozaffar ad-Din Shah',
                                            nameFa: 'مظفرالدین شاه',
                                            born: 1853,
                                            died: 1907,
                                            note: '5th Qajar Shah.',
                                            children: [
                                                {
                                                    id: 'q-mohammad-ali-shah',
                                                    name: 'Mohammad Ali Shah',
                                                    nameFa: 'محمدعلی شاه',
                                                    born: 1872,
                                                    died: 1925,
                                                    note: '6th Qajar Shah.',
                                                    children: [
                                                        {
                                                            id: 'q-ahmad-shah',
                                                            name: 'Ahmad Shah',
                                                            nameFa: 'احمد شاه',
                                                            born: 1898,
                                                            died: 1930,
                                                            note: '7th and last Qajar Shah.',
                                                            children: []
                                                        }
                                                    ]
                                                }
                                            ]
                                        }
                                    ]
                                }
                            ]
                        }
                    ]
                }
            ]
        }
    ]
};
