import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from "scenes/home";
import ProfileScreen from 'scenes/profile/ProfileScreen';
import { Icon, Image } from 'react-native-elements';
import VehicleScreen from 'scenes/vehicle/VehicleScreen';
import NavbarApp from 'components/NavbarApp';
import VehicleNavigator from './vehicle-navigator';
import ReservationNavigator from './reservation-navigator';
import HistoryScreen from 'scenes/history/HistoryScreen';
import HistoryNavigator from './history-navigator';
import { Color } from 'styles/colors';

const BottomNavigator = createBottomTabNavigator()

const AppNavigator = () => {
  return <BottomNavigator.Navigator>
      <BottomNavigator.Screen 
        options={{ 
          headerShown: false, 
          tabBarIcon: ({ focused }) => <Icon type='material' name='home' size={24} color={focused ? Color.blue[7] : Color.gray[7]} tvParallaxProperties={undefined} />,
          tabBarLabel: 'Home',
        }} 
        name='HomeTab' 
        component={ReservationNavigator} 
      />
      <BottomNavigator.Screen 
        options={{
          headerShown: false,
          tabBarIcon: ({ focused }) => <Icon type='material' name='drive-eta' size={24} color={focused ? Color.blue[7] : Color.gray[7]} tvParallaxProperties={undefined} />,
          tabBarLabel: 'Mobil',
        }}
        name='Vehicle' 
        component={VehicleNavigator} 
      />
      <BottomNavigator.Screen 
        options={{
          headerShown: false,
          tabBarIcon: ({ focused }) => <Icon type='material' name='article' size={24} color={focused ? Color.blue[7] : Color.gray[7]} tvParallaxProperties={undefined} />,
          tabBarLabel: 'History',
        }}
        name='History' 
        component={HistoryNavigator} 
      />
      <BottomNavigator.Screen 
        options={{ 
          headerShown: false,
          tabBarIcon: ({ focused }) => <Icon type='material' name='person' size={24} color={focused ? Color.blue[7] : Color.gray[7]} tvParallaxProperties={undefined} />,
          tabBarLabel: 'Profil',
        }} 
        name='Profile'
        component={ProfileScreen}
      />
    </BottomNavigator.Navigator>
}

export default AppNavigator