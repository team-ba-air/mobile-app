import { NavigationProp, Route } from '@react-navigation/native';
import AppContainer from 'components/AppContainer';
import CustomButton from 'components/CustomButton';
import { SCREENS } from 'navigations/constants';
import React from 'react'
import { Image, ScrollView, Text, View } from 'react-native';
import { AdditionalComponentItem, BookingInformationItem } from 'scenes/home/constants';
import { Color } from 'styles/colors';
import { fontPixel, heightPixel, widthPixel } from 'styles/sizes';
import { formatRupiah } from 'utils/TextUtils';
import { PaymentMethodSelectionItem } from '../constants';
import BookingDetailComponent from './components/BookingDetailComponent';
import DetailBillComponent from './components/DetailBillComponent';

interface InformasiTagihanScreenProps {
  route: Route<any, ParamInformasiTagihan>
  navigation: NavigationProp<any>
}

interface ParamInformasiTagihan {
  id: string
  bookingNumber: string
  additionalComponents: AdditionalComponentItem[]
  bookingInformation: BookingInformationItem
  paymentMethod?: PaymentMethodSelectionItem
  type?: 'confirmation-success' | 'booking-success'
  isFinish?: boolean
}
 
const InformasiTagihanScreen: React.FC<InformasiTagihanScreenProps> = ({ route, navigation }) => {
  const { id, additionalComponents, bookingInformation, bookingNumber, paymentMethod, type, isFinish = false } = route.params

  const totalPriceAdditionalComponent = additionalComponents.reduce((totalAccumulator, component) => totalAccumulator + component.price, 0)

  const handleBack = () => {
    if (type === 'booking-success' || isFinish) {
      navigation.navigate(SCREENS.app.home)
    } else {
      navigation.navigate(SCREENS.reservation.progressService, { data: id })
    }
  }

  return (
    <AppContainer style={{ backgroundColor: Color.gray[2], padding: 0 }} refreshDisable>
      <ScrollView style={{ overflow: 'scroll', height: '100%' }}>
        <View style={{ backgroundColor: 'white', paddingHorizontal: widthPixel(20), paddingVertical: heightPixel(20) }}>
          {type === 'booking-success' || type === 'confirmation-success' && (
            <Image source={require('assets/icon/otoku_confirmation_success.webp')} style={{ alignSelf: 'center', marginTop: heightPixel(24) }} />
          )}

          {type === 'booking-success' && (
            <View style={{ alignSelf: 'center', margin: heightPixel(24) }}>
              <Text style={{ fontSize: fontPixel(20), fontWeight: 'bold', textAlign: 'center' }}>Booking Berhasil!</Text>
              <Text style={{ fontSize: fontPixel(12), color: Color.gray.secondary, textAlign: 'center' }}>Jangan lupa untuk datang ke Bengkel sesuai waktu yang Anda pilih!</Text>
            </View>
          )}

          {type === 'confirmation-success' && (
            <View style={{ alignSelf: 'center', margin: heightPixel(24) }}>
              <Text style={{ fontSize: fontPixel(20), fontWeight: 'bold', textAlign: 'center' }}>Konfirmasi Berhasil!</Text>
              <Text style={{ fontSize: fontPixel(12), color: Color.gray.secondary, textAlign: 'center' }}>
                {isFinish ? 'Servis anda telah selesai, silakan lakukan pembayaran!' : 'Servis anda akan segera dikerjakan'}
              </Text>
            </View>
          )}
          

          <Text style={{ fontSize: fontPixel(14), color: Color.gray.secondary }}>Nomor Booking</Text>
          <Text style={{ fontSize: fontPixel(14), fontWeight: 'bold', marginBottom: heightPixel(16) }}>
            {bookingNumber}
          </Text>

          {paymentMethod && (
            <View>
              <Text style={{ fontSize: fontPixel(14), color: Color.gray.secondary }}>Metode Pembayaran</Text>
              <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: heightPixel(16), }}>
                <Image source={{ uri: paymentMethod.image, width: widthPixel(20), height: heightPixel(10) }} resizeMode={'contain'} />
                <Text style={{ fontSize: fontPixel(14), fontWeight: 'bold', marginLeft: widthPixel(4) }}>
                  {paymentMethod.name}
                </Text>
              </View>

              {paymentMethod.target && (
                <View>
                  <Text style={{ fontSize: fontPixel(14), color: Color.gray.secondary }}>Nomor Virtual Account</Text>
                  <Text style={{ fontSize: fontPixel(14), fontWeight: 'bold', marginBottom: heightPixel(16) }}>
                    {paymentMethod.target}
                  </Text>
                </View>
              )}
            </View>
          )}
          

          <Text style={{ fontSize: fontPixel(14), color: Color.gray.secondary }}>Jumlah Tagihan</Text>
          <Text style={{ fontSize: fontPixel(14), fontWeight: 'bold', color: Color.red[7] }}>
            {formatRupiah(totalPriceAdditionalComponent + bookingInformation.service.price)}
          </Text>
        </View>
        
        {additionalComponents.length > 0 && (
          <DetailBillComponent servicePrice={bookingInformation.service.price} additionalComponents={additionalComponents} />
        )}

        <BookingDetailComponent data={bookingInformation} />
      </ScrollView>
      <View style={{
        paddingHorizontal: widthPixel(20),
        paddingVertical: heightPixel(20),
        backgroundColor: 'white',
        borderTopColor: Color.gray[2],
        borderTopWidth: 2,
      }}>
        <CustomButton 
          onPress={handleBack} 
          type='primary' 
          title={type === 'booking-success' || isFinish ? 
            'Kembali ke Home' : 
            'Kembali ke Progres Servis'
          } 
        />
      </View>
    </AppContainer>
  );
}
 
export default InformasiTagihanScreen;