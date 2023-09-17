window.onload = async () => {

    document.getElementById("id-ncbIntro").textContent = "New Christian Bible";
    mainPath = document.getElementById("id-ncbBase").href;
    if (sidePanelLoaded) { ncbStartup(); };
}

async function ncbStartup() {

    let theme = localStorage.getItem("theme");
    //localStorage.removeItem("versionid");
    //localStorage.removeItem("versionidx");
    let versionid = localStorage.getItem("versionid");
    let res = false;

    res = await ncbLoadVersions();
    if (!theme) { theme = '1' };
    document.getElementById('id-ncbDefaultTheme').dataset.theme = theme;
    if (!versionid) { versionid = 1; };
    if (res) { ncbApplyTheme() };
    if (res) { ncbApplyDefaultVersion(versionid) };
    if (res) { ncbLoadBooks() };
    if (res) { ncbLoadChapters() };
    if (res) { ncbLoadVerses() };
    if (res) { ncbChangeVersion(versionid) };
};

async function ncbApplyDefaultVersion(versionid) {

    let eChngVersion = document.getElementById(`id-ncbChangeVersion${versionid}`);
    let version = eChngVersion.dataset.version;
    let eMenu = document.getElementById('id-ncbMenu');
    let versionidx = Number(eMenu.dataset.idx);

    let eDefVersion = document.getElementById('id-ncbDefaultVersion');
    eDefVersion.dataset.version = version;
    eDefVersion.dataset.versionid = versionid;
    eDefVersion.dataset.versionidx = versionidx;

    let eDefVersion1 = document.getElementById('id-ncbDefaultVersionSpan');
    eDefVersion1.textContent = version;

    let eVersion = document.getElementById('id-ncbVersion');
    eVersion.dataset.version = version;
    eVersion.dataset.versionid = versionid;
    eVersion.dataset.versionidx = versionidx;
    document.getElementById('id-ncbTextTitle1').textContent = eChngVersion.textContent;
    document.getElementById('id-ncbVersionText').textContent = version;
};
async function ncbApplyTheme() {

    const ncbNumber = document.getElementsByClassName("cs-ncbNumber");
    const theme = Number(document.getElementById('id-ncbDefaultTheme').dataset.theme);
    switch (theme) {
        case 1:
            document.getElementById('id-ncbDefaultThemeSpan').textContent = document.getElementById(`id-ncbDefaultTheme${theme}`).textContent;
            document.getElementById('id-ncbMainText').classList.remove('cs-ncbMainTextDark');
            for (let i = 0; i < ncbNumber.length; i++) { ncbNumber[i].style.color = '#9e6105'; };
            document.getElementById('id-ncbTextTitle2').style.color = '#720D0D';
            document.getElementById('id-ncbSelectContainer').style.backgroundColor = '#cbcaca';
            document.getElementById('id-ncbPanelP1').style.color = '#333333';
            document.getElementById('id-ncbPanelP1').style.backgroundColor = 'white';
            document.getElementById('id-ncbPanelP2').style.color = '#333333';
            document.getElementById('id-ncbPanelP2').style.backgroundColor = '#dfdcdc';
            document.getElementById('id-ncbPanelP2').style.backgroundColor = '#f3f3f3';
            break;
        case 2:
            document.getElementById('id-ncbDefaultThemeSpan').textContent = document.getElementById(`id-ncbDefaultTheme${theme}`).textContent;;
            document.getElementById('id-ncbMainText').classList.add('cs-ncbMainTextDark');
            for (let i = 0; i < ncbNumber.length; i++) { ncbNumber[i].style.color = '#b88a48'; };
            document.getElementById('id-ncbTextTitle2').style.color = "white";
            document.getElementById('id-ncbSelectContainer').style.backgroundColor = '#333333';
            document.getElementById('id-ncbPanelP1').style.backgroundColor = '#5e5c5c';
            document.getElementById('id-ncbPanelP1').style.color = 'white';
            document.getElementById('id-ncbPanelP2').style.backgroundColor = '#5e5c5c';
            document.getElementById('id-ncbPanelP2').style.color = 'white';
            document.getElementById('id-ncbTextTitle2').style.color = '#b8afaf';
            document.getElementById('id-ncbDailyVerse').style.color = 'white';
            break;
    }

}

