# nitrapi [![NPM version][npm-image]][npm-url] [![Build Status][travis-image]][travis-url] [![Dependency Status][daviddm-image]][daviddm-url]
> NodeJs based SDK for the Nitrapi

## Installation

```sh
$ npm install --save nitrapi
```

## Usage

```js
var Nitrapi = require('nitrapi');

var api = new Nitrapi("<access token>");

api.getServices(function (services) {
  // successfully got our service list
  console.log(services);
}, function (error) {
  // an error occured
  console.error(error);
});
```

## Documentation

This SDK works very similar to the [Nitrapi-PHP SDK](https://github.com/nitrado/Nitrapi-PHP). You can read the comments there to find out which parameters most methods expect.

For more information on the capabilities of the Nitrapi, consult [the official documentation](https://nitrado.github.io/Nitrapi/).

## License

MIT © [CodingNavi](https://codingnavi.github.io)


[npm-image]: https://badge.fury.io/js/nitrapi.svg
[npm-url]: https://npmjs.org/package/nitrapi
[travis-image]: https://travis-ci.org/codingnavi/Nitrapi-Node.svg?branch=master
[travis-url]: https://travis-ci.org/codingnavi/Nitrapi-Node
[daviddm-image]: https://david-dm.org/codingnavi/Nitrapi-Node.svg?theme=shields.io
[daviddm-url]: https://david-dm.org/codingnavi/Nitrapi-Node
