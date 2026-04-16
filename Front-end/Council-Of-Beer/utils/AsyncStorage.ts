import AsyncStorage from "@react-native-async-storage/async-storage";

const STORAGE_KEY: string = "SETTINGS_STORAGE";
const USER_DATA_KEY = "USER_DATA";

export type AppSettings = {
  lanValue: string;
  notifEnabled: boolean;
  commentNotifsEnabled: boolean;
  postLikeNotifsEnabled: boolean;
  newFollowerNotifsEnabled: boolean;
};

//tänne voi periaattessa tallentaa profiilikuvan urlin
export type UserData = {
  username: string;
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


export const saveUserName = async (username: UserData) => {
  try {
    const jsonValue = JSON.stringify(username);
    await AsyncStorage.setItem(USER_DATA_KEY, jsonValue);
  } catch (e) {
    console.error('Error saving settings', e);
  }
};


export const getUserName = async (): Promise<UserData | null> => {
  try {
    const jsonValue = await AsyncStorage.getItem(USER_DATA_KEY);
    return jsonValue  != null ?  JSON.parse(jsonValue) : null;
  } catch (e) {
    console.error("Error loading user data", e);
    return null;
  }
};

export const deleteUserName = async () => {
  try {
    await AsyncStorage.removeItem(USER_DATA_KEY);
  } catch (e) {
    console.error("Error deleting user data", e);
  }
};