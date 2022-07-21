import React from 'react'
import { FlatList, ListRenderItemInfo, Text, View, Image, TouchableOpacity } from 'react-native';
import { PaymentMethodItem, PaymentMethodSelectionItem } from 'scenes/checkout/constants';
import { Color } from 'styles/colors';
import { fontPixel, heightPixel, widthPixel } from 'styles/sizes';

interface PaymentMethodComponentProps {
  data: PaymentMethodItem
  onSelect: (item: PaymentMethodSelectionItem) => void
}
 
const PaymentMethodComponent: React.FC<PaymentMethodComponentProps> = ({ data, onSelect }) => {
  return ( 
    <View>
      <Text style={{ fontWeight: 'bold', fontSize: fontPixel(14), paddingBottom: heightPixel(8) }}>{data.method}</Text>
      <FlatList 
        data={data.item}
        renderItem={(info: ListRenderItemInfo<PaymentMethodSelectionItem>) => (
          <TouchableOpacity 
            onPress={() => onSelect(info.item)} 
            style={{
              borderBottomWidth: 1, 
              borderBottomColor: Color.gray[2],  
              paddingBottom: heightPixel(8),
              marginBottom: heightPixel(8),
            }} 
            disabled={!info.item.active}
          >
            <View style={{
              flexDirection: 'row', 
              justifyContent: 'space-between', 
              alignItems: 'center', 
              opacity: info.item.active ? 1 : 0.6,
            }}>
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Image source={{ uri: info.item.image, width: widthPixel(20), height: heightPixel(10) }} resizeMode={'contain'} />
                <Text style={{ fontSize: fontPixel(14), marginLeft: widthPixel(8) }}>{info.item.name} {!info.item.active && '(Segera tersedia)'}</Text>
              </View>
              <Image style={{ width: widthPixel(12), height: heightPixel(16)}} source={require('@assets/right-arrow.png')} resizeMode={'contain'} />
            </View>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}
 
export default PaymentMethodComponent;