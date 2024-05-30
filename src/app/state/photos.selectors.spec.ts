import { selectPhotos, selectPhotosLoading, selectPhotosError } from "./photos.selectors";
import { PhotosState } from './photos.reducer';

describe("Photos Selectors", () => {
  const initialState: PhotosState = {
    photos: [],
    loading: false,
    errorMessage: '',
  };

  it("should select photos", () => {
    const result = selectPhotos.projector(initialState);
    expect(result.length).toEqual(0);
  });

  it("should select selectPhotosLoading", () => {
    const result = selectPhotosLoading.projector(initialState);
    expect(result).toBeFalse();
  });

  it("should select selectPhotosError", () => {
    const result = selectPhotosError.projector(initialState);
    expect(result).toBeFalsy();
  });
});