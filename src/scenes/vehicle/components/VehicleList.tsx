import { PublicAPIResponse } from 'network/types'
import React from 'react'
import { ListRenderItemInfo, StyleSheet, Text, View } from 'react-native'
import { Image } from 'react-native-elements'
import { FlatList } from 'react-native-gesture-handler'
import { useQuery } from 'react-query'
import { Color } from 'styles/colors'
import { Sizing } from 'styles/sizes'
import { VehicleItem } from '../constants'
import getVehicleList from '../service/getVehicleList'
import CarInfoCard from './CarInfoCard'

interface VehicleListProps {
  
}

const vehicleList = [
  {
    id: '1',
    brand: 'Toyota',
    type: 'Yaris',
    year: '2015',
    color: '',
    plat: 'B 2012 S',
    vin: 'MHKA7GJ7JKJ130848',
    expiredDate: '12 Oktober 2026',
    lastService: '-',
  },
  {
    id: '2',
    brand: 'Toyota',
    type: 'Yaris',
    year: '2015',
    color: '',
    plat: 'B 2012 S',
    vin: 'MHKA7GJ7JKJ130848',
    expiredDate: '12 Oktober 2026',
    lastService: '-',
  },
  {
    id: '3',
    brand: 'Toyota',
    type: 'Yaris',
    year: '2015',
    color: '',
    plat: 'B 2012 S',
    vin: 'MHKA7GJ7JKJ130848',
    expiredDate: '12 Oktober 2026',
    lastService: '-',
  },
]
 
const VehicleList: React.FC<VehicleListProps> = () => {
  const {
    data: vehicleListResponse,
    isLoading: isFetchingUserList,
  } = useQuery<PublicAPIResponse<VehicleItem[]>>(
    ['getVehicleList'],
    () => getVehicleList(),
    {
      refetchOnWindowFocus: false,
      retry: true,
    }
  )
  
  return (  
    <FlatList
      data={vehicleList}
      ListHeaderComponent={
        <View style={styles.containerCard}>
          <CarInfoCard car={vehicleList[0]} />
          <View style={{ width: '100%', height: '100%', position: 'absolute', top: 0 }}>
            <View style={{ flex: 0.5, backgroundColor: Color.blue[8] }}></View>
            <View style={{ flex: 0.4, backgroundColor: Color.gray[0]}}></View>
          </View>
        </View>
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
  containerCard: {
    flex: 1,
    width: '100%',
    justifyContent: 'center',
    position: 'relative',
  },
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
