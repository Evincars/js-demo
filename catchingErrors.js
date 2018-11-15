'use strict';

(function () {
    usingTryCatchAsynchronous();
    throwingAnError();
})();

function usingTryCatchAsynchronous() {

    setTimeout(() => { // try...catch is synchronous, it must be in setTimeout(...) or in another similar function
        try {
            const jsonResponse = '{ bad json }';
            const response = JSON.parse(jsonResponse);
        } catch (err) {
            console.log(err.name);
            console.log(err.message);
            console.log(err.stack); // the most useful, it prints name + message + where the error has occurs
        }
    }, 1000);

}

function throwingAnError() {

    const jsonResponse = '{"id": 0, "isAdmin": true, "login": "admin"}';

    try {
        if (!false) {
            const customErrorObject = {customError: 'customError', message: 'message'};
            throw customErrorObject;
        }
    } catch (err) {
        console.error(err.customError + ': ' + err.message);
    }

    try {
        const user = JSON.parse(jsonResponse);

        if (!user.name) {
            const error = new SyntaxError('cannot find property name');
            throw error; // ...or throw new SyntaxError(...)
        }
    } catch (err) {
        console.error(err.message);
    }

    try {
        throw new Error('some syntax error');
    } catch (err) { // !! each 'try...catch' block should catch only errors that it knows and others 'rethrow' !!

        if (err.name === 'SyntaxError'){ // error that we know
            console.error(err.stack);
        } else { // ...other errors will be 'rethrowed'
            throw err;
        }

    }
}