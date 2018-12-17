'use strict';

// Like promise.then, await allows to use thenable objects (those with a callable then method). 
// Again, the idea is that a 3rd-party object may not be a promise, but promise-compatible: 
// if it supports .then, that’s enough to use with await
class AsyncThenable {
    constructor(num) {
        this.num = num;
    }
    then(resolve, reject) {
        setTimeout(() => resolve(this.num * 2), 1000);
    }
};

// At the top level of the code, when we’re outside of any async function, we’re syntactically 
// unable to use await, so it’s a normal practice to add .then/catch to handle the final result 
// or falling-through errors.
(function() {
    simpleAsyncFunction().then(resolve => console.log(resolve));
    thenableAwait();
    fetchData('http://www.adam-lasak.xf.cz').catch(err => console.error(err));

    // we can use await for Promise.all(...)
    const results = await Promise.all([
        fetch('http://www.adam-lasak.xf.cz?queryString=ADaM'),
        fetch('http://www.adam-lasak.xf.cz/user/2'),
    ]);
})();

// async wraps funtion into promise
async function simpleAsyncFunction() {
    return 'Hello async!'; // same as return Promise.resolve('Hello async!');
}

async function thenableAwait() {
    // await works only inside async function
    let result = await new AsyncThenable(10);
    console.log(result);
}

async function fetchData(url) {
    try {
        let result = await fetch(url);
        result = result.json(); 
    } catch (err) {
        // same as throw new Error(...); or return err;
        await Promise.reject(new Error(`another type of error: ${err.response.status}`));
    }
}