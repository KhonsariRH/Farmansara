/**
 * Seed data for the Farmanfarma Family Tree app.
 *
 * SEED_FAMILY_TREE is the actual family tree, rooted at Prince Abdol
 * Hossein Mirza Farmanfarma. It combines two kinds of sources:
 *  - People with independently verifiable English Wikipedia articles,
 *    each noted "Source: Wikipedia" (richer bios, photos where available).
 *  - The rest of Farmanfarma's children, from a family genealogy record
 *    (via Encyclopaedia Iranica) giving name/birth year/mother per wife.
 *    That record's marriage/spouse claims for this generation were
 *    flagged as unreliable and were deliberately NOT imported -- only
 *    name, birth year, and mother came from it.
 * The big radial fan of ~36 names on the original hand-drawn chart is
 * still too small to read reliably and hasn't been cross-checked against
 * this data yet. Use the "Add child" editor in the app to keep refining
 * it, e.g. once the original chart or the "Shahzdeh's Tree" family
 * genealogy book can be read directly.
 *
 * Each person can have: id, name, nameFa, born, died, photo (path or data
 * URL), residence, social ({wikipedia, website, instagram, linkedin} --
 * show wikipedia first when present, other links otherwise), childNumber,
 * mother, role ('descendant' or 'spouse' -- spouses married into the
 * family and are attached under their partner rather than being blood
 * descendants), note (used as the bio on their profile page), children.
 *
 * SEED_QAJAR_REFERENCE is the separate reference chart shown on the left
 * of the original document (labelled "Etalon - Base"), transcribed from
 * the legible portion of the photo. It renders as its own top-down
 * box-and-line chart (see renderQajarChart in app.js). Its
 * "Firuz Mirza Nosrat-ed-Dowleh I" branch includes Abdol Hossein Mirza
 * Farmanfarma among its children -- confirmed directly by the original
 * chart -- with a linkToMainTree id so clicking it jumps to the root of
 * the interactive tree above. The other four children on that branch are
 * best-effort readings of hard-to-read handwriting; please confirm.
 */

