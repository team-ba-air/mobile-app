import React from 'react'
import { Text, View } from 'react-native';
import { Color } from 'styles/colors';
import { fontPixel, heightPixel, widthPixel } from 'styles/sizes';

interface InfoServiceComponentProps {
    
}
 
const InfoServiceComponent: React.FC<InfoServiceComponentProps> = () => {
  return ( 
    <View style={{ backgroundColor: 'white', paddingHorizontal: widthPixel(20), paddingVertical: heightPixel(16), marginBottom: heightPixel(8) }}>
      <View style={{ paddingVertical: heightPixel(16), paddingHorizontal: widthPixel(16), borderWidth: 2, borderRadius: 8, borderColor: Color.gray[2] }}>
        <Text style={{ fontSize: fontPixel(10), color: Color.gray.secondary, fontWeight: 'bold' }}>{'Car Family Service, Jakarta Utara'}</Text>
        <Text style={{ fontSize: fontPixel(14), fontWeight: 'bold' }}>{'Servis Logbook'} - {'Yaris'} {'B 2012 S'}</Text>

        <View style={{ borderBottomWidth: 1, borderBottomColor: Color.gray[1], paddingBottom: heightPixel(8), marginBottom: heightPixel(8) }}>
          <Text style={{ fontSize: fontPixel(10), color: Color.gray.secondary, fontStyle: 'italic', marginTop: heightPixel(4) }}>
            {'Kebetulan daerah saya lumayan banyak debu, AC saya jadi agak kurang dingin sih'}
          </Text>
        </View>

        <Text style={{ fontSize: fontPixel(10), color: Color.gray.secondary }}>Waktu Reservasi</Text>
        <Text style={{ fontSize: fontPixel(12) }}>{'Kamis, 7 Oktober 2021 10:00 WIB'}</Text>
      </View>
    </View>
  );
}
 
export default InfoServiceComponent;