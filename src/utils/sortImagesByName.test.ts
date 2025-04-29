import { describe, it, expect } from 'vitest';
import { sortImagesByName } from './sortImagesByName';

describe('sortImagesByName', () => {
  it('should sort image URLs by filename alphabetically', () => {
    const urls = [
      'https://images.dog.ceo/breeds/terrier-american/n02093428_14612.jpg',
      'https://images.dog.ceo/breeds/terrier-american/n02093428_2461.jpg',
      'https://images.dog.ceo/breeds/terrier-american/n02093428_1291.jpg',
      'https://images.dog.ceo/breeds/terrier-american/n02093428_738.jpg',
      'https://images.dog.ceo/breeds/terrier-american/n02093428_10807.jpg'
    ];

    const expected = [
      'https://images.dog.ceo/breeds/terrier-american/n02093428_10807.jpg',
      'https://images.dog.ceo/breeds/terrier-american/n02093428_1291.jpg',
      'https://images.dog.ceo/breeds/terrier-american/n02093428_14612.jpg',
      'https://images.dog.ceo/breeds/terrier-american/n02093428_2461.jpg',
      'https://images.dog.ceo/breeds/terrier-american/n02093428_738.jpg'
    ];

    expect(sortImagesByName(urls)).toStrictEqual(expected);
  });

  it('should handle case insensitive sorting', () => {
    const urls = [
      '/images/Apple.jpg',
      '/images/Zebra.jpg',
      '/images/banana.jpg',
      '/images/coconut.jpg'
    ];

    const expected = [
      '/images/Apple.jpg',
      '/images/banana.jpg',
      '/images/coconut.jpg',
      '/images/Zebra.jpg'
    ];

    expect(sortImagesByName(urls)).toStrictEqual(expected);
  });

  it('should handle empty array', () => {
    expect(sortImagesByName([])).toStrictEqual([]);
  });

  it('should not modify original array', () => {
    const original = ['/b.jpg', '/a.jpg'];
    const originalCopy = [...original];
    sortImagesByName(original);
    expect(original).toStrictEqual(originalCopy);
  });
});
