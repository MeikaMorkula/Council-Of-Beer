import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Pressable,
  ActivityIndicator,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import { Image } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { ScrollView } from "react-native";
import { useTranslation } from "react-i18next";
import CameraComponent from "../components/CameraComponent";
export default function AddBeer() {
  const [beerName, setBeerName] = useState<string>("");
  const [abv, setAbv] = useState<string>("");
  const [brewery, setBrewery] = useState<string>("");
  const [country, setCountry] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [image, setImage] = useState<string | null>(null);

  const handleImageSelected = (uri: string | null) => {
    setImage(uri);
  };

  const { t } = useTranslation();

  const handleSubmit = async () => {
    setError("");
    setLoading(true);

    try {
    } catch (err) {
      setError("Adding beer failed");
    } finally {
      setLoading(false);
    }
  };

  //internetin syövereistä, melkone mankeli

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.scrollContent}
      keyboardShouldPersistTaps="handled"
    >
      <View style={styles.BeerContent}>
        <Text style={styles.title}>{t("addBeer.title")}</Text>

        <CameraComponent image={image} onChange={setImage} />

        <Text style={styles.label}>{t("addBeer.name")}</Text>
        <View style={styles.field}>
          <TextInput
            style={styles.input}
            placeholder={t("addBeer.name")}
            value={beerName}
            onChangeText={setBeerName}
          />
          {
            <Pressable
              style={styles.clearButton}
              onPress={() => setBeerName("")}
            >
              <Ionicons name="close-circle" size={27} color="#888" />
            </Pressable>
          }
        </View>
        <Text style={styles.label}>ABV</Text>
        <View style={styles.field}>
          <TextInput
            style={styles.input}
            placeholder="ABV (0.0%)"
            value={abv}
            onChangeText={setAbv}
            keyboardType="decimal-pad"
          />
          {
            <Pressable style={styles.clearButton} onPress={() => setAbv("")}>
              <Ionicons name="close-circle" size={27} color="#888" />
            </Pressable>
          }
        </View>
        <Text style={styles.label}>{t("addBeer.brewery")}</Text>
        <View style={styles.field}>
          <TextInput
            style={styles.input}
            placeholder={t("addBeer.brewery")}
            value={brewery}
            onChangeText={setBrewery}
          />
          {
            <Pressable
              style={styles.clearButton}
              onPress={() => setBrewery("")}
            >
              <Ionicons name="close-circle" size={27} color="#888" />
            </Pressable>
          }
        </View>
        <Text style={styles.label}>{t("addBeer.country")}</Text>
        <View style={styles.field}>
          <TextInput
            style={styles.input}
            placeholder={t("addBeer.country")}
            value={country}
            onChangeText={setCountry}
          />
          <Pressable style={styles.clearButton} onPress={() => setCountry("")}>
            <Ionicons name="close-circle" size={27} color="#888" />
          </Pressable>
        </View>

        {!!error && <Text style={styles.error}>{error}</Text>}

        <View style={styles.buttonRow}>
          <Pressable
            style={[styles.button, loading && styles.buttonDisabled]}
            onPress={handleSubmit}
            disabled={loading}
          >
            {loading ? (
              <ActivityIndicator color="#fff" />
            ) : (
              <Text style={styles.buttonText}>{t("addBeer.addtodb")}</Text>
            )}
          </Pressable>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#888",
  },
  scrollContent: {
    flexGrow: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 16,
  },
  BeerContent: {
    width: "105%",
    maxWidth: 360,
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 16,
  },
  title: {
    fontSize: 28,
    fontWeight: "700",
    marginBottom: 16,
    textAlign: "center",
  },
  field: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    backgroundColor: "#fff",
    paddingHorizontal: 12,
    paddingVertical: 10,
  },
  label: {
    marginBottom: 6,
    fontSize: 14,
    fontWeight: "600",
  },
  input: {
    flex: 1,
    fontSize: 16,
  },
  button: {
    marginTop: 8,
    backgroundColor: "#6750a4",
    borderRadius: 8,
    paddingVertical: 12,
    alignItems: "center",
    width: "37%",
  },
  buttonDisabled: {
    opacity: 0.7,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "700",
  },
  error: {
    color: "#d00",
    marginTop: 4,
    marginBottom: 6,
  },
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

  imagePlaceholder: {
    color: "#888",
    marginBottom: 10,
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
    justifyContent: "center",
  },

  smallButtonText: {
    color: "#fff",
    fontWeight: "600",
  },

  buttonRow: {
    marginTop: 12,
    flexDirection: "row",
    justifyContent: "flex-end",
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
  clearButton: {
    marginLeft: 8,
  },
});
