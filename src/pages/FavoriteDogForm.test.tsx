import { beforeEach, describe, expect, it, vi } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { FavoriteDogForm } from './FavoriteDogForm';

import { useGetDogBreeds } from '../hooks/useGetDogBreeds';
import { useGetRandomImage } from '../hooks/useGetRandomImage';

vi.mock('../hooks/useGetDogBreeds');
vi.mock('../hooks/useGetRandomImage');

describe('FavoriteDogForm', () => {
  let fetchMock: ReturnType<typeof vi.fn>;

  beforeEach(() => {
    vi.mocked(useGetDogBreeds).mockReturnValue({
      breeds: ['breed1', 'breed2'],
      isLoading: false,
      error: null
    });

    vi.mocked(useGetRandomImage).mockReturnValue({
      images: ['image1.jpg', 'image2.jpg'],
      isLoading: false,
      error: null,
      loadImages: vi.fn()
    });

    fetchMock = vi.fn().mockResolvedValue({
      ok: false,
      status: 404,
      text: async () => 'Not Found'
    });
    vi.stubGlobal('fetch', fetchMock);
  });

  it('renders form elements correctly', () => {
    render(<FavoriteDogForm />);
    expect(screen.getByLabelText('Nom')).toBeInTheDocument();
    expect(screen.getByLabelText('Prénom')).toBeInTheDocument();
    expect(screen.getByText('Race de chien préférée')).toBeInTheDocument();
    expect(screen.getByText('Reset')).toBeInTheDocument();
    expect(screen.getByText('Submit')).toBeInTheDocument();
  });

  it('shows loader when breeds are loading', () => {
    vi.mocked(useGetDogBreeds).mockReturnValue({
      breeds: [],
      isLoading: true,
      error: null
    });
    render(<FavoriteDogForm />);
    expect(screen.getByRole('status')).toHaveTextContent(
      /Chargement des\s*races/i
    );
  });

  it('shows error when breeds fetch fails', () => {
    vi.mocked(useGetDogBreeds).mockReturnValue({
      breeds: [],
      isLoading: false,
      error: 'Failed to fetch breeds'
    });
    render(<FavoriteDogForm />);
    expect(screen.getByRole('alert')).toHaveTextContent(
      'Erreur : Failed to fetch breeds'
    );
  });

  it('handles form submission by calling fetch with correct payload', async () => {
    render(<FavoriteDogForm />);

    fireEvent.change(screen.getByLabelText('Nom'), {
      target: { value: 'Doe' }
    });
    fireEvent.change(screen.getByLabelText('Prénom'), {
      target: { value: 'John' }
    });
    fireEvent.change(screen.getByRole('combobox'), {
      target: { value: 'breed1' }
    });
    fireEvent.click(screen.getByRole('checkbox'));

    const submitBtn = screen.getByText('Submit') as HTMLButtonElement;
    expect(submitBtn.disabled).toBe(false);

    fireEvent.click(submitBtn);

    await waitFor(() => {
      expect(fetchMock).toHaveBeenCalledWith(
        '/doesnotexist',
        expect.objectContaining({
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            lastName: 'Doe',
            firstName: 'John',
            breed: 'breed1',
            isChecked: true
          })
        })
      );
    });
  });

  it('handles reset correctly', () => {
    render(<FavoriteDogForm />);

    fireEvent.change(screen.getByLabelText('Nom'), {
      target: { value: 'Doe' }
    });
    fireEvent.change(screen.getByLabelText('Prénom'), {
      target: { value: 'John' }
    });

    fireEvent.click(screen.getByText('Reset'));

    expect(screen.getByLabelText('Nom')).toHaveValue('');
    expect(screen.getByLabelText('Prénom')).toHaveValue('');
  });

  it('does not render checkbox if breed is empty', () => {
    render(<FavoriteDogForm />);
    expect(screen.queryByRole('checkbox')).toBeNull();
  });

  it('renders checkbox when breed is selected', () => {
    render(<FavoriteDogForm />);
    fireEvent.change(screen.getByRole('combobox'), {
      target: { value: 'breed1' }
    });
    expect(screen.getByRole('checkbox')).toBeInTheDocument();
  });
});
