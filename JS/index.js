
window.onload = async () => {

    const theme = localStorage.getItem("theme");
    document.getElementById("id-ncbIntro").textContent = "New Christian Bible";
    if (theme) { if (themeLoaded) { ncbApplyTheme(theme) } };
    let res = false;
    //if (localStorage.getItem("loaded")) {localStorage.removeItem("loaded")};
    res = await ncbLoadVersions();
    //res = await acbLoadBooks(oldBooks);
}

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

async function acbLoadBooks(books) {

    let i = 0;

    acbRemoveItems('id-ncbChangeBook');
    books.forEach(book => {
        let sp = document.createElement("span");
        sp.addEventListener("click", acbChangeBook, true);
        sp.id = `id-acbBk${book.id}`;
        sp.textContent = book.t;
        sp.dataset.bid = book.id;
        sp.dataset.c = book.c;
        sp.dataset.idx = i;
        sp.classList.add('cs-acbSelect');
        document.getElementById("id-ncbChangeBook").appendChild(sp);
        i++;
    });
    return Promise.resolve(true);
};

function ncbClickedP() {

};