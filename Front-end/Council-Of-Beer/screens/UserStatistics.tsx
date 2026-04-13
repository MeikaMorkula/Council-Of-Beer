import React, { useState } from "react";
import { StyleSheet, Text, View, Image, ScrollView } from "react-native";
import { useTranslation } from "react-i18next";

export default function UserStatistics() {
  const { t } = useTranslation();
  return (
    <View style={styles.statisticsCont}>
      <Text style={styles.statisticsTitle}>{t("statistics.title")}</Text>
      <ScrollView>
        <View style={styles.statisticsView}>
          <View style={styles.singleStatistic}>
            <Text style={styles.statisticsTxt}>Statistic 1</Text>
            <Image
              style={styles.statistic}
              source={require("../assets/placeholdergraph.png")}
            />
          </View>
          <View style={styles.singleStatistic}>
            <Text style={styles.statisticsTxt}>Statistic 2</Text>
            <Image
              style={styles.statistic}
              source={require("../assets/placeholdergraph.png")}
            />
          </View>
          <View style={styles.singleStatistic}>
            <Text style={styles.statisticsTxt}>Statistic 3</Text>
            <Image
              style={styles.statistic}
              source={require("../assets/placeholdergraph.png")}
            />
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  statisticsCont: {
    flex: 1,
    backgroundColor: "#1D190E",
  },
  statisticsTitle: {
    color: "#EDE9C7",
    fontSize: 32,
    fontFamily: "GermaniaOne400_Regular",
    padding: 20,
    textAlign: "center",
  },
  statisticsView: {
    padding: 10,
  },
  singleStatistic: {
    paddingTop: 10,
  },
  statisticsTxt: {
    color: "#EDE9C7",
    fontSize: 18,
  },
  statistic: {
    width: "100%",
    height: 275,
    borderWidth: 0.5,
    borderColor: "#EDE9C7",
    borderRadius: 8,
  },
});
