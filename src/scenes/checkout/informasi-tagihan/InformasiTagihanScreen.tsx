import { Route } from '@react-navigation/native';
import AppContainer from 'components/AppContainer';
import React from 'react'
import { Image, ScrollView, Text, View } from 'react-native';
import { AdditionalComponentItem, BookingInformationItem } from 'scenes/home/constants';
import { Color } from 'styles/colors';
import { fontPixel, heightPixel, widthPixel } from 'styles/sizes';
import { formatRupiah } from 'utils/TextUtils';
import BookingDetailComponent from './components/BookingDetailComponent';
import DetailBillComponent from './components/DetailBillComponent';

interface InformasiTagihanScreenProps {
  route: Route<any, ParamInformasiTagihan>
}

interface ParamInformasiTagihan {
  additionalComponents: AdditionalComponentItem[]
  bookingInformation: BookingInformationItem
}
 
const InformasiTagihanScreen: React.FC<InformasiTagihanScreenProps> = ({ route }) => {
  const { additionalComponents, bookingInformation } = route.params

  const totalPriceAdditionalComponent = additionalComponents.reduce((totalAccumulator, component) => totalAccumulator + component.price, 0)

  return ( 
    <AppContainer style={{ backgroundColor: Color.gray[2], padding: 0 }} refreshDisable>
      <ScrollView style={{ overflow: 'scroll', height: '100%' }}>
        <View style={{ backgroundColor: 'white', paddingHorizontal: widthPixel(20), paddingVertical: heightPixel(20) }}>
          <Image source={require('assets/icon/otoku_confirmation_success.webp')} style={{ alignSelf: 'center', marginTop: heightPixel(24) }} />
          <View style={{ alignSelf: 'center', margin: heightPixel(24) }}>
            <Text style={{ fontSize: fontPixel(20), fontWeight: 'bold', textAlign: 'center' }}>Konfirmasi Berhasil!</Text>
            <Text style={{ fontSize: fontPixel(12), color: Color.gray.secondary, textAlign: 'center' }}>Servis anda akan segera dikerjakan</Text>
          </View>

          <Text style={{ fontSize: fontPixel(14), color: Color.gray.secondary }}>Metode Pembayaran</Text>
          <Text style={{ fontSize: fontPixel(14), fontWeight: 'bold', marginBottom: heightPixel(16) }}>
            {'BCA Virtual Account'}
          </Text>

          <Text style={{ fontSize: fontPixel(14), color: Color.gray.secondary }}>Nomor Virtual Account</Text>
          <Text style={{ fontSize: fontPixel(14), fontWeight: 'bold', marginBottom: heightPixel(16) }}>
            {'3333 9818 0884 8228'}
          </Text>

          <Text style={{ fontSize: fontPixel(14), color: Color.gray.secondary }}>Jumlah Tagihan</Text>
          <Text style={{ fontSize: fontPixel(14), fontWeight: 'bold', color: Color.red[7] }}>
            {formatRupiah(totalPriceAdditionalComponent + bookingInformation.service.price)}
          </Text>
        </View>
        
        {additionalComponents.length > 0 && (
          <DetailBillComponent additionalComponents={additionalComponents} />
        )}

        <BookingDetailComponent data={bookingInformation} />
      </ScrollView>
    </AppContainer>
  );
}
 
export default InformasiTagihanScreen;