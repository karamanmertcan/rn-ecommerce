import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, ActivityIndicator, ScrollView } from 'react-native';
import { cartItems } from '../store';
import { useAtom } from 'jotai';
import { FlatGrid } from 'react-native-super-grid';
import CartItem from '../components/CartItem';

import AsyncStorage from '@react-native-async-storage/async-storage';

const CartScreen = (props) => {
  const [localCartItems, setLocalCartItems] = useState([]);

  const addItems = async () => {
    const value = await AsyncStorage.getItem('cart');
    const bakeToJson = value && JSON.parse(value);

    if (value !== null && bakeToJson.length >= 1) {
      setLocalCartItems(bakeToJson);
    } else {
      setLocalCartItems([]);
    }
  };

  useEffect(() => {
    addItems();
    return () => {
      setLocalCartItems([]);
    };
  }, [props]);

  addItems();

  return (
    <View style={styles.cartItemContainer}>
      <ScrollView>
        {localCartItems.length > 0 ? (
          localCartItems?.map((item, index) => <CartItem key={index} {...item} />)
        ) : (
          <View
            style={{
              flex: 1,
              justifyContent: 'center',
              alignItems: 'center'
            }}>
            <Text
              style={{
                fontSize: 30
              }}>
              Sepet Bos
            </Text>
          </View>
        )}
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
