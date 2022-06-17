import CustomButton from 'components/CustomButton';
import React from 'react'
import { View, Image, Text } from 'react-native';
import { Color } from 'styles/colors';
import { widthPixel, heightPixel, fontPixel } from 'styles/sizes';

interface ModalRemoveAdditionalComponentProps {
  onRemove: () => void
  onCancel: () => void
}
 
const ModalRemoveAdditionalComponent: React.FC<ModalRemoveAdditionalComponentProps> = ({ onRemove, onCancel }) => {
  return ( 
    <View 
      style={{ 
        backgroundColor: 'white', 
        width: '90%', 
        borderRadius: 8, 
        alignSelf: 'center', 
        paddingHorizontal: widthPixel(16),
        paddingVertical: heightPixel(16),
      }}
    >
      <View style={{ flexDirection: 'row', alignItems: 'flex-end', justifyContent: 'center' }}>
        <Image source={require('assets/red_trash.webp')}/>
        <Image source={require('assets/red_car.webp')}/>
      </View>
      

      <Text style={{ textAlign: 'center', fontSize: fontPixel(16), fontWeight: 'bold', marginTop: heightPixel(24) }}>
        Batalkan Komponen Tambahan Ini?
      </Text>
      <Text style={{ textAlign: 'center', fontSize: fontPixel(12), color: Color.gray.secondary, marginTop: heightPixel(8) }}>
        Komponen ini ditandai sebagai penting oleh bengkel. Membatalkan komponen ini mungkin mempengaruhi hasil servis secara signifikan
      </Text>

      <CustomButton onPress={onRemove} style={{ marginTop: heightPixel(16) }} type='primary' title='Ya, Batalkan Komponen' />
      <CustomButton onPress={onCancel} style={{ marginTop: heightPixel(8) }} type='secondary' title='Batal' />
    </View>
  )
}
 
export default ModalRemoveAdditionalComponent;