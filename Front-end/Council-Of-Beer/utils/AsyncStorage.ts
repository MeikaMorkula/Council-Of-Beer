import AsyncStorage from "@react-native-async-storage/async-storage";

const STORAGE_KEY: string = "SETTINGS_STORAGE";

export type AppSettings = {
  lanValue: string;
  notifEnabled: boolean;
  commentNotifsEnabled: boolean;
  postLikeNotifsEnabled: boolean;
  newFollowerNotifsEnabled: boolean;
};

export const saveSettings = async (settings: AppSettings) => {
  try {
    const jsonValue = JSON.stringify(settings);
    await AsyncStorage.setItem(STORAGE_KEY, jsonValue);
  } catch (e) {
    console.error('Error saving settings', e);
  }
};

export const loadSettings = async (): Promise<AppSettings | null> => {
  try {
    const jsonValue = await AsyncStorage.getItem(STORAGE_KEY);
    return jsonValue != null ? JSON.parse(jsonValue) : null;
  } catch (e) {
    console.error('Error loading settings', e);
    return null;
  }
};