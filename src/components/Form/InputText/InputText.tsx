import { FC } from 'react';

interface InputTextProps {
  label: 'Nom' | 'Prénom';
  value: string;
  onChange: (val: string) => void;
}

export const InputText: FC<InputTextProps> = ({ label, value, onChange }) => {
  const inputId = `input-${label.toLowerCase()}`;

  return (
    <div className='form-field'>
      <label htmlFor={inputId}>{label}</label>
      <input
        id={inputId}
        type='text'
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className='text-input'
      />
    </div>
  );
};
