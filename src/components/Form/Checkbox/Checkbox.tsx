import { FC } from 'react';
import styles from './Checkbox.module.css';

export type CheckboxProps = {
  breed: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
};

export const Checkbox: FC<CheckboxProps> = ({ breed, checked, onChange }) => {
  if (!breed) return null;

  return (
    <fieldset className={styles.checkboxGroup}>
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
