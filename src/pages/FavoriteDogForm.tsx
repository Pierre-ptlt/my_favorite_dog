import { FC, useState } from 'react';
import { useDogBreeds } from '../hooks/useDogBreeds';
import { InputText } from '../components/Form/InputText/InputText';
import { Dropdown } from '../components/Form/Dropdown/Dropdown';
import { Loader } from '../components/Loader/Loader';
import { useRandomImages } from '../hooks/useRandomImages';
import { ImagesWrapper } from '../components/DogGallery/ImageWrapper';
import { Checkbox } from '../components/Form/Checkbox/Checkbox';

export const FavoriteDogForm: FC = () => {
  const [lastName, setLastName] = useState<string>('');
  const [firstName, setFirstName] = useState<string>('');
  const [selectedBreed, setSelectedBreed] = useState<string>('');
  const [isChecked, setIsChecked] = useState<boolean>(false);

  const numberOfImages = 5;

  console.log(isChecked);

  const { breeds, isLoading, error } = useDogBreeds();
  const {
    images,
    isLoading: imagesLoading,
    error: imagesError,
    loadImages
  } = useRandomImages(numberOfImages);

  const handleBreedChange = (breed: string) => {
    setSelectedBreed(breed);
    loadImages(breed);
  };

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
            onChange={handleBreedChange}
          />
        )}
        {selectedBreed && (
          <ImagesWrapper
            images={images}
            isLoading={imagesLoading}
            error={imagesError}
          />
        )}

        <Checkbox
          breed={selectedBreed}
          checked={isChecked}
          onChange={() => setIsChecked(!isChecked)}
        />
      </form>
    </section>
  );
};
