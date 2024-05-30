import { favoritesReducer, FavoritesState, initialState } from './favorites.reducer';
import { addFavorite, removeFavorite } from './favorites.actions';
import { photo1, photo2 } from './photos.mock';
import { Photo } from '../photos.model';

describe('FavoritesReducer', () => {
  describe('unknown action', () => {
    it('should return the default state', () => {
      const action = {
        type: 'Unknown',
      };
      const state = favoritesReducer(initialState, action);

      expect(state).toBe(initialState);
    });
  });

  describe('FavoritesReducer should handle specific actions', () => {
    it('should add favorite and update the state in an immutable way', () => {
      
      const favorites: Photo[] = [
        photo1
      ];
      
      const newState: FavoritesState = {
        favorites
      };
      const action = addFavorite({ favorite: photo1 });
      const state = favoritesReducer(initialState, action);

      expect(state).toEqual(newState);
      expect(state).not.toBe(initialState);
    });

    it('should remove favorite and update the state in an immutable way', () => {
      
      const favorites: Photo[] = [
        photo1,
        photo2
      ];

      const initialFavoritesState = {
        favorites
      }
      
      const newState: FavoritesState = {
        favorites: [photo1]
      };
      const action = removeFavorite({ favorite: photo2 });
      const state = favoritesReducer(initialFavoritesState, action);

      expect(state).toEqual(newState);
      expect(state).not.toBe(initialState);
    });
  });
});