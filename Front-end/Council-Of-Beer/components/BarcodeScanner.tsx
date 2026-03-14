import { CameraView, useCameraPermissions } from "expo-camera";
import React from "react";
import { useState } from "react";
import { Button, StyleSheet, Text, View } from "react-native";
import { useTranslation } from "react-i18next";
import { useNavigation } from "@react-navigation/native";

export default function BarcodeScanner() {
  const [barcode, setBarcode] = useState<string>("");
  const [permission, requestPermission] = useCameraPermissions();
  const [loading, setLoading] = useState(false);
  const { t } = useTranslation();

  if (!permission) {
    return <View></View>;
  }

  if (!permission.granted) {
    return (
      <View style={styles.container}>
        <Text style={styles.message}>
          {t("permissions.camera.needpermission")}
        </Text>
        <Button
          onPress={requestPermission}
          title={t("permissions.camera.grantpermission")}
        />
      </View>
    );
  }

  const handleBarcode = async (data: string) => {
    setBarcode(data);

    setLoading(true);
    try{
        //here we should do an api call to check if the beer exists
        //will be something like const res =await fetch(`${apiaddress}/${data}`)
        //then check if 404 or 200

    }catch(err){console.log(err)}
    setLoading(false);
  }

  return (
    <View style={styles.container}>
      <CameraView
        style={styles.camera}
        videoQuality="1080p"
        barcodeScannerSettings={{
          barcodeTypes: ["ean13", "ean8"],
        }}
        //disable scanning when barcode found
        onBarcodeScanned={barcode ? undefined : (res) => handleBarcode(res.data)}
      />
      <View style={styles.overlay}>
        <Text style={styles.text}>{barcode}</Text>
        <Button
          title={t("camera.buttons.scanagain")}
          onPress={() => setBarcode("")}
        ></Button>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  message: {
    textAlign: "center",
    paddingBottom: 10,
  },
  camera: {
    flex: 1,
  },
  overlay: {
    position: "absolute",
    bottom: 80,
    width: "100%",
    alignItems: "center",
    paddingHorizontal: 20,
  },
  text: {
    fontSize: 22,
    fontWeight: "bold",
    color: "white",
    backgroundColor: "black",
    padding: 10,
    borderRadius: 8,
    marginBottom: 15,
  },
});
