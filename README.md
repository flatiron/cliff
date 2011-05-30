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
There are a number of methods available in Cliff for common logging tasks in command-line tools:

1. Inspecting Objects
2. Logging rows of data

### Inspecting Objects

**cliff.putObject**

**cliff.inspect**

### Logging rows of data 

**cliff.stringifyRows**

**cliff.rowifyObjects**

**cliff.logRows**

## Run Tests
All of the winston tests are written in [vows][3], and cover all of the use cases described above.

```
  vows test/*-test.js --spec
```

#### Author: [Charlie Robbins](http://twitter.com/indexzero)

[0]: http://github.com/indexzero/winston
[1]: http://github.com/cloudhead/eyes.js
[2]: http://github.com/marak/colors.js
[3]: http://vowsjs.org