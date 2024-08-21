import axios from "axios";
import { API_URL, DEBUG } from '../../config';


const api = `${API_URL[DEBUG]}auth/`

export const login = async (formData) => {
    try {
        const data = {
            email: formData?.email,
            password: formData?.password
        };

        const response = await axios.post(`${api}`, data);
        return response.data;
    } catch (error) {
        console.error(error);
        return error;
    }
}


