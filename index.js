'use strict'; // use modern ES features

console.log(typeof [1, 2, 3]); // array is always object
console.log(`2^4 = ${2 ** 4}`);
console.log(!!"convert string to boolean by double NOT");

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

user = {
    [id]: 'Some ID', // If another script or a library loops over our object, it won’t unexpectedly access a symbolic property - symbol is hidden
    login,
    password,
    salary: 35000,
    propertyToBeDeleted: true,
    [multipleWordsProperty]: false, // “trailing” or “hanging” comma - easier to add/remove/move around properties
    sayHi: function() { console.log(`Hello ${this.login}!`); }, // arrow functions doesn't have 'this' operator
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

// note: objects are always TRUE

// alert(user);
// alert(+user + 5000);

createInstanceOfConstructorFunctionTest();

callingMethodsAndDefaultTypeConversionTest();

referenceAndCloningObjectTest();

delete user.propertyToBeDeleted; // correct by Google: user.propertyToBeDeleted = undefined;

console.log(user);

symbolMethodsTest();

checkPropertyOfObjectTest();

goThroughAllPropertiesTest();

stringTest();

function createInstanceOfConstructorFunctionTest() {
    const machine = new Machine('engine', '50 kW'); // if Machine wouldn't have any params, we can call 'new Machine', without brackets
    console.log(machine);
}

function Machine(type, performance) { // constructor of machine 'class'
    // this = {};  (implicitly)
    this.type = type;
    this.performance = performance;
    // return this;  (implicitly)
}

function callingMethodsAndDefaultTypeConversionTest() {
    user.sayHi();
    user['sayHi']();
    user.sayBye();
}

function referenceAndCloningObjectTest() {
    let userReferenceCopy = user; // reference copy
    userReferenceCopy.login = 'adam.lasak@tieto.com';
    let clonedAndMergeObjects = new Object();
    Object.assign(clonedAndMergeObjects, user, address);
    console.log(user);
    console.log(clonedAndMergeObjects);
}

function symbolMethodsTest() {
    // GLOBAL SYMBOL - symbols inside the registry, it's accessible everywhere in code
    const anotherSymbol = Symbol.for("Another ID"); // if it will not find Symbol with 'Another ID' string, then it'll create one
    console.log(`anotherSymbol === Symbol.for("Another ID"): ${anotherSymbol === Symbol.for("Another ID")}`);
    console.log(`Symbol.keyFor(anotherSymbol): ${Symbol.keyFor(anotherSymbol)}`);
}

function goThroughAllPropertiesTest() {
    for (let key in user) { // go through all poperties in 'user' object
        console.log(`user key: ${key}`);
    }
}

function checkPropertyOfObjectTest() {
    const checkOwnPropertyOldStyle = user.noSuchProperty === undefined;
    const checkOwnPropertyNewStyle = 'noSuchProperty' in user;
    console.log(`user.noSuchProperty old style: ${checkOwnPropertyOldStyle}`);
    console.log(`user.noSuchProperty old style: ${checkOwnPropertyNewStyle}`);
}

function stringTest() {
    // “object wrapper” is created that provides the extra functionality to primitive object (string, number, symbol, null, ...), and then is destroyed.
    // they are typing like String, Number, Symbol, Boolean ... null or undefined doesn't have wrapper
    const str = 'adam lasak'; // const str = new String('adam'); ==>> highly unrecommended
    console.log(str.toUpperCase());

    const width = '100px';
    const convertNumberToBinary = 123456..toString(2); // also cab be write as (123456).toString(2);
    const convertNumberTo36Base = 123456..toString(36); // can be used for example in storten url, in this case output will be 2n9c
    console.log(`convertNumberToBinary: ${convertNumberToBinary}, convertNumberTo36Base: ${convertNumberTo36Base}`);
    const widthNumber = parseInt(width); // better than union + or Number(...), because it ignores the '...px' string
    console.log(`parseInt to hexa: ${parseInt('0xff', 16)}`);
    // ~n = -(n + 1)
    // ~2 = -3
    // ~-1 = 0
    if (~width.indexOf('px')) { // if false, indexOf(...) returns -1, and ~-1 is 0 so the if statement will be false
        console.log(`index of \'px\' string: ${width.indexOf('px')}`);
    }
    console.log(`${width.startsWith('1')}, substring(start pos, end pos): ${width.substring(0, 2)}`);
    console.log(`${width.endsWith('0p')}, substr(start pos, lenght): ${width.substr(0, 4)}`);
    console.log(`slice(start pos, end pos): ${width.slice(0, 2)}`); // most used, recommended, frist number must not be greater than second one
}