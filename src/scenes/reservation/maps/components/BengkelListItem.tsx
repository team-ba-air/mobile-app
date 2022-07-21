import CustomChips from 'components/CustomChips';
import React from 'react'
import { FlatList, ListRenderItemInfo, StyleSheet, View } from 'react-native';
import { Icon, Image, Text } from 'react-native-elements';
import { BengkelItem } from '../../constants';
import { Color } from 'styles/colors';
import { fontPixel, heightPixel, SCREEN_WIDTH, Sizing, widthPixel } from 'styles/sizes';
import { formatDistance } from 'utils/TextUtils';

interface BengkelListItemProps {
  data: BengkelItem
}
 
const BengkelListItem: React.FC<BengkelListItemProps> = ({ data }) => {
  const tagsList = [...data.serviceAvailable]
  if (data.availableForCar.length > 0) {
    tagsList.push(...data.availableForCar)
  } else { 
    tagsList.push('semua merek')
  }
  const bengkelTags = tagsList.join(', ')
  
  return ( 
    <View style={styles.container}>
      <View style={{ display: 'flex', alignItems: 'center', flexDirection: 'row', width: SCREEN_WIDTH * 0.8, paddingHorizontal: widthPixel(16) }}>
        <View style={{ marginRight: widthPixel(8) }}>
          <Image 
            style={{ width: widthPixel(80), height: heightPixel(60) }}
            source={require('@assets/placeholder_bengkel.png')}
            resizeMode={'contain'}
          />
          <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center' }}>
            <Icon size={14} name={'star'} color={'#f5e725'} tvParallaxProperties={undefined} />
            <Text style={{ fontSize: fontPixel(11), marginLeft: widthPixel(4), fontWeight: 'bold' }}>
              {data.rating}
            </Text>
          </View>
        </View>
        <View style={{ marginTop: 16, flexGrow: 1, width: '90%' }}>
          <View style={[styles.header]}>
            <Text style={[styles.subtitle]}>
            {data.isAlmostClosed && (
              'Tutup sebentar lagi'
            )}
            </Text>
            {data.isAuthorized && (
              <View>
                <CustomChips text={'Authorized'} />
              </View>
            )}
          </View>
          <Text style={styles.name}>{data.name}</Text>
          <FlatList 
            data={tagsList}
            numColumns={3}
            renderItem={(info: ListRenderItemInfo<string>) => (
              <CustomChips text={info.item} style={{ marginRight: widthPixel(2), marginTop: heightPixel(4) }} />
            )}
          />
          <Text style={styles.distance}>{formatDistance(data.distance)}</Text>
        </View>
      </View>
      
    </View>
  );
}
 
export default BengkelListItem;

const styles = StyleSheet.create({
  container: {
    borderBottomWidth: 1, 
    borderBottomColor: Color.gray[2], 
    paddingBottom: heightPixel(16),
    // paddingHorizontal: widthPixel(20),
    display: 'flex',
    flexDirection: 'row',
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
  name: {
    fontSize: fontPixel(Sizing.text.body[14]),
    fontWeight: 'bold',
  },
  subtitle: {
    fontSize: fontPixel(10),
    color: Color.gray.secondary,
  },
  pickUp: {
    fontWeight: 'bold',
  },
  tags: {
    fontSize: fontPixel(10),
    color: Color.gray.secondary,
  },
  distance: {
    fontSize: fontPixel(10),
    color: Color.gray.secondary,
    fontWeight: 'bold',
    marginTop: heightPixel(4),
  }
})