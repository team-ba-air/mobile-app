import { valueToNode } from '@babel/types';
import CustomTextInput from 'components/CustomTextInput';
import Dropdown, { OptionItem } from 'components/Dropdown';
import React, { useState } from 'react'
import { Controller, useFormContext } from 'react-hook-form';
import { ListRenderItemInfo, StyleSheet, View } from 'react-native';
import { Text } from 'react-native-elements';
import { FlatList } from 'react-native-gesture-handler';
import { Color } from 'styles/colors';
import { Sizing } from 'styles/sizes';
import { AvailableHourItem, ReservationForm } from '../constants';
import HourChipsItem from './HourChipsItem';

interface ReservationFormComponentProps {
  
}

const defaultCarOptions: OptionItem[] = [
  {
    data: 'Toyota',
    value: 'Toyota',
  },
  {
    data: 'Daihatsu',
    value: 'Daihatsu',
  },
  {
    data: 'Honda',
    value: 'Honda',
  },
]

const defaultServiceOptions: OptionItem[] = [
  {
    data: {
      name: 'Servis Dasar',
      description: 'Servis Dasar mencakup blablabla',
      price: 100000,
    },
    value: 'Servis Dasar',
  },
  {
    data: {
      name: 'Servis AC',
      description: 'Servis AC mencakup blablabla',
      price: 100000,
    },
    value: 'Servis AC',
  },
  {
    data: {
      name: 'Servis Kaca',
      description: 'Servis Kaca mencakup blablabla',
      price: 100000,
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
 
const ReservationFormComponent: React.FC<ReservationFormComponentProps> = () => {
  const {
    control,
    formState: { errors },
    setValue,
  } = useFormContext<ReservationForm>()

  return ( 
    <View style={{ marginTop: 20 }}>
      <Text style={{ fontSize: Sizing.text.body[16], fontWeight: 'bold' }}>Reservasi Servis</Text>

      <Controller 
        name={'car'}
        control={control}
        render={({ field: { onChange, value }}) => (
          <Dropdown style={styles.margin} 
            value={value} 
            options={defaultCarOptions} 
            onSelect={onChange}
            headerComponent={
              <Text style={{ fontSize: Sizing.text.body[16], fontWeight: 'bold', marginHorizontal: 16 }}>Pilih mobil Anda</Text>
            }
            renderItem={(option) => (
              <Text style={styles.itemModal}>{option}</Text>
            )} 
            renderSelected={(option) => {
              return (
              <Text style={{fontSize: Sizing.text.body[14] }}>{option}</Text>
            )}}
          />
        )}
      />

      <Text style={{ fontSize: Sizing.text.body[14], marginTop: 16 }}>Hari ini</Text>
      
      <Controller 
        name={'hour'}
        control={control}
        render={({ field: { onChange, value }}) => (
          <FlatList
            horizontal
            data={availableHours}
            renderItem={(info: ListRenderItemInfo<AvailableHourItem>) => (
              <HourChipsItem hour={info.item} value={value} onSelect={onChange}/>
            )}
          />
        )}
      />

      <Controller 
        name={'service'}
        control={control}
        render={({ field: { onChange, value }}) => (
          <Dropdown style={styles.margin} 
            value={value} 
            options={defaultServiceOptions} 
            onSelect={onChange}
            headerComponent={
              <Text style={{ fontSize: Sizing.text.body[16], fontWeight: 'bold', marginHorizontal: 16 }}>Pilih Servis</Text>
            }
            renderItem={(option) => (
              <View>
                <Text style={{ fontSize: Sizing.text.body[14], fontWeight: 'bold' }}>{option.name}-{option.price}</Text>
                <Text style={{ fontSize: Sizing.text.body[14], color: Color.gray[8]}}>{option.description}</Text>
              </View>
            )} 
            renderSelected={(option) => {
              return (
              <Text style={{fontSize: Sizing.text.body[14] }}>{option?.name}-{option?.price}</Text>
            )}}
          />
        )}
      />

      <Text style={{ fontSize: Sizing.text.body[14], marginTop: 16 }}>Catatan</Text>

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
    fontSize: Sizing.text.body[14],
    fontWeight: 'bold',
  },
})