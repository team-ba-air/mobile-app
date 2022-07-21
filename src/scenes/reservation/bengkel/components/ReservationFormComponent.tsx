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
import { VehicleItem } from 'scenes/vehicle/constants';
import { formatRupiah } from 'utils/TextUtils';

interface ReservationFormComponentProps {
  serviceOptions?:  {
    id: string
    name: string
    description: string
    price: number
  }[]
  car: VehicleItem
}

const serviceListData = [
  {
    id: '1',
    name: 'Servis Reguler 10.000KM',
    description: 'Servis Rutin Setiap 10.000KM atau setiap 6 bulan sekali',
    price: 500000,
  },
  {
    id: '2',
    name: 'Servis Reguler 20.000KM',
    description: 'Servis Rutin Setiap 20.000KM atau setiap 1 tahun sekali',
    price: 600000,
  }
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
 
const ReservationFormComponent: React.FC<ReservationFormComponentProps> = ({ serviceOptions, car }) => {
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

  const serviceOptionsItem: OptionItem[] = serviceOptions?.map(option => ({
    data: option,
    value: `${option.id}|${option.name}|${option.description}|${option.price}`
  })) ?? []

  const serviceListOptions: OptionItem[] = serviceListData.map(option => ({
    data: option,
    value: `${option.id}|${option.name}|${option.description}|${option.price}`
  }))

  return ( 
    <View style={{ marginTop: 20 }}>
      <Text style={{ fontSize: fontPixel(Sizing.text.body[16]), fontWeight: 'bold', paddingHorizontal: widthPixel(20), }}>Kendaraan yang diservis</Text>

      <Controller 
        name={'car'}
        control={control}
        render={({ field: { onChange, value }}) => (
          <Dropdown 
            style={[styles.margin, { marginHorizontal: widthPixel(20) }]} 
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
          <View style={{ marginLeft: widthPixel(20) }}> 
            <ScrollView nestedScrollEnabled contentContainerStyle={{ flexDirection: 'row', width: '100%', alignItems: 'center'}}>
              <Image style={{ height: heightPixel(24), width: widthPixel(24), marginRight: widthPixel(8)}} source={require('@assets/icon/ic_clock.png')} resizeMode={'contain'} />
              
              <FlatList
                horizontal
                data={availableHours}
                renderItem={(info: ListRenderItemInfo<AvailableHourItem>) => (
                  <HourChipsItem hour={info.item} value={value} onSelect={onChange}/>
                )}
              />
            </ScrollView>
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
          <Dropdown style={[styles.margin, { marginHorizontal: widthPixel(20) }]} 
            value={value} 
            // options={serviceOptionsItem} 
            options={serviceListOptions}
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
              <Text style={{fontSize: fontPixel(Sizing.text.body[14]) }}>{option?.name} - {option?.price}</Text>
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
        Catatan
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