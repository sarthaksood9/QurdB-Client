import axios from 'axios';




export const fetchCartData = async (userId) => {
  try {
    const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/api/cart/${userId}`);
    return response.data.products;
  } catch (error) {
    console.log(error);
    return null;
  }
};