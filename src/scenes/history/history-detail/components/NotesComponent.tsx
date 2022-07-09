import React from 'react'
import { Text, View } from 'react-native';
import { Color } from 'styles/colors';
import { fontPixel, heightPixel, widthPixel } from 'styles/sizes';

interface NotesComponentProps {
  notes: string
}
 
const NotesComponent: React.FC<NotesComponentProps> = ({ notes }) => {
  const sampleNotes = 'V-Belt dan Kampas Rem Bapak/Ibu sudah terlalu lama tidak diganti, kalau terlalu lama dibiarkan bisa merusak komponen lain. Untuk Filter sudah tidak optimal juga, tapi masih bisa tahan ~3 bulan kedepan.'
  return ( 
    <View style={{ backgroundColor: 'white', paddingHorizontal: widthPixel(20), paddingVertical: heightPixel(16), marginBottom: heightPixel(8) }}>
      <Text style={{ fontSize: fontPixel(14), color: Color.gray.secondary }}>Catatan dari Bengkel</Text>
      <Text style={{ fontSize: fontPixel(14), textAlign: 'justify' }}>
        {sampleNotes}
      </Text>
    </View>
  );
}
 
export default NotesComponent;