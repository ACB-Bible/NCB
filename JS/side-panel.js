var sidePanelLoaded = true;
var sidePanelChapter = 'Genesis 1:31'

function ncbSwapPanel() {
    if (panelSwapped) {
        document.getElementById('id-ncbPanelP1').style.display = "none";
        document.getElementById('id-ncbPanelP2').style.display = "block";
        document.getElementById('id-ncbPanelLbl1').textContent = "Settings";
        panelSwapped = false;
    } else {
        document.getElementById('id-ncbPanelP1').style.display = "block";
        document.getElementById('id-ncbPanelP2').style.display = "none";
        document.getElementById('id-ncbPanelLbl1').textContent = sidePanelChapter;
        panelSwapped = true;
    };
};

function ncbReadChapter() {

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

    document.getElementById('id-ncbVersion').dataset.version = version;
    document.getElementById('id-ncbVersion').dataset.versionidx = versionidx;
    document.getElementById('id-ncbDefaultVersionSpan').textContent = version;
    document.getElementById('id-ncbDefaultVersionSpan').dataset.versionidx = versionidx;
    document.getElementById('id-ncbVersionText').textContent = version;
    document.getElementById('id-ncbTextTitle1').textContent = document.getElementById(id).textContent;

    localStorage.setItem("versionidx", versionidx);
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

    var theme = document.getElementById(this.event.target.id).dataset.theme;
    document.getElementById('id-ncbDefaultTheme').dataset.theme = theme;
    ncbApplyTheme();
    localStorage.setItem("theme", theme);
    ncbClose();
};

function ncbRemoveItems(id) {

    let el = document.getElementById(id);
    while (el.firstChild) {
        el.removeChild(el.firstChild);
    };
};

function ncbClose() {

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
}
function ncbRemoveSearch() {
    document.getElementById('id-ncbSearchLbl').textContent = '';
    document.getElementById('id-ncbClear').style.visibility = 'visible'

}
function ncbSearch() {
    document.getElementById('id-ncbSearchLbl').textContent = 'Temporary';
    document.getElementById('id-ncbClear').style.visibility = 'hidden'
    document.getElementById('id-ncbClear').style.visibility = 'visible'
}

// container.insertAdjacentHTML('beforeend', '<p>This is a dynamically created paragraph using insertAdjacentHTML.</p>');
