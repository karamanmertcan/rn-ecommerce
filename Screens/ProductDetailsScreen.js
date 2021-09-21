import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const ProductDetailsScreen = () => {
  return (
    <SafeAreaView>
      <View style={styles.container}>
        <View style={styles.imageContainer}>
          <Image
            resizeMode="contain"
            source={{
              uri: 'https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg'
            }}
            style={{
              height: 400,
              width: '100%'
            }}
          />
        </View>

        <View style={styles.textContainer}>
          <Text>Fjallraven - Foldsack No. 1 Backpack, Fits 15 Laptops</Text>
        </View>

        <View style={styles.textContainer}>
          <Text>
            Your perfect pack for everyday use and walks in the forest. Stash your laptop (up to 15
            inches) in the padded sleeve, your everyday
          </Text>
        </View>

        <View style={styles.stockText}>
          <Text>Stock : 15</Text>
          <Text>Stock : 15</Text>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default ProductDetailsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    backgroundColor: '#fff'
  },
  imageContainer: {
    height: 400,
    width: '100%',
    backgroundColor: '#fff'
  },
  textContainer: {
    padding: 20
  },
  stockText: {
    marginTop: 30,
    padding: 20
  }
});
