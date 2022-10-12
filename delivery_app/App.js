import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AllProducts from './app/screens/AllProducts';
import Checkout from './app/screens/Checkout';
import CheckoutSuccess from './app/screens/CheckoutSuccess';
import ShoppingCart from './app/screens/ShoppingCart';
import UserAccount from './app/screens/UserAccount';
import UserLogin from './app/screens/UserLogin';

const Stack = createNativeStackNavigator();

export default function App() {

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={
        { headerShown: false }
      }>
        <Stack.Screen name='all-products' component={AllProducts} />
        <Stack.Screen name='shopping-cart' component={ShoppingCart} />
        <Stack.Screen name='user-account' component={UserAccount} />
        <Stack.Screen name='user-login' component={UserLogin} />
        <Stack.Screen name='checkout' component={Checkout} />
        <Stack.Screen name='checkout-success' component={CheckoutSuccess} />
      </Stack.Navigator>
    </NavigationContainer>
  )
}
