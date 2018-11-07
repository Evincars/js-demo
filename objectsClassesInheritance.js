
(function () {
    propertyFlags();
    gettersAndSetters();
})();

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