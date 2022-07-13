import { SCREENS } from 'navigations/constants';
import React, { useState } from 'react'
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { Icon, Text } from 'react-native-elements';
import { Color } from 'styles/colors';
import { Sizing } from 'styles/sizes';
import Geocoder from 'react-native-geocoder';

interface InfoLocationProps {
  navigation: any
}
 
const InfoLocation: React.FC<InfoLocationProps> = ({ navigation }) => {
  const [address, setAddress] = useState('')
  // var NY = {
  //   lat: -6.2347,
  //   lng: 106.8082,
  // };
  var NY = {
    lat: 37.4216863,
    lng: -122.0842771,
  }
  
  Geocoder.geocodePosition(NY).then(res => {
      // res is an Array of geocoding object (see below)
      console.log(res[0])
      const formattedAddress = res[0].formattedAddress.split(', ')[0]
      const subLocality = res[0].subLocality
      setAddress(`${formattedAddress}${subLocality ? `, ${subLocality}` : ''}`)
  })
  .catch(err => console.log(err))
  
  return ( 
    <TouchableOpacity style={styles.container} onPress={() => navigation.navigate(SCREENS.app.maps)}>
      <View>
        <Text style={{ fontSize: Sizing.text.subheading[18], color: Color.gray[0], fontWeight: 'bold' }}>Hi, Oto</Text>
      </View>
      <View style={{ marginTop: 12, flexDirection: 'row', alignItems: 'center' }}>
        <Icon type='material' name='location-on' color={Color.red[4]} tvParallaxProperties={undefined} />
        <View>
          <Text style={{ fontSize: Sizing.text.body[11], color: Color.blue[1]}}>Lokasi Anda</Text>
          <Text style={{ fontSize: Sizing.text.body[12], color: Color.gray[0], fontWeight: 'bold' }}>{address ? address : '-'}</Text>
        </View>
      </View>
    </TouchableOpacity>
   );
}
 
export default InfoLocation;

const styles = StyleSheet.create({
  container: { 
    backgroundColor: Color.blue[8], 
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    paddingLeft: 20, 
    paddingRight: 20,
  },
})