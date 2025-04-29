import { describe, it, expect } from 'vitest';
import { capitalizeFirstLetter } from './capitalizeFirstLetter';

describe('capitalizeFirstLetter', () => {
  it('should capitalize the first letter of a string', () => {
    expect(capitalizeFirstLetter('hello')).toStrictEqual('Hello');
    expect(capitalizeFirstLetter('world')).toStrictEqual('World');
  });

  it('should handle empty string', () => {
    expect(capitalizeFirstLetter('')).toStrictEqual('');
  });

  it('should not modify already capitalized strings', () => {
    expect(capitalizeFirstLetter('Hello')).toStrictEqual('Hello');
  });

  it('should handle single letter strings', () => {
    expect(capitalizeFirstLetter('a')).toStrictEqual('A');
  });
});
