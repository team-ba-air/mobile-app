import { yupResolver } from "@hookform/resolvers/yup"
import { Route } from "@react-navigation/native"
import AppContainer from "components/AppContainer"
import CustomButton from "components/CustomButton"
import CustomTextInput from "components/CustomTextInput"
import Dropdown, { OptionItem } from "components/Dropdown"
import FormInputDate from "components/FormInputDate"
import { SCREENS } from "navigations/constants"
import { PublicAPIResponse } from "network/types"
import React, { useEffect, useState } from "react"
import { Controller, useForm } from "react-hook-form"
import { Image, StyleSheet, Text, TouchableWithoutFeedback, View } from "react-native"
import { Icon } from "react-native-elements"
import { Snackbar } from "react-native-paper"
import { useMutation, useQuery, useQueryClient } from "react-query"
import { Color } from "styles/colors"
import { fontPixel, heightPixel, Sizing, widthPixel } from "styles/sizes"
import { isOnlySpace } from "utils/TextUtils"
import BottomSheetVin from "./components/BottomSheetVin"
import { VehicleForm, VehicleItem } from "../constants"
import { vehicleFormSchema } from "../schema/vehicleFormSchema"
import addVehicle, { AddVehicleResponse } from "../service/addVehicle"
import getVehicleBrand from "../service/getVehicleBrand"
import getVehicleType from "../service/getVehicleType"
import updateVehicleById from "../service/updateVehicleById"

interface VehicleFormScreenProps {
  route: Route<any, ParamVehicle>
  navigation: any
}

interface ParamVehicle {
  car: VehicleItem
}

