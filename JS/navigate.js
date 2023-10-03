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

    let i = 0;
    let pID;
    let pID2;
    let pID3;
    let sp = 'id-ncbSP';
    let sp2 = 'id-ncbNumber';
    let eVersion = document.getElementById(id);
    let version = eVersion.dataset.version;
    let content = eVersion.textContent;
    let eMenu = document.getElementById('id-ncbMenu');
    let avid = eMenu.dataset.vid;
    let vn = Number(eMenu.dataset.vn);
    let content1 = document.getElementById(`id-ncbChp${eMenu.dataset.cn}`).textContent;
    let eParagraph;
    let eParagraph2;
    let eParagraph3;

    document.getElementById('id-ncbVersionText').textContent = version;
    document.getElementById('id-ncbTextTitle1').textContent = content;
    content = document.getElementById(`id-ncbBk${eMenu.dataset.bid}`).textContent;
    document.getElementById('id-ncbTextTitle2').textContent = `${content} ${content1}`;

    res = await ncbLoadAVersion(id);

    ncbClose();
    if (res) {
        if ( eMenu.dataset.vid  !== '' ) {
            if ( eMenu.dataset.vids === '0') {
                if (avid !== 'id-ncbSP1') {
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
                document.getElementById('id-ncbVerseText').textContent = 1;
                eParagraph2.scrollIntoView({ block: 'center' });
        };

    } else {
        if (!startup) {
            let eRandom = document.getElementById('id-ncbPanelLbl1');
            let x = 0;
            let bid = Number(eRandom.dataset.bid);
            //bid = Number(bid);
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
        //eMenu.dataset.vids = '';
        //eMenu.dataset.vids = '';
    };
    startup = false;
    ncbDisplayPrevious();
    return Promise.resolve(true);
};

/** async function ncbChangeVersion(vid) {

    let id;
    let res = false;

    if (!vid) { id = this.event.target.id; }
    else { id = `id-ncbChangeVersion${vid}`; };
    let eVersion = document.getElementById(id);
    let version = eVersion.dataset.version;
    let content = eVersion.textContent;

    //if (startup || eVersion.dataset.deftheme === '1') {
        res = await ncbLoadAVersion(id);
    //} else {
        //res = true;
    //};
    ncbClose();
    if (res) {
        let eMenu = document.getElementById('id-ncbMenu');
        document.getElementById('id-ncbVersionText').textContent = version;
        document.getElementById('id-ncbTextTitle1').textContent = content;
        content = document.getElementById(`id-ncbBk${eMenu.dataset.bid}`).textContent;
        let content1 = document.getElementById(`id-ncbChp${eMenu.dataset.cn}`).textContent;
        document.getElementById('id-ncbTextTitle2').textContent = `${content} ${content1}`;

        if ( eMenu.dataset.vid  !== '' ) {

            let eParagraph;
            let eParagraph2;
            let eParagraph3;
            let avid = eMenu.dataset.vid;

            if ( eMenu.dataset.vids === '0') {
                if (avid !== 'id-ncbSP1') {
                    eParagraph = document.getElementById(avid);
                    eParagraph.style.backgroundColor = "#aed0fc";
                    eParagraph.style.color = "black";
                };
                eParagraph2 = document.getElementById(`${avid}-2`);
                eParagraph2.style.backgroundColor = "#aed0fc";
                eParagraph2.style.color = "black";
                eParagraph2.style.paddingRight = '.3em';
            } else {
                let i = 0;
                let pID;
                let pID2;
                let pID3;
                let vn = Number(eMenu.dataset.vn);
                let sp = 'id-ncbSP';
                let sp2 = 'id-ncbNumber';

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
                document.getElementById('id-ncbVerseText').textContent = 1;
                eParagraph2.scrollIntoView({ block: 'center' });
        };

    };
        //eMenu.dataset.vids = '';
        //eMenu.dataset.vids = '';
    };

    ncbDisplayPrevious();
    return Promise.resolve(true);
}; */
function ncbDisplayPrevious() {
    let eMenu = document.getElementById('id-ncbMenu');
    if (eMenu.dataset.bid === '1' && eMenu.dataset.cn === '1') {
        document.getElementById('id-ncbLast').style.display = 'none';
    } else if (eMenu.dataset.bid === '66' && eMenu.dataset.cn === '22') {
        document.getElementById('id-ncbNext').style.display = 'none';
        document.getElementById('id-ncbLast').style.display = 'block';
    } else {
        document.getElementById('id-ncbLast').style.display = 'block';
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
async function ncbChangeBook(bid) {

    let id;
    if (!bid) { id = this.event.target.id; }
    else { id = `id-ncbBk${bid}`; };
    let eBook = document.getElementById(id);
    let eMenu = document.getElementById('id-ncbMenu');
    let eRandom = document.getElementById('id-ncbPanelLbl1');
    let content;
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

    document.getElementById('id-ncbVerseText').textContent = '1';
    document.getElementById('id-ncbBookText').textContent = content;

    ncbLoadText();
    ncbLoadChapters();
    ncbLoadVerses();
    ncbClose();
    ncbDisplayPrevious();
    if (!bid) {
        document.getElementById('id-ncbTextTitle2').textContent = `${content} 1`;
        document.getElementById('id-ncbChapterText').textContent = '1 :';
        document.getElementById('id-ncbBookFooter').textContent = `${content} 1`;
    } else {
        document.getElementById('id-ncbTextTitle2').textContent = `${content} ${eMenu.dataset.cn}`;
        document.getElementById('id-ncbChapterText').textContent = `${eMenu.dataset.cn} :`;
        document.getElementById('id-ncbBookFooter').textContent = `${content} ${eMenu.dataset.cn}`;
    };
    return Promise.resolve(true);
};

function ncbNav(nav) {

    this.event.stopPropagation();
    this.event.preventDefault();
    this.event.stopImmediatePropagation();
    let eMenu = document.getElementById('id-ncbMenu');
    let bid = Number(eMenu.dataset.bid);
    let cn = Number(eMenu.dataset.cn);
    let chapters = Number(eMenu.dataset.chapters);
    let id;
    let eBook;
    // 0 = Last, 1 = Next
    if (nav === 0) {
        cn = cn - 1;
        if (cn < 1) { bid = bid - 1; };
    } else {
        cn = cn + 1;
        if (cn > chapters) { cn = 1; bid = bid + 1; };
    };
    id = `id-ncbBk${bid}`;
    eBook = document.getElementById(id);
    if (cn === 0) { cn = eBook.dataset.c };
    eMenu.dataset.cn = cn;
    eMenu.dataset.bid = eBook.dataset.bid;
    eMenu.dataset.chapters = eBook.dataset.c;
    ncbChangeBook(bid);
    document.getElementById('id-ncbBookText').textContent = eBook.textContent;
    document.getElementById('id-ncbTextTitle2').textContent = `${eBook.textContent} ${eMenu.dataset.cn}`;
    document.getElementById('id-ncbBookFooter').textContent = `${eBook.textContent} ${eMenu.dataset.cn}`;
    document.getElementById('id-ncbShare').scrollIntoView(false);
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
    document.getElementById('id-ncbBookFooter').textContent = `${eBook.textContent} ${eChapter.dataset.cn}`;
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
    eParagraph2.style.color = "black";
    eParagraph2.style.paddingRight = '.3em';
    eMenu.dataset.vid = pID;
    eMenu.dataset.vids = 0;
    ncbClose();
};

function ncbSettingsReset() {
    document.getElementById('id-ncbDefaultTheme').dataset.theme = 1;
    ncbChangeVersion(1);
    ncbApplyTheme();
    localStorage.removeItem('theme');
    localStorage.removeItem('versionid');
    ncbClose();
}

function ncbClickP() {

    let x = 1;
    let bgc;
    let col = '#9e6105';
    let color;
    let eMenu = document.getElementById('id-ncbMenu');
    let verses = Number(eMenu.dataset.verses);
    document.getElementById('id-ncbVerseText').textContent = 1;

    if (theme === 1) {
        bgc = 'white';
        color = 'black';
    } else {
        bgc = '#333333';
        color = '#cccccc';
    };

    if (eMenu.dataset.vid !== "") {
        for (let i = 0; i < verses; i++) {
            num = `id-ncbSP${x}`;
            num2 = `${num}-2`;
            if (num !== 1) {
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
};

function ncbAbout() {

};

function ncbSharePage() {

};


//eMenu.dataset.vid = pID2.slice(0, -2);