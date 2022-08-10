import BaseBottomSheet from "components/BaseBottomSheet";
import React from "react";
import { View, Text } from "react-native";
import { fontPixel, Sizing } from "styles/sizes";

interface BottomSheetVinProps {
  visible: boolean
  onChangeVisible: (visible: boolean) => void
}
  
const BottomSheetVin: React.FC<BottomSheetVinProps> = ({ visible, onChangeVisible }) => {
  return ( 
    <BaseBottomSheet visible={visible} onChangeVisible={onChangeVisible}>
      <View style={{ marginHorizontal: 20, marginBottom: 20 }}>
        <Text style={{ fontSize: fontPixel(Sizing.text.body[16]), fontWeight: 'bold' }}>Apa itu VIN?</Text>
        <Text style={{ fontSize: fontPixel(Sizing.text.body[14]), marginTop: 16, textAlign: 'justify', lineHeight: 21 }}>VIN (Vehicle Identification Number) adalah nomor yang digunakan untuk mengidentifikasi kendaraan. </Text>

        <Text style={{ fontSize: fontPixel(Sizing.text.body[14]), marginTop: 16, textAlign: 'justify', lineHeight: 21 }}>
          Nomor VIN dapat ditemukan di STNK, dan beberapa sisi kendaraan. Anda dapat menemukan nomor VIN di bawah Bonnet khususnya pada mesin depan, serta di antara Windshield Washer dan Front Car
        </Text>
      </View>
    </BaseBottomSheet>
    );
}
  
export default BottomSheetVin;