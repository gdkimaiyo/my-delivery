import axios from "axios";
import { BACKEND_API } from "../../secrets.config";

// Get all users
export const getItems = async () => {
    const response = await axios.get(`${BACKEND_API}/api/v1/items`);
    return response.data;
};
