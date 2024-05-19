import { createReducer, on } from '@ngrx/store';
import { addFavorite, removeFavorite } from './favorites.actions';
import { Photo } from '../photos.model';

export interface FavoritesState {
  favorites: Photo[];
}

export const initialState: FavoritesState = {
  favorites: []
};

export const favoritesReducer = createReducer(
  initialState,
  on(addFavorite, (state, { favorite }) => ({
    ...state,
    favorites: [...state.favorites, favorite]
  })),
  on(removeFavorite, (state, { favorite }) => ({
    ...state,
    favorites: state.favorites.filter(f => f.id !== favorite.id)
  })),
);