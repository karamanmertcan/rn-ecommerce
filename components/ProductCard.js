import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { Card, Button } from 'react-native-elements';
import { useNavigation } from '@react-navigation/native';
import { useAtom } from 'jotai';
import { addItemToCart } from '../store';

const ProductCard = (props) => {
  const [addItem, addItemSet] = useAtom(addItemToCart);

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
            height: 'auto',
            justifyContent: 'center',
            alignItems: 'center',
            width: '100%',
            borderRadius: 20
          }}>
          <Card.Title>{props.title.slice(0, 10)}</Card.Title>
          <Card.Image
            resizeMode='cover'
            source={{
              uri: props.image
            }}></Card.Image>
          <Text style={{ marginBottom: 10 }}>
            {props.description.slice(0, 20)} {'...'}
          </Text>
          <Text style={styles.price}>{props.price} TL</Text>
          <Button
            buttonStyle={{
              borderRadius: 20,
              marginLeft: 0,
              marginRight: 0,
              marginBottom: 0,
              marginTop: 10,
              backgroundColor: '#E83C62'
            }}
            onPress={() => {
              // navigation.navigate('ProductDetail', {
              //   itemId: props.id
              // });
              addItemSet(props);
            }}
            title="WOM'LA"
          />
        </Card>
      </View>
    </TouchableOpacity>
  );
};

export default ProductCard;

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
