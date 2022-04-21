import React, { useCallback, useRef } from 'react'
import { View, Text, FlatList, ListRenderItemInfo } from 'react-native';
import BottomSheet, { TouchableOpacity } from '@gorhom/bottom-sheet';
import Animated from 'react-native-reanimated';
import { BengkelItem, ServiceItem } from 'scenes/home/constants';
import { NavigationProp } from '@react-navigation/native';
import { Sizing, widthPixel } from 'styles/sizes';
import BengkelListItem from './BengkelListItem';
import { SCREENS } from 'navigations/constants';
import { useQuery } from 'react-query';
import { PublicAPIResponse } from 'network/types';
import getShopList from 'scenes/reservation/service/getShopList';

interface BottomSheetBengkelListProps {
  animatedPosition?: Animated.SharedValue<number>
  navigation: NavigationProp<any>
  service: ServiceItem
}
 
const BottomSheetBengkelList: React.FC<BottomSheetBengkelListProps> = ({ animatedPosition, navigation, service }) => {
  const bottomSheetRef = useRef<BottomSheet>(null);

  const handleSheetChanges = useCallback((index: number) => {
    console.log('handleSheetChanges', index);
  }, []);

  const {
    data: shopListResponse,
    isLoading: isFetchingVehicleList,
  } = useQuery<PublicAPIResponse<any>>(
    ['getShopList'],
    () => getShopList({ lat: -6, long: 106}),
    {
      refetchOnWindowFocus: false,
      retry: true,
    }
  )

  console.log(shopListResponse)
  return ( 
    <BottomSheet style={{ paddingHorizontal: widthPixel(16) }} animatedPosition={animatedPosition} ref={bottomSheetRef} index={1} snapPoints={['40%', '80%']} onChange={handleSheetChanges}>
      <View>
        <Text style={{ fontSize: Sizing.text.body[16], fontWeight: 'bold' }}>Bengkel yang bisa {service.label}</Text>
      </View>
      <FlatList
        data={shopListResponse?.body ?? []}
        renderItem={(info: ListRenderItemInfo<BengkelItem>) => (
          <TouchableOpacity onPress={() => navigation.navigate(SCREENS.reservation.bengkelFormReservation, { data: info.item })}>
            <BengkelListItem data={info.item} />
          </TouchableOpacity>
        )}
      />
    </BottomSheet>
    );
}
 
export default BottomSheetBengkelList;