import React, { useState } from "react";
import { View, Pressable, Text, Image, StyleSheet } from "react-native";
import * as ImagePicker from "expo-image-picker";
import { Ionicons } from "@expo/vector-icons";
import { useTranslation } from "react-i18next";

type Props = {
  image: string | null;
  onChange: (uri: string | null) => void;
};

export default function CameraComponent({ image, onChange }: Props) {
  const [error, setError] = useState<string>("");
  const { t } = useTranslation();

  //internetin syövereistä, melkone mankeli
  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images, //deprecated piece of s**t but works
      quality: 0.7,
    });

    if (!result.canceled) {
      onChange(result.assets[0].uri);
    }
  };

  const takePhoto = async () => {
    const permission = await ImagePicker.requestCameraPermissionsAsync();

    if (!permission.granted) {
      setError("Camera permission required");
      return;
    }

    const result = await ImagePicker.launchCameraAsync({
      quality: 0.7,
    });

    if (!result.canceled) {
      onChange(result.assets[0].uri);
    }
  };

  return (
    <View style={styles.imageBox}>
      {image ? (
        <>
          <Image source={{ uri: image }} style={styles.imagePreview} />
          <Pressable style={styles.removeButton} onPress={() => onChange(null)}>
            <Text style={styles.removeButtonText}>
              {t("addBeer.camera.removephoto")}
            </Text>
          </Pressable>
        </>
      ) : (
        <Ionicons name="add-circle-outline" size={64} color="#000" />
      )}

      <View style={styles.imageButtons}>
        <Pressable style={styles.smallButton} onPress={takePhoto}>
          <Text style={styles.smallButtonText}>
            {" "}
            {t("addBeer.camera.usecamera")}
          </Text>
        </Pressable>

        <Pressable style={styles.smallButton} onPress={pickImage}>
          <Text style={styles.smallButtonText}>
            {" "}
            {t("addBeer.camera.choosefile")}
          </Text>
        </Pressable>
      </View>

      {!!error && <Text style={{ color: "red" }}>{error}</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  imageBox: {
    width: "100%",
    height: 300,
    borderWidth: 2,
    borderColor: "#ccc",
    borderRadius: 10,
    marginBottom: 16,
    alignItems: "center",
    justifyContent: "center",
    overflow: "hidden",
  },
  imagePreview: {
    width: "100%",
    height: "100%",
    position: "absolute",
  },
  imageButtons: {
    flexDirection: "column",
    gap: 10,
    width: "50%",
  },
  smallButton: {
    backgroundColor: "#6750a4",
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 6,
    alignItems: "center",
  },
  smallButtonText: {
    color: "#fff",
    fontWeight: "600",
  },
  removeButton: {
    position: "absolute",
    bottom: 10,
    right: 10,
    backgroundColor: "rgba(0,0,0,0.6)",
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 6,
  },
  removeButtonText: {
    color: "#fff",
    fontSize: 12,
    fontWeight: "600",
  },
});
