function openVersion() {

    this.event.preventDefault();
    this.event.stopImmediatePropagation();

    if (versionOpen) {
        ncbClose();
    } else {
        ncbClose();
        document.getElementById('id-changeVersionHeader').style.display = "flex";
        document.getElementById('id-changeVersion').style.display = "block";
        document.getElementById('id-versionPointer').textContent = '▲';
        document.getElementById('id-changeVersion').scrollTop = 0;
        versionOpen = true;
    };
};
//Change Version
async function changeVersion(vid) {
    let id;
    let res = false;
    if (!vid) { id = this.event.target.id;}
    else { id = `id-changeVersion${vid}`; };

    let i = 0;
    let pID;
    let pID2;
    let pID3;
    let sp = 'id-SP';
    let sp2 = 'id-number';
    let eVersion = document.getElementById(id);
    let version = eVersion.dataset.version;
    let content = eVersion.textContent;
    let eMenu = document.getElementById('id-menu');
    let avid = eMenu.dataset.vid;
    let vn = Number(eMenu.dataset.vn);
    //let content1 = document.getElementById(`id-chp${eMenu.dataset.cn}`).textContent;
    let eParagraph;
    let eParagraph2;
    let eParagraph3;

    ncbClose();
    if (!startup) { pushPage(); };
    if (version === 'AKJ' || version === 'ASV' || version === 'TWF') { content += ' Version' };
    document.getElementById('id-versionText').textContent = version;
    document.getElementById('id-textTitle1').textContent = content;
    content = document.getElementById(`id-bk${eMenu.dataset.bid}`).textContent;

    res = await loadAVersion(id);

    //ncbClose();
    if (res) {
        if ( eMenu.dataset.vid  !== '' ) {
            if ( eMenu.dataset.vids === '0') {
                if (avid !== 'id-SP1') {
                    eParagraph = document.getElementById(avid);
                    eParagraph.style.backgroundColor = "#aed0fc";
                    eParagraph.style.color = "black";
                };
                eParagraph2 = document.getElementById(`${avid}-2`);
                eParagraph2.style.backgroundColor = "#aed0fc";
                eParagraph2.style.color = "black";
                eParagraph2.style.paddingRight = '.3em';
            } else {
                while (i <= 2) {
                    pID = `${sp}${vn}`;
                    pID2 = `${pID}-2`;
                    pID3 = `${sp2}${i}-2`;

                    eParagraph = document.getElementById(pID);
                    eParagraph2 = document.getElementById(pID2);
                    eParagraph3 = document.getElementById(pID3);

                    eParagraph.style.backgroundColor = "#aed0fc";
                    eParagraph.style.color = "black";
                    eParagraph2.style.backgroundColor = "#aed0fc";
                    eParagraph2.style.color = "black";
                    eParagraph2.style.paddingRight = '.3em';
                    eParagraph3.textContent = eParagraph2.textContent;
                    vn++;
                    i++;
                };
                document.getElementById('id-verseText').textContent = 1;
                eParagraph2.scrollIntoView({ block: 'center' });
        };

    } else {
        if (!startup) {
            let eRandom = document.getElementById('id-randomLbl');
            let x = 0;
            let bid = Number(eRandom.dataset.bid);
            let cn = eRandom.dataset.cn;
            cn = Number(cn);
            let vn = eMenu.dataset.vn
            vn = Number(vn);
            let idx = eMenu.dataset.versionidx;
            idx - Number(idx);
            let verses = allVerses[idx];
            i = verses.findIndex(vrs => vrs.bid === bid && vrs.cn === cn && vrs.vn === vn);
            vn = Number(vn);
            while (x <= 2) {
                pID = `${sp2}${x}-2`;
                eParagraph = document.getElementById(pID);
                eParagraph.textContent = verses[i].vt;
                i++;
                vn++;
                x++;
            };
        };
    };
    };
    displayPrevious();
    //if (startup) { pushPage(); };
    startup = false;
    return Promise.resolve(true);
};

