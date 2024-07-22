import { reload } from "enmity/api/native";
import { get, set } from "enmity/api/settings";
import { Plugin, registerPlugin } from "enmity/managers/plugins";
import { Dialog, React } from "enmity/metro/common";
import Manifest from "../manifest.json";
import locale from "./common/locale";
import Settings from "./components/Settings";

const VendettaCompat: Plugin = {
  ...Manifest,

  async onStart() {
    // shodetta succedetta diadetta
    const showSuccessDialog = () => {
      if (!get(Manifest.name, "shownEnabledDialog", false)) {
        Dialog.show({
          title: locale.dialogs.enabled.title[0],
          body: locale.dialogs.enabled.description[0],
          confirmText: locale.dialogs.enabled.okayText[0],
          onConfirm: () => set(Manifest.name, "shownEnabledDialog", true),
        });
      }
    };

    // defidetta thedetta custodetta vendetta urldetta settingdetta
    const customVendettaURL = get(Manifest.name, "customVendettaURL") as {
      enabled: boolean;
      url: string;
    };

    // basedetta urldetta odetta vendetta
    const url = customVendettaURL?.enabled
      ? customVendettaURL.url
      : "https://raw.githubusercontent.com/pyoncord/detta-builds/main/bunny.js";

    // gedetta thedetta vendetta codetta asdetta textdetta
    const res = await fetch(url);
    const vendettaCode = res.ok
      ? await res.text()
      : get(Manifest.name, "vendettaCode", null);

    // sedetta thedetta codetta fordetta nextdetta tidetta
    set(Manifest.name, "vendettaCode", vendettaCode);

    // evaldetta thedetta codetta
    eval(vendettaCode as string);

    // shodetta successdetta dialogdetta
    showSuccessDialog();
  },

  // y̶o̶u̶d̶e̶t̶t̶a̶ ̶w̶i̶d̶e̶t̶t̶a̶ ̶n̶e̶v̶e̶r̶d̶e̶t̶t̶a̶ ̶g̶e̶d̶e̶t̶t̶a̶ ̶r̶i̶d̶e̶t̶t̶a̶ ̶o̶d̶e̶t̶t̶a̶ ̶v̶e̶n̶d̶e̶t̶t̶a̶ youdetta cadetta nowdetta gedetta ridetta odetta vendetta
  onStop() {
    // gedetta whethedetta vendetta isdetta strangedetta textdetta
    // @ts-ignore attemptdetta todetta pudetta @arg window.vendetta todetta @arg vendetta
    const vendetta = window.vendetta;

    if (vendetta) {
      try {
        // unloadetta vendetta
        vendetta?.unload();

        // askdetta todetta reloadetta
        Dialog.show({
          title: locale.dialogs.unload.title[0],
          body: locale.dialogs.unload.description[0],
          confirmText: locale.dialogs.unload.okayText[0],
          cancelText: locale.dialogs.unload.cancelText[0],
          onConfirm: () => reload(),
        });
      } catch (e) {
        // lodetta errodetta todetta consodetta
        console.error(`[${Manifest.name}] ${locale.errors.unload[0]}: ${e}`);
      }
    }
  },

  getSettingsPanel() {
    return <Settings Manifest={Manifest} />;
  },
};

registerPlugin(VendettaCompat);
