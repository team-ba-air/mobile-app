import React from 'react'
import { Text, View } from 'react-native';
import { PaymentMethodSelectionItem } from 'scenes/checkout/constants';
import { AdditionalComponentItem } from 'scenes/home/constants';
import { Color } from 'styles/colors';
import { fontPixel, heightPixel, widthPixel } from 'styles/sizes';
import { formatRupiah } from 'utils/TextUtils';

interface PaymentDetailComponentProps {
  additionalComponent: AdditionalComponentItem[]
  servicePrice: number
  paymentMethod: PaymentMethodSelectionItem | null
}
 
const PaymentDetailComponent: React.FC<PaymentDetailComponentProps> = ({
  additionalComponent,
  servicePrice,
  paymentMethod
}) => {
  const totalPriceAdditionalComponent = additionalComponent.reduce((totalAccumulator, component) => totalAccumulator + component.price, 0)

  return ( 
    <View style={{ backgroundColor: 'white', paddingHorizontal: widthPixel(20), paddingVertical: heightPixel(16), marginBottom: heightPixel(8) }}>
      <Text style={{ fontSize: fontPixel(14), fontWeight: 'bold', marginBottom: heightPixel(16) }}>Rincian Pembayaran</Text>

      <Text style={{ fontSize: fontPixel(14), color: Color.gray.secondary }}>Biaya Servis Awal</Text>
      <Text style={{ fontSize: fontPixel(14), marginBottom: heightPixel(16) }}>{formatRupiah(servicePrice)}</Text>

      <View style={{ marginBottom: heightPixel(16) }}>
        <Text style={{ fontSize: fontPixel(14), color: Color.gray.secondary }}>Komponen Tambahan</Text>
        {additionalComponent.length === 0 && (
          <Text style={{ fontSize: fontPixel(14) }}>
            -
          </Text>
        )}
        {additionalComponent.map((value, idx) => (
          <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
            <Text>{idx + 1}. {value.name}</Text>
            <Text>{formatRupiah(value.price)}</Text>
          </View>
        ))}
      </View>

      {paymentMethod && (
        <View>
          <Text style={{ fontSize: fontPixel(14), color: Color.gray.secondary }}>Metode Pembayaran</Text>
          <Text style={{ fontSize: fontPixel(14), marginBottom: heightPixel(16) }}>{paymentMethod.name}</Text>
        </View>
      )}
      
      <Text style={{ fontSize: fontPixel(14), color: Color.gray.secondary }}>Total Bayar</Text>
      <Text style={{ fontSize: fontPixel(14), fontWeight: 'bold' }}>{formatRupiah(servicePrice + totalPriceAdditionalComponent)}</Text>
    </View>
  );
}
 
export default PaymentDetailComponent;