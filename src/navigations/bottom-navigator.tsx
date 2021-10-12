import React from 'react'
import { Button } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/Ionicons';

import { createBottomTabNavigator } from "react-navigation-tabs";
import HomeScreen from "scenes/app/home";

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

const BottomNavigator = createBottomTabNavigator(RouteConfig, {
  initialRouteName: 'Home',
})

export default BottomNavigator