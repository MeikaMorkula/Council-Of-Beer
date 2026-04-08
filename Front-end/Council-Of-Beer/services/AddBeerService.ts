

export type AddBeerContent = {
  name: string;
  alcohol_percentage : number;
  brewery: string;
  country: string;
  labels: string[];
  barcode: string;
  imageUrl: string | null;
  imagePublicId: number|null
};

const BASE_URL = process.env.EXPO_PUBLIC_API_URL;

export const addBeer = async (content: AddBeerContent) => {
  try {
    const res = await fetch(`${BASE_URL}/Beer/AddBeer`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(content),
    });
    if (!res.ok) {
      const e = await res.text();
      throw new Error(e || "failed to add beer");
    }
    return await res.json();
  } catch (error) {
    console.error("something went wrong:", error);
    throw error;
  }
};
