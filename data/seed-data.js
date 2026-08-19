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
            "childNumber": "2nd of 38 children with a recorded birth year, 2nd son (41 recorded children total; born 1890)",
            "mother": "Ezzat-ed-Dowleh Qajar (wife #1 of 7 recorded wives)",
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
            "childNumber": "3rd of 38 children with a recorded birth year, 3rd son (41 recorded children total; born 1890)",
            "mother": "Ezzat-ed-Dowleh Qajar (wife #1 of 7 recorded wives)",
            "photo": "images/people/mohammad-vali-mirza-farman-farmaian.jpg",
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
            "childNumber": "10th of 38 children with a recorded birth year, 2nd daughter (41 recorded children total; born 1913)",
            "mother": "Batoul Khanum Ahshami (wife #2 of 7 recorded wives)",
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
            "childNumber": "11th of 38 children with a recorded birth year, 3rd daughter (41 recorded children total; born 1914)",
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
            "childNumber": "17th of 38 children with a recorded birth year, 11th son (41 recorded children total; born 1920)",
            "mother": "Batoul Khanum Ahshami (wife #2 of 7 recorded wives)",
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
            "childNumber": "19th of 38 children with a recorded birth year, 7th daughter (41 recorded children total; born 1921)",
            "mother": "Massoumeh Khanum Tafreshi (wife #3 of 7 recorded wives)",
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
            "childNumber": "29th of 38 children with a recorded birth year, 19th son (41 recorded children total; born 1928)",
            "mother": "Hamdam Khanum Talai (wife #4 of 7 recorded wives)",
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
            "childNumber": "31st of 38 children with a recorded birth year, 20th son (41 recorded children total; born 1929)",
            "mother": "Hamdam Khanum Talai (wife #4 of 7 recorded wives)",
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
            "childNumber": "37th of 38 children with a recorded birth year, 25th son (41 recorded children total; born 1935)",
            "mother": "Batoul Khanum Ahshami (wife #2 of 7 recorded wives)",
            "photo": "images/people/abdol-ali-mirza-farman-farmaian.jpg",
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
            "childNumber": "13th of 38 children with a recorded birth year, 9th son (41 recorded children total; born 1916)",
            "mother": "Batoul Khanum Ahshami (wife #2 of 7 recorded wives)",
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
            "childNumber": "20th of 38 children with a recorded birth year, 13th son (41 recorded children total; born 1922)",
            "mother": "Batoul Khanum Ahshami (wife #2 of 7 recorded wives)",
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
            "childNumber": "1st of 38 children with a recorded birth year, 1st son (41 recorded children total; born 1889)",
            "mother": "Ezzat-ed-Dowleh Qajar (wife #1 of 7 recorded wives)",
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
            "id": "mozaffar-firouz",
            "name": "Prince Mozaffar Firouz",
            "nameFa": "",
            "born": 1906,
            "died": null,
            "childNumber": "7th of 38 children with a recorded birth year, 7th son (41 recorded children total; born 1906)",
            "mother": "Ezzat-ed-Dowleh Qajar (wife #1 of 7 recorded wives)",
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
            "childNumber": "Birth order not confirmed (no birth year recorded) — was: \"3rd child of Ezzat-ed-Dowleh Qajar\"",
            "mother": "Ezzat-ed-Dowleh Qajar (wife #1 of 7 recorded wives)",
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
            "childNumber": "Birth order not confirmed (no birth year recorded) — was: \"4th child of Ezzat-ed-Dowleh Qajar\"",
            "mother": "Ezzat-ed-Dowleh Qajar (wife #1 of 7 recorded wives)",
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
            "childNumber": "Birth order not confirmed (no birth year recorded) — was: \"6th child of Ezzat-ed-Dowleh Qajar\"",
            "mother": "Ezzat-ed-Dowleh Qajar (wife #1 of 7 recorded wives)",
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
            "childNumber": "4th of 38 children with a recorded birth year, 4th son (41 recorded children total; born 1894)",
            "mother": "Ezzat-ed-Dowleh Qajar (wife #1 of 7 recorded wives)",
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
            "childNumber": "5th of 38 children with a recorded birth year, 5th son (41 recorded children total; born 1899)",
            "mother": "Ezzat-ed-Dowleh Qajar (wife #1 of 7 recorded wives)",
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
            "childNumber": "6th of 38 children with a recorded birth year, 6th son (41 recorded children total; born 1901)",
            "mother": "Ezzat-ed-Dowleh Qajar (wife #1 of 7 recorded wives)",
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
            "childNumber": "8th of 38 children with a recorded birth year, 1st daughter (41 recorded children total; born 1909)",
            "mother": "Mah Bagum Khanum (wife #5 of 7 recorded wives)",
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
            "childNumber": "9th of 38 children with a recorded birth year, 8th son (41 recorded children total; born 1912)",
            "mother": "Massoumeh Khanum Tafreshi (wife #3 of 7 recorded wives)",
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
            "childNumber": "14th of 38 children with a recorded birth year, 5th daughter (41 recorded children total; born 1916)",
            "mother": "Massoumeh Khanum Tafreshi (wife #3 of 7 recorded wives)",
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
            "childNumber": "24th of 38 children with a recorded birth year, 17th son (41 recorded children total; born 1925)",
            "mother": "Massoumeh Khanum Tafreshi (wife #3 of 7 recorded wives)",
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
            "childNumber": "30th of 38 children with a recorded birth year, 11th daughter (41 recorded children total; born 1928)",
            "mother": "Massoumeh Khanum Tafreshi (wife #3 of 7 recorded wives)",
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
            "childNumber": "33rd of 38 children with a recorded birth year, 22nd son (41 recorded children total; born 1930)",
            "mother": "Massoumeh Khanum Tafreshi (wife #3 of 7 recorded wives)",
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
            "childNumber": "34th of 38 children with a recorded birth year, 12th daughter (41 recorded children total; born 1931)",
            "mother": "Massoumeh Khanum Tafreshi (wife #3 of 7 recorded wives)",
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
            "childNumber": "36th of 38 children with a recorded birth year, 24th son (41 recorded children total; born 1933)",
            "mother": "Massoumeh Khanum Tafreshi (wife #3 of 7 recorded wives)",
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
            "childNumber": "38th of 38 children with a recorded birth year, 13th daughter (41 recorded children total; born 1937)",
            "mother": "Massoumeh Khanum Tafreshi (wife #3 of 7 recorded wives)",
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
            "childNumber": "12th of 38 children with a recorded birth year, 4th daughter (41 recorded children total; born 1915)",
            "mother": "Batoul Khanum Ahshami (wife #2 of 7 recorded wives)",
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
            "childNumber": "25th of 38 children with a recorded birth year, 8th daughter (41 recorded children total; born 1925)",
            "mother": "Batoul Khanum Ahshami (wife #2 of 7 recorded wives)",
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
            "childNumber": "27th of 38 children with a recorded birth year, 10th daughter (41 recorded children total; born 1927)",
            "mother": "Batoul Khanum Ahshami (wife #2 of 7 recorded wives)",
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
            "childNumber": "32nd of 38 children with a recorded birth year, 21st son (41 recorded children total; born 1929)",
            "mother": "Batoul Khanum Ahshami (wife #2 of 7 recorded wives)",
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
            "childNumber": "15th of 38 children with a recorded birth year, 6th daughter (41 recorded children total; born 1918)",
            "mother": "Fatemeh Khanum Alinaghi (Shirazi) (wife #6 of 7 recorded wives)",
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
            "childNumber": "16th of 38 children with a recorded birth year, 10th son (41 recorded children total; born 1919)",
            "mother": "Fatemeh Khanum Alinaghi (Shirazi) (wife #6 of 7 recorded wives)",
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
            "childNumber": "18th of 38 children with a recorded birth year, 12th son (41 recorded children total; born 1920)",
            "mother": "Fatemeh Khanum Alinaghi (Shirazi) (wife #6 of 7 recorded wives)",
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
            "childNumber": "21st of 38 children with a recorded birth year, 14th son (41 recorded children total; born 1923)",
            "mother": "Fatemeh Khanum Alinaghi (Shirazi) (wife #6 of 7 recorded wives)",
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
            "childNumber": "23rd of 38 children with a recorded birth year, 16th son (41 recorded children total; born 1924)",
            "mother": "Fatemeh Khanum Alinaghi (Shirazi) (wife #6 of 7 recorded wives)",
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
            "childNumber": "26th of 38 children with a recorded birth year, 9th daughter (41 recorded children total; born 1926)",
            "mother": "Fatemeh Khanum Alinaghi (Shirazi) (wife #6 of 7 recorded wives)",
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
            "childNumber": "28th of 38 children with a recorded birth year, 18th son (41 recorded children total; born 1927)",
            "mother": "Fatemeh Khanum Alinaghi (Shirazi) (wife #6 of 7 recorded wives)",
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
            "childNumber": "22nd of 38 children with a recorded birth year, 15th son (41 recorded children total; born 1923)",
            "mother": "Akhtarzaman Hormozian (wife #7 of 7 recorded wives)",
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
            "childNumber": "35th of 38 children with a recorded birth year, 23rd son (41 recorded children total; born 1931)",
            "mother": "Hamdam Khanum Talai (wife #4 of 7 recorded wives)",
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
    "id": "q-fath-ali-khan-ghovanlou",
    "name": "Fath Ali Khan Ghovanlou Qajar",
    "nameFa": "",
    "born": null,
    "died": 1726,
    "note": "Qajar chief; father of Agha Mohammad Khan and of Hossein Gholi Khan, whose branches are both shown below per the genealogy book's \"Descent of the Qajar Rulers\" chart.",
    "social": {},
    "photo": null,
    "children": [
        {
            "id": "q-agha-mohammad-khan",
            "name": "Agha Mohammad Khan",
            "nameFa": "آقا محمد خان",
            "born": 1734,
            "died": 1797,
            "note": "Founder of the Qajar dynasty; 1st Qajar Shah (reg. 1796-1797). Had no descendants -- the throne passed to his nephew, Fath-Ali Shah.",
            "social": {},
            "photo": null,
            "children": []
        },
        {
            "id": "q-hossein-gholi-khan",
            "name": "Hossein Gholi Khan (the 1st)",
            "nameFa": "",
            "born": null,
            "died": 1777,
            "note": "Brother of Agha Mohammad Khan; father of Fath-Ali Shah -- corrected per the genealogy book's \"Descent of the Qajar Rulers\" chart (an earlier version of this chart had Fath-Ali Shah as Agha Mohammad Khan's own son).",
            "social": {},
            "photo": null,
            "children": [
                {
                    "id": "q-fath-ali-shah",
                    "name": "Fath-Ali Shah",
                    "nameFa": "فتح‌علی شاه",
                    "born": 1771,
                    "died": 1834,
                    "note": "2nd Qajar Shah (reg. 1797-1834). Nephew, not son, of Agha Mohammad Khan.",
                    "social": {},
                    "photo": null,
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
                                            "name": "Eskandar (Nosrat-ed-Dowleh)",
                                            "nameFa": "",
                                            "born": null,
                                            "died": null,
                                            "social": {},
                                            "note": "Son of Firuz Mirza Nosrat-ed-Dowleh I -- a brother of Abdol Hossein Mirza Farmanfarma. Full name/title and dates still to be confirmed.",
                                            "children": [],
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
                                            "note": "4th Qajar Shah. The genealogy book shows a dotted \"later wife\" connection from one of his wives to Ezzat-ed-Dowleh Qajar (Dovom / 2nd) -- Farmanfarma's first wife, shown below under a provisional grouping node. See her note for details.",
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
                    ]
                }
            ]
        },
        {
            "id": "q-qajar-branch-unconfirmed",
            "name": "Qajar dynasty (exact branch not yet confirmed)",
            "nameFa": "",
            "born": null,
            "died": null,
            "social": {},
            "photo": null,
            "note": "Placeholder grouping node -- not a real person. Ezzat-ed-Dowleh Qajar (below) is confirmed Qajar and confirmed as Farmanfarma's first wife, but her exact parentage within the dynasty is still unconfirmed, so she isn't nested under a specific Qajar Shah here. See her note for details.",
            "children": [
                {
                    "id": "q-ezzat-ed-dowleh",
                    "name": "Ezzat-ed-Dowleh Qajar (Dovom / 2nd)",
                    "nameFa": "",
                    "born": 1872,
                    "died": 1955,
                    "social": {},
                    "photo": null,
                    "note": "Farmanfarma's first wife -- her birth and death years (1872-1955) are confirmed by the genealogy book, and 1872 matches the wife #1 birth year already recorded on the children in the family tree above. The book records her as \"Ezzat-ed-Dowleh Dovom\" (2nd), distinct from an earlier, unrelated Qajar princess of the same title who really was a daughter of Mohammad Shah and married Amir Kabir (an earlier version of this chart wrongly conflated the two -- corrected here). The book's \"Descent of the Qajar Rulers\" chart also shows a dotted connecting line from her to a note reading \"later wife of Naser al-Din Shah\", near his wife Shokouh-es-Saltaneh -- suggesting she later also became one of Naser al-Din Shah's wives. Her exact place in the Qajar lineage (whose daughter she was) is still not confirmed, so she's kept here provisionally rather than nested under a specific ancestor.",
                    "spouse": {
                        "name": "Abdol Hossein Mirza Farmanfarma",
                        "photo": "images/people/farmanfarma-root.jpg",
                        "linkToMainTree": "farmanfarma"
                    },
                    "children": []
                }
            ]
        }
    ]
};
