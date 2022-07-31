import { NavigationProp, Route } from '@react-navigation/native';
import AppContainer from 'components/AppContainer';
import CustomButton from 'components/CustomButton';
import { SCREENS } from 'navigations/constants';
import { PublicAPIResponse } from 'network/types';
import React from 'react'
import { Image, Text, View } from 'react-native';
import { useMutation } from 'react-query';
import { AdditionalComponentItem } from 'scenes/home/constants';
import { ReservationForm } from 'scenes/reservation/constants';
import { Color } from 'styles/colors';
import { fontPixel, heightPixel, widthPixel } from 'styles/sizes';
import { formatRupiah } from 'utils/TextUtils';
import { PaymentMethodSelectionItem } from '../constants';
import createReservation, { ReservationData } from '../service/createReservation';
import updateProgressService from '../service/updateProgressService';
import { UpdateProgressServiceResponse } from '../service/updateProgressService';

interface PaymentDetailScreenProps {
  route: Route<string, ParamPaymentDetail>
  navigation: NavigationProp<any>
}

interface ParamPaymentDetail {
  id: string
  servicePrice: number
  additionalComponent: AdditionalComponentItem[]
  paymentMethod: PaymentMethodSelectionItem
  status?: number
}

const sampleResponse: ReservationData = {
  id: '1',
  booking_number: '12312A',
  info_booking: {
    car: {
      id: '',
      brand: 'Toyota',
      type: 'Yaris',
      license_plate: 'B 2000 S',
    },
    shop: {
      id: '',
      name: 'Auto 2000, Jakarta Utara',
    },
    service: {
      id: '',
      name: 'Servis Dasar 10000 KM',
      description: '',
      price: 15000,
    },
    datetime: new Date('2022-06-14T11:27:39.404Z'),
    notes: '',
  },
  additional_component: [
    {
      id: '1',
      name: 'V-Belt',
      price: 250000,
      priority: 'IMPORTANT',
    },
    {
      id: '2',
      name: 'Kampas Rem',
      price: 180000,
      priority: 'IMPORTANT',
    },
  ],
  payment_method: {
    id: '1',
    name: 'Bayar di Bengkel',
    image: 'https://i.ibb.co/g9cDkWM/bca-logo.jpg',
    notes: [],
    active: true,
  }
}
 
const PaymentDetailScreen: React.FC<PaymentDetailScreenProps> = ({ route, navigation }) => {
  const { additionalComponent, paymentMethod, status, servicePrice, id } = route.params

  const totalPrice = additionalComponent.reduce((priceAccumulator, item) => priceAccumulator + item.price, 0)

  const { isLoading: isUpdatingProgressService, mutateAsync: onUpdateProgressService } = useMutation(updateProgressService, {
    onSuccess: (data: PublicAPIResponse<ReservationData>) => {
      console.log(data.body)
      navigation.navigate(SCREENS.reservation.informasiTagihan, {
        id: data.body?.id,
        bookingNumber: data.body?.booking_number,
        additionalComponents: data.body?.additional_component,
        bookingInformation: data.body?.info_booking,
        paymentMethod: data.body?.payment_method,
        type: 'confirmation-success',
        isFinish: status === 5,
      })
    },
  })

  const onSubmit = () => {
    onUpdateProgressService({
      additionalComponent,
      paymentMethod,
      status,
      id
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
          <Text style={{ fontSize: fontPixel(16), color: Color.red[7], fontWeight: 'bold' }}>{formatRupiah(totalPrice + servicePrice)}</Text>
        </View>

        <View>
          <Text style={{ fontSize: fontPixel(14), color: Color.gray.secondary }}>Metode Pembayaran</Text>
          <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: heightPixel(6) }}>
            <Image 
              style={{
                width: widthPixel(20),
                height: heightPixel(10),
              }}
              source={{
                uri: paymentMethod.image,
              }}
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