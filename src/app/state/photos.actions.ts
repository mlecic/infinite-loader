import { createAction, props } from '@ngrx/store';
import { Photo } from '../photos.model';

export const getPhotos = createAction(
  '[Photos List] Get Photos'
);

export const getPhotosSuccess = createAction(
  '[Photos List] Load Photos Success',
  props<{ photos: Photo[], nextUrl: string | null }>()
);
