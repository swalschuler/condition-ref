import { create } from "zustand";
import { produce } from "immer";
import CONDITION_DATA, { ConditionDataSingleton } from "../utils/conditionData";
import { Item, Metadata } from "@owlbear-rodeo/sdk";
import { METADATA_ID } from "../utils/constants";
import { InputJson } from "../utils/validateJson";
import {
  CONDITION_ATTACHMENTS_MARKERS,
  CONDITION_ATTACHMENTS_RINGS,
} from "../utils/fileToConditionMapData";

type AppState = {
  conditions: string[];
  checkedRings: boolean;
  checkedConditionMarkers: boolean;
  jsonValue: string;
  fileToNameMap: {
    [key: string]: string;
  };
  conditionData: ConditionDataSingleton[];
  parseMetaData: (data: Metadata) => void;
  updateConditions: (itemsLocal: Item[]) => void;
};

const useAppState = create<AppState>()((set, get) => ({
  conditions: [],
  checkedRings: false,
  checkedConditionMarkers: false,
  jsonValue: "",
  fileToNameMap: {},
  conditionData: [],
  parseMetaData: (data) => {
    let fileToName: { [key: string]: string } = {}; // CONDITION_ATTACHMENT_NAMES;
    let fullConditionData: {
      name: string;
      url: string;
      conditionEffects: string[];
    }[] = [...CONDITION_DATA];

    let checkedRings = true;
    if (!!data[METADATA_ID]) {
      checkedRings = !!(data[METADATA_ID] as any).checkedRings;
    }

    let checkedConditionMarkers = true;
    if (!!data[METADATA_ID]) {
      checkedConditionMarkers = !!(data[METADATA_ID] as any)
        .checkedConditionMarkers;
    }

    let jsonString: string | undefined = undefined;
    if (!!data[METADATA_ID]) {
      jsonString = (data[METADATA_ID] as any).json;
    }

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

    console.log("SETTING");
    console.log(fileToName);
    return set(
      produce((state) => {
        state.checkedRings = checkedRings;
        state.checkedConditionMarkers = checkedConditionMarkers;
        state.jsonValue = jsonString || "";
        state.fileToNameMap = fileToName;
        state.conditionData = fullConditionData;
        // ...state,
        // checkedRings,
        // checkedConditionMarkers,
        // jsonValue: jsonString || "",
        // fileToNameMap: fileToName,
        // conditionData: fullConditionData,
      })
    );
  },
  updateConditions: (itemsLocal) => {
    console.log("UPDATE");
    console.log(get().fileToNameMap);
    const usedConditions: string[] = [];

    // Could maybe optimize by filtering as I go
    for (const item of itemsLocal) {
      if (get().fileToNameMap.hasOwnProperty(item.name)) {
        usedConditions.push(get().fileToNameMap[item.name]);
      }
    }

    const uniqueConditions = usedConditions.filter(
      (value, index, array) => array.indexOf(value) === index
    );

    console.log("UNIQUE");
    console.log(uniqueConditions);
    return set(
      produce((state) => {
        state.conditions = uniqueConditions;
      })
    );
  },
}));

export default useAppState;
