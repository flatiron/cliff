var cliff = require('../lib/cliff');

var table = [
  ["Name",  "Flavor",    "Dessert"],
  ["Alice", "cherry",    "yogurt"],
  ["Bob",   "carmel",    "apples"],
  ["Joe",   "chocolate", "cake"],
  ["Nick",  "vanilla",   "ice cream"]
];

cliff.putTable('info', table);