window.SEED_FAMILY_TREE = {
    "id": "farmanfarma",
    "name": "Prince Abdol Hossein Mirza Farmanfarma",
    "nameFa": "شاهزاده عبدالحسین میرزا فرمانفرما",
    "born": 1857,
    "died": 1939,
    "photo": "images/people/farmanfarma-root.jpg",
    "residence": "Tehran, Persia",
    "social": {},
    "note": "Qajar prince; governor of several Persian provinces; briefly Prime Minister of Persia in 1915. Son of Prince Firuz Mirza Nosrat-ed-Dowleh I (1817-1886, 16th son of Abbas Mirza) and Hajieh Homa Khanoum. Fathered at least 36 children (sources vary, up to 39) by 8 wives — only some children below have independently verifiable Wikipedia articles or a family genealogy record; the rest of the original chart's ~36-name fan is still too small to read reliably. His parentage under Firuz Mirza Nosrat-ed-Dowleh I is now confirmed directly by the original chart's reference branch (see the Qajar dynasty chart below). Root of this family tree. Source: Wikipedia + original document.",
    "children": [
        {
            "id": "abbas-mirza-farman-farmaian",
            "name": "Abbas Mirza Farman Farmaian",
            "nameFa": "",
            "born": 1890,
            "died": 1935,
            "childNumber": "2nd son",
            "mother": "Princess Ezzat-ed-Dowleh Qajar",
            "photo": null,
            "residence": "",
            "social": {
                "wikipedia": "https://en.wikipedia.org/wiki/Abbas_Mirza_Farman_Farmaian"
            },
            "note": "Source: Wikipedia — not yet matched to a name on the original chart.",
            "children": [],
            "role": "descendant"
        },
        {
            "id": "mohammad-vali-mirza-farman-farmaian",
            "name": "Mohammad Vali Mirza Farman Farmaian",
            "nameFa": "",
            "born": 1890,
            "died": 1988,
            "childNumber": "3rd son",
            "mother": "Princess Ezzat-ed-Dowleh Qajar",
            "photo": null,
            "note": "Represented Tabriz in the Majles from age 26; brought in American advisors (incl. Colonel Norman Schwarzkopf and Dr Arthur Millspaugh) to reform Iran's military, gendarmerie and finances. Source: Wikipedia.",
            "children": [],
            "residence": "Tabriz, Iran",
            "social": {
                "wikipedia": "https://en.wikipedia.org/wiki/Mohammad_Vali_Mirza_Farman_Farmaian"
            },
            "role": "descendant"
        },
        {
            "id": "maryam-farman-farmaian",
            "name": "Maryam Farman Farmaian (Maryam Firouz)",
            "nameFa": "",
            "born": 1913,
            "died": 2008,
            "childNumber": "daughter",
            "mother": "Batoul Khanum Ahshami",
            "photo": null,
            "note": "Linguist (Kurdish, Persian, Arabic, French, Russian, German, English); founded the women's section of Iran's Tudeh party, using her grandfather Firouz's name politically. Source: Wikipedia.",
            "children": [],
            "residence": "Tehran, Iran",
            "social": {},
            "role": "descendant"
        },
        {
            "id": "homa-farman-farmaian",
            "name": "Homa Farman-Farmaian",
            "nameFa": "",
            "born": 1914,
            "died": null,
            "childNumber": "daughter",
            "mother": "",
            "photo": null,
            "note": "Married Ali Ettehadieh (1901 Tabriz - 2000 Paris); their children include Mansoureh Ettehadieh (b. 1933). Source: Wikipedia.",
            "children": [
                {
                    "id": "mansoureh-ettehadieh",
                    "name": "Mansoureh Ettehadieh",
                    "nameFa": "",
                    "born": 1933,
                    "died": null,
                    "childNumber": "daughter",
                    "mother": "",
                    "photo": null,
                    "residence": "",
                    "social": {},
                    "role": "descendant",
                    "note": "Daughter of Homa Farman-Farmaian and Ali Ettehadieh. Source: Wikipedia (via Homa's page).",
                    "children": []
                }
            ],
            "residence": "",
            "social": {},
            "role": "descendant"
        },
        {
            "id": "abdol-aziz-mirza-farmanfarmaian",
            "name": "Abdol-Aziz Mirza Farmanfarmaian",
            "nameFa": "",
            "born": 1920,
            "died": 2013,
            "childNumber": "4th child of Batoul Khanum Ahshami",
            "mother": "Batoul Khanum Ahshami",
            "photo": "images/people/abdol-aziz-mirza-farmanfarmaian.jpg",
            "note": "Architect. Source: Wikipedia. Mother confirmed via a family genealogy record (Encyclopaedia Iranica).",
            "children": [],
            "residence": "Palma de Mallorca, Spain",
            "social": {
                "wikipedia": "https://en.wikipedia.org/wiki/Abdol-Aziz_Mirza_Farmanfarmaian"
            },
            "role": "descendant"
        },
        {
            "id": "sattareh-farmanfarmaian",
            "name": "Sattareh Farmanfarmaian",
            "nameFa": "",
            "born": 1921,
            "died": 2012,
            "childNumber": "15th of 36 children (3rd of 9 by her mother)",
            "mother": "Massoumeh Khanum Tafreshi",
            "photo": "images/people/sattareh-farmanfarmaian.jpg",
            "note": "First Iranian student at USC; pioneer of social work in Iran, founded the Tehran School of Social Work, became known as the \"mother of social work\" in Iran. Source: Wikipedia.",
            "children": [],
            "residence": "Los Angeles, USA",
            "social": {
                "wikipedia": "https://en.wikipedia.org/wiki/Sattareh_Farmanfarmaian"
            },
            "role": "descendant"
        },
        {
            "id": "khodadad-mirza-farman-farmaian",
            "name": "Khodadad Mirza Farman Farmaian",
            "nameFa": "",
            "born": 1928,
            "died": 2015,
            "childNumber": "son",
            "mother": "Hamdam Khanum Talai",
            "photo": null,
            "note": "Governor of the Central Bank of Iran from 1968 (age 40); chief architect of Iran's 1960s economic boom. Fled to London in the 1979 revolution. Source: Wikipedia.",
            "children": [],
            "residence": "London, UK",
            "social": {},
            "role": "descendant"
        },
        {
            "id": "allah-verdi-mirza-farman-farmaian",
            "name": "Allah Verdi Mirza Farman Farmaian",
            "nameFa": "",
            "born": 1929,
            "died": 2016,
            "childNumber": "son",
            "mother": "Hamdam Khanum Talai",
            "photo": "images/people/allah-verdi-mirza-farman-farmaian.jpg",
            "note": "Biologist (Reed College BA 1952; Stanford MS/PhD); founded the physiology department at Shiraz University (1961-67), later professor at Rutgers and visiting professor at Princeton. Source: Wikipedia.",
            "children": [],
            "residence": "Princeton, New Jersey, USA",
            "social": {},
            "role": "descendant"
        },
        {
            "id": "abdol-ali-mirza-farman-farmaian",
            "name": "Abdol-Ali Mirza Farman Farmaian",
            "nameFa": "",
            "born": 1935,
            "died": 1973,
            "childNumber": "youngest son",
            "mother": "Batoul Khanum Ahshami",
            "photo": null,
            "note": "Oxford-educated businessman; co-founded the Naft-e Pars petrochemical company and the Chamber of Industries. Died in a skiing avalanche at Dizin. Source: Wikipedia.",
            "children": [
                {
                    "id": "mariam-abdol-ali",
                    "name": "Mariam Farman Farmaian",
                    "nameFa": "",
                    "born": null,
                    "died": null,
                    "childNumber": "daughter",
                    "mother": "",
                    "photo": null,
                    "note": "Daughter of Abdol-Ali Mirza. Source: Wikipedia.",
                    "children": [],
                    "residence": "",
                    "social": {},
                    "role": "descendant"
                },
                {
                    "id": "salman-abdol-ali",
                    "name": "Salman Farman Farmaian",
                    "nameFa": "",
                    "born": null,
                    "died": null,
                    "childNumber": "son",
                    "mother": "",
                    "photo": null,
                    "note": "Son of Abdol-Ali Mirza. Source: Wikipedia.",
                    "children": [],
                    "residence": "",
                    "social": {},
                    "role": "descendant"
                },
                {
                    "id": "abu-ali-abdol-ali",
                    "name": "Abu-Ali Farman Farmaian",
                    "nameFa": "",
                    "born": null,
                    "died": null,
                    "childNumber": "son",
                    "mother": "",
                    "photo": null,
                    "note": "Son of Abdol-Ali Mirza. Source: Wikipedia.",
                    "children": [],
                    "residence": "",
                    "social": {},
                    "role": "descendant"
                }
            ],
            "residence": "",
            "social": {
                "wikipedia": "https://en.wikipedia.org/wiki/Abdol-Ali_Mirza_Farman_Farmaian"
            },
            "role": "descendant"
        },
        {
            "id": "manucher-mirza-farman-farmaian",
            "name": "Manucher Mirza Farman Farmaian",
            "nameFa": "",
            "born": 1916,
            "died": null,
            "childNumber": "3rd child of Batoul Khanum Ahshami",
            "mother": "Batoul Khanum Ahshami",
            "photo": null,
            "residence": "",
            "social": {},
            "role": "descendant",
            "note": "Qajar prince; author of \"Blood and Oil: A Memoir of a Persian Prince\" (with Roxane Farmanfarmaian). Source: Wikipedia (via his daughter Roxane's page) — no independent article found yet, dates unconfirmed. Per a family genealogy record (Encyclopaedia Iranica), born 1916, mother Batoul Khanum Ahshami.",
            "children": [
                {
                    "id": "roxane-farmanfarmaian",
                    "name": "Roxane Batoul Farmanfarmaian",
                    "nameFa": "",
                    "born": 1955,
                    "died": null,
                    "childNumber": "daughter",
                    "mother": "Verla Gean Miller",
                    "photo": "images/people/roxane-farmanfarmaian.jpg",
                    "residence": "Cambridge, UK",
                    "social": {
                        "website": "https://www.polis.cam.ac.uk/Staff_and_Students/dr-roxane-farmanfarmaian"
                    },
                    "role": "descendant",
                    "note": "Born in Salt Lake City, Utah; grew up in the Netherlands. Lecturer in International Politics at the University of Cambridge, Director of International Studies and Global Politics at Cambridge's Institute for Continuing Education; specialist in Middle East politics and security. Lived in Iran through the revolution and hostage crisis, working as a journalist. Author of \"Blood and Oil: A Prince's Memoir of Iran, From the Shah to the Ayatollah\" (2005). Source: Wikipedia.",
                    "children": []
                }
            ]
        },
        {
            "id": "abolbashar-mirza-farman-farmaian",
            "name": "Abolbashar Mirza Farman Farmaian",
            "nameFa": "",
            "born": 1922,
            "died": 1991,
            "childNumber": "5th child of Batoul Khanum Ahshami",
            "mother": "Batoul Khanum Ahshami",
            "photo": null,
            "residence": "",
            "social": {},
            "role": "descendant",
            "note": "International lawyer and investor. Source: Wikidata / Wikipedia (via his wife Monir's page) — birth year and other details unconfirmed. Per a family genealogy record (Encyclopaedia Iranica), born 1922, mother Batoul Khanum Ahshami.",
            "children": [
                {
                    "id": "monir-shahroudy-farmanfarmaian",
                    "name": "Monir Shahroudy Farmanfarmaian",
                    "nameFa": "",
                    "born": 1922,
                    "died": 2019,
                    "childNumber": "",
                    "mother": "",
                    "photo": "images/people/monir-shahroudy-farmanfarmaian.jpg",
                    "residence": "Tehran, Iran (also lived in New York, USA)",
                    "social": {
                        "wikipedia": "https://en.wikipedia.org/wiki/Monir_Shahroudy_Farmanfarmaian"
                    },
                    "role": "spouse",
                    "note": "Married into the family in 1957 (not a blood descendant of Farmanfarma) — married Abolbashar Mirza Farman Farmaian. One of Iran's most celebrated visual artists, known internationally for geometric mirror-mosaic sculptures blending Persian architectural motifs with postwar abstraction. Trained as a fashion illustrator at Parsons School of Design in New York. She and Abolbashar had one daughter, Zima. Source: Wikipedia.",
                    "children": []
                }
            ]
        },
        {
            "id": "firouz-nosrat-ed-dowleh-iii",
            "name": "Prince Firouz Nosrat-ed-Dowleh III",
            "nameFa": "",
            "born": 1889,
            "died": null,
            "childNumber": "1st child of Ezzat-ed-Dowleh Qajar",
            "mother": "Ezzat-ed-Dowleh Qajar",
            "photo": "images/people/firouz-nosrat-ed-dowleh-iii.jpg",
            "residence": "",
            "social": {
                "wikipedia": "https://en.wikipedia.org/wiki/Firouz_Nosrat-ed-Dowleh_III"
            },
            "role": "descendant",
            "note": "Farmanfarma's eldest son. Carried on the \"Nosrat-ed-Dowleh\" title from his grandfather Firuz Mirza Nosrat-ed-Dowleh I. Name, birth year and mother from a family genealogy record (via Encyclopaedia Iranica). That source's marriage/spouse claims for this generation were flagged as unreliable and have been omitted.",
            "children": []
        },
        {
            "id": "iradj-firouz-tentative",
            "name": "Prince Iradj Firouz (tentative identification)",
            "nameFa": "",
            "born": null,
            "died": null,
            "childNumber": "5th child of Ezzat-ed-Dowleh Qajar",
            "mother": "Ezzat-ed-Dowleh Qajar",
            "photo": "images/people/iradj-firouz-tentative.jpg",
            "residence": "",
            "social": {},
            "role": "descendant",
            "note": "UNCONFIRMED: photo captioned only \"son number 3\" -- tentatively matched to Prince Iradj Firouz as the 3rd son (counting sons only) listed under Ezzat-ed-Dowleh Qajar in a family genealogy record. Please confirm or correct via Edit. Name, birth year and mother from a family genealogy record (via Encyclopaedia Iranica). That source's marriage/spouse claims for this generation were flagged as unreliable and have been omitted.",
            "children": []
        },
        {
            "id": "mozaffar-firouz",
            "name": "Prince Mozaffar Firouz",
            "nameFa": "",
            "born": 1906,
            "died": null,
            "childNumber": "2nd child of Ezzat-ed-Dowleh Qajar",
            "mother": "Ezzat-ed-Dowleh Qajar",
            "photo": null,
            "residence": "",
            "social": {},
            "role": "descendant",
            "note": "Name, birth year and mother from a family genealogy record (via Encyclopaedia Iranica). That source's marriage/spouse claims for this generation were flagged as unreliable and have been omitted.",
            "children": []
        },
        {
            "id": "vida-firouz",
            "name": "Princess Vida Firouz",
            "nameFa": "",
            "born": null,
            "died": null,
            "childNumber": "3rd child of Ezzat-ed-Dowleh Qajar",
            "mother": "Ezzat-ed-Dowleh Qajar",
            "photo": null,
            "residence": "",
            "social": {},
            "role": "descendant",
            "note": "Name, birth year and mother from a family genealogy record (via Encyclopaedia Iranica). That source's marriage/spouse claims for this generation were flagged as unreliable and have been omitted.",
            "children": []
        },
        {
            "id": "lili-firouz",
            "name": "Princess Lili Firouz",
            "nameFa": "",
            "born": null,
            "died": null,
            "childNumber": "4th child of Ezzat-ed-Dowleh Qajar",
            "mother": "Ezzat-ed-Dowleh Qajar",
            "photo": null,
            "residence": "",
            "social": {},
            "role": "descendant",
            "note": "Name, birth year and mother from a family genealogy record (via Encyclopaedia Iranica). That source's marriage/spouse claims for this generation were flagged as unreliable and have been omitted.",
            "children": []
        },
        {
            "id": "sharoukh-firouz",
            "name": "Prince Sharoukh Firouz",
            "nameFa": "",
            "born": null,
            "died": null,
            "childNumber": "6th child of Ezzat-ed-Dowleh Qajar",
            "mother": "Ezzat-ed-Dowleh Qajar",
            "photo": null,
            "residence": "",
            "social": {},
            "role": "descendant",
            "note": "Name, birth year and mother from a family genealogy record (via Encyclopaedia Iranica). That source's marriage/spouse claims for this generation were flagged as unreliable and have been omitted.",
            "children": []
        },
        {
            "id": "mohammad-hossein-mirza-firouz",
            "name": "Prince Mohammad Hossein Mirza Firouz",
            "nameFa": "",
            "born": 1894,
            "died": null,
            "childNumber": "10th child of Ezzat-ed-Dowleh Qajar",
            "mother": "Ezzat-ed-Dowleh Qajar",
            "photo": null,
            "residence": "",
            "social": {
                "wikipedia": "https://en.wikipedia.org/wiki/Mohammad_Hossein_Mirza_Firouz"
            },
            "role": "descendant",
            "note": "Name, birth year and mother from a family genealogy record (via Encyclopaedia Iranica). That source's marriage/spouse claims for this generation were flagged as unreliable and have been omitted.",
            "children": []
        },
        {
            "id": "nezam-ed-din-farman-farmaian",
            "name": "Prince Nezam-ed-Din Farman Farmaian",
            "nameFa": "",
            "born": 1899,
            "died": null,
            "childNumber": "11th child of Ezzat-ed-Dowleh Qajar",
            "mother": "Ezzat-ed-Dowleh Qajar",
            "photo": null,
            "residence": "",
            "social": {},
            "role": "descendant",
            "note": "Name, birth year and mother from a family genealogy record (via Encyclopaedia Iranica). That source's marriage/spouse claims for this generation were flagged as unreliable and have been omitted.",
            "children": []
        },
        {
            "id": "mohammad-jaffar-farman-farmaian",
            "name": "Prince Mohammad Ja'ffar Farman Farmaian",
            "nameFa": "",
            "born": 1901,
            "died": null,
            "childNumber": "12th child of Ezzat-ed-Dowleh Qajar",
            "mother": "Ezzat-ed-Dowleh Qajar",
            "photo": null,
            "residence": "",
            "social": {},
            "role": "descendant",
            "note": "Name, birth year and mother from a family genealogy record (via Encyclopaedia Iranica). That source's marriage/spouse claims for this generation were flagged as unreliable and have been omitted.",
            "children": []
        },
        {
            "id": "bodagh-farman-farmaian",
            "name": "Princess Bodagh Farman Farmaian",
            "nameFa": "",
            "born": 1909,
            "died": null,
            "childNumber": "1st child of Mah Bagum Khanum",
            "mother": "Mah Bagum Khanum",
            "photo": null,
            "residence": "",
            "social": {},
            "role": "descendant",
            "note": "Name, birth year and mother from a family genealogy record (via Encyclopaedia Iranica). That source's marriage/spouse claims for this generation were flagged as unreliable and have been omitted.",
            "children": []
        },
        {
            "id": "sabar-farman-farmaian",
            "name": "Prince Sabar Farman Farmaian",
            "nameFa": "",
            "born": 1912,
            "died": null,
            "childNumber": "1st child of Massoumeh Khanum Tafreshi",
            "mother": "Massoumeh Khanum Tafreshi",
            "photo": null,
            "residence": "",
            "social": {},
            "role": "descendant",
            "note": "Name, birth year and mother from a family genealogy record (via Encyclopaedia Iranica). That source's marriage/spouse claims for this generation were flagged as unreliable and have been omitted.",
            "children": []
        },
        {
            "id": "jabbareh-farman-farmaian",
            "name": "Princess Jabbareh Farman Farmaian",
            "nameFa": "",
            "born": 1916,
            "died": null,
            "childNumber": "2nd child of Massoumeh Khanum Tafreshi",
            "mother": "Massoumeh Khanum Tafreshi",
            "photo": null,
            "residence": "",
            "social": {},
            "role": "descendant",
            "note": "Name, birth year and mother from a family genealogy record (via Encyclopaedia Iranica). That source's marriage/spouse claims for this generation were flagged as unreliable and have been omitted.",
            "children": []
        },
        {
            "id": "farough-farman-farmaian",
            "name": "Prince Farough Farman Farmaian",
            "nameFa": "",
            "born": 1925,
            "died": null,
            "childNumber": "4th child of Massoumeh Khanum Tafreshi",
            "mother": "Massoumeh Khanum Tafreshi",
            "photo": null,
            "residence": "",
            "social": {},
            "role": "descendant",
            "note": "Name, birth year and mother from a family genealogy record (via Encyclopaedia Iranica). That source's marriage/spouse claims for this generation were flagged as unreliable and have been omitted.",
            "children": []
        },
        {
            "id": "ayesheh-farman-farmaian",
            "name": "Princess Ayesheh (Homerah) Farman Farmaian",
            "nameFa": "",
            "born": 1928,
            "died": null,
            "childNumber": "5th child of Massoumeh Khanum Tafreshi",
            "mother": "Massoumeh Khanum Tafreshi",
            "photo": null,
            "residence": "",
            "social": {},
            "role": "descendant",
            "note": "Name, birth year and mother from a family genealogy record (via Encyclopaedia Iranica). That source's marriage/spouse claims for this generation were flagged as unreliable and have been omitted.",
            "children": []
        },
        {
            "id": "ghaffar-farman-farmaian",
            "name": "Prince Ghaffar Farman Farmaian",
            "nameFa": "",
            "born": 1930,
            "died": null,
            "childNumber": "6th child of Massoumeh Khanum Tafreshi",
            "mother": "Massoumeh Khanum Tafreshi",
            "photo": null,
            "residence": "",
            "social": {},
            "role": "descendant",
            "note": "Name, birth year and mother from a family genealogy record (via Encyclopaedia Iranica). That source's marriage/spouse claims for this generation were flagged as unreliable and have been omitted.",
            "children": []
        },
        {
            "id": "soraya-farman-farmaian",
            "name": "Princess Soraya Farman Farmaian",
            "nameFa": "",
            "born": 1931,
            "died": null,
            "childNumber": "7th child of Massoumeh Khanum Tafreshi",
            "mother": "Massoumeh Khanum Tafreshi",
            "photo": null,
            "residence": "",
            "social": {},
            "role": "descendant",
            "note": "Name, birth year and mother from a family genealogy record (via Encyclopaedia Iranica). That source's marriage/spouse claims for this generation were flagged as unreliable and have been omitted.",
            "children": []
        },
        {
            "id": "haroun-al-rashid-farman-farmaian",
            "name": "Prince Haroun-al-Rashid Farman Farmaian",
            "nameFa": "",
            "born": 1933,
            "died": null,
            "childNumber": "8th child of Massoumeh Khanum Tafreshi",
            "mother": "Massoumeh Khanum Tafreshi",
            "photo": null,
            "residence": "",
            "social": {},
            "role": "descendant",
            "note": "Name, birth year and mother from a family genealogy record (via Encyclopaedia Iranica). That source's marriage/spouse claims for this generation were flagged as unreliable and have been omitted.",
            "children": []
        },
        {
            "id": "khorshid-farman-farmaian",
            "name": "Princess Khorshid Farman Farmaian",
            "nameFa": "",
            "born": 1937,
            "died": null,
            "childNumber": "9th child of Massoumeh Khanum Tafreshi",
            "mother": "Massoumeh Khanum Tafreshi",
            "photo": null,
            "residence": "",
            "social": {},
            "role": "descendant",
            "note": "Name, birth year and mother from a family genealogy record (via Encyclopaedia Iranica). That source's marriage/spouse claims for this generation were flagged as unreliable and have been omitted.",
            "children": []
        },
        {
            "id": "mehrmah-farman-farmaian",
            "name": "Princess MehrMah Farman Farmaian",
            "nameFa": "",
            "born": 1915,
            "died": null,
            "childNumber": "2nd child of Batoul Khanum Ahshami",
            "mother": "Batoul Khanum Ahshami",
            "photo": null,
            "residence": "",
            "social": {},
            "role": "descendant",
            "note": "Name, birth year and mother from a family genealogy record (via Encyclopaedia Iranica). That source's marriage/spouse claims for this generation were flagged as unreliable and have been omitted.",
            "children": []
        },
        {
            "id": "leyla-farman-farmaian",
            "name": "Princess Leyla Farman Farmaian",
            "nameFa": "",
            "born": 1925,
            "died": null,
            "childNumber": "6th child of Batoul Khanum Ahshami",
            "mother": "Batoul Khanum Ahshami",
            "photo": null,
            "residence": "",
            "social": {},
            "role": "descendant",
            "note": "Name, birth year and mother from a family genealogy record (via Encyclopaedia Iranica). That source's marriage/spouse claims for this generation were flagged as unreliable and have been omitted.",
            "children": []
        },
        {
            "id": "haideh-farman-farmaian",
            "name": "Princess Haideh Farman Farmaian",
            "nameFa": "",
            "born": 1927,
            "died": null,
            "childNumber": "7th child of Batoul Khanum Ahshami",
            "mother": "Batoul Khanum Ahshami",
            "photo": null,
            "residence": "",
            "social": {},
            "role": "descendant",
            "note": "Name, birth year and mother from a family genealogy record (via Encyclopaedia Iranica). That source's marriage/spouse claims for this generation were flagged as unreliable and have been omitted.",
            "children": []
        },
        {
            "id": "cyrus-farman-farmaian",
            "name": "Prince Cyrus Farman Farmaian",
            "nameFa": "",
            "born": 1929,
            "died": null,
            "childNumber": "8th child of Batoul Khanum Ahshami",
            "mother": "Batoul Khanum Ahshami",
            "photo": null,
            "residence": "",
            "social": {},
            "role": "descendant",
            "note": "Name, birth year and mother from a family genealogy record (via Encyclopaedia Iranica). That source's marriage/spouse claims for this generation were flagged as unreliable and have been omitted.",
            "children": []
        },
        {
            "id": "mahsama-farman-farmaian",
            "name": "Princess Mahsama Farman Farmaian",
            "nameFa": "",
            "born": 1918,
            "died": null,
            "childNumber": "1st child of Fatemeh Khanum Alinaghi (Shirazi)",
            "mother": "Fatemeh Khanum Alinaghi (Shirazi)",
            "photo": null,
            "residence": "",
            "social": {},
            "role": "descendant",
            "note": "Name, birth year and mother from a family genealogy record (via Encyclopaedia Iranica). That source's marriage/spouse claims for this generation were flagged as unreliable and have been omitted.",
            "children": []
        },
        {
            "id": "jamshid-farman-farmaian",
            "name": "Prince Jamshid Farman Farmaian",
            "nameFa": "",
            "born": 1919,
            "died": null,
            "childNumber": "2nd child of Fatemeh Khanum Alinaghi (Shirazi)",
            "mother": "Fatemeh Khanum Alinaghi (Shirazi)",
            "photo": null,
            "residence": "",
            "social": {},
            "role": "descendant",
            "note": "Name, birth year and mother from a family genealogy record (via Encyclopaedia Iranica). That source's marriage/spouse claims for this generation were flagged as unreliable and have been omitted.",
            "children": []
        },
        {
            "id": "kaveh-farman-farmaian",
            "name": "Prince Kaveh Farman Farmaian",
            "nameFa": "",
            "born": 1920,
            "died": null,
            "childNumber": "3rd child of Fatemeh Khanum Alinaghi (Shirazi)",
            "mother": "Fatemeh Khanum Alinaghi (Shirazi)",
            "photo": null,
            "residence": "",
            "social": {},
            "role": "descendant",
            "note": "Name, birth year and mother from a family genealogy record (via Encyclopaedia Iranica). That source's marriage/spouse claims for this generation were flagged as unreliable and have been omitted.",
            "children": []
        },
        {
            "id": "ali-naghi-farman-farmaian",
            "name": "Prince Ali Naghi Farman Farmaian",
            "nameFa": "",
            "born": 1923,
            "died": null,
            "childNumber": "4th child of Fatemeh Khanum Alinaghi (Shirazi)",
            "mother": "Fatemeh Khanum Alinaghi (Shirazi)",
            "photo": null,
            "residence": "",
            "social": {},
            "role": "descendant",
            "note": "Name, birth year and mother from a family genealogy record (via Encyclopaedia Iranica). That source's marriage/spouse claims for this generation were flagged as unreliable and have been omitted.",
            "children": []
        },
        {
            "id": "alidad-farman-farmaian",
            "name": "Prince Alidad Farman Farmaian",
            "nameFa": "",
            "born": 1924,
            "died": null,
            "childNumber": "5th child of Fatemeh Khanum Alinaghi (Shirazi)",
            "mother": "Fatemeh Khanum Alinaghi (Shirazi)",
            "photo": null,
            "residence": "",
            "social": {},
            "role": "descendant",
            "note": "Name, birth year and mother from a family genealogy record (via Encyclopaedia Iranica). That source's marriage/spouse claims for this generation were flagged as unreliable and have been omitted.",
            "children": []
        },
        {
            "id": "shahzadi-bilqis-khanum-farman-farmaian",
            "name": "Princess Shahzadi Bilqis Khanum Farman Farmaian",
            "nameFa": "",
            "born": 1926,
            "died": null,
            "childNumber": "6th child of Fatemeh Khanum Alinaghi (Shirazi)",
            "mother": "Fatemeh Khanum Alinaghi (Shirazi)",
            "photo": null,
            "residence": "",
            "social": {},
            "role": "descendant",
            "note": "Name, birth year and mother from a family genealogy record (via Encyclopaedia Iranica). That source's marriage/spouse claims for this generation were flagged as unreliable and have been omitted.",
            "children": []
        },
        {
            "id": "hafez-farman-farmaian",
            "name": "Prince Hafez Farman Farmaian",
            "nameFa": "",
            "born": 1927,
            "died": null,
            "childNumber": "7th child of Fatemeh Khanum Alinaghi (Shirazi)",
            "mother": "Fatemeh Khanum Alinaghi (Shirazi)",
            "photo": null,
            "residence": "",
            "social": {},
            "role": "descendant",
            "note": "Name, birth year and mother from a family genealogy record (via Encyclopaedia Iranica). That source's marriage/spouse claims for this generation were flagged as unreliable and have been omitted.",
            "children": []
        },
        {
            "id": "karimdad-farman-farmaian",
            "name": "Prince Karimdad Farman Farmaian",
            "nameFa": "",
            "born": 1923,
            "died": null,
            "childNumber": "1st child of Akhtarzaman Hormozian",
            "mother": "Akhtarzaman Hormozian",
            "photo": null,
            "residence": "",
            "social": {},
            "role": "descendant",
            "note": "Name, birth year and mother from a family genealogy record (via Encyclopaedia Iranica). That source's marriage/spouse claims for this generation were flagged as unreliable and have been omitted.",
            "children": []
        },
        {
            "id": "tari-verdi-farman-farmaian",
            "name": "Prince Tari Verdi Farman Farmaian",
            "nameFa": "",
            "born": 1931,
            "died": null,
            "childNumber": "3rd child of Hamdam Khanum Talai",
            "mother": "Hamdam Khanum Talai",
            "photo": null,
            "residence": "",
            "social": {},
            "role": "descendant",
            "note": "Name, birth year and mother from a family genealogy record (via Encyclopaedia Iranica). That source's marriage/spouse claims for this generation were flagged as unreliable and have been omitted.",
            "children": []
        }
    ],
    "role": "descendant"
};

