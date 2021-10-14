import React from 'react';
import ServiceReservation from "scenes/reservation/ServiceReservation"
import HomeScreen from "scenes/home";
import { createStackNavigator } from '@react-navigation/stack'


const ReservationNavigatorConfig = {
  initialRouteName: 'HomeScreen',
  header: null,
}

const RouteConfigs = {
  HomeScreen: {
    screen: HomeScreen,
  },
  ServiceReservation: {
    screen: ServiceReservation,
  },
}

const Stack = createStackNavigator()

const HomeServiceNavigator: React.FC<any> = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen options={{ headerShown: false }} name='HomeScreen' component={HomeScreen} />
      <Stack.Screen name='ServiceReservation' component={ServiceReservation} />
    </Stack.Navigator>
  )
}

export default HomeServiceNavigator