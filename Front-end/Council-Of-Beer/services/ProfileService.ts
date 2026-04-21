export type User = {
    userName: string;
    follower: number;
    following: number;
    ratings: number;
    pfpUrl: string;
};

const BASE_URL = process.env.EXPO_PUBLIC_API_URL;

export const profilePage = async (content: User) => {
    const response = await fetch(`${BASE_URL}/`)
}