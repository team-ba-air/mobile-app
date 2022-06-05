import { valueToNode } from '@babel/types';
import CustomTextInput from 'components/CustomTextInput';
import Dropdown, { OptionItem } from 'components/Dropdown';
import React, { useState } from 'react'
import { Controller, useFormContext } from 'react-hook-form';
import { Image, ListRenderItemInfo, ScrollView, StyleSheet, View } from 'react-native';
import { Text } from 'react-native-elements';
import { FlatList } from 'react-native-gesture-handler';
import { Color } from 'styles/colors';
import { fontPixel, heightPixel, Sizing, widthPixel } from 'styles/sizes';
import { AvailableHourItem, ReservationForm } from '../../constants';
import HourChipsItem from './HourChipsItem';
import FormInputDate from 'components/FormInputDate';
import { PublicAPIResponse } from 'network/types';
import getVehicleList from 'scenes/reservation/service/getVehicleList';
import { useQuery } from 'react-query';

interface ReservationFormComponentProps {
  serviceOptions?:  {
    id: string
    name: string
    description: string
    price: number
  }[]
}

const defaultServiceOptions: OptionItem[] = [
  {
    data: {
      name: 'Servis Dasar',
      description: 'Servis Dasar mencakup servis rutin pada mesin mobil',
      price: 1000000,
    },
    value: 'Servis Dasar',
  },
  {
    data: {
      name: 'Servis AC',
      description: 'Servis AC mencakup perbaikan AC mobil',
      price: 1000000,
    },
    value: 'Servis AC',
  },
  {
    data: {
      name: 'Servis Kaca',
      description: 'Servis Kaca mencakup perbaikan Kaca pada mobil',
      price: 1000000,
    },
    value: 'Servis Kaca',
  },
]

const availableHours: AvailableHourItem[] = [
  {
    hour: '08:00',
    available: true,
  },
  {
    hour: '09:00',
    available: true,
  },
  {
    hour: '10:00',
    available: true,
  },
  {
    hour: '11:00',
    available: false,
  },
  {
    hour: '12:00',
    available: true,
  },
  {
    hour: '13:00',
    available: true,
  },
]
 
const ReservationFormComponent: React.FC<ReservationFormComponentProps> = ({ serviceOptions }) => {
  const {
    control,
    formState: { errors },
  } = useFormContext<ReservationForm>()

  const {
    data: vehicleListResponse,
  } = useQuery<PublicAPIResponse<OptionItem[]>>(
    ['getVehicleList'],
    () => getVehicleList(),
    {
      refetchOnWindowFocus: false,
      retry: true,
    }
  )

  const serviceOptionsItem: OptionItem[] = serviceOptions?.map(option => ({
    data: option,
    value: `${option.id}|${option.name}|${option.description}|${option.price}`
  })) ?? []

  return ( 
    <View style={{ marginTop: 20 }}>
      <Text style={{ fontSize: fontPixel(Sizing.text.body[16]), fontWeight: 'bold' }}>Kendaraan yang diservis</Text>

      <Controller 
        name={'car'}
        control={control}
        render={({ field: { onChange, value }}) => (
          <Dropdown style={styles.margin} 
            value={value} 
            options={vehicleListResponse?.body ?? []} 
            onSelect={onChange}
            placeholder={'Pilih mobil Anda'}
            error={errors?.car?.message}
            headerComponent={
              <Text style={styles.titleBottomSheet}>Pilih mobil Anda</Text>
            }
            renderItem={(option) => (
              <Text style={styles.itemModal}>{option?.brand} {option?.type} {option?.plat}</Text>
            )} 
            renderSelected={(option) => {
              return (
              <Text style={{fontSize: fontPixel(Sizing.text.body[14]) }}>{option?.brand} {option?.type} {option?.plat}</Text>
            )}}
          />
        )}
      />

      <Text style={{ fontSize: fontPixel(Sizing.text.body[16]), fontWeight: 'bold', marginTop: heightPixel(16) }}>Hari dan Jam</Text>

      <Controller 
        name={'date'}
        control={control}
        render={({ field: { onChange, value }}) => (
          <View style={{ flexDirection: 'row', width: '100%', alignItems: 'center', marginVertical: heightPixel(16)}}>
            <Image style={{ height: heightPixel(24), width: widthPixel(24), marginRight: widthPixel(8)}} source={require('@assets/icon/ic_calendar.png')} resizeMode={'contain'} />
            <FormInputDate 
              style={{ flex: 1 }}
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
          <> 
            <View style={{ flexDirection: 'row', width: '100%', alignItems: 'center'}}>
              <Image style={{ height: heightPixel(24), width: widthPixel(24), marginRight: widthPixel(8)}} source={require('@assets/icon/ic_clock.png')} resizeMode={'contain'} />
              
              <FlatList
                horizontal
                data={availableHours}
                renderItem={(info: ListRenderItemInfo<AvailableHourItem>) => (
                  <HourChipsItem hour={info.item} value={value} onSelect={onChange}/>
                )}
              />
            </View>
            {errors?.hour?.message && (
              <Text style={{ color: Color.red[7], fontSize: fontPixel(11), marginTop: heightPixel(4)}}>{errors?.hour?.message}</Text>
            )}
          </>
        )}
      />

      <Controller 
        name={'service'}
        control={control}
        render={({ field: { onChange, value }}) => (
          <Dropdown style={styles.margin} 
            value={value} 
            options={serviceOptionsItem} 
            onSelect={onChange}
            placeholder={'Pilih Servis'}
            error={errors?.service?.message}
            headerComponent={
              <Text style={styles.titleBottomSheet}>Pilih Servis</Text>
            }
            renderItem={(option) => (
              <View>
                <Text style={{ fontSize: fontPixel(Sizing.text.body[14]), fontWeight: 'bold' }}>{option.name} - Rp{option.price}</Text>
                <Text style={{ fontSize: fontPixel(Sizing.text.body[14]), color: Color.gray[8]}}>{option.description}</Text>
              </View>
            )} 
            renderSelected={(option) => {
              return (
              <Text style={{fontSize: fontPixel(Sizing.text.body[14]) }}>{option?.name} - {option?.price}</Text>
            )}}
          />
        )}
      />

      <Text style={styles.titleSection}>Catatan</Text>

      <Controller 
        name={'notes'}
        control={control}
        render={({ field: { onChange, value }}) => (
          <CustomTextInput 
            style={styles.margin} 
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