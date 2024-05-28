import { createAction, props } from '@ngrx/store';
import { Photo } from '../photos.model';

export const addFavorite = createAction(
  '[Photos List] Add Favorite',
  props<{ favorite: Photo }>()
);

export const removeFavorite = createAction(
  '[Photos List] Remove Favorite',
  props<{ favorite: Photo }>()
);
