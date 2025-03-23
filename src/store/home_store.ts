import type { StateCreator } from "zustand";

import type { RootStore } from "./root_store";

export interface HomeStore {
  category: string;
  setCategory: (value: string) => void;
}
export const CATEGORY_DATA = ["Now Playing", "Upcoming", "Popular"];
export const SORT_BY_DATA = [
  "By alphabetical order",
  "By rating",
  "By release date",
];

export const createHomeSlice: StateCreator<RootStore, [], [], HomeStore> = (
  set
) => ({
  category: CATEGORY_DATA[0],
  setCategory: (value) => set({ category: value }),
});
