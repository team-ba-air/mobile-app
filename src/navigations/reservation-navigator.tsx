import React from 'react';
import ServiceReservation from "scenes/reservation/ServiceReservation"
import HomeScreen from "scenes/home";
import { createStackNavigator } from '@react-navigation/stack'
import BengkelReservation from 'scenes/reservation/BengkelReservation';
import BengkelFormReservation from 'scenes/reservation/BengkelFormReservation';
import NavbarApp from 'components/NavbarApp';
import { Icon } from 'react-native-elements/dist/icons/Icon';

const Stack = createStackNavigator()

const HomeServiceNavigator: React.FC<any> = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen options={{ headerShown: false }} name='Home' component={HomeScreen} />
      <Stack.Screen options={{ header: ({ navigation }) => <NavbarApp navigation={navigation} title={'Pilih Servis'}/> }} name='ServiceReservation' component={ServiceReservation} />
      <Stack.Screen name='BengkelReservation' component={BengkelReservation} />
      <Stack.Screen name='BengkelFormReservation' component={BengkelFormReservation} />
    </Stack.Navigator>
  )
}

export default HomeServiceNavigator