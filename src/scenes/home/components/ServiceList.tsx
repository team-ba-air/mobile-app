import { NavigationProp } from '@react-navigation/native'
import { SCREENS } from 'navigations/constants'
import { PublicAPIResponse } from 'network/types'
import React from 'react'
import { FlatList, ListRenderItemInfo, StyleSheet, TouchableOpacity, View } from 'react-native'
import { Card, Image, Text } from 'react-native-elements'
import { useQuery } from 'react-query'
import { ServiceItem } from 'scenes/reservation/constants'
import { heightPixel, Sizing, widthPixel } from 'styles/sizes'
import getServicesList, { GetServicesListResponse } from '../service/getServicesList'

interface ServiceListProps {
  navigation: NavigationProp<any>
}
 
const ServiceList: React.FC<ServiceListProps> = ({ navigation }) => {
  const {
    data: servicesListResponse,
  } = useQuery<PublicAPIResponse<GetServicesListResponse>>(
    ['getServicesList-home'],
    () => getServicesList(),
    {
      refetchOnWindowFocus: false,
      retry: true,
    }
  )

  const serviceList = servicesListResponse?.body ?? []

  if (serviceList.length === 0) return null
  return ( 
    <Card containerStyle={styles.cardStyle}>
      <FlatList
        data={servicesListResponse?.body ?? []}
        initialNumToRender={4}
        maxToRenderPerBatch={4}
        removeClippedSubviews={true}
        numColumns={4}
        renderItem={(info: ListRenderItemInfo<ServiceItem>) => {
          return (
            <TouchableOpacity style={{ width: '25%'}} onPress={() => navigation.navigate(SCREENS.reservation.serviceReservation, { data: '' })}>
              <View style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginBottom: 16 }}>
                <Image 
                  source={{
                    uri: info.item.image,
                    width: heightPixel(24),
                    height: widthPixel(24),
                  }} 
                  style={{ width: 24, height: 24 }} 
                  resizeMode={"contain"} />
                <Text style={{ marginTop: 8, fontSize: Sizing.text.body[10] }}>{info.item.name}</Text>
              </View>
            </TouchableOpacity>
          )
        }}
      /> 
    </Card> 
  )
}
 
export default ServiceList

const styles = StyleSheet.create({
  cardStyle: {
    paddingBottom: 0, 
    borderRadius: 12, 
    marginHorizontal: widthPixel(20),
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  }
})
