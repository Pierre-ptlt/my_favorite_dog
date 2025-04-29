import { useState, useEffect } from 'react';
import { getBreeds } from '../api/getBreeds';
import { mapBreedsToLabel } from '../utils/mapBreedsToLabel';

export const useGetDogBreeds = () => {
  const [breeds, setBreeds] = useState<string[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    setIsLoading(true);
    getBreeds()
      .then(({ message }) => {
        setBreeds(mapBreedsToLabel(message));
      })
      .catch((err: Error) => {
        setError(err.message ?? 'Unknown error');
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  return { breeds, isLoading, error };
};
