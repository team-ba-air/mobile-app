import { NavigationProp, useFocusEffect } from '@react-navigation/native'
import CustomButton from 'components/CustomButton'
import { SCREENS } from 'navigations/constants'
import { PublicAPIResponse } from 'network/types'
import React, { useCallback, useEffect } from 'react'
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
  navigation: NavigationProp<any>
}
 
const VehicleList: React.FC<VehicleListProps> = ({ navigation }) => {
  const {
    data: vehicleListResponse,
    isLoading: isFetchingVehicleList,
    refetch,
  } = useQuery<PublicAPIResponse<VehicleItem[]>>(
    ['getVehicleList'],
    () => getVehicleList(),
    {
      refetchOnWindowFocus: false,
      retry: true,
    }
  )

  useFocusEffect(() => {
    refetch() 
  })

  console.log(isFetchingVehicleList)
  console.log(vehicleListResponse)

  return (  
    <FlatList
      data={vehicleListResponse?.body ?? []}
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
