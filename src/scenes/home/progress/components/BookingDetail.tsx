import * as React from 'react';
import { Text, View } from 'react-native';
import { Color } from 'styles/colors';
import { fontPixel, heightPixel } from 'styles/sizes';

interface BookingDetailProps {
    
}
 
const BookingDetail: React.FC<BookingDetailProps> = () => {
  return (  
    <View>
      <Text style={{ fontSize: fontPixel(14), color: Color.gray.secondary }}>Mobil</Text>
      <Text style={{ fontSize: fontPixel(14), fontWeight: 'bold', marginBottom: heightPixel(16) }}>{'Yaris'} {'B 2012 S'}</Text>

      <Text style={{ fontSize: fontPixel(14), color: Color.gray.secondary }}>Bengkel</Text>
      <Text style={{ fontSize: fontPixel(14), fontWeight: 'bold', marginBottom: heightPixel(16) }}>{'Auto 2000, Jakarta Utara'}</Text>

      <Text style={{ fontSize: fontPixel(14), color: Color.gray.secondary }}>Servis</Text>
      <Text style={{ fontSize: fontPixel(14), fontWeight: 'bold', marginBottom: heightPixel(16) }}>{'-'}</Text>

      <Text style={{ fontSize: fontPixel(14), color: Color.gray.secondary }}>Waktu</Text>
      <Text style={{ fontSize: fontPixel(14), fontWeight: 'bold' }}>{'Kamis, 7 Oktober 2020'}</Text>
      <Text style={{ fontSize: fontPixel(14), fontWeight: 'bold', marginBottom: heightPixel(16) }}>{'10:00 WIB'}</Text>

      <Text style={{ fontSize: fontPixel(14), color: Color.gray.secondary }}>Catatan Tambahan</Text>
      <Text style={{ fontSize: fontPixel(14), fontWeight: 'bold', marginBottom: heightPixel(16) }}>{'Kebetulan daerah saya lumayan banyak debu, AC saya jadi agak kurang dingin sih'}</Text>
    
      <Text style={{ fontSize: fontPixel(14), color: Color.gray.secondary }}>Biaya</Text>
      <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
        <Text style={{ fontSize: fontPixel(16), fontWeight: 'bold' }}>{'Rp490.000'}</Text>
        <Text style={{ fontSize: fontPixel(11), fontWeight: 'bold', color: Color.blue[8] }}>Belum lunas (pembayaran di bengkel)</Text>
      </View>
      
    </View>
  );
}
 
export default BookingDetail;