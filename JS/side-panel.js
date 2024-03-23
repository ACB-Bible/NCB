var sidePanelLoaded = true;

async function readRandomChapter() {

    let res = false;
    let verses = gAllVerses[gAllVersesIDX];
    let bid = Number(verses[gRandomVerseIDX].bid);
    let cn = Number(verses[gRandomVerseIDX].cn);
    let vn = Number(verses[gRandomVerseIDX].vn);
    let scrollID = `id-SP${vn}`;

    if (bid < 40) { book = oldBooks; } else { book = newBooks; };
    let idx = book.findIndex(books => Number(books.id) === Number(bid));
    let head = book[idx].t;

    gRandomSearchIsHighlighted = 1;
    res = await changeBook(bid);
    gRandomSearchIsHighlighted = 0;

    document.getElementById('id-bookText').textContent = head;
    document.getElementById('id-verseText').textContent = 1;
    document.getElementById('id-chapterText').textContent = cn;
    head += ` ${cn}`;
    document.getElementById('id-textTitle2').textContent = head;
    if (res) { if (vn !== 0) { res = await randomHighlights(vn); }; };
    if (res) {
        loadChapters();
        document.getElementById(scrollID).scrollIntoView({block: 'center'});
    };
    return Promise.resolve(true);
};

async function randomHighlights(vn) {

    let i = 0;
    let sp = 'id-SP';
    let pID = `${sp}${vn}`;
    let pID2 = `${pID}-2`;

    gVerseHighlightedID = pID;
    gVerseIsHighlighted = 1;
    let eParagraph = document.getElementById(pID);
    let eParagraph2 = document.getElementById(pID2);
    while (i <= 3) {
        eParagraph = document.getElementById(pID);
        eParagraph.style.backgroundColor = '#aed0fc';
        eParagraph.style.color = '#720D0D';
        eParagraph2 = document.getElementById(pID2);
        eParagraph2.style.backgroundColor = '#aed0fc';
        eParagraph2.style.color = 'black';
        eParagraph2.style.paddingRight = '.3em';

        pID = `${sp}${vn}`;
        pID2 = `${pID}-2`;
        i++;
        vn++;
    };
    return Promise.resolve(true);
};

async function defaultVersion() {

    let id = this.event.target.id;
    let vrsnid = Number(id.replace('id-defaultVersion', ''));
    gVersionIDX = versions.findIndex(vrsn => Number(vrsn.id) === Number(vrsnid));
    gVersionID = versions[gVersionIDX].id;
    document.getElementById('id-defaultVersionSpan').textContent = versions[gVersionIDX].ar;
    document.getElementById('id-versionText').textContent = versions[gVersionIDX].ar;
    document.getElementById('id-textTitle1').textContent = versions[gVersionIDX].vn;
    localStorage.setItem('gVersionID', gVersionID);
    changeVersion(id);
    ncbClose();
};

function defaultTheme() {

    this.event.stopPropagation();
    this.event.preventDefault();
    this.event.stopImmediatePropagation();
    let id = this.event.target.id;

    gTheme = Number(id.replace('id-defaultTheme', ''));
    applyTheme();
    localStorage.setItem('gTheme', gTheme);
    ncbClose();
    let p = gVerseHighlightedID;
    let ps = gVerseIsHighlighted;
    clickP();
    gVerseHighlightedID = p;
    gVerseIsHighlighted = ps;
};

function settingsReset() {

    if (document.getElementById('id-chapterPage')) { document.getElementById('id-chapterPage').style.fontSize = '1rem'; }
    if (localStorage.getItem('gTheme')) {localStorage.removeItem('gTheme')};
    if (localStorage.getItem('gVersionID')) {localStorage.removeItem('gVersionID')};
    if (localStorage.getItem('fontsize')) {localStorage.removeItem('fontsize')};

    gFont = 0;
    gTheme = 1;
    gVersionID = 1;
    gVersionIDX = 13;
    document.getElementById('id-defaultVersionSpan').textContent = versions[gVersionIDX].ar;
    document.getElementById('id-defaultThemeSpan').textContent = 'Light';

    applyTheme();
    changeVersion(true);
    applyDefaultFont();
    modal('Settings Reset!');
    ncbClose();
};

function saveDefaultFont() {

    if (gFont === 0) { return; }
    localStorage.setItem('fontsize', gFont);
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
      }, '1100');
};

function removeItems(id) {

    let el = document.getElementById(id);
    while (el.firstChild) {
        el.removeChild(el.firstChild);
    };
};

function ncbClose() {

    if (!document.body.contains(document.getElementById('id-menu'))) { return; }

    gFooterOpen = false;
    gListOpen = false;

    document.getElementById('id-versionPointer').textContent = '▼';
    document.getElementById('id-versionHeader').style.display = 'none';
    document.getElementById('id-versionSelector').style.display = 'none';

    document.getElementById('id-bookPointer').textContent = '▼';
    document.getElementById('id-bookHeader').style.display = 'none';
    document.getElementById('id-bookSelector').style.display = 'none';

    document.getElementById('id-chapterPointer').textContent = '▼';
    document.getElementById('id-chapterHeader').style.display = 'none';
    document.getElementById('id-chapterSelector').style.display = 'none';

    document.getElementById('id-versePointer').textContent = '▼';
    document.getElementById('id-verseHeader').style.display = 'none';
    document.getElementById('id-verseSelector').style.display = 'none';

    document.getElementById('id-defaultVersionPointer').textContent = '▼';
    document.getElementById('id-defaultVersionSelector').style.display = 'none';

    document.getElementById('id-defaultThemePointer').textContent = '▼';
    document.getElementById('id-defaultThemeSelector').style.display = 'none';

    document.getElementById('id-footer').style.display = 'none';
    document.getElementById('id-toTop').style.display = 'block';
};

function openSettings() {

    if (gSettingsOpen) {
        ncbClose();
        document.getElementById('id-settingsContainer').style.display = 'none';
        gSettingsOpen = false;
    } else {
        ncbClose();
        document.getElementById('id-settingsContainer').style.display = 'block';
        gSettingsOpen = true;
    };
    if (gFooterOpen === true) { closeFooter(); };
    document.getElementById('id-randomContainer').style.display = 'block';
};

function settings() {
    this.event.stopPropagation();
    this.event.preventDefault();
    this.event.stopImmediatePropagation();
    openSettings();
};
