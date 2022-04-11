import AppContainer from 'components/AppContainer';
import React from 'react'
import { Text, View } from 'react-native';
import { Color } from 'styles/colors';
import { fontPixel, heightPixel } from 'styles/sizes';

interface PaymentDetailScreenProps {
    
}
 
const PaymentDetailScreen: React.FC<PaymentDetailScreenProps> = () => {
  return ( 
    <AppContainer>
      <View style={{ marginBottom: heightPixel(24) }}>
        <Text style={{ fontSize: fontPixel(14), color: Color.gray.secondary }}>Total Tagihan</Text>
        <Text style={{ fontSize: fontPixel(16), color: Color.red[7], fontWeight: 'bold' }}>Rp1.000.000</Text>
      </View>

      <View>
        <Text style={{ fontSize: fontPixel(14), color: Color.gray.secondary }}>Metode Pembayaran</Text>
        <Text style={{ fontSize: fontPixel(14), fontWeight: 'bold' }}>BCA Virtual Account</Text>
      </View>
    </AppContainer>
  );
}
 
export default PaymentDetailScreen;