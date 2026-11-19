import { it, expect } from 'vitest';
import { encode, encodeUrl, decode } from './index';

it('should encode / decode simple characters', () => {
  const input = 'anything';
  const expected = 'YW55dGhpbmc=';

  const encoded = encode(input);
  expect(encoded).toBe(expected);

  const decoded = decode(encoded);
  expect(decoded).toBe(input);
});

it('should encode / decode newline characters', () => {
  const input = '\n';
  const expected = 'Cg==';

  const encoded = encode(input);
  expect(encoded).toBe(expected);

  const decoded = decode(encoded);
  expect(decoded).toBe(input);
});

it('should encode / decode characters outide of Latin1 range', () => {
  const input = '我喜欢解码lubię dekodować';
  const expected = '5oiR5Zac5qyi6Kej56CBbHViacSZIGRla29kb3dhxIc=';

  const encoded = encode(input);
  expect(encoded).toBe(expected);

  const decoded = decode(encoded);
  expect(decoded).toBe(input);
});

it('should encode / decode emojis', () => {
  const input = '🩵🩵🩵🩵🩵🩵';
  const expected = '8J+ptfCfqbXwn6m18J+ptfCfqbXwn6m1';

  const encoded = encode(input);
  expect(encoded).toBe(expected);

  const decoded = decode(encoded);
  expect(decoded).toBe(input);
});

it.each([
  ['YQ', 'a'],
  ['YWI', 'ab'],
  ['YWJj', 'abc'],
  ['eyJpZCI6MX0', '{"id":1}'],
  ['5oiR5Zac5qyi6Kej56CBbHViacSZIGRla29kb3dhxIc', '我喜欢解码lubię dekodować'],
])('should decode input without padding: %s', (input, expected) => {
  expect(decode(input)).toBe(expected);
});

it('should decode concatenated padded chunks', () => {
  expect(decode('YQ==YWI=')).toBe('aab');
});

it('should ignore whitespace while decoding', () => {
  expect(decode('YW55\ndGhp\r\n bmc')).toBe('anything');
});

it('should ignore a single leftover character while decoding', () => {
  expect(decode('YWJjZ')).toBe('abc');
  expect(decode('Y')).toBe('');
});

it('should decode base64url alphabet', () => {
  // standard form: "Pz8/Pj4+"
  expect(decode('Pz8_Pj4-')).toBe('???>>>');
  expect(decode('Pz8/Pj4+')).toBe('???>>>');
  expect(decode('8J-ptQ')).toBe('🩵');
});

it('should replace unpaired surrogates with U+FFFD while encoding', () => {
  expect(encode('a\ud800b')).toBe('Ye+/vWI=');
  expect(encode('a\udc00b')).toBe('Ye+/vWI=');
  expect(encode('\ud800')).toBe('77+9');
  expect(encode('\udc00\ud800')).toBe('77+977+9');
  expect(decode(encode('a\ud800b'))).toBe('a\ufffdb');
});

it('should keep valid surrogate pairs next to unpaired ones', () => {
  const input = '\ud800🩵\udc00';
  expect(encode(input)).toBe('77+98J+pte+/vQ==');
  expect(decode(encode(input))).toBe('\ufffd🩵\ufffd');
});

it('should encode using base64url alphabet without padding', () => {
  expect(encodeUrl('???>>>')).toBe('Pz8_Pj4-');
  expect(encodeUrl('a')).toBe('YQ');
  expect(encodeUrl('ab')).toBe('YWI');
  expect(encodeUrl('🩵')).toBe('8J-ptQ');
});

it.each(['', 'a', 'ab', 'abc', '???>>>', '我喜欢解码lubię dekodować', '🩵🩵'])(
  'should round-trip through encodeUrl / decode: %s',
  (input) => {
    expect(decode(encodeUrl(input))).toBe(input);
    expect(encodeUrl(input)).not.toMatch(/[+/=]/);
  },
);
