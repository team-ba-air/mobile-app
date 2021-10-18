import { SCREENS } from 'navigations/constants';
import React from 'react'
import { StyleSheet, View } from 'react-native';
import { Text } from 'react-native-elements';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Color } from 'styles/colors';
import { Sizing } from 'styles/sizes';
import { BengkelItem } from '../constants';
import AuthorizedChips from './AuthorizedChips';

interface BengkelListItemProps {
  data: BengkelItem
  navigation: any
}
 
const BengkelListItem: React.FC<BengkelListItemProps> = ({ data, navigation }) => {
  return ( 
    <TouchableOpacity onPress={navigation.navigate(SCREENS.reservation.bengkelFormReservation, { data })}>
      <View style={{ borderBottomWidth: 1, borderBottomColor: Color.gray[2], paddingBottom: 16 }}>
        <View>

        </View>
        <View style={{ marginTop: 16 }}>
          <View style={[styles.header]}>
            <Text style={[styles.subtitle]}>Tutup sebentar lagi</Text>
            { data.isAuthorized && (
              <AuthorizedChips />
            )}
          </View>
          <Text style={styles.name}>{data.name}, {data.location}</Text>
          <Text style={styles.subtitle}>{data.description}</Text>
          <Text style={[styles.subtitle, styles.pickUp, { marginTop: 16 }]}>Dijemput dalam {data.estimatedPickUp} menit</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}
 
export default BengkelListItem;

const styles = StyleSheet.create({
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