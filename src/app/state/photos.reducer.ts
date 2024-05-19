import { createReducer, on } from '@ngrx/store';
import { getPhotos, getPhotosSuccess } from './photos.actions';
import { Photo } from '../photos.model';

export interface PhotosState {
  photos: Photo[];
  loading: boolean;
  error: any;
  nextUrl: string | null;
}

export const initialState: PhotosState = {
  photos: [],
  loading: false,
  error: null,
  nextUrl: null
};

export const photosReducer = createReducer(
  initialState,
  on(getPhotos, state => ({
    ...state,
    loading: true
  })),
  on(getPhotosSuccess, (state, { photos, nextUrl }) => ({
    ...state,
    posts: [...state.photos, ...photos],
    loading: false,
    nextUrl
  })),
);