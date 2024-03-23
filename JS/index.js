// #region Events
    window.onload = async () => {

        let res;
        document.getElementById("id-intro").textContent = "New Christian Bible";
        gMainPath = document.getElementById("id-base").href;
        if (sidePanelLoaded) { res = inTheBeginning(); };
        if (res) { letThereBeLight(); };
    };

    var slider = document.getElementById('id-range');
    slider.oninput = function() {

        let afontSize = Number(this.value);
        document.getElementById('id-defaultFontlbl').textContent = 'Font Size:';
        afontSize = afontSize / 100;
        gFont = `${afontSize}rem`;
        if (document.getElementById('id-chapterPage')) { document.getElementById('id-chapterPage').style.fontSize = gFont; }
        if (document.getElementById('id-page')) { document.getElementById('id-page').style.fontSize = gFont; }
        document.getElementById('id-defaultFontlbl').style.fontSize = gFont;
    };
// #endregion Events

async function inTheBeginning() {

    gTheme = Number(localStorage.getItem("gTheme"));
    if (!gTheme) { gTheme = 1 };

    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    gVersionID = Number(urlParams.get('gVersionID'));
    if (!gVersionID) { gVersionID = Number(localStorage.getItem("gVersionID")); };
    if (!gVersionID) { gVersionID = 1; };  // gVersionID: 1 = Twenty-First Century Version TWF, 5 = KJV
    gVersionIDX = versions.findIndex(vrsn => Number(vrsn.id) === Number(gVersionID));
    gBookID = Number(urlParams.get('gBookID'));
    if (!gBookID) { gBookID = 1 };
    gChapterNumber = Number(urlParams.get('gChapterNumber'));
    if (!gChapterNumber) { gChapterNumber = 1 };
    if (urlParams.has('gRandomVerseIDX')) { gRandomVerseIDX =  Number(urlParams.get('gRandomVerseIDX')); };

    document.getElementById('id-defaultVersionSpan').textContent = versions[gVersionIDX].ar;
};

async function letThereBeLight() {

    let res = false;
    res = await loadVersions();

    if (res) { loadBooks() };
    if (res) { loadChapters() };
    if (res) { loadVerses() };
    if (res) { res = await changeVersion(gVersionID); };
    if (res) { applyDefaultFont() };
    if (res) { applyTheme() };
    if (res) { menuHTML = document.getElementById('id-mainText').innerHTML; };
};

async function loadVersions() {

    versions.forEach(version => {
        // #region load the default version dropdown box
            let div = document.createElement("div");
            div.addEventListener('click', function (event) {
                event.stopPropagation();
                event.preventDefault();
                event.stopImmediatePropagation();
                defaultVersion();
            });
            div.id = `id-defaultVersion${version.id}`;
            div.textContent = version.vn;
            div.dataset.loaded = 0;
            div.classList.add('cs-version');
            div.classList.add('cs-cp-hover');
            document.getElementById('id-defaultVersionSelector').appendChild(div);
        // #endregion load the default version dropdown box

        // #region load the change version dropdown box
            div = document.createElement("div");
            div.addEventListener('click', function (event) {
                event.stopPropagation();
                event.preventDefault();
                event.stopImmediatePropagation();
                changeVersion();
            });
            div.id = `id-version${version.id}`;
            div.textContent = version.vn;
            div.dataset.loaded = 0;
            div.classList.add('cs-cp-hover');
            div.classList.add('cs-version');
            document.getElementById('id-versionSelector').appendChild(div);
        // #endregion load the change version dropdown box
    });
    return Promise.resolve(true);
};

async function loadAVersion(id) {

    let res = false;
    let eVersion = document.getElementById(id);
    let loaded = Number(eVersion.dataset.loaded);

    if (id.includes('id-defaultVersion')) { id = Number(id.replace('id-defaultVersion', '')); };
    if (id.includes('id-version')) { id = Number(id.replace('id-version', '')); };
    gVersionIDX = versions.findIndex(vrsn => Number(vrsn.id) === Number(id));

    if (!loaded) {
        res = await ncbFetch(versions[gVersionIDX].ar);
        if (!gStartup) {
            gAllVersesCount++;
            eVersion.dataset.gAllVersesIDX = gAllVersesCount;
        } else {
            eVersion.dataset.gAllVersesIDX = 0;
        };
        eVersion.dataset.loaded = 1;
    } else {
        res = true;
    };

    if (res) {
        res = false;
        gAllVersesIDX = Number(eVersion.dataset.gAllVersesIDX);
        res = await loadText();
    };
    if (res) { return Promise.resolve(true); };
};

