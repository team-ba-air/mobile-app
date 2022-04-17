import { NavigationProp } from '@react-navigation/native';
import { SCREENS } from 'navigations/constants';
import React from 'react'
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { Card, LinearProgress, Text } from 'react-native-elements';
import { Color } from 'styles/colors';
import { Sizing } from 'styles/sizes';
import { getFormatDate, getFormatHour } from 'utils/DateUtil';
import { ReservationItem } from '../constants';

interface OngoingReservationItemProps {
  data: ReservationItem
  navigation: NavigationProp<any>
}
 
const OngoingReservationItem: React.FC<OngoingReservationItemProps> = ({ data, navigation }) => {
  const date = new Date(data.date)
  return ( 
    <TouchableOpacity onPress={() => navigation.navigate(SCREENS.reservation.progressService)}>
      <Card containerStyle={styles.card}>
        <View>
          <Text style={{ fontSize: Sizing.text.body[10], fontWeight: 'bold', color: Color.gray.secondary}}>{data.bengkelName}, {data.bengkelLocation}</Text>
          <Text style={{ fontSize: Sizing.text.body[14] }}>{data.serviceType}</Text>
        </View>
        <View style={{ marginTop: 16, display: 'flex', justifyContent: 'space-between', flexDirection: 'row' }}>
          <Text style={{ fontSize: Sizing.text.body[14] }}>{data.carType} {data.plat}</Text>
          <Text>progress {data.currentStep}/{data.totalStep}</Text>
        </View>
        <LinearProgress style={{ height: 8, borderRadius: 8, marginTop: 4 }} color='primary' value={data.currentStep / data.totalStep} variant='determinate' />
        <View style={{ marginTop: 16 }}>
          <Text style={{ fontSize: Sizing.text.body[14] }}>{getFormatDate(date)} | {getFormatHour(date)}</Text>
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