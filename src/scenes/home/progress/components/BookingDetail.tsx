import * as React from 'react';
import { Text, View } from 'react-native';
import { ReservationDetailItem } from 'scenes/home/constants';
import { Color } from 'styles/colors';
import { fontPixel, heightPixel } from 'styles/sizes';
import { getFormatDateNumeric, getFormatHour } from 'utils/DateUtil';

interface BookingDetailProps {
  data: ReservationDetailItem
}
 
const BookingDetail: React.FC<BookingDetailProps> = ({ data }) => {
  const infoBooking = data.info_booking
  return (  
    <View>
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
      <Text style={{ fontSize: fontPixel(14), fontWeight: 'bold' }}>{getFormatDateNumeric(infoBooking.datetime)}</Text>
      <Text style={{ fontSize: fontPixel(14), fontWeight: 'bold', marginBottom: heightPixel(16) }}>{`${getFormatHour(infoBooking.datetime)} WIB`}</Text>

      <Text style={{ fontSize: fontPixel(14), color: Color.gray.secondary }}>Catatan Tambahan</Text>
      <Text style={{ fontSize: fontPixel(14), fontWeight: 'bold', marginBottom: heightPixel(16) }}>
        {infoBooking.notes ? infoBooking.notes : '-'}
      </Text>
    
      <Text style={{ fontSize: fontPixel(14), color: Color.gray.secondary }}>Biaya</Text>
      <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
        <Text style={{ fontSize: fontPixel(16), fontWeight: 'bold' }}>{'Rp490.000'}</Text>
        <Text style={{ fontSize: fontPixel(11), fontWeight: 'bold', color: Color.blue[8] }}>Belum lunas (pembayaran di bengkel)</Text>
      </View>
      
    </View>
  );
}
 
export default BookingDetail;