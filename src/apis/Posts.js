import axios from "axios";
import { API_URL, DEBUG } from "../../config";

const api = `${API_URL[DEBUG]}posts/`;

export const getAll = async () => {
    const response = await axios.get(`${api}`);
    return response;
};

export const create = async (post) => {
  console.log(post);
  const response = await axios.post(`${api}`, post, {
    headers: {
      Authorization: `Bearer ${post?.owner}`, // Include the JWT token if required
      "Content-Type": "application/json", // Ensure JSON content-type
    },
  });
  return response;
};
