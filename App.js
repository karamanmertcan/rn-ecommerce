import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import HomeScreen from './Screens/HomeScreen';
import LoginScreen from './Screens/LoginScreen';
import ProductDetailsScreen from './Screens/ProductDetailsScreen';
import AsyncStorage from '@react-native-async-storage/async-storage';
import CartScreen from './Screens/CartScreen';
import Account from './Screens/Account';
import { signedIn } from './store';
import { useAtom } from 'jotai';

const Stack = createNativeStackNavigator();

const Tab = createBottomTabNavigator();
function TabNavBar() {
  return (
    <Tab.Navigator>
      <Tab.Screen
        name='Ana Sayfa'
        component={HomeScreen}
        options={{
          headerShown: false,
          tabBarIcon: ({ color, size }) => <Ionicons name='ios-home' size={size} color={color} />
        }}
      />
      <Tab.Screen
        name='Sepet'
        component={CartScreen}
        options={{
          headerShown: false,
          tabBarIcon: ({ color, size }) => <Ionicons name='ios-cart' size={size} color={color} />
        }}
      />
      <Tab.Screen
        name='Hesabim'
        component={Account}
        options={{
          headerShown: false,
          tabBarIcon: ({ color, size }) => <Ionicons name='ios-person' size={size} color={color} />
        }}
      />
    </Tab.Navigator>
  );
}

export default function App() {
  const [signIn, signInSet] = useAtom(signedIn);
  const getTokenFromStorage = async () => {
    try {
      const value = await AsyncStorage.getItem('auth');
      const newValue = JSON.parse(value);
      console.log(newValue);
      if (newValue.token) {
        // We have data!!
        signInSet(true);

        console.log(signIn);
      }
    } catch (e) {
      console.log(e);
      signInSet(false);

      // error reading value
    }
  };

  useEffect(() => {
    getTokenFromStorage();
    console.log(signIn);
  }, []);

  // const []
  return (
    <NavigationContainer>
      <Stack.Navigator>
        {signIn ? (
          <Stack.Screen
            name='Login'
            component={LoginScreen}
            options={{
              headerShown: false
            }}
          />
        ) : (
          <>
            <Stack.Screen
              name='Tab'
              component={TabNavBar}
              options={{
                headerShown: false
              }}
            />

            <Stack.Screen
              name='Home'
              component={HomeScreen}
              options={{
                headerShown: false
              }}
            />

            <Stack.Screen
              name='ProductDetail'
              component={ProductDetailsScreen}
              options={{
                headerShown: false
              }}
            />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}

{
  /* <Tab.Navigator>
        <Tab.Screen name="Home" component={HomeScreen} />
        <Tab.Screen name="Login" component={LoginScreen} />
      </Tab.Navigator> */
}
