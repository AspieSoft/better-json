## Better JSON

![npm](https://img.shields.io/npm/v/better-json)
![GitHub top language](https://img.shields.io/github/languages/top/aspiesoft/better-json)
![NPM](https://img.shields.io/npm/l/better-json)

![npm](https://img.shields.io/npm/dw/better-json)
![npm](https://img.shields.io/npm/dm/better-json)

[![paypal](https://img.shields.io/badge/buy%20me%20a%20coffee-paypal-blue)](https://buymeacoffee.aspiesoft.com/)

Simply better json with comments and auto normalization.
You can either use it as a new object, or override the default JSON object.

 - Comments are removed from strings
 - quotes are added where needed automatically
 - single quotes are corrected to double, when needed
 - types are auto corrected ('1' becomes 1)
 - trailing commas are removed

### Installation

```shell script
npm install better-json
```

### Setup

```js
const json = require('better-json');

// or to override the JSON object
require('better-json')();
```

### Usage

```js
json.parse(`
{
    option1: string,
    //option2: true, /* commented out */
    option3: true,
}
`);
// expected output: {option1: 'string', option3: true}

json.stringify({test: 2, unwantedFunction: function(){}});
// expected output: {"test": 2}
```
