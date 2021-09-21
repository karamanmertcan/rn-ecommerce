import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Input, Button } from 'react-native-elements';
import { useForm, Controller } from 'react-hook-form';

const LoginScreen = ({ navigation }) => {
  const { control, handleSubmit } = useForm();

  const onSubmit = (data) => console.log(data);
  return (
    <View style={styles.container}>
      <Text style={styles.loginHeader}>Login Page</Text>
      <Controller
        control={control}
        rules={{
          required: true
        }}
        render={({ field: { onChange, onBlur, value } }) => (
          <Input
            placeholder="Email"
            leftIcon={{ type: 'font-awesome', name: 'envelope' }}
            onChangeText={onChange}
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
            onChangeText={onChange}
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
        onPress={() => {
          handleSubmit(onSubmit);
          navigation.navigate('Home');
        }}
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