async function ncbLoadVersions() {

    versions.forEach(version => {
        // #region load the default version dropdown box
        let div = document.createElement("div");
        div.addEventListener('click', function (event) {
            event.stopPropagation();
            event.preventDefault();
            event.stopImmediatePropagation();
            ncbDefaultVersion();
        });
        div.id = `id-ncbDefaultVersion${version.id}`;
        div.textContent = version.vn;
        div.dataset.versionid = version.id;
        div.dataset.version = version.ar;
        div.dataset.loaded = 0;
        div.classList.add('cs-ncbVersion');
        document.getElementById('id-ncbDefaultVersion').appendChild(div);
        // #endregion load the default version dropdown box

        // #region load the change version dropdown box
        div = document.createElement("div");
        div.addEventListener('click', function (event) {
            event.stopPropagation();
            event.preventDefault();
            event.stopImmediatePropagation();
            ncbChangeVersion();
        });
        div.id = `id-ncbChangeVersion${version.id}`;
        div.textContent = version.vn;
        div.dataset.versionid = version.id;
        div.dataset.version = version.ar;
        div.dataset.loaded = 0;
        div.classList.add('cs-ncbVersion');
        div.classList.add('cs-ncbChangeVersionSelect');
        document.getElementById('id-ncbChangeVersion').appendChild(div);
        // #endregion load the change version dropdown box
    });

    return Promise.resolve(true);
};

async function ncbLoadBooks() {

    let i = 0;
    let ii = 0;
    let div;
    let span;

    ncbRemoveItems('id-ncbChangeBook');
    oldBooks.forEach(book => {
        div = document.createElement("div");
        div.id = `id-ncbBookLine${i}`;
        div.classList.add('cs-ncbBookLine');
        document.getElementById("id-ncbChangeBook").appendChild(div);

        span = document.createElement("span");
        span.id = `id-ncbBk${book.id}`;
        span.textContent = book.t;
        span.dataset.bid = book.id;
        span.dataset.c = book.c;
        span.classList.add('cs-ncbBookSpan');
        span.addEventListener('click', function (event) {
            event.stopPropagation();
            event.preventDefault();
            event.stopImmediatePropagation();
            ncbChangeBook();
        });
        document.getElementById(`id-ncbBookLine${i}`).appendChild(span);

        if (ii < 27) {
            span = document.createElement("span");
            span.id = `id-ncbBk${newBooks[ii].id}`;
            span.textContent = newBooks[ii].t;
            span.dataset.bid = newBooks[ii].id;
            span.dataset.c = newBooks[ii].c;
            span.classList.add('cs-ncbBookSpan1');
            span.addEventListener('click', function (event) {
                event.stopPropagation();
                event.preventDefault();
                event.stopImmediatePropagation();
                ncbChangeBook();
            });
            document.getElementById(`id-ncbBookLine${i}`).appendChild(span);
        };
        ii++;
        i++;
    });


    return Promise.resolve(true);
};

async function ncbLoadChapters() {

    let i = 1;
    let x = 0;
    let newLine = 1;
    let chapterIndx = 0;
    let count = Number(document.getElementById('id-ncbMenu').dataset.chapters);

    ncbRemoveItems(`id-ncbChangeChapter`);
    while (i <= count) {
        if (newLine) {
            let d = document.createElement("div");
            d.id = `id-ncbChpt${chapterIndx}`;
            d.classList.add('cs-ncbSelectLine');
            document.getElementById(`id-ncbChangeChapter`).appendChild(d);
            newLine = 0;
        };
        let sp = document.createElement("span");
        sp.addEventListener('click', function (event) {
            event.stopPropagation();
            event.preventDefault();
            event.stopImmediatePropagation();
            ncbChangeChapter();
        });
        sp.id = `id-ncbChp${i}`;
        sp.textContent = i;
        sp.dataset.cn = i;
        sp.classList.add('cs-ncbToSelect');
        document.getElementById(`id-ncbChpt${chapterIndx}`).appendChild(sp);
        if (x < 4) { x++; } else { x = 0; newLine = 1; chapterIndx++; };
        i++;
    };
    document.getElementById('id-ncbMenu').dataset.chapters = (i - 1);
    let d = document.createElement("div");
    d.id = `id-ncbChpt${chapterIndx + 1}`;
    d.textContent = ' ... ';
    d.classList.add('cs-ncbSelectLine');
    document.getElementById(`id-ncbChangeChapter`).appendChild(d);
    return Promise.resolve(true);
};

