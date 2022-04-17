import React from 'react'
import { Text, View } from 'react-native';
import { Color } from 'styles/colors';
import { fontPixel, heightPixel, widthPixel } from 'styles/sizes';

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
    <View style={{ backgroundColor: 'white', paddingHorizontal: widthPixel(20), paddingVertical: heightPixel(16), marginBottom: heightPixel(8) }}>
      <Text style={{ fontSize: fontPixel(14), fontWeight: 'bold', marginBottom: heightPixel(16) }}>Rincian Pembayaran</Text>

      <Text style={{ fontSize: fontPixel(14), color: Color.gray.secondary }}>Biaya Servis Awal</Text>
      <Text style={{ fontSize: fontPixel(14), marginBottom: heightPixel(16) }}>{'Rp500.000'}</Text>

      <Text style={{ fontSize: fontPixel(14), color: Color.gray.secondary }}>Metode Pembayaran (Servis Awal)</Text>
      <Text style={{ fontSize: fontPixel(14), marginBottom: heightPixel(16) }}>{'BCA Virtual Account'}</Text>

      <View style={{ marginBottom: heightPixel(16) }}>
        <Text style={{ fontSize: fontPixel(14), color: Color.gray.secondary }}>Komponen Tambahan</Text>
        {dummyAdditionalComponent.map((value, idx) => (
          <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
            <Text>{idx + 1}. {value.name}</Text>
            <Text>{value.price}</Text>
          </View>
        ))}
      </View>

      <Text style={{ fontSize: fontPixel(14), color: Color.gray.secondary }}>Metode Pembayaran (Tambahan)</Text>
      <Text style={{ fontSize: fontPixel(14), marginBottom: heightPixel(16) }}>{'Tunai (Bayar di Bengkel)'}</Text>

      <Text style={{ fontSize: fontPixel(14), color: Color.gray.secondary }}>Total Bayar</Text>
      <Text style={{ fontSize: fontPixel(14), fontWeight: 'bold' }}>{'Rp930.000'}</Text>
    </View>
  );
}
 
export default PaymentDetailComponent;