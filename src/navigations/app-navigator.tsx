import React from 'react'
import Icon from 'react-native-vector-icons/Ionicons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import HomeScreen from "scenes/home";
import StartOnboarding from 'scenes/onboarding/StartOnboarding';
import Home from 'assets/icon/home.svg'

const BottomNavigator = createBottomTabNavigator()

const AppNavigator = () => {
  return <BottomNavigator.Navigator>
      <BottomNavigator.Screen options={{ headerShown: false }} name='HomeTab' component={HomeScreen} />
      <BottomNavigator.Screen name='History' component={StartOnboarding} />
    </BottomNavigator.Navigator>
}

export default AppNavigator