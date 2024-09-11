import axios from "axios";
import { API_URL, DEBUG } from "../../config";

const api = `${API_URL[DEBUG]}accounts/`;

export const create = async (formData) => {
  const response = await axios.post(`${api}`, formData);
  return response.data;
};

export const find = async (token) => {
  try {
    const response = await axios.get(`${api}${token}`, {
      headers: {
        Authorization: `Bearer ${token}`, // Pass token here
      },
    });
    console.log(response);
    return response;
  } catch (error) {
    const response = error?.response;
    if (response?.status === 403) {
      return response;
    } else {
      console.log(error);
    }
  }
};
