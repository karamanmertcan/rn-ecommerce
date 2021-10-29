import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, ActivityIndicator, ScrollView } from 'react-native';
import { cartItems } from '../store';
import { useAtom } from 'jotai';
import { FlatGrid } from 'react-native-super-grid';
import { CartItem } from '../components/CartItem';

import AsyncStorage from '@react-native-async-storage/async-storage';

const CartScreen = () => {
  const [localCartItems, setLocalCartItems] = useState([]);

  const addItems = async () => {
    const value = await AsyncStorage.getItem('cart');

    setLocalCartItems(JSON.parse(value));
  };

  useEffect(() => {
    addItems();
  }, [localCartItems]);

  return (
    <View>
      <ScrollView>
        {localCartItems.map((item, index) => (
          <Image
            key={index}
            resizeMode="cover"
            style={{ width: 100, height: 100, marginTop: 10 }}
            source={{
              uri: item.image
            }}></Image>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  item: {
    width: '100%',
    height: 1000,
    backgroundColor: '#3f1d'
  }
});

export default CartScreen;
