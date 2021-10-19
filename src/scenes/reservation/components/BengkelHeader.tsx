import React from 'react'
import { View } from 'react-native';
import { Text } from 'react-native-elements';
import { Sizing } from 'styles/sizes';
import { BengkelItem } from '../constants';
import AuthorizedChips from './AuthorizedChips';

interface BengkelHeaderProps {
  data: BengkelItem
}
 
const BengkelHeader: React.FC<BengkelHeaderProps> = ({ data }) => {
  return ( 
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
   );
}
 
export default BengkelHeader;