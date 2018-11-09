
(function () {
    propertyFlags();
    gettersAndSetters();
    inheritance();
    prototypeProperty();
})();

// note: For instance, when we create an array [1, 2, 3], the default new Array() constructor is used internally

function propertyFlags() {

    const user = {
        name: 'Adam',
    };

    let defaultPropertySettings = Object.getOwnPropertyDescriptor(user, 'name');
    Object.defineProperty(user, 'name', {
        value: 'admin',
        writable: false,
        enumerable: true,
        configurable: false // after this, we never can define properties of 'name' property
    });
    Object.defineProperties(user, { // define multiple properties
        surname: { value: 'lasak', writable: true },
        birth: { value: '1996-07-22', configurable: false },
    });
    defaultPropertySettings = Object.getOwnPropertyDescriptor(user, 'name');
    user.name = 'adam'; // still will be 'admin'

    const potentialClone = Object.defineProperties({}, Object.getOwnPropertyDescriptors(user));

    user.address = 'Koberice, Nadrazni 35';
    Object.preventExtensions(user); // cannot add properties
    user.sth = 'sth'; // 'sth' property will not be added
    Object.seal(user); // cannot add/remove properties
    delete user.address;
    Object.freeze(user); // cannot add/remove/change properties
    user.address = 'Koberice, Nadrazni 350/35';

    const isExtensible = Object.isExtensible(user); // returns false if adding properties is forbidden, otherwise true.
    const isSealed = Object.isSealed(user); // returns true if adding/removing properties is forbidden, and all existing properties have configurable: false.
    const isFrozen = Object.isFrozen(user); // returns true if adding/removing/changing properties is forbidden, and all current properties are configurable: false, writable: false.

}

function gettersAndSetters() {

    // property can be either an accessor or a data property
    // getter and setter also can be defined in Object.defineProperty(...)
    // properties with underscore before are technicaly accessible outside, but it can be understand as internal variable
    const user = {
        _name: 'Till', // data property
        _surname: 'Lindemann', // data property
        get fullName() { // accessor
            return `${this._name} ${this._surname}`;
        },
        set fullName(value) { // accessor
            if (value.length < 4) {
                return;
            }
            [this._name, this._surname] = value.split(' ');
        },
    }

    Object.defineProperty(user, 'toString', {
        get() {
            return `[${new Date().getFullYear()}] ${this.fullName}`;
        }      
    });

    const fullName = user.fullName; // not user.fullName()
    user.fullName = 'Adam Lasak';
    const toString = user.toString;

}

function inheritance() {

    // objects have a special hidden property [[Prototype]], that is either null 
    // or references another object. That object is called “a prototype”:
    // ...simplify it's reference to ancestor object
    // [[Prototype]] can be set as __proto__ = obj;

    const user = {
        name: "John",
        surname: "Smith",
      
        set fullName(value) {
          [this.name, this.surname] = value.split(' ');
        },
      
        get fullName() {
          return `${this.name} ${this.surname}`;
        },
      };
      
    const admin = {
        __proto__: user,
        isAdmin: true,
    };

    const superAdmin = {
        __proto__: user, // if we replace the default prototype as a whole, then there will be no "constructor" in it.
        isSuperAdmin: true,
    }
    
    const adminPreviousName = admin.fullName;
    admin.fullName = 'Adam Lasak';
    const currentAdmin = admin.fullName;
}

function prototypeProperty() {

    // NOTE: for null and undefined are not protypes
    //       for string, number, boolean are, like String.prototype, etc. => they are wrappers for primitive types

    // every function has a prototype property with a value of the object type, then new operator 
    // uses it to set [[Prototype]] for the new object.
    const animal = {
        eats: true
    };

    const sth = {
        sth: 'sth'
    }
      
    function Rabbit(name) { // inherit from Function which inherit from Object
        this.name = name;
    }
    function Horse(name) {}

    sth.prototype = animal; // for object it only create a 'prototype' property, which is NOT __proto__
    const horse = new Horse('sth');

    // whne we have an object, don’t know which constructor was used for it (e.g. it comes from a 3rd party library), and we need to create another one of the same kind.
    const horseFromConstructor = new horse.constructor('sth2');

    const referenceToItself = Horse.prototype.constructor === Horse; // the default "prototype" is an object with the only property constructor that points back to the function itself.
    const referenceFromDescendant = horse.constructor === Horse;
    const everythingInheritFromObject = [].__proto__.__proto__ === Object.prototype;
    
    Rabbit.prototype = animal;
    // Not overwrite Rabbit.prototype totally, just add to it. The default Rabbit.prototype.constructor is preserved
    Rabbit.prototype.jumps = true

    const rabbit = new Rabbit("White Rabbit"); //  rabbit.__proto__ == animal

    String.prototype.helloWorld = function() { // we can add methods and properties to main ancestor objects, but it's not recomended
        return `Hello world! ${this}`;
    }

    const customFunctionInPrototype = "Adam".helloWorld();

    function makeString(){
        // The central benefit of function borrowing is that it allows you to forego inheritance. 
        // There’s no reason for you to force a class to inherit from another if you’re only doing so in order to 
        // grant instances of the child class access to a single method.

        // return [].join.call(arguments, ' - ');
        return Array.prototype.join.call(arguments, ' - '); // same, only with using prototypes
    }

    const borrowingFunction = makeString('adam', 'lasak', '96');
}