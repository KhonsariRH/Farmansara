/**
 * Seed data for the Farmanfarma Family Tree app.
 *
 * SEED_FAMILY_TREE is the actual family tree, rooted at Prince Abdol
 * Hossein Mirza Farmanfarma. The handwriting on the original chart's fan
 * of ~36 descendants couldn't be read reliably from the photo, so instead
 * this seeds the handful of children (and a few grandchildren) who have
 * independently verifiable English Wikipedia articles, each noted with
 * "Source: Wikipedia". None of these have been matched back to a specific
 * name/line on the original chart yet — that cross-check, and the many
 * children without their own articles, still need to come from the
 * original document or family records. Use the "Add child" editor in the
 * app to keep building it out.
 *
 * SEED_QAJAR_REFERENCE is the separate reference chart shown on the left
 * of the original document (labelled "Etalon - Base"), transcribed from
 * the clearly legible portion of the photo. The four children under
 * "Salar Dowleh" were illegible in the photo and are left as placeholders
 * for you to fill in. Per Wikipedia, Farmanfarma's actual father was
 * Firuz Mirza Nosrat-ed-Dowleh I, the 16th son of Abbas Mirza — a
 * different line than Salar Dowleh — so this reference chart is still
 * kept separate from the main tree rather than merged in as ancestors.
 */

window.SEED_FAMILY_TREE = {
    id: 'farmanfarma',
    name: 'Prince Abdol Hossein Mirza Farmanfarma',
    nameFa: 'شاهزاده عبدالحسین میرزا فرمانفرما',
    born: 1857,
    died: 1939,
    photo: null,
    note: 'Qajar prince; governor of several Persian provinces; briefly Prime Minister of Persia in 1915. Son of Prince Firuz Mirza Nosrat-ed-Dowleh I (1817-1886, 16th son of Abbas Mirza) and Hajieh Homa Khanoum. Fathered at least 36 children (sources vary, up to 39) by 8 wives — only the handful below have independently verifiable Wikipedia articles; the rest still need to come from the original chart or family records, since the photo\'s handwriting could not be read reliably. Root of this family tree. Source: Wikipedia.',
    children: [
        {
            id: 'abbas-mirza-farman-farmaian',
            name: 'Abbas Mirza Farman Farmaian',
            nameFa: '',
            born: 1890,
            died: 1935,
            childNumber: '2nd son',
            mother: 'Princess Ezzat-ed-Dowleh Qajar',
            photo: null,
            note: 'Source: Wikipedia — not yet matched to a name on the original chart.',
            children: []
        },
        {
            id: 'mohammad-vali-mirza-farman-farmaian',
            name: 'Mohammad Vali Mirza Farman Farmaian',
            nameFa: '',
            born: 1890,
            died: 1988,
            childNumber: '3rd son',
            mother: 'Princess Ezzat-ed-Dowleh Qajar',
            photo: null,
            note: 'Represented Tabriz in the Majles from age 26; brought in American advisors (incl. Colonel Norman Schwarzkopf and Dr Arthur Millspaugh) to reform Iran\'s military, gendarmerie and finances. Source: Wikipedia.',
            children: []
        },
        {
            id: 'maryam-farman-farmaian',
            name: 'Maryam Farman Farmaian (Maryam Firouz)',
            nameFa: '',
            born: 1913,
            died: 2008,
            childNumber: 'daughter',
            mother: 'Batoul Khanoum',
            photo: null,
            note: 'Linguist (Kurdish, Persian, Arabic, French, Russian, German, English); founded the women\'s section of Iran\'s Tudeh party, using her grandfather Firouz\'s name politically. Source: Wikipedia.',
            children: []
        },
        {
            id: 'homa-farman-farmaian',
            name: 'Homa Farman-Farmaian',
            nameFa: '',
            born: 1914,
            died: null,
            childNumber: 'daughter',
            mother: '',
            photo: null,
            note: 'Married Ali Ettehadieh (1901 Tabriz - 2000 Paris); their children include Mansoureh Ettehadieh (b. 1933). Source: Wikipedia.',
            children: []
        },
        {
            id: 'abdol-aziz-mirza-farmanfarmaian',
            name: 'Abdol-Aziz Mirza Farmanfarmaian',
            nameFa: '',
            born: 1920,
            died: 2013,
            childNumber: 'son',
            mother: 'Batoul Khanoum (probable — per sourcing on his brother Abdol-Ali, not certain)',
            photo: null,
            note: 'Architect. Source: Wikipedia.',
            children: []
        },
        {
            id: 'sattareh-farmanfarmaian',
            name: 'Sattareh Farmanfarmaian',
            nameFa: '',
            born: 1921,
            died: 2012,
            childNumber: '15th of 36 children (3rd of 9 by her mother)',
            mother: 'Massoumeh Khanum Tafreshi',
            photo: null,
            note: 'First Iranian student at USC; pioneer of social work in Iran, founded the Tehran School of Social Work, became known as the "mother of social work" in Iran. Source: Wikipedia.',
            children: []
        },
        {
            id: 'khodadad-mirza-farman-farmaian',
            name: 'Khodadad Mirza Farman Farmaian',
            nameFa: '',
            born: 1928,
            died: 2015,
            childNumber: 'son',
            mother: 'Hamdam Khanoum',
            photo: null,
            note: 'Governor of the Central Bank of Iran from 1968 (age 40); chief architect of Iran\'s 1960s economic boom. Fled to London in the 1979 revolution. Source: Wikipedia.',
            children: []
        },
        {
            id: 'allah-verdi-mirza-farman-farmaian',
            name: 'Allah Verdi Mirza Farman Farmaian',
            nameFa: '',
            born: 1929,
            died: 2016,
            childNumber: 'son',
            mother: 'Hamdam Khanoum',
            photo: null,
            note: 'Biologist (Reed College BA 1952; Stanford MS/PhD); founded the physiology department at Shiraz University (1961-67), later professor at Rutgers and visiting professor at Princeton. Source: Wikipedia.',
            children: []
        },
        {
            id: 'abdol-ali-mirza-farman-farmaian',
            name: 'Abdol-Ali Mirza Farman Farmaian',
            nameFa: '',
            born: 1935,
            died: 1973,
            childNumber: 'youngest son',
            mother: 'Batoul Khanoum',
            photo: null,
            note: 'Oxford-educated businessman; co-founded the Naft-e Pars petrochemical company and the Chamber of Industries. Died in a skiing avalanche at Dizin. Source: Wikipedia.',
            children: [
                { id: 'mariam-abdol-ali', name: 'Mariam Farman Farmaian', nameFa: '', born: null, died: null, childNumber: 'daughter', mother: '', photo: null, note: 'Daughter of Abdol-Ali Mirza. Source: Wikipedia.', children: [] },
                { id: 'salman-abdol-ali', name: 'Salman Farman Farmaian', nameFa: '', born: null, died: null, childNumber: 'son', mother: '', photo: null, note: 'Son of Abdol-Ali Mirza. Source: Wikipedia.', children: [] },
                { id: 'abu-ali-abdol-ali', name: 'Abu-Ali Farman Farmaian', nameFa: '', born: null, died: null, childNumber: 'son', mother: '', photo: null, note: 'Son of Abdol-Ali Mirza. Source: Wikipedia.', children: [] }
            ]
        }
    ]
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
