import React from 'react'
import { Text, View } from 'react-native';
import { Color } from 'styles/colors';
import { fontPixel } from 'styles/sizes';

interface InfoServiceComponentProps {
    
}
 
const InfoServiceComponent: React.FC<InfoServiceComponentProps> = () => {
  return ( 
    <View>
      <Text style={{ fontSize: fontPixel(10), color: Color.gray.secondary, fontWeight: 'bold' }}>{'Car Family Service, Jakarta Utara'}</Text>
      <Text style={{ fontSize: fontPixel(14), fontWeight: 'bold' }}>{'Servis Logbook'} - {'Yaris'} {'B 2012 S'}</Text>

      <Text style={{ fontSize: fontPixel(10), color: Color.gray.secondary, fontStyle: 'italic' }}>
        {'Kebetulan daerah saya lumayan banyak debu, AC saya jadi agak kurang dingin sih'}
      </Text>

      <Text style={{ fontSize: fontPixel(10), color: Color.gray.secondary }}>Waktu Reservasi</Text>
      <Text style={{ fontSize: fontPixel(12) }}>{'Kamis, 7 Oktober 2021 10:00 WIB'}</Text>
    </View>
  );
}
 
export default InfoServiceComponent;