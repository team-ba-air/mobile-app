import { Route } from '@react-navigation/routers';
import AppContainer from 'components/AppContainer';
import { SCREENS } from 'navigations/constants';
import React from 'react'
import { StyleSheet, View } from 'react-native';
import { Text } from 'react-native-elements';
import { ReservationForm } from 'scenes/reservation/constants';
import { Color } from 'styles/colors';
import { Sizing } from 'styles/sizes';
import CheckoutReservation from './components/CheckoutReservation';
import FooterCheckout from './components/FooterCheckout';

interface CheckoutScreenProps {
  route: Route<string, ReservationForm>
  navigation: any
}
 
const CheckoutScreen: React.FC<CheckoutScreenProps> = ({ route, navigation }) => {
  const data = route.params

  const onSubmit = () => {
    navigation.navigate(SCREENS.reservation.selectPayment, { data })
  }

  return ( 
    <AppContainer style={styles.container}>
      <View style={{ padding: 16 }}>
        <CheckoutReservation data={data} />
      </View>
      <FooterCheckout onSubmit={onSubmit} />
    </AppContainer>
  );
}
 
export default CheckoutScreen;

const styles = StyleSheet.create({
  container: {
    padding: 0,
    display: 'flex',
    justifyContent: 'space-between',
    flexDirection: 'column',
  }
})