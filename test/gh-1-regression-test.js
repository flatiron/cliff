/*
 * gh-1-regression-test.js:
 *
 * (C) 2010, Nodejitsu Inc.
 *
 */
 
var assert = require('assert'),
    vows = require('vows'),
    eyes = require('eyes'),
    cliff = require('../lib/cliff');
    
vows.describe('cliff/gh-1 regression').addBatch({
  "When using cliff module": {
    "the arrayLengths() method called with numbers in rows": {
      "should respond with a list of the longest elements": function () {
        var lengths, rows = [
          [11, "2a",  "3a",   "4a"],
          ["1b", 222, "3b",   "4b"],
          ["1c", "2c",  3333, "4c"],
          ["1d", "2d",  "3dd",  44444]
        ];
        
        lengths = cliff.arrayLengths(rows);
        assert.equal(lengths[0], 2);
        assert.equal(lengths[1], 3);
        assert.equal(lengths[2], 4);
        assert.equal(lengths[3], 5);
      }
    },
    "the stringifyRows() method": {
      "should calculate padding correctly for numbers": function() {
        var rows = [
              ['a', 'b'],
              [12345, 1]
            ],
            output = cliff.stringifyRows(rows);
        assert.equal(output, 'a     b \n12345 1 ');
      }
    }
  }
}).export(module);
