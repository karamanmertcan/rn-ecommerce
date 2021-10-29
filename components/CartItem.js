import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { Card, Button } from 'react-native-elements';
import { useNavigation } from '@react-navigation/native';

const CartItem = (props) => {
  const navigation = useNavigation();
  return (
    <TouchableOpacity
      onPress={() => {
        navigation.navigate('ProductDetail', {
          itemId: props.id
        });
      }}>
      <View style={styles.container}>
        <Card
          containerStyle={{
            height: 430,
            justifyContent: 'center',
            alignItems: 'center',
            width: '100%'
          }}>
          <Card.Title>{props.title}</Card.Title>
          <Card.Image
            resizeMode="cover"
            source={{
              uri: props.image
            }}></Card.Image>
          <Text style={{ marginBottom: 10 }}>
            {props.description.slice(0, 20)} {'...'}
          </Text>
          <Text style={styles.price}>{props.price} TL</Text>
          <Button
            style={styles.button}
            buttonStyle={{
              borderRadius: 0,
              marginLeft: 0,
              marginRight: 0,
              marginBottom: 0,
              marginTop: 10
            }}
            onPress={() => {
              navigation.navigate('ProductDetail', {
                itemId: props.id
              });
            }}
            title="VIEW NOW"
          />
        </Card>
      </View>
    </TouchableOpacity>
  );
};

export default CartItem;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  price: {
    fontSize: 20
  }
});
