import axios from 'axios';
import apiConfig from "./apiConfig"

const axiosInstance = axios.create({
    maxContentLength: 200000000, // Tamaño máximo de contenido en bytes (200 MB)
});

const baseUrl = `${apiConfig.productionUrl}`;
const storedToken = localStorage.getItem('andesToken'); // Traemos el token de localStorage
let authToken = "";

if (storedToken) {
    try {
        const JSONtoken = JSON.parse(storedToken);
        authToken = `Bearer ${JSONtoken.token}`; // Asignamos el token si existe
    } catch (error) {
        console.error("Error al parsear el token:", error);
    }
}


const apiUtils = {
    async get(url, headers = {}) {
        try {
            const modifiedHeaders = {
                ...headers,
                Authorization: authToken //En todo momento si tenemos token lo enviamos!
            };
            const response = await axiosInstance.get(`${baseUrl}${url}`, { headers: modifiedHeaders });
            return response.data;
        } catch (error) {
            throw error.response.data;
        }
    },

    async post(url, data, headers = {}) {
        try {
            const modifiedHeaders = {
                ...headers,
                Authorization: authToken
            };
            const response = await axiosInstance.post(`${baseUrl}${url}`, data, { headers: modifiedHeaders });
            return response.data;
        } catch (error) {
            throw error.response.data;
        }
    },

    async put(url, data, headers = {}) {
        try {
            const modifiedHeaders = {
                ...headers,
                Authorization: authToken
            };
            const response = await axiosInstance.put(`${baseUrl}${url}`, data, { headers: modifiedHeaders });
            return response.data;
        } catch (error) {
            throw error.response.data;
        }
    },

    async delete(url, data, headers = {}) {
        try {
            const modifiedHeaders = {
                ...headers,
                Authorization: authToken
            };
            const response = await axiosInstance.delete(`${baseUrl}${url}`, {
                headers: modifiedHeaders,
                data // Asegúrate de que el motivo esté en el cuerpo de la petición
            });
            return response.data;
        } catch (error) {
            throw error.response.data;
        }
    },
};

export default apiUtils;