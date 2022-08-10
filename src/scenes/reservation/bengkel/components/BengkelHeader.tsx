import { NavigationProp } from '@react-navigation/native';
import CustomChips from 'components/CustomChips';
import { format } from 'date-fns';
import React from 'react'
import { FlatList, ListRenderItemInfo, StyleSheet, View } from 'react-native';
import { Icon, Image, Text } from 'react-native-elements';
import { Color } from 'styles/colors';
import { fontPixel, heightPixel, SCREEN_WIDTH, Sizing, widthPixel } from 'styles/sizes';
import { BengkelDetailItem, BengkelItem } from '../../constants';
import CarouselComponent from './CarouselComponent';

interface BengkelHeaderProps {
  data?: BengkelDetailItem
}
 
const BengkelHeader: React.FC<BengkelHeaderProps> = ({ data }) => {
  const serviceAvailableList = data?.serviceAvailableTags ?? []
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
      <CarouselComponent images={data?.image ?? []} />
      <View>
        <Text style={{ fontSize: fontPixel(Sizing.text.body[16]), fontWeight: 'bold', marginTop: heightPixel(16), marginHorizontal: widthPixel(20) }}>{data?.name} </Text>
        <View style={{ display: 'flex', justifyContent: 'flex-start', marginTop: 8 }}>
          <View style={{ flexDirection: 'row', marginBottom: heightPixel(4) }}>
            <FlatList 
              horizontal
              showsHorizontalScrollIndicator={false}
              data={bengkelTags}
              renderItem={(info: ListRenderItemInfo<string>) => (
                <CustomChips style={{ marginLeft: info.index === 0 ? widthPixel(20) : 0, marginRight: widthPixel(4), backgroundColor: info.item === 'Authorized' ? Color.blue[8] : Color.blue[5] }} text={info.item} />
              )}
            />
          </View>
        </View>

        <Text style={{ marginHorizontal: widthPixel(20) }}>Buka jam {format(data?.openTime ?? new Date(), 'HH:mm')} - {format(data?.closeTime ?? new Date(), 'HH:mm')} WIB</Text>

      </View>
    </View>
   );
}
 
export default BengkelHeader;