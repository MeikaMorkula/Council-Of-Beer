import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { PieChart } from "react-native-gifted-charts";
import { useTranslation } from "react-i18next";

export default function KaliaPieChart() {
  const { t } = useTranslation();

  const data = [
    { value: 20, color: "#070a07", text: "Stout" },
  { value: 18, color: "#b1b62a", text: "Lager" },
  { value: 15, color: "#f3b241", text: "IPA" },
  { value: 10, color: "#d98510", text: "Bock" },
  { value: 9, color: "#e6a133", text: "Wheat" },
  { value: 8, color: "#c4622d", text: "Amber Ale" },
  { value: 7, color: "#8b5a2b", text: "Brown Ale" },
  { value: 5, color: "#e6c200", text: "Pilsner" },
  { value: 4, color: "#b5651d", text: "Porter" },
  { value: 4, color: "#ffcc66", text: "Dunkel" },
  ];

  return (
    <View style={styles.container}>
      <Text style={styles.label}>{t("statistics.piechart.label")}</Text>

      <PieChart
        data={data}
        donut
        showText
        radius={90}
        textColor="#222222" 
        textSize={9}
        focusOnPress
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    marginVertical: 20,
  },
  label: {
    fontSize: 18,
    marginBottom: 10,
    color: "#EDE9C7",
  },
});
