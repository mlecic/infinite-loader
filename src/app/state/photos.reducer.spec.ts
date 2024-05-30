import { photosReducer, PhotosState, initialState } from './photos.reducer';
import { getPhotosSuccess } from './photos.actions';
import { photo1, photo2 } from './photos.mock';
import { Photo } from '../photos.model';

describe('PhotosReducer', () => {
  describe('unknown action', () => {
    it('should return the default state', () => {
      const action = {
        type: 'Unknown',
      };
      const state = photosReducer(initialState, action);

      expect(state).toBe(initialState);
    });
  });

  describe('PhotosReducer should handle getPhotosSuccess action', () => {
    it('should retrieve all photos and update the state in an immutable way', () => {
      
      const photos: Photo[] = [
        photo1,
        photo2
      ];
      
      const newState: PhotosState = {
        photos,
        loading: false,
        errorMessage: ''
      };
      const action = getPhotosSuccess({ photos });
      const state = photosReducer(initialState, action);

      expect(state).toEqual(newState);
      expect(state).not.toBe(initialState);
    });
  });
});