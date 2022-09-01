import React from 'react';
import HomeScreen from "scenes/home/HomeScreen";
import { createStackNavigator } from '@react-navigation/stack'
import NavbarApp from 'components/NavbarApp';
import CheckoutScreen from 'scenes/checkout/CheckoutScreen';
import SuccessReservation from 'scenes/checkout/SuccessReservation';
import SelectPaymentScreen from 'scenes/checkout/payment/SelectPaymentScreen';
import PaymentDetailScreen from 'scenes/checkout/payment-detail/PaymentDetailScreen';
import AdditionalComponentScreen from 'scenes/home/additional-component/AdditionalComponentScreen';
import InformasiTagihanScreen from 'scenes/checkout/informasi-tagihan/InformasiTagihanScreen';
import BackButtonIcon from 'components/BackButtonIcon';
import { Platform } from 'react-native';
import ServiceTypeScreen from 'scenes/reservation/service-type/ServiceTypeScreen';
import ShopListScreen from 'scenes/reservation/maps/ShopListScreen';
import ReservationScreen from 'scenes/reservation/bengkel/ReservationScreen';
import ServiceProgressScreen from 'scenes/home/progress/ServiceProgressScreen';

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
        component={ServiceProgressScreen}  />
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
        component={ShopListScreen} />
      <Stack.Screen 
        options={{ 
          header: ({ navigation }) => <NavbarApp navigation={navigation} title={'Pilih Jenis Servis'} type='secondary' />
        }} 
        name='ServiceType' 
        component={ServiceTypeScreen} />
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
      <Stack.Screen 
        options={() => ({ 
          header: ({ navigation }) => <BackButtonIcon navigation={navigation} />,
          headerTransparent: true,
          headerMode: Platform.OS === 'android' ? 'float' : 'screen',
        })} 
        name='BengkelFormReservation' 
        component={ReservationScreen} />
    </Stack.Navigator>
  )
}

export default ReservationNavigator