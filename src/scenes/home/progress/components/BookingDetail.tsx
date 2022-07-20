import { NavigationProp } from '@react-navigation/native';
import CustomButton from 'components/CustomButton';
import { format } from 'date-fns';
import { SCREENS } from 'navigations/constants';
import * as React from 'react';
import { Text, View } from 'react-native';
import { ReservationDetailItem } from 'scenes/home/constants';
import { Color } from 'styles/colors';
import { fontPixel, heightPixel, widthPixel } from 'styles/sizes';
import { getFormatDateNumeric, getFormatHour } from 'utils/DateUtil';

interface BookingDetailProps {
  data: ReservationDetailItem
  navigation: NavigationProp<any>
}
 
const BookingDetail: React.FC<BookingDetailProps> = ({ data, navigation }) => {
  const infoBooking = data.info_booking

  const handleClick = () => {
    navigation.navigate(SCREENS.reservation.informasiTagihan, {
      id: data.id,
      bookingNumber: data.booking_number,
      additionalComponents: data.additional_component,
      bookingInformation: infoBooking,
      paymentMethod: data.payment_method
    })
  }

  return (  
    <>
      <View style={{ paddingHorizontal: widthPixel(20), display: 'flex', justifyContent: 'space-between', marginTop: heightPixel(8), }}>
        <Text style={{ fontSize: fontPixel(14), color: Color.gray.secondary }}>Mobil</Text>
        <Text style={{ fontSize: fontPixel(14), fontWeight: 'bold', marginBottom: heightPixel(16) }}>
          {infoBooking.car.type} {infoBooking.car.license_plate}
        </Text>

        <Text style={{ fontSize: fontPixel(14), color: Color.gray.secondary }}>Bengkel</Text>
        <Text style={{ fontSize: fontPixel(14), fontWeight: 'bold', marginBottom: heightPixel(16) }}>
          {infoBooking.shop.name}
        </Text>

        <Text style={{ fontSize: fontPixel(14), color: Color.gray.secondary }}>Servis</Text>
        <Text style={{ fontSize: fontPixel(14), fontWeight: 'bold', marginBottom: heightPixel(16) }}>
          {infoBooking.service.name}
        </Text>

        <Text style={{ fontSize: fontPixel(14), color: Color.gray.secondary }}>Waktu</Text>
        <Text style={{ fontSize: fontPixel(14), fontWeight: 'bold' }}>{format(infoBooking.datetime, 'eeee, dd MMMM yyyy')}</Text>
        <Text style={{ fontSize: fontPixel(14), fontWeight: 'bold', marginBottom: heightPixel(16) }}>{`${getFormatHour(infoBooking.datetime)} WIB`}</Text>

        <Text style={{ fontSize: fontPixel(14), color: Color.gray.secondary }}>Catatan Tambahan</Text>
        <Text style={{ fontSize: fontPixel(14), fontWeight: 'bold', marginBottom: heightPixel(16) }}>
          {infoBooking.notes ? infoBooking.notes : '-'}
        </Text>
      
        <Text style={{ fontSize: fontPixel(14), color: Color.gray.secondary }}>Biaya</Text>
        <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
          <Text style={{ fontSize: fontPixel(16), fontWeight: 'bold' }}>{'Rp490.000'}</Text>
          <Text style={{ fontSize: fontPixel(11), fontWeight: 'bold', color: Color.blue[8] }}>Pembayaran di bengkel</Text>
        </View>
        
      </View>

      <CustomButton style={{ paddingHorizontal: widthPixel(20) }} type='primary' title='Informasi Tagihan' onPress={handleClick} />
    </>
   
  );
}
 
export default BookingDetail;