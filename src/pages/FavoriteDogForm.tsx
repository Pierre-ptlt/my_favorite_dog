import '../components/Form/form.css';

import { FC, FormEvent, useState } from 'react';
import { InputText } from '../components/Form/InputText/InputText';
import { Dropdown } from '../components/Form/Dropdown/Dropdown';
import { Loader } from '../components/Loader/Loader';
import { ImagesWrapper } from '../components/ImageWrapper/ImageWrapper';
import { Checkbox } from '../components/Form/Checkbox/Checkbox';
import { useGetDogBreeds } from '../hooks/useGetDogBreeds';
import { useGetRandomImage } from '../hooks/useGetRandomImage';
import { FavoriteDogFormData } from '../types';
import { postSubmit } from '../api/postSubmit';

export const FavoriteDogForm: FC = () => {
  const [lastName, setLastName] = useState<string>('');
  const [firstName, setFirstName] = useState<string>('');
  const [selectedBreed, setSelectedBreed] = useState<string>('');
  const [isChecked, setIsChecked] = useState<boolean>(false);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const numberOfImages = 5;

  const { breeds, isLoading, error: breedsError } = useGetDogBreeds();
  const {
    images,
    isLoading: isImagesLoading,
    error: imagesError,
    loadImages
  } = useGetRandomImage(numberOfImages);

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

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    setIsSubmitting(true);
    setSubmitError(null);

    const payload: FavoriteDogFormData = {
      lastName,
      firstName,
      breed: selectedBreed,
      isChecked
    };

    try {
      await postSubmit(payload);
    } catch (err: any) {
      setSubmitError(err.message ?? 'Une erreur est survenue');
    } finally {
      setIsSubmitting(false);
    }
  };

  const renderDropdown = () => {
    if (isLoading) {
      return <Loader type='races' />;
    }
    if (breedsError) {
      return (
        <p className='error' role='alert'>
          Erreur : {breedsError}
        </p>
      );
    }
    return (
      <Dropdown
        label='Race de chien préférée'
        options={breeds}
        value={selectedBreed}
        onChange={handleBreedChange}
      />
    );
  };

  return (
    <section>
      <h1>Vos préférences en matière de chien</h1>
      <form onSubmit={handleSubmit}>
        <div className='form__fields-group'>
          <InputText label='Nom' value={lastName} onChange={setLastName} />
          <InputText label='Prénom' value={firstName} onChange={setFirstName} />
        </div>
        {renderDropdown()}
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
        {submitError && (
          <p className='error' role='alert'>
            Erreur : {submitError}
          </p>
        )}
        <div className='buttons__group'>
          <button type='reset' onClick={handleReset}>
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
