import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer, useNavigation } from "@react-navigation/native";
import AppSettings from "./AppSettings";
import UserSettings from "./UserSettings";
import UserStatistics from "./UserStatistics";
import { useTranslation } from "react-i18next";

import { DeleteTokens } from "../utils/SecureStorage";
import { deleteUserName } from "../utils/AsyncStorage";
import Login from "./Login";

const Stack = createNativeStackNavigator();

function SettingsStack() {
  return (
    <Stack.Navigator
      initialRouteName="MainSettingsScreen"
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen name="MainSettingsScreen" component={MainSettingsScreen} />
      <Stack.Screen name="UserSettingsScreen" component={UserSettings} />
      <Stack.Screen name="AppSettingsScreen" component={AppSettings} />
      <Stack.Screen name="UserStatistics" component={UserStatistics} />
      <Stack.Screen name="Login" component={Login}></Stack.Screen>
    </Stack.Navigator>
  );
}

function MainSettingsScreen() {
  const navigation = useNavigation();
  const { t } = useTranslation();

  const LogOut = async () => {
    try {
      await deleteUserName();
      await DeleteTokens();

      navigation.navigate("Login" as never);
    } catch (e) {
      console.error("Error during logout", e);
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.settingsNav}
        onPress={() => navigation.navigate("UserStatistics" as never)}
      >
        <Text style={styles.settingsText}>
          {t("mainsettings.titles.userstatistics")}
        </Text>
        <Ionicons
          name="chevron-forward"
          size={32}
          color="#EDE9C7"
          alignSelf="flex-end"
          marginTop="-27"
        />
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.settingsNav}
        onPress={() => navigation.navigate("UserSettingsScreen" as never)}
      >
        <Text style={styles.settingsText}>
          {t("mainsettings.titles.usersettings")}
        </Text>
        <Ionicons
          name="chevron-forward"
          size={32}
          color="#EDE9C7"
          alignSelf="flex-end"
          marginTop="-27"
        />
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.settingsNav}
        onPress={() => navigation.navigate("AppSettingsScreen" as never)}
      >
        <Text style={styles.settingsText}>
          {t("mainsettings.titles.appsettings")}
        </Text>
        <Ionicons
          name="chevron-forward"
          size={32}
          color="#EDE9C7"
          alignSelf="flex-end"
          marginTop="-27"
        />
      </TouchableOpacity>
      <TouchableOpacity style={styles.settingsNav} onPress={LogOut}>
        <Text style={styles.settingsText}>
          {t("mainsettings.titles.logout")}
        </Text>
        <Ionicons
          name="chevron-forward"
          size={32}
          color="#EDE9C7"
          alignSelf="flex-end"
          marginTop="-27"
        />
      </TouchableOpacity>
    </View>
  );
}

export default function MainSettings() {
  return <SettingsStack />;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#1D190E",
    alignItems: "center",
  },
  settingsNav: {
    width: "100%",
    backgroundColor: "#28200C",
    padding: 20,
  },
  settingsText: {
    color: "#EDE9C7",
    fontSize: 16,
  },
});
