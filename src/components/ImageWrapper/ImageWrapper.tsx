import './image-wrapper.css';
import { FC } from 'react';
import { Loader } from '../Loader/Loader';

type ImagesWrapperProps = {
  images: string[];
  isLoading: boolean;
  error: string | null;
};

export const ImagesWrapper: FC<ImagesWrapperProps> = ({
  images,
  isLoading
}) => {
  if (isLoading) {
    return <Loader type='chiens' />;
  }

  return (
    <div className='image-wrapper'>
      {images.map((url) => (
        <img key={url} src={url} alt='Dog' className='dog-image' />
      ))}
    </div>
  );
};
