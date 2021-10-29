import React, { useState, useEffect } from 'react';
import { StyleSheet, View, ScrollView, LogBox, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { FlatGrid } from 'react-native-super-grid';
import CarouselCards from '../components/CarouselCards';
import ProductCard from '../components/ProductCard';
import { signedIn } from '../store';
import { useAtom } from 'jotai';

const HomeScreen = () => {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const getProducts = async (abort) => {
    setIsLoading(true);
    try {
      const res = await fetch('https://fakestoreapi.com/products/', { signal: abort });
      const data = await res.json();
      console.log(data);

      setProducts(data);
      setIsLoading(false);
    } catch (error) {
      console.error(error);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const abortController = new AbortController();
    const signal = abortController.signal;
    LogBox.ignoreLogs([
      'VirtualizedLists should never be nested inside plain ScrollViews with the same orientation - use another VirtualizedList-backed container instead.'
    ]);

    getProducts(signal);

    return function cleanup() {
      abortController.abort();
    };
  }, []);
  return (
    <SafeAreaView>
      <View>
        <ScrollView>
          <View style={styles.container}>
            <CarouselCards />
          </View>

          <View style={styles.products}>
            {isLoading ? (
              <Text>Loading...</Text>
            ) : (
              <FlatGrid
                itemDimension={130}
                data={products}
                style={styles.gridView}
                spacing={10}
                renderItem={({ item }) => <ProductCard {...item} />}
              />
            )}
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    padding: 20
  },
  products: {
    minHeight: 300
  },
  gridView: {
    marginTop: 10,
    flex: 1
  }
});
