import type { StateCreator } from "zustand";

import type { RootStore } from "./root_store";

export interface AppStore {}

export const createAppSlice: StateCreator<RootStore, [], [], AppStore> = (
  set
) => ({});
