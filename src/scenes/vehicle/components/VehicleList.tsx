import CustomButton from 'components/CustomButton'
import { SCREENS } from 'navigations/constants'
import { PublicAPIResponse } from 'network/types'
import React from 'react'
import { ListRenderItemInfo, StyleSheet, Text, View } from 'react-native'
import { Image } from 'react-native-elements'
import { FlatList } from 'react-native-gesture-handler'
import { useQuery } from 'react-query'
import { Color } from 'styles/colors'
import { fontPixel, heightPixel, Sizing, widthPixel } from 'styles/sizes'
import { VehicleItem } from '../constants'
import getVehicleList from '../service/getVehicleList'
import CarInfoCard from './CarInfoCard'

interface VehicleListProps {
  navigation: any
}

const vehicleList: VehicleItem[] = [
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
]
 
const VehicleList: React.FC<VehicleListProps> = ({ navigation }) => {
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
      renderItem={(info: ListRenderItemInfo<VehicleItem>) => (
        <>
          {info.index === 0 ? 
          <View style={styles.containerCard}>
            <CarInfoCard car={info.item} navigation={navigation} />
            <View style={{ width: '100%', height: '100%', position: 'absolute', top: 0 }}>
              <View style={{ height: heightPixel(60), backgroundColor: Color.blue[8] }}></View>
            </View>
          </View>
          :
          <CarInfoCard car={info.item} navigation={navigation} />
          }
          
        </>
      )}
      ListFooterComponent={
        <CustomButton 
          textStyle={{ color: Color.gray.secondary, fontSize: fontPixel(16) }}
          style={{ marginVertical: heightPixel(16), marginHorizontal: widthPixel(20) }}
          onPress={() => navigation.navigate(SCREENS.vehicle.update, { car: null })} 
          type='secondary' 
          title={'+ Tambah Kendaraan'} />
      }
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
})
