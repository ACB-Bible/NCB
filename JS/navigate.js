
//Change Version
async function changeVersion(vid) {

    let i = 0;
    let id = '';
    let numberSpan = 'id-number';
    let res = false;

    if (!vid) {
        id = this.event.target.id;
        let vrsnid = Number(id.replace('id-version', ''));
        gVersionIDX = versions.findIndex(vrsn => Number(vrsn.id) === Number(vrsnid));
    } else { id = `id-version${versions[gVersionIDX].id}`; };

    gVersionID = versions[gVersionIDX].id
    let versionAbreviation = versions[gVersionIDX].ar; // Version Abreviation
    let versionName = versions[gVersionIDX].vn; // Version Name
    let verseNumber = Number(gVerseHighlightedID.replace('id-SP', '')); // Verse Number

    let eVerse;
    let eVerse2;
    let eVerse3;

    ncbClose();
    if (!gStartup) { pushPage(); };
    if (versionAbreviation === 'AKJ' || versionAbreviation === 'ASV' || versionAbreviation === 'TWF') { versionName += ' Version' };
    document.getElementById('id-versionText').textContent = versionAbreviation;
    document.getElementById('id-textTitle1').textContent = versionName;

    if (gBookID < 40) { book = oldBooks; } else { book = newBooks; };
    i = book.findIndex(books => Number(books.id) === Number(gBookID));
    document.getElementById('id-bookText').textContent = book[i].t;
    document.getElementById('id-chapterText').textContent = gChapterNumber;
    document.getElementById('id-textTitle2').textContent = `${book[i].t} ${gChapterNumber}`;
    i = 0;

    res = await loadAVersion(id);

    if (res) {
        if (gVerseHighlightedID  !== '') {
            if (gVerseIsHighlighted === '0') {
                if (gVerseHighlightedID !== 'id-SP1') {
                    eVerse = document.getElementById(`id-SP${verseNumber}`);
                    eVerse.style.backgroundColor = "#aed0fc";
                    eVerse.style.color = "black";
                };
                eVerse2 = document.getElementById(`id-SP${verseNumber}-2`);
                eVerse2.style.backgroundColor = "#aed0fc";
                eVerse2.style.color = "black";
                eVerse2.style.paddingRight = '.3em';
            } else {
                while (i <= 2) {
                    eVerse = document.getElementById(`id-SP${verseNumber}`);
                    eVerse2 = document.getElementById(`id-SP${verseNumber}-2`);
                    eVerse3 = document.getElementById(`${numberSpan}${i}-2`);

                    eVerse.style.backgroundColor = "#aed0fc";
                    eVerse.style.color = "black";
                    eVerse2.style.backgroundColor = "#aed0fc";
                    eVerse2.style.color = "black";
                    eVerse2.style.paddingRight = '.3em';
                    eVerse3.textContent = eVerse2.textContent;
                    vn++;
                    i++;
                };
                document.getElementById('id-verseText').textContent = 1;
                eVerse2.scrollIntoView({ block: 'center' });
        };
    } else {
        if (!gStartup) {
            if (gVerseHighlightedID !== '') {
                let x = 0;
                while (x <= 2) {
                    eVerse = document.getElementById(`${gVerseHighlightedID}${x}-2`);
                    eVerse.textContent = verses[i].vt;
                    i++;
                    x++;
                };
            };
        };
    };
    };
    displayPrevious();
    if (gRandomSearchIsHighlighted) {
        if (gRandomQuery === 1) {
            let verses = gAllVerses[gAllVersesIDX];
            let vn = verses[gRandomVerseIDX].vn;
            let scrollID = `id-SP${vn}`;
            randomHighlights(vn);
            gRandomSearchIsHighlighted = 0;
            document.getElementById(scrollID).scrollIntoView({block: 'center'});
        };
    };
    gStartup = false;
    return Promise.resolve(true);
};

function displayPrevious() {

    if (gBookID === 1 && gChapterNumber === 1) {
        document.getElementById('id-last').style.display = 'none';
    } else if (gBookID === 66 && gChapterNumber === 22) {
        document.getElementById('id-next').style.display = 'none';
        document.getElementById('id-last').style.display = 'block';
    } else {
        document.getElementById('id-last').style.display = 'block';
        document.getElementById('id-next').style.display = 'block';
    };
};

