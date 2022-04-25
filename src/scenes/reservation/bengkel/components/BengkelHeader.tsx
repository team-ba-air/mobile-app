import { NavigationProp } from '@react-navigation/native';
import CustomChips from 'components/CustomChips';
import React from 'react'
import { StyleSheet, View } from 'react-native';
import { Icon, Image, Text } from 'react-native-elements';
import { Color } from 'styles/colors';
import { fontPixel, heightPixel, SCREEN_WIDTH, Sizing, widthPixel } from 'styles/sizes';
import { BengkelItem } from '../../constants';
import CarouselComponent from './CarouselComponent';

interface BengkelHeaderProps {
  data: BengkelItem
  navigation: NavigationProp<any>
}
 
const BengkelHeader: React.FC<BengkelHeaderProps> = ({ data, navigation }) => {
  const tagsList = [...data.serviceAvailable]
  if (data.availableForCar.length > 0) {
    tagsList.push(...data.availableForCar)
  } else { 
    tagsList.push('Semua Merek')
  }

  const bengkelTags = data.isAuthorized ? ['Authorized', ...tagsList]: tagsList

  return ( 
    <View>
      <CarouselComponent />
      {/* <Image style={{ width: SCREEN_WIDTH, height: heightPixel(60) }} source={require('@assets/placeholder_bengkel.png')} resizeMode={'contain'} /> */}
      <View style={styles.container}>
        <Text style={{ fontSize: fontPixel(Sizing.text.body[16]), fontWeight: 'bold' }}>{data.name} {data.location && ', '} {data.location}</Text>
        <View style={{ display: 'flex', justifyContent: 'flex-start', marginTop: 8 }}>
          <View style={{ flexDirection: 'row', marginBottom: heightPixel(4) }}>
            {bengkelTags.map(tag => (
              <CustomChips style={{ marginRight: widthPixel(4), backgroundColor: tag === 'Authorized' ? Color.blue[8] : Color.blue[5] }} text={tag} />
            ))}
          </View>
        </View>
        {data.description && (
          <Text style={{ marginTop: 12 }}>{data.description}</Text>
        )}
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