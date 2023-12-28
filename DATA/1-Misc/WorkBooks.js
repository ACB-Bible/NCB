//** WorkBooks.js */
// #region const allBooks; Old & New Testament for most Bible versions
const allBooks = [{"c":50,"id":1,"t":"Genesis"},{"c":40,"id":2,"t":"Exodus"},{"c":27,"id":3,"t":"Leviticus"},{"c":36,"id":4,"t":"Numbers"},{"c":34,"id":5,"t":"Deuteronomy"},{"c":24,"id":6,"t":"Joshua"},{"c":21,"id":7,"t":"Judges"},{"c":4,"id":8,"t":"Ruth"},{"c":31,"id":9,"t":"1 Samuel"},{"c":24,"id":10,"t":"2 Samuel"},{"c":22,"id":11,"t":"1 Kings"},{"c":25,"id":12,"t":"2 Kings"},{"c":29,"id":13,"t":"1 Chronicles"},{"c":36,"id":14,"t":"2 Chronicles"},{"c":10,"id":15,"t":"Ezra"},{"c":13,"id":16,"t":"Nehemiah"},{"c":10,"id":17,"t":"Esther"},{"c":42,"id":18,"t":"Job"},{"c":150,"id":19,"t":"Psalms"},{"c":31,"id":20,"t":"Proverbs"},{"c":12,"id":21,"t":"Ecclesiastes"},{"c":8,"id":22,"t":"Song of Solomon"},{"c":66,"id":23,"t":"Isaiah"},{"c":52,"id":24,"t":"Jeremiah"},{"c":5,"id":25,"t":"Lamentations"},{"c":48,"id":26,"t":"Ezekiel"},{"c":12,"id":27,"t":"Daniel"},{"c":14,"id":28,"t":"Hosea"},{"c":3,"id":29,"t":"Joel"},{"c":9,"id":30,"t":"Amos"},{"c":1,"id":31,"t":"Obadiah"},{"c":4,"id":32,"t":"Jonah"},{"c":7,"id":33,"t":"Micah"},{"c":3,"id":34,"t":"Nahum"},{"c":3,"id":35,"t":"Habakkuk"},{"c":3,"id":36,"t":"Zephaniah"},{"c":2,"id":37,"t":"Haggai"},{"c":14,"id":38,"t":"Zechariah"},{"c":4,"id":39,"t":"Malachi"},{"c":28,"id":40,"t":"Matthew"},{"c":16,"id":41,"t":"Mark"},{"c":24,"id":42,"t":"Luke"},{"c":21,"id":43,"t":"John"},{"c":28,"id":44,"t":"Acts"},{"c":16,"id":45,"t":"Romans"},{"c":16,"id":46,"t":"1 Corinthians"},{"c":13,"id":47,"t":"2 Corinthians"},{"c":6,"id":48,"t":"Galatians"},{"c":6,"id":49,"t":"Ephesians"},{"c":4,"id":50,"t":"Philippians"},{"c":4,"id":51,"t":"Colossians"},{"c":5,"id":52,"t":"1 Thessalonians"},{"c":3,"id":53,"t":"2 Thessalonians"},{"c":6,"id":54,"t":"1 Timothy"},{"c":4,"id":55,"t":"2 Timothy"},{"c":3,"id":56,"t":"Titus"},{"c":1,"id":57,"t":"Philemon"},{"c":13,"id":58,"t":"Hebrews"},{"c":5,"id":59,"t":"James"},{"c":5,"id":60,"t":"1 Peter"},{"c":3,"id":61,"t":"2 Peter"},{"c":5,"id":62,"t":"1 John"},{"c":1,"id":63,"t":"2 John"},{"c":1,"id":64,"t":"3 John"},{"c":1,"id":65,"t":"Jude"},{"c":22,"id":66,"t":"Revelation"}]
// #endregion const allBooks; Old & New Testament for most Bible versions

