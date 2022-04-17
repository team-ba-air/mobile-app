import React from 'react'
import { Text, View } from 'react-native';
import { Color } from 'styles/colors';
import { fontPixel } from 'styles/sizes';

interface PaymentDetailComponentProps {
    
}
 
const PaymentDetailComponent: React.FC<PaymentDetailComponentProps> = () => {
  const dummyAdditionalComponent = [
    {
      name: 'V-belt',
      price: 500000,
    }
  ]
  return ( 
    <View>
      <Text style={{ fontSize: fontPixel(14), fontWeight: 'bold' }}>Rincian Pembayaran</Text>

      <Text style={{ fontSize: fontPixel(14), color: Color.gray.secondary }}>Biaya Servis Awal</Text>
      <Text style={{ fontSize: fontPixel(14) }}>{'Rp500.000'}</Text>

      <Text style={{ fontSize: fontPixel(14), color: Color.gray.secondary }}>Metode Pembayaran (Servis Awal)</Text>
      <Text style={{ fontSize: fontPixel(14) }}>{'BCA Virtual Account'}</Text>

      <Text style={{ fontSize: fontPixel(14), color: Color.gray.secondary }}>Komponen Tambahan</Text>
      {dummyAdditionalComponent.map(value => (
        <View>
          <Text>{value.name}</Text>
          <Text>{value.price}</Text>
        </View>
      ))}

      <Text style={{ fontSize: fontPixel(14), color: Color.gray.secondary }}>Metode Pembayaran (Tambahan)</Text>
      <Text style={{ fontSize: fontPixel(14) }}>{'Tunai (Bayar di Bengkel)'}</Text>

      <Text style={{ fontSize: fontPixel(14), color: Color.gray.secondary }}>Total Bayar</Text>
      <Text style={{ fontSize: fontPixel(14), fontWeight: 'bold' }}>{'Rp930.000'}</Text>
    </View>
  );
}
 
export default PaymentDetailComponent;