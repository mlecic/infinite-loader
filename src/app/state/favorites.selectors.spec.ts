import { selectFavorites } from "./favorites.selectors";
import { FavoritesState } from './favorites.reducer';

describe("Favorites Selectors", () => {
  const initialState: FavoritesState = {
    favorites: []
  };

  it("should select favorites", () => {
    const result = selectFavorites.projector(initialState);
    expect(result.length).toEqual(0);
  });
});