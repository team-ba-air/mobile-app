import { SCREENS } from 'navigations/constants';
import React, { useCallback, useRef, useState } from 'react'
import { View, Text, FlatList, ListRenderItemInfo, TouchableOpacity } from 'react-native';
import { BengkelItem } from 'scenes/reservation/constants';
import BengkelListItem from 'scenes/reservation/maps/components/BengkelListItem';
import { widthPixel, Sizing } from 'styles/sizes';
import BaseBottomSheet from 'components/base/BaseBottomSheet'

interface BottomSheetServiceTypeProps {
  visible: boolean
  onChangeVisible: (visible: boolean) => void
}
 
const BottomSheetServiceType: React.FC<BottomSheetServiceTypeProps> = ({ onChangeVisible, visible }) => {
  return ( 
    <BaseBottomSheet onChangeVisible={onChangeVisible} visible={visible}>
      <View>
        <Text style={{ fontSize: Sizing.text.body[16], fontWeight: 'bold' }}>Jenis-jenis servis yang tersedia di Otoku</Text>
      </View>
      <FlatList
        data={[]}
        renderItem={(info: ListRenderItemInfo<BengkelItem>) => (
          <BengkelListItem data={info.item} />
        )}
      />
    </BaseBottomSheet>
  );
}
 
export default BottomSheetServiceType;