window.SEED_QAJAR_REFERENCE = {
    "id": "q-agha-mohammad-khan",
    "name": "Agha Mohammad Khan",
    "nameFa": "آقا محمد خان",
    "born": 1742,
    "died": 1797,
    "note": "Founder of the Qajar dynasty.",
    "children": [
        {
            "id": "q-fath-ali-shah",
            "name": "Fath-Ali Shah",
            "nameFa": "فتح‌علی شاه",
            "born": 1772,
            "died": 1834,
            "note": "2nd Qajar Shah.",
            "children": [
                {
                    "id": "q-abbas-mirza",
                    "name": "Abbas Mirza",
                    "nameFa": "عباس میرزا",
                    "born": 1789,
                    "died": 1833,
                    "note": "Crown Prince; died before he could reign.",
                    "children": [
                        {
                            "id": "q-firuz-mirza-nosrat-ed-dowleh",
                            "name": "Firuz Mirza Nosrat-ed-Dowleh I",
                            "nameFa": "فیروز میرزا نصرت‌الدوله",
                            "born": 1817,
                            "died": 1886,
                            "note": "16th son of Abbas Mirza. Qajar prince, military commander and administrator. Father of Abdol Hossein Mirza Farmanfarma -- confirmed directly by this branch of the original chart. Source: Wikipedia + original document.",
                            "children": [
                                {
                                    "id": "q-firuz-child-1",
                                    "name": "E. Majid Hasan Dowleh",
                                    "nameFa": "",
                                    "born": null,
                                    "died": null,
                                    "social": {},
                                    "note": "Best-effort reading of the original chart's handwriting -- please confirm or correct.",
                                    "children": [],
                                    "photo": null
                                },
                                {
                                    "id": "q-abdol-hossein-farmanfarma-ref",
                                    "name": "Abdol Hossein Mirza Farmanfarma",
                                    "nameFa": "",
                                    "born": 1857,
                                    "died": 1939,
                                    "social": {},
                                    "note": "This is the root of the interactive family tree above -- click to jump there.",
                                    "children": [],
                                    "linkToMainTree": "farmanfarma",
                                    "photo": null
                                },
                                {
                                    "id": "q-firuz-child-3",
                                    "name": "Massoumeh Kalantar",
                                    "nameFa": "",
                                    "born": null,
                                    "died": null,
                                    "social": {},
                                    "note": "Best-effort reading of the original chart's handwriting -- please confirm or correct.",
                                    "children": [],
                                    "photo": null
                                },
                                {
                                    "id": "q-firuz-child-4",
                                    "name": "Hazrat Olia",
                                    "nameFa": "",
                                    "born": null,
                                    "died": null,
                                    "social": {},
                                    "note": "Best-effort reading of the original chart's handwriting -- please confirm or correct.",
                                    "children": [],
                                    "photo": null
                                },
                                {
                                    "id": "q-firuz-child-5",
                                    "name": "Noshee Soltaneh",
                                    "nameFa": "",
                                    "born": null,
                                    "died": null,
                                    "social": {},
                                    "note": "Best-effort reading of the original chart's handwriting -- please confirm or correct.",
                                    "children": [],
                                    "photo": null
                                }
                            ],
                            "social": {
                                "wikipedia": "https://en.wikipedia.org/wiki/Firuz_Mirza"
                            },
                            "photo": null
                        },
                        {
                            "id": "q-mohammad-shah",
                            "name": "Mohammad Shah",
                            "nameFa": "محمد شاه",
                            "born": 1808,
                            "died": 1848,
                            "note": "3rd Qajar Shah.",
                            "children": [
                                {
                                    "id": "q-naser-al-din-shah",
                                    "name": "Naser al-Din Shah",
                                    "nameFa": "ناصرالدین شاه",
                                    "born": 1831,
                                    "died": 1896,
                                    "note": "4th Qajar Shah.",
                                    "children": [
                                        {
                                            "id": "q-mozaffar-al-din-shah",
                                            "name": "Mozaffar ad-Din Shah",
                                            "nameFa": "مظفرالدین شاه",
                                            "born": 1853,
                                            "died": 1907,
                                            "note": "5th Qajar Shah.",
                                            "children": [
                                                {
                                                    "id": "q-mohammad-ali-shah",
                                                    "name": "Mohammad Ali Shah",
                                                    "nameFa": "محمدعلی شاه",
                                                    "born": 1872,
                                                    "died": 1925,
                                                    "note": "6th Qajar Shah.",
                                                    "children": [
                                                        {
                                                            "id": "q-ahmad-shah",
                                                            "name": "Ahmad Shah",
                                                            "nameFa": "احمد شاه",
                                                            "born": 1898,
                                                            "died": 1930,
                                                            "note": "7th and last Qajar Shah.",
                                                            "children": [],
                                                            "social": {},
                                                            "photo": null
                                                        }
                                                    ],
                                                    "social": {},
                                                    "photo": null
                                                }
                                            ],
                                            "social": {},
                                            "photo": null
                                        }
                                    ],
                                    "social": {},
                                    "photo": null
                                }
                            ],
                            "social": {},
                            "photo": null
                        }
                    ],
                    "social": {
                        "wikipedia": "https://en.wikipedia.org/wiki/Abbas_Mirza"
                    },
                    "photo": null
                }
            ],
            "social": {},
            "photo": null
        }
    ],
    "social": {},
    "photo": null
};
