import { useNavigation } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import {
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ScrollView,
  Modal,
  TextInput,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useTranslation } from "react-i18next";
import { getAuthState } from "../utils/Auth";

function CollectionObj() {
  const navigation = useNavigation();
  return (
    <TouchableOpacity onPress={() => navigation.navigate("Collection")}>
      <View style={styles.singleCollection}>
        <Image style={styles.collectionImg} />
        <Text style={styles.collectionTxt}>Beer collection</Text>
      </View>
    </TouchableOpacity>
  );
}

function PostObj() {
  const navgiation = useNavigation();
  return (
    <TouchableOpacity
      style={{ width: '33%' }}
      onPress={() => navgiation.navigate("Post")}
    >
      <Image style={styles.feedImg} />
    </TouchableOpacity>
  );
}

export default function Profile() {
  const [modalVisible, setModalVisible] = useState(false);
  const [currentUserName, setCurrentUserName] = useState<string>("ilovebeer");
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const { t } = useTranslation();

  useEffect(() => {
    const loadAuthState = async () => {
      const authState = await getAuthState();

      setIsLoggedIn(authState.isLoggedIn);
      setCurrentUserName(authState.userName ?? "beerlover");
    };

    void loadAuthState();
  }, []);

  return (
    <>
      <View style={styles.profileinfo}>
        <View style={styles.pfpiccont}>
          <Image
            style={styles.pfpic}
            source={require("../assets/beerpf.png")}
          />
        </View>
        <View style={styles.pftextcont}>
          <View style={styles.usernamebtn}>
            <Text style={styles.username}>@{currentUserName}</Text>
            {isLoggedIn ? (
              <View style={styles.profileBadge}>
                <Text style={styles.profileBadgeText}>Your Profile</Text>
              </View>
            ) : (
              <TouchableOpacity style={styles.followbtn}>
                <Text>Guest</Text>
              </TouchableOpacity>
            )}
          </View>
          <View style={styles.pfstatscont}>
            <View style={styles.stats}>
              <Text style={styles.numstat}>69</Text>
              <Text style={{ color: "#EDE9C7" }}>{t("profile.ratings")}</Text>
            </View>
            <View style={styles.stats}>
              <Text style={styles.numstat}>69</Text>
              <Text style={{ color: "#EDE9C7" }}>{t("profile.followers")}</Text>
            </View>
            <View style={styles.stats}>
              <Text style={styles.numstat}>69</Text>
              <Text style={{ color: "#EDE9C7" }}>{t("profile.following")}</Text>
            </View>
          </View>
        </View>
      </View>
      <View style={styles.collectionCont}>
        <ScrollView horizontal={true} style={{ backgroundColor: "#1D190E" }}>
          <TouchableOpacity onPress={() => setModalVisible(true)}>
            <Modal
              backdropColor={"#00000025"}
              visible={modalVisible}
              onRequestClose={() => {
                setModalVisible(!modalVisible);
              }}
            >
              <View style={styles.modalCont}>
                <View style={styles.modalView}>
                  <Text style={styles.modalTitle}>
                    {t("profile.newCollection.title")}
                  </Text>
                  <View style={styles.newCollectionInfoView}>
                    <Text style={styles.modalTxt}>
                      {t("profile.newCollection.name")}
                    </Text>
                    <TextInput
                      style={styles.collectionNameField}
                      placeholder={t("profile.newCollection.nameplaceholder")}
                      placeholderTextColor={"#EDE9C7"}
                    />
                  </View>
                  <View style={styles.modalBtnView}>
                    <TouchableOpacity
                      onPress={() => {
                        setModalVisible(!setModalVisible);
                      }}
                      style={styles.modalBtn}
                    >
                      <Text>{t("profile.btn.close")}</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      onPress={() => {
                        setModalVisible(!setModalVisible);
                      }}
                      style={styles.modalBtn}
                    >
                      <Text>{t("profile.btn.add")}</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            </Modal>
            <View style={styles.singleCollection}>
              <Ionicons
                name="add"
                size={32}
                color="#28200C"
                style={{
                  position: "absolute",
                  top: 20,
                  left: 30,
                  zIndex: 9999,
                }}
              />
              <Image style={styles.collectionImg} />
              <Text style={styles.collectionTxt}>
                {t("profile.newCollection.addnewcollection")}
              </Text>
            </View>
          </TouchableOpacity>
          <CollectionObj />
          <CollectionObj />
          <CollectionObj />
          <CollectionObj />
          <CollectionObj />
          <CollectionObj />
          <CollectionObj />
          <CollectionObj />
        </ScrollView>
      </View>
      <View style={styles.profilecontent}>
        <ScrollView style={{ height: 0 }}>
          <View style={styles.feed}>
            <PostObj />
            <PostObj />
            <PostObj />
            <PostObj />
            <PostObj />
            <PostObj />
            <PostObj />
            <PostObj />
            <PostObj />
            <PostObj />
          </View>
        </ScrollView>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  profileinfo: {
    flex: 2,
    flexDirection: "row",
    justifyContent: "center",
    paddingTop: 20,
    marginBottom: -70,
    backgroundColor: "#1D190E",
  },
  profilecontent: {
    flex: 5,
    backgroundColor: "#1D190E",
  },
  pfpic: {
    width: 100,
    height: 100,
    borderRadius: 100,
    borderWidth: 1,
    borderColor: "#EDE9C7",
  },
  pfpiccont: {
    alignItems: "center",
    position: "absolute",
    top: 15,
    left: 15,
  },
  pftextcont: {
    flexDirection: "column",
    paddingLeft: 40,
  },
  usernamebtn: {
    flexDirection: "row",
    columnGap: 10,
  },
  username: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#EDE9C7",
  },
  followbtn: {
    alignItems: "center",
    borderRadius: 4,
    backgroundColor: "#E39914",
    padding: 8,
    width: 72,
  },
  pfstatscont: {
    paddingTop: 10,
    flexDirection: "row",
    columnGap: 20,
  },
  stats: {
    alignItems: "center",
    flexDirection: "column",
    rowGap: 5,
  },
  numstat: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#EDE9C7",
  },
  collectionCont: {
    flexDirection: "row",
  },
  singleCollection: {
    alignItems: "center",
  },
  collectionImg: {
    width: 75,
    height: 75,
    backgroundColor: "white",
    borderRadius: 100,
    borderWidth: 1,
    borderColor: "#EDE9C7",
    marginLeft: 10,
  },
  collectionTxt: {
    color: "#EDE9C7",
    fontSize: 14,
    maxWidth: 75,
    textAlign: "center",
    paddingLeft: 5,
  },
  feedImg: {
    height: 150,
    backgroundColor: "white",
    borderWidth: 0.25,
    borderColor: "black",
  },
  feed: {
    flex: 0.33,
    flexDirection: "row",
    flexWrap: "wrap",
    width: "100%",
    paddingTop: 10,
  },
  modalCont: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  modalView: {
    backgroundColor: "#28200C",
    padding: 25,
    borderRadius: 12,
  },
  modalTitle: {
    color: "#EDE9C7",
    fontSize: 24,
    fontFamily: "GermaniaOne400_Regular",
  },
  modalBtnView: {
    flexDirection: "row",
    gap: 150,
  },
  modalBtn: {
    alignItems: "center",
    borderRadius: 4,
    backgroundColor: "#E39914",
    padding: 8,
    width: 72,
  },
  modalTxt: {
    color: "#EDE9C7",
  },
  newCollectionInfoView: {
    paddingLeft: 10,
    paddingTop: 10,
    paddingBottom: 10,
  },
  collectionNameField: {
    backgroundColor: "#28200C",
    color: "#EDE9C7",
    padding: 10,
    marginTop: 10,
    marginLeft: 20,
    fontSize: 16,
    height: 40,
    borderWidth: 0.5,
    borderColor: "#EDE9C7",
    borderRadius: 4,
  },
  profileBadge: {
    alignItems: "center",
    borderRadius: 4,
    backgroundColor: "#E39914",
    paddingHorizontal: 10,
    paddingVertical: 8,
    minWidth: 96,
  },
  profileBadgeText: {
    color: "#28200C",
    fontWeight: "600",
  },
  loggedInText: {
    color: "#EFC06D",
    marginTop: 8,
    fontSize: 14,
  },
});
