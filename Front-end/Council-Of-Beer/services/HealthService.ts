const BASE_URL = process.env.EXPO_PUBLIC_API_URL;

export const checkHealth = async (): Promise<boolean> => {
  try {

    const res = await fetch(`${BASE_URL}/health`);

    return res.ok;
  } catch {
    return false;
  }
};
