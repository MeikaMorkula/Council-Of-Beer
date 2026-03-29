import React, { useState } from "react";
import { View, Text, Pressable, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
// import { useTranslation } from "react-i18next";

type Props = {
  options: string[];
  selected: string[];
  onChange: (values: string[]) => void;
  label?: string;
  buttonText?: string;
  buttonTextWithCount?: (count: number) => string;
};

export default function LabelSelector({
  options,
  selected,
  onChange,
  label,
  buttonTextWithCount,
  buttonText,
}: Props) {
  const [open, setOpen] = useState(false);
  //   const { t } = useTranslation();

  const toggleLabel = (value: string) => {
    if (selected.includes(value)) {
      onChange(selected.filter((v) => v !== value));
    } else {
      onChange([...selected, value]);
    }
  };

  return (
    <View>
      <Text style={styles.label}>{label}</Text>

      <Pressable style={styles.button} onPress={() => setOpen(!open)}>
        <View style={styles.buttonContent}>
          <Text style={styles.buttonText}>
            {selected.length > 0
              ? buttonTextWithCount?.(selected.length)
              : buttonText}
          </Text>

          <Ionicons
            name={open ? "chevron-up" : "chevron-down"}
            size={18}
            color="#fff"
          />
        </View>
      </Pressable>
      {open && (
        <View style={styles.dropdown}>
          {options.map((option) => {
            const isSelected = selected.includes(option);

            return (
              <Pressable
                key={option}
                style={[styles.item, isSelected && styles.itemSelected]}
                onPress={() => toggleLabel(option)}
              >
                <Text
                  style={[styles.itemText, isSelected && { color: "#fff" }]}
                >
                  {option}
                </Text>
              </Pressable>
            );
          })}
        </View>
      )}
      <View style={styles.tagsContainer}>
        {selected.map((item) => (
          <View key={item} style={styles.tag}>
            <Text style={styles.tagText}>{item}</Text>

            <Pressable onPress={() => toggleLabel(item)}>
              <Ionicons name="close" size={14} color="#fff" />
            </Pressable>
          </View>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  label: {
    marginBottom: 6,
    fontSize: 14,
    fontWeight: "600",
  },

  button: {
    backgroundColor: "#6750a4",
    padding: 10,
    borderRadius: 8,
    alignItems: "center",
    marginBottom: 8,
  },

  buttonText: {
    color: "#fff",
    fontWeight: "600",
  },

  dropdown: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 8,
    marginBottom: 10,
    backgroundColor: "#fff",
  },

  item: {
    padding: 10,
    borderRadius: 6,
    marginBottom: 6,
  },

  itemSelected: {
    backgroundColor: "#6750a4",
  },

  itemText: {
    fontSize: 14,
  },

  tagsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 6,
  },

  tag: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#6750a4",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    gap: 4,
  },

  tagText: {
    color: "#fff",
    fontSize: 12,
  },
  buttonContent: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%",
  },
});
