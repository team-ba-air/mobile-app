import CustomButton from 'components/CustomButton';
import React from 'react'
import { Image, Text, View } from 'react-native';
import { Color } from 'styles/colors';
import { fontPixel, heightPixel, widthPixel } from 'styles/sizes';
import { VehicleItem } from '../constants';

interface ModalDeleteVehicleProps {
  data: VehicleItem | null
  onDelete: () => void
  onCancel: () => void
}
 
const ModalDeleteVehicle: React.FC<ModalDeleteVehicleProps> = ({ data, onDelete, onCancel }) => {
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
        Hapus Mobil {data?.type} {data?.plat}?
      </Text>
      <Text style={{ textAlign: 'center', fontSize: fontPixel(12), color: Color.gray.secondary, marginTop: heightPixel(8) }}>
        Anda akan menghapus mobil ini dari daftar kendaraan Anda secara permanen.
      </Text>

      <CustomButton onPress={onDelete} style={{ marginTop: heightPixel(16) }} type='primary' title='Ya, Hapus Mobil' />
      <CustomButton onPress={onCancel} style={{ marginTop: heightPixel(8) }} type='secondary' title='Batal' />
    </View>
  );
}
 
export default ModalDeleteVehicle;