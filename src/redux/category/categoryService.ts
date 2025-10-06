import axios from "axios";

const baseUrl = "http://sendnow.app/";

const getCategory = async (token: string) => {
  try {
    const response = await axios.get(
      `${baseUrl}api/categories`, // Replace with your API URL
      {
        headers: {
          "x-access-token": token,
        },
      }
    );

    return response.data; // Return response data
  } catch (error: any) {
    console.error(
      "Get categories failed:",
      error.response?.data || error.message
    );
    throw new Error(error.response?.data?.message || "Get categories failed");
  }
};

const addCategory = async (catData: { name: string; token: string }) => {
  try {
    const response = await axios.post(
      `${baseUrl}api/category/add`, // Replace with your API URL
      { name: catData.name },
      {
        headers: {
          "x-access-token": catData.token,
        },
      }
    );

    return response.data; // Return response data
  } catch (error: any) {
    console.error(
      "Add Category failed:",
      error.response?.data || error.message
    );
    throw new Error(error.response?.data?.message || "Add Category failed");
  }
};

export default {
  addCategory,
  getCategory,
};
