import type { StateCreator } from "zustand";

import type { RootStore } from "./root_store";

export interface AppStore {
  watchList: Movie[];
  addToWatchList: (movie: Movie) => void;
}

export const createAppSlice: StateCreator<RootStore, [], [], AppStore> = (
  set
) => ({
  watchList: [],
  addToWatchList: (movie) => {
    set((state) => {
      if (!state.watchList.some((item) => item.id === movie.id)) {
        return { watchList: [...state.watchList, movie] };
      }
      return state;
    });
  },
});
