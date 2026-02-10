import axios from "axios";
import { AdminRequest, UserUpdateRequest } from "./authSlice";

const baseUrl = "https://sendnow.app/";

const loginUser = async (email: string, password: string) => {
  try {
    const response = await axios.post(
      `${baseUrl}api/admin/login`, // Replace with your API URL
      { email, password }
    );

    return response.data; // Return response data
  } catch (error: any) {
    console.error("Login failed:", error.response?.data || error.message);
    throw new Error(error.response?.data?.message || "Login failed");
  }
};

const getAllAdmin = async (token: string) => {
  try {
    const response = await axios.get(
      `${baseUrl}api/user/admin`, // Replace with your API URL
      {
        headers: {
          "x-access-token": token,
        },
      }
    );

    return response.data; // Return response data
  } catch (error: any) {
    throw new Error(error.response?.data?.message || "Admin get failed");
  }
};

const getAllUser = async (token: string) => {
  try {
    const response = await axios.get(
      `${baseUrl}api/users`, // Replace with your API URL
      {
        headers: {
          "x-access-token": token,
        },
      }
    );

    return response.data; // Return response data
  } catch (error: any) {
    throw new Error(error.response?.data?.message || "Users get failed");
  }
};

const addNewAdmin = async (body: AdminRequest) => {
  try {
    const response = await axios.post(
      `${baseUrl}api/user/admin`, // Replace with your API URL
      body, // Pass request body here
      {
        headers: {
          "x-access-token": body.token,
          "Content-Type": "application/json",
        },
      }
    );

    return response.data; // Return response data
  } catch (error: any) {
    throw new Error(error.response?.data?.message || "Admin creation failed");
  }
};

const deleteUser = async (body: UserUpdateRequest) => {
  try {
    const response = await axios.delete(
      `${baseUrl}api/user/delete`, // Replace with your API URL
      {
        data: body,
        headers: {
          "x-access-token": body.token,
          "Content-Type": "application/json",
        },
      },
    );

    return response.data; // Return response data
  } catch (error: any) {
    throw new Error(error.response?.data?.message || "Admin creation failed");
  }
};

const updateUser = async (body: UserUpdateRequest) => {
  try {
    const response = await axios.patch(
      `${baseUrl}api/user/update`, // Replace with your API URL
      body, // Pass request body here
      {
        headers: {
          "x-access-token": body.token,
          "Content-Type": "application/json",
        },
      }
    );

    return response.data; // Return response data
  } catch (error: any) {
    throw new Error(error.response?.data?.message || "Admin creation failed");
  }
};

export default {
  loginUser,
  getAllAdmin,
  addNewAdmin,
  getAllUser,
  updateUser,
  deleteUser,
};
