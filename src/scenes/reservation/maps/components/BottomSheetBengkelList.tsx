import React, { useCallback, useRef } from 'react'
import { View, Text, FlatList, ListRenderItemInfo, ActivityIndicator } from 'react-native';
import BottomSheet, { TouchableOpacity } from '@gorhom/bottom-sheet';
import Animated from 'react-native-reanimated';
import { NavigationProp } from '@react-navigation/native';
import { fontPixel, heightPixel, widthPixel } from 'styles/sizes';
import BengkelListItem from './BengkelListItem';
import { SCREENS } from 'navigations/constants';
import { BengkelItem, ServiceItem } from 'scenes/reservation/constants';
import { VehicleItem } from 'scenes/vehicle/constants';
import { Color } from 'styles/colors';
import { LocationPoint } from '../MapsScreen';

interface BottomSheetBengkelListProps {
  animatedPosition?: Animated.SharedValue<number>
  navigation: NavigationProp<any>
  service: ServiceItem
  car: VehicleItem
  location: LocationPoint | null
  isLoading: boolean
  shops: BengkelItem[]
}
 
const BottomSheetBengkelList: React.FC<BottomSheetBengkelListProps> = ({ animatedPosition, navigation, service, car, location, isLoading, shops }) => {
  const bottomSheetRef = useRef<BottomSheet>(null);

  const handleSheetChanges = useCallback((index: number) => {
    console.log('handleSheetChanges', index);
  }, []);

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
    <BottomSheet animatedPosition={animatedPosition} ref={bottomSheetRef} index={0} snapPoints={['40%', '80%']} onChange={handleSheetChanges}>
      <View>
        <Text style={{ fontSize: fontPixel(16), fontWeight: 'bold', paddingHorizontal: widthPixel(20) }}>
          Bengkel yang bisa <Text style={{ color: Color.blue[8] }}>{service.name}</Text>
        </Text>
      </View>

      {location === null ? (
        <Text style={{ 
          marginTop: heightPixel(16),
          marginHorizontal: widthPixel(16),
        }}>
          Silakan pilih lokasi untuk mencari bengkel di sekitar.
        </Text>
      ) : isLoading ? (
        <ActivityIndicator style={{ marginTop: heightPixel(16) }} size={'large'} color={Color.blue[8]}/>
      ) : shops.length === 0 ? (
        <Text style={{ 
          marginTop: heightPixel(16),
          marginHorizontal: widthPixel(16),
        }}>
          Belum ada bengkel yang tersedia di sekitar lokasi yang dipilih
        </Text>
      ) : (
        <FlatList
          data={shops}
          renderItem={(info: ListRenderItemInfo<BengkelItem>) => (
            <TouchableOpacity onPress={() => handleClick(info.item)}>
              <BengkelListItem data={info.item} />
            </TouchableOpacity>
          )}
        />
      )}
      
    </BottomSheet>
    );
}
 
export default BottomSheetBengkelList;