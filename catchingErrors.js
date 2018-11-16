'use strict';

class MyError extends Error {
    constructor(message) {
        super(message);
        this.name = this.constructor.name;
    }
}

class LoginError extends MyError {
    constructor(message) {
        super(message); // this.__prototype__.constructor.call(this, ...)
        // this.name = 'LoginError'; // with MyError class we don't need to everytime set this.name=<class name>
    }
}

class UserDoesNotExistError extends LoginError {
    constructor(message) {
        super(`db query: ${message}`);
        // this.name = 'UserDoesNotExistError'; // with MyError class we don't need to everytime set this.name=<class name>
    }
}

(function () {
    usingTryCatchAsynchronous();

    try { // outer try...catch 
        throwingAnError();
    } catch (err) {
        console.error(err.stack);
    }

    tryCatchFinally();
    usingInstanceofInExceptions();
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

function loginUser(loginName, password) {

    const loginData = new Map([
        ['admin', 'passwd'],
        ['lasak.ad@gmail.com', 'passwd']
    ]);
    const loginExist = loginData.has(loginName);

    if (!loginExist) {
        throw new UserDoesNotExistError('user does not exist');
    }

    const collectionPassword = loginData.get(loginName);
    if (collectionPassword != password) {
        throw new LoginError('wrong username or password');
    }

}

function usingInstanceofInExceptions() {
    try {
        loginUser('admin1', 'passwd1'); // set wrong username or login which is not in 'DB'
    } catch (err) {
        if (err instanceof LoginError) { // we can just put main ancestor and it catch all descendants errors
            console.error(err.stack);
        } else {
            throw err;
        }
    }
}