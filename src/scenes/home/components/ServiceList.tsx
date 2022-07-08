import { PublicAPIResponse } from 'network/types'
import React from 'react'
import { FlatList, ListRenderItemInfo, StyleSheet, TouchableOpacity, View } from 'react-native'
import { Card, Image, Text } from 'react-native-elements'
import { useQuery } from 'react-query'
import { Sizing } from 'styles/sizes'
import getServicesList, { GetServicesListResponse } from '../service/getServicesList'

interface ServiceListProps {
  
}

type ServiceItem = {
  img: any
  title: string
}
 
const ServiceList: React.FC<ServiceListProps> = () => {
  const services = [
    {
      img: 'assets/icon/service_iamge.png',
      title: 'Servis Dasar',
    },
    {
      img: 'assets/icon/service_iamge.png',
      title: 'Servis Dasar',
    },
    {
      img: 'assets/icon/service_iamge.png',
      title: 'Servis Dasar',
    },
    {
      img: 'assets/icon/service_iamge.png',
      title: 'Servis Dasar',
    },
    {
      img: 'assets/icon/service_iamge.png',
      title: 'Servis Dasar',
    },
    {
      img: 'assets/icon/service_iamge.png',
      title: 'Servis Dasar',
    },
    {
      img: 'assets/icon/service_iamge.png',
      title: 'Servis Dasar',
    },
    {
      img: 'assets/icon/service_iamge.png',
      title: 'Servis Dasar',
    },
  ]

  const {
    data: servicesListResponse,
  } = useQuery<PublicAPIResponse<GetServicesListResponse>>(
    ['getServicesList'],
    () => getServicesList(),
    {
      refetchOnWindowFocus: false,
      retry: true,
    }
  )


  return ( 
    <Card containerStyle={styles.cardStyle}>
      <FlatList
        data={services}
        initialNumToRender={4}
        maxToRenderPerBatch={4}
        removeClippedSubviews={true}
        numColumns={4}
        renderItem={(info: ListRenderItemInfo<ServiceItem>) => {
          return (
            <TouchableOpacity onPress={() => {}}>
              <View style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginBottom: 16, marginHorizontal: 16 }}>
                <Image source={require('@assets/icon/service_image.png')} style={{ width: 24, height: 24 }} resizeMode={"contain"} />
                <Text style={{ marginTop: 8, fontSize: Sizing.text.body[10] }}>{info.item.title}</Text>
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
    marginHorizontal: 20,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  }
})
