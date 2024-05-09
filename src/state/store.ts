import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { Item } from "@owlbear-rodeo/sdk";

type AppState = {
  checkedRings: boolean;
  checkedConditionMarkers: boolean;
  jsonValue: string;
  localItems: Item[];
};

const useAppState = create<AppState>()(
  persist(
    (_set, _get) => ({
      checkedRings: true,
      checkedConditionMarkers: true,
      jsonValue: "",
      fileToNameMap: {},
      conditionData: [],
      localItems: [],
    }),
    {
      name: "net-upperatmosphere-tokentext",
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        // Omitting localItems
        checkedRings: state.checkedRings,
        checkedConditionMarkers: state.checkedConditionMarkers,
        jsonValue: state.jsonValue,
      }),
    }
  )
);

export default useAppState;
