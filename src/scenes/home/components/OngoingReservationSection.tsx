import { NavigationProp } from '@react-navigation/native';
import { PublicAPIResponse } from 'network/types';
import React from 'react'
import { ListRenderItemInfo, View } from 'react-native';
import { Text } from 'react-native-elements';
import { FlatList } from 'react-native-gesture-handler';
import { useQuery } from 'react-query';
import { Sizing } from 'styles/sizes';
import { ReservationItem } from '../constants';
import getProgressServiceList from '../service/getProgressServiceList';
import OngoingReservationItem from './OngoingReservationItem';

interface OngoingReservationSectionProps {
  navigation: NavigationProp<any>
}

const OngoingReservationSection: React.FC<OngoingReservationSectionProps> = ({ navigation }) => {
  const sampleDataProgress: ReservationItem[] = [{
    id: '',
    info_booking: {
      car: {
        id: '',
        brand: 'Toyota',
        type: 'Yaris',
        license_plate: 'B 2000 S',
      },
      shop: {
        id: '',
        name: 'Auto 2000, Jakarta Utara',
      },
      service: {
        id: '',
        name: 'Servis Dasar',
        description: '',
        price: 10000,
      },
      datetime: new Date('2022-06-15T11:27:39.404Z'),
      notes: '',
    },
    status: 0, // 0, 1, 2, 3, 4
  }]

  const {
    data: vehicleListResponse,
    refetch,
  } = useQuery<PublicAPIResponse<ReservationItem[]>>(
    ['getProgressServiceList'],
    () => getProgressServiceList(),
    {
      refetchOnWindowFocus: false,
      retry: true,
    }
  )

  return ( 
    <View>
      <Text style={{ marginTop: 16, fontSize: Sizing.text.body[14], fontWeight: 'bold', paddingLeft: 20, paddingRight: 20 }}>Sedang Berlangsung</Text>
      <FlatList 
        data={sampleDataProgress}
        renderItem={(info: ListRenderItemInfo<ReservationItem>) => (
          <OngoingReservationItem data={info.item} navigation={navigation} />
        )}
      />
    </View>
   );
}
 
export default OngoingReservationSection;