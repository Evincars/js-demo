
(function advanced() {
    arrayTest();
})();

function arrayTest() {
    const names = new Array('Jörg', 'adam', 'valentina'); // Array is a Object
    const namesWithGivenArrayLenght = new Array(20);
    const anotherNames = names; // also copy the reference

    names.shift(); // remove first element, pop() remove the last one

    ///// names.addressString = 'Sth 15, Stockholm' 
    // we can work with array like it was an object, but ES engine tuns it into object and advantages of Array collectoin disappear (fast, efficient, ...)
    names.push('marek');
    names.push('jarek');
    names.splice(names.length - 1, 1); // from last index remove 1 element
    names.splice(0, names.length, 'adam', 'and', 'valentina', '?'); // from first element to last one replace with: 'adam', 'and', 'valentina'

    const removedElements = names.splice(names.length - 1, 1);
    console.log(`removedElements: ${removedElements}`);

    names.splice(names.length, 0, 'will', 'be', 'married'); // from last element, delete 0 elements and replace them with: 'will', 'be', 'married'
    console.log(names);

    for (let i of [1, 2, 3]) { // for (let ... in ...) // is for objects, otherwise for...of for arrays, but we for.in shouldn't use, it's slowerer
        console.log(`\t${i}`);
    }
    names.length = 0; // simplest way to clear array
}