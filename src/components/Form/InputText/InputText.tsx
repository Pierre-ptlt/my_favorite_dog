import { FC } from 'react';

interface InputTextProps {
  label: 'Nom' | 'Prénom';
  value: string;
  onChange: (val: string) => void;
}

export const InputText: FC<InputTextProps> = ({ label, value, onChange }) => (
  <div className='form-group'>
    <label htmlFor={label}>{label}</label>
    <input
      id={label}
      type='text'
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className='text-input'
    />
  </div>
);
