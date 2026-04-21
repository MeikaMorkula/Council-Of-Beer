import { getUserName } from "./AsyncStorage";
import { GetAccessToken } from "./SecureStorage";

export type AuthState = {
    isLoggedIn: boolean;
    userName: string | null;
    accessToken: string | null;
};

export const getAuthState = async(): Promise<AuthState> => {
    const [accessToken, userName] = await Promise.all([
        GetAccessToken(),
        getUserName(),
    ]);

    return {
        isLoggedIn: Boolean(accessToken && userName),
        userName,
        accessToken,
    };
};

export const isAuthenticated = async (): Promise<boolean> => {
    const { isLoggedIn } = await getAuthState();
    return isLoggedIn;
};