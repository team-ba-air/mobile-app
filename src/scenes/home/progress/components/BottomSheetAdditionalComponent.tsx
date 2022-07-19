import BaseBottomSheet from 'components/BaseBottomSheet'
import React from 'react'
import { Text, View } from 'react-native'
import { Color } from 'styles/colors'
import { fontPixel, heightPixel, widthPixel } from 'styles/sizes'

interface BottomSheetAdditionalComponentProps {
  visible: boolean
  onChangeVisible: (visible: boolean) => void
}
 
const BottomSheetAdditionalComponent: React.FC<BottomSheetAdditionalComponentProps> = ({ onChangeVisible, visible }) => {
  return ( 
    <BaseBottomSheet onChangeVisible={onChangeVisible} visible={visible}>
      <View style={{ paddingHorizontal: widthPixel(20), paddingBottom: heightPixel(20), paddingTop: heightPixel(8) }}>
        <Text style={{ fontSize: fontPixel(16), fontWeight: 'bold', marginBottom: heightPixel(16) }}>
          Apa yang dimaksud dengan Komponen Tambahan?
        </Text>

        <Text style={{ fontSize: fontPixel(14), color: Color.gray[9], textAlign: 'justify', lineHeight: 21 }}>
          Pada pengerjaan servis, seringkali terdapat komponen yang harus diganti dan tidak termasuk dengan biaya servis awal. Penambahan komponen baru dapat diketahui ketika mekanik sedang melakukan inspeksi yang mendalam.
        </Text>

        <Text style={{ fontSize: fontPixel(14), color: Color.gray[9], textAlign: 'justify', lineHeight: 21 }}>
          Karena tidak termasuk dengan biaya servis awal, maka penambahan komponen memerlukan penambahan biaya. Karena itu, dibutuhkan persetujuan dari pemilik kendaraan sebelum servis dilanjutkan.
        </Text>
      </View>
    </BaseBottomSheet>
  );
}
 
export default BottomSheetAdditionalComponent;