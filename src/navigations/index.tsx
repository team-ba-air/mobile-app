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
import HomeNavigator from './bottom-navigator';
import Navbar from 'components/Navbar';

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
      <Stack.Screen options={{ headerShown: false }} name='Home' component={HomeNavigator} />
    </Stack.Navigator>
  )
}

// const RootNavigator = createStackNavigator(
//   {
//     Onboarding: OnboardingNavigator,
//     App: BottomNavigator,
//     Reservation: ReservationNavigator,
//   },
//   {
//     initialRouteName: 'Onboarding',
//   }
// )

export default RootNavigator