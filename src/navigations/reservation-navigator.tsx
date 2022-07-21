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
import InformasiTagihanScreen from 'scenes/checkout/informasi-tagihan/InformasiTagihanScreen';
import BackButtonIcon from 'components/BackButtonIcon';
import { Platform } from 'react-native';

const Stack = createStackNavigator()

const ReservationNavigator: React.FC<any> = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen 
        options={{ headerShown: false }} 
        name='HomeScreen' 
        component={HomeScreen}  />
      <Stack.Screen 
        options={{ 
          header: ({ navigation }) => <NavbarApp navigation={navigation} title={'Progres Servis'} type='secondary' />
        }} 
        name='ProgressService' 
        component={ProgressServiceScreen}  />
      <Stack.Screen 
        options={{ 
          header: ({ navigation }) => <NavbarApp navigation={navigation} title={'Komponen Tambahan'} type='secondary' />
        }} 
        name='AdditionalComponent' 
        component={AdditionalComponentScreen}  />
      <Stack.Screen 
        options={{ 
          header: ({ navigation }) => <NavbarApp navigation={navigation} title={'Informasi Tagihan'} type='secondary' />
        }} 
        name='InformasiTagihan' 
        component={InformasiTagihanScreen}  />
      <Stack.Screen 
        options={{ headerShown: false }} 
        name='Maps' 
        component={MapsScreen} />
      <Stack.Screen 
        options={{ 
          header: ({ navigation }) => <NavbarApp navigation={navigation} title={'Pilih Jenis Servis'} type='secondary' />
        }} 
        name='ServiceType' 
        component={ServiceReservation} />
      <Stack.Screen 
        options={{ 
          header: ({ navigation }) => <BackButtonIcon navigation={navigation} />,
          headerTransparent: true,
          headerMode: Platform.OS === 'android' ? 'float' : 'screen',
        }} 
        name='BengkelFormReservation' 
        component={BengkelFormReservation} />
      <Stack.Screen 
        options={{
          header: ({ navigation }) => <NavbarApp navigation={navigation} title={'Checkout'} type='secondary' />
        }}
        name='CheckoutScreen' 
        component={CheckoutScreen} />
      <Stack.Screen 
        options={{
          header: ({ navigation }) => <NavbarApp navigation={navigation} title={'Pilih Metode Pembayaran'} type='secondary' />
        }}
        name='SelectPayment' 
        component={SelectPaymentScreen} />
      <Stack.Screen 
        options={{
          header: ({ navigation }) => <NavbarApp navigation={navigation} title={'Konfirmasi Pembayaran'} type='secondary' />
        }}
        name='PaymentDetail' 
        component={PaymentDetailScreen} />
      <Stack.Screen name='SuccessReservation' component={SuccessReservation} />
    </Stack.Navigator>
  )
}

export default ReservationNavigator