async function ncbLoadVerses() {

    let i = 1;
    let x = 0;
    let newLine = 1;
    let verseIndx = 0;
    let count = Number(document.getElementById('id-ncbMenu').dataset.verses);

    ncbRemoveItems(`id-ncbSelectVerse`);
    while (i <= count) {
        if (newLine) {
            let d = document.createElement("div");
            d.id = `id-ncbVrse${verseIndx}`;
            d.classList.add('cs-ncbSelectLine');
            document.getElementById(`id-ncbSelectVerse`).appendChild(d);
            newLine = 0;
        };
        let sp = document.createElement("span");
        sp.addEventListener('click', function (event) {
            event.stopPropagation();
            event.preventDefault();
            event.stopImmediatePropagation();
            ncbSelectVerse();
        });
        sp.id = `id-ncbVrs${i}`;
        sp.textContent = i;
        sp.dataset.cn = i;
        sp.classList.add('cs-ncbToSelect');
        document.getElementById(`id-ncbVrse${verseIndx}`).appendChild(sp);
        if (x < 4) { x++; } else { x = 0; newLine = 1; verseIndx++; };
        i++;
    };
    let d = document.createElement("div");
    d.id = `id-ncbVrse${verseIndx + 1}`;
    d.textContent = ' ... ';
    d.classList.add('cs-ncbSelectLine');
    document.getElementById(`id-ncbSelectVerse`).appendChild(d);
    return Promise.resolve(true);
};

async function ncbLoadAVersion(id) {

    let res = false;
    let eMenu = document.getElementById('id-ncbMenu');
    let i = Number(eMenu.dataset.idx);
    let eVersion = document.getElementById(id);

    res = await ncbFetch(eVersion.dataset.version);
    if (res) {
        eVersion.dataset.loaded = 1;

        if (startup) {
            eMenu.dataset.idx = i;
            eVersion.dataset.versionidx = i;
            startup = false;
            ncbLoadText();
        } else {
            i++;
            eMenu.dataset.idx = i;
            eVersion.dataset.versionidx = i;
            ncbLoadText();
        };

    };
    return Promise.resolve(true);
};

async function ncbFetch(version) {

    document.getElementById('id-ncbBody').style.cursor = 'wait';
    document.getElementById('id-ncbBody').style.pointerEvents = 'none';
    let url = `${mainPath}DATA/${version}/${version}Verses.json`;
    const res = await fetch(url, { mode: 'cors' });
    const file = await res.json();
    if (file) { allVerses.push(file); ncbRandomVerse(file); };
    document.getElementById('id-ncbBody').style.cursor = 'default';
    document.getElementById('id-ncbBody').style.pointerEvents = 'auto';

    return Promise.resolve(true);
};

