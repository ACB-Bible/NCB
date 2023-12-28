const elasticlunr = require("../JS/elasticlunr.min.js");
const fs = require('fs');
var workVersions = [];  // Array holding the working list of bible versions
var versionidx = 10;    // The index position of the active processing bible version
var ext = '.elidx' //  file extension for the elasticlunr index when it's saved to disc

async function startUp() {
    let path = `../Search/DATA/1-Misc/`;
    const vrs = await fs.promises.readFile(`${path}WorkVersions.json`);
    workVersions = await JSON.parse(vrs);
    let vrabr = workVersions[versionidx].ar;
    path = `../Search/DATA/${vrabr}/${vrabr}`;
    if (workVersions.length > 0) { console.time("time") };
    let index = await new elasticlunr();
    let builtIndex = await buildIndex(path, index);
    if (res) { writeFile(path, builtIndex, ext); };

};

async function buildIndex(path, index) {

    const vrs = await fs.promises.readFile(`${path}Verses.json`);
    const verses = await JSON.parse(vrs);
    index.addField('vid');
    index.addField('vt');
    index.setRef('vt');
    verses.forEach((verse) => {
        index.addDoc(verse);
    }, this);
    const indexSizeInBytes = JSON.stringify(index).length / 1048576;
    console.log(`Index Size: ${indexSizeInBytes} MB`);
    return index;
};

async function writeFile(path, index, ext) {

    return new Promise((resolve, reject) => {
        let file = JSON.stringify(index.toJSON(index));
        fs.writeFile(`${path}Verses${ext}`, file, err => {
            if (err) { console.error(err.message); reject(false); } else { resolve(true); };
        });
    });
};

let res = startUp();