async function changeBook(bid) {

    let id;
    if (!bid) {
        this.event.stopPropagation();
        this.event.preventDefault();
        this.event.stopImmediatePropagation();
        id = this.event.target.id;
    } else { id = `id-bk${bid}`; };

    gBookID = Number(id.replace('id-bk', ''));
    if (gBookID < 40) { book = oldBooks; } else { book = newBooks; };
    let i = book.findIndex(books => Number(books.id) === Number(gBookID));
    let content = book[i].t;

    ncbClose();
    pushPage();
    if (gRandomSearchIsHighlighted === 0) {
        if (!bid) { gChapterNumber = 1; };
    } else {
        let verses = gAllVerses[gAllVersesIDX];
        gChapterNumber = Number(verses[gRandomVerseIDX].cn);
    };

    gRandomSearchIsHighlighted = 0;
    gVerseHighlightedID = '';
    document.getElementById('id-verseText').textContent = '1';
    document.getElementById('id-bookText').textContent = content;

    loadText();
    loadChapters();
    loadVerses();
    displayPrevious();
    if (!bid) {
        document.getElementById('id-textTitle2').textContent = `${content} 1`;
        document.getElementById('id-chapterText').textContent = '1';
        document.getElementById('id-bookFooter').textContent = `${content} 1`;
    } else {
        document.getElementById('id-textTitle2').textContent = `${content} ${gChapterNumber}`;
        document.getElementById('id-chapterText').textContent = `${gChapterNumber}`;
        document.getElementById('id-bookFooter').textContent = `${content} ${gChapterNumber}`;
    };
    return Promise.resolve(true);
};

function nav(navDirection) {

    this.event.stopPropagation();
    this.event.preventDefault();
    this.event.stopImmediatePropagation();

    let book, id, eBook;
    if (gBookID < 40) { book = oldBooks; } else { book = newBooks; };
    i = book.findIndex(books => Number(books.id) === Number(gBookID));
    let chapters = book[i].c;

    // navDirection values: 0 = Last Chapter, 1 = Next Chapter
    if (navDirection === 0) {
        gChapterNumber = gChapterNumber - 1;
        if (gChapterNumber < 1) { gBookID = gBookID - 1; };
    } else {
        gChapterNumber = gChapterNumber + 1;
        if (gChapterNumber > chapters) { gChapterNumber = 1; gBookID = gBookID + 1; };
    };
    id = `id-bk${gBookID}`;
    eBook = document.getElementById(id);
    if (gChapterNumber === 0) {
        if (gBookID < 40) { book = oldBooks; } else { book = newBooks; };
        i = book.findIndex(books => Number(books.id) === Number(gBookID));
        gChapterNumber = Number(book[i].c);
    };

    changeBook(gBookID);
    document.getElementById('id-bookText').textContent = eBook.textContent;
    document.getElementById('id-textTitle2').textContent = `${eBook.textContent} ${gChapterNumber}`;
    document.getElementById('id-bookFooter').textContent = `${eBook.textContent} ${gChapterNumber}`;
    document.getElementById('top').scrollIntoView(true);
};

function sortBooks() {

    this.event.preventDefault();
    this.event.stopImmediatePropagation();
    var pointer = document.getElementById('id-bookHeaderPointer');

    if (gBookSorted === 0) {
        oldBooks.sort((a, b) => (a.t > b.t) ? 1 : -1);
        newBooks.sort((a, b) => (a.t > b.t) ? 1 : -1);
        gBookSorted = 1;
        pointer.textContent = '▲';
        document.getElementById('id-sort').title = "Sort Biblically";
    } else {
        oldBooks.sort((a, b) => (a.id > b.id) ? 1 : -1);
        newBooks.sort((a, b) => (a.id > b.id) ? 1 : -1);
        gBookSorted = 0;
        pointer.textContent = '▼';
        document.getElementById('id-sort').title = "Sort Alphabetically";
    }
    loadBooks();
};

function changeChapter() {

    let id = this.event.target.id;
    let content = document.getElementById('id-bookText').textContent;

    ncbClose();
    pushPage();
    gChapterNumber = Number(document.getElementById(id).dataset.cn);
    document.getElementById('id-textTitle2').textContent = `${content} ${gChapterNumber}`;
    document.getElementById('id-chapterText').textContent = `${gChapterNumber}`;
    document.getElementById('id-bookFooter').textContent = `${content} ${gChapterNumber}`;
    document.getElementById('id-verseText').textContent = '1';

    loadText();
    loadChapters();
    loadVerses();
    displayPrevious();
};

