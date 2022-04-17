import { NavigationProp } from '@react-navigation/native';
import React from 'react'
import { ListRenderItemInfo, View } from 'react-native';
import { Text } from 'react-native-elements';
import { FlatList } from 'react-native-gesture-handler';
import { Sizing } from 'styles/sizes';
import { ReservationItem } from '../constants';
import OngoingReservationItem from './OngoingReservationItem';

interface OngoingReservationSectionProps {
  navigation: NavigationProp<any>
}

const defaultValues: ReservationItem[] = [
  {
    bengkelName: 'Auto 2000',
    bengkelLocation: 'Jakarta Utara',
    serviceType: 'Servis Dasar',
    carType: 'Yaris',
    plat: 'B 2012 S',
    currentStep: 2,
    totalStep: 4,
    date: 12312312312312,
  },
]
 
const OngoingReservationSection: React.FC<OngoingReservationSectionProps> = ({ navigation }) => {
  return ( 
    <View>
      <Text style={{ marginTop: 16, fontSize: Sizing.text.body[14], fontWeight: 'bold', paddingLeft: 20, paddingRight: 20 }}>Sedang Berlangsung</Text>
      <FlatList 
        data={defaultValues}
        renderItem={(info: ListRenderItemInfo<ReservationItem>) => (
          <OngoingReservationItem data={info.item} navigation={navigation} />
        )}
      />
    </View>
   );
}
 
export default OngoingReservationSection;