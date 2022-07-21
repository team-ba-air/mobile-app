import { NavigationProp } from '@react-navigation/native';
import CustomChips from 'components/CustomChips';
import { format } from 'date-fns';
import React from 'react'
import { StyleSheet, View } from 'react-native';
import { Icon, Image, Text } from 'react-native-elements';
import { Color } from 'styles/colors';
import { fontPixel, heightPixel, SCREEN_WIDTH, Sizing, widthPixel } from 'styles/sizes';
import { BengkelDetailItem, BengkelItem } from '../../constants';
import CarouselComponent from './CarouselComponent';

interface BengkelHeaderProps {
  data?: BengkelDetailItem
}
 
const BengkelHeader: React.FC<BengkelHeaderProps> = ({ data }) => {
  const serviceAvailableList = data?.serviceAvailable.map(service => service.name) ?? []
  const tagsList = [...serviceAvailableList]

  const availableCar = data?.availableForCar ?? []
  if (availableCar.length > 0) {
    tagsList.push(...availableCar)
  } else { 
    tagsList.push('Semua Merek')
  }

  const bengkelTags = data?.isAuthorized ? ['Authorized', ...tagsList]: tagsList

  return ( 
    <View>
      <CarouselComponent />
      <View style={styles.container}>
        <Text style={{ fontSize: fontPixel(Sizing.text.body[16]), fontWeight: 'bold', marginTop: heightPixel(16) }}>{data?.name} </Text>
        <View style={{ display: 'flex', justifyContent: 'flex-start', marginTop: 8 }}>
          <View style={{ flexDirection: 'row', marginBottom: heightPixel(4) }}>
            {bengkelTags.map(tag => (
              <CustomChips style={{ marginRight: widthPixel(4), backgroundColor: tag === 'Authorized' ? Color.blue[8] : Color.blue[5] }} text={tag} />
            ))}
          </View>
        </View>

        <Text>Buka jam {format(data?.openTime ?? new Date(), 'HH:mm')} - {format(data?.closeTime ?? new Date(), 'HH:mm')} WIB</Text>

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