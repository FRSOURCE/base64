import { it, expect } from 'vitest';
import { encode, decode } from './index';

it('should encode / decode simple characters', () => {
  const input = 'anything';
  const expected = 'YW55dGhpbmc=';

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
