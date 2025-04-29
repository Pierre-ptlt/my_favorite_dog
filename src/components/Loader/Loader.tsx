import { FC } from 'react';

export type TLoader = {
  type: 'breeds' | 'images';
};

export const Loader: FC<TLoader> = ({ type }) => {
  return (
    <p className='loader'>
      {type === 'breeds'
        ? 'Chargement des races...'
        : 'Chargement des chiens...'}
    </p>
  );
};