function displayPrevious(theMenu = null) {
    let eMenu;
    if (!theMenu) { eMenu = document.getElementById('id-menu'); } else { eMenu = theMenu };
    if (eMenu.dataset.bid === '1' && eMenu.dataset.cn === '1') {
        document.getElementById('id-last').style.display = 'none';
    } else if (eMenu.dataset.bid === '66' && eMenu.dataset.cn === '22') {
        document.getElementById('id-next').style.display = 'none';
        document.getElementById('id-last').style.display = 'block';
    } else {
        document.getElementById('id-last').style.display = 'block';
        document.getElementById('id-next').style.display = 'block';
    };


    if (eMenu.dataset.bid === '66' && eMenu.dataset.cn === '22') {
        document.getElementById('id-next').style.display = 'none';
    } else if (eMenu.dataset.bid === '66' && eMenu.dataset.cn === '22') {
        document.getElementById('id-next').style.display = 'none';
    } else {
        document.getElementById('id-next').style.display = 'block';
    };
};

function openBook() {
    this.event.preventDefault();
    this.event.stopImmediatePropagation();

    if (bookOpen) {
        ncbClose();
    } else {
        ncbClose();
        document.getElementById('id-changeBook').style.display = "block";
        document.getElementById('id-bookPointer').textContent = '▲';
        document.getElementById('id-changeBookHeader').style.display = "flex";
        document.getElementById('id-changeBook').scrollTop = 0;
        bookOpen = true;
    };
};

async function changeBook(bid = null) {

    let id;
    if (!bid) { id = this.event.target.id; }
    else { id = `id-bk${bid}`; };
    let eBook = document.getElementById(id);
    let eMenu = document.getElementById('id-menu');
    let eRandom = document.getElementById('id-randomLbl');
    let content;

    ncbClose();
    pushPage();
    if (eRandom.dataset.search === '0') {
        if (!bid) {
            eMenu.dataset.cn = 1;
            eMenu.dataset.bid = eBook.dataset.bid;
            eMenu.dataset.chapters = eBook.dataset.c;
            content = eBook.textContent;
        };
    } else if (eRandom.dataset.search === '1') {
        eMenu.dataset.cn = eRandom.dataset.cn;
        content = eRandom.dataset.t;
    };
    eRandom.dataset.search = '0';
    eMenu.dataset.vid = '';

    document.getElementById('id-verseText').textContent = '1';
    document.getElementById('id-bookText').textContent = content;

    loadText();
    loadChapters();
    loadVerses();
    //ncbClose();
    displayPrevious();
    if (!bid) {
        document.getElementById('id-textTitle2').textContent = `${content} 1`;
        document.getElementById('id-chapterText').textContent = '1';
        document.getElementById('id-bookFooter').textContent = `${content} 1`;
    } else {
        document.getElementById('id-textTitle2').textContent = `${content} ${eMenu.dataset.cn}`;
        document.getElementById('id-chapterText').textContent = `${eMenu.dataset.cn}`;
        document.getElementById('id-bookFooter').textContent = `${content} ${eMenu.dataset.cn}`;
    };
    return Promise.resolve(true);
};

function nav(navDirection) {

    this.event.stopPropagation();
    this.event.preventDefault();
    this.event.stopImmediatePropagation();
    let eMenu = document.getElementById('id-menu');
    let bid = Number(eMenu.dataset.bid);
    let cn = Number(eMenu.dataset.cn);
    let chapters = Number(eMenu.dataset.chapters);
    let id, eBook;
    // 0 = Last Chapter, 1 = Next Chapter
    if (navDirection === 0) {
        cn = cn - 1;
        if (cn < 1) { bid = bid - 1; };
    } else {
        cn = cn + 1;
        if (cn > chapters) { cn = 1; bid = bid + 1; };
    };
    id = `id-bk${bid}`;
    eBook = document.getElementById(id);
    if (cn === 0) { cn = eBook.dataset.c };
    eMenu.dataset.cn = cn;
    eMenu.dataset.bid = eBook.dataset.bid;
    eMenu.dataset.chapters = eBook.dataset.c;

    changeBook(bid);
    document.getElementById('id-bookText').textContent = eBook.textContent;
    document.getElementById('id-textTitle2').textContent = `${eBook.textContent} ${eMenu.dataset.cn}`;
    document.getElementById('id-bookFooter').textContent = `${eBook.textContent} ${eMenu.dataset.cn}`;
    document.getElementById('top').scrollIntoView(true);
};

