import React from 'react'
import { createStackNavigator } from '@react-navigation/stack';
import EmailOnboarding from 'scenes/authentication/email/EmailOnboarding';
import PhoneOnboarding from 'scenes/authentication/PhoneOnboarding';
import NameOnboarding from 'scenes/authentication/NameOnboarding';
import WelcomingCarOnboarding from 'scenes/authentication/WelcomingCarOnboarding';
import AddInfoCar from 'scenes/authentication/info-car/AddInfoCar';
import CarList from 'scenes/authentication/car-list/CarList';
import Navbar from 'components/Navbar';
import AppNavigator from './app-navigator';
import NavbarApp from 'components/NavbarApp';
import ServiceReservation from 'scenes/reservation/ServiceReservation';
import BengkelFormReservation from 'scenes/reservation/bengkel/BengkelFormReservation';
import CheckoutScreen from 'scenes/checkout/CheckoutScreen';
import SuccessReservation from 'scenes/checkout/SuccessReservation';
import WelcomeScreen from 'scenes/welcome/WelcomeScreen';
import SplashScreen from 'scenes/welcome/SplashScreen';
import OtpEmailScreen from 'scenes/authentication/otp/OtpEmailScreen';
import OtpPhoneScreen from 'scenes/authentication/otp/OtpPhoneScreen';
import UpdateVehicleScreen from 'scenes/vehicle/UpdateVehicleScreen';
import MapsScreen from 'scenes/home/maps/MapsScreen';

const Stack = createStackNavigator();

const RootNavigator: React.FC<any> = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen options={{ headerShown: false }} name='SplashScreen' component={SplashScreen} />
      <Stack.Screen options={{ header: () => <Navbar />}} name='WelcomeScreen' component={WelcomeScreen} />
      <Stack.Screen options={{ header: () => <Navbar />}} name='EmailOnboarding' component={EmailOnboarding} />
      <Stack.Screen options={{ header: () => <Navbar />}} name='PhoneOnboarding' component={PhoneOnboarding} />
      <Stack.Screen options={{ header: () => <Navbar />}} name='NameOnboarding' component={NameOnboarding} />
      <Stack.Screen options={{ header: () => <Navbar />}} name='OtpEmailScreen' component={OtpEmailScreen} />
      <Stack.Screen options={{ header: () => <Navbar />}} name='OtpPhoneScreen' component={OtpPhoneScreen} />
      <Stack.Screen options={{ header: () => <Navbar />}} name='WelcomingCarOnboarding' component={WelcomingCarOnboarding} />
      <Stack.Screen options={{ header: () => <Navbar />}} name='AddInfoCar' component={AddInfoCar} />
      <Stack.Screen options={{ header: () => <Navbar />}} name='CarList' component={CarList} />
      <Stack.Screen options={{ headerShown: false }} name='Home' component={AppNavigator} />
    </Stack.Navigator>
  )
}

export default RootNavigator