function selectVerse() {

    this.event.stopPropagation();
    this.event.preventDefault();
    this.event.stopImmediatePropagation();

    let id = this.event.target.id;
    clickP();

    let gSelectedVerseNumber = id.replace('id-vrs', '');
    gSelectedVerseNumberID = `id-SP${gSelectedVerseNumber}`;
    gSelectedVerseTextID = `id-SP${gSelectedVerseNumber}-2`;
    document.getElementById('id-verseText').textContent = gSelectedVerseNumber;
    gVerseHighlightedID = gSelectedVerseNumberID
    gVerseIsHighlighted  = '0';

    let eVerse = document.getElementById(gSelectedVerseNumberID);
    let eVerse2 = document.getElementById(gSelectedVerseTextID);
    eVerse.scrollIntoView({ block: 'center' });
    eVerse2.style.backgroundColor = "#aed0fc";
    eVerse2.style.color = "black";
    eVerse2.style.paddingRight = '.3em';
    ncbClose();
};

function clickP() {

    this.event.stopPropagation();
    this.event.preventDefault();
    this.event.stopImmediatePropagation();

    let bgc, col = '#9e6105', color, num, num2, x=1;

    document.getElementById('id-verseText').textContent = 1;

    if (gTheme === 1) { bgc = 'white'; color = 'black'; }
    else { bgc = '#333333'; color = '#cccccc'; };

    if (gVerseHighlightedID !== '') {
        for (let i = 0; i < gVerseCount; i++) {
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
    gVerseHighlightedID = '';
    gVerseIsHighlighted = '';
    ncbClose();
};

function closeFooter() {

    if (gFooterOpen) {
        ncbClose();
        gFooterOpen = false;
        document.getElementById('id-footer').style.display = 'none';
        document.getElementById('id-toTop').style.display = 'block';
    } else {
        ncbClose();
        gFooterOpen = true;
        document.getElementById('id-footer').style.display = 'block';
        document.getElementById('id-toTop').style.display = 'none';
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

// #region Scripts for files in the ASSETS folder such as about.txt, mission.txt, statement.txt, etc
    async function fetchCode(url) {

        const res = await fetch(url, { mode: 'cors' });
        const text = await res.text();
        const code = await eval(text);
        return Promise.resolve(code);
    };

    function openList() {

            this.event.preventDefault();
            this.event.stopImmediatePropagation();
            let id = this.event.target.id

            if (id.includes('id-version')) {id = 'id-version'};
            if (id.includes('id-book')) {id = 'id-book'};
            if (id.includes('id-chapter')) {id = 'id-chapter'};
            if (id.includes('id-verse')) {id = 'id-verse'};
            if (id.includes('id-defaultVersion')) {id = 'id-defaultVersion'};
            if (id.includes('id-defaultTheme')) {id = 'id-defaultTheme'};

            if (gListOpen) {
                ncbClose();
            } else {
                ncbClose();
                document.getElementById(`${id}Pointer`).textContent = '▲';
                document.getElementById(`${id}Header`).style.display = "flex";
                document.getElementById(`${id}Selector`).style.display = "block";
                if (id.includes('id-default')) {
                    document.getElementById(`${id}Selector`).scrollTop = 0;
                } else {
                    document.getElementById(id).scrollTop = 0;
                };
                gListOpen = true;
            };
    };

    function scrollPage(id) { document.getElementById(id).scrollIntoView(true) };

    async function page() {

        this.event.stopPropagation();
        this.event.preventDefault();
        this.event.stopImmediatePropagation();
        let id = this.event.target.id;
        let html = '';

        document.getElementById('id-randomContainer').style.display = 'none';
        switch (id) {
            case 'id-footer1':
                sharePage()
                return;
            case 'id-footer2':
                if (aboutHTML === '') {
                    let url = `${gMainPath}/ASSETS/about.txt`;
                    aboutHTML = await fetchCode(url);
                };
                html = aboutHTML;
                break;
            case 'id-footer3':
                if (missionHTML === '') {
                    let url = `${gMainPath}/ASSETS/mission.txt`;
                    missionHTML = await fetchCode(url);
                };
                html = missionHTML;
                break;
            case 'id-footer4':
                if (statementHTML === '') {
                    let url = `${gMainPath}/ASSETS/statement.txt`;
                    statementHTML = await fetchCode(url);
                };
                html = statementHTML;
                break;
            case 'id-footer5':
                if (movieHTML === '') {
                    let url = `${gMainPath}/ASSETS/TRIVIA/movie.txt`;
                    movieHTML = await fetchCode(url);
                };
                html = movieHTML;
                break;
            case 'id-footer6':
                if (musicHTML === '') {
                    let url = `${gMainPath}/ASSETS/TRIVIA/music.txt`;
                    musicHTML = await fetchCode(url);
                };
                html = musicHTML;
                break;
            case 'id-footer7':
                if (showHTML === '') {
                    let url = `${gMainPath}/ASSETS/TRIVIA/show.txt`;
                    showHTML = await fetchCode(url);
                };
                html = showHTML;
                break;
            case 'id-footer8':
                if (testimonialHTML === '') {
                    let url = `${gMainPath}/ASSETS/TRIVIA/testimonial.txt`;
                    testimonialHTML = await fetchCode(url);
                };
                html = testimonialHTML;
                break;
            case 'id-footer9':
                if (ministryHTML === '') {
                    let url = `${gMainPath}/ASSETS/TRIVIA/ministry.txt`;
                    ministryHTML = await fetchCode(url);
                };
                html = ministryHTML;
                break;
            case 'id-searchImg':
                if (searchHTML === '') {
                    let url = `${gMainPath}/ASSETS/search.txt`;
                    searchHTML = await fetchCode(url);
                };
                html = searchHTML;
                searchVerses = gAllVerses[gAllVersesIDX];
                break;
            default:
                break;
        };
        pushPage();
        changePage(html);
        closeFooter();
        if (id === 'id-searchImg') {
            gFooterOpen = false;
            document.getElementById('id-footer').style.display = 'none';
            document.getElementById('id-localSearch').focus();
            document.getElementById('id-toTop').style.display = 'block';
            addSearchEvents();
        } else {
            if(gSettingsOpen === true) { openSettings(); };
        };
    };

    function changePage(html) {

        removeItems('id-mainText');
        document.getElementById('id-mainText').insertAdjacentHTML("afterbegin", html);
        if (gFont === 0) {
            document.getElementById('id-page').style.fontSize = '1.1rem';
        } else {
            document.getElementById('id-page').style.fontSize = gFont;
        };
    };

    function pushPage() {

        stateObject.innerHTML.push(document.getElementById('id-mainText').innerHTML);
        stateObject.variablesHTML.push(document.getElementById('id-variableScript').innerHTML);
        window.history.pushState(stateObject, null, null);
        document.getElementById('top').scrollIntoView(true);
        astate++;
    };

    function replacePage() {
        const url = new URL(window.location.href);
        if (!url.search) { url.search = '?'; };
        if (gBookID) { url.searchParams.set('gBookID', gBookID); };
        if (gChapterNumber) { url.searchParams.set('gChapterNumber', gChapterNumber); };
        if (gVersionID) { url.searchParams.set('gVersionID', gVersionID); };
        if (gRandomVerseIDX) { url.searchParams.set('gRandomVerseIDX', gRandomVerseIDX); };
        //if (gRandomSearchIsHighlighted) { url.searchParams.set('gRandomSearchIsHighlighted', gRandomSearchIsHighlighted); };

        window.history.replaceState(stateObject, null, url.toString());
    };

    function navBack(){
        this.event.stopPropagation();
        this.event.preventDefault();
        this.event.stopImmediatePropagation();
        window.history.back();
    };

    window.addEventListener('popstate', (event) => {

        if (astate > 0) {
            removeItems('id-mainText');
            removeItems('id-variableScript');
            astate--;
            document.getElementById('id-mainText').insertAdjacentHTML("afterbegin", stateObject.innerHTML[astate]);
            document.getElementById('id-variableScript').insertAdjacentHTML("afterbegin", stateObject.variablesHTML[astate]);
            stateObject.innerHTML.pop();
            stateObject.variablesHTML.pop();

            if (document.getElementById('id-chapterPage')) {
                if (gFont === 0) {
                    document.getElementById('id-chapterPage').style.fontSize = '1.1rem';
                } else {
                    document.getElementById('id-chapterPage').style.fontSize = gFont;
                };
            };
            if (document.getElementById('id-page')) {
                if (gFont === 0) {
                    document.getElementById('id-page').style.fontSize = '1.1rem';
                } else {
                    document.getElementById('id-page').style.fontSize = gFont;
                };
            };
            document.getElementById('top').scrollIntoView(true);
        };
        if (document.getElementById('id-searchPage')) { addSearchEvents(); search(); };
        if (astate === 0) { document.getElementById('id-randomContainer').style.display = 'block'; };
    });
// #endregion Scripts for files in the ASSETS folder such as about.txt, mission.txt, statement.txt, etc