function sortBooks() {
    this.event.preventDefault();
    this.event.stopImmediatePropagation();

    var pointer = document.getElementById('id-changeBookHeaderPointer');

    if (document.getElementById('id-sort').dataset.sorted === '0') {
        oldBooks.sort((a, b) => (a.t > b.t) ? 1 : -1);
        newBooks.sort((a, b) => (a.t > b.t) ? 1 : -1);
        document.getElementById('id-sort').dataset.sorted = '1';
        pointer.textContent = '▲';
        document.getElementById('id-sort').title = "Sort Biblically";
    } else {
        oldBooks.sort((a, b) => (a.id > b.id) ? 1 : -1);
        newBooks.sort((a, b) => (a.id > b.id) ? 1 : -1);
        document.getElementById('id-sort').dataset.sorted = '0';
        pointer.textContent = '▼';
        document.getElementById('id-sort').title = "Sort Alphabetically";
    }
    loadBooks();
}

function openChapter() {

    this.event.preventDefault();
    this.event.stopImmediatePropagation();

    if (chapterOpen) {
        ncbClose();
    } else {
        ncbClose();
        document.getElementById('id-changeChapterHeader').style.display = "flex";
        document.getElementById('id-changeChapter').style.display = "block";
        document.getElementById('id-chapterPointer').textContent = '▲';
        document.getElementById('id-chapterPointer').scrollTop = 0;
        chapterOpen = true;
    };

};
function changeChapter() {

    let id = this.event.target.id;
    let eChapter = document.getElementById(id);
    let eMenu = document.getElementById('id-menu');
    let eBook = document.getElementById('id-bookText');

    ncbClose();
    pushPage();
    eMenu.dataset.cn = eChapter.dataset.cn
    document.getElementById('id-textTitle2').textContent = `${eBook.textContent} ${eChapter.dataset.cn}`;
    document.getElementById('id-chapterText').textContent = `${eChapter.dataset.cn}`;
    document.getElementById('id-bookFooter').textContent = `${eBook.textContent} ${eChapter.dataset.cn}`;
    document.getElementById('id-verseText').textContent = '1';

    loadText();
    loadChapters();
    loadVerses();
    //ncbClose();
    displayPrevious();
};

function openVerse() {

    this.event.preventDefault();
    this.event.stopImmediatePropagation();

    if (verseOpen) {
        ncbClose();
    } else {
        ncbClose();
        document.getElementById('id-selectVerseHeader').style.display = "flex";
        document.getElementById('id-selectVerse').style.display = "block";
        document.getElementById('id-versePointer').textContent = '▲';
        document.getElementById('id-versePointer').scrollTop = 0;
        verseOpen = true;
    };

};

function selectVerse() {
    let id;
    let pID;
    let pID2;
    let eVerse;
    let eMenu = document.getElementById('id-menu');

    id = this.event.target.id;
    clickP();
    eVerse = document.getElementById(id);
    pID= `id-SP${eVerse.dataset.cn}`;
    pID2 = `id-SP${eVerse.dataset.cn}-2`;
    document.getElementById('id-verseText').textContent = eVerse.dataset.cn;

    let eParagraph = document.getElementById(pID);
    let eParagraph2 = document.getElementById(pID2);
    eParagraph.scrollIntoView({ block: 'center' });
    eParagraph2.style.backgroundColor = "#aed0fc";
    eParagraph2.style.color = "black";
    eParagraph2.style.paddingRight = '.3em';
    eMenu.dataset.vid = pID;
    eMenu.dataset.vids = 0;
    ncbClose();
};

