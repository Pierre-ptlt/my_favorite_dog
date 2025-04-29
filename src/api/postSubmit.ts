import { FavoriteDogFormData } from '../types';

export async function postSubmit(payload: FavoriteDogFormData): Promise<void> {
  const response = await fetch('/doesnotexist', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(payload)
  });

  if (!response.ok) {
    const errorText = await response.text().catch(() => null);
    throw new Error(
      errorText || `Submission failed with status ${response.status}`
    );
  }
}
