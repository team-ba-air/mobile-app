import CustomTextInput from 'components/CustomTextInput';
import Dropdown, { OptionItem } from 'components/Dropdown';
import React, { useEffect, useState } from 'react'
import { Controller, useFormContext } from 'react-hook-form';
import { FlatList, Image, ListRenderItemInfo, StyleSheet, View } from 'react-native';
import { Text } from 'react-native-elements';
import { Color } from 'styles/colors';
import { fontPixel, heightPixel, SCREEN_WIDTH, Sizing, widthPixel } from 'styles/sizes';
import { AvailableHourItem, ReservationForm } from '../../constants';
import HourChipsItem from './HourChipsItem';
import FormInputDate from 'components/FormInputDate';
import { PublicAPIResponse } from 'network/types';
import getVehicleList from 'scenes/reservation/service/getVehicleList';
import { useQuery } from 'react-query';
import { formatRupiah } from 'utils/TextUtils';

interface ReservationFormComponentProps {
  serviceOptions?:  {
    id: string
    name: string
    description: string
    price: number
  }[]
  carTags: string[]
  open: Date
  close: Date
}

 
const ReservationFormComponent: React.FC<ReservationFormComponentProps> = ({ serviceOptions, carTags, open, close }) => {
  const [availableHours, setAvailableHours] = useState<AvailableHourItem[]>([])
  const {
    control,
    formState: { errors },
  } = useFormContext<ReservationForm>()

  const {
    data: vehicleListResponse,
  } = useQuery<PublicAPIResponse<OptionItem[]>>(
    ['getVehicleList-option'],
    () => getVehicleList(),
    {
      refetchOnWindowFocus: false,
      retry: true,
    }
  )

  const vehicleList = vehicleListResponse?.body ?? []
  const filteredVehicleList = vehicleList.filter(vehicle => {
    return carTags.some(tag => tag === vehicle.data.brand)
  })

  const serviceOptionsItem: OptionItem[] = serviceOptions?.map(option => ({
    data: option,
    value: `${option.id}|${option.name}|${option.description}|${option.price}`
  })) ?? []

  
  useEffect(() => {
    const openHour = open.getHours()
    const closeHour = close.getHours()
  
    const tempAvailableHours = []
    for (let hour = openHour; hour < closeHour; hour++) {
      const hourString = (hour < 10 ? `0${hour}`: hour )
      tempAvailableHours.push({
        hour: `${hourString}:00`,
        available: true,
      })

      tempAvailableHours.push({
        hour: `${hourString}:30`,
        available: true,
      })
    }

    setAvailableHours(tempAvailableHours)
  }, [open, close])

  return ( 
    <View style={{ marginTop: heightPixel(20) }}>
      <Text style={{ fontSize: fontPixel(Sizing.text.body[16]), fontWeight: 'bold', paddingHorizontal: widthPixel(20), }}>Kendaraan yang diservis</Text>

      <Controller 
        name={'car'}
        control={control}
        render={({ field: { onChange, value }}) => (
          <Dropdown 
            style={[styles.margin, { marginHorizontal: widthPixel(20) }]} 
            value={value} 
            options={filteredVehicleList} 
            onSelect={onChange}
            placeholder={'Pilih mobil Anda'}
            error={errors?.car?.message}
            headerComponent={
              <Text style={styles.titleBottomSheet}>Pilih mobil Anda</Text>
            }
            renderItem={(option) => (
              <Text style={styles.itemModal}>{option?.brand} {option?.type} {option?.license_plate}</Text>
            )} 
            renderSelected={(option) => {
              return (
              <Text style={{fontSize: fontPixel(Sizing.text.body[14]) }}>{option?.brand} {option?.type} {option?.license_plate}</Text>
            )}}
          />
        )}
      />

      <Text style={{ 
        fontSize: fontPixel(Sizing.text.body[16]), 
        fontWeight: 'bold', 
        marginTop: heightPixel(16),
        paddingHorizontal: widthPixel(20),
      }}>
        Hari dan Jam
      </Text>

      <Controller 
        name={'date'}
        control={control}
        render={({ field: { onChange, value }}) => (
          <View style={{ flexDirection: 'row', width: '100%', alignItems: 'center', marginVertical: heightPixel(16), marginHorizontal: widthPixel(20) }}>
            <Image style={{ height: heightPixel(24), width: widthPixel(24), marginRight: widthPixel(8)}} source={require('@assets/icon/ic_calendar.png')} resizeMode={'contain'} />
            <FormInputDate 
              containerStyle={{ width: '80%' }}
              value={value}
              onChange={onChange}
            />
          </View>
        )}
      />
      
      <Controller 
        name={'hour'}
        control={control}
        render={({ field: { onChange, value }}) => (
          <View style={{ paddingLeft: widthPixel(20), width: SCREEN_WIDTH }}> 
            <View style={{ flexDirection: 'row', alignItems: 'center'}}>
              <Image style={{ height: heightPixel(24), width: widthPixel(24), marginRight: widthPixel(8)}} source={require('@assets/icon/ic_clock.png')} resizeMode={'contain'} />
              
              <FlatList
                horizontal
                showsHorizontalScrollIndicator={false}
                data={availableHours}
                renderItem={(info: ListRenderItemInfo<AvailableHourItem>) => (
                  <HourChipsItem hour={info.item} value={value} onSelect={onChange} />
                )}
              />
            </View>
            {errors?.hour?.message && (
              <Text style={{ color: Color.red[7], fontSize: fontPixel(11), marginTop: heightPixel(4)}}>{errors?.hour?.message}</Text>
            )}
          </View>
        )}
      />

      <Text style={{ 
        fontSize: fontPixel(Sizing.text.body[16]), 
        fontWeight: 'bold', 
        marginTop: heightPixel(16),
        paddingHorizontal: widthPixel(20),
      }}>
        Servis
      </Text>

      <Controller 
        name={'service'}
        control={control}
        render={({ field: { onChange, value }}) => (
          <Dropdown style={[styles.margin]} 
            containerStyle={{ marginHorizontal: widthPixel(20) }}
            value={value} 
            options={serviceOptionsItem} 
            // options={serviceListOptions}
            onSelect={onChange}
            placeholder={'Pilih Servis'}
            error={errors?.service?.message}
            headerComponent={
              <Text style={styles.titleBottomSheet}>Pilih Servis</Text>
            }
            renderItem={(option) => (
              <View>
                <Text style={{ fontSize: fontPixel(Sizing.text.body[14]), fontWeight: 'bold' }}>{option.name} • {formatRupiah(option.price)}</Text>
                <Text style={{ fontSize: fontPixel(Sizing.text.body[14]), color: Color.gray[8]}}>{option.description}</Text>
              </View>
            )} 
            renderSelected={(option) => {
              return (
              <Text style={{fontSize: fontPixel(Sizing.text.body[14]) }}>{option?.name} • {formatRupiah(option?.price)}</Text>
            )}}
          />
        )}
      />

      <Text style={{ 
        fontSize: fontPixel(Sizing.text.body[16]), 
        fontWeight: 'bold', 
        marginTop: heightPixel(16),
        paddingHorizontal: widthPixel(20),
      }}>
        Catatan Tambahan
      </Text>

      <Controller 
        name={'notes'}
        control={control}
        render={({ field: { onChange, value }}) => (
          <CustomTextInput 
            style={[styles.margin, { marginHorizontal: widthPixel(20) }]} 
            value={value} 
            onChange={onChange} 
            placeholder={'Misal: AC suka bunyi kalau baru nyala, rem berdecit'} 
            multiline={true} 
            lines={4} 
          />
        )}
      />
    </View>
  );
}
 
export default ReservationFormComponent;

const styles = StyleSheet.create({
  margin: {
    marginTop: 16,
  },
  itemModal: {
    fontSize: fontPixel(Sizing.text.body[14]),
    fontWeight: 'bold',
  },
  titleBottomSheet: {
    fontSize: fontPixel(Sizing.text.body[16]), 
    fontWeight: 'bold', 
    marginHorizontal: 16,
  },
  titleSection: {
    fontSize: fontPixel(Sizing.text.body[14]), 
    marginTop: 16,
  }
})