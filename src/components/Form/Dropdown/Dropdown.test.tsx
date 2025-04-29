import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { Dropdown } from './Dropdown';

describe('Dropdown', () => {
  const mockProps = {
    label: 'Test Label',
    options: ['option1', 'option2', 'option3'],
    value: '',
    onChange: vi.fn()
  };

  it('renders the dropdown with correct label', () => {
    render(<Dropdown {...mockProps} />);
    expect(screen.getByLabelText('Test Label')).toBeInTheDocument();
  });

  it('renders all options including default option', () => {
    render(<Dropdown {...mockProps} />);
    const options = screen.getAllByRole('option');
    expect(options).toHaveLength(mockProps.options.length + 1); // +1 for default option
    expect(options[0]).toHaveTextContent('Sélectionnez une option');
  });

  it('calls onChange with correct value when option is selected', () => {
    render(<Dropdown {...mockProps} />);
    const select = screen.getByRole('combobox');
    fireEvent.change(select, { target: { value: 'option1' } });
    expect(mockProps.onChange).toHaveBeenCalledWith('option1');
  });

  it('displays the selected value', () => {
    render(<Dropdown {...mockProps} value='option1' />);
    const select = screen.getByRole('combobox');
    expect(select).toHaveValue('option1');
  });
});
