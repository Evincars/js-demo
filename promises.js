'use strict';

// A “thenable” object is any object with a method .then.
// The idea is that 3rd-party libraries may implement “promise-compatible” objects of their own. 
// They can have extended set of methods, but also be compatible with native promises, because they implement .then.
class Thenable {
    constructor(num) {
        this.num = num;
    }
    then(resolve, reject) {
        console.log(resolve); // function() { native code }
        // resolve with this.num*2 after the 1 second
        setTimeout(() => resolve(this.num * 2), 1000); // (**)
    }
}

(function () {
    basicPromise();
    chainedPromise().then(
        // subscribers (fans of singer - singer is promise)
        function (result) { console.log('promises done'); },
        function (error) { console.log('this error will never called'); }
    );

    new Promise(resolve => resolve(1)) // This feature allows to integrate custom objects with promise chains without having to inherit from Promise.
        .then(result => {
            return new Thenable(result); // (*)
        })
        .then(result => console.log(result)); // shows 2 after 1000ms

    fetchExample();

    // To summarize, .then/catch(handler) returns a new promise that changes depending on what handler does:

    // If it returns a value or finishes without a return (same as return undefined), then the new promise 
    // becomes resolved, and the closest resolve handler (the first argument of .then) is called with that value.
    // If it throws an error, then the new promise becomes rejected, and the closest rejection handler 
    // (second argument of .then or .catch) is called with it. 

    promiseResolve().then(resolve => console.log(resolve));
    promiseReject()
        .then(resolve => console.log('this will be skipped because of returning reject'))
        .catch(err => console.log(err));
    promiseAll()
        .then(resolve => resolve.forEach(m => console.log(`promiseAll: ${m}`))) // will be ignored because of error
        .catch(err => console.error(err));
    promiseRace()
        .then(resolve => console.log(`promiseRace: ${resolve}`))
        .catch(err => console.log(err));
})();

function basicPromise() {

    // resolve and reject — these functions are pre-defined by the JavaScript engine
    // promise object has internal properties (not accessible from inside promise, use then/catch for it):
    //  * state — initially “pending”, then changes to either “fulfilled” or “rejected”,
    //  * result — an arbitrary value of your choosing, initially undefined.
    const promise = new Promise(function (resolve, reject) { // new Promise is called the executor - called immediately
        setTimeout(() => { reject(new Error('operation has been rejected')) }, 1000);
    });

    // Promises allow us to do things in the natural order. First, we run loadScript, and .then we write what to do with the result.
    // We can call .then on a Promise as many times as we want. Each time, we’re adding a new “fan”, a new subscribing function, 
    // to the “subscription list”.

    // consumers: “then” and “catch”
    // consuming functions can be registered !!(subscribed)!! using the methods .then and .catch.
    // 'then' returns also 'then' -> we can make a chain of calls
    promise.then( // 1st variant
        function (result) { console.log(result) },
        function (error) { console.log(error) }
    );

    promise.then( // 2nd variant
        result => console.log(result),
        error => console.log(error)
    );

    promise.catch( // 3rd variant - catch only errors - equivalent of promise.then(null, error => {...})
        error => console.log(error)
    );

    promise.then( // 4rd variant - consume only successfull results
        result => console.log(result)
    )
}

function chainedPromise() {
    return new Promise(function (resolve, reject) {
        // setTimeout(() => reject(), 900); // will never appear because we don't catch it down
        setTimeout(() => resolve(1), 1000);

    }).then(function (result) {

        console.log(result); // 1
        return new Promise((resolve, reject) => { // we have to return either new Promise(...) or one of this two functions - resolve, reject
            setTimeout(() => { return resolve(result * 2); }, 1000); // we don't have to use 'return' keyword
        });

    }).then(function (result) {

        console.log(result); // 2
        return new Promise((resolve, reject) => {
            setTimeout(() => resolve(result * 2), 1000);
        });

    }).then(function (result) {
        console.log(result); // 4
    });
}

/*
PYRAMID OF DOOM with promises (don't use it - use chaining):

loadScript("/article/promise-chaining/one.js").then(function(script1) {
  loadScript("/article/promise-chaining/two.js").then(function(script2) {
    loadScript("/article/promise-chaining/three.js").then(function(script3) {
      // this function has access to variables script1, script2 and script3
      one();
      two();
      three();
    });
  });
});
*/

function fetchExample() {

    fetch('https://javascript.info/article/promise-chaining/user.json')
        .then(response => response.json())
        .then(user => fetch(`https://api.github.com/users/${user.name}`))
        .then(response => response.json())
        .then(githubUser => new Promise(function (resolve, reject) {
            let img = document.createElement('img');
            img.src = githubUser.avatar_url;
            img.className = "promise-avatar-example";
            document.body.append(img);

            setTimeout(() => {
                img.remove();
                resolve(githubUser);
            }, 3000);
        }))
        // triggers after 3 seconds
        .then(githubUser => console.log(`Finished showing ${githubUser.name}`));

}

function promiseResolve() {
    const fakeFetchedTextFromAPI = '{"name": "Adam", "surname": "Lasak"}';

    // the method is used when we already have a value, but would like to have it “wrapped” into a promise.
    return Promise.resolve(fakeFetchedTextFromAPI); // same as let promise = new Promise(resolve => resolve(value));
}

function promiseReject() {
    const fakeFetchedTextFromAPI = '{"err": "Server doesn\'t reponse"}';

    // rarely used
    return Promise.reject(fakeFetchedTextFromAPI); // let promise = new Promise((resolve, reject) => reject(error));
}

function promiseAll() {
    // The method to run many promises in parallel and wait till all of them are ready.
    // It takes an iterable object with promises, technically it can be any iterable, but usually it’s an array, and returns a new promise.

    // The important detail is that promises provide no way to “cancel” or “abort” their execution. 
    // So other promises continue to execute, and the eventually settle, but all their results are ignored.
    return Promise.all([
        new Promise((resolve, reject) => setTimeout(() => resolve(1), 1000)),
        new Promise((resolve, reject) => setTimeout(() => resolve(2), 500)),
        new Promise((resolve, reject) => setTimeout(() => reject(new Error('promiseAll err')), 1500)),
        4, // treated as Promise.resolve(4)
    ]);
}

function promiseRace() {
    // Similar to Promise.all takes an iterable of promises, but instead of waiting for all of them to finish 
    // – waits for the first result (or error), and goes on with it.

    return Promise.race([
        new Promise((resolve, reject) => setTimeout(() => resolve('I am first'), 1000)),
        new Promise((resolve, reject) => setTimeout(() => reject(new Error("Whoops!")), 2000)),
        new Promise((resolve, reject) => setTimeout(() => resolve('I am last'), 3000))
    ]);
}