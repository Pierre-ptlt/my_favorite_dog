import { useState, useCallback } from 'react';
import { FavoriteDogFormData } from '../types';
import { postSubmit } from '../api/postSubmit';

export const useSubmitForm = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const submitForm = useCallback(async (payload: FavoriteDogFormData) => {
    setIsSubmitting(true);
    setError(null);
    try {
      await postSubmit(payload);
    } catch (err: any) {
      setError(err.message ?? 'Unknown error');
    } finally {
      setIsSubmitting(false);
    }
  }, []);

  return { submitForm, setError, isSubmitting, error };
};
