import { LineChart } from "react-native-gifted-charts";
import { useTranslation } from "react-i18next";
import React from "react";
import { View, Text, StyleSheet } from "react-native";

export default function BeersInAWeekChart() {
  const { t } = useTranslation();

  const beersLastWeek = [
    { value: 4, label: t("statistics.weekdayshort.mon") },
    { value: 3, label: t("statistics.weekdayshort.tue") },
    { value: 3, label: t("statistics.weekdayshort.wed") },
    { value: 6, label: t("statistics.weekdayshort.thu") },
    { value: 11, label: t("statistics.weekdayshort.fri") },
    { value: 6, label: t("statistics.weekdayshort.sat") },
    { value: 2, label: t("statistics.weekdayshort.sun") },
  ];

  return (
    <View>
      <Text style={styles.label}>{t("statistics.beersinaweek.label")}</Text>
      <LineChart
        data={beersLastWeek}
        areaChart
        curved
        thickness={3}
        color="#d97706" //jokseenkin kalian väriset
        startFillColor="#f59e0b"
        endFillColor="#78350f"
        startOpacity={0.4}
        endOpacity={0.08}
        dataPointsColor="#b45309"
        xAxisLabelTextStyle={{ color: "#6b7280", fontSize: 11 }}
        yAxisTextStyle={{ color: "#9ca3af", fontSize: 10 }}
        noOfSections={4}
        maxValue={12}
        hideDataPoints={false}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginVertical: 20,
    paddingHorizontal: 16,
  },
  label: {
    fontSize: 18,
    marginBottom: 10,
    color: "#EDE9C7",
  },
  rating: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
    color: "#EDE9C7",
  },
});
