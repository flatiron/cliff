# cliff

CLI output formatting tools: "Your CLI Formatting Friend".

## Installation

### Installing npm (node package manager)
```
  curl http://npmjs.org/install.sh | sh
```

### Installing cliff
```
  [sudo] npm install cliff
```

## Usage
There are a number of methods available in Cliff for common logging tasks in command-line tools. If you're looking for more usage, checkout the [examples in this repository][3]:

1. Inspecting Objects
2. Logging rows of data

### Inspecting Objects

**cliff.inspect(obj)**

The `inspect` method is a lightweight wrapper to a pre-configured [eyes][1] inspector. If you wish to change the coloring of objects that are logged using `cliff` you only need to override `cliff.inspect` with a new [eyes][1] inspector. 

**cliff.putObject(obj, [rewriters, padding])**

The `putObject` method is a simple helper function for prefixing and styling inspected object output from [eyes][1]. Here's a quick sample:

``` js
var cliff = require('cliff');

cliff.putObject({
  literal: "bazz",
  arr: [
    "one",
    2,
  ],
  obj: {
    host: "localhost",
    port: 5984,
    auth: {
      username: "admin",
      password: "password"
    }
  }
});
```

The resulting output on the command-line would be (sadly the colors do not translate): 

``` bash
$ node examples/put-object.js 
data:   {
data:       arr: [ 'one', 2 ],
data:       literal: 'bazz',
data:       obj: {
data:           host: 'localhost',
data:           port: 5984,
data:           auth: { username: 'admin', password: 'password' }
data:       }
data:   }
```

### Logging rows of data

**cliff.putRows(levels, rows[, colors])**
The `putRows` method is a simple helper that takes a set of Arrays and row headers and returns properly formatted and padded rows. Here's a quick sample:

``` js
var cliff = require('../lib/cliff');

var rows = [
  ["Name",  "Flavor",    "Dessert"],
  ["Alice", "cherry",    "yogurt"],
  ["Bob",   "carmel",    "apples"],
  ["Joe",   "chocolate", "cake"],
  ["Nick",  "vanilla",   "ice cream"]
];

cliff.putRows(rows);
```

The resulting output on the command-line would be (sadly the colors do not translate): 

``` bash
$ node examples/put-table.js
info:   Name  Flavor    Dessert
info:   Alice cherry    yogurt
info:   Bob   carmel    apples
info:   Joe   chocolate cake
info:   Nick  vanilla   ice cream
```

**cliff.stringifyRows(rows, colors)**
Takes a set of Arrays and row headers and returns properly formatted and padded rows ( a string version of `putRows` )




**cliff.putObjectRows(level, objs, properties, colors)**
Takes a set of Objects and the properties to extract from them and it will log to the console using [winston][0] at the specified level. Here's a sample:

``` js
  var cliff = require('cliff');

  var objs = [], obj = {
    name: "bazz",
    address: "1234 Nowhere Dr.",
  };

  for (var i = 0; i < 10; i++) {
    objs.push({
      name: obj.name,
      address: obj.address,
      id: Math.random().toString()
    });
  }

  cliff.putObjectRows('data', objs, ['id', 'name', 'address']);
```

``` bash
  $ node examples/put-object-rows.js 
  data:   id                   name address          
  data:   0.4157979858573526   bazz 1234 Nowhere Dr. 
  data:   0.7140450903680176   bazz 1234 Nowhere Dr. 
  data:   0.39573496161028743  bazz 1234 Nowhere Dr. 
  data:   0.8285396825522184   bazz 1234 Nowhere Dr. 
  data:   0.40711840940639377  bazz 1234 Nowhere Dr. 
  data:   0.7133555023465306   bazz 1234 Nowhere Dr. 
  data:   0.006228019250556827 bazz 1234 Nowhere Dr. 
  data:   0.5560931102372706   bazz 1234 Nowhere Dr. 
  data:   0.14310582634061575  bazz 1234 Nowhere Dr. 
  data:   0.4638693502638489   bazz 1234 Nowhere Dr. 
``` 

**cliff.stringifyObjectRows(objs, properties, colors)**
*used to be: cliff.rowifyObjects(objs, properties, colors)*
Takes a set of Objects and the properties to extract from them and returns properly formatted and padded rows (it is the string version of putObjectRows).


## Run Tests
All of the cliff tests are written in [vows][4], and cover all of the use cases described above.

```
  npm test
```

#### Author: [Charlie Robbins](http://twitter.com/indexzero)

[0]: http://github.com/indexzero/winston
[1]: http://github.com/cloudhead/eyes.js
[2]: http://github.com/marak/colors.js
[3]: http://github.com/nodejitsu/cliff/tree/master/examples
[4]: http://vowsjs.org
