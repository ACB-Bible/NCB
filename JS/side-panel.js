var sidePanelLoaded = true;
var sidePanelChapter = 'Genesis 1:31'

function swapPanel() {
    //if (document.getElementById('id-page')) { panelSwapped = true; return; };
    if (panelSwapped) {
        document.getElementById('id-panelP1').style.display = "none";
        document.getElementById('id-panelP2').style.display = "block";
        document.getElementById('id-panelLbl1').textContent = "Settings";
        panelSwapped = false;
    } else {
        document.getElementById('id-panelP1').style.display = "block";
        document.getElementById('id-panelP2').style.display = "none";
        document.getElementById('id-panelLbl1').textContent = 'Random Verses';
        panelSwapped = true;
    };
};

async function readChapter() {

    let eMenu = document.getElementById('id-menu');
    let eRandom = document.getElementById('id-panelLbl');
    let head = eRandom.dataset.t;
    let res = false;

    let bid = Number(eRandom.dataset.bid);
    if (bid < 40) {
        book = oldBooks;
    } else {
        book = newBooks;
    };

    eMenu.dataset.bid = eRandom.dataset.bid;
    eMenu.dataset.cn = eRandom.dataset.cn;

    eRandom.dataset.search = 1;
    res = await changeBook();
    eRandom.dataset.search = 0;

    let i = book.findIndex(books => books.id === bid);
    eMenu.dataset.chapters = book[i].c;
    document.getElementById('id-bookText').textContent = head;
    document.getElementById('id-verseText').textContent = 1;
    document.getElementById('id-chapterText').textContent = `${eRandom.dataset.cn}`;
    head += ` ${eRandom.dataset.cn}`;
    document.getElementById('id-textTitle2').textContent = head;
    if (res) {
        if ( eMenu.dataset.vn  !== '' ) {
            let i = 0;
            let vn = Number(eMenu.dataset.vn);
            let sp = 'id-SP';
            let pID = `${sp}${vn}`;
            let pID2 = `${pID}-2`;

            eMenu.dataset.vid = pID;
            eMenu.dataset.vids = 1;
            let eParagraph = document.getElementById(pID);
            let eParagraph2 = document.getElementById(pID2);

            while (i <= 3) {
                eParagraph = document.getElementById(pID);
                eParagraph.style.backgroundColor = "#aed0fc";
                eParagraph.style.color = '#720D0D';
                eParagraph2 = document.getElementById(pID2);
                eParagraph2.style.backgroundColor = "#aed0fc";
                eParagraph2.style.color = 'black';
                eParagraph2.style.paddingRight = '.3em';

                pID = `${sp}${vn}`;
                pID2 = `${pID}-2`;
                i++;
                vn++;
            };
            eParagraph.scrollIntoView({ block: 'center' });
        };
    };
    loadChapters();
};

function openDefaultVersion() {

    this.event.preventDefault();
    this.event.stopImmediatePropagation();

    if (openID) {
        ncbClose();
    } else {
        ncbClose();
        document.getElementById('id-defaultVersion').style.display = "block";
        document.getElementById('id-defaultVersionPointer').textContent = '▲';
        document.getElementById('id-defaultVersion').scrollTop = 0;
        openID = true;
    };
};

async function defaultVersion() {

    let id = this.event.target.id;
    let version = document.getElementById(id).dataset.version;
    let versionidx = document.getElementById(id).dataset.versionidx;
    versionid = document.getElementById(id).dataset.versionid;
    document.getElementById('id-version').dataset.version = version;
    document.getElementById('id-version').dataset.versionidx = versionidx;
    document.getElementById('id-defaultVersionSpan').textContent = version;

    document.getElementById('id-versionText').textContent = version;
    document.getElementById('id-textTitle1').textContent = document.getElementById(id).textContent;

    localStorage.setItem("versionid", versionid);
    changeVersion(versionid);
    ncbClose();

};

function openDefaultTheme() {
    this.event.preventDefault();
    this.event.stopImmediatePropagation();

    if (openID) {
        ncbClose();
    } else {
        ncbClose();
        document.getElementById('id-defaultTheme').style.display = "block";
        document.getElementById('id-defaultThemePointer').textContent = '▲';
        openID = true;
    };
};

function defaultTheme() {
    this.event.preventDefault();
    this.event.stopImmediatePropagation();

    let eMenu = document.getElementById('id-menu');
    let eVersion = document.getElementById('id-version');
    let vid = document.getElementById('id-version').dataset.versionid;
    theme = document.getElementById(this.event.target.id).dataset.theme;
    theme = Number(theme);
    document.getElementById('id-defaultTheme').dataset.theme = theme;
    applyTheme();
    localStorage.setItem("theme", theme);
    ncbClose();
    let p = eMenu.dataset.vid;
    let ps = eMenu.dataset.vids;
    clickP();
    eMenu.dataset.vid = p;
    eMenu.dataset.vids = ps;
    eVersion.dataset.deftheme = 1;
    changeVersion(vid);
    eVersion.dataset.deftheme = '';
};

function defaultFont() {

    if (theFont === 0) { return; }
    localStorage.setItem("fontsize", theFont);
    modal('Font Saved!')
};

function modal(msg) {

    let id = this.event.target.id;
    let element = document.getElementById(id);
    let rect = element.getBoundingClientRect();
    let top = `${rect.top * .85}px`;
    let left = `${rect.left * .85}px`;

    document.getElementById('id-modal').textContent = msg;
    document.getElementById('id-modal').style.left = left;
    document.getElementById('id-modal').style.top = top;
    document.getElementById('id-modal').style.display = 'block';
    setTimeout(() => {
        document.getElementById('id-modal').style.display = 'none';
      }, "1100");
};

function removeItems(id) {

    let el = document.getElementById(id);
    while (el.firstChild) {
        el.removeChild(el.firstChild);
    };
};

function ncbClose() {

    if (!document.body.contains(document.getElementById('id-menu'))) { return; }
    openID = false;
    document.getElementById('id-changeVersionHeader').style.display = "none";
    document.getElementById('id-changeVersion').style.display = "none";
    document.getElementById('id-versionPointer').textContent = '▼';
    document.getElementById('id-changeBookHeader').style.display = "none";
    document.getElementById('id-changeBookHeaderPointer').textContent = '▼';
    document.getElementById('id-changeBook').style.display = "none";
    document.getElementById('id-bookPointer').textContent = '▼';
    document.getElementById('id-changeChapterHeader').style.display = "none";
    document.getElementById('id-changeChapter').style.display = "none";
    document.getElementById('id-chapterPointer').textContent = '▼';
    document.getElementById('id-selectVerseHeader').style.display = "none";
    document.getElementById('id-selectVerse').style.display = "none";
    document.getElementById('id-versePointer').textContent = '▼';

    document.getElementById('id-defaultVersion').style.display = "none";
    document.getElementById('id-defaultVersionPointer').textContent = '▼';
    document.getElementById('id-defaultTheme').style.display = "none";
    document.getElementById('id-defaultThemePointer').textContent = '▼';
};

function clearSearch() {
    document.getElementById('id-searchLbl').textContent = 'Search is not working';
    document.getElementById('id-clear').style.visibility = 'hidden'
};
function removeSearch() {
    document.getElementById('id-searchLbl').textContent = '';
    document.getElementById('id-clear').style.visibility = 'visible'

};
function search() {
    document.getElementById('id-searchLbl').textContent = 'Temporary';
    document.getElementById('id-clear').style.visibility = 'hidden'
    document.getElementById('id-clear').style.visibility = 'visible'
};

