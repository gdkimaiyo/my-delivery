import axios from "axios";
import { BACKEND_API } from "../../secrets.config";

// Get all users
export const getItems = async () => {
    const response = await axios.get(`${BACKEND_API}/api/v1/items`);
    return response.data;
};

// Get an item
export const getItem = async (id) => {
    const response = await axios.get(`${BACKEND_API}/api/v1/items/${id}`);
    return response.data;
};
