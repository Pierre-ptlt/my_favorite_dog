import { BreedsData } from '../types';

export type BreedsResponse = {
  message: BreedsData;
  status: string;
};

export async function getBreeds(): Promise<BreedsResponse> {
  const res = await fetch('https://dog.ceo/api/breeds/list/all');
  if (!res.ok) {
    throw new Error(`Failed to fetch breeds: ${res.status}`);
  }
  const data: BreedsResponse = await res.json();

  return data;
}
