import CustomButton from 'components/CustomButton';
import React from 'react'
import { View, Image, Text } from 'react-native';
import { Color } from 'styles/colors';
import { widthPixel, heightPixel, fontPixel } from 'styles/sizes';

interface ModalConfirmationProps {
  onConfirm: () => void
  onCancel: () => void
}
 
const ModalConfirmation: React.FC<ModalConfirmationProps> = ({ onConfirm, onCancel }) => {
  return ( 
    <View 
      style={{ 
        backgroundColor: 'white', 
        width: '80%', 
        borderRadius: 8, 
        alignSelf: 'center', 
        paddingHorizontal: widthPixel(16),
        paddingVertical: heightPixel(16),
      }}
    >
      <View style={{ flexDirection: 'row', alignItems: 'flex-end', justifyContent: 'center' }}>
        <Image source={require('assets/board_check.webp')}/>
      </View>
      
      <Text style={{ textAlign: 'center', fontSize: fontPixel(16), fontWeight: 'bold', marginTop: heightPixel(24) }}>
        Konfirmasi Komponen Tambahan Ini?
      </Text>
      <Text style={{ 
        textAlign: 'center', 
        fontSize: fontPixel(12), 
        color: Color.gray.secondary, 
        marginTop: heightPixel(8),
        lineHeight: 18,
      }}>
        Pastikan bahwa Anda sudah yakin dengan pilihan Anda, karena apa yang Anda pilih tidak dapat diganti dan akan langsung dikerjakan oleh mekanik.
      </Text>

      <CustomButton onPress={onConfirm} style={{ marginTop: heightPixel(16) }} type='primary' title='Ya, Setuju' />
      <CustomButton onPress={onCancel} style={{ marginTop: heightPixel(8) }} type='secondary' title='Batal' />
    </View>
  );
}
 
export default ModalConfirmation;