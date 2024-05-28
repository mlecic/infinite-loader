import { createAction, props } from '@ngrx/store';
import { Photo } from '../photos.model';

export const getPhotos = createAction(
  '[Photos List] Get Photos'
);

export const getPhotosSuccess = createAction(
  '[Photos API] Load Photos Success',
  props<{ photos: Photo[] }>()
);

export const getPhotosFailure = createAction(
  '[Photos API] Load Photos Failure',
  props<{ message: string }>()
);

export const markAsFavorite = createAction(
  '[Photos List] Mark As Favorite',
  props<{ favorite: Photo, value: boolean }>()
);
