import { NavigationProp, Route } from '@react-navigation/native'
import AppContainer from 'components/AppContainer'
import CustomButton from 'components/CustomButton'
import { SCREENS } from 'navigations/constants'
import { PublicAPIResponse } from 'network/types'
import React, { useEffect, useState } from 'react'
import { FlatList, ListRenderItemInfo, StyleSheet, View } from 'react-native'
import { Modal, Portal, Snackbar } from 'react-native-paper'
import { useMutation, useQuery, useQueryClient } from 'react-query'
import { Color } from 'styles/colors'
import { fontPixel, heightPixel, widthPixel } from 'styles/sizes'
import CarInfoCard from './components/CarInfoCard'
import ModalDeleteVehicle from './components/ModalDeleteVehicle'
import { VehicleItem } from './constants'
import deleteVehicleById from './service/deleteVehicleById'
import getVehicleList from './service/getVehicleList'

type VehicleDetail = {
  vehicle: VehicleItem
  isOpen: boolean
}

interface ParamVehicle {
  data: VehicleDetail
}

interface VehicleScreenProps {
  navigation: NavigationProp<any>
  route: Route<any, ParamVehicle>
}
 
const VehicleScreen: React.FC<VehicleScreenProps> = ({ navigation, route }) => {
  const queryClient = useQueryClient()
  const params = route.params

  const {
    data: vehicleListResponse,
    refetch,
  } = useQuery<PublicAPIResponse<VehicleItem[]>>(
    ['getVehicleList'],
    () => getVehicleList(),
    {
      refetchOnWindowFocus: false,
      retry: true,
    }
  )

  console.log(vehicleListResponse?.body ?? [])

  const [openDetail, setOpenDetail] = useState<VehicleDetail[]>([])

  useEffect(() => {
    const vehicleList = vehicleListResponse?.body ?? []

    const detailStatus = vehicleList.map(value => ({
      vehicle: value,
      isOpen: false,
    }))

    setOpenDetail(detailStatus)
    if (route.params) {
      const { data } = route.params
      onToggleDetail(data.vehicle.id, data.isOpen)
    }
  }, [vehicleListResponse])

  const [visible, setVisible] = useState(false)
  const [modalVisible, setModalVisible] = useState(false)

  const [deletedCar, setDeletedCar] = useState<VehicleItem | null>(null)

  const showSnackbar = () => {
    setVisible(true)
  }

  const showModal = (car: VehicleItem) => {
    setDeletedCar(car)
    setModalVisible(true)
  }

  const { isLoading: isDeleting, mutateAsync: onDelete } = useMutation(deleteVehicleById, {
    onSuccess: (data) => {
      queryClient.invalidateQueries('getVehicleList')
      setTimeout(() => {
        showSnackbar()
      }, 2000)
      
    },
  })

  const onDeleteVehicle = () => {
    onDelete({ id: deletedCar?.id ?? '' }).catch((e) => {
      // do nothing
    })
    onDismiss()
  }

  const onDismiss = () => {
    setModalVisible(false)
  }

  const onToggleDetail = (id: string, isOpen: boolean) => {
    const idx = openDetail.findIndex(value => value.vehicle.id === id)

    if (idx > -1) {
      const newOpenDetail = [...openDetail]
      const idxVehicle = newOpenDetail[idx].vehicle
      console.log('index: ' + idx )
      console.log(idxVehicle)
      newOpenDetail[idx] = {
        vehicle: idxVehicle,
        isOpen,
      }
  
      setOpenDetail(newOpenDetail)
    }
  }

  const handleRefresh = () => {
    setVisible(false)
    refetch()
  }

  return (
    <AppContainer style={styles.container} onRefresh={handleRefresh}>
      <Portal>
        <Modal visible={modalVisible} onDismiss={onDismiss}>
          <ModalDeleteVehicle
            data={deletedCar} 
            onDelete={onDeleteVehicle} 
            onCancel={onDismiss} 
          />
        </Modal>
      </Portal>
        
      <FlatList
        data={openDetail}
        renderItem={(info: ListRenderItemInfo<VehicleDetail>) => (
          <>
            {info.index === 0 ? 
              <View style={styles.containerCard}>
                <CarInfoCard
                  car={info.item.vehicle} 
                  navigation={navigation} 
                  showSnackbar={() => showSnackbar()} 
                  showModal={() => showModal(info.item.vehicle)} 
                  isOpen={openDetail?.[info.index]?.isOpen ?? false}
                  setIsOpen={(status) => onToggleDetail(info.item.vehicle.id, status)}
                />
                <View style={{ width: '100%', height: '100%', position: 'absolute', top: 0 }}>
                  <View style={{ height: heightPixel(60), backgroundColor: Color.blue[8] }}></View>
                </View>
              </View>
            :
              <CarInfoCard 
                car={info.item.vehicle} 
                navigation={navigation} 
                showSnackbar={() => showSnackbar()} 
                showModal={() => showModal(info.item.vehicle)} 
                isOpen={openDetail?.[info.index]?.isOpen ?? false}
                setIsOpen={(status) => onToggleDetail(info.item.vehicle.id, status)}
              />
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
      <Snackbar
        visible={visible}
        onDismiss={() => setVisible(false)}
        duration={4000}
        style={{ backgroundColor: Color.red[8] }}
      >
        Mobil {deletedCar?.type} {deletedCar?.plat} berhasil dihapus
      </Snackbar>
    </AppContainer>
  )
}
 
export default VehicleScreen

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    padding: 0,
    backgroundColor: Color.gray[1],
  },
  containerCard: {
    flex: 1,
    width: '100%',
    justifyContent: 'center',
    position: 'relative',
    zIndex: 10,
  },
})
