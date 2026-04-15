const BASE_URL = process.env.EXPO_PUBLIC_API_URL;

export const checkHealth = async (): Promise<boolean> => {
  try {

    //there is a health endpoint, but no idea if it actually works
    const res = await fetch(`${BASE_URL}`);

    return res.ok;
  } catch {
    return false;
  }
};
