import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  KeyboardAvoidingView,
  Keyboard,
  Platform,
  ScrollView,
  View,
  TextInput,
  Pressable,
  ActivityIndicator,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useTranslation } from "react-i18next";
import CameraComponent from "../components/CameraComponent";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { addBeer } from "../services/AddBeerService";
import LabelSelector from "../components/LabelSelector";
import { checkHealth } from "../services/HealthService";

type AddBeerNavigationProp = NativeStackNavigationProp<
  { BarcodeScanner: { onScan: (code: string) => void } },
  "BarcodeScanner"
>;

export default function AddBeer() {
  const [beerName, setBeerName] = useState<string>("");
  const [abv, setAbv] = useState<string>("");
  const [brewery, setBrewery] = useState<string>("");
  const [country, setCountry] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [image, setImage] = useState<{
    uri: string;
    name: string;
    type: string;
  } | null>(null);
  const [barcode, setBarcode] = useState<string>("");
  const [labels, setLabels] = useState<string[]>([]);

  const navigation = useNavigation<AddBeerNavigationProp>();
  const { t } = useTranslation();

  const resetForm = () => {
    setBeerName("");
    setAbv("");
    setBrewery("");
    setCountry("");
    setBarcode("");
    setImage(null);
    setLabels([]);
  };

  function validateFom(): boolean {
    if (!beerName || !abv || !brewery || !country || !image) {
      return false;
    } else return true;
  }

  const handleSubmit = async () => {
    setError("");
    setLoading(true);

    try {
      const isHealthy = await checkHealth();

      if (!isHealthy) {
        throw new Error("SERVER_UNAVAILABLE");
      }

      //make sure that the abv is a numbre
      const parsedABV = parseFloat(abv);
      if (isNaN(parsedABV)) {
        throw new Error(t("addBeer.errors.invalidAbv"));
      }

      const callContent = {
        Name: beerName,
        AlcPrecentage: parsedABV,
        Brewery: brewery,
        Country: country,
        Labels: labels,
        Barcode: barcode,
        Image: image,
      };

      await addBeer(callContent);

      resetForm();
    } catch (err: any) {
      if (err.message === "SERVER_UNAVAILABLE") {
        setError(t("addBeer.errors.serverUnavailable"));
      } else {
        console.log(err);
        setError(err);
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const keyboardShowListener = Keyboard.addListener("keyboardDidShow", () => {
      setFlexToggle(false);
    });

    const keyboardHideListener = Keyboard.addListener("keyboardDidHide", () => {
      setFlexToggle(true);
    });
    return () => {
      keyboardShowListener.remove()
      keyboardHideListener.remove()
    };
  }, []);

  const [flexToggle, setFlexToggle] = useState(false)

  return (
    <KeyboardAvoidingView
      style={
        flexToggle
        ? [{ flexGrow: 1}, styles.container]
        : [{ flex: 1}, styles.container]
      }
      enabled={!flexToggle}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardVerticalOffset={Platform.OS === "ios" ? 128 : 0}
    >
    <ScrollView
      contentContainerStyle={styles.scrollContent}
      keyboardShouldPersistTaps="handled"
      showsVerticalScrollIndicator={false}
    >
      <View style={styles.BeerContent}>
        <Text style={styles.title}>{t("addBeer.title")}</Text>

        <CameraComponent image={image} onChange={setImage} />

        <Text style={styles.label}>{t("addBeer.name")}</Text>
        <View style={styles.field}>
          <TextInput
            style={styles.input}
            placeholder={t("addBeer.name")}
            placeholderTextColor={"#EDE9C7"}
            value={beerName}
            onChangeText={setBeerName}
          />
          {
            <Pressable
              style={styles.clearButton}
              onPress={() => setBeerName("")}
            >
              <Ionicons name="close-circle" size={27} color="#EDE9C7" />
            </Pressable>
          }
        </View>
        <Text style={styles.label}>ABV</Text>
        <View style={styles.field}>
          <TextInput
            style={styles.input}
            placeholder="ABV (0.0%)"
            placeholderTextColor={"#EDE9C7"}
            value={abv}
            onChangeText={setAbv}
            keyboardType="decimal-pad"
          />
          {
            <Pressable style={styles.clearButton} onPress={() => setAbv("")}>
              <Ionicons name="close-circle" size={27} color="#EDE9C7" />
            </Pressable>
          }
        </View>
        <Text style={styles.label}>{t("addBeer.brewery")}</Text>
        <View style={styles.field}>
          <TextInput
            style={styles.input}
            placeholder={t("addBeer.brewery")}
            placeholderTextColor={"#EDE9C7"}
            value={brewery}
            onChangeText={setBrewery}
          />
          {
            <Pressable
              style={styles.clearButton}
              onPress={() => setBrewery("")}
            >
              <Ionicons name="close-circle" size={27} color="#EDE9C7" />
            </Pressable>
          }
        </View>
        <Text style={styles.label}>{t("addBeer.country")}</Text>
        <View style={styles.field}>
          <TextInput
            style={styles.input}
            placeholder={t("addBeer.country")}
            placeholderTextColor={"#EDE9C7"}
            value={country}
            onChangeText={setCountry}
          />
          <Pressable style={styles.clearButton} onPress={() => setCountry("")}>
            <Ionicons name="close-circle" size={27} color="#EDE9C7" />
          </Pressable>
        </View>
        <View>
          {/* järkevää laittaa tuo valinta tännekin */}
          <LabelSelector
            label={t("addBeer.labels")}
            options={[
              "Kalia",
              "Stout",
              "Lager",
              "Sour",
              "Hedelmäinen",
              "Jäykkä",
              "Juustoinen",
              "Pirskahteleva",
            ]}
            selected={labels}
            onChange={setLabels}
            buttonText={t("addBeer.selectLabels")}
            buttonTextWithCount={(count) => `${count} selected`}
          />
        </View>

        <Text style={styles.label}>{t("addBeer.barcode")}</Text>
        <View style={styles.field}>
          <TextInput
            style={styles.input}
            placeholder={t("addBeer.barcodePlaceholder")}
            value={barcode}
            editable={false}
          />

          <Pressable
            onPress={() =>
              navigation.navigate("BarcodeScanner", {
                onScan: (code: string) => setBarcode(code),
              })
            }
          >
            <Ionicons name="barcode-outline" size={26} color="#6750a4" />
          </Pressable>
        </View>

        {!!error && <Text style={styles.error}>{error}</Text>}

        <View style={styles.buttonRow}>
          <Pressable
            style={[styles.button, loading && styles.buttonDisabled]}
            onPress={handleSubmit}
            disabled={loading || !validateFom()}
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
    </KeyboardAvoidingView>
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
    paddingHorizontal: 12,
    paddingVertical: 10,
    backgroundColor: "#28200C",
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
});
