
(function dataTypes() {
    array();
    iterator();
    map();
})();

function array() {
    const names = new Array('Jörg', 'adam', 'valentina'); // Array is a Object
    const additionalInfo = ['at', '2021'];
    const namesWithGivenArrayLenght = new Array(20);
    const anotherNames = names; // also copy the reference
    const likeArray = {
        0: 'some string',
        1: 'some string',
        [Symbol.isConcatSpreadable]: true,
        length: 2,
    };

    names.shift(); // remove first element, pop() remove the last one

    ///// names.addressString = 'Sth 15, Stockholm' 
    // we can work with array like it was an object, but ES engine tuns it into object and advantages of Array collectoin disappear (fast, efficient, ...)
    names.push('marek');
    names.push('jarek');
    names.splice(names.length - 1, 1); // from last index remove 1 element
    names.splice(0, names.length, 'adam', 'and', 'valentina', '?'); // from first element to last one replace with: 'adam', 'and', 'valentina'

    const getCertainElements = names.slice(1, 4);
    const removedElements = names.splice(names.length - 1, 1);

    names.splice(names.length, 0, 'will', 'be', 'married'); // from last element, delete 0 elements and replace them with: 'will', 'be', 'married'

    const concatedArrays = names.concat(additionalInfo, '!', likeArray);

    let elementsOfArray = '';
    for (let i of [1, 2, 3]) { // for (let ... in ...) // is for objects, otherwise for...of for arrays, but we for.in shouldn't use, it's slowerer
        elementsOfArray += `${i}, `;
    }

    // note: equality doesn't work for NaN
    searchInArray(names);

    names.length = 0; // simplest way to clear array
}

function searchInArray(names) {

    const users = [
        { id: 0, name: 'Adam' },
        { id: 1, name: 'Valentina' },
        { id: 2, name: 'Katerina' },
    ];

    const foundedUser = users.find(item => item.id == 1); // the find method looks for a first element that makes the function return true
    const foundedUserIndex = users.findIndex(item /* index, array */ => item.id == 1);
    const filteredUsers = users.filter(item /* index, array */ => item.name.startsWith('A') || item.name.startsWith('V'));

    // without sort arrow function, elements are converted to string, comparasion is lexicographic
    const sortedArray = [2, -2, 5, 100].sort((a, b) => a - b); // a - b is modern way, old way a>b return 1, a==b return 0, ...
    const reversedArray = [2, -2, 5, 100].sort((a, b) => a - b).reverse();

    const transformedArray = ['Aragorn', 'Frodo', 'Gandalf'].map((item, index, array) => { // map returns array by custom rules
        return { id: index, item, order: `${index + 1}/${array.length}` }
    });

    let indexOfValentina = 0;
    if (names.includes('valentina')) {
        indexOfValentina = names.indexOf('valentina');
    }

    const fellowship = 'Aragorn, Frodo, Gandalf';
    const arrayFellowship = fellowship.split(',');
    const delimeteredFellowship = arrayFellowship.join(';');

    // When we need to iterate over an array – we can use forEach.
    // When we need to iterate and return the data for each element – we can use map.
    const upperCaseFellowship = [];
    arrayFellowship.forEach(item => upperCaseFellowship.push(item.toLocaleUpperCase())); // in this case use map is better, but for demonstration...
    const isFellowshipArray = Array.isArray(upperCaseFellowship);

    const natureNumbers = [0, 1, 2, 3, 4, 5];
    const sumFromLeft = natureNumbers.reduce((sum, item, index, array) => sum + item, 0); // 0 is initial value, if not specified, then is first element taken
    const sumFromRight = natureNumbers.reduceRight((sum, item, index, array) => sum + item, 0);
}

function iterator() {

    // Iterables are objects that implement the Symbol.iterator method
    const range = {
        from: 1,
        to: 10,

        [Symbol.iterator]() {
            this.current = this.from;
            return this; // for..of loop needs next() method, we're returning this object with own next() method
        },

        next() { // necessary
            if (this.current <= this.to) { // current is defined by default
                return { done: false, value: this.current++ }; // structure is of returned object is strictly defined
            }
            return { done: true };
        },
    };

    const outputRange = new Array();
    for (let item of range) {
        outputRange.push(item);
    }

    const movieTitle = 'The Lord of the Rings';
    const outputChars = new Array();

    for (let char of movieTitle) { // using implicit iterator
        outputChars.push(char);
    }

    const iterator = movieTitle[Symbol.iterator]();
    outputChars.length = 0;

    while (true) { // using explicit iterator
        const result = iterator.next();
        if (result.done) break;
        outputChars.push(result.value);
    }

    const likeArray = { // likeArray have numbered properties and looks like array but actually is not. CANNOT iterate through likeArray
        0: 'Aragorn',
        1: 'Gandalf',
        length: 2,
    };

    // Array.from(obj[, mapFn, thisArg]) 
    //    -- mapFn should be the function to apply to each element before adding to the array, and thisArg allows to set this for it.
    const convertLikeArrayToArray = Array.from(likeArray, item => `main: ${item}`);
    convertLikeArrayToArray.push('Frodo');

    const convertStringToArray = Array.from(movieTitle); // ... just make array from anything
}

function map() {

    const frodo = { id: 3, name: 'Frodo' };
    const heroes = new Map([
        [{ id: 1, name: 'Aragorn' }, '500'],
        [{ id: 2, name: 'Gandalf' }, '900'],
    ]);

    heroes.set(frodo, 200).set({ id: 4, name: 'Sam' }, 250);

    const frodoMap = heroes.get(frodo);

    const abilities = new Map(Object.entries({
        power: 500,
        skill: 700
    }));

    const keysOfAbilities = new Array();
    for (let key of abilities.keys()) {
        keysOfAbilities.push(key);
    }

}