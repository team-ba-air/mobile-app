import CustomButton from 'components/CustomButton';
import React from 'react'
import { Image, Text, View } from 'react-native';
import { Color } from 'styles/colors';
import { fontPixel, heightPixel, widthPixel } from 'styles/sizes';

interface ModalFinishConfirmationProps {
  onConfirm: () => void
  onCancel: () => void
}
 
const ModalFinishConfirmation: React.FC<ModalFinishConfirmationProps> = ({ onConfirm, onCancel }) => {
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
        Konfirmasi Servis Selesai?
      </Text>
      <Text style={{ 
        textAlign: 'center', 
        fontSize: fontPixel(12), 
        color: Color.gray.secondary, 
        marginTop: heightPixel(8),
        lineHeight: 18,
      }}>
        Pastikan bahwa mobil sudah Anda terima dan Anda periksa sebelum mengkonfirmasi servis telah selesai.
      </Text>

      <CustomButton onPress={onConfirm} style={{ marginTop: heightPixel(16) }} type='primary' title='Ya, Servis Selesai' />
      <CustomButton onPress={onCancel} style={{ marginTop: heightPixel(8) }} type='secondary' title='Batal' />
    </View>
  );
}
 
export default ModalFinishConfirmation;