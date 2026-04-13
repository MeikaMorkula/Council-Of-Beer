import Checkbox from "expo-checkbox";
import React, { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Pressable,
  ActivityIndicator,
} from "react-native";
import { useTranslation } from "react-i18next";

export default function SignUp() {
  const navigation = useNavigation();

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [TSIsChecked, setTSIsChecked] = useState(false);

  const { t } = useTranslation();

  const handleSubmit = async () => {
    setError("");
    setLoading(true);

    try {
    } catch (err) {
      setError(t("signup.errors.signupFailed"));
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.loginContent}>
        <Text style={styles.title}>{t("signup.title")}</Text>

        <View style={styles.field}>
          <Text style={styles.label}>{t("signup.fields.email")}</Text>
          <TextInput
            placeholder="example@example.com"
            placeholderTextColor={"#dfdbb970"}
            value={email}
            onChangeText={setEmail}
            style={styles.input}
            autoCapitalize="none"
            keyboardType="email-address"
          />
        </View>

        <View style={styles.field}>
          <Text style={styles.label}>{t("signup.fields.username")}</Text>
          <TextInput
            placeholder={t("signup.fields.placeholders.username")}
            placeholderTextColor={"#dfdbb970"}
            value={username}
            onChangeText={setUsername}
            style={styles.input}
            autoCapitalize="none"
          />
        </View>

        <View style={styles.field}>
          <Text style={styles.label}>{t("signup.fields.password")}</Text>
          <TextInput
            placeholder={t("signup.fields.placeholders.password")}
            placeholderTextColor={"#dfdbb970"}
            value={password}
            onChangeText={setPassword}
            style={styles.input}
            secureTextEntry
          />
        </View>

        {!!error && <Text style={styles.error}>{error}</Text>}

        <Pressable
          style={[styles.button, loading && styles.buttonDisabled]}
          onPress={handleSubmit}
          disabled={loading}
        >
          {loading ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text style={styles.buttonText}>{t("signup.btns.signup")}</Text>
          )}
        </Pressable>

        <Pressable
          onPress={() => navigation.navigate("LogIn" as never)}
          style={styles.LoginLink}
        >
          <Text style={styles.LoginLinkText}>{t("signup.loginlink")}</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#1D190E",
    alignItems: "center",
    padding: 16,
  },
  loginContent: {
    width: "100%",
    maxWidth: 360,
    borderRadius: 12,
    padding: 16,
    backgroundColor: "#1D190E",
    alignItems: "center",
    paddingTop: 125,
  },
  title: {
    fontSize: 40,
    fontWeight: "700",
    marginBottom: 75,
    textAlign: "center",
    color: "#EDE9C7",
    fontFamily: "GermaniaOne400_Regular",
  },
  field: {
    marginBottom: 12,
  },
  label: {
    marginBottom: 6,
    fontSize: 14,
    fontWeight: "600",
    color: "#EDE9C7",
  },
  input: {
    borderWidth: 1,
    borderColor: "#EDE9C7",
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    backgroundColor: "#28200C",
    color: "#EDE9C7",
    width: 300,
  },
  tsCheckbox: {
    flexDirection: "row",
  },
  button: {
    marginTop: 8,
    backgroundColor: "#E39914",
    borderRadius: 8,
    paddingVertical: 12,
    alignItems: "center",
    width: 72,
  },
  buttonDisabled: {
    opacity: 0.7,
  },
  buttonText: {
    color: "#EDE9C7",
    fontWeight: "700",
  },
  LoginLink: {
    marginTop: 16,
  },
  LoginLinkText: {
    color: "#EFC06D",
    fontWeight: "600",
    textAlign: "center",
  },
  error: {
    color: "#d00",
    marginTop: 4,
    marginBottom: 6,
  },
});
