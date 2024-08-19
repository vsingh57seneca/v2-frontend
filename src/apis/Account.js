import axios from 'axios';
import { API_URL, DEBUG } from '../../config';

const api = `${API_URL[DEBUG]}accounts/`

export const create = async (formData) => {
    const data = {
        email: formData?.email,
        password: formData?.password
    };
    const response = await axios.post(`${api}`, data);
    return response.data;
}