var cliff = require('../lib/cliff');

var rows = [
  ['Name',  'Flavor',    'Dessert'],
  ['Alice'.grey, 'cherry'.cyan,    'yogurt'.yellow],
  ['Bob',   'carmel',    'apples'],
  ['Joe',   'chocolate', 'cake'],
  ['Nick',  'vanilla',   'ice cream']
];

cliff.putRows('data', rows, ['red', 'blue', 'green']);

