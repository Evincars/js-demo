'use strict';

(function () {
    basicPromise();
})();

function basicPromise() {

    // resolve and reject — these functions are pre-defined by the JavaScript engine
    // promise object has internal properties (not accessible from inside promise, use then/catch for it):
    //  * state — initially “pending”, then changes to either “fulfilled” or “rejected”,
    //  * result — an arbitrary value of your choosing, initially undefined.
    const promise = new Promise(function(resolve, reject) { // new Promise is called the executor - called immediately
        setTimeout(() => {reject(new Error('operation has been rejected'))}, 1000);
    });

    // consumers: “then” and “catch”
    promise.then( // 1st variant
        function(result) {console.log(result)},
        function(error) {console.log(error)}
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