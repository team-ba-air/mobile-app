import React from 'react'
import { Text, View } from 'react-native';
import { Color } from 'styles/colors';
import { fontPixel, heightPixel } from 'styles/sizes';

interface ProgressStatusProps {
    
}
 
const ProgressStatus: React.FC<ProgressStatusProps> = () => {
  return ( 
    <View>
      <Text style={{ fontSize: fontPixel(14), color: Color.gray.secondary }}>Status</Text>
      <Text style={{ fontSize: fontPixel(14), fontWeight: 'bold', marginBottom: heightPixel(16) }}>{'5 hari lagi'}</Text>

      <Text style={{ fontSize: fontPixel(14), color: Color.gray.secondary }}>Service Assistant</Text>
      <Text style={{ fontSize: fontPixel(14), fontWeight: 'bold', marginBottom: heightPixel(16) }}>{'Michael Hans'}</Text>

      <Text style={{ fontSize: fontPixel(14), color: Color.gray.secondary }}>Komponen Tambahan</Text>
      <Text style={{ fontSize: fontPixel(14), fontWeight: 'bold', marginBottom: heightPixel(16) }}>{'-'}</Text>
    </View>
  );
}
 
export default ProgressStatus;