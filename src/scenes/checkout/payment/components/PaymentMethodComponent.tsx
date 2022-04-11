import React from 'react'
import { FlatList, ListRenderItemInfo, Text, View, Image, StyleSheet } from 'react-native';
import { PaymentMethodItem, PaymentMethodSelectionItem } from 'scenes/checkout/constants';
import { Color } from 'styles/colors';
import { fontPixel, heightPixel, widthPixel } from 'styles/sizes';

interface PaymentMethodComponentProps {
  data: PaymentMethodItem
}
 
const PaymentMethodComponent: React.FC<PaymentMethodComponentProps> = ({ data }) => {
  return ( 
    <View>
      <Text style={{ fontWeight: 'bold', fontSize: fontPixel(14), paddingBottom: heightPixel(8) }}>{data.method}</Text>
      <FlatList 
        data={data.item}
        renderItem={(info: ListRenderItemInfo<PaymentMethodSelectionItem>) => (
          <View style={styles.containerItem}>
            <Text style={{ fontSize: fontPixel(14) }}>{info.item.name}</Text>
            <Image style={{ width: widthPixel(12), height: heightPixel(16)}} source={require('@assets/right-arrow.png')} resizeMode={'contain'} />
          </View>
        )}
      />
    </View>
  );
}
 
export default PaymentMethodComponent;

const styles = StyleSheet.create({
  containerItem: {
    borderBottomWidth: 1, 
    borderBottomColor: Color.gray[2], 
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    alignItems: 'center', 
    paddingBottom: heightPixel(8),
    marginBottom: heightPixel(8)
  }
})