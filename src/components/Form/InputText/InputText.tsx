import { FC } from 'react';
import styles from './InputText.module.css';

interface InputTextProps {
  label: 'Nom' | 'Prénom';
  value: string;
  onChange: (val: string) => void;
}

export const InputText: FC<InputTextProps> = ({ label, value, onChange }) => {
  const inputId = `input-${label.toLowerCase()}`;

  return (
    <div className={styles.container}>
      <label htmlFor={inputId} className={styles.label}>
        {label}
      </label>
      <input
        id={inputId}
        type='text'
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={styles.input}
      />
    </div>
  );
};
