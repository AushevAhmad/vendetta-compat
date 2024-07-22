import { getIDByName } from "enmity/api/assets";
import Manifest from "../../manifest.json";

export default {
  errors: {
    unload: ["Error when trying to unload Vendetta"],
  },
  settings: {
    strangeWording: {
      title: ["Strange wording"],
      description: ["Make Vendetta use strange wording for all of its text"],
    },
    customVendettaURL: {
      title: ["Custom Vendetta URL"],
      description: ["Loads Vendetta from a custom endpoint"],
      input: ["Vendetta URL"],
    },
    clearOptions: {
      title: ["Clear Stores"],
      description: [
        "Clear enable dialog, strange word options and cached code.",
      ],
    },
    reload: {
      title: ["Reload"],
      description: ["Reload Discord to apply any changes."],
    },
    info: () => [
      `Version ${Manifest.version} by ${Manifest.authors
        .map((author) => author.name)
        .join(", ")}`,
    ],
  },
  dialogs: {
    enabled: {
      title: ["Enabled Vendetta"],
      description: [
        "Successfully enabled Vendetta. To disable it, just disable the plugin.",
      ],
      okayText: ["Okay"],
    },
    unload: {
      title: ["Must reload"],
      description: [
        "To fully disable Vendetta, you need to reload your Discord. Please note that Vendetta will not work until you reload Discord.",
      ],
      okayText: ["Reload"],
      cancelText: ["Later"],
    },
  },
  toasts: {
    clear: ["Successfully cleared all stored data."],
    strangeText: (kind: string) => [`Successfully ${kind} Strange Words.`],
    icons: {
      success: getIDByName("ic_check_18px"),
    },
  },
};
