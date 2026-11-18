const _keyStr =
  'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=';

/**
 * Encodes given string.
 *
 * @param {string} input - Text to encode
 */
export const encode = (input: string) => {
  let output = '';
  let i = 0;

  input = _utf8_encode(input);

  while (i < input.length) {
    const chr1 = input.charCodeAt(i++);
    const chr2 = input.charCodeAt(i++);
    const chr3 = input.charCodeAt(i++);

    const enc1 = chr1 >> 2;
    const enc2 = ((chr1 & 3) << 4) | (chr2 >> 4);
    let enc3 = ((chr2 & 15) << 2) | (chr3 >> 6);
    let enc4 = chr3 & 63;

    if (isNaN(chr2)) {
      enc3 = enc4 = 64;
    } else if (isNaN(chr3)) {
      enc4 = 64;
    }

    output =
      output +
      _keyStr.charAt(enc1) +
      _keyStr.charAt(enc2) +
      _keyStr.charAt(enc3) +
      _keyStr.charAt(enc4);
  }

  return output;
};

/**
 * Encodes given string using the URL and filename safe alphabet
 * (base64url, RFC 4648 section 5), without padding.
 *
 * @param {string} input - Text to encode
 */
export const encodeUrl = (input: string) =>
  encode(input).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');

/**
 * Decodes given string.
 * Accepts both the standard and the URL safe (base64url) alphabet,
 * with or without padding.
 *
 * @param {string} input - Text to decode
 */
export const decode = (input: string) => {
  let output = '';
  let i = 0;

  input = input
    .replace(/-/g, '+')
    .replace(/_/g, '/')
    .replace(/[^A-Za-z0-9+/=]/g, '');

  // restore omitted padding, so missing characters are not read as "A" (0)
  while (input.length % 4) {
    input += '=';
  }

  while (i < input.length) {
    const enc1 = _keyStr.indexOf(input.charAt(i++));
    const enc2 = _keyStr.indexOf(input.charAt(i++));
    const enc3 = _keyStr.indexOf(input.charAt(i++));
    const enc4 = _keyStr.indexOf(input.charAt(i++));

    const chr1 = (enc1 << 2) | (enc2 >> 4);
    const chr2 = ((enc2 & 15) << 4) | (enc3 >> 2);
    const chr3 = ((enc3 & 3) << 6) | enc4;

    // a group with a single character carries less than one byte of data
    if (enc2 === 64) {
      continue;
    }

    output += String.fromCharCode(chr1);

    if (enc3 !== 64) {
      output += String.fromCharCode(chr2);
    }
    if (enc4 !== 64) {
      output += String.fromCharCode(chr3);
    }
  }

  return _utf8_decode(output);
};

/**
 * (private method) does a UTF-8 encoding
 *
 * @private
 * @param {string} string - Text to encode
 */
function _utf8_encode(str: string): string {
  return encodeURIComponent(_to_well_formed(str)).replace(
    /%([0-9A-F]{2})/g,
    (_, p1) => String.fromCharCode(parseInt(p1, 16)),
  );
}

/**
 * (private method) replaces unpaired UTF-16 surrogates with U+FFFD,
 * the same way TextEncoder does (encodeURIComponent throws on them)
 *
 * @private
 * @param {string} str - Text to sanitize
 */
function _to_well_formed(str: string): string {
  return str.replace(
    /[\uD800-\uDBFF][\uDC00-\uDFFF]|[\uD800-\uDFFF]/g,
    (match) => (match.length === 2 ? match : '\uFFFD'),
  );
}

/**
 * (private method - do not use) does a UTF-8 decoding
 *
 * @private
 * @param {string} utftext - UTF-8 text to dencode
 */
function _utf8_decode(str: string): string {
  return decodeURIComponent(
    str
      .split('')
      .map((c) => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
      .join(''),
  );
}
