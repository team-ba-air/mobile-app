import React from 'react'
import { Text, TouchableOpacity } from 'react-native';
import { Color } from 'styles/colors';
import { fontPixel, heightPixel } from 'styles/sizes';

interface AddVehicleButtonProps {
  onPress: () => void
}
 
const AddVehicleButton: React.FC<AddVehicleButtonProps> = ({ onPress }) => {
  return ( 
    <TouchableOpacity
      style={{
        borderColor: Color.blue[7],
        borderWidth: 1,
        borderRadius: 4,
        borderStyle: 'dashed',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: heightPixel(8),
        marginVertical: heightPixel(8),
      }}
      onPress={onPress}
    >
      <Text style={{ fontWeight: 'bold', fontSize: fontPixel(14), color: Color.blue[7] }}>
        + Tambah Kendaraan
      </Text>
    </TouchableOpacity>
  );
}
 
export default AddVehicleButton;