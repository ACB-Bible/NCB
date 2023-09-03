//The variables.js file contains all the global variables and loads before all other Javascript links
//-Do not change mainPath variable url unless the host location changes
//var mainPath = "https://newchristianbible.com/";
var mainPath = "./";
var panelSwapped = true;
var spanHover = true;
var openID = false;
var allBooks = [];

// #region Data for Books and Versions
//id = bookID, c = chapters, t = title
var oldBooks = [{"c":50,"id":1,"t":"Genesis"},{"c":40,"id":2,"t":"Exodus"},{"c":27,"id":3,"t":"Leviticus"},{"c":36,"id":4,"t":"Numbers"},{"c":34,"id":5,"t":"Deuteronomy"},{"c":24,"id":6,"t":"Joshua"},{"c":21,"id":7,"t":"Judges"},{"c":4,"id":8,"t":"Ruth"},{"c":31,"id":9,"t":"1 Samuel"},{"c":24,"id":10,"t":"2 Samuel"},{"c":22,"id":11,"t":"1 Kings"},{"c":25,"id":12,"t":"2 Kings"},{"c":29,"id":13,"t":"1 Chronicles"},{"c":36,"id":14,"t":"2 Chronicles"},{"c":10,"id":15,"t":"Ezra"},{"c":13,"id":16,"t":"Nehemiah"},{"c":10,"id":17,"t":"Esther"},{"c":42,"id":18,"t":"Job"},{"c":150,"id":19,"t":"Psalm"},{"c":31,"id":20,"t":"Proverbs"},{"c":12,"id":21,"t":"Ecclesiastes"},{"c":8,"id":22,"t":"Song of Solomon"},{"c":66,"id":23,"t":"Isaiah"},{"c":52,"id":24,"t":"Jeremiah"},{"c":5,"id":25,"t":"Lamentations"},{"c":48,"id":26,"t":"Ezekiel"},{"c":12,"id":27,"t":"Daniel"},{"c":14,"id":28,"t":"Hosea"},{"c":3,"id":29,"t":"Joel"},{"c":9,"id":30,"t":"Amos"},{"c":1,"id":31,"t":"Obadiah"},{"c":4,"id":32,"t":"Jonah"},{"c":7,"id":33,"t":"Micah"},{"c":3,"id":34,"t":"Nahum"},{"c":3,"id":35,"t":"Habakkuk"},{"c":3,"id":36,"t":"Zephaniah"},{"c":2,"id":37,"t":"Haggai"},{"c":14,"id":38,"t":"Zechariah"},{"c":4,"id":39,"t":"Malachi"}];

var newBooks = [{"c":28,"id":40,"t":"Matthew"},{"c":16,"id":41,"t":"Mark"},{"c":24,"id":42,"t":"Luke"},{"c":21,"id":43,"t":"John"},{"c":28,"id":44,"t":"Acts"},{"c":16,"id":45,"t":"Romans"},{"c":16,"id":46,"t":"1 Corinthians"},{"c":13,"id":47,"t":"2 Corinthians"},{"c":6,"id":48,"t":"Galatians"},{"c":6,"id":49,"t":"Ephesians"},{"c":4,"id":50,"t":"Philppians"},{"c":4,"id":51,"t":"Colossians"},{"c":5,"id":52,"t":"1 Thessalonians"},{"c":3,"id":53,"t":"2 Thessalonians"},{"c":6,"id":54,"t":"1 Timothy"},{"c":4,"id":55,"t":"2 Timothy"},{"c":3,"id":56,"t":"Titus"},{"c":1,"id":57,"t":"Philemon"},{"c":13,"id":58,"t":"Hebrews"},{"c":5,"id":59,"t":"James"},{"c":5,"id":60,"t":"1 Peter"},{"c":3,"id":61,"t":"2 Peter"},{"c":5,"id":62,"t":"1 John"},{"c":1,"id":63,"t":"2 John"},{"c":1,"id":64,"t":"3 John"},{"c":1,"id":65,"t":"Jude"},{"c":22,"id":66,"t":"Revelation"}];

const versions = [{"ar":"ASV","id":2,"vn":"American Standard Version"},{"ar":"BBE","id":3,"vn":"Bible in Basic English"},{"ar":"DBY","id":4,"vn":"Darby English Bible"},{"ar":"KJV","id":5,"vn":"King James Version"},{"ar":"TWF","id":1,"vn":"Twenty-First Century Bible"},{"ar":"NWB","id":6,"vn":"Webster's Bible"},{"ar":"WEB","id":7,"vn":"World English Bible"},{"ar":"YLT","id":8,"vn":"Young's Literal Translation"}]
// #endregion Data for Books and Versions



