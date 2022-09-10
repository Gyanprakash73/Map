import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import LoginScreen from './LoginScreen';
import HomeScreen from './HomeScreen';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import BottomScreen1 from './BottomScreen1';
import BottomScreen2 from './BottomScreen2';
import BottomScreen3 from './BottomScreen3';

const Stack = createStackNavigator();

const Navigation = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="LoginScreen">
        <Stack.Screen
          name="LoginScreen"
          component={LoginScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="HomeScreen"
          component={HomeScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="BottomScreen1"
          component={BottomScreen1}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="BottomScreen2"
          component={BottomScreen2}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="BottomScreen3"
          component={BottomScreen3}
          options={{headerShown: false}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigation;
