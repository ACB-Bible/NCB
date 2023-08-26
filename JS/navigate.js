

function ncbOpenVersion() {

    this.event.preventDefault();
    this.event.stopImmediatePropagation();

    if (openID) {
        ncbClose();
    } else {
        ncbClose();
        document.getElementById('id-ncbChangeVersion').style.display = "block";
        document.getElementById('id-ncbVersionPointer').textContent = '▲';

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
        oldAlph = oldBooks;
        oldBooks.sort((a, b) => (a.t > b.t) ? 1 : -1);
        newAlph = newBooks;
        newBooks.sort((a, b) => (a.id > b.id) ? 1 : -1);
        document.getElementById('id-ncbSort').dataset.sorted = '1';
    }
    
    if (pointer.textContent === '▼') {
        pointer.textContent = '▲';
        document.getElementById('id-ncbSort').title = "Sort Biblically";
    } else {
        pointer.textContent = '▼';
        document.getElementById('id-ncbSort').title = "Sort Alphabetically";
    };




}
function ncbOpenChapter() {

};
function ncbChangeChapter() {

};

function ncbOpenVerse() {

};
function ncbSelectVerse() {

};

function ncbAbout() {

};

function ncbSharePage() {

};