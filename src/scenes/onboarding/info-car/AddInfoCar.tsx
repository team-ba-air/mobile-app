import { yupResolver } from '@hookform/resolvers/yup';
import AppContainer from 'components/AppContainer';
import CustomButton from 'components/CustomButton';
import CustomTextInput from 'components/CustomTextInput';
import Dropdown, { OptionItem } from 'components/Dropdown';
import { SCREENS } from 'navigations/constants';
import React, { useEffect, useState } from 'react'
import { StyleSheet, Text, View } from 'react-native';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';
import { Sizing } from 'styles/sizes';
import { CarForm } from '../constants';
import { carSchema } from '../schema/carSchema';
import BottomSheetVin from './components/BottomSheetVin';

interface AddInfoCarProps {
  navigation: any
}

const defaultOptions: OptionItem[] = [
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

const defaultTypeOptions: OptionItem[] = [
  {
    data: 'Agya',
    value: 'Agya',
  },
  {
    data: 'Alphard',
    value: 'Alphard',
  },
  {
    data: 'Avanza',
    value: 'Avanza',
  },
]

const defaultYearOptions: OptionItem[] = [
  {
    data: '2010',
    value: '2010',
  },
  {
    data: '2011',
    value: '2011',
  },
  {
    data: '2012',
    value: '2012',
  },
]

const defaultColorOptions: OptionItem[] = [
  {
    data: 'Hitam',
    value: 'Hitam',
  },
  {
    data: 'Merah',
    value: 'Merah',
  },
  {
    data: 'Putih',
    value: 'Putih',
  },
]

const AddInfoCar: React.FC<AddInfoCarProps> = ({ navigation }) => {
  const [brand, setBrand] = useState('')
  const [type, setType] = useState('')
  const [year, setYear] = useState('')
  const [color, setColor] = useState('')
  const [plat, setPlat] = useState('')
  const [vin, setVin] = useState<string>('')
  const [expireDate, setExpireDate] = useState<string>('')

  const [disabled, setDisabled] = useState(true)

  const [showVin, setShowVin] = useState<boolean>(false)

  useEffect(() => {
    if(brand === '' && type === '' && year === '' && plat === '') {
      setDisabled(true)
    } else {
      setDisabled(false)
    }
  }, [brand, type, year, plat])

  const handleForm = () => {
    console.log({
      brand,
      type,
      year,
      plat
    })

    if(!disabled){
      navigation.navigate(SCREENS.onboarding.carList)
    }
  } 

  return ( 
    <AppContainer style={styles.container}>
      <BottomSheetVin visible={showVin} onChangeVisible={setShowVin} />
      <View>
        <Text style={styles.title}>Tambah Info Mobil</Text>
        <Dropdown style={styles.margin} placeholder={'Merek Mobil'} value={brand} onSelect={setBrand} options={defaultOptions}
          headerComponent={
            <Text style={{ fontSize: Sizing.text.body[16], fontWeight: 'bold', marginHorizontal: 16 }}>Pilih merek mobil Anda</Text>
          }
          renderItem={(option) => (
            <Text style={styles.itemModal}>{option}</Text>
          )} 
          renderSelected={(option) => {
            return (
            <Text>{option}</Text>
          )}}
        />

        <Dropdown style={styles.margin} placeholder={'Tipe'} value={type} onSelect={setType} options={defaultTypeOptions}
          headerComponent={
            <Text style={{ fontSize: Sizing.text.body[16], fontWeight: 'bold', marginHorizontal: 16 }}>Pilih tipe mobil Anda</Text>
          }
          renderItem={(option) => (
            <Text style={styles.itemModal}>{option}</Text>
          )} 
          renderSelected={(option) => (
            <Text>{option}</Text>
          )}
        />

        <Dropdown style={styles.margin} placeholder={'Tahun'} value={year} onSelect={setYear} options={defaultYearOptions}
          renderItem={(option) => (
            <Text style={styles.itemModal}>{option}</Text>
          )} 
          renderSelected={(option) => (
            <Text>{option}</Text>
          )}
        />

        <Dropdown style={styles.margin} placeholder={'Warna'} value={color} onSelect={setColor} options={defaultColorOptions}
          renderItem={(option) => (
            <Text style={styles.itemModal}>{option}</Text>
          )} 
          renderSelected={(option) => (
            <Text>{option}</Text>
          )}
        />

        <CustomTextInput style={styles.margin} placeholder={'Plat Nomor'} onChange={setPlat} value={plat} />

        <TouchableWithoutFeedback onPress={() => setShowVin(true)} style={{ marginTop: 16 }}>
          <Text style={{ fontSize: Sizing.text.body[12], fontWeight: 'bold' }}>Nomor VIN Kendaraan</Text>
        </TouchableWithoutFeedback>
        <CustomTextInput style={styles.margin} placeholder={'Nomor VIN'} onChange={setVin} value={vin} />

        <Text style={{ marginTop: 16, fontSize: Sizing.text.body[12], fontWeight: 'bold' }}>Masa Berlaku STNK</Text>
        <CustomTextInput style={styles.margin} placeholder={'Masa Berlaku STNK'} onChange={setExpireDate} value={expireDate} />
      </View>
      
      <CustomButton disabled={disabled} onPress={handleForm} type='primary' title={'Simpan'}/>

    </AppContainer>
   );
}
 
export default AddInfoCar;

const styles = StyleSheet.create({
  title: {
    fontSize: Sizing.text.heading[28],
    fontWeight: 'bold'
  },
  itemModal: {
    fontSize: Sizing.text.body[14],
    fontWeight: 'bold',
  },
  margin: {
    marginTop: 16,
  },
  container: {
    display: 'flex',
    justifyContent: 'space-between',
  }
})
