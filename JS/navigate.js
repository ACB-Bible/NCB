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
//Change Version
async function ncbChangeVersion(vid) {

    let id;
    let res = false;

    if (!vid) { id = this.event.target.id; }
    else { id = `id-ncbChangeVersion${vid}`; };
    let eVersion = document.getElementById(id);
    let version = eVersion.dataset.version;
    let content = eVersion.textContent;

    res = await ncbLoadAVersion(id);
    ncbClose();
    if (res) {
        let eMenu = document.getElementById('id-ncbMenu');
        document.getElementById('id-ncbVersionText').textContent = version;
        document.getElementById('id-ncbTextTitle1').textContent = content;
        content = document.getElementById(`id-ncbBk${eMenu.dataset.bid}`).textContent;
        let content1 = document.getElementById(`id-ncbChp${eMenu.dataset.cn}`).textContent;
        document.getElementById('id-ncbTextTitle2').textContent = `${content} ${content1}`;

        if ( eMenu.dataset.vid  !== '' ) {

            let i = 0;
            let vn = Number(eMenu.dataset.vn);
            let sp = 'id-ncbSP';
            let sp2 = 'id-ncbNumber';
            let pID = `${sp}${vn}`;
            let pID2 = `${pID}-2`;
            let pID3 = `${sp2}${i}-2`;
            let eParagraph = document.getElementById(pID);
            let eParagraph2 = document.getElementById(pID2);
            let eParagraph3 = document.getElementById(pID3);

            eParagraph.scrollIntoView({ block: 'center' });

            while (i <= 2) {
                eParagraph.style.backgroundColor = "#aed0fc";
                eParagraph.style.color = "black";
                eParagraph2.style.backgroundColor = "#aed0fc";
                eParagraph2.style.color = "black";
                eParagraph2.style.paddingRight = '.3em';
                eParagraph3.textContent = eParagraph2.textContent;

                vn++;
                i++;
                pID = `${sp}${vn}`;
                pID2 = `${pID}-2`;
                pID3 = `${sp2}${i}-2`;

                eParagraph = document.getElementById(pID);
                eParagraph2 = document.getElementById(pID2);
                eParagraph3 = document.getElementById(pID3);
            };

        };
    };
    ncbDisplayPrevious();
};
function ncbDisplayPrevious() {
    let eMenu = document.getElementById('id-ncbMenu');
    if (eMenu.dataset.bid === '1' && eMenu.dataset.cn === '1') {
        document.getElementById('id-ncbPrevious').style.display = 'none';
    } else if (eMenu.dataset.bid === '66' && eMenu.dataset.cn === '22') {
        document.getElementById('id-ncbNext').style.display = 'none';
        document.getElementById('id-ncbPrevious').style.display = 'block';
    } else {
        document.getElementById('id-ncbPrevious').style.display = 'block';
        document.getElementById('id-ncbNext').style.display = 'block';
    };


    if (eMenu.dataset.bid === '66' && eMenu.dataset.cn === '22') {
        document.getElementById('id-ncbNext').style.display = 'none';
    } else if (eMenu.dataset.bid === '66' && eMenu.dataset.cn === '22') {
        document.getElementById('id-ncbNext').style.display = 'none';
    } else {
        document.getElementById('id-ncbNext').style.display = 'block';
    };

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
async function ncbChangeBook() {

    let id = this.event.target.id;
    let eBook = document.getElementById(id);
    let eMenu = document.getElementById('id-ncbMenu');
    let eRandom = document.getElementById('id-ncbPanelLbl1');

    if (eRandom.dataset.search === '1') {
        eMenu.dataset.cn = eRandom.dataset.cn;
    } else {
        eMenu.dataset.cn = 1;
        eMenu.dataset.bid = eBook.dataset.bid;
    };
    eRandom.dataset.search = '0';
    eMenu.dataset.vid = '';
    eMenu.dataset.chapters = eBook.dataset.c;
    document.getElementById('id-ncbTextTitle2').textContent = `${eBook.textContent} 1`;
    document.getElementById('id-ncbBookText').textContent = eBook.textContent;
    document.getElementById('id-ncbChapterText').textContent = '1 :';
    document.getElementById('id-ncbVerseText').textContent = '1';
    ncbLoadText();
    ncbLoadChapters();
    ncbLoadVerses();
    ncbClose();
    ncbDisplayPrevious();
    return Promise.resolve(true);
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

    let id = this.event.target.id;
    let eChapter = document.getElementById(id);
    let eMenu = document.getElementById('id-ncbMenu');
    let eBook = document.getElementById('id-ncbBookText');

    eMenu.dataset.cn = eChapter.dataset.cn
    document.getElementById('id-ncbTextTitle2').textContent = `${eBook.textContent} ${eChapter.dataset.cn}`;
    document.getElementById('id-ncbChapterText').textContent = `${eChapter.dataset.cn} :`;
    document.getElementById('id-ncbVerseText').textContent = '1';

    ncbLoadText();
    ncbLoadChapters();
    ncbLoadVerses();
    ncbClose();
    ncbDisplayPrevious();
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
    let id;
    let pID;
    let pID2;
    let eVerse;
    let eMenu = document.getElementById('id-ncbMenu');

    id = this.event.target.id;
    ncbClickP();
    eVerse = document.getElementById(id);
    pID= `id-ncbSP${eVerse.dataset.cn}`;
    pID2 = `id-ncbSP${eVerse.dataset.cn}-2`;
    document.getElementById('id-ncbVerseText').textContent = eVerse.dataset.cn;

    let eParagraph = document.getElementById(pID);
    let eParagraph2 = document.getElementById(pID2);
    eParagraph.scrollIntoView({ block: 'center' });
    eParagraph.style.backgroundColor = "#aed0fc";
    eParagraph2.style.backgroundColor = "#aed0fc";
    eParagraph2.style.paddingRight = '.3em';
    eMenu.dataset.vid = pID;
    ncbClose();
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

function ncbClickP() {

    let eMenu = document.getElementById('id-ncbMenu');
    let pID = eMenu.dataset.vid;

    if (pID !== "") {
        setRandTheme()
        eMenu.dataset.vid = '';
    };
};

function setRandTheme() {
    let bgc;
    let two;
    let col = '#9e6105';
    if (theme === 1) {
        bgc = 'white';
        c = 'black';
    } else {
        bgc = '#333333';
    };

    const collection = document.getElementById('id-ncbP0').children;
    let x = 1;
    for (let i = 0; i < collection.length; i++) {

        let num = collection[i].id;
        let num2 = `id-ncbSP${x}`;

        collection[i].style.backgroundColor = bgc;
        if (num === num2) {
            two = collection[i];
            two.style.color = col;
            if (i < collection.length - 1) { x++; };
        };
    };
    //document.getElementById('id-ncbVerseText').textContent = 1;
};



//eMenu.dataset.vid = pID2.slice(0, -2);