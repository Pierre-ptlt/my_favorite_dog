import { beforeEach, describe, expect, it, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { FavoriteDogForm } from './FavoriteDogForm';
import { useDogBreeds } from '../hooks/useDogBreeds';
import { useRandomImages } from '../hooks/useRandomImages';
import { useSubmitForm } from '../hooks/useSubmitForm';

vi.mock('../hooks/useDogBreeds');
vi.mock('../hooks/useRandomImages');
vi.mock('../hooks/useSubmitForm');

describe('FavoriteDogForm', () => {
  beforeEach(() => {
    vi.mocked(useDogBreeds).mockReturnValue({
      breeds: ['breed1', 'breed2'],
      isLoading: false,
      error: null
    });

    vi.mocked(useRandomImages).mockReturnValue({
      images: ['image1.jpg', 'image2.jpg'],
      isLoading: false,
      error: null,
      loadImages: vi.fn()
    });

    vi.mocked(useSubmitForm).mockReturnValue({
      submitForm: vi.fn(),
      isSubmitting: false,
      error: null,
      setError: vi.fn()
    });
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
    vi.mocked(useDogBreeds).mockReturnValue({
      breeds: [],
      isLoading: true,
      error: null
    });
    render(<FavoriteDogForm />);
    expect(screen.getByText('Chargement des races...')).toBeInTheDocument();
  });

  it('shows error when breeds fetch fails', () => {
    vi.mocked(useDogBreeds).mockReturnValue({
      breeds: [],
      isLoading: false,
      error: 'Failed to fetch breeds'
    });
    render(<FavoriteDogForm />);
    expect(
      screen.getByText('Erreur : Failed to fetch breeds')
    ).toBeInTheDocument();
  });

  it('handles form submission correctly', () => {
    const mockSubmitForm = vi.fn();
    vi.mocked(useSubmitForm).mockReturnValue({
      submitForm: mockSubmitForm,
      isSubmitting: false,
      error: null,
      setError: vi.fn()
    });

    render(<FavoriteDogForm />);

    expect(screen.getByText('Submit')).toBeDisabled();

    fireEvent.change(screen.getByLabelText('Nom'), {
      target: { value: 'Doe' }
    });
    fireEvent.change(screen.getByLabelText('Prénom'), {
      target: { value: 'John' }
    });

    expect(screen.getByText('Submit')).toBeDisabled();

    fireEvent.change(screen.getByRole('combobox'), {
      target: { value: 'breed1' }
    });
    fireEvent.click(screen.getByRole('checkbox'));

    expect(screen.getByText('Submit')).not.toBeDisabled();

    fireEvent.click(screen.getByText('Submit'));

    expect(mockSubmitForm).toHaveBeenCalledWith({
      lastName: 'Doe',
      firstName: 'John',
      breed: 'breed1',
      isChecked: true
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
    expect(screen.queryByText('Confirmation')).not.toBeInTheDocument();
  });

  it('renders checkbox when breed is selected', () => {
    vi.mocked(useDogBreeds).mockReturnValue({
      breeds: ['breed1'],
      isLoading: false,
      error: null
    });
    render(<FavoriteDogForm />);
    fireEvent.change(screen.getByRole('combobox'), {
      target: { value: 'breed1' }
    });
    expect(screen.getByText('Confirmation')).toBeInTheDocument();
  });
});