const VehicleFormScreen: React.FC<VehicleFormScreenProps> = ({ navigation, route }) => {
  const { car } = route.params
  const queryClient = useQueryClient()

  const [visible, setVisible] = useState<boolean>(false)

  const formInitialValues: VehicleForm = {
    brand: car?.brand ?? '',
    customBrand: '',
    type: car?.type ?? '',
    customType: '',
    year: car?.year ?? '',
    color: !isOnlySpace(car?.color ?? '') ? car.color : '',
    plat: car?.plat ?? '',
    vin: !isOnlySpace(car?.vin ?? '') ? car.vin : '',
    expireDate: car?.expiredDate ?? new Date(),
  }

  const formMethods = useForm<VehicleForm>({
    resolver: yupResolver(vehicleFormSchema),
    defaultValues: formInitialValues,
    reValidateMode: 'onChange',
  })

  const {
    handleSubmit: handleFormSubmit,
    control,
    watch,
    setValue,
    formState: { errors },
  } = formMethods

  const {
    data: vehicleBrandResponse,
    isFetching: isBrandFetching,
  } = useQuery<PublicAPIResponse<OptionItem[]>>(
    ['getVehicleBrand'],
    () => getVehicleBrand(),
    {
      refetchOnWindowFocus: false,
      retry: true,
      onSuccess: (data: PublicAPIResponse<OptionItem[]>) => {
        console.log('BRAND SUCCESS FETCH')
      },
    }
  )

  const brand = watch('brand') ?? ''
  const type = watch('type') ?? ''
  
  const {
    data: vehicleTypeResponse,
    isFetching: isTypeFetching,
  } = useQuery<PublicAPIResponse<OptionItem[]>>(
    ['getVehicleType', brand],
    () => getVehicleType({ brand }),
    {
      refetchOnWindowFocus: false,
      retry: true,
      onSuccess: (data: PublicAPIResponse<OptionItem[]>) => {
        console.log('TYPE SUCCESS FETCH')
      },
    }
  )

  const brandList = vehicleBrandResponse?.body ?? []
  const typeList = vehicleTypeResponse?.body ?? []

  useEffect(() => {
    if (car && !isBrandFetching) {
      const isInBrandList = brandList.some(value => value.data.name === car.brand)
      if (!isInBrandList) {
        setValue('brand', 'Other')
        setValue('customBrand', car.brand)

        setValue('type', 'Other')
        setValue('customType', car.type)
      } else {
        if (!isTypeFetching) {
          const isInTypeList = typeList.some(value => value.data === car.type)
          if (!isInTypeList) {
            setValue('type', 'Other')
            setValue('customType', car.type)
          }
        }
      }
    }
  }, [isBrandFetching, isTypeFetching])

  const [showVin, setShowVin] = useState<boolean>(false)

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

  const handleForm = (data: VehicleForm) => {
    const brandValue = (data?.customBrand ?? '') === '' ? data.brand : data.customBrand
    const typeValue = (data?.customType ?? '') === '' ? data.type : data.customType
    console.log('HANDLE SUBMIT')
    console.log(data)
    if (car) {
      onUpdate({
        car: {
          id: car.id,
          brand: brandValue ?? '',
          type: typeValue ?? '',
          year: data?.year ?? '',
          color: data?.color ?? '',
          plat: data?.plat ?? '',
          vin: data?.vin ?? '',
          expiredDate: data?.expireDate ?? new Date(),
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
          brand: brandValue ?? '',
          type: typeValue ?? '',
          year: data?.year ?? '',
          color: data?.color ?? '',
          plat: data?.plat ?? '',
          vin: data?.vin ?? '',
          expiredDate: data?.expireDate ?? new Date(),
          lastService: '-',
          imageUrl: '',
        }
      }
      onAdd(carData).catch(e => {
        console.log(e)
      })
    }
  } 

  useEffect(() => {
    navigation.getParent()?.setOptions({ tabBarStyle: { display: "none" }})
    return () => navigation.getParent()?.setOptions({ tabBarStyle: undefined })
  }, [navigation]);

  return ( 
    <AppContainer style={styles.container} refreshBackground={Color.gray[0]}>
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
        <Controller 
          name={'brand'}
          control={control}
          render={({ field: { onChange, value }}) => (
            <Dropdown 
              style={{ marginTop: heightPixel(16) }} 
              placeholder={'Merek Mobil'} 
              value={value}
              onSelect={(value) => {
                setValue('customBrand', '')
                onChange(value)
              }} 
              error={errors?.['brand']?.message}
              options={brandList}
              headerComponent={
                <Text style={{ fontSize: fontPixel(Sizing.text.body[16]), fontWeight: 'bold', marginHorizontal: widthPixel(16) }}>Pilih merek mobil Anda</Text>
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
                <Text style={{fontSize: fontPixel(Sizing.text.body[16]), fontWeight: 'bold'}}>{option?.name}</Text>
              )}
            />
          )}
        />

        {brand === 'Other' && (
          <Controller 
            name={'customBrand'}
            control={control}
            render={({ field: { onChange, value }}) => (
              <CustomTextInput 
                style={{ marginTop: heightPixel(16) }} 
                placeholder={'Merek lain'} 
                onChange={onChange} 
                value={value} 
                error={errors?.['customBrand']?.message}
              />
            )} 
          />
        )}
        
        <Controller 
          name={'type'}
          control={control}
          render={({ field: { onChange, value }}) => (
            <Dropdown 
              style={{ marginTop: heightPixel(16) }} 
              placeholder={'Tipe'} 
              value={value} 
              onSelect={(value) => {
                setValue('customType', '')
                onChange(value)
              }} 
              error={errors?.['type']?.message}
              options={typeList}
              headerComponent={
                <Text style={{ fontSize: fontPixel(Sizing.text.body[16]), fontWeight: 'bold', marginHorizontal: widthPixel(16) }}>Pilih tipe mobil Anda</Text>
              }
              renderItem={(option) => (
                <Text style={styles.itemModal}>{option}</Text>
              )} 
              renderSelected={(option) => (
                <Text style={{fontSize: fontPixel(Sizing.text.body[16]), fontWeight: 'bold'}}>{option}</Text>
              )}
            />
          )}
        />

        {type === 'Other' && (
          <Controller 
            name={'customType'}
            control={control}
            render={({ field: { onChange, value }}) => (
              <CustomTextInput 
                style={{ marginTop: heightPixel(16) }} 
                placeholder={'Tipe lain'} 
                onChange={onChange} 
                value={value} 
                error={errors?.['customType']?.message}
              />
            )} 
          />
        )}
        
        <Controller 
          name={'year'}
          control={control}
          render={({ field: { onChange, value }}) => (
            <CustomTextInput 
              style={{ marginTop: heightPixel(16) }} 
              placeholder={'Tahun'} 
              keyboardType={'numeric'}
              onChange={onChange} 
              value={value} 
              error={errors?.['year']?.message}
            />
          )}
        />

        <Controller 
          name={'color'}
          control={control}
          render={({ field: { onChange, value }}) => (
            <CustomTextInput 
              style={{ marginTop: heightPixel(16) }}
              placeholder={'Warna'} 
              onChange={onChange} 
              value={value} 
            />
          )} 
        />
        
        <Controller 
          name={'plat'}
          control={control}
          render={({ field: { onChange, value }}) => (
            <CustomTextInput 
              style={{ marginTop: heightPixel(16) }} 
              placeholder={'Plat Nomor'} 
              onChange={onChange} 
              value={value} 
              error={errors?.['plat']?.message}
            />
          )} 
        />
        
        <TouchableWithoutFeedback onPress={() => setShowVin(true)}>
          <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', marginTop: heightPixel(16) }}>
            <Text style={{ fontSize: fontPixel(Sizing.text.body[12]), fontWeight: 'bold' }}>Nomor VIN Kendaraan</Text>
            <Icon size={heightPixel(16)} type='material' name='info' tvParallaxProperties={null} style={{ marginLeft: widthPixel(4) }} color={Color.gray[4]} />
          </View>
        </TouchableWithoutFeedback>

        <Controller 
          name={'vin'}
          control={control}
          render={({ field: { onChange, value }}) => (
            <CustomTextInput 
              style={{ marginTop: heightPixel(10) }} 
              placeholder={'Nomor VIN'} 
              onChange={onChange} 
              value={value} 
            />
          )}
        />
        
        <Controller 
          name={'expireDate'}
          control={control}
          render={({ field: { onChange, value }}) => (
            <>
              <Text style={{ marginTop: heightPixel(16), fontSize: fontPixel(Sizing.text.body[12]), fontWeight: 'bold' }}>Masa Berlaku STNK</Text>
              <FormInputDate 
                style={{ marginTop: heightPixel(10) }} 
                placeholder={'Masa Berlaku STNK'} 
                onChange={onChange} 
                value={value} 
                display={'spinner'}
              />
            </>
          )}
        />
        
      </View>
      
      <CustomButton style={{ marginTop: heightPixel(16) }} onPress={handleFormSubmit(handleForm)} type='primary' title={'Simpan'}/>

    </AppContainer>
    );
}
  
export default VehicleFormScreen;

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
  