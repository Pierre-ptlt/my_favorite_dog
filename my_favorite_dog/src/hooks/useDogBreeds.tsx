import { useState, useEffect, useTransition } from 'react';
import { getBreeds } from '../api/dogApi';
import { mapBreedsToLabel } from '../utils/mapBreedsToLabel';

export function useDogBreeds() {
  const [breeds, setBreeds] = useState<string[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  useEffect(() => {
    getBreeds()
      .then(({ message }) => {
        startTransition(() => {
          const options = mapBreedsToLabel(message);
          setBreeds(options);
        });
      })
      .catch((err) => {
        setError(err.message ?? 'Unknown error');
      });
  }, []);

  return { breeds, isLoading: isPending, error };
}
