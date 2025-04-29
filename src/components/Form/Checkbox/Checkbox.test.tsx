import { describe, expect, vi, it } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { Checkbox } from './Checkbox';

describe('Checkbox', () => {
  const onChange = vi.fn();

  it('renders nothing when breed is empty', () => {
    const { container } = render(
      <Checkbox breed='' checked={false} onChange={onChange} />
    );
    expect(container.firstChild).toBeNull();
  });

  it('renders checkbox with breed name', () => {
    render(<Checkbox breed='Labrador' checked={false} onChange={onChange} />);
    expect(screen.getByText(/Labrador/)).toBeInTheDocument();
    expect(screen.getByRole('checkbox')).not.toBeChecked();
  });

  it('renders checked checkbox', () => {
    render(<Checkbox breed='Labrador' checked={true} onChange={onChange} />);
    expect(screen.getByRole('checkbox')).toBeChecked();
  });

  it('calls onChange when checkbox is clicked', async () => {
    const handleChange = vi.fn();
    render(
      <Checkbox breed='Labrador' checked={false} onChange={handleChange} />
    );

    await fireEvent.click(screen.getByRole('checkbox'));
    expect(handleChange).toHaveBeenCalledWith(true);
  });
});
