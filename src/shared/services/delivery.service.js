import axios from "axios";
import { BACKEND_API } from "../../secrets.config";

// Get all deliveries
export const getDeliveries = async () => {
  const response = await axios.get(`${BACKEND_API}/api/v1/deliveries`);
  return response.data;
};

// Record an Order
export const saveOrder = async (order) => {
  const response = await axios.post(`${BACKEND_API}/api/v1/delivery`, order);
  return response.data;
};
