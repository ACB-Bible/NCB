// #region Events

window.onload = async () => {

    document.getElementById("id-intro").textContent = "New Christian Bible";
    mainPath = document.getElementById("id-base").href;
    if (sidePanelLoaded) { startup(); };
};

var slider = document.getElementById('id-range');
slider.oninput = function() {

    let afontSize = Number(this.value);
    document.getElementById('id-defaultFontlbl').textContent = 'Font Size:';
    afontSize = afontSize / 100;
    theFont = `${afontSize}rem`;
    if (document.getElementById('id-chapterPage')) { document.getElementById('id-chapterPage').style.fontSize = theFont; }
    if (document.getElementById('id-page')) { document.getElementById('id-page').style.fontSize = theFont; }
    document.getElementById('id-defaultFontlbl').style.fontSize = theFont;
};
// #endregion Events

async function startup() {
    let res = false;
    res = await loadVersions();

    document.getElementById('id-defaultTheme').dataset.theme = theme;
    if (res) { applyTheme() };
    if (res) { applyDefaultVersion() };
    if (res) { loadBooks() };
    if (res) { loadChapters() };
    if (res) { loadVerses() };
    if (res) { changeVersion(versionid) };
    if (res) { applyDefaultFont() };

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

async function applyDefaultVersion() {

    let eChVersion = document.getElementById(`id-changeVersion${versionid}`);
    let content = eChVersion.textContent;
    let version = eChVersion.dataset.version;
    let eMenu = document.getElementById('id-menu');
    let versionidx = Number(eMenu.dataset.idx);

    let eDefVersion = document.getElementById('id-defaultVersion');
    eDefVersion.dataset.version = version;
    eDefVersion.dataset.versionid = versionid;
    eDefVersion.dataset.versionidx = versionidx;

    let eDefVersion1 = document.getElementById('id-defaultVersionSpan');
    eDefVersion1.textContent = version;

    let eVersion = document.getElementById('id-version');
    eVersion.dataset.version = version;
    eVersion.dataset.versionid = versionid;
    eVersion.dataset.versionidx = versionidx;
    if (version === 'AKJ' || version === 'ASV' || version === 'TWF') { content += ' Version' };
    document.getElementById('id-textTitle1').textContent = content;
    document.getElementById('id-versionText').textContent = version;
    return Promise.resolve(true);
};

async function applyTheme() {

    const number = document.getElementsByClassName("cs-number");
    switch (theme) {
        case 1:
            document.getElementById('id-defaultThemeSpan').textContent = document.getElementById(`id-defaultTheme${theme}`).textContent;
            document.getElementById('id-mainText').classList.remove('cs-mainTextDark');
            for (let i = 0; i < number.length; i++) { number[i].style.color = 'red'; };
            document.getElementById('id-textTitle2').style.color = '#720D0D';
            document.getElementById('id-randomContainer').style.backgroundColor = '#cbcaca';
            document.getElementById('id-panelP1').style.color = '#333333';
            document.getElementById('id-panelP1').style.backgroundColor = 'white';
            document.getElementById('id-panelP2').style.color = '#333333';
            document.getElementById('id-panelP2').style.backgroundColor = '#dfdcdc';
            document.getElementById('id-panelP2').style.backgroundColor = '#f3f3f3';
            document.getElementById('id-dailyVerse').style.color = '#720D0D';
            theme = 1;
            break;
        case 2:
            document.getElementById('id-defaultThemeSpan').textContent = document.getElementById(`id-defaultTheme${theme}`).textContent;
            document.getElementById('id-mainText').classList.add('cs-mainTextDark');
            for (let i = 0; i < number.length; i++) { number[i].style.color = 'red'; };
            document.getElementById('id-textTitle2').style.color = "white";
            document.getElementById('id-randomContainer').style.backgroundColor = '#333333';
            document.getElementById('id-saveDefaultFont').style.color = '#333333';
            document.getElementById('id-panelP1').style.backgroundColor = '#5e5c5c';
            document.getElementById('id-panelP1').style.color = 'white';
            document.getElementById('id-panelP2').style.backgroundColor = '#5e5c5c';
            document.getElementById('id-panelP2').style.color = 'white';
            document.getElementById('id-textTitle2').style.color = '#b8afaf';
            document.getElementById('id-dailyVerse').style.color = 'white';
            theme = 2;
            break;
    };
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
        div.dataset.versionid = version.id;
        div.dataset.version = version.ar;
        div.dataset.loaded = 0;
        div.classList.add('cs-version');
        div.classList.add('cs-cp-hover');
        document.getElementById('id-defaultVersion').appendChild(div);
        // #endregion load the default version dropdown box

        // #region load the change version dropdown box
        div = document.createElement("div");
        div.addEventListener('click', function (event) {
            event.stopPropagation();
            event.preventDefault();
            event.stopImmediatePropagation();
            changeVersion();
        });
        div.id = `id-changeVersion${version.id}`;
        div.textContent = version.vn;
        div.dataset.versionid = version.id;
        div.dataset.version = version.ar;
        div.dataset.loaded = 0;
        div.classList.add('cs-cp-hover');
        div.classList.add('cs-version');
        document.getElementById('id-changeVersion').appendChild(div);
        // #endregion load the change version dropdown box
    });

    return Promise.resolve(true);
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
        div.dataset.bid = book.id;
        div.dataset.c = book.c;
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
            div.dataset.bid = newBooks[ii].id;
            div.dataset.c = newBooks[ii].c;
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

    let i = 1;
    let x = 0;
    let newLine = 1;
    let chapterIndx = 0;
    let eChapter = document.getElementById(`id-changeChapter`);
    let eMenu = document.getElementById('id-menu');
    let count = Number(eMenu.dataset.chapters);

    removeItems(`id-changeChapter`);
    while (i <= count) {
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
    eMenu.dataset.chapters = (i - 1);
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
    let eMenu = document.getElementById('id-menu');
    let count = Number(eMenu.dataset.verses);

    removeItems(`id-selectVerse`);
    while (i <= count) {
        if (newLine) {
            let d = document.createElement("div");
            d.id = `id-vrse${verseIndx}`;
            d.classList.add('cs-selectLine');
            document.getElementById(`id-selectVerse`).appendChild(d);
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
        sp.dataset.cn = i;
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
    document.getElementById(`id-selectVerse`).appendChild(d);
    return Promise.resolve(true);
};

async function loadAVersion(id) {

    let res = false;
    let eMenu = document.getElementById('id-menu');
    let eVersion = document.getElementById(id);
    let loaded = Number(eVersion.dataset.loaded);

    if (!loaded) {
        res = await ncbFetch(eVersion.dataset.version);
        let i = Number(eMenu.dataset.idx);
        if (!startup) { eMenu.dataset.idx = i+ 1 };
        eVersion.dataset.versionidx = eMenu.dataset.idx;
        eVersion.dataset.loaded = 1;
    } else {
        res = true;
    };

    if (res) {
        eMenu.dataset.versionidx = eVersion.dataset.versionidx;
        res = false;
        res = await loadText();
    };
    if (res) { return Promise.resolve(true); };
};

async function ncbFetch(version) {

    document.getElementById('id-body').style.cursor = 'wait';
    document.getElementById('id-body').style.pointerEvents = 'none';
    let url = `${mainPath}DATA/${version}/${version}Verses.json`;
    const res = await fetch(url, { mode: 'cors' });
    const file = await res.json();
    if (file) {
        allVerses.push(file);

        if (startup) {
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

async function loadText() {

    let eMenu = document.getElementById('id-menu');
    let bid = Number(eMenu.dataset.bid);
    let cn = Number(eMenu.dataset.cn);
    let idx = Number(eMenu.dataset.versionidx);
    let newLine = 0;
    let pID = 0;
    let x = 0;

    let verseText = '';
    var span = '<span id="id-SP1-2" class="cs-JQ">';
    var endSpan = '</span>';

    removeItems('id-chapterPage');

    let verses = allVerses[idx];
    let lngth = verses.length;
    let i = verses.findIndex(vrs => vrs.bid === bid && vrs.cn === cn);

    let p = document.createElement("p");
    p.id = `id-p${pID}`;
    p.classList.add('cs-p');

    document.getElementById('id-chapterPage').appendChild(p);
    let pn = Number(verses[i].pn);
    while (verses[i].bid === bid && verses[i].cn === cn) {
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
        // Add verse number to verse
        sp = document.createElement("span");
        sp.textContent = verses[i].vn;
        sp.id = `id-SP${verses[i].vn}`;
        sp.classList.add('cs-number');
        if (verses[i].vn === 1) {
            sp.textContent = verseText[0];
            verseText = verseText.substring(1)
            sp.classList.add('cs-firstLetter');
        };
        document.getElementById(`id-p${pID}`).appendChild(sp);

        // Add text to verse
        sp = document.createElement("span");
        sp.id = `id-SP${verses[i].vn}-2`;
        sp.pid = pID;
        document.getElementById(`id-p${pID}`).appendChild(sp);

        //Add color to all quotes by Jesus

        if (Number(verses[i].jq) === 1) {
            verseText = verseText.replace('`', span);
            verseText = verseText.replace('´', endSpan);
            document.getElementById(`id-SP${verses[i].vn}-2`).insertAdjacentHTML('beforeend', verseText);
        } else {
            sp.textContent = verseText;
        };
        i++;
        if (i === lngth) { eMenu.dataset.verses = 21; return Promise.resolve(true); };
    };
    eMenu.dataset.verses = x;
    return Promise.resolve(true);
};

async function randomVerse(verses) {

    var span = '<span class="cs-JQ">';
    var endSpan = '</span>';

    let book = [];
    let randbk;
    let abk = [];
    let min = 1;
    let max = 66;
    let x = 0;
    let verse = '';
    let head = ''
    let aVerse = '';

    let eMenu = document.getElementById('id-menu');
    let eRandom = document.getElementById('id-randomLbl');
    let bid = Math.floor(Math.random() * (max - min + 1) + min);
    eRandom.dataset.bid = bid;
    if (bid < 40) {
        book = oldBooks;
    } else {
        book = newBooks;
    };
    let i = book.findIndex(books => books.id === bid);
    head = book[i].t;
    eRandom.dataset.t = book[i].t;
    max = book[i].c;

    let cn = Math.floor(Math.random() * (max - min + 1) + min);
    eRandom.dataset.cn = cn;
    let y = verses.findIndex(vrs => vrs.bid === bid && vrs.cn === cn);
    eRandom.dataset.vn = verses[y].vn;
    // bid = BookID, cn = ChapterNumber, jq = Jesus Quotes, vn = VerseNumber, vt = VerseText
    while (verses[y].bid === bid && verses[y].cn === cn) {
        randbk = {bid: `${verses[y].bid}`, cn: `${verses[y].cn}`, jq: `${verses[y].jq}`, vn: `${verses[y].vn}`, vt: `${verses[y].vt}`};
        abk.push(randbk);
        y++;
    };

    max = abk.length;
    if (max > 2) {max = max - 3};
    i = Math.floor(Math.random() * (max - min + 1) + min);
    eMenu.dataset.rndidx = i;
    eMenu.dataset.vn = abk[i].vn;
    head += ` ${abk[i].cn}:${abk[i].vn}-${Number(abk[i].vn) + 2}`;
    verse = "<p>";
    y = y - 1;
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

    if (aVerse === '') {
        return true;
    } else {
        return false;
    };
};
