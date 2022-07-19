import { Route } from "@react-navigation/native"
import AppContainer from "components/AppContainer"
import CustomButton from "components/CustomButton"
import CustomTextInput from "components/CustomTextInput"
import Dropdown, { OptionItem } from "components/Dropdown"
import FormInputDate from "components/FormInputDate"
import { SCREENS } from "navigations/constants"
import { PublicAPIResponse } from "network/types"
import React, { useEffect, useState } from "react"
import { Image, StyleSheet, Text, TouchableWithoutFeedback, View } from "react-native"
import { Icon } from "react-native-elements"
import { Snackbar } from "react-native-paper"
import { useMutation, useQuery, useQueryClient } from "react-query"
import { Color } from "styles/colors"
import { fontPixel, heightPixel, Sizing, widthPixel } from "styles/sizes"
import BottomSheetVin from "./components/BottomSheetVin"
import { VehicleItem } from "./constants"
import addVehicle, { AddVehicleResponse } from "./service/addVehicle"
import getVehicleBrand from "./service/getVehicleBrand"
import getVehicleType from "./service/getVehicleType"
import updateVehicleById from "./service/updateVehicleById"

interface UpdateVehicleScreenProps {
  route: Route<any, ParamVehicle>
  navigation: any
}

interface ParamVehicle {
  car: VehicleItem
}

