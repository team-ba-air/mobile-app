import React, { useCallback, useRef } from 'react'
import { View, Text, FlatList, ListRenderItemInfo } from 'react-native';
import BottomSheet, { TouchableOpacity } from '@gorhom/bottom-sheet';
import Animated from 'react-native-reanimated';
import { NavigationProp } from '@react-navigation/native';
import { fontPixel, Sizing, widthPixel } from 'styles/sizes';
import BengkelListItem from './BengkelListItem';
import { SCREENS } from 'navigations/constants';
import { useQuery } from 'react-query';
import { PublicAPIResponse } from 'network/types';
import getShopList from 'scenes/reservation/service/getShopList';
import { BengkelItem, ServiceItem } from 'scenes/reservation/constants';
import { VehicleItem } from 'scenes/vehicle/constants';
import { Color } from 'styles/colors';

interface BottomSheetBengkelListProps {
  animatedPosition?: Animated.SharedValue<number>
  navigation: NavigationProp<any>
  service: ServiceItem
  car: VehicleItem
}
 
const BottomSheetBengkelList: React.FC<BottomSheetBengkelListProps> = ({ animatedPosition, navigation, service, car }) => {
  const bottomSheetRef = useRef<BottomSheet>(null);

  const handleSheetChanges = useCallback((index: number) => {
    console.log('handleSheetChanges', index);
  }, []);

  const {
    data: shopListResponse,
    isLoading: isFetchingVehicleList,
  } = useQuery<PublicAPIResponse<any>>(
    ['getShopList'],
    () => getShopList({ lat: -6, long: 106, type: service.name, typeCar: car.brand }),
    {
      refetchOnWindowFocus: false,
      retry: true,
    }
  )

  const shopList = shopListResponse?.body ?? []

  const handleClick = (item: BengkelItem) => {
    navigation.navigate(SCREENS.reservation.bengkelFormReservation, { 
      data: {
        shop: item,
        car,
        service,
      }
    })
  }

  return ( 
    <BottomSheet style={{ }} animatedPosition={animatedPosition} ref={bottomSheetRef} index={0} snapPoints={['40%', '80%']} onChange={handleSheetChanges}>
      <View>
        <Text style={{ fontSize: fontPixel(16), fontWeight: 'bold', paddingHorizontal: widthPixel(20) }}>
          Bengkel yang bisa <Text style={{ color: Color.blue[8] }}>{service.name}</Text>
        </Text>
      </View>
      <FlatList
        data={shopListResponse?.body ?? []}
        renderItem={(info: ListRenderItemInfo<BengkelItem>) => (
          <TouchableOpacity onPress={() => handleClick(info.item)}>
            <BengkelListItem data={info.item} />
          </TouchableOpacity>
        )}
      />
    </BottomSheet>
    );
}
 
export default BottomSheetBengkelList;