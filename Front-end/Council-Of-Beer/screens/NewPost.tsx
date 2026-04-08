import React from "react";
import { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Pressable,
  ActivityIndicator,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { ScrollView } from "react-native";
import { useTranslation } from "react-i18next";
import CameraComponent from "../components/CameraComponent";
import StarRating from "../components/StarRating";
import LabelSelector from "../components/LabelSelector";

export default function NewPost() {
  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [image, setImage] = useState<string | null>(null);
  const [rating, setRating] = useState<number>(0);
  const [review, setReview] = useState<string>("");
  const [labels, setLabels] = useState<string[]>([]);
  const { t } = useTranslation();

  //väliaikanen setti kunnes bäkkäri toimii
  const tempLabels = [
    "Kalia",
    "Stout",
    "Lager",
    "Sour",
    "Hedelmäinen",
    "Jäykkä",
    "Juustoinen",
    "Pirskahteleva",
  ];

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

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.scrollContent}
      keyboardShouldPersistTaps="handled"
    >
      <View style={styles.BeerContent}>
        <Text style={styles.title}>{t("addBeer.title")}</Text>
        <CameraComponent image={image} onChange={setImage} />

        <Text style={styles.title}>{t("newPost.reviewTitle")}</Text>

        <Text style={styles.label}>{t("newPost.rating")}</Text>
        <StarRating rating={rating} onChange={setRating} />

        <Text style={styles.label}>{t("newPost.review")}</Text>

        <View style={styles.reviewContainer}>
          <TextInput
            style={styles.reviewInput}
            placeholder={t("newPost.reviewPlaceholder")}
            value={review}
            onChangeText={setReview}
            multiline
            numberOfLines={4}
            textAlignVertical="top"
            maxLength={1000} //tietokannassa on tuhannen merkin raja
          />

          

          <View style={styles.reviewFooter}>
            <Text style={{ alignSelf: "flex-end", color: "#888" }}>
              {review.length}/1000
            </Text>

            {review.length > 0 && (
              <Pressable onPress={() => setReview("")}>
                <Ionicons name="close-circle" size={27} color="#888" />
              </Pressable>
            )}
          </View>
        </View>
        <LabelSelector
            options={tempLabels}
            selected={labels}
            onChange={setLabels}
            label={t("addBeer.labels.title")}
            buttonText={t("addBeer.labels.select")}
            buttonTextWithCount={(count) =>
              t("addBeer.labels.selectedCount", { count })
            }
          />

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
              <Text style={styles.buttonText}>{t("newPost.publish")}</Text>
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
  buttonRow: {
    marginTop: 12,
    flexDirection: "row",
    justifyContent: "flex-end",
  },
  clearButton: {
    marginLeft: 8,
  },
  reviewContainer: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    backgroundColor: "#fff",
    paddingHorizontal: 12,
    paddingVertical: 10,
    marginBottom: 10,
  },

  reviewInput: {
    fontSize: 16,
    minHeight: 100,
  },
  reviewFooter: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 6,
  },
});
