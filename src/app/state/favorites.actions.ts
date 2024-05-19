import { createAction, props } from '@ngrx/store';
import { Photo } from '../photos.model';

export const addFavorite = createAction(
  '[List] Add Favorite',
  props<{ favorite: Photo }>()
);

export const removeFavorite = createAction(
  '[List] Remove Favorite',
  props<{ favorite: Photo }>()
);
