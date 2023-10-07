import { BASE_API } from "../utils/constants";


export async function getPeliculasApi() {
    try {
        const url = `${BASE_API}/api/peliculas/`;
        const response = await fetch(url);
        const result = await response.json();
        return result;
    } catch (error) {
        throw error;
    }
}

export async function addPeliculaApi(data, token) {
    try {
        const formData = new FormData();
        formData.append('poster', data.poster);
        formData.append('nombre', data.nombre);
        formData.append('duracion', data.duracion);
        formData.append('genero', data.genero);
        formData.append('clasificacion', data.clasificacion);
        formData.append('descripcion', data.descripcion);

        const url = `${BASE_API}/api/peliculas/`;
        const params = {
            method: "POST",
            headers: {
                Authorization: `Bearer ${token}`,
            },
            body: formData,
        };

        const response = await fetch(url, params);
        const result = await response.json();
        return result;
    } catch (error) {
        throw error
    }
}

export async function updatePeliculaApi(id, data, token) {
    try {
        const formData = new FormData();
        formData.append('nombre', data.nombre);
        formData.append('duracion', data.duracion);
        formData.append('genero', data.genero);
        formData.append('clasificacion', data.clasificacion);

        if (data.descripcion) formData.append('descripcion', data.descripcion);
        if (data.poster) formData.append('poster', data.poster);

        const url = `${BASE_API}/api/peliculas/${id}/`;
        const params = {
            method: "PATCH",
            headers: {
                Authorization: `Bearer ${token}`,
            },
            body: formData,
        };

        const response = await fetch(url, params);
        const result = await response.json();
        return result;
    } catch (error) {
        throw error
    }
}

export async function deletePeliculaApi(id, token) {
    try {
        const url = `${BASE_API}/api/peliculas/${id}/`;
        const params = {
            method: "DELETE",
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json"
            }
        };

        const response = await fetch(url, params);
        const result = await response.json();
        return result;
    } catch (error) {
        throw error
    }
}

export async function getPeliculasExcludeEstablecimientoApi(id) {
    try {
        const url = `${BASE_API}/api/peliculas/?establecimiento__exclude=${id}`;
        const response = await fetch(url);
        const result = await response.json();
        return result;
    } catch (error) {
        throw error;
    }
}

