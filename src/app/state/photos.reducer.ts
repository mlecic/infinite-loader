import { createReducer, on } from '@ngrx/store';
import { getPhotos, getPhotosFailure, getPhotosSuccess, markAsFavorite } from './photos.actions';
import { Photo } from '../photos.model';

export interface PhotosState {
  photos: Photo[];
  loading: boolean;
  errorMessage: string;
}

export const initialState: PhotosState = {
  photos: [],
  loading: false,
  errorMessage: '',
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
    loading: false,
    errorMessage: ''
  })),
  on(getPhotosFailure, (state, { message }) => ({
    ...state,
    loading: false,
    errorMessage: message
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