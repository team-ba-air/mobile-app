import { NavigationProp } from '@react-navigation/native';
import CustomChips from 'components/CustomChips';
import React from 'react'
import { StyleSheet, View } from 'react-native';
import { Icon, Image, Text } from 'react-native-elements';
import { fontPixel, heightPixel, SCREEN_WIDTH, Sizing, widthPixel } from 'styles/sizes';
import { BengkelItem } from '../../constants';
import CarouselComponent from './CarouselComponent';

interface BengkelHeaderProps {
  data: BengkelItem
  navigation: NavigationProp<any>
}
 
const BengkelHeader: React.FC<BengkelHeaderProps> = ({ data, navigation }) => {
  return ( 
    <View>
      <CarouselComponent />
      {/* <Image style={{ width: SCREEN_WIDTH, height: heightPixel(60) }} source={require('@assets/placeholder_bengkel.png')} resizeMode={'contain'} /> */}
      <View style={styles.container}>
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
    </View>
   );
}
 
export default BengkelHeader;

const styles = StyleSheet.create({
  container: { 
    paddingHorizontal: widthPixel(20)
  }
})