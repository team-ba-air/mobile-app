import React from 'react';
import ServiceReservation from "scenes/reservation/ServiceReservation"
import HomeScreen from "scenes/home";
import { createStackNavigator } from '@react-navigation/stack'
import BengkelFormReservation from 'scenes/reservation/bengkel/BengkelFormReservation';
import NavbarApp from 'components/NavbarApp';
import CheckoutScreen from 'scenes/checkout/CheckoutScreen';
import SuccessReservation from 'scenes/checkout/SuccessReservation';
import AppNavigator from './app-navigator';
import MapsScreen from 'scenes/home/maps/MapsScreen';

const Stack = createStackNavigator()

const ReservationNavigator: React.FC<any> = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen 
        options={{ headerShown: false }} 
        name='HomeScreen' 
        component={HomeScreen}  />
      <Stack.Screen 
        options={{ headerShown: false }} 
        name='Maps' 
        component={MapsScreen} />
      <Stack.Screen 
        options={{ header: ({ navigation }) => <NavbarApp navigation={navigation} title={'Pilih Servis'}/> }} 
        name='ServiceReservation' 
        component={ServiceReservation} />
      <Stack.Screen 
        options={{ headerShown: false }} 
        name='BengkelFormReservation' 
        component={BengkelFormReservation} />
      <Stack.Screen name='CheckoutScreen' component={CheckoutScreen} />
      <Stack.Screen name='SuccessReservation' component={SuccessReservation} />
    </Stack.Navigator>
  )
}

export default ReservationNavigator