import React from 'react'
import { Text, View } from 'react-native';
import { Color } from 'styles/colors';
import { fontPixel } from 'styles/sizes';

interface NotesComponentProps {
    
}
 
const NotesComponent: React.FC<NotesComponentProps> = () => {
  return ( 
    <View>
      <Text style={{ fontSize: fontPixel(14), color: Color.gray.secondary }}>Catatan dari Bengkel</Text>
      <Text style={{ fontSize: fontPixel(14) }}>
        {'V-Belt dan Kampas Rem Bapak/Ibu sudah terlalu lama tidak diganti, kalau terlalu lama dibiarkan bisa merusak komponen lain. Untuk Filter sudah tidak optimal juga, tapi masih bisa tahan ~3 bulan kedepan.'}
      </Text>
    </View>
  );
}
 
export default NotesComponent;