import React from 'react';
import ServiceReservation from "scenes/reservation/service-type/ServiceReservation"
import HomeScreen from "scenes/home";
import { createStackNavigator } from '@react-navigation/stack'
import BengkelFormReservation from 'scenes/reservation/bengkel/BengkelFormReservation';
import NavbarApp from 'components/NavbarApp';
import CheckoutScreen from 'scenes/checkout/CheckoutScreen';
import SuccessReservation from 'scenes/checkout/SuccessReservation';
import AppNavigator from './app-navigator';
import MapsScreen from 'scenes/reservation/maps/MapsScreen';
import SelectPaymentScreen from 'scenes/checkout/payment/SelectPaymentScreen';
import PaymentDetailScreen from 'scenes/checkout/payment-detail/PaymentDetailScreen';
import ProgressServiceScreen from 'scenes/home/progress/ProgressServiceScreen';
import AdditionalComponentScreen from 'scenes/home/additional-component/AdditionalComponentScreen';

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
        name='ProgressService' 
        component={ProgressServiceScreen}  />
      <Stack.Screen 
        options={{ headerShown: false }} 
        name='AdditionalComponent' 
        component={AdditionalComponentScreen}  />
      <Stack.Screen 
        options={{ headerShown: false }} 
        name='Maps' 
        component={MapsScreen} />
      <Stack.Screen 
        options={{ headerShown: false }} 
        name='ServiceReservation' 
        component={ServiceReservation} />
      <Stack.Screen 
        options={{ headerShown: false }} 
        name='BengkelFormReservation' 
        component={BengkelFormReservation} />
      <Stack.Screen name='CheckoutScreen' component={CheckoutScreen} />
      <Stack.Screen name='SelectPayment' component={SelectPaymentScreen} />
      <Stack.Screen name='PaymentDetail' component={PaymentDetailScreen} />
      <Stack.Screen name='SuccessReservation' component={SuccessReservation} />
    </Stack.Navigator>
  )
}

export default ReservationNavigator