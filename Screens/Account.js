import React from 'react';
import { useAtom } from 'jotai';
import { View, Text, StyleSheet, Button } from 'react-native';
import { StackActions } from '@react-navigation/native';
import { useNavigation } from '@react-navigation/native';
import { logoutUser, signedIn } from '../store';

const Account = () => {
  const [signIn, signInSet] = useAtom(signedIn);

  console.log(signIn);

  const [logoutFunction, logoutFunctionSet] = useAtom(logoutUser);
  const navigation = useNavigation();

  return (
    <View>
      <View style={styles.container}>
        <Button
          style={styles.buttonStyle}
          title="Log out"
          onPress={() => {
            logoutFunctionSet();
            signInSet(false);
            console.log(signIn);

            // navigation.dispatch(StackActions.popToTop());
          }}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    height: '100%'
  },
  buttonStyle: {
    height: 1000,
    width: 100
  }
});

export default Account;
