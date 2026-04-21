import { GetAccessToken } from "../utils/SecureStorage";

const BASE_URL = process.env.EXPO_PUBLIC_API_URL;

export type NewPostContent = {
  username: string;
  beername: string;
  Description: string;
  Bar: string;
  City: string;
  Image: {
    uri: string;
    name: string;
    type: string;
  } | null;
};

export const createNewPost = async (newpost: NewPostContent) => {
  try {
    const formData = new FormData();
    const token = await GetAccessToken();

    formData.append("username", newpost.username);
    formData.append("beername", newpost.beername);
    formData.append("Description", newpost.Description);
    formData.append("Bar", newpost.Bar);
    formData.append("City", newpost.City);

    if (newpost.Image) {
      formData.append("Image", {
        uri: newpost.Image.uri,
        name: newpost.Image.name,
        type: newpost.Image.type,
      } as any);
    }

    const res = await fetch(`${BASE_URL}/api/CreatePost`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: formData,
    });
    if (!res.ok) {
      const e = await res.text();
      throw new Error(e || "failed to add post");
    }

    return await res.json();
  } catch (error) {
    console.error("something went wrong:", error);
    throw error;
  }
};
