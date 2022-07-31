import { format } from 'date-fns';
import React from 'react'
import { StyleSheet, Text, View } from 'react-native';
import { BookingInformationItem } from 'scenes/home/constants';
import { ReservationForm } from 'scenes/reservation/constants';
import { Color } from 'styles/colors';
import { fontPixel, heightPixel, Sizing, widthPixel } from 'styles/sizes';
import { getFormatDateNumeric, getFormatHour } from 'utils/DateUtil';
import { formatRupiah } from 'utils/TextUtils';

interface BookingDetailComponentProps {
  data: BookingInformationItem
}
 
const BookingDetailComponent: React.FC<BookingDetailComponentProps> = ({ data }) => {
  return ( 
    <View style={{ backgroundColor: 'white', paddingHorizontal: widthPixel(20), paddingVertical: heightPixel(20), marginTop: heightPixel(8) }}>
      <Text style={{ fontSize: fontPixel(16), fontWeight: 'bold' }}>Rincian Booking</Text>

      <View style={{ marginTop: 16 }}>
        <Text style={styles.title}>Mobil</Text>
        <Text style={styles.content}>{data.car?.type} {data.car?.license_plate}</Text>
      </View>
      <View style={{ marginTop: 16 }}>
        <Text style={styles.title}>Bengkel</Text>
        <Text style={styles.content}>{data.shop?.name}</Text>
      </View>
      <View style={{ marginTop: 16 }}>
        <Text style={styles.title}>Servis</Text>
        <Text style={styles.content}>{data.service?.name} - {formatRupiah(data.service?.price ?? 0)}</Text>
      </View>
      <View style={{ marginTop: 16 }}>
        <Text style={styles.title}>Waktu</Text>
        <Text style={styles.content}>{format(data.datetime, 'eeee, dd MMMM yyyy')}</Text>
        <Text style={styles.content}>{getFormatHour(data.datetime)} WIB</Text>
      </View>
      <View style={{ marginTop: 16 }}>
        <Text style={styles.title}>Catatan tambahan</Text>
        <Text style={styles.content}>{data.notes !== '' ? data.notes : '-'}</Text>
      </View>
    </View>
  );
}
 
export default BookingDetailComponent;

const styles = StyleSheet.create({
  title: {
    fontSize: fontPixel(14),
    color: Color.gray.secondary,
  },
  content: {
    fontSize: fontPixel(14),
    fontWeight: 'bold',
  }
})
