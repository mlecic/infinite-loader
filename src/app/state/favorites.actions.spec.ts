import { addFavorite, removeFavorite } from './favorites.actions';
import { Photo } from '../photos.model';
import { photo1 } from './photos.mock';

it('should create a addFavorite action', () => {
  const favorite: Photo = photo1;
  const action = addFavorite({ favorite });
  expect(action.type).toBe('[Photos List] Add Favorite');
  expect(action.favorite).toEqual(photo1);
});

it('should create a removeFavorite action', () => {
  const favorite: Photo = photo1;
  const action = removeFavorite({ favorite });
  expect(action.type).toBe('[Photos List] Remove Favorite');
  expect(action.favorite).toEqual(photo1);
});