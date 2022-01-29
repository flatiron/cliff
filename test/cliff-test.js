/*
 * log-test.js: Tests for cliff.
 *
 * (C) 2010, Charlie Robbins & the Contributors
 *
 */

// When using cliff with winston 0.8.x in node 14.x a warning is emitted:
//
// Warning: Accessing non-existent property 'padLevels' of module exports
// inside circular dependency
//
// The warning is emitted when we require'd cliff, which happens before any
// test, so in order to test that a warning is *not* emitted we have to capture
// it before requiring cliff.
var warnings = [];
process.on('warning', function(warning) {
  warnings.push(warning);
});

var assert = require('assert'),
    vows = require('vows'),
    eyes = require('eyes'),
    cliff = require('../lib/cliff');

vows.describe('cliff').addBatch({
  "When require cliff module": {
    "no warning should be raised": function () {
      var rows = [
        ["a", "b"],
      ];
      cliff.putRows('info', rows, ['red', 'green']);
      assert.isEmpty(warnings);
    },
  },
  "When using cliff module": {
    "the columnMajor() method": {
      "should respond with rows in column major form": function () {
        var columns, rows = [
          ["1a", "2a", "3a", "4a"],
          ["1b", "2b", "3b", "4b"],
          ["1c", "2c", "3c", "4c"]
        ];

        columns = cliff.columnMajor(rows);
        for (var i = 0; i < columns.length; i++) {
          columns[i].forEach(function (val) {
            assert.isTrue(val.indexOf(i + 1) !== -1);
          });
        }
      }
    },
    "the arrayLengths() method": {
      "with a set of strings": {
        "should respond with a list of the longest elements": function () {
          var lengths, rows = [
            ["1a", "2a",  "3a",   "4a"],
            ["1b", "2bb", "3b",   "4b"],
            ["1c", "2c",  "3ccc", "4c"],
            ["1d", "2d",  "3dd",  "4dddd"]
          ];

          lengths = cliff.arrayLengths(rows);
          assert.equal(lengths[0], 2);
          assert.equal(lengths[1], 3);
          assert.equal(lengths[2], 4);
          assert.equal(lengths[3], 5);
        }
      },
      "with a set of numbers and strings": {
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
      }
    },
    "the stringifyRows() method": {
      "should calculate padding correctly for numbers": function() {
        var rows = [
          ['a', 'b'],
          [12345, 1]
        ];

        assert.equal(
          cliff.stringifyRows(rows),
          'a     b \n12345 1 '
        );
      }
    }
  }
}).export(module);
