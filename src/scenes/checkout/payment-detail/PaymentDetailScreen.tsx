import { Route } from '@react-navigation/native';
import AppContainer from 'components/AppContainer';
import CustomButton from 'components/CustomButton';
import React from 'react'
import { Text, View } from 'react-native';
import { ReservationForm } from 'scenes/reservation/constants';
import { Color } from 'styles/colors';
import { fontPixel, heightPixel } from 'styles/sizes';
import createReservation from '../service/createReservation';

interface PaymentDetailScreenProps {
  route: Route<string, ReservationForm>
}
 
const PaymentDetailScreen: React.FC<PaymentDetailScreenProps> = ({ route }) => {
  const data = route.params
  const onSubmit = () => {

  }

  return ( 
    <AppContainer>
      <View style={{ marginBottom: heightPixel(24) }}>
        <Text style={{ fontSize: fontPixel(14), color: Color.gray.secondary }}>Total Tagihan</Text>
        <Text style={{ fontSize: fontPixel(16), color: Color.red[7], fontWeight: 'bold' }}>Rp1.000.000</Text>
      </View>

      <View>
        <Text style={{ fontSize: fontPixel(14), color: Color.gray.secondary }}>Metode Pembayaran</Text>
        <Text style={{ fontSize: fontPixel(14), fontWeight: 'bold' }}>{data.payment?.name}</Text>
      </View>

      <View>
        {data.payment?.notes.map((note, idx) => (
          <Text>{idx + 1}. {note}</Text>
        ))}
      </View>

      <View>
        <CustomButton onPress={onSubmit} buttonStyle={{ paddingLeft: 36, paddingRight: 36 }} title='Konfirmasi Booking' />
      </View>
    </AppContainer>
  );
}
 
export default PaymentDetailScreen;