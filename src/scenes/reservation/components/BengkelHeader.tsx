import React from 'react'
import { View } from 'react-native';
import { Image, Text } from 'react-native-elements';
import { Sizing } from 'styles/sizes';
import { BengkelItem } from '../constants';
import AuthorizedChips from './AuthorizedChips';

interface BengkelHeaderProps {
  data: BengkelItem
}
 
const BengkelHeader: React.FC<BengkelHeaderProps> = ({ data }) => {
  return ( 
    <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
      <View>
        <Text style={{ fontSize: Sizing.text.body[16], fontWeight: 'bold' }}>{data.name}, {data.location}</Text>
        <View style={{ display: 'flex', justifyContent: 'flex-start', flexDirection: 'row', marginTop: 8 }}>
          { data.isAuthorized && (
            <AuthorizedChips />
          )}
          <View style={{ marginLeft: 8 }}>
            <Text style={{ fontSize: Sizing.text.body[10], fontWeight: 'bold' }}>{data.rating}</Text>
          </View>
        </View>
        <Text style={{ marginTop: 12 }}>{data.description}</Text>
      </View>
      <Image style={{ width: 80, height: 60 }} source={require('@assets/placeholder_bengkel.png')} resizeMode={'contain'} />
    </View>
   );
}
 
export default BengkelHeader;