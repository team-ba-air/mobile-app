import React from 'react'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import HomeScreen from "scenes/home";
import StartOnboarding from 'scenes/onboarding/StartOnboarding';
import ProfileScreen from 'scenes/profile/ProfileScreen';

const BottomNavigator = createBottomTabNavigator()

const AppNavigator = () => {
  return <BottomNavigator.Navigator>
      <BottomNavigator.Screen options={{ headerShown: false, tabBarIcon: () => <Icon name='home' size={30}/>, tabBarLabel: 'Home' }} name='HomeTab' component={HomeScreen} />
      <BottomNavigator.Screen name='Profile' component={ProfileScreen} />
    </BottomNavigator.Navigator>
}

export default AppNavigator