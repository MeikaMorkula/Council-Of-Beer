import { GetAccessToken } from "../utils/SecureStorage";
import { checkHealth } from "./HealthService";

const BASE_URL = process.env.EXPO_PUBLIC_API_URL;

export type ChangeUserNameRequest = {
  newUser: string;
  oldUser: string;
};

export type ChangePassWordRequest = {
  newPass: string;
  oldPass: string;
  username: string;
};

export const ChangeUserName = async ({
  newUser,
  oldUser,
}: ChangeUserNameRequest) => {
  try {
    const token = GetAccessToken();
    const isHealthy = await checkHealth();

    if (!isHealthy) {
      throw new Error("SERVER_UNAVAILABLE");
    }
    const res = await fetch(`${BASE_URL}/User/Username`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        newUser,
        oldUser,
      }),
    });
    if (!res.ok) {
      const e = await res.text();
      throw new Error(e || "failed to change username");
    }

    return await res.json();
  } catch (error) {
    console.error("something went wrong:", error);
    throw error;
  }
};

export const ChangePassWord = async ({
  newPass,
  oldPass,
  username,
}: ChangePassWordRequest) => {
  try {
    const isHealthy = await checkHealth();

    if (!isHealthy) {
      throw new Error("SERVER_UNAVAILABLE");
    }
    const token = GetAccessToken();
    const res = await fetch(`${BASE_URL}/User/Password`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        newPass,
        oldPass,
        username,
      }),
    });

    if (!res.ok) {
      const e = await res.text();
      throw new Error(e || "failed to change password");
    }

    return await res.json();
  } catch (error) {
    console.error("something went wrong:", error);
    throw error;
  }
};
