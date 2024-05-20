import { createReducer, on } from '@ngrx/store';
import { getPhotos, getPhotosSuccess, markAsFavorite } from './photos.actions';
import { Photo } from '../photos.model';

export interface PhotosState {
  photos: Photo[];
  loading: boolean;
  error: any;
}

export const initialState: PhotosState = {
  photos: [],
  loading: false,
  error: null,
};

export const photosReducer = createReducer(
  initialState,
  on(getPhotos, state => ({
    ...state,
    loading: true
  })),
  on(getPhotosSuccess, (state, { photos }) => ({
    ...state,
    photos: [...state.photos, ...photos],
    loading: false
  })),
  on(markAsFavorite, (state, { favorite, value }) => ({
    ...state,
    photos: state.photos.map(photo => {
      if(photo.id === favorite.id) {
        return { ...photo, favorite: value }
      } else return photo;
    }),
  }))
);