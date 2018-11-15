'use strict';

(function () {
    usingTryCatchAsynchronous();

    try { // outer try...catch 
        throwingAnError();
    } catch (err) {
        console.error(err.stack);
    }

    tryCatchFinally();
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
            const customErrorObject = { customError: 'customError', message: 'message' };
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

        if (err.name === 'SyntaxError') { // error that we know
            console.error(err.stack);
        } else { // ...other errors will be 'rethrowed'
            throw err; // ...can be either caught by an outer try..catch construct (if it exists), or it kills the script.
        }

    }
}

function tryCatchFinally() {

    // NOTE: try..finally construct, without catch clause, is also useful. We apply it when we don’t want to handle errors 
    //       right here, but want to be sure that processes that we started are finalized.
    try {
        throw new Error('some error');
    } catch (err) {
        if (err.name == 'Error') {
            console.error(err.stack);
        } else {
            throw err;
        }
    } finally { // often used when we start doing something before try..catch and want to finalize it in any case of outcome.
        console.info('always called'); // will be called even if return statement is in 'try' block
        return 1; // ...explicit return
    }
}