async function ncbFetch(version) {

    document.getElementById('id-body').style.cursor = 'wait';
    document.getElementById('id-body').style.pointerEvents = 'none';
    let url = `${gMainPath}DATA/${version}/${version}Verses.json`;
    const res = await fetch(url, { mode: 'cors' });
    const file = await res.json();
    if (file) {
        gAllVerses.push(file);
        if (gStartup) {
            let emptyRand = true;
            while (emptyRand === true) {
                emptyRand = randomVerse(file);
            };
        };
    };
    document.getElementById('id-body').style.cursor = 'default';
    document.getElementById('id-body').style.pointerEvents = 'auto';

    return Promise.resolve(true);
};

async function applyTheme() {

    let number = document.getElementsByClassName("cs-number");
    switch (gTheme) {
        case 1:
            document.getElementById('id-defaultThemeSpan').textContent = document.getElementById(`id-defaultTheme${gTheme}`).textContent;
            document.getElementById('id-randomContainer').style.backgroundColor = '#e0e1e1';
            document.getElementById('id-mainText').classList.remove('cs-mainTextDark');
            for (let i = 0; i < number.length; i++) { number[i].style.color = '#720D0D'; };
            document.getElementById('id-textTitle2').style.color = '#720D0D';
            document.getElementById('id-randomContainer').style.backgroundColor = '#cbcaca';
            document.getElementById('id-panel-1').style.color = '#333333';
            document.getElementById('id-panel-1').style.backgroundColor = 'white';
            document.getElementById('id-panel-2').style.color = '#333333';
            document.getElementById('id-panel-2').style.backgroundColor = '#dfdcdc';
            document.getElementById('id-panel-2').style.backgroundColor = '#f3f3f3';
            document.getElementById('id-dailyVerse').style.color = '#720D0D';
            gTheme = 1;
            break;
        case 2:
            document.getElementById('id-defaultThemeSpan').textContent = document.getElementById(`id-defaultTheme${gTheme}`).textContent;
            document.getElementById('id-body').style.backgroundColor = '#4c4b4b';
            document.getElementById('id-mainText').classList.add('cs-mainTextDark');
            for (let i = 0; i < number.length; i++) { number[i].style.color = '#a81818'; };
            document.getElementById('id-textTitle2').style.color = "white";
            document.getElementById('id-randomContainer').style.backgroundColor = '#333333';
            document.getElementById('id-saveDefaultFont').style.color = '#333333';
            document.getElementById('id-panel-1').style.backgroundColor = '#5e5c5c';
            document.getElementById('id-panel-1').style.color = 'white';
            document.getElementById('id-panel-2').style.backgroundColor = '#5e5c5c';
            document.getElementById('id-panel-2').style.color = 'white';
            document.getElementById('id-textTitle2').style.color = '#b8afaf';
            document.getElementById('id-dailyVerse').style.color = 'white';
            let z = number.length - 3;
            for (let i = z; i < number.length; i++) { number[i].style.color = '#970202'; };
            gTheme = 2;
            break;
    };
};

async function applyDefaultFont() {

    let afont = localStorage.getItem('fontsize');
    if (afont === null) {
        let element = document.documentElement;
        let style = window.getComputedStyle(element);
        let defaultFontSize = style.getPropertyValue('font-size');
        defaultFontSize = parseFloat(defaultFontSize);
        defaultFontSize = defaultFontSize / 16;
        defaultFontSize = defaultFontSize.toFixed(2);
        defaultFontSize = Number(defaultFontSize.replace('.', ''));
        document.getElementById('id-defaultFontlbl').textContent = 'Font Size:'
        document.getElementById('id-range'). value = defaultFontSize;
        document.getElementById('id-chapterPage').style.fontSize = '1.1rem';
    } else {
        document.getElementById('id-chapterPage').style.fontSize = afont;
        afont = Number(parseFloat(afont.replace('.', '')));
        document.getElementById('id-defaultFontlbl').textContent = 'Font Size:';
        document.getElementById('id-defaultFontlbl').style.fontSize = `${afont / 100}rem`;
        document.getElementById('id-range'). value = afont;
    };
};

async function loadBooks() {

    let i = 0;
    let ii = 0;
    let div;

    removeItems('id-oldHalf');
    removeItems('id-newHalf');

    oldBooks.forEach(book => {
        div = document.createElement("div");
        div.id = `id-bk${book.id}`;
        div.textContent = book.t;
        div.classList.add('cs-cp-hover');
        div.classList.add('cs-innerBook');
        div.addEventListener('click', function (event) {
            event.stopPropagation();
            event.preventDefault();
            event.stopImmediatePropagation();
            changeBook();
        });
        document.getElementById(`id-oldHalf`).appendChild(div);

        if (ii < 27) {
            div = document.createElement("div");
            div.id = `id-bk${newBooks[ii].id}`;
            div.textContent = newBooks[ii].t;
            div.classList.add('cs-cp-hover');
            div.classList.add('cs-innerBook');
            div.addEventListener('click', function (event) {
                event.stopPropagation();
                event.preventDefault();
                event.stopImmediatePropagation();
                changeBook();
            });
            document.getElementById(`id-newHalf`).appendChild(div);
        };
        ii++;
        i++;
    });
    return Promise.resolve(true);
};

