import React from "react";
import { View, Pressable, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";

type Props = {
  rating: number;
  onChange: (value: number) => void;
  size?: number;
};


//helepompi tehä omana komponenttinaan
export default function StarRating({
  rating,
  onChange,
  size = 32,
}: Props) {
  return (
    <View style={styles.container}>
      {[1, 2, 3, 4, 5].map((star) => (
        <Pressable key={star} onPress={() => onChange(star)}>
          <Ionicons
            name={star <= rating ? "star" : "star-outline"}
            size={size}
            color="#FFD700"
          />
        </Pressable>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    gap: 6,
  },
});