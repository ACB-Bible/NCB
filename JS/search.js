//** #region search.js */

    // #region Globals for search.js file
    var stored = [];
    var searchRes = false;
    var startSearch = 0;
    // #endregion Globals for search.js file

    function addSearchEvents() {

        var input = document.getElementById('id-localSearch');
        input.addEventListener('keydown', (event) => {
            if (event.key === 'Enter' && input.textContent !== '') {
                event.preventDefault();
                event.stopImmediatePropagation();
                event.stopPropagation();
                search();
            };
        });

        const searchLocal = document.getElementById('id-localSearch');
        searchLocal.addEventListener('paste', (event) => {
            event.stopPropagation();
            event.preventDefault();
            event.stopImmediatePropagation();
            let text = "";
            if (event.clipboardData) {
                text = event.clipboardData.getData('text/plain');
            } else if (window.clipboardData) { // For older browsers
                text = window.clipboardData.getData('Text');
            };
            searchLocal.style.backgroundColor = 'transparent'; // Remove any existing highlight (optional)
            const selection = window.getSelection(); // Insert the plain text
            if (!selection.rangeCount) return;
            selection.deleteFromDocument();
            const range = selection.getRangeAt(0);
            range.insertNode(document.createTextNode(text));
            selection.collapseToEnd();
            searchLocal.style.backgroundColor = 'gray';
            searchLocal.style.color = 'white';
        });
    };

    async function createIndex() {
        let index = await new elasticlunr();
        searchIndex = await buildIndex(index);
        return Promise.resolve(true);
    };

    async function buildIndex(index) {
        index.addField('vid');
        index.addField('vt');
        index.setRef('vt');
        searchVerses.forEach((verse) => {
            index.addDoc(verse);
        }, this);
        return Promise.resolve(index);
    };

    async function search() {

        let i = 0;
        let record = '';
        let bulk = [];

        stored = [];
        let aphrase = document.getElementById('id-localSearch').textContent;
        if (aphrase === '') { document.getElementById('id-localSearch').focus(); return; };
        let idx = versions.findIndex(vrs => vrs.ar === searchVersionidx);
        if (firstSearch) { searchRes = await createIndex(); };
        if (!searchRes) {alert('Search Error!'); return; };

        document.getElementById('id-results').textContent = `${versions[idx].ar} - Search Results`;
        startSearch = 0;
        let results = searchIndex.search(aphrase, { phrase: true, field: ['vt'] });
        if (results.length === 0) {
            removeItems('id-searchPage');
            resultsLabel('No Results!');
            return;
        };
        removeItems('id-searchPage');

        results.sort((a, b) => b.score - a.score);
        for (const result of results) {
            let doc = searchIndex.documentStore.getDoc(result.ref);
            record = {vid: doc.vid, vt: doc.vt};
            if (doc.vt.includes(aphrase)) {
                stored.push(record);
                i++;
            } else {
                bulk.push(record);
            };
        };
        for (const rec of bulk) {
            record = {vid: rec.vid,  vt: rec.vt};
            stored.push(record);
        };
        i = 0;
        while (i < 30 && i < stored.length) {
            record = { vid: stored[i].vid,  vt: stored[i].vt };
            loadSearch(record);
            i++;
        };
        startSearch = i;
        firstSearch = false;

        if (i < 30) {
            resultsLabel('No More Results!');
            return;
        };
        //topLink();
        document.getElementById('id-moreResults').style.display = 'block';
        document.getElementById('id-localSearch').blur();
    };

    function topLink() {
        let a = document.createElement('a');
        a.classList.add('atc');
        a.classList.add('cs-cp-hover');
        a.textContent = 'Back to Top';
        a.addEventListener('click', (e) => {
            e.stopPropagation();
            e.preventDefault();
            e.stopImmediatePropagation();
            scrollPage('top');
        });
        document.getElementById('id-searchPage').appendChild(a);
        let br = document.createElement('br');
        document.getElementById('id-searchPage').appendChild(br);

    };

    function loadSearch(record) {

        let bookTitle, chapters, x = 0;
        let searchPage = document.getElementById('id-searchPage');
        let i = searchVerses.findIndex(verses => verses.vid === record.vid);
        let aID = `id-searchPage${searchVerses[i].vid}`;
        let bid = searchVerses[i].bid;
        let cn = searchVerses[i].cn;
        let text = searchVerses[i].vt;
        let vn = searchVerses[i].vn;

        if (bid < 40) {
            x = oldBooks.findIndex(books => books.id === bid);
            chapters = oldBooks[x].c;
            bookTitle = oldBooks[x].t;
        } else {
            x = newBooks.findIndex(books => books.id === bid);
            chapters = newBooks[x].c;
            bookTitle = newBooks[x].t;
        };

        let title = `${bookTitle} ${searchVerses[i].cn}:${searchVerses[i].vn}`;
        let a = document.createElement('a');
        a.id = aID;
        a.dataset.bid = bid;
        a.dataset.bookTitle = bookTitle;
        a.dataset.bookidx = x;
        a.dataset.chapters = chapters;
        a.dataset.cn = cn;
        a.dataset.versesidx = i
        a.dataset.vn = vn;
        a.textContent = title;
        a.classList.add('cs-searchLink');
        a.classList.add('cs-cp-hover');
        a.addEventListener('click', (e) => {
            e.stopPropagation();
            e.preventDefault();
            e.stopImmediatePropagation();
            readSearch();
        });
        searchPage.appendChild(a);
        let br = document.createElement('br');
        searchPage.appendChild(br);

        let div = document.createElement('div');
        div.textContent = text;
        searchPage.appendChild(div);

        br = document.createElement('br');
        searchPage.appendChild(br);
        br = document.createElement('br');
        searchPage.appendChild(br);
    };


    async function readSearch() {

        let res = false;
        let scrll = '';
        let bid, bookTitle, chapters, cn, vn, x;
        let a = document.getElementById(this.event.target.id);

        bid = Number(a.dataset.bid);
        bookTitle = a.dataset.bookTitle;
        chapters = a.dataset.chapters;
        cn = a.dataset.cn;
        vn = a.dataset.vn;
        x = a.dataset.bookidx;

        pushPage();
        removeItems('id-mainText');
        document.getElementById('id-mainText').insertAdjacentHTML("afterbegin", menuHTML);

        if (bid < 40) {
            book = oldBooks;
        } else {
            book = newBooks;
        };
        let eMenu = document.getElementById('id-menu');
        eMenu.dataset.bid = bid;
        //eMenu.dataset.bookidx = x;
        eMenu.dataset.chapters = chapters;
        eMenu.dataset.cn = cn;
        //eMenu.dataset.t = bookTitle;
        eMenu.dataset.vn = vn;
        eMenu.dataset.vid = '';
        eMenu.dataset.versionidx = searchVersesidx;

        res = loadText(eMenu);

        if (res) { res = await loadChapters(eMenu); };
        if (res) { res = await loadVerses(eMenu); };
        if (res) { displayPrevious(eMenu); };

        //eMenu.dataset.chapters = book[i].c;
        document.getElementById('id-bookText').textContent = book[x].t;
        document.getElementById('id-verseText').textContent = vn;
        document.getElementById('id-chapterText').textContent = cn;
        document.getElementById('id-textTitle2').textContent = `${book[x].t} ${cn}`;

        if (res) {
            //if ( eMenu.dataset.vn  !== '' ) {
            if ( vn  !== '' ) {
                let i = 0;
                //let vn = Number(eMenu.dataset.vn);
                let sp = 'id-SP';
                let pID = `${sp}${vn}`;
                let pID2 = `${pID}-2`;

                scrll = `${sp}${vn}`;
                eMenu.dataset.vid = pID;
                eMenu.dataset.vids = 1;
                let eParagraph = document.getElementById(pID);
                let eParagraph2 = document.getElementById(pID2);

                while (i <= 1) {
                    if ( vn === '1') {
                        eParagraph2 = document.getElementById(pID2);
                        eParagraph2.style.backgroundColor = '#aed0fc';
                        eParagraph2.style.color = 'black';
                        eParagraph2.style.paddingRight = '.3em';
                        break;
                     } else {
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
                //eParagraph.scrollIntoView({ block: 'center' });
                };
            };
        };
        document.getElementById(scrll).scrollIntoView({block: 'center'});
        return Promise.resolve(true);
    };


    function moreResults() {

        if (startSearch === 0) { return; }
        let i = startSearch;
        let br = document.createElement('br');
        document.getElementById('id-searchPage').appendChild(br);
        let hr = document.createElement('hr');
        document.getElementById('id-searchPage').appendChild(hr);
        br = document.createElement('br');
        document.getElementById('id-searchPage').appendChild(br);
        br = document.createElement('br');
        document.getElementById('id-searchPage').appendChild(br);
        startSearch = startSearch + 30;
        while (i < startSearch && i < stored.length) {
            record = { vid: stored[i].vid,  vt: stored[i].vt };
            loadSearch(record);
            i++;
        };
        startSearch = i;
        if (i >= stored.length) {
            br = document.createElement('br');
            document.getElementById('id-searchPage').appendChild(br);
            resultsLabel('No More Results!');
            document.getElementById('id-moreResults').style.display = 'none';
        };
        //if (i <= stored.length) { topLink(); };
    };

    function resultsLabel(resultText) {
        let h4 = document.createElement('h4');
        h4.textContent = resultText;
        h4.style.color = 'green';
        document.getElementById('id-searchPage').appendChild(h4);
    };
//** #endregion search.js */