function settingsReset() {

    document.getElementById('id-defaultTheme').dataset.theme = 1;
    if (document.getElementById('id-chapterPage')) { document.getElementById('id-chapterPage').style.fontSize = '1rem'; }
    if (document.getElementById('id-page')) { document.getElementById('id-page').style.fontSize = '1rem'; }

    if (localStorage.getItem('theme')) {localStorage.removeItem('theme')};
    if (localStorage.getItem('versionid')) {localStorage.removeItem('versionid')};
    if (localStorage.getItem('fontsize')) {localStorage.removeItem('fontsize')};

    theFont = 0;
    theme = 1;
    versionid = 1;

    applyTheme();
    applyDefaultVersion();
    changeVersion(versionid);
    applyDefaultFont();
    modal('Settings Reset!');
    ncbClose();
};

function clickP() {

    let x = 1;
    let bgc;
    let col = '#9e6105';
    let color, num, num2;

    this.event.stopPropagation();
    this.event.preventDefault();
    this.event.stopImmediatePropagation();

    let eMenu = document.getElementById('id-menu');
    let verse = Number(eMenu.dataset.verses);
    document.getElementById('id-verseText').textContent = 1;

    if (theme === 1) {
        bgc = 'white';
        color = 'black';
    } else {
        bgc = '#333333';
        color = '#cccccc';
    };

    if (eMenu.dataset.vid !== "") {
        for (let i = 0; i < verse; i++) {
            num = `id-SP${x}`;
            num2 = `${num}-2`;
            if (i > 0) {
                document.getElementById(num).style.backgroundColor = bgc;
                document.getElementById(num).style.color = col;
            };
            document.getElementById(num2).style.backgroundColor = bgc;
            document.getElementById(num2).style.color = color;
            x++;
        };
    };
    eMenu.dataset.vid = '';
    eMenu.dataset.vids = '';
    ncbClose();
};

function closeFooter() {

    if (footerOpen) {
        ncbClose();
        footerOpen = false;
        document.getElementById('id-footer').style.display = 'none';
    } else {
        ncbClose();
        footerOpen = true;
        document.getElementById('id-footer').style.display = 'block';
    };
};

function footer() {

    this.event.preventDefault();
    this.event.stopImmediatePropagation();
    closeFooter();
};

function sharePage() {
    alert('test sharePage');
};
// #region Scripts for media.txt, about.txt, mission.txt, statement.txt
async function fetchCode(url) {

    const res = await fetch(url, { mode: 'cors' });
    const text = await res.text();
    const code = await eval(text);
    return Promise.resolve(code);
};

function openList(id) {
    if (listOpen === false) {
        document.getElementById(id).style.display = "block";
        listOpen = true;
    } else {
        document.getElementById(id).style.display = "none";
        listOpen = false;
    }
};

function scrollPage(id) { document.getElementById(id).scrollIntoView(true) };