async function loadChapters() {

    let book, chapterIndx = 0, newLine = 1, i = 0, x = 0;
    let eChapter = document.getElementById(`id-chapterSelector`);

    if (gBookID < 40) { book = oldBooks; } else { book = newBooks; };
    i = book.findIndex(books => Number(books.id) === Number(gBookID));
    let chapters = Number(book[i].c);
    i = 0;

    removeItems(`id-chapterSelector`);
    while (i <= chapters) {
        if (newLine) {
            let d = document.createElement("div");
            d.id = `id-chpt${chapterIndx}`;
            d.classList.add('cs-selectLine');
            eChapter.appendChild(d);
            newLine = 0;
        };
        let sp = document.createElement("span");
        sp.addEventListener('click', function (event) {
            event.stopPropagation();
            event.preventDefault();
            event.stopImmediatePropagation();
            changeChapter();
        });
        sp.id = `id-chp${i}`;
        sp.textContent = i;
        sp.dataset.cn = i;
        sp.classList.add('cs-cp-hover');
        sp.classList.add('cs-toSelect');
        document.getElementById(`id-chpt${chapterIndx}`).appendChild(sp);
        if (x < 4) { x++; } else { x = 0; newLine = 1; chapterIndx++; };
        i++;
    };
    let d = document.createElement("div");
    d.id = `id-chpt${chapterIndx + 1}`;
    d.textContent = ' ... ';
    d.classList.add('cs-selectLine');
    eChapter.appendChild(d);
    return Promise.resolve(true);
};

async function loadVerses() {

    let i = 1;
    let x = 0;
    let newLine = 1;
    let verseIndx = 0;

    removeItems(`id-verseSelector`);
    while (i <= gVerseCount) {
        if (newLine) {
            let d = document.createElement("div");
            d.id = `id-vrse${verseIndx}`;
            d.classList.add('cs-selectLine');
            document.getElementById(`id-verseSelector`).appendChild(d);
            newLine = 0;
        };
        let sp = document.createElement("span");
        sp.addEventListener('click', function (event) {
            event.stopPropagation();
            event.preventDefault();
            event.stopImmediatePropagation();
            selectVerse();
        });
        sp.id = `id-vrs${i}`;
        sp.textContent = i;
        sp.classList.add('cs-cp-hover');
        sp.classList.add('cs-toSelect');
        document.getElementById(`id-vrse${verseIndx}`).appendChild(sp);
        if (x < 4) { x++; } else { x = 0; newLine = 1; verseIndx++; };
        i++;
    };
    let d = document.createElement("div");
    d.id = `id-vrse${verseIndx + 1}`;
    d.textContent = ' ... ';
    d.classList.add('cs-selectLine');
    document.getElementById(`id-verseSelector`).appendChild(d);
    return Promise.resolve(true);
};

async function loadText() {

    let newLine = 0;
    let pID = 0;
    let x = 0;

    if (!gStartup) { replacePage(); };
    let verseText = '';
    var span = '<span id="id-SP1-2" class="cs-JQ">';
    var endSpan = '</span>';

    removeItems('id-chapterPage');

    let verses = (gAllVerses[gAllVersesIDX]);
    let i = verses.findIndex(vrs => Number(vrs.bid) === Number(gBookID) && Number(vrs.cn) === Number(gChapterNumber));
    let p = document.createElement("p");
    p.id = `id-p${pID}`;
    p.classList.add('cs-p');

    document.getElementById('id-chapterPage').appendChild(p);
    let pn = Number(verses[i].pn);
    while (verses[i].bid === gBookID && verses[i].cn === gChapterNumber) {
        x++;
        if (verses[i].pn !== pn) { pn = verses[i].pn; newLine = 1; pID++; };
        if (newLine) {
            let p = document.createElement("p");
            p.id = `id-p${pID}`;
            p.classList.add('cs-p');
            document.getElementById(`id-chapterPage`).appendChild(p);
            newLine = 0;
        };
        verseText = `${verses[i].vt} `;

        sp = document.createElement("span");  // Add verse number to verse
        sp.textContent = verses[i].vn;
        sp.id = `id-SP${verses[i].vn}`;
        sp.classList.add('cs-number');
        if (verses[i].vn === 1) {
            sp.textContent = verseText[0];
            verseText = verseText.substring(1)
            sp.classList.add('cs-firstLetter');
        };
        document.getElementById(`id-p${pID}`).appendChild(sp);

        sp = document.createElement("span");  // Add text to verse
        sp.id = `id-SP${verses[i].vn}-2`;
        sp.pid = pID;
        document.getElementById(`id-p${pID}`).appendChild(sp);

        if (Number(verses[i].jq) === 1) {  //Add color to all quotes by Jesus
            verseText = verseText.replace('`', span);
            verseText = verseText.replace('´', endSpan);
            document.getElementById(`id-SP${verses[i].vn}-2`).insertAdjacentHTML('beforeend', verseText);
        } else {
            sp.textContent = verseText;
        };
        i++;
        if (i === verses.length) { gVerseCount = 21; return Promise.resolve(true); };
    };
    gVerseCount = x;
    return Promise.resolve(true);
};

