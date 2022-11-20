import axios from "axios";
import { BACKEND_API } from "../../secrets.config";

// Record new user / customer information
export const register = async (user) => {
  const response = await axios.post(`${BACKEND_API}/api/v1/register`, user);
  return response.data;
};

// Get all users
export const getCustomers = async () => {
  const response = await axios.get(`${BACKEND_API}/api/v1/customers`);
  return response.data;
};

// Get an user by email
export const getCustomerByEmail = async (email) => {
  const response = await axios.get(`${BACKEND_API}/api/v1/customers/${email}`);
  return response.data;
};

// Update user / customer info: u for Update
export const uCustomer = async (data) => {
  const response = await axios.put(
    `${BACKEND_API}/api/v1/customers/${data.userId}`,
    data
  );
  return response.data;
};
