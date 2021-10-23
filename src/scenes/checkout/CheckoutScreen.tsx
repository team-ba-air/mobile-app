import AppContainer from 'components/AppContainer';
import React from 'react'
import { StyleSheet, View } from 'react-native';
import { Text } from 'react-native-elements';
import { Color } from 'styles/colors';
import { Sizing } from 'styles/sizes';
import CheckoutReservation from './components/CheckoutReservation';
import FooterCheckout from './components/FooterCheckout';

interface CheckoutScreenProps {
  navigation: any
}
 
const CheckoutScreen: React.FC<CheckoutScreenProps> = ({ navigation }) => {
  return ( 
    <AppContainer style={styles.container}>
      <View style={{ padding: 16 }}>
        <CheckoutReservation />
      </View>
      <FooterCheckout navigation={navigation} />
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