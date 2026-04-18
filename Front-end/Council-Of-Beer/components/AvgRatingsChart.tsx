import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { useTranslation } from "react-i18next";
import { BarChart } from "react-native-gifted-charts";

export default function AvgRatingChart() {
  const { t } = useTranslation();
  const ratingCounts = [12, 26, 58, 64, 44];
  const colors = ["#ff4d4f", "#ff9f43", "#fadb14", "#52c41a", "#1890ff"];

  const barData = ratingCounts.map((count, index) => ({
    value: count,
    label: `${index + 1}★`,
    frontColor: colors[index],
  }));

  return (
    <View style={styles.container}>
      <Text style={styles.label}>{t("statistics.ratings.label")}</Text>
      <BarChart
        data={barData}
        barWidth={30}
        spacing={20}
        roundedTop
        yAxisThickness={1}
        yAxisTextStyle={{
          color: "#EDE9C7",
          fontSize: 14,
          fontWeight: "600",
        }}
        xAxisThickness={1}
        xAxisLabelTextStyle={{
          color: "#EDE9C7",
          fontSize: 16,
          fontWeight: "600",
        }}
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
