import OBR, { Item } from "@owlbear-rodeo/sdk";
import { notifications } from "@mantine/notifications";
import { SettingsData } from "../components/Settings";
import CONDITION_DATA from "./conditionData";
import {
  CONDITION_ATTACHMENTS_MARKERS,
  CONDITION_ATTACHMENTS_RINGS,
} from "./fileToConditionMapData";
import { InputJson } from "./validateJson";

export const getUniqueConditions = (
  itemsLocal: Item[],
  fileToNameMap: {
    [key: string]: string;
  }
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
  return uniqueConditions;
};

export const getConditionData = (
  checkedRings: boolean,
  checkedConditionMarkers: boolean,
  jsonString: string
) => {
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

  return { fileToNameMap: fileToName, conditionData: fullConditionData };
};

export const showErrorNotification = (title: string, message?: string) => {
  notifications.show({
    title,
    message,
    withBorder: true,
    color: "red",
  });
};

export const showSuccessNotification = (title: string, message?: string) => {
  notifications.show({
    title,
    message,
    withBorder: true,
    color: "green",
  });
};

export const broadcastState = (state: SettingsData) => {
  OBR.broadcast
    .sendMessage("net.upperatmosphere.tokentext", state)
    .then(() => showSuccessNotification("Shared your token text with players."))
    .catch((e) => {
      console.log(e);
      showErrorNotification(
        "Unable to share your token text.",
        "Try reducing the size of your JSON."
      );
    });
};
