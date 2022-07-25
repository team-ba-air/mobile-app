import CustomButton from 'components/CustomButton';
import React from 'react'
import { Image, Text, View } from 'react-native';
import { Color } from 'styles/colors';
import { fontPixel, heightPixel, widthPixel } from 'styles/sizes';

interface ModalLocationUnavailableProps {
  onGrant: () => void
}
 
const ModalLocationUnavailable: React.FC<ModalLocationUnavailableProps> = ({ onGrant }) => {
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
        <Image source={require('assets/red_trash.webp')}/>
        <Image source={require('assets/red_car.webp')}/>
      </View>
      

      <Text style={{ textAlign: 'center', fontSize: fontPixel(16), fontWeight: 'bold', marginTop: heightPixel(24) }}>
        Izinkan akses lokasi?
      </Text>
      <Text style={{ textAlign: 'center', fontSize: fontPixel(12), color: Color.gray.secondary, marginTop: heightPixel(8) }}>
        Untuk lanjut, Otoku membutuhkan izin untuk mengakses lokasi Anda.
      </Text>

      <CustomButton onPress={onGrant} style={{ marginTop: heightPixel(16) }} type='primary' title='Izinkan' />
    </View>
  );
}
 
export default ModalLocationUnavailable;