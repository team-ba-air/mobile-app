import React from 'react'
import { StyleSheet, View } from 'react-native';
import { Text } from 'react-native-elements';
import { ReservationForm } from 'scenes/reservation/constants';
import { Color } from 'styles/colors';
import { Sizing } from 'styles/sizes';

interface CheckoutReservationProps {
  data?: ReservationForm
}
 
const CheckoutReservation: React.FC<CheckoutReservationProps> = ({ data }) => {
  return ( 
    <>
    <View>
        <Text style={styles.title}>Mobil</Text>
        <Text style={styles.content}>{data?.car}</Text>
      </View>
      <View style={{ marginTop: 16 }}>
        <Text style={styles.title}>Bengkel</Text>
        <Text style={styles.content}>Auto 2000, Jakarta Utara</Text>
      </View>
      <View style={{ marginTop: 16 }}>
        <Text style={styles.title}>Servis</Text>
        <Text style={styles.content}>Servis Dasar - Rp100.000</Text>
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
    </>
   );
}
 
export default CheckoutReservation;

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