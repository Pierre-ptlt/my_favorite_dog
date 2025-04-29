import { FC } from 'react';
import { capitalizeFirstLetter } from '../../../utils/capitalizeFirstLetter';

export type DropdownProps = {
  label: string;
  options: string[];
  value: string;
  onChange: (val: string) => void;
};

export const Dropdown: FC<DropdownProps> = ({
  label,
  options,
  value,
  onChange
}) => {
  const inputId = `input-${label.toLowerCase()}`;

  return (
    <div className='form-field'>
      <label htmlFor={inputId}>{label}</label>
      <select
        id={inputId}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className='select-input'
      >
        <option value=''>Sélectionnez une option</option>
        {options.map((opt) => (
          <option key={opt} value={opt}>
            {capitalizeFirstLetter(opt)}
          </option>
        ))}
      </select>
    </div>
  );
};
