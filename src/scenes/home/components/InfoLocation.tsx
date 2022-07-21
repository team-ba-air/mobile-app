import React, { useEffect, useState } from 'react'
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { Icon, Text } from 'react-native-elements';
import { Color } from 'styles/colors';
import { fontPixel, SCREEN_WIDTH, Sizing } from 'styles/sizes';
import Geocoder from 'react-native-geocoder';
import { getName } from 'utils/StorageUtils';

interface InfoLocationProps {
  navigation: any
}
 
const InfoLocation: React.FC<InfoLocationProps> = ({ navigation }) => {
  const [name, setName] = useState('Yahya Yahya Yahya')
  const [address, setAddress] = useState('')
  // var NY = {
  //   lat: -6.2347,
  //   lng: 106.8082,
  // };
  var NY = {
    lat: 37.4216863,
    lng: -122.0842771,
  }
  
  Geocoder.geocodePosition(NY).then((res: any) => {
      // res is an Array of geocoding object (see below)
      console.log('GEOCODER')
      console.log(res[0])
      const formattedAddress = res[0].formattedAddress.split(', ')[0]
      const subLocality = res[0].subLocality
      setAddress(`${formattedAddress}${subLocality ? `, ${subLocality}` : ''}`)
  })
  .catch((err: any) => console.log(err))

  useEffect(() => {
    getName().then(value => setName(value))
  }, [])
  
  return ( 
    <View style={styles.container}>
      <View>
        <Text 
          style={{ 
            fontSize: fontPixel(Sizing.text.subheading[18]), 
            color: Color.gray[0], 
            fontWeight: 'bold',
            maxWidth: SCREEN_WIDTH * 0.5,
          }}
          numberOfLines={1}
          ellipsizeMode={'tail'}
        >
          {name ? `Hi, ${name}` : ''}
        </Text>
      </View>
      <View style={{ marginTop: 12, flexDirection: 'row', alignItems: 'center', maxWidth: '50%' }}>
        <Icon type='material' name='location-on' color={Color.red[4]} tvParallaxProperties={undefined} />
        <View>
          <Text style={{ fontSize: fontPixel(Sizing.text.body[11]), color: Color.blue[1]}}>Lokasi Anda</Text>
          <Text numberOfLines={1} ellipsizeMode={'tail'} style={{ fontSize: fontPixel(Sizing.text.body[12]), color: Color.gray[0], fontWeight: 'bold' }}>{address ? address : '-'}</Text>
        </View>
      </View>
    </View>
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