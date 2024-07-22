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
      <FormSection title="Options">
        <FormRow
          label="Custom Vendetta URL"
          subLabel="Loads Vendetta from a custom endpoint"
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
            title="Vendetta URL"
          />
        )}
      </FormSection>
      <FormDivider />
      <FormSection title="Clear Stores">
        <FormRow
          label="Clear Stores"
          subLabel="Clear enable dialog and cached code."
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
              content: "Successfully cleared all stored data.",
              source: getIDByName("ic_check_18px"),
            });
          }}
        />
      </FormSection>
      <FormDivider />
      <FormSection title="Reload">
        <FormRow
          label="Reload"
          subLabel="Reload Discord to apply any changes."
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
    </>
  );
};
