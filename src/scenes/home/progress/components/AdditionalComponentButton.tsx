import React from 'react'
import { Text, TouchableOpacity } from 'react-native';
import { Badge } from 'react-native-elements';
import { Color } from 'styles/colors';
import { fontPixel, heightPixel } from 'styles/sizes';

interface AdditionalComponentButtonProps {
  onPress: () => void
}
 
const AdditionalComponentButton: React.FC<AdditionalComponentButtonProps> = ({ onPress }) => {
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
        Ada Kebutuhan Komponen Tambahan
      </Text>
      <Badge status='error' containerStyle={{ position: 'absolute', top: -4, right: -4}} />
    </TouchableOpacity>
  );
}
 
export default AdditionalComponentButton;