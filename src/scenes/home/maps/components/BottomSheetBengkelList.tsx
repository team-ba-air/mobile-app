import React, { useCallback, useRef } from 'react'
import { View, Text, FlatList, ListRenderItemInfo } from 'react-native';
import BottomSheet, { TouchableOpacity } from '@gorhom/bottom-sheet';
import Animated from 'react-native-reanimated';
import { BengkelItem, ServiceItem } from 'scenes/home/constants';
import { NavigationProp } from '@react-navigation/native';
import { Sizing, widthPixel } from 'styles/sizes';
import BengkelListItem from './BengkelListItem';
import { SCREENS } from 'navigations/constants';

interface BottomSheetBengkelListProps {
  animatedPosition?: Animated.SharedValue<number>
  navigation: NavigationProp<any>
  service: ServiceItem
}

const defaultValues: BengkelItem[] = [
  {
    img: '',
    isAuthorized: true,
    isAlmostClosed: true,
    name: 'Auto 2000',
    location: 'Jakarta Utara',
    description: 'Servis mobil khusus Toyota',
    estimatedPickUp: 10,
    rating: 4.5,
    distance: 2.5,
  },
  {
    img: '',
    isAuthorized: true,
    isAlmostClosed: true,
    name: 'Auto 2000',
    location: 'Jakarta Utara',
    description: 'Servis mobil khusus Toyota',
    estimatedPickUp: 10,
    rating: 4.5,
    distance: 2.5,
  }
]
 
const BottomSheetBengkelList: React.FC<BottomSheetBengkelListProps> = ({ animatedPosition, navigation, service }) => {
  const bottomSheetRef = useRef<BottomSheet>(null);

  const handleSheetChanges = useCallback((index: number) => {
    console.log('handleSheetChanges', index);
  }, []);

  return ( 
    <BottomSheet style={{ paddingHorizontal: widthPixel(16) }} animatedPosition={animatedPosition} ref={bottomSheetRef} index={1} snapPoints={['40%', '80%']} onChange={handleSheetChanges}>
      <View>
        <Text style={{ fontSize: Sizing.text.body[16], fontWeight: 'bold' }}>Bengkel yang bisa {service.label}</Text>
      </View>
      <FlatList
        data={defaultValues}
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