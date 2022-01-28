import React from 'react'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import HomeScreen from "scenes/home";
import ProfileScreen from 'scenes/profile/ProfileScreen';
import { Image } from 'react-native-elements';
import VehicleScreen from 'scenes/vehicle/VehicleScreen';

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
        component={HomeScreen} 
      />
      <BottomNavigator.Screen 
        options={{
          headerShown: false,
          tabBarIcon: () => <Image source={require('@assets/icon/ic_car_nav.png')} style={{ width: 20, height: 20 }} resizeMode={'contain'} />,
          tabBarLabel: 'Mobil',
        }}
        name='Mobil' 
        component={VehicleScreen} 
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