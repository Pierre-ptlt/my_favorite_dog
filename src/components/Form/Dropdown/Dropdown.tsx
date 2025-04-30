import { FC } from 'react';
import { capitalizeFirstLetter } from '../../../utils/capitalizeFirstLetter';
import styles from './Dropdown.module.css';

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
    <div className={styles.container}>
      <label className={styles.label} htmlFor={inputId}>
        {label}
      </label>
      <select
        id={inputId}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={styles.selectInput}
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
