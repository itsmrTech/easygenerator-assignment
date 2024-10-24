// src/services/authService.ts
import axios from "axios";
import { redirectToLogin } from "../utils/redirect.utils";
import env from "react-dotenv";

const API_URL = `${env.BACKEND_URL}/api/cms/user`; // Backend API

export const signup = async (email: string, password: string, name: string) => {
  const response = await axios.post(`${API_URL}/auth/register`, {
    email,
    password,
    name,
  });
  console.log(response.data?.data?.tokens)
  if (response.data?.data?.tokens) {
    localStorage.setItem("accessToken", response.data?.data?.tokens?.accessToken?.token);
    localStorage.setItem(
      "refreshToken",
      response.data?.data?.tokens?.refreshToken?.token
    );
  }
  return response;
};

export const signin = async (email: string, password: string) => {
  const response = await axios.post(`${API_URL}/auth/login`, {
    email,
    password,
  });
  console.log(response.data?.data?.tokens)
  if (response.data?.data?.tokens) {
    localStorage.setItem("accessToken", response.data?.data?.tokens?.accessToken?.token);
    localStorage.setItem(
      "refreshToken",
      response.data?.data?.tokens?.refreshToken?.token
    );
  }
  return response;
};

export const signout = async () => {
  const response=await axios.delete(`${API_URL}/auth/logout`,{
    headers: {
      Authorization: `Bearer ${localStorage.getItem("refreshToken")}`,
    },
  });
  console.log(response)

    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");

  redirectToLogin();

};

export const refreshAccessToken = async () => {
  const refreshToken = localStorage.getItem("refreshToken");
  try {
    const response = await axios.post(`${API_URL}/auth/access-token/refresh`, {
      refreshToken,
    });
    if (response.data.accessToken) {
      localStorage.setItem("accessToken", response.data.accessToken.token);
    }
    return response;
  } catch (e) {
    console.error(e)
    redirectToLogin();
    throw e;
  }
};
