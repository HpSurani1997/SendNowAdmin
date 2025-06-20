import axios from 'axios';

const baseUrl = "https://sendnow.app/";



const getMarketPlace = async (token: string) => {
  try {
    const response = await axios.get(
      `${baseUrl}api/admin/parcel`, // Replace with your API URL
      {
        headers: {
          'x-access-token': token,
        },
      },
    );

    return response.data; // Return response data
  } catch (error: any) {
    console.error('getParcel failed:', error.response?.data || error.message);
    throw new Error(error.response?.data?.message || 'getParcel failed');
  }
};
export default { getMarketPlace};
