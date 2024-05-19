<p align="center">
  <a href="https://www.npmjs.com/package/@frsource/base64">
    <img src="https://img.shields.io/npm/v/@frsource/base64.svg" alt="NPM version badge">
  </a>
  <a href="https://www.npmjs.com/package/@frsource/base64">
    <img src="https://img.shields.io/npm/dt/@frsource/base64.svg" alt="NPM total downloads badge">
  </a>
  <a href="https://github.com/semantic-release/semantic-release">
    <img src="https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg" alt="semantic-relase badge">
  </a>
  <a href="https://github.com/FRSOURCE/base64/blob/main/LICENSE">
    <img src="https://img.shields.io/github/license/FRSOURCE/base64.svg" alt="license MIT badge">
  </a>
</p>

# @frsource/base64

This javascript code is used to encode / decode data using base64 (this encoding is designed to make binary data survive transport through transport layers that are not 8-bit clean). Script is fully compatible with UTF-8 encoding. You can use base64 encoded data as simple encryption mechanism.

If you plan using UTF-8 encoding in your project don’t forget to set the page encoding to UTF-8 (Content-Type meta tag).

## Installation

```bash
npm i @frsource/base64
```

## Usage

```js
// Importing:
// typescript / ES6
import { encode, decode } from '@frsource/base64';

// legacy javscript
const { encode, decode } = require('@frsource/base64');

const encoded = encode('我喜欢解码lubię dekodować');
console.log(encoded); // output: 5oiR5Zac5qyi6Kej56CBbHViacSZIGRla29kb3dhxIc=
const decoded = decode(encoded);
console.log(encoded); // output: 我喜欢解码lubię dekodować
```

## References

Based on webtoolkit.info implementation.
Original source code available at: http://www.webtoolkit.info/javascript_base64.html

## License

[MIT](https://opensource.org/licenses/MIT)

Copyright (c) 2022-present, Jakub FRS Freisler, [FRSOURCE](https://www.frsource.org/)

<p align="center">
<a href="https://www.frsource.org/" title="Click to visit FRSOURCE page!">
<img src="https://www.frsource.org/logo.jpg" alt="FRSOURCE logo" height="60px"/>
</a>
</p>
