export type ImagesResponse = {
  message: string[];
  status: string;
};

export async function getRandomImages(
  breedLabel: string,
  count: number
): Promise<string[]> {
  const parts = breedLabel.split(' ');
  const apiBreedPath = parts.length > 1 ? `${parts[1]}/${parts[0]}` : parts[0];

  const url = `https://dog.ceo/api/breed/${apiBreedPath}/images/random/${count}`;
  const res = await fetch(url);
  if (!res.ok) {
    throw new Error(`Failed to fetch images for ${breedLabel}: ${res.status}`);
  }
  const data: ImagesResponse = await res.json();
  return data.message;
}
