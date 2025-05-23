import { useState } from 'react';
import { sortImagesByName } from '../utils/sortImagesByName';
import { getRandomImages } from '../api/getRandomImages';

export const useGetRandomImage = (numberOfImagesToDisplay: number) => {
  const [images, setImages] = useState<string[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const loadImages = (breed: string) => {
    if (!breed) {
      setImages([]);
      setError(null);
      return;
    }
    setIsLoading(true);
    getRandomImages(breed, numberOfImagesToDisplay)
      .then((urls: string[]) => {
        setImages(sortImagesByName(urls));
      })
      .catch((err: Error) => {
        setError(err.message ?? 'Unknown error');
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  return { images, isLoading, error, loadImages };
};
