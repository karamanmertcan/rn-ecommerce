import { atom } from 'jotai';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

export const user = atom({});

export const cartItems = atom([]);

export const signedIn = atom(false);

export const loginUser = atom(
  () => '',
  async (get, set, userData) => {
    const { data } = await axios.post(
      'https://wom-danismanlik-backend.herokuapp.com/api/login',
      userData
    );
    const dataJSON = JSON.stringify(data);
    console.log(dataJSON);

    set(user, data);
    await AsyncStorage.setItem('auth', dataJSON);
    set(signedIn, true);
  }
);

export const logoutUser = atom(
  (get) => get(signedIn),
  async (get, set) => {
    set(user, {});
    await AsyncStorage.removeItem('auth');
    set(signedIn, false);
    console.log('logged out');
  }
);

export const addItemToCart = atom(
  () => '',
  async (get, set, product) => {
    const getItemsFromLocal = await AsyncStorage.getItem('cart');
    const itemToParse = getItemsFromLocal && JSON.parse(getItemsFromLocal);

    if (getItemsFromLocal !== null && itemToParse.length >= 1) {
      const existItem = itemToParse.find((item) => item.id === product.id);
      if (!existItem) {
        const jsonValue = JSON.stringify([...itemToParse, product]);
        await AsyncStorage.setItem('cart', jsonValue);
        console.log('local storage is not available');
      }
    } else {
      const newCartItems = [product];
      console.log('newCartItems', newCartItems);

      await AsyncStorage.setItem('cart', JSON.stringify(newCartItems));
    }
  }
);

export const removeFromCart = atom(
  () => '',
  async (get, set, product) => {
    const getItemsFromLocal = await AsyncStorage.getItem('cart');
    const itemToParse = getItemsFromLocal && JSON.parse(getItemsFromLocal);

    const filterItems = itemToParse.filter((item) => item.id !== product.id);
    console.log(filterItems);
    const newCartItems = filterItems;

    await AsyncStorage.setItem('cart', JSON.stringify(filterItems));
  }
);
