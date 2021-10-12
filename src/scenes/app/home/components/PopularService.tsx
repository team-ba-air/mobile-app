import React from 'react'
import { ListRenderItemInfo, StyleSheet, View } from 'react-native';
import { Card, Text } from 'react-native-elements';
import { FlatList } from 'react-native-gesture-handler';
import { Sizing } from 'styles/sizes';
import { PopularServiceItem } from '../constants';

interface PopularServiceProps {
  
}

const defaultData: PopularServiceItem[] = [
  {
    img: '',
    title: 'Paket Servis Dasar Kilat',
  },
  {
    img: '',
    title: 'Paket Inspeksi Perjalanan Jauh',
  },
  {
    img: '',
    title: 'Paket Servis Dasar Kilat',
  },
  {
    img: '',
    title: 'Paket Inspeksi Perjalanan Jauh',
  },
  {
    img: '',
    title: 'Paket Servis Dasar Kilat',
  },
]
 
const PopularService: React.FC<PopularServiceProps> = () => {
  return ( 
    <View>
      <Text style={styles.headingSection}>Servis Populer</Text>
      <FlatList
        horizontal
        data={defaultData}
        renderItem={(item: ListRenderItemInfo<PopularServiceItem>) => (
          <Card containerStyle={styles.card}>
            <Card.Image containerStyle={styles.image} source={require('@assets/placeholder_service.png')} />
            <View style={styles.containerText}>
              <Text style={styles.cardTitle}>{item.item.title}</Text>
            </View>
          </Card>
        )}
      />
    </View>
   )
}
 
export default PopularService;

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
  card: {
    padding: 0,
    borderRadius: 12,
    width: 140,
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