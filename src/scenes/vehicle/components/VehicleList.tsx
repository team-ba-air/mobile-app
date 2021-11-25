import React from 'react'
import { ListRenderItemInfo, StyleSheet, Text, View } from 'react-native'
import { Image } from 'react-native-elements'
import { FlatList } from 'react-native-gesture-handler'
import { Color } from 'styles/colors'
import { Sizing } from 'styles/sizes'
import CarInfoCard from './CarInfoCard'

interface VehicleListProps {
  
}

type VehicleItem = {
  brand: string
  type: string
  year: string
  plat: string
}

const vehicleList = [
  {
    brand: 'Toyota',
    type: 'Yaris',
    year: '2015',
    plat: 'B 2012 S',
  },
  {
    brand: 'Toyota',
    type: 'Yaris',
    year: '2015',
    plat: 'B 2012 S',
  },
  {
    brand: 'Toyota',
    type: 'Yaris',
    year: '2015',
    plat: 'B 2012 S',
  },
]
 
const VehicleList: React.FC<VehicleListProps> = () => {
  return (  
    <FlatList
      data={vehicleList}
      ListHeaderComponent={
        <CarInfoCard />
      }
      renderItem={(info: ListRenderItemInfo<VehicleItem>) => (
        <View style={styles.container}>
          <View style={styles.infoContainer}>
            <Image
              style={{ width: 60, height: 60 }}
              source={require('@assets/brand_placeholder.png')} 
              resizeMode={'contain'} 
            />
            <View style={{ marginLeft: 12 }}>
              <Text style={styles.title}>{info.item.brand} {info.item.type}</Text>
              <Text style={styles.subtitle}>{info.item.year}</Text>
              <Text style={styles.subtitle}>{info.item.plat}</Text>
            </View>
          </View>
          <Image 
            style={{ width: 10, height: 16 }}
            source={require('@assets/icon/ic_right_arrow_blue.png')}
            resizeMode={'contain'}
          />
        </View>
      )}
    />
  )
}

export default VehicleList

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
    marginLeft: 20,
    marginRight: 20,
    padding: 16,
    marginTop: 16,
    backgroundColor: Color.gray[0],
    borderRadius: 4,
  },
  infoContainer: {
    display: 'flex',
    flexDirection: 'row',
  },
  title: {
    fontSize: Sizing.text.body[14],
    fontWeight: 'bold',
  },
  subtitle: {
    fontSize: Sizing.text.body[14],
    color: Color.gray.secondary,
  }
})
