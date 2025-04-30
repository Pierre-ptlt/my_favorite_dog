import { FC } from 'react';
import styles from './Loader.module.css';

export type TLoader = {
  type: 'chiens' | 'races';
};

export const Loader: FC<TLoader> = ({ type }) => {
  return (
    <p
      className={styles.loader}
      role='status'
      aria-busy='true'
      aria-live='polite'
    >
      Chargement des {type}...
    </p>
  );
};
