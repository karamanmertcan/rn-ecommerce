import React from 'react';
import { View, StyleSheet } from 'react-native';

const Header = () => {
  return <View style={styles.header}></View>;
};

export default Header;

const styles = StyleSheet.create({
  header: {
    width: '100%',
    height: 50,
    backgroundColor: '#f5f5f5'
  }
});
