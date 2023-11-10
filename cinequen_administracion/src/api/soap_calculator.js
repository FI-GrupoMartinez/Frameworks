import { BASE_API } from "../utils/constants";

export async function getSoapMetodos() {
    try {
        const url = `${BASE_API}/api/soap/`;
        const response = await fetch(url);
        const result = await response.json();
        return result;
    } catch (error) {
        throw error;
    }
}

export async function hacerCalculoSoap(data, token) {
    try {
        const url = `${BASE_API}/api/soap/`;
        const params = {
            method: "POST",
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        };
        const response = await fetch(url, params);
        const result = await response.json();
        return result;
    } catch (error) {
        throw error
    }
}