// #region const cpdBooks; Catholic Public Domain Bible version
const cpdBooks = [{"c":50,"id":1,"t":"Genesis"},{"c":40,"id":2,"t":"Exodus"},{"c":27,"id":3,"t":"Leviticus"},{"c":36,"id":4,"t":"Numbers"},{"c":34,"id":5,"t":"Deuteronomy"},{"c":24,"id":6,"t":"Joshua"},{"c":21,"id":7,"t":"Judges"},{"c":4,"id":8,"t":"Ruth"},{"c":31,"id":9,"t":"1 Samuel"},{"c":24,"id":10,"t":"2 Samuel"},{"c":22,"id":11,"t":"1 Kings"},{"c":25,"id":12,"t":"2 Kings"},{"c":29,"id":13,"t":"1 Chronicles"},{"c":36,"id":14,"t":"2 Chronicles"},{"c":10,"id":15,"t":"Ezra"},{"c":13,"id":16,"t":"Nehemiah"},{"c":14,"id":17,"t":"Tobit"},{"c":16,"id":18,"t":"Judith"},{"c":10,"id":19,"t":"Esther"},{"c":42,"id":20,"t":"Job"},{"c":150,"id":21,"t":"Psalms"},{"c":31,"id":22,"t":"Proverbs"},{"c":12,"id":23,"t":"Ecclesiastes"},{"c":8,"id":24,"t":"Song of Solomon"},{"c":19,"id":25,"t":"Wisdom"},{"c":51,"id":26,"t":"Sirach"},{"c":66,"id":27,"t":"Isaiah"},{"c":52,"id":28,"t":"Jeremiah"},{"c":5,"id":29,"t":"Lamentations"},{"c":6,"id":30,"t":"Baruch"},{"c":48,"id":31,"t":"Ezekiel"},{"c":12,"id":32,"t":"Daniel"},{"c":14,"id":33,"t":"Hosea"},{"c":3,"id":34,"t":"Joel"},{"c":9,"id":35,"t":"Amos"},{"c":1,"id":36,"t":"Obadiah"},{"c":4,"id":37,"t":"Jonah"},{"c":7,"id":38,"t":"Micah"},{"c":3,"id":39,"t":"Nahum"},{"c":3,"id":40,"t":"Habakkuk"},{"c":3,"id":41,"t":"Zephaniah"},{"c":2,"id":42,"t":"Haggai"},{"c":14,"id":43,"t":"Zechariah"},{"c":4,"id":44,"t":"Malachi"},{"c":16,"id":45,"t":"1 Maccabees"},{"c":15,"id":46,"t":"2 Macabees"},{"c":28,"id":47,"t":"Matthew"},{"c":16,"id":48,"t":"Mark"},{"c":24,"id":49,"t":"Luke"},{"c":21,"id":50,"t":"John"},{"c":28,"id":51,"t":"Acts"},{"c":16,"id":52,"t":"Romans"},{"c":16,"id":53,"t":"1 Corinthians"},{"c":13,"id":54,"t":"2 Corinthians"},{"c":6,"id":55,"t":"Galatians"},{"c":6,"id":56,"t":"Ephesians"},{"c":4,"id":57,"t":"Philippians"},{"c":4,"id":58,"t":"Colossians"},{"c":5,"id":59,"t":"1 Thessalonians"},{"c":3,"id":60,"t":"2 Thessalonians"},{"c":6,"id":61,"t":"1 Timothy"},{"c":4,"id":62,"t":"2 Timothy"},{"c":3,"id":63,"t":"Titus"},{"c":1,"id":64,"t":"Philemon"},{"c":13,"id":65,"t":"Hebrews"},{"c":5,"id":66,"t":"James"},{"c":5,"id":67,"t":"1 Peter"},{"c":3,"id":68,"t":"2 Peter"},{"c":5,"id":69,"t":"1 John"},{"c":1,"id":70,"t":"2 John"},{"c":1,"id":71,"t":"3 John"},{"c":1,"id":72,"t":"Jude"},{"c":22,"id":73,"t":"Revelation"}];
// #endregion const cpdBooks; Catholic Public Domain Bible version

