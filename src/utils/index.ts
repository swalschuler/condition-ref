import OBR from "@owlbear-rodeo/sdk";
import { SettingsData } from "../components/Settings";

export const broadcastState = (state: SettingsData) => {
  OBR.broadcast
    .sendMessage("net.upperatmosphere.tokentext", state, {
      destination: "ALL",
    })
    .catch((_e) =>
      alert(
        "Couldn't share your token text. Try reducing the size of your JSON."
      )
    );
};
