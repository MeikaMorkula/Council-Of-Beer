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
import { getUserName } from "../utils/AsyncStorage";

export default function NewPost() {
  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [image, setImage] = useState<{
    uri: string;
    name: string;
    type: string;
  } | null>(null);
  const [rating, setRating] = useState<number>(0);
  const [review, setReview] = useState<string>("");
  const { t } = useTranslation();

  function resetForm() {
    setRating(3);
    setReview("");
    setImage(null);
  }

  function validateForm(): boolean {
    if (!rating || !image) {
      return false;
    } else return true;
  }
  

  const handleSubmit = async () => {
    setError("");
    setLoading(true);

    const user = await getUserName();
    
    if (validateForm()) {
      try {

        const NewPost= {
          username:user,
          
        }

        resetForm();
      } catch (err) {
        setError("Adding beer failed");
      } finally {
        setLoading(false);
      }
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

        {!!error && <Text style={styles.error}>{error}</Text>}

        <View style={styles.buttonRow}>
          <Pressable
            style={[styles.button, loading && styles.buttonDisabled]}
            onPress={handleSubmit}
            disabled={loading || validateForm()}
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
    backgroundColor: "#1D190E",
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
    backgroundColor: "#1D190E",
    borderRadius: 12,
    padding: 16,
  },
  title: {
    fontSize: 28,
    fontWeight: "700",
    marginBottom: 16,
    textAlign: "center",
    color: "#EDE9C7",
  },
  field: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#EDE9C7",
    borderRadius: 8,
    backgroundColor: "#28200C",
    paddingHorizontal: 12,
    paddingVertical: 10,
  },
  label: {
    marginBottom: 6,
    fontSize: 14,
    fontWeight: "600",
    color: "#EDE9C7",
  },
  input: {
    flex: 1,
    fontSize: 16,
    backgroundColor: "#28200C",
    color: "#EDE9C7",
  },
  button: {
    marginTop: 8,
    backgroundColor: "#E39914",
    borderRadius: 8,
    paddingVertical: 12,
    alignItems: "center",
    width: "37%",
  },
  buttonDisabled: {
    opacity: 0.7,
  },
  buttonText: {
    color: "#EDE9C7",
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
    backgroundColor: "#28200C",
  },
  reviewContainer: {
    borderWidth: 1,
    borderColor: "#EDE9C7",
    borderRadius: 8,
    backgroundColor: "#28200C",
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
