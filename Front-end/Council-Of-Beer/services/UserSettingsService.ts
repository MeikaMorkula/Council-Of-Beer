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
    const res = await fetch(`${BASE_URL}/User/Username`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
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

    return await res.json();
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
    const res = await fetch(`${BASE_URL}/User/Password`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        newPass,
        oldPass,
        username
      }),
    });
    if (!res.ok) {
      const e = await res.text();
      throw new Error(e || "failed to change password");
    }

    return await res.json();
  } catch (error) {
    console.error("something went wrong:", error);
    throw error;
  }
};
