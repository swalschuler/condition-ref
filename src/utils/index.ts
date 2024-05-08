import OBR, { Item } from "@owlbear-rodeo/sdk";
import { SettingsData } from "../components/Settings";

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

export const broadcastState = (state: SettingsData) => {
  OBR.broadcast
    .sendMessage("net.upperatmosphere.tokentext", state)
    .catch((_e) =>
      alert(
        "Unable to share your token text. Try reducing the size of your JSON."
      )
    );
};
