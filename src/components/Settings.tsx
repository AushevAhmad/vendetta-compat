import {
  FormDivider,
  FormRow,
  FormSection,
  FormSwitch,
  FormText,
  FormInput,
} from "enmity/components";
import { Constants, React, StyleSheet, Toasts } from "enmity/metro/common";
import { get, set } from "enmity/api/settings";
import locale from "../common/locale";
import { getIDByName } from "enmity/api/assets";
import { reload } from "enmity/api/native";

export default ({ Manifest }) => {
  const [customVenURL, setCustomVenURL] = React.useState(
    get(Manifest.name, "customVendettaURL", {
      enabled: false,
      url: "http://localhost:4040/vendetta.js",
    }) as { enabled: boolean; url: string }
  );
  const styles = StyleSheet.createThemedStyleSheet({
    icon: {
      color: Constants.ThemeColorMap.INTERACTIVE_NORMAL,
    },
    info: {
      color: StyleSheet.ThemeColorMap.HEADER_PRIMARY,
      fontFamily: Constants.Fonts.DISPLAY_BOLD,
      textAlign: "center",
      fontSize: 14,
      marginTop: 10,
    },
  });

  return (
    <>
      <FormSection title={locale.settings.strangeWording.title[0]}>
        <FormRow
          label={locale.settings.customVendettaURL.title[0]}
          subLabel={locale.settings.customVendettaURL.description[0]}
          leading={
            <FormRow.Icon
              style={styles.icon}
              source={getIDByName("ic_locale_24px")}
            />
          }
          trailing={
            <FormSwitch
              value={customVenURL.enabled}
              onValueChange={() =>
                setCustomVenURL((prev: any) => {
                  set(Manifest.name, "customVendettaURL", {
                    enabled: true,
                    url: prev.url,
                  });
                  return { enabled: true, url: prev.url };
                })
              }
            />
          }
        />
        {customVenURL.enabled && (
          <FormInput
            value={customVenURL.url}
            onChangeText={(txt: string) =>
              setCustomVenURL((prev: any) => {
                set(Manifest.name, "customVendettaURL", {
                  enabled: prev.enabled,
                  url: txt,
                });
                return { enabled: prev.enabled, url: txt };
              })
            }
            placeholder="http://localhost:4040/vendetta.js"
            title={locale.settings.customVendettaURL.input[0]}
          />
        )}
      </FormSection>
      <FormDivider />
      <FormSection title={locale.settings.clearOptions.title[0]}>
        <FormRow
          label={locale.settings.clearOptions.title[0]}
          subLabel={locale.settings.clearOptions.description[0]}
          leading={
            <FormRow.Icon
              style={styles.icon}
              source={getIDByName("ic_message_delete")}
            />
          }
          trailing={() => <FormRow.Arrow />}
          onPress={() => {
            set(Manifest.name, "shownEnabledDialog", false);
            set(Manifest.name, "strangeCode", 0);

            Toasts.open({
              content: locale.toasts.clear[0],
              source: locale.toasts.icons.success,
            });
          }}
        />
      </FormSection>
      <FormDivider />
      <FormSection title={locale.settings.reload.title[0]}>
        <FormRow
          label={locale.settings.reload.title[0]}
          subLabel={locale.settings.reload.description[0]}
          leading={
            <FormRow.Icon
              style={styles.icon}
              source={getIDByName("ic_message_retry")}
            />
          }
          trailing={() => <FormRow.Arrow />}
          onPress={() => reload()}
        />
      </FormSection>
      <FormDivider />
      <FormText style={styles.info}>{locale.settings.info()[0]}</FormText>
    </>
  );
};