async function page() {

    this.event.stopPropagation();
    this.event.preventDefault();
    this.event.stopImmediatePropagation();
    let id = this.event.target.id;
    let html = '';

    document.getElementById('id-randomContainer').style.display = 'none';
    let eMenu = document.getElementById('id-menu');
    if (eMenu) { searchVersesidx = Number(eMenu.dataset.versionidx); };

    switch (id) {
        case 'id-footer1':
            sharePage()
            return;
        case 'id-footer2':
            if (aboutHTML === '') {
                let url = `${mainPath}/ASSETS/about.txt`;
                aboutHTML = await fetchCode(url);
            };
            html = aboutHTML;
            break;
        case 'id-footer3':
            if (missionHTML === '') {
                let url = `${mainPath}/ASSETS/mission.txt`;
                missionHTML = await fetchCode(url);
            };
            html = missionHTML;
            break;
        case 'id-footer4':
            if (statementHTML === '') {
                let url = `${mainPath}/ASSETS/statement.txt`;
                statementHTML = await fetchCode(url);
            };
            html = statementHTML;
            break;
        case 'id-footer5':
            if (movieHTML === '') {
                let url = `${mainPath}/ASSETS/TRIVIA/movie.txt`;
                movieHTML = await fetchCode(url);
            };
            html = movieHTML;
            break;
        case 'id-footer6':
            if (musicHTML === '') {
                let url = `${mainPath}/ASSETS/TRIVIA/music.txt`;
                musicHTML = await fetchCode(url);
            };
            html = musicHTML;
            break;
        case 'id-footer7':
            if (showHTML === '') {
                let url = `${mainPath}/ASSETS/TRIVIA/show.txt`;
                showHTML = await fetchCode(url);
            };
            html = showHTML;
            break;
        case 'id-footer8':
            if (testimonialHTML === '') {
                let url = `${mainPath}/ASSETS/TRIVIA/testimonial.txt`;
                testimonialHTML = await fetchCode(url);
            };
            html = testimonialHTML;
            break;
        case 'id-footer9':
            if (ministryHTML === '') {
                let url = `${mainPath}/ASSETS/TRIVIA/ministry.txt`;
                ministryHTML = await fetchCode(url);
            };
            html = ministryHTML;
            break;
        case 'id-searchImg':
            if (searchHTML === '') {
                let url = `${mainPath}/ASSETS/search.txt`;
                searchHTML = await fetchCode(url);
            };
            html = searchHTML;
            searchVerses = allVerses[searchVersesidx];
            break;
        default:
            break;
    };
    pushPage();
    changePage(html);
    closeFooter();
    if (id === 'id-searchImg') {
        footerOpen = false;
        document.getElementById('id-footer').style.display = 'none';
        document.getElementById('id-localSearch').focus();
        //if (firstSearch) { addSearchEvents(); };
        addSearchEvents();
    } else {
        if(settingsOpen === true) { openSettings(); };
    };
};

function changePage(html) {

    removeItems('id-mainText');
    document.getElementById('id-mainText').insertAdjacentHTML("afterbegin", html);
    if (theFont === 0) {
        document.getElementById('id-page').style.fontSize = '1.1rem';
    } else {
        document.getElementById('id-page').style.fontSize = theFont;
    };
};

function pushPage() {

    stateObject.innerHTML.push(document.getElementById('id-mainText').innerHTML);
    stateObject.variablesHTML.push(document.getElementById('id-variableScript').innerHTML);
    window.history.pushState(stateObject, null, null);
    document.getElementById('top').scrollIntoView(true);
    aClick++;
};

function navBack(){
    this.event.stopPropagation();
    this.event.preventDefault();
    this.event.stopImmediatePropagation();
    window.history.back();
}

window.addEventListener('popstate', (event) => {

    if (aClick > 0) {

        removeItems('id-mainText');
        removeItems('id-variableScript');
        aClick--;
        document.getElementById('id-mainText').insertAdjacentHTML("afterbegin", stateObject.innerHTML[aClick]);
        document.getElementById('id-variableScript').insertAdjacentHTML("afterbegin", stateObject.variablesHTML[aClick]);
        stateObject.innerHTML.pop();
        stateObject.variablesHTML.pop();

        if (document.getElementById('id-chapterPage')) {
            if (theFont === 0) {
                document.getElementById('id-chapterPage').style.fontSize = '1.1rem';
            } else {
                document.getElementById('id-chapterPage').style.fontSize = theFont;
            };
        };
        if (document.getElementById('id-page')) {
            if (theFont === 0) {
                document.getElementById('id-page').style.fontSize = '1.1rem';
            } else {
                document.getElementById('id-page').style.fontSize = theFont;
            };
        };
        document.getElementById('top').scrollIntoView(true);
    };
if (document.getElementById('id-searchPage')) { addSearchEvents(); search(); };
if (aClick === 0)  document.getElementById('id-randomContainer').style.display = 'block';
});
// #endregion Scripts for media.txt, about.txt, mission.txt, statement.txt