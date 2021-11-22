import React from 'react'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import HomeScreen from "scenes/home";
import StartOnboarding from 'scenes/onboarding/StartOnboarding';
import ProfileScreen from 'scenes/profile/ProfileScreen';
import { Image } from 'react-native-elements';

const BottomNavigator = createBottomTabNavigator()

const AppNavigator = () => {
  return <BottomNavigator.Navigator>
      <BottomNavigator.Screen options={{ headerShown: false, tabBarIcon: () => <Image source={require('@assets/icon/ic_home.png')} style={{ width: 20, height: 20 }} resizeMode={'contain'} />, tabBarLabel: 'Home' }} name='HomeTab' component={HomeScreen} />
      <BottomNavigator.Screen options={{ tabBarIcon: () => <Image source={require('@assets/icon/ic_profile.png')} style={{ width: 20, height: 20 }} resizeMode={'contain'} /> }} name='Profile' component={ProfileScreen} />
    </BottomNavigator.Navigator>
}

export default AppNavigator