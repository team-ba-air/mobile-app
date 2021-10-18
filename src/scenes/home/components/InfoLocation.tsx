import React from 'react'
import { View } from 'react-native';
import { Text } from 'react-native-elements';
import { Color } from 'styles/colors';
import { Sizing } from 'styles/sizes';

interface InfoLocationProps {
  
}
 
const InfoLocation: React.FC<InfoLocationProps> = () => {
  return ( 
    <View style={{ backgroundColor: Color.blue[8] }}>
      <View>
        <Text style={{ fontSize: Sizing.text.subheading[18], color: Color.gray[0], fontWeight: 'bold' }}>Hi, Oto</Text>
      </View>
      <View style={{ marginTop: 12 }}>
        <Text style={{ fontSize: Sizing.text.body[12], color: Color.gray[0]}}>Lokasi Anda</Text>
        <Text style={{ fontSize: Sizing.text.body[14], color: Color.gray[0], fontWeight: 'bold' }}>Lokasi Anda</Text>
      </View> 
    </View>
   );
}
 
export default InfoLocation;