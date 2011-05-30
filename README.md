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

## Motivation
Cliff is the swiss army knife of CLI formatting tools. It is based on highly flexible and powerful libraries: 

* [winston][0]: A multi-transport async logging library for node.js
* [eyes][1]: A customizable value inspector for node.js
* [colors][2]: Get colors in your node.js console like what 

## Usage
There are a number of methods available in Cliff for common logging tasks in command-line tools. If you're looking for more usage, checkout the [examples in this repository][3]:

1. Inspecting Objects
2. Logging rows of data

### Inspecting Objects

**cliff.inspect(obj)**

The `inspect` method is a lightweight wrapper to a pre-configured [eyes][1] inspector. Here is how it is created:

``` js
cliff.inspect = eyes.inspector({ stream: null,
  styles: {               // Styles applied to stdout
    all:     null,        // Overall style applied to everything
    label:   'underline', // Inspection labels, like 'array' in `array: [1, 2, 3]`
    other:   'inverted',  // Objects which don't have a literal representation, such as functions
    key:     'grey',      // The keys in object literals, like 'a' in `{a: 1}`
    special: 'grey',      // null, undefined...
    number:  'blue',      // 0, 1, 2...
    bool:    'magenta',   // true false
    regexp:  'green',     // /\d+/
  }
});
```

If you wish to change the coloring of objects that are logged using `cliff` you only need to override `cliff.inspect` with a new [eyes][1] inspector. 

**cliff.putObject(obj, [rewriters, padding])**

The `putObject` method is a simple helper function for prefixing and styling inspected object output from [eyes][1]. Here's a quick sample:

``` js
var cliff = require('cliff');

cliff.putObject({
  "literal": "bazz",
  "arr": [
    "one",
    2,
  ],
  "obj": {
    "host": "localhost",
    "port": 5984,
    "auth": {
      "username": "admin",
      "password": "password"
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

**cliff.stringifyRows(rows, colors)**
Takes a set of Arrays and row headers and returns properly formatted and padded rows. 

**cliff.putRows(level, rows, colors)**
Similar to `stringifyRows`, but it will log to the console using [winston][0] at the specified level.

**cliff.rowifyObjects(objs, properties, colors)**
Takes a set of Objects and the properties to extract from them and returns properly formatted and padded rows.

**cliff.putObjectRows(level, objs, properties, colors)**
Similar to `rowifyObjects`, but it will log to the console using [winston][0] at the specified level. Here's a sample:

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

## Run Tests
All of the winston tests are written in [vows][4], and cover all of the use cases described above.

```
  npm test
```

#### Author: [Charlie Robbins](http://twitter.com/indexzero)

[0]: http://github.com/indexzero/winston
[1]: http://github.com/cloudhead/eyes.js
[2]: http://github.com/marak/colors.js
[3]: http://github.com/nodejitsu/cliff/tree/master/examples
[4]: http://vowsjs.org