import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View, Switch } from "react-native";
import { Dropdown } from "react-native-element-dropdown";
import { saveSettings, loadSettings } from "../utils/AsyncStorage";
import { useTranslation } from "react-i18next";
import i18n from "../i8n";

const langData = [
  { label: "English", value: "en" },
  { label: "Finnish", value: "fi" },
];

export default function AppSettings() {
  const [lanValue, setLanValue] = useState("en");
  const [notifEnabled, setNotifEnabled] = useState(true);
  const [commentNotifsEnabled, setCommentNotifsEnabled] = useState(true);
  const [postLikeNotifsEnabled, setPostLikeNotifsEnabled] = useState(true);
  const [newFollowerNotifsEnabled, setNewFollowerNotifsEnabled] =
    useState(true);

  const { t } = useTranslation();

  useEffect(() => {
    const getSettings = async () => {
      const saved = await loadSettings();
      if (saved) {
        setLanValue(saved.lanValue);
        setNotifEnabled(saved.notifEnabled);
        setCommentNotifsEnabled(saved.commentNotifsEnabled);
        setPostLikeNotifsEnabled(saved.postLikeNotifsEnabled);
        setNewFollowerNotifsEnabled(saved.newFollowerNotifsEnabled);

        i18n.changeLanguage(saved.lanValue);
      }
    };
    getSettings();
  });

  //Tallennetaan asetukset kun asetuksia muutetaan
  useEffect(() => {
    saveSettings({
      lanValue,
      notifEnabled,
      commentNotifsEnabled,
      postLikeNotifsEnabled,
      newFollowerNotifsEnabled,
    });
  }, [
    lanValue,
    notifEnabled,
    commentNotifsEnabled,
    postLikeNotifsEnabled,
    newFollowerNotifsEnabled,
  ]);

  return (
    <View style={styles.container}>
      <View style={styles.appSettingsCont}>
        <View style={styles.langCont}>
          <Text style={styles.langText}>{t("settings.titles.language")}</Text>
          <Dropdown
            style={[styles.langDropdown]}
            containerStyle={styles.dropdownCont}
            selectedTextStyle={styles.dropdownText}
            itemContainerStyle={styles.dropdownCont}
            itemTextStyle={styles.dropdownText}
            activeColor="#3B2917"
            data={langData}
            labelField="label"
            valueField="value"
            value={lanValue}
            onChange={(item) => {
              setLanValue(item.value);
              i18n.changeLanguage(item.value);
            }}
          />
        </View>
        <View style={styles.notifCont}>
          <Text style={styles.langText}>
            {t("settings.titles.notifications")}
          </Text>
          <Switch
            trackColor={{ false: "#EDE9C7", true: "#EFC06D" }}
            thumbColor={notifEnabled ? "#E06F24" : "#EFC06D"}
            onValueChange={() =>
              setNotifEnabled((previousState) => !previousState)
            }
            value={notifEnabled}
            style={{ transform: [{ scaleX: 1.5 }, { scaleY: 1.5 }] }}
          />
        </View>
        <View style={styles.innerNotifCont}>
          <View style={styles.singleNotif}>
            <Text style={styles.innerNotifText}>
              {t("settings.titles.commentsOnPosts")}
            </Text>
            <Switch
              trackColor={{ false: "#EDE9C7", true: "#EFC06D" }}
              thumbColor={commentNotifsEnabled ? "#E06F24" : "#EFC06D"}
              onValueChange={() =>
                setCommentNotifsEnabled((previousState) => !previousState)
              }
              value={commentNotifsEnabled}
              style={{ transform: [{ scaleX: 1.3 }, { scaleY: 1.3 }] }}
              disabled={!notifEnabled}
            />
          </View>
          <View style={styles.singleNotif}>
            <Text style={styles.innerNotifText}>
              {t("settings.titles.likesOnPosts")}
            </Text>
            <Switch
              trackColor={{ false: "#EDE9C7", true: "#EFC06D" }}
              thumbColor={postLikeNotifsEnabled ? "#E06F24" : "#EFC06D"}
              onValueChange={() =>
                setPostLikeNotifsEnabled((previousState) => !previousState)
              }
              value={postLikeNotifsEnabled}
              style={{ transform: [{ scaleX: 1.3 }, { scaleY: 1.3 }] }}
              disabled={!notifEnabled}
            />
          </View>
          <View style={styles.singleNotif}>
            <Text style={styles.innerNotifText}>
              {t("settings.titles.newFollowers")}
            </Text>
            <Switch
              trackColor={{ false: "#EDE9C7", true: "#EFC06D" }}
              thumbColor={newFollowerNotifsEnabled ? "#E06F24" : "#EFC06D"}
              onValueChange={() =>
                setNewFollowerNotifsEnabled((previousState) => !previousState)
              }
              value={newFollowerNotifsEnabled}
              style={{ transform: [{ scaleX: 1.3 }, { scaleY: 1.3 }] }}
              disabled={!notifEnabled}
            />
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#1D190E",
  },
  appSettingsCont: {
    padding: 30,
    alignItems: "flex-start",
  },
  langCont: {
    flexDirection: "row",
    width: "100%",
  },
  langText: {
    fontSize: 20,
    color: "#EDE9C7",
    textAlignVertical: "center", // may not work with iOS
    paddingRight: 40,
  },
  langDropdown: {
    height: 56,
    borderColor: "#EDE9C7",
    borderWidth: 0.5,
    borderRadius: 12,
    paddingHorizontal: 10,
    width: "50%",
    color: "#EDE9C7",
  },
  dropdownText: {
    color: "#EDE9C7",
  },
  dropdownCont: {
    backgroundColor: "#28200C",
    color: "#EDE9C7",
    borderWidth: 0,
    borderColor: "null",
  },
  notifCont: {
    paddingTop: 40,
    flexDirection: "row",
    width: "100%",
    justifyContent: "space-between",
  },
  innerNotifCont: {
    paddingLeft: 40,
    paddingTop: 10,
  },
  singleNotif: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
  },
  innerNotifText: {
    color: "#EDE9C7",
    fontSize: 18,
    textAlignVertical: "center", // may not work with iOS
  },
});
