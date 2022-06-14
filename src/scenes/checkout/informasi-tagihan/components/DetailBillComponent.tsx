import React, { useState } from 'react'
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { AdditionalComponentItem } from 'scenes/home/constants';
import { Color } from 'styles/colors';
import { fontPixel, heightPixel, widthPixel } from 'styles/sizes';
import { formatRupiah } from 'utils/TextUtils';

interface DetailBillComponentProps {
  additionalComponents: AdditionalComponentItem[]
}
 
const DetailBillComponent: React.FC<DetailBillComponentProps> = ({ additionalComponents }) => {
  const [showDetailAdditionalComponent, setShowDetailAdditionalComponent] = useState<boolean>(false)

  const totalPriceAdditionalComponent = additionalComponents.reduce((totalAccumulator, component) => totalAccumulator + component.price, 0)

  const additionalComponentListElement = additionalComponents.map((value, idx) => (
    <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', marginTop: heightPixel(4) }}>
      <Text style={{ fontSize: fontPixel(14), fontWeight: '500' }}>{idx + 1}. {value.name}</Text>
      <Text style={{ fontSize: fontPixel(14), fontWeight: '500' }}>{formatRupiah(value.price)}</Text>
    </View>
  ))

  return ( 
    <View style={{ backgroundColor: 'white', marginTop: heightPixel(8), paddingHorizontal: widthPixel(20), paddingVertical: heightPixel(20) }}>
      <Text style={{ fontSize: fontPixel(16), fontWeight: 'bold' }}>Rincian Tagihan</Text>

      <View style={{ marginTop: 16 }}>
        <Text style={styles.title}>Biaya Servis Awal</Text>
        <Text style={styles.content}>{formatRupiah(100000)}</Text>
      </View>

      <View style={{ marginTop: 16 }}>
        <Text style={styles.title}>Komponen Tambahan</Text>
        <TouchableOpacity 
          onPress={() => setShowDetailAdditionalComponent(!showDetailAdditionalComponent)} 
          style={{ 
            display: 'flex', 
            flexDirection: 'row', 
            alignItems: 'center', 
            justifyContent: 'space-between',
            borderBottomWidth: 1,
            borderBottomColor: Color.gray[4],
            paddingTop: heightPixel(4),
            paddingBottom: heightPixel(8),
            marginBottom: heightPixel(8),
          }}
        >
          <Text style={styles.content}>{formatRupiah(totalPriceAdditionalComponent)}</Text>
          <Image source={require('assets/icon/arrow_down.png')}/>
        </TouchableOpacity>
        {showDetailAdditionalComponent && (
          additionalComponentListElement
        )}
      </View>
    </View>
  );
}
 
export default DetailBillComponent;

const styles = StyleSheet.create({
  title: {
    fontSize: fontPixel(14),
    color: Color.gray.secondary,
  },
  content: {
    fontSize: fontPixel(14),
    fontWeight: 'bold',
  }
})