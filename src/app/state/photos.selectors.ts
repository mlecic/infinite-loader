import { createFeatureSelector, createSelector } from "@ngrx/store";
import { PhotosState } from './photos.reducer';

export const selectPhotosState = createFeatureSelector<PhotosState>('photos');

export const selectPhotos = createSelector(
  selectPhotosState,
  (photosState) => photosState.photos
);

export const selectPhotosLoading = createSelector(
  selectPhotosState,
  (photosState) => photosState.loading
);

export const selectPhotosError = createSelector(
  selectPhotosState,
  (photosState) => photosState.errorMessage
);