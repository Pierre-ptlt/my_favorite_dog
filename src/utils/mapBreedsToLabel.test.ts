import { describe, it, expect } from 'vitest';
import { mapBreedsToLabel } from './mapBreedsToLabel';
import { BreedsData } from '../types';

describe('mapBreedsToLabel', () => {
  it('should return empty array for empty input', () => {
    const input: BreedsData = {};
    expect(mapBreedsToLabel(input)).toStrictEqual([]);
  });

  it('should handle breeds without sub-breeds', () => {
    const input: BreedsData = {
      chihuahua: [],
      pug: []
    };
    expect(mapBreedsToLabel(input)).toStrictEqual(['chihuahua', 'pug']);
  });

  it('should handle breeds with sub-breeds', () => {
    const input: BreedsData = {
      hound: ['afghan', 'basset'],
      terrier: ['fox']
    };
    expect(mapBreedsToLabel(input)).toStrictEqual([
      'afghan hound',
      'basset hound',
      'fox terrier'
    ]);
  });

  it('should handle mixed breeds with and without sub-breeds', () => {
    const input: BreedsData = {
      hound: ['afghan'],
      pug: [],
      terrier: ['fox', 'jack']
    };
    expect(mapBreedsToLabel(input)).toStrictEqual([
      'afghan hound',
      'fox terrier',
      'jack terrier',
      'pug'
    ]);
  });
});
