import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, ActivityIndicator, ScrollView } from 'react-native';
import { cartItems } from '../store';
import { useAtom } from 'jotai';
import { FlatGrid } from 'react-native-super-grid';
import CartItem from '../components/CartItem';

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
    <View style={styles.cartItemContainer}>
      <ScrollView>
        {localCartItems.map((item, index) => (
          <CartItem key={index} {...item} />
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  cartItemContainer: {
    height: 'auto',
    width: '100%',
    flex: 1
  },

  item: {
    display: 'flex',
    flexDirection: 'row',
    width: '100%'
  }
});

export default CartScreen;
