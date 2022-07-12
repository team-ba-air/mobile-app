import React from 'react'
import { StyleSheet, View } from 'react-native';
import { Text } from 'react-native-elements';
import { ReservationForm } from 'scenes/reservation/constants';
import { Color } from 'styles/colors';
import { fontPixel, heightPixel, Sizing } from 'styles/sizes';

interface CheckoutReservationProps {
  data?: ReservationForm
}
 
const CheckoutReservation: React.FC<CheckoutReservationProps> = ({ data }) => {
  const carItem = data?.car?.split('|')
  const serviceItem = data?.service?.split('|')

  return ( 
    <>
      <View>
        <Text style={styles.title}>Mobil</Text>
        <Text style={styles.content}>{carItem?.[1]} {carItem?.[2]} {carItem?.[3]}</Text>
      </View>
      <View style={{ marginTop: heightPixel(16) }}>
        <Text style={styles.title}>Bengkel</Text>
        <Text style={styles.content}>{data?.shop?.name}</Text>
      </View>
      <View style={{ marginTop: heightPixel(16) }}>
        <Text style={styles.title}>Servis</Text>
        <Text style={styles.content}>{serviceItem?.[1]} - {serviceItem?.[3]}</Text>
      </View>
      <View style={{ marginTop: heightPixel(16) }}>
        <Text style={styles.title}>Waktu</Text>
        <Text style={styles.content}>Kamis, 7 Oktober 2021</Text>
        <Text style={styles.content}>{data?.hour} WIB</Text>
      </View>
      <View style={{ marginTop: heightPixel(16) }}>
        <Text style={styles.title}>Catatan tambahan</Text>
        <Text style={styles.content}>{data?.notes !== '' ? data?.notes : '-'}</Text>
      </View>
    </>
   );
}
 
export default CheckoutReservation;

const styles = StyleSheet.create({
  title: {
    fontSize: fontPixel(14),
    color: Color.gray[8],
  },
  content: {
    fontSize: fontPixel(14),
    fontWeight: 'bold',
  }
})