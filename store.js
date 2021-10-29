import { atom } from 'jotai';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

export const user = atom({});

export const cartItems = atom([]);

export const loginUser = atom(
  () => '',
  async (get, set, userData) => {
    const { data } = await axios.post('http://172.20.10.2:8000/api/login', userData);
    const dataJSON = JSON.stringify(data);
    console.log(dataJSON);

    set(user, data);
    await AsyncStorage.setItem('auth', dataJSON);
  }
);

export const addItemToCart = atom(
  () => '',
  async (get, set, product) => {
    const localValue = await AsyncStorage.getItem('cart');
    const bakeToJson = localValue && JSON.parse(localValue);
    console.log('Baketojson', bakeToJson);

    if (localValue !== null) {
      const oldObject = bakeToJson.find((item) => item.id === product.id);

      if (!oldObject) {
        const newCartItems = [...bakeToJson, product];
        set(cartItems, newCartItems);
        await AsyncStorage.setItem('cart', JSON.stringify(newCartItems));
      } else {
        console.log('item already in cart');
      }
    }
  }
);
