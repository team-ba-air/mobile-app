import BaseBottomSheet from 'components/BaseBottomSheet';
import React from 'react'
import { Text, View } from 'react-native';
import { Color } from 'styles/colors';
import { fontPixel, heightPixel, widthPixel } from 'styles/sizes';

interface BottomSheetPriceEstimationProps {
  visible: boolean
  onChangeVisible: (visible: boolean) => void
}
 
const BottomSheetPriceEstimation: React.FC<BottomSheetPriceEstimationProps> = ({ onChangeVisible, visible }) => {
  return ( 
    <BaseBottomSheet onChangeVisible={onChangeVisible} visible={visible}>
      <View style={{ paddingHorizontal: widthPixel(20), paddingBottom: heightPixel(20), paddingTop: heightPixel(8) }}>
        <Text style={{ fontSize: fontPixel(16), fontWeight: 'bold', marginBottom: heightPixel(16) }}>
          Kenapa disebut Estimasi Biaya?
        </Text>

        <Text style={{ fontSize: fontPixel(14), color: Color.gray[9], textAlign: 'justify', lineHeight: 21 }}>
          Biaya masih merupakan estimasi karena biaya yang tertera adalah biaya dasar untuk paket servis yang dipilih. 
        </Text>

        <Text style={{ fontSize: fontPixel(14), color: Color.gray[9], textAlign: 'justify', lineHeight: 21, marginTop: heightPixel(8) }}>
          Saat servis dilakukan, mungkin terdapat penambahan biaya akibat penambahan komponen. Tidak perlu khawatir, penambahan biaya apapun akan meminta membutuhkan  persetujuan Anda. 
        </Text>
      </View>
    </BaseBottomSheet>
  );
}
 
export default BottomSheetPriceEstimation;