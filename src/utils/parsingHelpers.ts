import { Metadata, Item } from "@owlbear-rodeo/sdk";
import CONDITION_DATA, { ConditionDataSingleton } from "./conditionData";
import { METADATA_ID } from "./constants";
import {
  CONDITION_ATTACHMENTS_RINGS,
  CONDITION_ATTACHMENTS_MARKERS,
} from "./fileToConditionMapData";
import { InputJson } from "./validateJson";

export const parseMetaData = (
  data: Metadata,
  setCheckedRings: React.Dispatch<React.SetStateAction<boolean>>,
  setCheckedConditionMarkers: React.Dispatch<React.SetStateAction<boolean>>,
  setJsonValue: React.Dispatch<React.SetStateAction<string>>,
  setFileToNameMap: React.Dispatch<
    React.SetStateAction<{
      [key: string]: string;
    }>
  >,
  setConditionData: React.Dispatch<
    React.SetStateAction<ConditionDataSingleton[]>
  >
) => {
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

  setCheckedRings(checkedRings);
  setCheckedConditionMarkers(checkedConditionMarkers);
  setJsonValue(jsonString || "");

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

  setFileToNameMap(fileToName);
  setConditionData(fullConditionData);
};

export const updateConditions = (
  itemsLocal: Item[],
  fileToNameMap: {
    [key: string]: string;
  },
  setConditions: React.Dispatch<React.SetStateAction<string[]>>
) => {
  const usedConditions: string[] = [];

  // Could maybe optimize by filtering as I go
  for (const item of itemsLocal) {
    if (fileToNameMap.hasOwnProperty(item.name)) {
      usedConditions.push(fileToNameMap[item.name]);
    }
  }

  const uniqueConditions = usedConditions.filter(
    (value, index, array) => array.indexOf(value) === index
  );

  setConditions(uniqueConditions);
};
