import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { produce } from "immer";
import CONDITION_DATA, { ConditionDataSingleton } from "../utils/conditionData";
import { Item } from "@owlbear-rodeo/sdk";
import { InputJson } from "../utils/validateJson";
import {
  CONDITION_ATTACHMENTS_MARKERS,
  CONDITION_ATTACHMENTS_RINGS,
} from "../utils/fileToConditionMapData";
import { SettingsData } from "../components/Settings";

type AppState = {
  checkedRings: boolean;
  checkedConditionMarkers: boolean;
  jsonValue: string;
  fileToNameMap: {
    [key: string]: string;
  };
  conditionData: ConditionDataSingleton[];
  localItems: Item[];
  setSettingsState: (state: SettingsData) => void;
};

const useAppState = create<AppState>()(
  persist(
    (set) => ({
      checkedRings: false,
      checkedConditionMarkers: false,
      jsonValue: "",
      fileToNameMap: {},
      conditionData: [],
      localItems: [],
      setSettingsState: (state) => {
        const { checkedRings, checkedConditionMarkers, jsonString } = state;

        let fileToName: { [key: string]: string } = {}; // CONDITION_ATTACHMENT_NAMES;
        let fullConditionData: {
          name: string;
          url: string;
          conditionEffects: string[];
        }[] = [...CONDITION_DATA];

        fileToName = {
          ...fileToName,
          ...(checkedRings && CONDITION_ATTACHMENTS_RINGS),
          ...(checkedConditionMarkers && CONDITION_ATTACHMENTS_MARKERS),
        };

        let json: InputJson;

        try {
          // User defined JSON is dangerous :O
          json = JSON.parse(jsonString || "[]") as InputJson;
        } catch (e) {
          json = JSON.parse("[]");
        }

        json.map((entry) => {
          const dataEntry = {
            name: entry.title,
            url: entry?.url || "",
            conditionEffects: entry.conditionEffects,
          };
          fullConditionData.push(dataEntry);
          fileToName[entry.fileName] = entry.title;
        });

        return set(
          produce((state) => {
            state.checkedRings = checkedRings;
            state.checkedConditionMarkers = checkedConditionMarkers;
            state.jsonValue = jsonString;
            state.fileToNameMap = fileToName;
            state.conditionData = fullConditionData;
          })
        );
      },
    }),
    {
      name: "net-upperatmosphere-tokentext",
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        // Omitting localItems
        checkedRings: state.checkedRings,
        checkedConditionMarkers: state.checkedConditionMarkers,
        jsonValue: state.jsonValue,
        fileToNameMap: state.fileToNameMap,
        conditionData: state.conditionData,
      }),
    }
  )
);

export default useAppState;
