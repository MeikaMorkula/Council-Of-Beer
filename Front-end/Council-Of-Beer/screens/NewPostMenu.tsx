import React from "react";
import { View, Text, Pressable, StyleSheet } from "react-native";
import { useTranslation } from "react-i18next";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";

type NewPostStackParamList = {
  NewPostMenu: undefined;
  AddBeer: undefined;
  BarcodeScanner: { onScan: (code: string) => void };
  SearchBeer: undefined;
};

export default function NewPostMenu() {
  const navigation =
    useNavigation<NativeStackNavigationProp<NewPostStackParamList>>();
  const { t } = useTranslation();

  const MenuButton = ({
    title,
    onPress,
  }: {
    title: string;
    onPress?: () => void;
  }) => (
    <Pressable onPress={onPress} style={styles.menuButton}>
      <Text style={styles.menuText}>{title}</Text>
      <Ionicons name="chevron-forward" size={24} color="#888" />
    </Pressable>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{t("newPostMenu.title")}</Text>

      <MenuButton title={t("newPostMenu.scanBarcode")} />
      <MenuButton title={t("newPostMenu.searchBeer")} />
      <MenuButton title={t("newPostMenu.addToDatabase")} onPress={() => navigation.navigate("AddBeer")} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#f2f2f2",
  },
  title: {
    fontSize: 28,
    fontWeight: "700",
    marginBottom: 24,
    textAlign: "center",
  },
  menuButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 16,
    paddingHorizontal: 20,
    borderRadius: 8,
    backgroundColor: "#f1eded", // slightly gray
    marginBottom: 12,
  },
  menuText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#000",
  },
});
