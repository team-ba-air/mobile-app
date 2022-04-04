import React from 'react'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import HomeScreen from "scenes/home";
import ProfileScreen from 'scenes/profile/ProfileScreen';
import { Image } from 'react-native-elements';
import VehicleScreen from 'scenes/vehicle/VehicleScreen';
import NavbarApp from 'components/NavbarApp';
import VehicleNavigator from './vehicle-navigator';
import ReservationNavigator from './reservation-navigator';

const BottomNavigator = createBottomTabNavigator()

const AppNavigator = () => {
  return <BottomNavigator.Navigator>
      <BottomNavigator.Screen 
        options={{ 
          headerShown: false, 
          tabBarIcon: () => <Image source={require('@assets/icon/ic_home.png')} style={{ width: 20, height: 20 }} resizeMode={'contain'} />, 
          tabBarLabel: 'Home',
        }} 
        name='HomeTab' 
        component={ReservationNavigator} 
      />
      <BottomNavigator.Screen 
        options={{
          headerShown: false,
          tabBarIcon: () => <Image source={require('@assets/icon/ic_car_nav.png')} style={{ width: 20, height: 20 }} resizeMode={'contain'} />,
          tabBarLabel: 'Mobil',
        }}
        name='Mobil' 
        component={VehicleNavigator} 
      />
      <BottomNavigator.Screen 
        options={{ 
          tabBarIcon: () => <Image source={require('@assets/icon/ic_profile.png')} style={{ width: 20, height: 20 }} resizeMode={'contain'} />,
          tabBarLabel: 'Profil',
        }} 
        name='Profile'
        component={ProfileScreen}
      />
    </BottomNavigator.Navigator>
}

export default AppNavigator