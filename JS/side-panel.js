function ncbSwapPanel() {
    if (panelSwapped) {
        document.getElementById('id-ncbSidePanel1').style.display = "none";
        document.getElementById('id-ncbSidePanel2').style.display = "block";
        document.getElementById('id-ncbSideH').textContent = "Settings";
        panelSwapped = false;
    } else {
        document.getElementById('id-ncbSidePanel1').style.display = "block";
        document.getElementById('id-ncbSidePanel2').style.display = "none";
        document.getElementById('id-ncbSideH').textContent = "Verse of the Day";
        panelSwapped = true;
    };
};

function ncbReadChapter() {

};

function ncbShareChapter() {

};

function ncbTheme() {

};

function ncbDefaultVersion() {

};
