import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image,
  TextInput,
  ScrollView,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useTranslation } from "react-i18next";
import {
  ChangeUserName,
  ChangePassWord,
} from "../services/UserSettingsService";
import { getUserName } from "../utils/AsyncStorage";
import { useNavigation } from '@react-navigation/native';

export default function UserSettings() {
  const [username, setUsername] = useState("");
  const [newUsername, setNewUsername] = useState("");
  const [currentPswd, setCurrentPswd] = useState("");
  const [newPswd, setNewPswd] = useState("");
  const [newPswdAgain, setNewPswdAgain] = useState("");
  const [error, setError] = useState<string>("");
  const navigation = useNavigation<any>();

  const { t } = useTranslation();

  const displayUserName = async () => {
    const curUserName = await getUserName().toString();
    return curUserName;
  };
  const handleUsernameSubmit = async () => {
    const curUserName = await getUserName().toString();
    if (
      newUsername != "" &&
      newUsername != null &&
      newUsername != curUserName
    ) {
      try {
        await ChangeUserName({
          newUser: newUsername.trim(),
          oldUser: curUserName,
        });
      } catch (err: any) {
        setError(err.message || "An unexpected error occurred");
      }
    } else {
      setError("missing fields");
    }
  };

  useEffect(() => {
    const loadUsername = async () => {
      const data = await getUserName();
      if (data) {
        setUsername(typeof data === "object" ? data.username : data.toString());
      }
    };
    loadUsername();
  }, []);

  const handlePassWordchange = async () => {
    const curUserName = await getUserName();

    if (
      newPswd === newPswdAgain &&
      newPswd != currentPswd &&
      newPswd.length >= 8
    ) {
      try {
        await ChangePassWord({
          newPass: newPswd ?? "",
          oldPass: currentPswd ?? "",
          username: curUserName ?? "",
        });
      } catch (err: any) {
        setError(err.message || "An unexpected error occurred");
      }
    } else {
      setError("missing fields");
    }
  };

  return (
    <View style={styles.container}>
       <TouchableOpacity onPress={() => navigation.pop()} style={{position: 'absolute', top: 8}} >
        <Ionicons name="chevron-back" size={32} color="#EDE9C7" />
      </TouchableOpacity>
      <ScrollView>
        <View style={styles.changePfCont}>
          <Image style={styles.downloadPfPic} />
          <View style={styles.downloadPfCont}>
            <Text style={[{ fontSize: 18, color: "#EDE9C7" }]}>
              {t("usersettings.titles.changepfp")}
            </Text>
            <TouchableOpacity style={styles.downloadPfBtn}>
              <Ionicons name="download-outline" size={24} color="#E06F24" />
              <Text style={styles.downloadBtnTxt}>
                {t("usersettings.btn.download")}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.changeUsrCont}>
          <Text style={{ fontSize: 18, color: "#EDE9C7" }}>
            {t("usersettings.titles.changeusername")}
          </Text>
          <TextInput
            style={styles.usrNameField}
            editable={false}
            placeholder={username}
            placeholderTextColor={"#EDE9C7"}
          />
          <View style={styles.changeUsrFieldCont}>
            <TextInput
              style={[styles.usrNameField, { width: "95%" }]}
              placeholder={t("usersettings.placeholders.enterusername")}
              placeholderTextColor={"#EDE9C7"}
              value={newUsername}
              onChangeText={setNewUsername}
            />
            <TouchableOpacity onPress={() => setNewUsername("")}>
              <Ionicons
                style={styles.changeUsrIcon}
                name="close-circle-outline"
                size={24}
                color="#EDE9C7"
              />
            </TouchableOpacity>
          </View>
          <TouchableOpacity
            style={styles.changeUsrBtn}
            onPress={handleUsernameSubmit}
          >
            <Text style={{ fontSize: 16, color: "#E06F24" }}>
              {t("usersettings.btn.changeusername")}
            </Text>
          </TouchableOpacity>
        </View>
        <View style={styles.changePswdCont}>
          <Text style={[{ fontSize: 18, color: "#EDE9C7" }]}>
            {t("usersettings.titles.changepassword")}
          </Text>
          <View style={styles.changeUsrFieldCont}>
            <TextInput
              style={[styles.usrNameField, { width: "95%" }]}
              placeholder={t("usersettings.placeholders.entercurrentpassword")}
              secureTextEntry={true}
              placeholderTextColor={"#EDE9C7"}
              value={currentPswd}
              onChangeText={setCurrentPswd}
            />
            <TouchableOpacity onPress={() => setCurrentPswd("")}>
              <Ionicons
                style={styles.changeUsrIcon}
                name="close-circle-outline"
                size={24}
                color="#EDE9C7"
              />
            </TouchableOpacity>
          </View>
          <View style={styles.changeUsrFieldCont}>
            <TextInput
              style={[styles.usrNameField, { width: "95%" }]}
              placeholder={t("usersettings.placeholders.enternewpassword")}
              secureTextEntry={true}
              placeholderTextColor={"#EDE9C7"}
              value={newPswd}
              onChangeText={setNewPswd}
            />
            <TouchableOpacity onPress={() => setNewPswd("")}>
              <Ionicons
                style={styles.changeUsrIcon}
                name="close-circle-outline"
                size={24}
                color="#EDE9C7"
              />
            </TouchableOpacity>
          </View>
          <View style={styles.changeUsrFieldCont}>
            <TextInput
              style={[styles.usrNameField, { width: "95%" }]}
              placeholder={t("usersettings.placeholders.enternewpasswordagain")}
              secureTextEntry={true}
              placeholderTextColor={"#EDE9C7"}
              value={newPswdAgain}
              onChangeText={setNewPswdAgain}
            />
            <TouchableOpacity onPress={() => setNewPswdAgain("")}>
              <Ionicons
                style={styles.changeUsrIcon}
                name="close-circle-outline"
                size={24}
                color="#EDE9C7"
              />
            </TouchableOpacity>
          </View>
          <TouchableOpacity
            style={styles.changeUsrBtn}
            onPress={handlePassWordchange}
          >
            <Text style={{ fontSize: 16, color: "#E06F24" }}>
              {t("usersettings.btn.changepassword")}
            </Text>
          </TouchableOpacity>
        </View>
        {!!error && <Text style={styles.error}>{error}</Text>}

        <TouchableOpacity style={styles.deleteAccBtn}>
          <Text style={{ fontSize: 16, color: "#e02424", fontWeight: "bold" }}>
            {t("usersettings.btn.deleteaccount")}
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#1D190E",
    padding: 20,
  },
  changePfCont: {
    flexDirection: "row",
    paddingBottom: 20,
    paddingTop: 20
  },
  downloadPfCont: {
    paddingLeft: 10,
  },
  downloadPfPic: {
    width: 75,
    height: 75,
    backgroundColor: "white",
    borderRadius: 100,
    borderWidth: 1,
    borderColor: "#EDE9C7",
    marginLeft: 10,
  },
  downloadPfBtn: {
    width: 120,
    backgroundColor: "#EDE9C7",
    borderRadius: 4,
    padding: 5,
    flexDirection: "row",
    marginTop: 10,
  },
  error: {
    color: "#d00",
    marginTop: 4,
    marginBottom: 6,
  },
  downloadBtnTxt: {
    fontSize: 16,
    color: "#E06F24",
    textAlignVertical: "center",
    paddingLeft: 10,
  },
  changeUsrCont: {
    paddingBottom: 20,
  },
  changeUsrFieldCont: {
    flexDirection: "row",
    alignItems: "center",
  },
  usrNameField: {
    backgroundColor: "#28200C",
    color: "#EDE9C7",
    padding: 10,
    marginTop: 10,
    marginLeft: 20,
    fontSize: 16,
    height: 50,
    borderWidth: 0.5,
    borderColor: "#EDE9C7",
    borderRadius: 4,
  },
  changeUsrBtn: {
    width: 135,
    backgroundColor: "#EDE9C7",
    borderRadius: 4,
    padding: 8,
    flexDirection: "row",
    marginTop: 10,
  },
  changeUsrIcon: {
    position: "absolute",
    right: 7,
    top: -7,
  },
  changePswdCont: {
    paddingBottom: 20,
  },
  deleteAccBtn: {
    width: 120,
    backgroundColor: "#edc7c7",
    borderRadius: 4,
    padding: 8,
    flexDirection: "row",
    marginTop: 10,
  },
});
