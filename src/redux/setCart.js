import { fetchCartData } from './fatchCart'; // Adjust the import path
import { setCart } from './cartSlice'; // Adjust the import path
import store from './store'; // Adjust the import path


export const initializeCart = async (userId) => {
  const cartData = await fetchCartData(userId);
  if (cartData) {
    store.dispatch(setCart(cartData));
    localStorage.setItem('cart', JSON.stringify(cartData));
  }
};