import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { useTranslation } from "react-i18next";
import { PieChart } from "react-native-gifted-charts";

export default function AvgDonut() {
  const { t } = useTranslation();
  const averageRating = 3.8;

  const kaliaData = [
    {
      value: averageRating,
      color: "#f59e0b",
    },
    {
      value: 5 - averageRating,
      color: "#f3f4f6",
    },
  ];

  return (
    <View  style={styles.container}>
      <Text style={styles.label}>{t("statistics.avg.label")}</Text>

      <PieChart
        data={kaliaData}
        donut
        radius={80}
        innerRadius={60}
        centerLabelComponent={() => (
          <Text style={styles.rating}>{averageRating.toFixed(1)}</Text>
        )}
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
  rating: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#92400e",
  },
});
