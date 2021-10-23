import React from 'react'
import Icon from 'react-native-vector-icons/Ionicons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import HomeScreen from "scenes/home";
import ReservationNavigator from './reservation-navigator';
import StartOnboarding from 'scenes/onboarding/StartOnboarding';
import { SvgXml } from 'react-native-svg';

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
      <BottomNavigator.Screen options={({route}) => {
        console.log(route)
        return ({ headerShown: false })
        }} name='HomeTab' component={ReservationNavigator} />
      <BottomNavigator.Screen name='History' component={StartOnboarding} />
    </BottomNavigator.Navigator>
}

export default AppNavigator