async function ncbLoadText() {

    let eMenu = document.getElementById('id-ncbMenu');
    let bid = Number(eMenu.dataset.bid);
    let cn = Number(eMenu.dataset.cn);
    let idx = Number(eMenu.dataset.idx);
    let newLine = 0;
    let pID = 0;
    let x = 0;

    let verseText = '';
    var span = '<span id="id-ncbSP1-2" class="cs-ncbJQ">';
    var endSpan = '</span>';

    ncbRemoveItems('id-ncbChapterPage');

    let verses = allVerses[idx];
    let i = verses.findIndex(vrs => vrs.bid === bid && vrs.cn === cn);

    let p = document.createElement("p");
    p.id = `id-ncbP${pID}`;
    p.classList.add('cs-ncbP');
    p.addEventListener('click', function (event) {
        event.stopPropagation();
        event.preventDefault();
        event.stopImmediatePropagation();
        ncbClickP();
    });
    document.getElementById('id-ncbChapterPage').appendChild(p);

    let pn = Number(verses[i].pn);
    while (verses[i].bid === bid && verses[i].cn === cn) {
        x++;
        if (verses[i].pn !== pn) { pn = verses[i].pn; newLine = 1; pID++; };
        if (newLine) {
            let p = document.createElement("p");
            p.id = `id-ncbP${pID}`;
            p.classList.add('cs-ncbP');
            document.getElementById(`id-ncbChapterPage`).appendChild(p);
            newLine = 0;
        };

        // Add verse number to verse
        sp = document.createElement("span");
        if (verses[i].vn !== 1) { sp.textContent = verses[i].vn };
        sp.id = `id-ncbSP${verses[i].vn}`;
        sp.classList.add('cs-ncbNumber');
        document.getElementById(`id-ncbP${pID}`).appendChild(sp);

        // Add text to verse
        sp = document.createElement("span");
        sp.id = `id-ncbSP${verses[i].vn}-2`;
        sp.pid = pID;
        document.getElementById(`id-ncbP${pID}`).appendChild(sp);

        // Add event listener to verse
        document.getElementById(`id-ncbSP${verses[i].vn}-2`).addEventListener('click', function (event) {
            event.stopPropagation();
            event.preventDefault();
            event.stopImmediatePropagation();
            ncbClickP();
        });

        //Add color to all quotes by Jesus
        verseText = `${verses[i].vt} `;
        if (Number(verses[i].jq) === 1) {
            verseText = verseText.replace('`', span);
            verseText = verseText.replace('´', endSpan);
            document.getElementById(`id-ncbSP${verses[i].vn}-2`).insertAdjacentHTML('beforeend', verseText);
        } else {
            sp.textContent = verseText;
        };
        i++;
    };
    document.getElementById('id-ncbMenu').dataset.verses = x;
};

async function ncbRandomVerse(verses) {

    var span = '<span class="cs-ncbJQ">';
    var endSpan = '</span>';

    let book = [];
    let min = 1;
    let max = 66;
    let x = 0;
    let verse = '';
    let head = ''

    let bid = Math.floor(Math.random() * (max - min + 1) + min);

    if (bid < 40) {
        book = oldBooks;
    } else {
        book = newBooks;
    };
    let i = book.findIndex(books => books.id === bid);
    head = book[i].t;
    max = book[i].c;
    let cn = Math.floor(Math.random() * (max - min + 1) + min);
    max = 0;
    let y = verses.findIndex(vrs => vrs.bid === bid && vrs.cn === cn);
    while (verses[y].bid === bid && verses[y].cn === cn) {
        max++;
        y++;
    };
    x = Math.floor(Math.random() * (max - min + 1) + min);
    i = verses.findIndex(vrs => vrs.bid === bid && vrs.cn === cn);
    i += x;
    x = 0;
    let end = Number(verses[i].vn) + 2;
    head += ` ${verses[i].cn}:${verses[i].vn}-${end}`;
    verse = "<p>";
    if (verses[i + 3].cn !== cn) { i = i - 6 };
    if (verses[i - 3].cn !== cn) { i = i + 3 };
    while ( x <= 2 ) {
        if (verses[i].cn === cn) {
            let aVerse = verses[i].vt;
            if (Number(verses[i].jq) === 1) {
                aVerse = aVerse.replace('`', span);
                aVerse = aVerse.replace('´', endSpan);
            };
            verse += `<span class="cs-ncbNumber cs-ncbNumber1">${verses[i].vn}</span><span>${aVerse}</span> `;
        };
        x++;
        i++;
    };
    verse += "</p>";
    document.getElementById('id-ncbDailyVerse').textContent = head;
    document.getElementById('id-ncbDailyVerseText').textContent = '';
    document.getElementById(`id-ncbDailyVerseText`).insertAdjacentHTML('beforeend', verse);

};