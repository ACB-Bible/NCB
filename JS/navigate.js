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
function ncbChangeVersion() {

    var id = this.event.target.id;

    document.getElementById('id-ncbVersionText').textContent = document.getElementById(id).dataset.version;
    document.getElementById('id-ncbTextTitle1').textContent = document.getElementById(id).textContent;

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