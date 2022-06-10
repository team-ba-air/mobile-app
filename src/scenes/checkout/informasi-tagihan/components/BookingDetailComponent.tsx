import React from 'react'
import { StyleSheet, Text, View } from 'react-native';
import { ReservationForm } from 'scenes/reservation/constants';
import { Color } from 'styles/colors';
import { Sizing } from 'styles/sizes';

interface BookingDetailComponentProps {
  data?: ReservationForm
}
 
const BookingDetailComponent: React.FC<BookingDetailComponentProps> = ({ data }) => {
  const carItem = data?.car?.split('|')
  const serviceItem = data?.service?.split('|')

  return ( 
    <View>
      <Text>Rincian Booking</Text>

      <View style={{ marginTop: 16 }}>
        <Text style={styles.title}>Bengkel</Text>
        <Text style={styles.content}>{data?.shop?.name}</Text>
      </View>
      <View style={{ marginTop: 16 }}>
        <Text style={styles.title}>Servis</Text>
        <Text style={styles.content}>{serviceItem?.[1]} - {serviceItem?.[3]}</Text>
      </View>
      <View style={{ marginTop: 16 }}>
        <Text style={styles.title}>Waktu</Text>
        <Text style={styles.content}>Kamis, 7 Oktober 2021</Text>
        <Text style={styles.content}>{data?.hour} WIB</Text>
      </View>
      <View style={{ marginTop: 16 }}>
        <Text style={styles.title}>Catatan tambahan</Text>
        <Text style={styles.content}>{data?.notes !== '' ? data?.notes : '-'}</Text>
      </View>
    </View>
  );
}
 
export default BookingDetailComponent;

const styles = StyleSheet.create({
  title: {
    fontSize: Sizing.text.body[14],
    color: Color.gray[8],
  },
  content: {
    fontSize: Sizing.text.body[14],
    fontWeight: 'bold',
  }
})
