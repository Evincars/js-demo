'use strict';

var assert = require('assert');
var index = require('../index.js');

describe('js-demo', () => {

    let inputNumberA, inputNumberB;

    before(() => { // 'before' is run before mocha tests, same after
        (`before tests...`);
    });

    beforeEach(() => { // 'beforeEach' is run before every it(...) block, same after
        inputNumberA = 1;
        inputNumberB = 2;
    });

    describe('pow', () => {

        it('should pow numbers', () => {
            assert.equal(Math.pow(inputNumberA, inputNumberB), 1);
        });

    });

});