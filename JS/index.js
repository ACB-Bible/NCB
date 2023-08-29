
window.onload = async () => {

    document.getElementById("id-ncbIntro").textContent = "New Christian Bible";
    mainPath = document.getElementById("id-ncbBase").href;
    
    if (sidePanelLoaded) {
        var theme = localStorage.getItem("theme");
        if (!theme) {theme = 'Light'};
        var version = localStorage.getItem("version");
        if (!version) {version = 'TWF'};

        document.getElementById('id-ncbDefaultTheme').dataset.theme = theme;
        document.getElementById('id-ncbDefaultVersion').dataset.version = version;
        document.getElementById('id-ncbVersion').dataset.version = version;

        ncbStartup();
    };
}

async function ncbStartup() {

    let res = false;
    ncbApplyTheme();
    res = await ncbLoadVersions();
    if (res) { ncbApplyVersion() };
    if (res) { ncbLoadBooks() };
    if (res) { ncbLoadChapters() };
};

async function ncbApplyVersion() {

};

async function ncbLoadVersions() {

    versions.forEach(version => {
        // #region load the default version dropdown box
        let div = document.createElement("div");
        div.addEventListener('click', function(event) {
            event.stopPropagation();
            event.preventDefault();
            event.stopImmediatePropagation();
            ncbDefaultVersion();
          });
        div.id = `id-ncbDefaultVersion${version.id}`;
        div.textContent = version.vn;
        div.dataset.version = version.ar;
        div.dataset.loaded = false;
        div.classList.add('cs-ncbVersion');
        document.getElementById('id-ncbDefaultVersion').appendChild(div);
          // #endregion load the default version dropdown box

        // #region load the change version dropdown box

        div = document.createElement("div");
        div.addEventListener('click', function(event) {
            event.stopPropagation();
            event.preventDefault();
            event.stopImmediatePropagation();
            ncbChangeVersion();
          });
        div.id = `id-ncbChangeVersion${version.id}`;
        div.textContent = version.vn;
        div.dataset.version = version.ar;
        div.dataset.loaded = false;
        div.classList.add('cs-ncbVersion');
        div.classList.add('cs-ncbChangeVersionSelect');
        document.getElementById('id-ncbChangeVersion').appendChild(div);

    });
    // #endregion load the change version dropdown box
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
        span.addEventListener('click', function(event) {
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
            span.addEventListener('click', function(event) {
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
    let count = Number(document.getElementById('id-ncbChangeChapter').dataset.chapters);

    ncbClose();
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
        sp.addEventListener('click', function(event) {
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
    let d = document.createElement("div");
    d.id = `id-ncbChpt${chapterIndx + 1}`;
    d.textContent = ' ... ';
    d.classList.add('cs-ncbSelectLine');
    document.getElementById(`id-ncbChangeChapter`).appendChild(d);
    return Promise.resolve(true);
};

async function acbLoadVerses(bid, cn) {

    let x = 0;
    let y = 0;
    let newLine = 1;
    var verseIndx = 0;

    acbRemoveItems('id-ncbSelectVerse');
    let i = verses.findIndex(vrs => vrs.bid === bid && vrs.cn === cn);
    while (verses[i].bid === bid && verses[i].cn === cn) {
        if (newLine) {
            let d = document.createElement("div");
            d.id = `id-ncbVrss${verseIndx}`;
            d.classList.add('cs-ncbSelectLine');
            document.getElementById(`id-ncbSelectVerse`).appendChild(d);
            newLine = 0;
        };
        let sp = document.createElement("span");
        sp.addEventListener("click", ncbGoToVerse, true);
        sp.id = `id-ncbVrs${y}`;
        sp.textContent = verses[i].vn;
        sp.dataset.bid = verses[i].bid;
        sp.dataset.cn = verses[i].cn;
        sp.dataset.vn = verses[i].vn;
        sp.classList.add('cs-ncbSelector');
        document.getElementById(`id-ncbVrss${verseIndx}`).appendChild(sp);
        if (x < 4) { x++; } else { x = 0; newLine = 1; verseIndx++; };
        i++;
        y++;
    };
    let d = document.createElement("div");
    d.id = `id-acbVrss${verseIndx + 1}`;
    d.textContent = ' ... ';
    d.classList.add('cs-acbSelectLine');
    document.getElementById(`id-ncbSelectVerse`).appendChild(d);
};

async function fetchJson(url) {

    document.getElementById('id-ncbBody').style.cursor = 'wait';
    document.getElementById('id-ncbBody').style.pointerEvents = 'none';
    const res = await fetch(url, { mode: 'cors' });
    const aFile = await res.json();
    if (aFile) {
        document.getElementById('id-ncbBody').style.cursor = 'default';
        document.getElementById('id-ncbBody').style.pointerEvents = 'auto';
    };
    return Promise.resolve(aFile);
};

async function ncbApplyTheme() {

    const ncbNumber = document.getElementsByClassName("cs-ncbNumber");
    const theme = document.getElementById('id-ncbDefaultTheme').dataset.theme;
    switch (theme) {
        case 'Light':
            document.getElementById('id-ncbDefaultThemeSpan').textContent = theme;
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
        case 'Dark':
            document.getElementById('id-ncbDefaultThemeSpan').textContent = theme;
            document.getElementById('id-ncbMainText').classList.add('cs-ncbMainTextDark');
            for (let i = 0; i < ncbNumber.length; i++) { ncbNumber[i].style.color = '#b88a48'; };
            document.getElementById('id-ncbTextTitle2').style.color = "white";
            document.getElementById('id-ncbSelectContainer').style.backgroundColor = '#333333';
            document.getElementById('id-ncbPanelP1').style.backgroundColor = '#5e5c5c';
            document.getElementById('id-ncbPanelP1').style.color = 'white';
            document.getElementById('id-ncbPanelP2').style.backgroundColor = '#5e5c5c';
            document.getElementById('id-ncbPanelP2').style.color = 'white';
            document.getElementById('id-ncbTextTitle2').style.color = '#b8afaf';
            break;
    }

}

function ncbClickedP() {

};