import { create } from "zustand";
import type { StateStorage } from "zustand/middleware";
import { createJSONStorage, persist } from "zustand/middleware";
import { mmkvStorage } from "./local-storage/mmkv";
import { AppStore, createAppSlice } from "./app_store";
import { HomeStore, createHomeSlice } from "./home_store";

const dataStorage: StateStorage = {
  getItem: async (key) => {
    return new Promise<string | null>((resolve, _) => {
      const value = mmkvStorage.getString(key);
      if (value) {
        resolve(value);
      } else {
        resolve(null);
      }
    });
  },
  setItem: async (key, value) => {
    mmkvStorage.set(key, value);
  },
  removeItem: async (key) => {
    mmkvStorage.delete(key);
  },
};

export interface RootStore extends AppStore, HomeStore {
  _hasHydrated: boolean;
  setHasHydrated: (state: boolean) => void;
}

type RootStoreKey = keyof RootStore;

//If you want to add a new persistent key please add it to the PERSISTENT_KEYS
const PERSISTENT_KEYS: RootStoreKey[] = ["category"];

export const useStore = create<RootStore>()(
  persist(
    (...a) => ({
      ...createHomeSlice(...a),
      ...createAppSlice(...a),
      _hasHydrated: false,
      setHasHydrated: (state) => {
        const set = a[0];
        set({
          _hasHydrated: state,
        });
      },
    }),
    {
      name: "zustand-app",
      storage: createJSONStorage(() => dataStorage),
      partialize: (state) =>
        Object.fromEntries(
          Object.entries(state).filter(([key]) =>
            PERSISTENT_KEYS.includes(key as RootStoreKey)
          )
        ),
      onRehydrateStorage: () => (state) => {
        state?.setHasHydrated(true);
      },
    }
  )
);
