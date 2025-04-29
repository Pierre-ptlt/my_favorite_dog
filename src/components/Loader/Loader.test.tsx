import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Loader } from './Loader';

describe('Loader', () => {
  it('should display breeds loading text when type is breeds', () => {
    render(<Loader type='races' />);
    expect(screen.getByText('Chargement des races...')).toBeInTheDocument();
  });

  it('should display images loading text when type is images', () => {
    render(<Loader type='chiens' />);
    expect(screen.getByText('Chargement des chiens...')).toBeInTheDocument();
  });
});