// #region const jps24Books; Jewish Publication Society's Tanakh 1917 OT(JPS)
const jpsBooks = {
    "Torah": [
        {
            "c": 50,
            "id": 1,
            "t": "Genesis"
        },
        {
            "c": 40,
            "id": 2,
            "t": "Exodus"
        },
        {
            "c": 27,
            "id": 3,
            "t": "Leviticus"
        },
        {
            "c": 36,
            "id": 4,
            "t": "Numbers"
        },
        {
            "c": 34,
            "id": 5,
            "t": "Deuteronomy"
        }
    ],
    "Nevi’im": [
        {
            "c": 50,
            "id": 1,
            "t": "Joshua"
        },
        {
            "c": 40,
            "id": 2,
            "t": "Judges"
        },
        {
            "c": 27,
            "id": 3,
            "t": "Isaiah"
        },
        {
            "c": 36,
            "id": 4,
            "t": "Jeremiah"
        },
        {
            "c": 34,
            "id": 5,
            "t": "Ezekiel"
        },
        {
            "c": 34,
            "id": 5,
            "t": "The Twelve Minor Prophets"
        }
    ],
    "Ketuvim": [
        {
            "c": 34,
            "id": 5,
            "t": "Psalms"
        },
        {
            "c": 34,
            "id": 5,
            "t": "Proverbs"
        },
        {
            "c": 34,
            "id": 5,
            "t": "Job"
        },
        {
            "c": 34,
            "id": 5,
            "t": "Song of Songs"
        },
        {
            "c": 34,
            "id": 5,
            "t": "Ruth"
        },
        {
            "c": 34,
            "id": 5,
            "t": "Lamentations"
        },
        {
            "c": 34,
            "id": 5,
            "t": "Ecclesiastes"
        },
        {
            "c": 34,
            "id": 5,
            "t": "Esther"
        },
        {
            "c": 34,
            "id": 5,
            "t": "Daniel"
        },
        {
            "c": 34,
            "id": 5,
            "t": "Ezra"
        },
        {
            "c": 34,
            "id": 5,
            "t": "Nehemiah"
        },
        {
            "c": 34,
            "id": 5,
            "t": "Chronicles"
        }
    ]
};
// #endregion const jpsBooks; Jewish Publication Society's Tanakh 1917 OT(JPS)

// #region const tynBooks; Tyndale Bible(TYN)
const tynBooks = [
    {
        "c":50,
        "id":1,
        "t":"Genesis"
    },
    {
        "c":40,
        "id":2,
        "t":"Exodus"
    },
    {
        "c":27,
        "id":3,
        "t":"Leviticus"
    },
    {
        "c":36,
        "id":4,
        "t":"Numbers"
    },
    {
        "c":34,
        "id":5,
        "t":"Deuteronomy"
    },
    {
        "c":4,
        "id":6,
        "t":"Jonah"
    },
    {
        "c": 28,
        "id": 7,
        "t": "Matthew"
    },
    {
        "c": 16,
        "id": 8,
        "t": "Mark"
    },
    {
        "c": 24,
        "id": 9,
        "t": "Luke"
    },
    {
        "c": 21,
        "id": 10,
        "t": "John"
    },
    {
        "c": 28,
        "id": 11,
        "t": "Acts"
    },
    {
        "c": 16,
        "id": 12,
        "t": "Romans"
    },
    {
        "c": 16,
        "id": 13,
        "t": "1 Corinthians"
    },
    {
        "c": 13,
        "id": 14,
        "t": "2 Corinthians"
    },
    {
        "c": 6,
        "id": 15,
        "t": "Galatians"
    },
    {
        "c": 6,
        "id": 16,
        "t": "Ephesians"
    },
    {
        "c": 4,
        "id": 17,
        "t": "Philippians"
    },
    {
        "c": 4,
        "id": 18,
        "t": "Colossians"
    },
    {
        "c": 5,
        "id": 19,
        "t": "1 Thessalonians"
    },
    {
        "c": 3,
        "id": 20,
        "t": "2 Thessalonians"
    },
    {
        "c": 6,
        "id": 21,
        "t": "1 Timothy"
    },
    {
        "c": 4,
        "id": 22,
        "t": "2 Timothy"
    },
    {
        "c": 3,
        "id": 23,
        "t": "Titus"
    },
    {
        "c": 1,
        "id": 24,
        "t": "Philemon"
    },
    {
        "c": 13,
        "id": 25,
        "t": "Hebrews"
    },
    {
        "c": 5,
        "id": 26,
        "t": "James"
    },
    {
        "c": 5,
        "id": 27,
        "t": "1 Peter"
    },
    {
        "c": 3,
        "id": 28,
        "t": "2 Peter"
    },
    {
        "c": 5,
        "id": 29,
        "t": "1 John"
    },
    {
        "c": 1,
        "id": 30,
        "t": "2 John"
    },
    {
        "c": 1,
        "id": 31,
        "t": "3 John"
    },
    {
        "c": 1,
        "id": 32,
        "t": "Jude"
    },
    {
        "c": 22,
        "id": 33,
        "t": "Revelation"
    }
];
// #endregion const tynBooks; Tyndale Bible(TYN), Weymouth New Testament(WEY)