const UpdateVehicleScreen: React.FC<UpdateVehicleScreenProps> = ({ navigation, route }) => {
  const { car } = route.params
  const queryClient = useQueryClient()

  const [visible, setVisible] = useState<boolean>(false)

  const [brand, setBrand] = useState<string>(car?.brand ?? '')
  const [type, setType] = useState<string>(car?.type ?? '')
  const [year, setYear] = useState<string>(car?.year ?? '')
  const [color, setColor] = useState<string>(car?.color ?? '')
  const [plat, setPlat] = useState<string>(car?.plat ?? '')
  const [vin, setVin] = useState<string>(car?.vin ?? '')
  const [expireDate, setExpireDate] = useState<Date>()

  const {
    data: vehicleBrandResponse,
  } = useQuery<PublicAPIResponse<OptionItem[]>>(
    ['getVehicleBrand'],
    () => getVehicleBrand(),
    {
      refetchOnWindowFocus: false,
      retry: true,
    }
  )

  const {
    data: vehicleTypeResponse,
  } = useQuery<PublicAPIResponse<OptionItem[]>>(
    ['getVehicleType', brand],
    () => getVehicleType({ brand }),
    {
      refetchOnWindowFocus: false,
      retry: true,
    }
  )

  const brandList = vehicleBrandResponse?.body ?? []
  const typeList = vehicleTypeResponse?.body ?? []

  console.log(typeList)

  const [disabled, setDisabled] = useState(true)

  const [showVin, setShowVin] = useState<boolean>(false)

  useEffect(() => {
    if(brand === '' && type === '' && year === '' && plat === '') {
      setDisabled(true)
    } else {
      setDisabled(false)
    }
  }, [brand, type, year, plat])

  const handleSuccess = () => {
    queryClient.invalidateQueries('getVehicleList')
    navigation.navigate(SCREENS.vehicle.list)
  }

  const { isLoading: isAdding, mutateAsync: onAdd } = useMutation(addVehicle, {
    onSuccess: handleSuccess,
    onError: () => {
      setVisible(true)
    },
  })

  const { isLoading: isUpdating, mutateAsync: onUpdate } = useMutation(updateVehicleById, {
    onSuccess: handleSuccess,
    onError: () => {
      setVisible(true)
    },
  })

  const handleForm = () => {
    console.log({
      brand,
      type,
      year,
      plat
    })

    if(!disabled){
      if (car) {
        console.log(car)
        onUpdate({
          car: {
            id: car.id,
            brand,
            type,
            year,
            color,
            plat,
            vin,
            expiredDate: expireDate,
            lastService: car.lastService,
            imageUrl: car.imageUrl,
          }
        }).catch(e => {
          console.log(e)
        })
      } else {
        const carData = {
          car: {
            id: '',
            brand,
            type,
            year,
            color,
            plat,
            vin,
            expiredDate: expireDate,
            lastService: '-',
            imageUrl: '',
          }
        }
        console.log(carData)
        onAdd(carData).catch(e => {
          console.log(e)
        })
      }
    }
  } 

  useEffect(() => {
    navigation.getParent()?.setOptions({ tabBarStyle: { display: "none" }})
    return () => navigation.getParent()?.setOptions({ tabBarStyle: undefined })
  }, [navigation]);

  return ( 
    <AppContainer style={styles.container} refreshDisable>
      <Snackbar
        wrapperStyle={{ zIndex: 10, alignSelf: 'center' }}
        visible={visible}
        onDismiss={() => setVisible(false)}
        duration={5000}
      >
        Something wrong. Please try again later.
      </Snackbar>
      <BottomSheetVin visible={showVin} onChangeVisible={setShowVin} />
      <View>
        <Text style={styles.title}>{car ? 'Perbarui' : 'Tambah'} Info Mobil</Text>
        <Dropdown style={{ marginTop: heightPixel(16) }} placeholder={'Merek Mobil'} value={brand} onSelect={setBrand} options={brandList}
          headerComponent={
            <Text style={{ fontSize: Sizing.text.body[16], fontWeight: 'bold', marginHorizontal: 16 }}>Pilih merek mobil Anda</Text>
          }
          renderItem={(option) => (
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Image source={{ 
                uri: option.image_url, 
                width: heightPixel(20),
                height: widthPixel(20),
              }} />
              <Text style={styles.itemModal}>{option.name}</Text>
            </View>
          )} 
          renderSelected={(option) =>  (
            <Text style={{fontSize: Sizing.text.body[16], fontWeight: 'bold'}}>{option?.name}</Text>
          )}
        />

        <Dropdown style={{ marginTop: heightPixel(16) }} placeholder={'Tipe'} value={type} onSelect={setType} options={typeList}
          headerComponent={
            <Text style={{ fontSize: Sizing.text.body[16], fontWeight: 'bold', marginHorizontal: 16 }}>Pilih tipe mobil Anda</Text>
          }
          renderItem={(option) => (
            <Text style={styles.itemModal}>{option}</Text>
          )} 
          renderSelected={(option) => (
            <Text style={{fontSize: Sizing.text.body[16], fontWeight: 'bold'}}>{option}</Text>
          )}
        />

        <CustomTextInput style={{ marginTop: heightPixel(16) }} placeholder={'Tahun'} onChange={setYear} value={year} />

        <CustomTextInput style={{ marginTop: heightPixel(16) }} placeholder={'Warna'} onChange={setColor} value={color} />

        <CustomTextInput style={{ marginTop: heightPixel(16) }} placeholder={'Plat Nomor'} onChange={setPlat} value={plat} />

        <TouchableWithoutFeedback onPress={() => setShowVin(true)}>
          <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', marginTop: heightPixel(16) }}>
            <Text style={{ fontSize: fontPixel(Sizing.text.body[12]), fontWeight: 'bold' }}>Nomor VIN Kendaraan</Text>
            <Icon size={heightPixel(16)} type='material' name='info' tvParallaxProperties={null} style={{ marginLeft: widthPixel(4) }} color={Color.gray[4]} />
          </View>
        </TouchableWithoutFeedback>
        <CustomTextInput style={{ marginTop: heightPixel(10) }} placeholder={'Nomor VIN'} onChange={setVin} value={vin} />

        <Text style={{ marginTop: heightPixel(16), fontSize: fontPixel(Sizing.text.body[12]), fontWeight: 'bold' }}>Masa Berlaku STNK</Text>
        <FormInputDate style={{ marginTop: heightPixel(10) }} placeholder={'Masa Berlaku STNK'} onChange={setExpireDate} value={expireDate} />
      </View>
      
      <CustomButton style={{ marginTop: heightPixel(16) }} disabled={disabled} onPress={handleForm} type='primary' title={'Simpan'}/>

    </AppContainer>
    );
}
  
export default UpdateVehicleScreen;

const styles = StyleSheet.create({
  title: {
    fontSize: fontPixel(24),
    fontWeight: 'bold'
  },
  itemModal: {
    fontSize: fontPixel(14),
    fontWeight: 'bold',
    marginLeft: widthPixel(8),
  },
  container: {
    display: 'flex',
    justifyContent: 'space-between',
  }
})
  