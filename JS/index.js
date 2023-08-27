
window.onload = async () => {

    document.getElementById("id-ncbIntro").textContent = "New Christian Bible";
    if (sidePanelLoaded) {
        var theme = localStorage.getItem("theme");
        if (!theme) {theme = 'Light'};
        var versionID = localStorage.getItem("versionID");
        if (!versionID) {versionID = 'id-ncbDefaultVersion0'};

        document.getElementById('id-ncbDefaultTheme').dataset.theme = theme;
        document.getElementById('id-ncbVersion').dataset.bookid = versionID;
        document.getElementById('id-ncbBook').dataset.bookid = 'id-ncbBook0';
        document.getElementById('id-ncbChapter').dataset.chapterid = 'id-ncbChapter0';
        document.getElementById('id-ncbVerse').dataset.verseid = 'id-ncbverse0';

        ncbStartup();
    };
}

async function ncbStartup() {

    let res = false;
    ncbApplyTheme();
    res = await ncbLoadVersions();
    //if (res) { ncbLoadBooks() };
    if (res) { ncbApplyVersion() };
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

async function ncbLoadBooks(books) {

    let i = 0;

    ncbRemoveItems('id-ncbChangeBook');
    books.forEach(book => {
        let div = document.createElement("div");
        div.addEventListener('click', function(event) {
            event.stopPropagation();
            event.preventDefault();
            event.stopImmediatePropagation();
            ncbChangeBook();
          });
        div.id = `id-acbBk${book.id}`;
        div.textContent = book.t;
        div.dataset.bid = book.id;
        div.dataset.c = book.c;
        div.classList.add('cs-acbSelect');
        document.getElementById("id-ncbChangeBook").appendChild(div);
        i++;
    });
    return Promise.resolve(true);
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