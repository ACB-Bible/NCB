let pako = require('./pako.min.js');
let fs = require('fs');
var workVersions = [];
var versionidx = 0;

async function startUp() {

    console.log('Start:');
    let path = `./DATA/1-Misc/`;
    var vrs = fs.readFileSync(`${path}WorkVersions.json`, 'utf8');
    workVersions = await JSON.parse(vrs);
    let vrabr = workVersions[versionidx].ar;

    if (workVersions.length > 0) { console.time("Timer"); };
    path = `./DATA/${vrabr}/${vrabr}`;
    //zipJson(path)
    unzipJson(path)
    console.log('Finished!');
};

async function zipJson(path) {

    var file = fs.readFileSync(`${path}Verses.json`, 'utf8');
    const verses = JSON.stringify(file);
    let zipped = await pako.gzip(verses, { to: 'string' });
    if (zipped) { writeFile(`${path}Verses.json.gz`, zipped, 'binary') }
};

async function unzipJson(path) {

    var file = fs.readFileSync(`${path}Verses.json.gz`);
    let unzipped = await pako.ungzip(file, { to: 'string' });
    let json = await JSON.parse(unzipped);
    let saveFile = JSON.stringify(json);
    if (json) { writeFile(`${path}Versesun.json`, saveFile) };
};

async function writeFile(path, file, type = 'utf8') {
    // fs.writeFile encoding options = ascii, base64, binary, hex, ucs2, utf8, utf16le
    return new Promise((resolve, reject) => {
        fs.writeFile(path, file, type, err => {
            if (err) { console.error(err.message); reject(false); } else { resolve(true); };
        });
    });
};

startUp();