import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from './Screens/HomeScreen';
import LoginScreen from './Screens/LoginScreen';
import ProductDetailsScreen from './Screens/ProductDetailsScreen';
import AsyncStorage from '@react-native-async-storage/async-storage';
import CartScreen from './Screens/CartScreen';

const Stack = createNativeStackNavigator();

const Tab = createBottomTabNavigator();
function TabNavBar() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Cart" component={CartScreen} />
    </Tab.Navigator>
  );
}

export default function App() {
  const [signedIn, setSignedIn] = useState(false);
  const getTokenFromStorage = async () => {
    try {
      const value = await AsyncStorage.getItem('token');
      if (value !== null) {
        // We have data!!
        setSignedIn(true);
        console.log(value);
      }
    } catch (e) {
      console.log(e);
      setSignedIn(false);

      // error reading value
    }
  };

  useEffect(() => {
    getTokenFromStorage();
  }, []);

  // const []
  return (
    <NavigationContainer>
      <Stack.Navigator>
        {signedIn && (
          <Stack.Screen
            name="Login"
            component={LoginScreen}
            options={{
              headerShown: false
            }}
          />
        )}
        <Stack.Screen
          name="Tab"
          component={TabNavBar}
          options={{
            headerShown: false
          }}
        />

        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{
            headerShown: false
          }}
        />

        <Stack.Screen
          name="ProductDetail"
          component={ProductDetailsScreen}
          options={{
            headerShown: false
          }}
        />
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
