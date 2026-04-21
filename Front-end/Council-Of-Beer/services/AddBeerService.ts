import { GetAccessToken } from "../utils/SecureStorage";

export type AddBeerContent = {
  Name: string;
  AlcPrecentage: number;
  Brewery: string;
  Country: string;
  Labels: string[];
  Barcode: string;
  Image: {
    uri: string;
    name: string;
    type: string;
  } | null;
};

const BASE_URL = process.env.EXPO_PUBLIC_API_URL;

export const addBeer = async (content: AddBeerContent) => {
  try {
    const formData = new FormData();
    const token = await GetAccessToken();


    formData.append("Name", content.Name);
    formData.append("AlcPrecentage", content.AlcPrecentage.toString());
    formData.append("Brewery", content.Brewery);
    formData.append("Country", content.Country);
    formData.append("Barcode", content.Barcode);

    content.Labels.forEach((label, index) => {
      formData.append(`Labels[${index}]`, label);
    });

    if (content.Image) {
      formData.append("Image", {
        uri: content.Image.uri,
        name: content.Image.name,
        type: content.Image.type,
      } as any);
    }

    const res = await fetch(`${BASE_URL}/Beer/AddBeer`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: formData,
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
