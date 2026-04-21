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
    const token = await GetAccessToken();
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

    console.log("Jaykka");
    const contentType = res.headers.get("content-type");
    if (contentType && contentType.includes("application/json")) {
      return await res.json();
    } else {
      return await res.text();
    }
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
    const token = await GetAccessToken();
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

    const contentType = res.headers.get("content-type");
    if (contentType && contentType.includes("application/json")) {
      return await res.json();
    } else {
      return await res.text();
    }
  } catch (error) {
    console.error("something went wrong:", error);
    throw error;
  }
};

export const deleteAccount = async () => {
  try {
    const isHealthy = await checkHealth();

    if (!isHealthy) {
      throw new Error("SERVER_UNAVAILABLE");
    }
    const token = await GetAccessToken();

    const res = await fetch(`${BASE_URL}/User/Terminate`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    if (!res.ok) {
      const e = await res.text();
      throw new Error(e || "failed to delete account");
    }

    const contentType = res.headers.get("content-type");
    if (contentType && contentType.includes("application/json")) {
      return await res.json();
    } else {
      return await res.text();
    }
  } catch (error) {
    console.error("something went wrong:", error);
    throw error;
  }
};
