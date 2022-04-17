import React from 'react'
import { View, Text } from 'react-native';
import { Color } from 'styles/colors';
import { fontPixel } from 'styles/sizes';

interface HistoryStatusComponentProps {
    
}
 
const HistoryStatusComponent: React.FC<HistoryStatusComponentProps> = () => {
  return ( 
    <View>
      <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
        <View>
          <Text style={{ fontSize: fontPixel(14), color: Color.gray.secondary }}>Nomor Booking</Text>
          <Text style={{ fontSize: fontPixel(14), fontWeight: 'bold' }}>{'1232132ASDASD'}</Text>
        </View>

        <View>
          <Text style={{ fontSize: fontPixel(11), color: Color.blue[8] }}>Lihat Invoice</Text>
        </View>
      </View>
      
      <View>
        <Text style={{ fontSize: fontPixel(14), color: Color.gray.secondary }}>Status</Text>
        <Text style={{ fontSize: fontPixel(14), fontWeight: 'bold' }}>{'Selesai'}</Text>
      </View>
    </View>
  );
}
 
export default HistoryStatusComponent;