// #region const weyBooks; Weymouth New Testament(WEY)
const weyBooks = [
    {
        "c": 28,
        "id": 1,
        "t": "Matthew"
    },
    {
        "c": 16,
        "id": 2,
        "t": "Mark"
    },
    {
        "c": 24,
        "id": 3,
        "t": "Luke"
    },
    {
        "c": 21,
        "id": 4,
        "t": "John"
    },
    {
        "c": 28,
        "id": 5,
        "t": "Acts"
    },
    {
        "c": 16,
        "id": 6,
        "t": "Romans"
    },
    {
        "c": 16,
        "id": 7,
        "t": "1 Corinthians"
    },
    {
        "c": 13,
        "id": 8,
        "t": "2 Corinthians"
    },
    {
        "c": 6,
        "id": 9,
        "t": "Galatians"
    },
    {
        "c": 6,
        "id": 10,
        "t": "Ephesians"
    },
    {
        "c": 4,
        "id": 11,
        "t": "Philippians"
    },
    {
        "c": 4,
        "id": 12,
        "t": "Colossians"
    },
    {
        "c": 5,
        "id": 13,
        "t": "1 Thessalonians"
    },
    {
        "c": 3,
        "id": 14,
        "t": "2 Thessalonians"
    },
    {
        "c": 6,
        "id": 15,
        "t": "1 Timothy"
    },
    {
        "c": 4,
        "id": 16,
        "t": "2 Timothy"
    },
    {
        "c": 3,
        "id": 17,
        "t": "Titus"
    },
    {
        "c": 1,
        "id": 18,
        "t": "Philemon"
    },
    {
        "c": 13,
        "id": 19,
        "t": "Hebrews"
    },
    {
        "c": 5,
        "id": 20,
        "t": "James"
    },
    {
        "c": 5,
        "id": 21,
        "t": "1 Peter"
    },
    {
        "c": 3,
        "id": 22,
        "t": "2 Peter"
    },
    {
        "c": 5,
        "id": 23,
        "t": "1 John"
    },
    {
        "c": 1,
        "id": 24,
        "t": "2 John"
    },
    {
        "c": 1,
        "id": 25,
        "t": "3 John"
    },
    {
        "c": 1,
        "id": 26,
        "t": "Jude"
    },
    {
        "c": 22,
        "id": 27,
        "t": "Revelation"
    }
];
// #endregion const weyBooks; Tyndale Bible(TYN), Weymouth New Testament(WEY)

function setBook(abr) {
    let book;
    if (abr === 'JPS') { return };
    switch (abr) {
        case "CPD":
            book = cpdBooks;
            break;
        case "JPS":
            book = jpsBooks;
            break;
        case "TYN":
            book = tynBooks;
            break;
        case "WEY":
            book = weyBooks;
            break;
        default:
            book = allBooks;
    };
    return book;
};

module.exports = {
    setBook: setBook
};