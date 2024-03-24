//** #region search.js */
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

        let bulk = [];
        let i = 0;
        let record = '';
        let searchRes = false;

        let aphrase = document.getElementById('id-localSearch').textContent;
        if (aphrase === '') { document.getElementById('id-localSearch').focus(); return; };

        if (firstSearch) { searchRes = await createIndex();
        } else { searchRes = true; };
        if (!searchRes) {alert('Search Error!'); return; };

        document.getElementById('id-results').textContent = `${versions[gVersionIDX].ar} - Search Results`;
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
        while (i < 30 && i < stored.length - 1) {
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

        document.getElementById('id-moreResults').style.display = 'block';
        document.getElementById('id-localSearch').blur();
    };

    function loadSearch(record) {

        let book;
        let searchPage = document.getElementById('id-searchPage');
        let vid = Number(record.vid);
        let i = searchVerses.findIndex(verses => Number(verses.vid) === Number(vid));

        let bid = Number(searchVerses[i].bid);
        if (bid < 40) { book = oldBooks; } else { book = newBooks; };
        let idx = book.findIndex(bks => Number(bks.id) === Number(bid));

        let a = document.createElement('a');
        a.id = `id-searchPage${searchVerses[i].vid}`;
        a.dataset.bid = bid;
        a.dataset.cn = searchVerses[i].cn;
        a.dataset.vn = searchVerses[i].vn;
        a.textContent = `${book[idx].t} ${searchVerses[i].cn}:${searchVerses[i].vn}`;
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
        div.textContent = searchVerses[i].vt;
        searchPage.appendChild(div);

        br = document.createElement('br');
        searchPage.appendChild(br);
        br = document.createElement('br');
        searchPage.appendChild(br);
    };

    async function readSearch() {

        let res=false, scrollID='', vn=0;
        let a = document.getElementById(this.event.target.id);

        gBookID = Number(a.dataset.bid);
        gChapterNumber = Number(a.dataset.cn);
        vn = Number(a.dataset.vn);

        pushPage();
        removeItems('id-mainText');
        document.getElementById('id-mainText').insertAdjacentHTML("afterbegin", menuHTML);

        if (gBookID < 40) { book = oldBooks; } else { book = newBooks; };
        let idx = book.findIndex(books => Number(books.id) === Number(gBookID));

        res = loadText();

        if (res) { res = await loadChapters(); };
        if (res) { res = await loadVerses(); };
        if (res) { displayPrevious(); };

        document.getElementById('id-bookText').textContent = book[idx].t;
        document.getElementById('id-verseText').textContent = vn;
        document.getElementById('id-chapterText').textContent = gChapterNumber;
        document.getElementById('id-textTitle2').textContent = `${book[idx].t} ${gChapterNumber}`;

        if (res) {
            if ( vn  !== 0 ) {
                let i = 0;
                let sp = 'id-SP';
                let pID = `${sp}${vn}`;
                let pID2 = `${pID}-2`;

                scrollID = `${sp}${vn}`;
                gVerseHighlightedID = pID;
                gVerseIsHighlighted = 1;
                let eParagraph = document.getElementById(pID);
                let eParagraph2 = document.getElementById(pID2);

                while (i <= 1) {
                    if ( vn === 1) {
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
                };
            };
        };
        document.getElementById(scrollID).scrollIntoView({block: 'center'});
        document.getElementById('id-randomContainer').style.display = 'block';
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
    };

    function resultsLabel(resultText) {
        let h4 = document.createElement('h4');
        h4.textContent = resultText;
        h4.style.color = 'green';
        document.getElementById('id-searchPage').appendChild(h4);
    };
//** #endregion search.js */
