import { createAction, props } from '@ngrx/store';
import { Photo } from '../photos.model';

export const getPhotos = createAction(
  '[Photos List] Get Photos'
);

export const getPhotosSuccess = createAction(
  '[Photos API] Load Photos Success',
  props<{ photos: Photo[] }>()
);

export const markAsFavorite = createAction(
  '[Photos List] Mark As Favorite',
  props<{ favorite: Photo, value: boolean }>()
);
