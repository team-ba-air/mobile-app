import React from 'react'
import { View, StyleSheet } from 'react-native';
import { Text } from 'react-native-elements';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { Color } from 'styles/colors';
import { Sizing } from 'styles/sizes';

interface InfoLocationProps {
  
}
 
const InfoLocation: React.FC<InfoLocationProps> = () => {
  return ( 
    <View style={styles.container}>
      <View>
        <Text style={{ fontSize: Sizing.text.subheading[18], color: Color.gray[0], fontWeight: 'bold' }}>Hi, Oto</Text>
      </View>
      <View style={{ marginTop: 12 }}>
        <Icon name='location-on-outlined' />
        <View>
          <Text style={{ fontSize: Sizing.text.body[11], color: Color.blue[1]}}>Lokasi Anda</Text>
          <Text style={{ fontSize: Sizing.text.body[12], color: Color.gray[0], fontWeight: 'bold' }}>Ancol, Jakarta Utara</Text>
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