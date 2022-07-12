import { NavigationProp, Route } from '@react-navigation/native';
import AppContainer from 'components/AppContainer';
import CustomButton from 'components/CustomButton';
import { SCREENS } from 'navigations/constants';
import React from 'react'
import { Image, Text, View } from 'react-native';
import { useMutation } from 'react-query';
import { AdditionalComponentItem } from 'scenes/home/constants';
import { ReservationForm } from 'scenes/reservation/constants';
import { Color } from 'styles/colors';
import { fontPixel, heightPixel, widthPixel } from 'styles/sizes';
import { formatRupiah } from 'utils/TextUtils';
import { PaymentMethodSelectionItem } from '../constants';
import createReservation from '../service/createReservation';
import UpdateProgressService from '../service/updateProgressService';

interface PaymentDetailScreenProps {
  route: Route<string, ParamPaymentDetail>
  navigation: NavigationProp<any>
}

interface ParamPaymentDetail {
  additionalComponent: AdditionalComponentItem[]
  paymentMethod: PaymentMethodSelectionItem
}
 
const PaymentDetailScreen: React.FC<PaymentDetailScreenProps> = ({ route, navigation }) => {
  const { additionalComponent, paymentMethod } = route.params

  const totalPrice = additionalComponent.reduce((priceAccumulator, item) => priceAccumulator + item.price, 0)

  const { isLoading: isUpdatingProgressService, mutateAsync: onUpdateProgressService } = useMutation(UpdateProgressService, {
    onSuccess: (data) => {
      navigation.navigate(SCREENS.reservation.informasiTagihan)
    },
  })

  const onSubmit = () => {
    onUpdateProgressService({
      additionalComponent,
      paymentMethod,
    }).catch(() => {
      // do nothing
    })
  }

  return ( 
    <AppContainer style={{
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
    }} refreshDisable>
      <View>
        <View style={{ marginBottom: heightPixel(24) }}>
          <Text style={{ fontSize: fontPixel(14), color: Color.gray.secondary }}>Total Tagihan</Text>
          <Text style={{ fontSize: fontPixel(16), color: Color.red[7], fontWeight: 'bold' }}>{formatRupiah(totalPrice)}</Text>
        </View>

        <View>
          <Text style={{ fontSize: fontPixel(14), color: Color.gray.secondary }}>Metode Pembayaran</Text>
          <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: heightPixel(6) }}>
            <Image 
              style={{
                width: widthPixel(28),
                height: heightPixel(8),
              }}
              source={require('assets/icon/ic_logo_text.webp')}
              resizeMode={'contain'}
            />
            <Text style={{ fontSize: fontPixel(14), fontWeight: 'bold', marginLeft: widthPixel(8) }}>{paymentMethod.name}</Text>
          </View>
        </View>

        <View style={{ marginTop: heightPixel(16) }}>
          {paymentMethod.notes.map((note, idx) => (
            <Text>{idx + 1}. {note}</Text>
          ))}
        </View>
      </View>

      <View>
        <CustomButton onPress={onSubmit} buttonStyle={{ paddingLeft: 36, paddingRight: 36 }} title='Konfirmasi Pembayaran' />
      </View>
    </AppContainer>
  );
}
 
export default PaymentDetailScreen;