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
import WelcomeScreen from 'scenes/login/LoginScreen';
import SplashScreen from 'scenes/login/SplashScreen';
import OtpEmailScreen from 'scenes/authentication/otp/OtpEmailScreen';
import OtpPhoneScreen from 'scenes/authentication/otp/OtpPhoneScreen';
import LoginScreen from 'scenes/login/LoginScreen';

const Stack = createStackNavigator();

const RootNavigator: React.FC<any> = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen options={{ headerShown: false }} name='SplashScreen' component={SplashScreen} />
      <Stack.Screen options={{ header: () => <Navbar />}} name='LoginScreen' component={LoginScreen} />
      <Stack.Screen options={{ header: () => <Navbar />}} name='EmailOnboarding' component={EmailOnboarding} />
      <Stack.Screen options={{ header: () => <Navbar />}} name='PhoneOnboarding' component={PhoneOnboarding} />
      <Stack.Screen options={{ header: () => <Navbar />}} name='NameOnboarding' component={NameOnboarding} />
      <Stack.Screen options={{ header: () => <Navbar />}} name='OtpEmailScreen' component={OtpEmailScreen} />
      <Stack.Screen options={{ header: () => <Navbar />}} name='OtpPhoneScreen' component={OtpPhoneScreen} />
      <Stack.Screen options={{ header: () => <Navbar />}} name='WelcomingCarOnboarding' component={WelcomingCarOnboarding} />
      <Stack.Screen options={{ header: () => <Navbar />}} name='AddInfoCar' component={AddInfoCar} />
      <Stack.Screen options={{ header: () => <Navbar />}} name='CarList' component={CarList} />
      <Stack.Screen options={{ headerShown: false }} name='App' component={AppNavigator} />
    </Stack.Navigator>
  )
}

export default RootNavigator