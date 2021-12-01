import React from 'react'
import { ListRenderItemInfo, StyleSheet, View } from 'react-native';
import { Card, Text } from 'react-native-elements';
import { FlatList } from 'react-native-gesture-handler';
import { Color } from 'styles/colors';
import { Sizing } from 'styles/sizes';
import { TipsTrickItem } from '../constants';

interface TipsTrickProps {
  
}

const defaultData: TipsTrickItem[] = [
  {
    img: '',
    title: 'Paket Servis Dasar Kilat',
    author: 'Admin OTOFIX',
  },
  {
    img: '',
    title: 'Paket Inspeksi Perjalanan Jauh',
    author: 'Admin OTOFIX',
  },
  {
    img: '',
    title: 'Paket Servis Dasar Kilat',
    author: 'Admin OTOFIX',
  },
  {
    img: '',
    title: 'Paket Inspeksi Perjalanan Jauh',
    author: 'Admin OTOFIX',
  },
  {
    img: '',
    title: 'Paket Servis Dasar Kilat',
    author: 'Admin OTOFIX',
  },
]
 
const TipsTrick: React.FC<TipsTrickProps> = () => {
  return ( 
    <View>
      <Text style={styles.headingSection}>{'Tips & Trik'}</Text>
      <FlatList
        horizontal
        initialNumToRender={2}
        maxToRenderPerBatch={3}
        removeClippedSubviews={true}
        data={defaultData}
        renderItem={(item: ListRenderItemInfo<TipsTrickItem>) => (
          <Card containerStyle={styles.card}>
            <Card.Image containerStyle={styles.image} resizeMode={'contain'} source={require('@assets/placeholder_service.png')}/>
            <View style={styles.containerText}>
              <Text style={styles.cardTitle}>{item.item.title}</Text>
              <Text style={styles.cardSubtitle}>{item.item.title}</Text>
            </View>
          </Card>
        )}
      />
    </View>
   )
}
 
export default TipsTrick;

const styles = StyleSheet.create({
  headingSection: {
    fontSize: Sizing.text.heading[24],
    fontWeight: 'bold',
    marginLeft: 20,
  },
  cardTitle: {
    fontSize: Sizing.text.body[14],
    fontWeight: 'bold',
  },
  cardSubtitle: {
    fontSize: Sizing.text.body[10],
    color: Color.gray.secondary,
  },
  card: {
    padding: 0,
    borderRadius: 12,
    width: 240,
  },
  image: {
    borderTopRightRadius: 12,
    borderTopLeftRadius: 12,
    height: 100,
  },
  containerText: {
    marginTop: 8,
    marginLeft: 4,
    marginRight: 4,
    marginBottom: 16,
  }
})