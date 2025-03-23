import type { StateCreator } from "zustand";

import type { RootStore } from "./root_store";

export interface GenreStore {
  genre?: Genre[];
  setGenre: (value: Genre[]) => void;
}

export const createGenreSlice: StateCreator<RootStore, [], [], GenreStore> = (
  set
) => ({
  genre: undefined,
  setGenre: (value) => set({ genre: value }),
});
