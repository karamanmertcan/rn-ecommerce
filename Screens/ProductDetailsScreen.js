import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image, ActivityIndicator, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Button } from 'react-native-elements';

const Spinner = () => {
  return (
    <View style={[styles.containerSpinner, styles.horizontal]}>
      <ActivityIndicator size="large" color="#0984e3" />
    </View>
  );
};

const ProductDetailsScreen = ({ route }) => {
  const { itemId } = route.params;

  const [singleProduct, setSingleProduct] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const getSingleProduct = async (id) => {
    const res = await fetch(`https://fakestoreapi.com/products/${id}`);
    const data = await res.json();

    setSingleProduct(data);

    setIsLoading(false);
  };

  useEffect(() => {
    getSingleProduct(itemId);

    return () => {
      setSingleProduct(null);
    };
  }, [route, itemId]);

  return (
    <SafeAreaView>
      <ScrollView>
        {isLoading ? (
          <Spinner />
        ) : (
          <View style={styles.container}>
            <View style={styles.imageContainer}>
              <Image
                resizeMode="contain"
                source={{
                  uri: singleProduct?.image
                }}
                style={{
                  height: 400,
                  width: '100%'
                }}
              />
            </View>
            <View style={styles.textContainer}>
              <Text>{singleProduct?.title}</Text>
            </View>
            <View style={styles.textContainer}>
              <Text>{singleProduct?.description}</Text>
            </View>
            <View style={styles.stockText}>
              <Text
                style={{
                  fontSize: 20,
                  fontWeight: 'bold'
                }}>
                Stock : {singleProduct?.rating?.count}
              </Text>
              <Text
                style={{
                  fontSize: 20,
                  fontWeight: 'bold'
                }}>
                Price : {singleProduct?.price} TL
              </Text>
            </View>

            <View
              style={{
                marginTop: 40,
                height: 100,
                width: '100%',
                alignItems: 'center'
              }}>
              <Button
                buttonStyle={{
                  borderRadius: 0,
                  marginLeft: 0,
                  marginRight: 0,
                  marginBottom: 0,
                  marginTop: 10,
                  width: 200
                }}
                onPress={() => {
                  console.log('selam');
                }}
                title="VIEW NOW"
              />
            </View>
          </View>
        )}
      </ScrollView>
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
  containerSpinner: {
    flex: 1,
    justifyContent: 'center',
    width: '100%',
    height: 700
  },
  horizontal: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 10
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
    flex: 1,
    flexDirection: 'row',
    padding: 20,
    paddingTop: 60,
    justifyContent: 'space-between',
    alignItems: 'flex-start'
  }
});
