import React from 'react'
import { createStackNavigator } from '@react-navigation/stack';
import EmailOnboarding from 'scenes/authentication/EmailOnboarding';
import PhoneOnboarding from 'scenes/authentication/PhoneOnboarding';
import NameOnboarding from 'scenes/authentication/NameOnboarding';
import WelcomingCarOnboarding from 'scenes/authentication/WelcomingCarOnboarding';
import AddInfoCar from 'scenes/authentication/info-car/AddInfoCar';
import CarList from 'scenes/authentication/car-list/CarList';
import Navbar from 'components/Navbar';
import AppNavigator from './app-navigator';
import NavbarApp from 'components/NavbarApp';
import ServiceReservation from 'scenes/reservation/ServiceReservation';
import BengkelReservation from 'scenes/reservation/BengkelReservation';
import BengkelFormReservation from 'scenes/reservation/BengkelFormReservation';
import CheckoutScreen from 'scenes/checkout/CheckoutScreen';
import SuccessReservation from 'scenes/checkout/SuccessReservation';
import WelcomeScreen from 'scenes/welcome/WelcomeScreen';
import SplashScreen from 'scenes/welcome/SplashScreen';

const Stack = createStackNavigator();

const RootNavigator: React.FC<any> = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen options={{ headerShown: false }} name='SplashScreen' component={SplashScreen} />
      <Stack.Screen options={{ headerShown: false }} name='WelcomeScreen' component={WelcomeScreen} />
      <Stack.Screen options={{ header: () => <Navbar />}} name='EmailOnboarding' component={EmailOnboarding} />
      <Stack.Screen options={{ header: () => <Navbar />}} name='PhoneOnboarding' component={PhoneOnboarding} />
      <Stack.Screen options={{ header: () => <Navbar />}} name='NameOnboarding' component={NameOnboarding} />
      <Stack.Screen options={{ header: () => <Navbar />}} name='WelcomingCarOnboarding' component={WelcomingCarOnboarding} />
      <Stack.Screen options={{ header: () => <Navbar />}} name='AddInfoCar' component={AddInfoCar} />
      <Stack.Screen options={{ header: () => <Navbar />}} name='CarList' component={CarList} />
      <Stack.Screen options={{ headerShown: false }} name='Home' component={AppNavigator} />
      <Stack.Screen options={{ header: ({ navigation }) => <NavbarApp navigation={navigation} title={'Pilih Servis'}/> }} name='ServiceReservation' component={ServiceReservation} />
      <Stack.Screen name='BengkelReservation' component={BengkelReservation} />
      <Stack.Screen name='BengkelFormReservation' component={BengkelFormReservation} />
      <Stack.Screen name='CheckoutScreen' component={CheckoutScreen} />
      <Stack.Screen options={{ headerShown: false }} name='SuccessReservation' component={SuccessReservation} />
    </Stack.Navigator>
  )
}

export default RootNavigator