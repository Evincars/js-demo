'use strict'; // use modern ES features

const typeOfArray = typeof [1, 2, 3]; // array is always object
const exponent = `2^4 = ${2 ** 4}`;
const stringToBoolean = !!"convert string to boolean by double NOT";

const convertedToString = String(12345);

const constructorObject = new Object(); // object constructor syntax
let user = {}; // object literal syntax

const multipleWordsProperty = 'doing fitness';
const login = 'lasak.ad@gmail.com';
const password = 'admin';

const address = { // we can define object as a 'constant'
    city: 'Ostrava',
    street: '28. rijna',
    streetNumber: 30,
};
address.city = 'Koberice'; // address constant still refers to same memory, we're changing only property
address.street = 'Nadrazni';

const id = Symbol("id");

user = { // note: objects are always TRUE
    [id]: 'Some ID', // If another script or a library loops over our object, it won’t unexpectedly access a symbolic property - symbol is hidden
    login,
    password,
    salary: 35000,
    propertyToBeDeleted: true,
    [multipleWordsProperty]: false, // “trailing” or “hanging” comma - easier to add/remove/move around properties
    sayHi: function () { console.log(`Hello ${this.login}!`); }, // arrow functions doesn't have 'this' operator
    sayBye() { console.log(`Bye ${this.login}!`) },

    [Symbol.toPrimitive](hint) { // using symbols, ! must return a primitive type !
        console.log(`hint: ${hint}`);
        return hint == "string" ? `{ login: ${this.login} }` : this.salary;
    },

    toString() { // when compiler don't find Symbol.toPrimitive, he's looking for 'old-way' => toString(), valueOf()
        return `{ login: ${this.login} }`;
    },

    valueOf() { // toString and valueOf are for historicla reasons
        return this.salary;
    },
};
user[multipleWordsProperty] = true;
user.isAdmin = true; // add property

const stringRepresentationOfUser = `${user}`;
const intRepresentationOfUser = +user + 5000;

createInstanceOfConstructorFunction();

callingMethodsAndDefaultTypeConversion();

referenceAndCloningObject();

delete user.propertyToBeDeleted; // correct by Google: user.propertyToBeDeleted = undefined;

symbolMethods();

checkPropertyOfObject();

goThroughAllProperties();

string();

function createInstanceOfConstructorFunction() {
    const machine = new Machine('engine', '50 kW'); // if Machine wouldn't have any params, we can call 'new Machine', without brackets
}

function Machine(type, performance) { // constructor of machine 'class'
    // this = {};  (implicitly)
    this.type = type;
    this.performance = performance;
    // return this;  (implicitly)
}

function callingMethodsAndDefaultTypeConversion() {
    user.sayHi();
    user['sayHi']();
    user.sayBye();
}

function referenceAndCloningObject() {
    let userReferenceCopy = user; // reference copy
    userReferenceCopy.login = 'adam.lasak@tieto.com';
    let clonedAndMergeObjects = new Object();
    Object.assign(clonedAndMergeObjects, user, address);
}

function symbolMethods() {
    // GLOBAL SYMBOL - symbols inside the registry, it's accessible everywhere in code
    const anotherSymbol = Symbol.for("Another ID"); // if it will not find Symbol with 'Another ID' string, then it'll create one
    const compareAnotherSymbolWithCreatedOne = anotherSymbol === Symbol.for("Another ID");
    const searchedKeyBySymbol = Symbol.keyFor(anotherSymbol);
}

function goThroughAllProperties() {
    let keys = new Array();
    for (let key in user) { // go through all poperties in 'user' object
        keys.push(key);
    }
}

function checkPropertyOfObject() {
    const checkOwnPropertyOldStyle = user.noSuchProperty === undefined;
    const checkOwnPropertyNewStyle = 'noSuchProperty' in user;
}

function string() {
    // “object wrapper” is created that provides the extra functionality to primitive object (string, number, symbol, null, ...), and then is destroyed.
    // they are typing like String, Number, Symbol, Boolean ... null or undefined doesn't have wrapper
    let str = 'adam lasak'; // const str = new String('adam'); ==>> highly unrecommended
    str = str.toUpperCase();

    const width = '100px';
    const convertNumberToBinary = 123456..toString(2); // also cab be write as (123456).toString(2);
    const convertNumberTo36Base = 123456..toString(36); // can be used for example in storten url, in this case output will be 2n9c
    const widthNumber = parseInt(width); // better than union + or Number(...), because it ignores the '...px' string
    const parseIntToHexa = parseInt('0xff', 16);
    // ~n = -(n + 1)
    // ~2 = -3
    // ~-1 = 0
    let indexOfMatch = '';
    if (~width.indexOf('px')) { // if false, indexOf(...) returns -1, and ~-1 is 0 so the if statement will be false
        indexOfMatch = width.indexOf('px');
    }
    const startsWith = width.startsWith('1');
    const endsWith = width.endsWith('0p');
    const substring = width.substring(0, 2); // first start, second end element, but splice is more optimized
    const substr = width.substr(0, 4); // first is start from element, second is length
    const splice = width.slice(0, 2); // most used, recommended, frist number must not be greater than second one
}