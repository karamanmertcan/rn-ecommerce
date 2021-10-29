import React, { useEffect } from 'react';
import axios from 'axios';
import { useAtom } from 'jotai';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { View, Text, StyleSheet } from 'react-native';
import { Input, Button } from 'react-native-elements';
import { useForm, Controller } from 'react-hook-form';
import { loginUser, user } from '../store';
const LoginScreen = ({ navigation }) => {
  const { control, handleSubmit, register } = useForm();

  const [enter, enterSet] = useAtom(loginUser);
  const [userToken] = useAtom(user);

  // useEffect(() => {
  //   getTokenFromStorage();
  // }, [navigation]);

  const getTokenFromStorage = async () => {
    // const value = await AsyncStorage.getItem('auth');
    // const token = JSON.parse(value);
    // console.log(token.token);
    console.log(userToken);
  };

  const removeTokenFromStorage = async () => {
    const value = await AsyncStorage.getItem('auth');

    await AsyncStorage.removeItem('auth');
    console.log(value);
  };

  const onSubmit = async (input) => {
    // console.log(input);
    enterSet(input);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.loginHeader}>Bewomsta</Text>
      <Controller
        control={control}
        rules={{
          required: true
        }}
        render={({ field: { onChange, onBlur, value } }) => (
          <Input
            placeholder="Email"
            leftIcon={{ type: 'font-awesome', name: 'envelope' }}
            onBlur={onBlur}
            onChangeText={(value) => onChange(value)}
            value={value}
          />
        )}
        name="email"
        defaultValue=""
      />
      <Controller
        control={control}
        rules={{
          required: true
        }}
        render={({ field: { onChange, onBlur, value } }) => (
          <Input
            placeholder="Password"
            leftIcon={{ type: 'font-awesome', name: 'key' }}
            onBlur={onBlur}
            onChangeText={(value) => onChange(value)}
            value={value}
          />
        )}
        name="password"
        defaultValue=""
      />
      <Button
        buttonStyle={{
          width: 150
        }}
        title="Login"
        onPress={
          // removeTokenFromStorage
          // handleSubmit(onSubmit)
          getTokenFromStorage
          // navigation.navigate('Home');
        }
      />
    </View>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 40
  },
  loginHeader: {
    marginBottom: 40,
    fontSize: 40,
    fontWeight: 'bold'
  }
});
