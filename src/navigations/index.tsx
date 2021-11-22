import React from 'react'
import { createAppContainer, createSwitchNavigator } from "react-navigation";
import { createStackNavigator } from '@react-navigation/stack';
import StartOnboarding from 'scenes/onboarding/StartOnboarding';
import EmailOnboarding from 'scenes/onboarding/EmailOnboarding';
import PhoneOnboarding from 'scenes/onboarding/PhoneOnboarding';
import NameOnboarding from 'scenes/onboarding/NameOnboarding';
import WelcomingCarOnboarding from 'scenes/onboarding/WelcomingCarOnboarding';
import AddInfoCar from 'scenes/onboarding/info-car/AddInfoCar';
import CarList from 'scenes/onboarding/car-list/CarList';
import HomeNavigator from './app-navigator';
import Navbar from 'components/Navbar';
import HomeServiceNavigator from './reservation-navigator';
import AppNavigator from './app-navigator';
import NavbarApp from 'components/NavbarApp';
import ServiceReservation from 'scenes/reservation/ServiceReservation';
import BengkelReservation from 'scenes/reservation/BengkelReservation';
import BengkelFormReservation from 'scenes/reservation/BengkelFormReservation';
import CheckoutScreen from 'scenes/checkout/CheckoutScreen';
import SuccessReservation from 'scenes/checkout/SuccessReservation';

const Stack = createStackNavigator();

const RootNavigator: React.FC<any> = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen options={{ header: () => <Navbar />}} name='StartOnboarding' component={StartOnboarding} />
      <Stack.Screen options={{ header: () => <Navbar />}} name='EmailOnboarding' component={EmailOnboarding} />
      <Stack.Screen options={{ header: () => <Navbar />}} name='PhoneOnboarding' component={PhoneOnboarding} />
      <Stack.Screen options={{ header: () => <Navbar />}} name='NameOnboarding' component={NameOnboarding} />
      <Stack.Screen options={{ header: () => <Navbar />}} name='WelcomingCarOnboarding' component={WelcomingCarOnboarding} />
      <Stack.Screen options={{ header: () => <Navbar />}} name='AddInfoCar' component={AddInfoCar} />
      <Stack.Screen options={{ header: () => <Navbar />}} name='CarList' component={CarList} />
      {/* <Stack.Screen options={{ headerShown: false }} name='App' component={HomeServiceNavigator} /> */}
      <Stack.Screen options={{ headerShown: false }} name='Home' component={AppNavigator} />
      <Stack.Screen options={{ header: ({ navigation }) => <NavbarApp navigation={navigation} title={'Pilih Servis'}/> }} name='ServiceReservation' component={ServiceReservation} />
      <Stack.Screen name='BengkelReservation' component={BengkelReservation} />
      <Stack.Screen name='BengkelFormReservation' component={BengkelFormReservation} />
      <Stack.Screen name='CheckoutScreen' component={CheckoutScreen} />
      <Stack.Screen name='SuccessReservation' component={SuccessReservation} />
    </Stack.Navigator>
  )
}

export default RootNavigator