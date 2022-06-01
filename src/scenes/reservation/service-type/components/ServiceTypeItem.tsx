import React, { useState } from 'react'
import { Text, TouchableOpacity, View } from 'react-native';
import { Image } from 'react-native-elements';
import { ServiceItem } from 'scenes/reservation/constants';
import { Color } from 'styles/colors';
import { fontPixel, heightPixel, widthPixel } from 'styles/sizes';

interface ServiceTypeItemProps {
  item: ServiceItem
}
 
const ServiceTypeItem: React.FC<ServiceTypeItemProps> = ({ item }) => {
  const [show, setShow] = useState<boolean>(false);
  return ( 
    <View style={{ width: '100%', paddingHorizontal: widthPixel(20) }}>
      <TouchableOpacity 
        onPress={() => setShow(!show)} 
        style={{ flexDirection: 'row', alignItems: 'center', paddingVertical: heightPixel(16), justifyContent: 'space-between' }}
      >
        <Text style={{ fontSize: fontPixel(14), fontWeight: 'bold', color: show ? Color.blue[8] : 'black' }}>{item.name}</Text>

        <Image
          style={{ width: 16, height: 16 }}
          source={require('@assets/icon/arrow_down.png')} 
          resizeMode={'contain'} 
        />
      </TouchableOpacity>

      <View style={{ borderBottomWidth: 1, borderStyle: 'solid', borderBottomColor: Color.gray[2] }}></View>
      
      {show && (
        <Text style={{ fontSize: fontPixel(14), marginTop: heightPixel(4), textAlign: 'justify' }}>{item.description}</Text>
      )}
      
    </View>
  );
}
 
export default ServiceTypeItem;