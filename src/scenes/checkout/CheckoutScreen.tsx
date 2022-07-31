import { Route } from '@react-navigation/routers';
import AppContainer from 'components/AppContainer';
import { SCREENS } from 'navigations/constants';
import { PublicAPIResponse } from 'network/types';
import React from 'react'
import { StyleSheet, View } from 'react-native';
import { Text } from 'react-native-elements';
import { useMutation } from 'react-query';
import { ReservationForm } from 'scenes/reservation/constants';
import { Color } from 'styles/colors';
import { Sizing } from 'styles/sizes';
import CheckoutReservation from './components/CheckoutReservation';
import FooterCheckout from './components/FooterCheckout';
import createReservation, { ReservationData } from './service/createReservation';

interface CheckoutScreenProps {
  route: Route<string, ParamReservationFrom>
  navigation: any
}

interface ParamReservationFrom {
  data: ReservationForm
}
 
const CheckoutScreen: React.FC<CheckoutScreenProps> = ({ route, navigation }) => {
  const { data } = route.params

  const { isLoading: isCreatingReservation, mutateAsync: onCreateReservation } = useMutation(createReservation, {
    onSuccess: (data: PublicAPIResponse<ReservationData>) => {
      navigation.navigate(SCREENS.reservation.informasiTagihan, {
        id: data.body?.id,
        bookingNumber: data.body?.booking_number,
        additionalComponents: data.body?.additional_component,
        bookingInformation: data.body?.info_booking,
        paymentMethod: data.body?.payment_method,
        type: 'booking-success',
      })
    },
  })

  const onSubmit = () => {
    onCreateReservation({ data }).catch(() => {
      // do nothing
    })
  }

  const serviceData = data.service?.split('|') ?? []

  return ( 
    <AppContainer style={styles.container} refreshDisable>
      <View style={{ padding: 16 }}>
        <CheckoutReservation data={data} />
      </View>
      <FooterCheckout onSubmit={onSubmit} price={parseInt(serviceData?.[3])} />
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