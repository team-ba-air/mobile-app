import CustomTextInput from 'components/CustomTextInput';
import Dropdown, { OptionItem } from 'components/Dropdown';
import React, { useState } from 'react'
import { ListRenderItemInfo, StyleSheet, View } from 'react-native';
import { Text } from 'react-native-elements';
import { FlatList } from 'react-native-gesture-handler';
import { Color } from 'styles/colors';
import { Sizing } from 'styles/sizes';
import ServiceAvailableBottomSheet from './ServiceAvailableBottomSheet';
import UserCarBottomSheet from './UserCarBottomSheet';

interface ReservationFormProps {
  
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
 
const ReservationForm: React.FC<ReservationFormProps> = () => {
  const [car, setCar] = useState('Toyota')
  const [service, setService] = useState('Servis Dasar')

  const [notes, setNotes] = useState<string>('')

  return ( 
    <View style={{ marginTop: 20 }}>
      <Text style={{ fontSize: Sizing.text.body[16], fontWeight: 'bold' }}>Reservasi Servis</Text>

      <Dropdown style={styles.margin} 
        value={car} 
        options={defaultCarOptions} 
        onSelect={setCar}
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

      <Text style={{ fontSize: Sizing.text.body[14], marginTop: 16 }}>Hari ini</Text>

      <FlatList
        data={[]}
        renderItem={(info: ListRenderItemInfo<number>) => (
          <View>
          </View>
        )}
      />

      <Dropdown style={styles.margin} 
        value={service} 
        options={defaultServiceOptions} 
        onSelect={setService}
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
          console.log(option)
          return (
          <Text style={{fontSize: Sizing.text.body[14] }}>{option?.name}-{option?.price}</Text>
        )}}
      />

      <Text style={{ fontSize: Sizing.text.body[14], marginTop: 16 }}>Catatan</Text>
      <CustomTextInput style={styles.margin} value={notes} onChange={setNotes} placeholder={'Misal: AC suka bunyi kalau baru nyala, rem berdecit'} multiline={true} lines={4} />
    </View>
  );
}
 
export default ReservationForm;

const styles = StyleSheet.create({
  margin: {
    marginTop: 16,
  },
  itemModal: {
    fontSize: Sizing.text.body[14],
    fontWeight: 'bold',
  },
})