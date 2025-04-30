import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { InputText } from './InputText';

describe('InputText', () => {
  const onChange = vi.fn();
  it('renders with label and value', () => {
    render(<InputText label='Nom' value='Test' onChange={onChange} />);

    const input = screen.getByLabelText('Nom') as HTMLInputElement;
    expect(input).toBeInTheDocument();
    expect(input.value).toStrictEqual('Test');
  });

  it('calls onChange when input value changes', () => {
    render(<InputText label='Prénom' value='' onChange={onChange} />);

    const input = screen.getByLabelText('Prénom');
    fireEvent.change(input, { target: { value: 'New Value' } });

    expect(onChange).toHaveBeenCalledWith('New Value');
  });

  it('has correct input attributes', () => {
    render(<InputText label='Nom' value='' onChange={onChange} />);

    const input = screen.getByLabelText('Nom');
    expect(input).toHaveAttribute('type', 'text');
    expect(input).toHaveAttribute('id', 'input-nom');
  });
});
