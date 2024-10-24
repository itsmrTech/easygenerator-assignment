import axios from "axios";
import { redirectToLogin } from "../utils/redirect.utils";
import { refreshAccessToken } from "./authService";
import { AxiosResponse } from "axios";

const API_URL = "http://localhost:3000/api/cms/user"; // Backend API


export const getUserProfile = async (): Promise<AxiosResponse | null> => {
    const accessToken= localStorage.getItem('accessToken');
    const refreshToken= localStorage.getItem('refreshToken');
    if (!accessToken) {
        if(refreshToken) {
            await refreshAccessToken();
            return getUserProfile();
        }
         redirectToLogin();
         return null;
    }
    const response = await axios.get(`${API_URL}/profile`, {
        headers: {
            Authorization: `Bearer ${accessToken}`,
        },
    });
    return response;
}