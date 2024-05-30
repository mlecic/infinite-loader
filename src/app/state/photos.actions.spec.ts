import {
  getPhotos,
  getPhotosSuccess,
  getPhotosFailure,
  markAsFavorite
} from './photos.actions';
import { Photo } from '../photos.model';
import { photo1, photo2 } from './photos.mock';

describe('Photos Actions', () => {
  it('should create a getPhotos action', () => {
    const action = getPhotos();
    expect(action.type).toBe('[Photos List] Get Photos');
  });

  it('should create a getPhotosSuccess with photos', () => {
    const photos: Photo[] = [
      photo1,
      photo2
    ];
    const action = getPhotosSuccess({ photos });
    expect(action.type).toBe('[Photos API] Load Photos Success');
    expect(action.photos).toEqual(photos);
  });

  it('should create a getPhotosFailure with message', () => {
    const message: string = 'Something went wrong';
    const action = getPhotosFailure({ message });
    expect(action.type).toBe('[Photos API] Load Photos Failure');
    expect(action.message).toEqual(message);
  });

  it('should create a markAsFavorite with message', () => {
    const favorite: Photo = photo2;
    const value = true;
    const action = markAsFavorite({ favorite, value });
    expect(action.type).toBe('[Photos List] Mark As Favorite');
    expect(action.favorite).toEqual(photo2);
    expect(action.value).toBeTrue();
  });
});