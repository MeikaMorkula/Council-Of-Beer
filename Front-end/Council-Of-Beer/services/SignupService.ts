import { StoreTokens } from "../utils/SecureStorage";
import { checkHealth } from "./HealthService";
import type { AuthResponse } from "./LoginService";

const BASE_URL = process.env.EXPO_PUBLIC_API_URL;

export type SignupRequest = {
  username: string;
  password: string;
  birthday: string;
};

const getAuthUrl = (path: string) => {
  if (!BASE_URL) {
    throw new Error("API base URL is not configured.");
  }

  return `${BASE_URL.replace(/\/$/, "")}${path}`;
};

const getErrorMessage = async (response: Response, fallbackMessage: string) => {
  const errorText = await response.text();

  if (!errorText) {
    return fallbackMessage;
  }

  return errorText;
};

export const signup = async ({
  username,
  password,
  birthday,
}: SignupRequest): Promise<AuthResponse> => {
  const isHealthy = await checkHealth();
  if (!isHealthy) {
    throw new Error("SERVER_UNAVAILABLE");
  }
  const response = await fetch(getAuthUrl("/User/Authenticate"), {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      userName: username,
      password,
      birthday,
    }),
  });

  if (!response.ok) {
    throw new Error(
      await getErrorMessage(
        response,
        "Sign up failed. Check the username, birthday, and password rules.",
      ),
    );
  }

  const data = (await response.json()) as AuthResponse;
  await StoreTokens(data.accessToken, data.refreshToken);

  return data;
};
