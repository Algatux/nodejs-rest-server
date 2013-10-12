assert = require('assert');
fs = require('fs');

describe('Database exists', function(){
    describe('cheching database file existance', function(){
        it('should return true value', function(){
            fs.exists('./storage/database.db', function (exists) {
                assert.strictEqual(exists,true);
            })
        })
    })
})