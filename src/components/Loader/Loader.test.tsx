import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Loader } from './Loader';

describe('Loader', () => {
  it('should display breeds loading text when type is breeds', () => {
    render(<Loader type='breeds' />);
    expect(screen.getByText('Chargement des races...')).toBeInTheDocument();
  });

  it('should display images loading text when type is images', () => {
    render(<Loader type='images' />);
    expect(screen.getByText('Chargement des chiens...')).toBeInTheDocument();
  });
});
