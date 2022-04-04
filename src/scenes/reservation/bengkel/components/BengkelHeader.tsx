import CustomChips from 'components/CustomChips';
import React from 'react'
import { View } from 'react-native';
import { Image, Text } from 'react-native-elements';
import { fontPixel, heightPixel, Sizing, widthPixel } from 'styles/sizes';
import { BengkelItem } from '../../constants';

interface BengkelHeaderProps {
  data: BengkelItem
}
 
const BengkelHeader: React.FC<BengkelHeaderProps> = ({ data }) => {
  return ( 
    <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
      <View>
        <Text style={{ fontSize: fontPixel(Sizing.text.body[16]), fontWeight: 'bold' }}>{data.name}, {data.location}</Text>
        <View style={{ display: 'flex', justifyContent: 'flex-start', flexDirection: 'row', marginTop: 8 }}>
          { data.isAuthorized && (
            <CustomChips text={'Authorized'} />
          )}
          <View style={{ marginLeft: 8 }}>
            <Text style={{ fontSize: fontPixel(Sizing.text.body[10]), fontWeight: 'bold' }}>{data.rating}</Text>
          </View>
        </View>
        <Text style={{ marginTop: 12 }}>{data.description}</Text>
      </View>
      <Image style={{ width: widthPixel(80), height: heightPixel(60) }} source={require('@assets/placeholder_bengkel.png')} resizeMode={'contain'} />
    </View>
   );
}
 
export default BengkelHeader;