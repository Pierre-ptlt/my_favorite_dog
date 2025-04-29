import '../components/Form/form.css';

import { FC, FormEvent, useState } from 'react';
import { useDogBreeds } from '../hooks/useDogBreeds';
import { InputText } from '../components/Form/InputText/InputText';
import { Dropdown } from '../components/Form/Dropdown/Dropdown';
import { Loader } from '../components/Loader/Loader';
import { useRandomImages } from '../hooks/useRandomImages';
import { ImagesWrapper } from '../components/DogGallery/ImageWrapper';
import { Checkbox } from '../components/Form/Checkbox/Checkbox';
import { useSubmitForm } from '../hooks/useSubmitForm';

export const FavoriteDogForm: FC = () => {
  const [lastName, setLastName] = useState<string>('');
  const [firstName, setFirstName] = useState<string>('');
  const [selectedBreed, setSelectedBreed] = useState<string>('');
  const [isChecked, setIsChecked] = useState<boolean>(false);

  const numberOfImages = 5;

  const {
    submitForm,
    isSubmitting,
    error: submitError,
    setError: setSubmitError
  } = useSubmitForm();

  const { breeds, isLoading, error: breedsError } = useDogBreeds();
  const {
    images,
    isLoading: isImagesLoading,
    error: imagesError,
    loadImages
  } = useRandomImages(numberOfImages);

  const disabledSubmit =
    !lastName || !firstName || !selectedBreed || !isChecked;

  const handleBreedChange = (breed: string) => {
    setSelectedBreed(breed);
    loadImages(breed);
  };

  const handleReset = () => {
    setLastName('');
    setFirstName('');
    setSelectedBreed('');
    setIsChecked(false);
    loadImages('');
    setSubmitError(null);
  };

  const handleSumbit = (e: FormEvent) => {
    e.preventDefault();
    if (disabledSubmit) return;
    const payload = {
      lastName,
      firstName,
      breed: selectedBreed,
      isChecked
    };
    submitForm(payload);
  };

  return (
    <section>
      <h1>Vos préférences en matière de chien</h1>
      <form onSubmit={handleSumbit}>
        <div className='form__fields-group'>
          <InputText label='Nom' value={lastName} onChange={setLastName} />
          <InputText label='Prénom' value={firstName} onChange={setFirstName} />
        </div>
        {isLoading ? (
          <Loader type='breeds' />
        ) : breedsError ? (
          <p className='error'>Erreur : {breedsError}</p>
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
            isLoading={isImagesLoading}
            error={imagesError}
          />
        )}

        <Checkbox
          breed={selectedBreed}
          checked={isChecked}
          onChange={() => setIsChecked(!isChecked)}
        />
        {submitError && <p className='error'>Erreur : {submitError}</p>}
        <div className='buttons__group'>
          <button type='button' onClick={handleReset}>
            Reset
          </button>
          <button type='submit' disabled={disabledSubmit || isSubmitting}>
            {isSubmitting ? 'Envoi…' : 'Submit'}
          </button>
        </div>
      </form>
    </section>
  );
};
