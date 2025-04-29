import { BreedsData } from '../types';

export const mapBreedsToLabel = (data: BreedsData): string[] => {
  const list: string[] = [];
  for (const [breed, subBreeds] of Object.entries(data)) {
    if (subBreeds.length === 0) {
      list.push(breed);
    } else {
      subBreeds.forEach((sub) => list.push(`${sub} ${breed}`));
    }
  }
  return list.sort((a, b) =>
    a.localeCompare(b, undefined, { sensitivity: 'base' })
  );
}
