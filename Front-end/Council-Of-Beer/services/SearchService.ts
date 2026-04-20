const BASE_URL = process.env.EXPO_PUBLIC_API_URL;


export type Beer = {
    name: string;
    alcPrecentage: number;
    brewery: string;
    country: string;
    labels: string[];
    imageUrl: string;
};

const getUrl= (path: string) => {
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

export const search = async (): Promise<Beer[]> => {
    const response = await fetch(getUrl("/Beer/GetAllBeer"), {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
    });

    if (!response.ok) {
        throw new Error(
            await getErrorMessage(response, "Something went wrong")
        );
    }

    const data = (await response.json()) as {
        name: string;
        alcPrecentage: number;
        brewery: string;
        country: string;
        labels: string[];
        imageUrl: string;
    }[];

    return data.map((beer) => ({
        name: beer.name,
        alcPrecentage: beer.alcPrecentage,
        brewery: beer.brewery,
        country: beer.country,
        labels: beer.labels ?? [],
        imageUrl: beer.imageUrl,
    }));
};