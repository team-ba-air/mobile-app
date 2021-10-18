import React from 'react'
import Icon from 'react-native-vector-icons/Ionicons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import HomeScreen from "scenes/home";
import ReservationNavigator from './reservation-navigator';
import StartOnboarding from 'scenes/onboarding/StartOnboarding';

const RouteConfig = {
  Home: {
    screen: HomeScreen,
    navigationOptions: {
      tabBarIcon: () => <Icon name={'home'} />
    }
  },
  History: {
    screen: HomeScreen
  },
}

const BottomNavigator = createBottomTabNavigator()

const AppNavigator = () => {
  return <BottomNavigator.Navigator>
      <BottomNavigator.Screen options={{ headerShown: false }} name='HomeTab' component={ReservationNavigator} />
      <BottomNavigator.Screen name='History' component={StartOnboarding} />
    </BottomNavigator.Navigator>
}

export default AppNavigator