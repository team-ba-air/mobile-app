import { NavigationProp } from '@react-navigation/native';
import { PublicAPIResponse } from 'network/types';
import React from 'react'
import { ListRenderItemInfo, View } from 'react-native';
import { Badge, Text } from 'react-native-elements';
import { FlatList } from 'react-native-gesture-handler';
import { useQuery } from 'react-query';
import { fontPixel, Sizing } from 'styles/sizes';
import { ReservationItem } from '../constants';
import getProgressServiceList from '../service/getProgressServiceList';
import OngoingReservationItem from './OngoingReservationItem';

interface OngoingReservationSectionProps {
  navigation: NavigationProp<any>
  progressServiceList: ReservationItem[]
}

const OngoingReservationSection: React.FC<OngoingReservationSectionProps> = ({ navigation, progressServiceList = [] }) => {
  
  return ( 
    <View>
      {progressServiceList.length > 0 && (
        <Text style={{ marginTop: 16, fontSize: fontPixel(14), fontWeight: 'bold', paddingLeft: 20, paddingRight: 20 }}>Sedang Berlangsung</Text>
      )}
      
      <FlatList 
        data={progressServiceList}
        renderItem={(info: ListRenderItemInfo<ReservationItem>) => (
          <OngoingReservationItem data={info.item} navigation={navigation} />
        )}
      />
    </View>
   );
}
 
export default OngoingReservationSection;