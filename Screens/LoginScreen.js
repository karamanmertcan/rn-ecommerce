import React, { useEffect } from 'react';
import axios from 'axios';
import { View, Text, StyleSheet } from 'react-native';
import { Input, Button } from 'react-native-elements';
import { useForm, Controller } from 'react-hook-form';
import AsyncStorage from '@react-native-async-storage/async-storage';

const LoginScreen = ({ navigation }) => {
  const { control, handleSubmit, register } = useForm();

  useEffect(() => {
    getTokenFromStorage();
  }, [navigation]);

  const getTokenFromStorage = async () => {
    const value = await AsyncStorage.getItem('auth');
    const token = JSON.parse(value);
    console.log(token.token);
    if (token.token) {
      navigation.navigate('Home');
    } else {
      navigation.navigate('Login');
    }
  };

  const onSubmit = async (input) => {
    console.log(input);
    try {
      console.log('selam');

      const { data } = await axios.post('http://172.20.10.2:8000/api/login', {
        email: input.email,
        password: input.password
      });
      await AsyncStorage.setItem('auth', JSON.stringify(data));
      // const value = await AsyncStorage.getItem('auth');
      console.log(value);
    } catch (error) {
      console.log(error);
    }
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
          handleSubmit(onSubmit)
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
