import { FC, useState } from 'react';
import { useDogBreeds } from '../hooks/useDogBreeds';
import { InputText } from '../components/Form/InputText/InputText';
import { Dropdown } from '../components/Form/Dropdown/Dropdown';
import { Loader } from '../components/Loader/Loader';

export const FavoriteDogForm: FC = () => {
  const [lastName, setLastName] = useState<string>('');
  const [firstName, setFirstName] = useState<string>('');
  const [selectedBreed, setSelectedBreed] = useState<string>('');

  const { breeds, isLoading, error } = useDogBreeds();

  console.log({
    lastName,
    firstName
  });

  return (
    <section>
      <h1>Vos préférences en matière de chien</h1>
      <form>
        <InputText label='Nom' value={lastName} onChange={setLastName} />
        <InputText label='Prénom' value={firstName} onChange={setFirstName} />
        {isLoading ? (
          <Loader type='breeds' />
        ) : error ? (
          <p>Erreur : {error}</p>
        ) : (
          <Dropdown
            label='Race de chien préférée'
            options={breeds}
            value={selectedBreed}
            onChange={setSelectedBreed}
          />
        )}
      </form>
    </section>
  );
};
