function ncbOpenVersion() {

    this.event.preventDefault();
    this.event.stopImmediatePropagation();

    if (openID) {
        ncbClose();
    } else {
        ncbClose();
        document.getElementById('id-ncbChangeVersionHeader').style.display = "block";
        document.getElementById('id-ncbChangeVersion').style.display = "block";
        document.getElementById('id-ncbVersionPointer').textContent = '▲';
        document.getElementById('id-ncbChangeVersion').scrollTop = 0;
        openID = true;
    };
};
//Change Version
function ncbChangeVersion(vid) {

    let id;
    if (!vid) { id = this.event.target.id; }
    else { id = `id-ncbChangeVersion${vid}`; };

    let eVersion = document.getElementById(id);
    let loaded = Number(eVersion.dataset.loaded);
    let version = eVersion.dataset.version;
    let content = eVersion.textContent;
    let eMenu = document.getElementById('id-ncbMenu');

    document.getElementById('id-ncbVersionText').textContent = version;
    document.getElementById('id-ncbTextTitle1').textContent = content;
    content = document.getElementById(`id-ncbBk${eMenu.dataset.bid}`).textContent;
    let content1 = document.getElementById(`id-ncbChp${eMenu.dataset.cn}`).textContent;
    document.getElementById('id-ncbTextTitle2').textContent = `${content} ${content1}`;

    if (!loaded) { ncbLoadAVersion(id); };
    ncbClose();
};

function ncbOpenBook() {
    this.event.preventDefault();
    this.event.stopImmediatePropagation();

    if (openID) {
        ncbClose();

    } else {
        ncbClose();
        document.getElementById('id-ncbChangeBook').style.display = "block";
        document.getElementById('id-ncbBookPointer').textContent = '▲';
        document.getElementById('id-ncbChangeBookHeader').style.display = "block";
        document.getElementById('id-ncbChangeBook').scrollTop = 0;
        openID = true;
    };
};
function ncbChangeBook() {

    let id = this.event.target.id;
    let eBook = document.getElementById(id);
    let eMenu = document.getElementById('id-ncbMenu');
    eMenu.dataset.bid = eBook.dataset.bid;
    eMenu.dataset.cn = 1;
    eMenu.dataset.chapters = eBook.dataset.c;
    document.getElementById('id-ncbTextTitle2').textContent = `${eBook.textContent} 1`;
    document.getElementById('id-ncbBookText').textContent = eBook.textContent;
    document.getElementById('id-ncbChapterText').textContent = '1 :';
    ncbLoadText();
    ncbLoadChapters();
    ncbLoadVerses();
    ncbClose();
};

function ncbSortBooks() {
    this.event.preventDefault();
    this.event.stopImmediatePropagation();

    var pointer = document.getElementById('id-ncbChangeBookHeaderPointer');

    if (document.getElementById('id-ncbSort').dataset.sorted === '0') {
        oldBooks.sort((a, b) => (a.t > b.t) ? 1 : -1);
        newBooks.sort((a, b) => (a.t > b.t) ? 1 : -1);
        document.getElementById('id-ncbSort').dataset.sorted = '1';
        pointer.textContent = '▲';
        document.getElementById('id-ncbSort').title = "Sort Biblically";
    } else {
        oldBooks.sort((a, b) => (a.id > b.id) ? 1 : -1);
        newBooks.sort((a, b) => (a.id > b.id) ? 1 : -1);
        document.getElementById('id-ncbSort').dataset.sorted = '0';
        pointer.textContent = '▼';
        document.getElementById('id-ncbSort').title = "Sort Alphabetically";
    }
    ncbLoadBooks();
}

function ncbOpenChapter() {

    this.event.preventDefault();
    this.event.stopImmediatePropagation();

    if (openID) {
        ncbClose();
    } else {
        ncbClose();
        document.getElementById('id-ncbChangeChapterHeader').style.display = "block";
        document.getElementById('id-ncbChangeChapter').style.display = "block";
        document.getElementById('id-ncbChapterPointer').textContent = '▲';
        document.getElementById('id-ncbChapterPointer').scrollTop = 0;
        openID = true;
    };

};
function ncbChangeChapter() {

    let id = this.event.target.id;
    let eChapter = document.getElementById(id);
    let eMenu = document.getElementById('id-ncbMenu');
    let eBook = document.getElementById('id-ncbBookText');

    eMenu.dataset.cn = eChapter.dataset.cn
    document.getElementById('id-ncbTextTitle2').textContent = `${eBook.textContent} ${eChapter.dataset.cn}`;
    document.getElementById('id-ncbChapterText').textContent = `${eChapter.dataset.cn} :`;

    ncbLoadText();
    ncbLoadChapters();
    ncbLoadVerses();
    ncbClose();
};

function ncbOpenVerse() {

    this.event.preventDefault();
    this.event.stopImmediatePropagation();

    if (openID) {
        ncbClose();
    } else {
        ncbClose();
        document.getElementById('id-ncbSelectVerseHeader').style.display = "block";
        document.getElementById('id-ncbSelectVerse').style.display = "block";
        document.getElementById('id-ncbVersePointer').textContent = '▲';
        document.getElementById('id-ncbVersePointer').scrollTop = 0;
        openID = true;
    };

};
function ncbSelectVerse() {

    let id = this.event.target.id;
    let eVerse = document.getElementById(id);
    let pID = `id-ncbSP${eVerse.dataset.cn}`;
    let pID2 = `id-ncbSP${eVerse.dataset.cn}-2`;
    let eParagraph = document.getElementById(pID);
    let eParagraph2 = document.getElementById(pID2);

    let eMenu = document.getElementById('id-ncbMenu');
    eMenu.dataset.vid = pID2.slice(0, -2);;

    eParagraph.scrollIntoView({ block: 'center' });
    eParagraph.style.backgroundColor = "#aed0fc";
    eParagraph2.style.backgroundColor = "#aed0fc";
    eParagraph2.style.paddingRight = '.3em';
    ncbClose();
};


function ncbAbout() {

};

function ncbSharePage() {

};

function ncbSettingsReset() {

    document.getElementById('id-ncbDefaultTheme').dataset.theme = 1;
    ncbApplyVersion(1);
    ncbApplyTheme();
    localStorage.removeItem('theme');
    localStorage.removeItem('versionidx');
    ncbClose();
}

function ncbClickP() {

    //let id = this.event.target.id;
    //let id2 = id.slice(0, -2);
    let eMenu = document.getElementById('id-ncbMenu');
    let id = eMenu.dataset.vid;
    if (id !== "") {
        let id2 = `${id}-2`;
        let eParagraph = document.getElementById(id);
        let eParagraph2 = document.getElementById(id2);
        eMenu.dataset.vid = '';
        eParagraph.style.backgroundColor = "white";
        eParagraph2.style.backgroundColor = "white";
        eParagraph2.style.paddingRight = '0';
    };
};