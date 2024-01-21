var sidePanelLoaded = true;
var sidePanelChapter = 'Genesis 1:31'

function ncbSwapPanel() {
    //if (document.getElementById('id-ncbPage')) { panelSwapped = true; return; };
    if (panelSwapped) {
        document.getElementById('id-ncbPanelP1').style.display = "none";
        document.getElementById('id-ncbPanelP2').style.display = "block";
        document.getElementById('id-ncbPanelLbl1').textContent = "Settings";
        panelSwapped = false;
    } else {
        document.getElementById('id-ncbPanelP1').style.display = "block";
        document.getElementById('id-ncbPanelP2').style.display = "none";
        document.getElementById('id-ncbPanelLbl1').textContent = 'Random Verses';
        panelSwapped = true;
    };
};

async function ncbReadChapter() {

    let eMenu = document.getElementById('id-ncbMenu');
    let eRandom = document.getElementById('id-ncbPanelLbl');
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
    res = await ncbChangeBook();
    eRandom.dataset.search = 0;

    let i = book.findIndex(books => books.id === bid);
    eMenu.dataset.chapters = book[i].c;
    document.getElementById('id-ncbBookText').textContent = head;
    document.getElementById('id-ncbVerseText').textContent = 1;
    document.getElementById('id-ncbChapterText').textContent = `${eRandom.dataset.cn} :`;
    head += ` ${eRandom.dataset.cn}`;
    document.getElementById('id-ncbTextTitle2').textContent = head;
    if (res) {
        if ( eMenu.dataset.vn  !== '' ) {
            let i = 0;
            let vn = Number(eMenu.dataset.vn);
            let sp = 'id-ncbSP';
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
    ncbLoadChapters();
};

function ncbShareChapter() {

};

function ncbOpenDefaultVersion() {

    this.event.preventDefault();
    this.event.stopImmediatePropagation();

    if (openID) {
        ncbClose();
    } else {
        ncbClose();
        document.getElementById('id-ncbDefaultVersion').style.display = "block";
        document.getElementById('id-ncbDefaultVersionPointer').textContent = '▲';
        document.getElementById('id-ncbDefaultVersion').scrollTop = 0;
        openID = true;
    };
};

async function ncbDefaultVersion() {

    let id = this.event.target.id;
    let version = document.getElementById(id).dataset.version;
    let versionidx = document.getElementById(id).dataset.versionidx;
    versionid = document.getElementById(id).dataset.versionid;
    document.getElementById('id-ncbVersion').dataset.version = version;
    document.getElementById('id-ncbVersion').dataset.versionidx = versionidx;
    document.getElementById('id-ncbDefaultVersionSpan').textContent = version;

    document.getElementById('id-ncbVersionText').textContent = version;
    document.getElementById('id-ncbTextTitle1').textContent = document.getElementById(id).textContent;

    localStorage.setItem("versionid", versionid);
    ncbChangeVersion(versionid);
    ncbClose();

};

function ncbOpenDefaultTheme() {
    this.event.preventDefault();
    this.event.stopImmediatePropagation();

    if (openID) {
        ncbClose();
    } else {
        ncbClose();
        document.getElementById('id-ncbDefaultTheme').style.display = "block";
        document.getElementById('id-ncbDefaultThemePointer').textContent = '▲';
        openID = true;
    };
};

function ncbDefaultTheme() {
    this.event.preventDefault();
    this.event.stopImmediatePropagation();

    let eMenu = document.getElementById('id-ncbMenu');
    let eVersion = document.getElementById('id-ncbVersion');
    let vid = document.getElementById('id-ncbVersion').dataset.versionid;
    theme = document.getElementById(this.event.target.id).dataset.theme;
    theme = Number(theme);
    document.getElementById('id-ncbDefaultTheme').dataset.theme = theme;
    ncbApplyTheme();
    localStorage.setItem("theme", theme);
    ncbClose();
    let p = eMenu.dataset.vid;
    let ps = eMenu.dataset.vids;
    ncbClickP();
    eMenu.dataset.vid = p;
    eMenu.dataset.vids = ps;
    eVersion.dataset.deftheme = 1;
    ncbChangeVersion(vid);
    eVersion.dataset.deftheme = '';
};

function ncbDefaultFont() {

    if (theFont === 0) { return; }
    localStorage.setItem("fontsize", theFont);
    ncbModalSave('Font Saved!')
};

function ncbModalSave(msg) {

    document.getElementById('id-ncbModalSave').textContent = msg;
    document.getElementById("id-ncbModalSave").style.left = `${x - 150}px`;
    document.getElementById("id-ncbModalSave").style.top = `${y - 120.5}px`;
    document.getElementById('id-ncbModalSave').setAttribute('class', 'cs-ncbModalSave');
    document.getElementById('id-ncbModalSave').style.display = 'block';
    setTimeout(() => {
        document.getElementById('id-ncbModalSave').classList.remove("cs-ncbModalSave");
        document.getElementById('id-ncbModalSave').style.display = 'none';
      }, "1100");
};

function ncbRemoveItems(id) {

    let el = document.getElementById(id);
    while (el.firstChild) {
        el.removeChild(el.firstChild);
    };
};

function ncbClose() {

    if (!document.body.contains(document.getElementById('id-ncbMenu'))) { return; }
    openID = false;
    document.getElementById('id-ncbChangeVersionHeader').style.display = "none";
    document.getElementById('id-ncbChangeVersion').style.display = "none";
    document.getElementById('id-ncbVersionPointer').textContent = '▼';
    document.getElementById('id-ncbChangeBookHeader').style.display = "none";
    document.getElementById('id-ncbChangeBookHeaderPointer').textContent = '▼';
    document.getElementById('id-ncbChangeBook').style.display = "none";
    document.getElementById('id-ncbBookPointer').textContent = '▼';
    document.getElementById('id-ncbChangeChapterHeader').style.display = "none";
    document.getElementById('id-ncbChangeChapter').style.display = "none";
    document.getElementById('id-ncbChapterPointer').textContent = '▼';
    document.getElementById('id-ncbSelectVerseHeader').style.display = "none";
    document.getElementById('id-ncbSelectVerse').style.display = "none";
    document.getElementById('id-ncbVersePointer').textContent = '▼';

    document.getElementById('id-ncbDefaultVersion').style.display = "none";
    document.getElementById('id-ncbDefaultVersionPointer').textContent = '▼';
    document.getElementById('id-ncbDefaultTheme').style.display = "none";
    document.getElementById('id-ncbDefaultThemePointer').textContent = '▼';
};

function ncbClearSearch() {
    document.getElementById('id-ncbSearchLbl').textContent = 'Search is not working';
    document.getElementById('id-ncbClear').style.visibility = 'hidden'
};
function ncbRemoveSearch() {
    document.getElementById('id-ncbSearchLbl').textContent = '';
    document.getElementById('id-ncbClear').style.visibility = 'visible'

};
function ncbSearch() {
    document.getElementById('id-ncbSearchLbl').textContent = 'Temporary';
    document.getElementById('id-ncbClear').style.visibility = 'hidden'
    document.getElementById('id-ncbClear').style.visibility = 'visible'
};

