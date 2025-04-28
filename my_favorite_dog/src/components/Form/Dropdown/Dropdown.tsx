import { FC } from 'react';

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
}) => (
  <div className='form-group'>
    <label htmlFor={label}>{label}</label>
    <select
      id={label}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className='select-input'
    >
      {options.map((opt) => (
        <option key={opt} value={opt}>
          {opt}
        </option>
      ))}
    </select>
  </div>
);
