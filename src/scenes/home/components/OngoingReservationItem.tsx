import { NavigationProp } from '@react-navigation/native';
import { SCREENS } from 'navigations/constants';
import React from 'react'
import { StyleSheet, TouchableOpacity, View, Image } from 'react-native';
import { Card, LinearProgress, Text } from 'react-native-elements';
import { Color } from 'styles/colors';
import { fontPixel, heightPixel, Sizing, widthPixel } from 'styles/sizes';
import { getFormatDate, getFormatHour } from 'utils/DateUtil';
import { LABEL_STATUS, ReservationItem } from '../constants';

interface OngoingReservationItemProps {
  data: ReservationItem
  navigation: NavigationProp<any>
}
 
const OngoingReservationItem: React.FC<OngoingReservationItemProps> = ({ data, navigation }) => {
  const time = data.info_booking.datetime.getTime()

  const getStatus = (status: number) => {
    if (status > 4) {
      return 'Servis selesai'
    } else if (status > 0){
      return LABEL_STATUS[status]
    } else {
      const timeNow = new Date().getTime()
      const timeDiff = time - timeNow
      
      console.log(`Original Datetime: ${data.info_booking.datetime}`)
      console.log(`Time Now: ${timeNow}`)
      console.log(`Time: ${time}`)
      console.log(`Time Diff: ${timeDiff}`)
      const dayDiff = Math.ceil(timeDiff / (1000 * 3600 * 24))
      console.log(`Day Diff: ${dayDiff}`)
      if (dayDiff > 0) {
        return `${dayDiff} hari lagi menuju servis`
      } else {
        return LABEL_STATUS[status]
      }
    }
  }

  return ( 
    <TouchableOpacity onPress={() => navigation.navigate(SCREENS.reservation.progressService, { data: data.id })}>
      <Card containerStyle={styles.card}>
        <View style={{ display: 'flex', flexDirection: 'row' }}>
          <View style={{ flex: 3 }}>
            <View>
              <Text style={{ fontSize: Sizing.text.body[10], fontWeight: 'bold', color: Color.gray.secondary}}>{data.info_booking.shop?.name} </Text>
              <Text style={{ fontSize: Sizing.text.body[14], fontWeight: 'bold' }}>{data.info_booking.service?.name} - {data.info_booking.car?.brand} {data.info_booking.car?.type} {data.info_booking.car?.license_plate}</Text>
            </View>

            <LinearProgress style={{ height: 8, borderRadius: 8, marginTop: heightPixel(12) }} color='primary' value={data.status / 5} variant='determinate' />
            
            <Text style={{ marginTop: 16 }}>
              <Text style={{ fontSize: fontPixel(10) }}>Status: </Text>
              <Text style={{ fontSize: fontPixel(10), fontWeight: 'bold' }}>{getStatus(data.status)}</Text>
            </Text>
          </View>
          <View style={{ alignItems: 'center', justifyContent: 'center', marginLeft: widthPixel(8), marginTop: heightPixel(12) }}>
            <Image style={{ justifyContent: 'center', alignItems: 'center' }} source={require('assets/icon/ic_right_arrow_blue.png')}/>
          </View>
        </View>
      </Card>
    </TouchableOpacity>
  );
}
 
export default OngoingReservationItem;

const styles = StyleSheet.create({
  card: {
    backgroundColor: Color.gray[0],
    borderRadius: 12,
    padding: 16,
    margin: 0,
    marginTop: 20,
    marginLeft: 20,
    marginRight: 20,
  },
  imageCar: {
    height: 140,
    width: 140,
    marginLeft: 16,
    marginBottom: 8,
    borderBottomLeftRadius: 8,
  },
})