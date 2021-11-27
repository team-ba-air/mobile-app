import { SCREENS } from 'navigations/constants';
import React from 'react'
import { StyleSheet, View } from 'react-native';
import { Image, Text } from 'react-native-elements';
import { Color } from 'styles/colors';
import { Sizing } from 'styles/sizes';
import { BengkelItem } from '../constants';
import AuthorizedChips from './AuthorizedChips';

interface BengkelListItemProps {
  data: BengkelItem
}
 
const BengkelListItem: React.FC<BengkelListItemProps> = ({ data }) => {
  return ( 
    <View style={styles.container}>
      <View style={{ display: 'flex', alignItems: 'center', flexDirection: 'row' }}>
        <View>
          <Image 
            style={{ width: 80, height: 60 }}
            source={require('@assets/placeholder_bengkel.png')}
            resizeMode={'contain'}
          />
        </View>
        <View style={{ marginTop: 16 }}>
          <View style={[styles.header]}>
            <Text style={[styles.subtitle]}>Tutup sebentar lagi</Text>
          </View>
          <Text style={styles.name}>{data.name}, {data.location}</Text>
          <Text style={styles.subtitle}>{data.description}</Text>
          <Text style={[styles.subtitle, styles.pickUp, { marginTop: 16 }]}>Dijemput dalam {data.estimatedPickUp} menit</Text>
        </View>
      </View>
      <View style={{ marginTop: 16 }}>
        { data.isAuthorized && (
          <AuthorizedChips />
        )}
      </View>
    </View>
  );
}
 
export default BengkelListItem;

const styles = StyleSheet.create({
  container: {
    borderBottomWidth: 1, 
    borderBottomColor: Color.gray[2], 
    paddingBottom: 16,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
  name: {
    fontSize: Sizing.text.body[14],
    fontWeight: 'bold',
  },
  subtitle: {
    fontSize: Sizing.text.body[10],
    color: Color.gray.secondary,
  },
  pickUp: {
    fontWeight: 'bold',
  },
})