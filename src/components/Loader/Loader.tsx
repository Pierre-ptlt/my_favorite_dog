import { FC } from 'react';

export type TLoader = {
  type: 'chiens' | 'races';
};

export const Loader: FC<TLoader> = ({ type }) => {
  return (
    <p className='loader' role='status' aria-busy='true' aria-live='polite'>
      Chargement des {type}...
    </p>
  );
};
