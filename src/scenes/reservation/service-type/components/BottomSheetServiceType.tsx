import { SCREENS } from 'navigations/constants';
import React from 'react'
import { View, Text, FlatList, ListRenderItemInfo, TouchableOpacity } from 'react-native';
import { ServiceItem } from 'scenes/reservation/constants';
import { Sizing, widthPixel } from 'styles/sizes';
import BaseBottomSheet from 'components/base/BaseBottomSheet'
import ServiceTypeItem from './ServiceTypeItem';

interface BottomSheetServiceTypeProps {
  visible: boolean
  onChangeVisible: (visible: boolean) => void
  data: ServiceItem[]
}
 
const BottomSheetServiceType: React.FC<BottomSheetServiceTypeProps> = ({ onChangeVisible, visible, data }) => {
  return ( 
    <BaseBottomSheet onChangeVisible={onChangeVisible} visible={visible}>
      <View style={{ paddingHorizontal: widthPixel(20) }}>
        <Text style={{ fontSize: Sizing.text.body[16], fontWeight: 'bold' }}>Jenis-jenis servis yang tersedia di Otoku</Text>
      </View>
      <FlatList
        data={data}
        renderItem={(info: ListRenderItemInfo<ServiceItem>) => (
          <ServiceTypeItem item={info.item} />
        )}
      />
    </BaseBottomSheet>
  );
}
 
export default BottomSheetServiceType;