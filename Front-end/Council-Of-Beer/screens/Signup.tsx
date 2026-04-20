import React, { useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
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
import { useTranslation } from "react-i18next";
import { signup } from "../services/SignupService";

const formatBirthdayInput = (value: string, previousValue: string) => {
  const digits = value.replace(/\D/g, "").slice(0, 8);
  const isDeleting = value.length < previousValue.length;

  if (digits.length < 2) {
    return digits;
  }

  if (digits.length === 2) {
    return isDeleting ? digits : `${digits}-`;
  }

  if (digits.length < 4) {
    return `${digits.slice(0, 2)}-${digits.slice(2)}`;
  }

  if (digits.length === 4) {
    return isDeleting
      ? `${digits.slice(0, 2)}-${digits.slice(2)}`
      : `${digits.slice(0, 2)}-${digits.slice(2)}-`;
  }

  return `${digits.slice(0, 2)}-${digits.slice(2, 4)}-${digits.slice(4)}`;
};

const isValidDateInput = (value: string) => {
  if (!/^\d{2}-\d{2}-\d{4}$/.test(value)) {
    return false;
  }

  const [dayText, monthText, yearText] = value.split("-");
  const day = Number(dayText);
  const month = Number(monthText);
  const year = Number(yearText);

  const parsedDate = new Date(Date.UTC(year, month - 1, day));

  return (
    parsedDate.getUTCFullYear() === year &&
    parsedDate.getUTCMonth() === month - 1 &&
    parsedDate.getUTCDate() === day
  );
};

const toApiBirthday = (value: string) => {
  const [day, month, year] = value.split("-");
  return `${year}-${month}-${day}`;
};

export default function SignUp() {
  const navigation = useNavigation();

  const [username, setUsername] = useState("");
  const [birthday, setBirthday] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const { t } = useTranslation();

  const handleSubmit = async () => {
    setError("");
    setLoading(true);

    try {
      if (!isValidDateInput(birthday.trim())) {
        setError(t("signup.errors.invalidBirthday"));
        return;
      }

      await signup({
        username: username.trim(),
        password,
        birthday: toApiBirthday(birthday.trim()),
      });

      navigation.navigate("HomeFeed" as never);
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError(t("signup.errors.signupFailed"));
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

  const [flexToggle, setFlexToggle] = useState(false);

  return (
    <KeyboardAvoidingView
      style={
        flexToggle
        ? [{ flexGrow: 1}, styles.container]
        : [{ flex: 1 }, styles.container]
      }
      enabled={!flexToggle}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardVerticalOffset={Platform.OS === "ios" ? 64 : 0}
    >
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.loginContent}>
          <Text style={styles.title}>{t("signup.title")}</Text>

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

          <View style={styles.field}>
            <Text style={styles.label}>{t("signup.fields.birthday")}</Text>
            <TextInput
              placeholder={t("signup.fields.placeholders.birthday")}
              placeholderTextColor={"#dfdbb970"}
              value={birthday}
              onChangeText={(value) =>
                setBirthday((previousValue) =>
                  formatBirthdayInput(value, previousValue)
                )
              }
              style={styles.input}
              autoCapitalize="none"
              keyboardType="number-pad"
              maxLength={10}
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
    padding: 16,
    justifyContent: "center",
  },
  loginContent: {
    width: "100%",
    maxWidth: 360,
    borderRadius: 12,
    padding: 16,
    backgroundColor: "#1D190E",
    alignItems: "center",
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