async function randomQuery(verses) {

    let aVerse = '';
    let bid = verses[gRandomVerseIDX].bid
    if (bid < 40) { book = oldBooks; } else { book = newBooks; };
    let bidx = book.findIndex(books => Number(books.id) === Number(bid));

    let endSpan = '</span>';
    let head = book[bidx].t;
    var span = '<span class="cs-JQ">';
    let verse = '';
    let x = 0;
    let i = gRandomVerseIDX;

    head += ` ${verses[i].cn}:${verses[i].vn}-${Number(verses[i].vn) + 2}`;
    while ( x <= 2 ) {
        aVerse = verses[i].vt;
        if (Number(verses[i].jq) === 1) {
            aVerse = aVerse.replace('`', span);
            aVerse = aVerse.replace('´', endSpan);
        };
        verse += `<span id="id-number${x}" class="cs-number cs-maroon">${verses[i].vn}</span><span id="id-number${x}-2">${aVerse}</span> `;
        x++;
        i++;
    };
    verse += "</p>";
    document.getElementById('id-dailyVerse').textContent = head;
    document.getElementById('id-dailyVerseText').textContent = '';
    document.getElementById(`id-dailyVerseText`).insertAdjacentHTML('beforeend', verse);
    gRandomQuery = 1;
};

async function randomVerse(verses) {

    let book = [];
    let randbk;
    let abk = [];
    let min = 1;
    let max = 66;
    let x = 0;
    let aVerse = '';
    let head = ''
    let verse = '';
    var endSpan = '</span>';
    var span = '<span class="cs-JQ">';

    if (gRandomVerseIDX) { randomQuery(verses); return; };

    let bid = Math.floor(Math.random() * (max - min + 1) + min);
    if (bid < 40) { book = oldBooks; } else { book = newBooks; };

    let i = book.findIndex(books => Number(books.id) === Number(bid));
    head = book[i].t;
    max = book[i].c;

    let cn = Math.floor(Math.random() * (max - min + 1) + min);
    let y = verses.findIndex(vrs => Number(vrs.bid) === Number(bid) && Number(vrs.cn) === Number(cn));

    // bid = BookID, cn = ChapterNumber, jq = Jesus Quotes, vn = VerseNumber, vt = VerseText
    while (verses[y].bid === bid && verses[y].cn === cn) {
        randbk = {vid: `${verses[y].vid}`,bid: `${verses[y].bid}`, cn: `${verses[y].cn}`, jq: `${verses[y].jq}`, vn: `${verses[y].vn}`, vt: `${verses[y].vt}`};
        abk.push(randbk);
        y++;
    };

    max = abk.length;
    if (max > 2) {max = max - 3};
    i = Math.floor(Math.random() * (max - min + 1) + min);
    replacePage();
    head += ` ${abk[i].cn}:${abk[i].vn}-${Number(abk[i].vn) + 2}`;
    verse = "<p>";
    y = i - 1;
    gRandomVerseIDX = Number(abk[y].vid);
    while ( x <= 2 ) {
        if (Number(abk[i].cn) === cn && Number(abk[i].bid) === bid) {
            aVerse = abk[i].vt;
            if (Number(abk[i].jq) === 1) {
                aVerse = aVerse.replace('`', span);
                aVerse = aVerse.replace('´', endSpan);
            };
            verse += `<span id="id-number${x}" class="cs-number cs-maroon">${abk[i].vn}</span><span id="id-number${x}-2">${aVerse}</span> `;
        };
        x++;
        i++;
    };
    verse += "</p>";
    document.getElementById('id-dailyVerse').textContent = head;
    document.getElementById('id-dailyVerseText').textContent = '';
    document.getElementById(`id-dailyVerseText`).insertAdjacentHTML('beforeend', verse);

    if (aVerse === '') { return true; } else { return false; };
};
