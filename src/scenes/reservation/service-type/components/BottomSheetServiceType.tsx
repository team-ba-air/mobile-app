import { SCREENS } from 'navigations/constants';
import React from 'react'
import { View, Text, FlatList, ListRenderItemInfo, TouchableOpacity } from 'react-native';
import { ServiceItem } from 'scenes/reservation/constants';
import { fontPixel, heightPixel, Sizing, widthPixel } from 'styles/sizes';
import BaseBottomSheet from 'components/base/BaseBottomSheet'
import { Color } from 'styles/colors';

interface BottomSheetServiceTypeProps {
  visible: boolean
  onChangeVisible: (visible: boolean) => void
  data?: ServiceItem
}
 
const BottomSheetServiceType: React.FC<BottomSheetServiceTypeProps> = ({ onChangeVisible, visible, data }) => {
  return ( 
    <BaseBottomSheet onChangeVisible={onChangeVisible} visible={visible}>
      <View style={{ paddingHorizontal: widthPixel(20), paddingBottom: heightPixel(20), paddingTop: heightPixel(8) }}>
        <Text style={{ fontSize: Sizing.text.body[16], fontWeight: 'bold', marginBottom: heightPixel(16) }}>Apa itu {data?.name}?</Text>

        <Text style={{ fontSize: fontPixel(14), color: Color.gray[9], textAlign: 'justify', lineHeight: 21 }}>{data?.description}</Text>
      </View>
    </BaseBottomSheet>
  );
}
 
export default BottomSheetServiceType;