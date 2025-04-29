// src/components/Form/Checkbox.tsx
import { FC } from 'react';

export type CheckboxProps = {
  breed: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
};

export const Checkbox: FC<CheckboxProps> = ({ breed, checked, onChange }) => {
  if (!breed) return null;

  return (
    <fieldset className='checkbox-group'>
      <legend>Confirmation</legend>
      <label>
        <input
          type='checkbox'
          checked={checked}
          onChange={(e) => onChange(e.target.checked)}
        />{' '}
        Confirmer que ma race de chien favorite est <strong>{breed}</strong>
      </label>
    </fieldset>
  );
};
