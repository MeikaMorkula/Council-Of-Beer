import { StoreTokens } from "../utils/SecureStorage";
import {saveUserName} from "../utils/AsyncStorage"

const BASE_URL = process.env.EXPO_PUBLIC_API_URL;

export type LoginRequest = {
	username: string;
	password: string;
};

export type AuthResponse = {
	userName: string;
	accessToken: string;
	refreshToken: string;
	expiresIn: number;
	refreshExpiresIn: number;
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

export const login = async ({ username, password }: LoginRequest): Promise<AuthResponse> => {
	const response = await fetch(getAuthUrl("/User/Authorize"), {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify({
			userName: username,
			password,
		}),
	});

	if (!response.ok) {
		throw new Error(
			await getErrorMessage(response, "Invalid username or password.")
		);
	}

	const data = (await response.json()) as AuthResponse;
	await StoreTokens(data.accessToken, data.refreshToken);
	await saveUserName(data.userName)

	return data;
};
