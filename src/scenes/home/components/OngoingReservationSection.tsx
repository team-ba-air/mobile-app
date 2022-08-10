import { NavigationProp } from '@react-navigation/native';
import { PublicAPIResponse } from 'network/types';
import React from 'react'
import { ListRenderItemInfo, View } from 'react-native';
import { Badge, Text } from 'react-native-elements';
import { FlatList } from 'react-native-gesture-handler';
import { useQuery } from 'react-query';
import { fontPixel, heightPixel, Sizing, widthPixel } from 'styles/sizes';
import { ReservationItem } from '../constants';
import getProgressServiceList from '../service/getProgressServiceList';
import OngoingReservationItem from './OngoingReservationItem';

interface OngoingReservationSectionProps {
  navigation: NavigationProp<any>
  progressServiceList: ReservationItem[]
}

const OngoingReservationSection: React.FC<OngoingReservationSectionProps> = ({ navigation, progressServiceList = [] }) => {
  
  return ( 
    <View style={{ marginBottom: heightPixel(8)}}>
      {progressServiceList.length > 0 && (
        <Text style={{ marginTop: heightPixel(16), fontSize: fontPixel(14), fontWeight: 'bold', paddingHorizontal: widthPixel(20) }}>Servis Sedang Berlangsung</Text>
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