// #region versionLoaded and theme Loaded are on used at startup
var versionLoaded = true;
var themeLoaded = true;
// #endregion versionLoaded and theme Loaded are on used at startup

var sidePanelChapter = 'Genesis 1:31'

function ncbSwapPanel() {
    if (panelSwapped) {
        document.getElementById('id-ncbPanelP1').style.display = "none";
        document.getElementById('id-ncbPanelP2').style.display = "block";
        document.getElementById('id-ncbPanelLbl1').textContent = "Set Defaults";
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
        openID = true;
    };
};

async function ncbDefaultVersion() {

    var id = this.event.target.id;
    var version = document.getElementById(id).dataset.version;
    document.getElementById('id-ncbDefaultVersionSpan').textContent = version;
    document.getElementById('id-ncbVersionText').textContent = version;
    document.getElementById('id-ncbTextTitle1').textContent = document.getElementById(id).textContent;

    localStorage.setItem("version", version);
    ncbClose();
};

async function ncbApplyTheme(id) {

    const ncbNumber = document.getElementsByClassName("cs-ncbNumber");

    switch (id) {
        case 'Light':
            document.getElementById('id-ncbDefaultThemeSpan').textContent = id;
            document.getElementById('id-ncbMainText').classList.remove('cs-ncbMainTextDark');
            for (let i = 0; i < ncbNumber.length; i++) { ncbNumber[i].style.color = '#9e6105'; };
            document.getElementById('id-ncbTextTitle2').style.color = '#720D0D';
            document.getElementById('id-ncbSelectContainer').style.backgroundColor = '#cbcaca';
            document.getElementById('id-ncbPanelP1').style.color = '#333333';
            document.getElementById('id-ncbPanelP1').style.backgroundColor = 'white';
            document.getElementById('id-ncbPanelP2').style.color = '#333333';
            document.getElementById('id-ncbPanelP2').style.backgroundColor = '#dfdcdc';
            break;
        case 'Dark':
            document.getElementById('id-ncbDefaultThemeSpan').textContent = id;
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
    var id = document.getElementById(this.event.target.id).dataset.theme;

    ncbApplyTheme(id);
    localStorage.setItem("theme", id);
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
    /*
    document.getElementById('id-ncbBook').style.display = "none";
    document.getElementById('id-ncbChapter').style.display = "none";
    document.getElementById('id-ncbVerse').style.display = "none";
    */
    document.getElementById('id-ncbChangeVersion').style.display = "none";
    document.getElementById('id-ncbVersionPointer').textContent = '▼';

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
