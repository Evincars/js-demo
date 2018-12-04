'use strict';

(function () {
    documentRootElement();
    childNodes();
    getElements();
})();

function documentRootElement() {
    for (let node of document.documentElement.childNodes) { // documentElement == HTML element
        console.log(node);
    }
}

function childNodes() {
    const inheritance = document.body.parentNode === document.documentElement; // true
    const counterElement = document.body.firstChild; // body itself
    const nextSiblingOfChild = counterElement.nextSibling; // div
    const previousSiblingOfChild = counterElement.previousSibling; // null
}

function getElements() {
    const counterElementById = document.getElementById('counterElement');
    const counterElement = document.getElementsByTagName('div#counterElement');
    const heavyArtillery = document.querySelectorAll('div#heavyArtillery ul > li');

    const matchesResult = heavyArtillery[0].matches('b');
}