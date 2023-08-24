function ncbSpanHover(id) {
    if (spanHover) {
        document.getElementById(id).style = "border-top: 5px solid white;";
        spanHover = false;
    } else {
        document.getElementById(id).style = "border-top: 5px solid #025c8d;";
        spanHover = true;
    };
};

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

};
function ncbChangeBook() {

};

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