import { yupResolver } from '@hookform/resolvers/yup';
import AppContainer from 'components/AppContainer';
import CustomButton from 'components/CustomButton';
import Dropdown from 'components/Dropdown';
import { SCREENS } from 'navigations/constants';
import React, { useEffect, useState } from 'react'
import { Controller, useForm } from 'react-hook-form';
import { FlatList, ListRenderItemInfo, StyleSheet, Text, View } from 'react-native';
import { ListItem } from 'react-native-elements';
import { Color } from 'styles/colors';
import { Sizing } from 'styles/sizes';
import { CarForm } from '../constants';
import { carSchema } from '../schema/carSchema';
import BrandCarBottomSheet from './components/BrandCarBottomSheet';

interface AddInfoCarProps {
  navigation: any
}

const AddInfoCar: React.FC<AddInfoCarProps> = ({ navigation }) => {
  const [selected, setSelected] = useState<string>('')
  const [modalVisible, setModalVisible] = useState<boolean>(false)
  const [typeVisible, setTypeVisible] = useState<boolean>(false)
  const [yearVisible, setYearVisible] = useState<boolean>(false)
  const [platVisible, setPlatVisible] = useState<boolean>(false)

  const [brand, setBrand] = useState('')
  const [type, setType] = useState('')
  const [year, setYear] = useState('')
  const [plat, setPlat] = useState('')

  const [disabled, setDisabled] = useState(true)

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
      <View>
        <Text style={styles.title}>Tambah Info Mobil</Text>
        <Dropdown style={styles.margin} placeholder={'Merek Mobil'} value={brand} onChangeVisible={setModalVisible} visible={modalVisible}
          modal={(
            <BrandCarBottomSheet setVisible={setModalVisible} onSelect={setBrand} />
          )}
        />

        <Dropdown style={styles.margin} placeholder={'Tipe'} value={type} onChangeVisible={setTypeVisible} visible={typeVisible}
          modal={(
            <BrandCarBottomSheet setVisible={setTypeVisible} onSelect={setType} />
          )}
        />

        <Dropdown style={styles.margin} placeholder={'Tahun'} value={year} onChangeVisible={setYearVisible} visible={yearVisible}
          modal={(
            <BrandCarBottomSheet setVisible={setYearVisible} onSelect={setYear} />
          )}
        />

        <Dropdown style={styles.margin} placeholder={'Plat Nomor'} value={plat} onChangeVisible={setPlatVisible} visible={platVisible}
          modal={(
            <BrandCarBottomSheet setVisible={setPlatVisible} onSelect={setPlat} />
          )}
        />
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
  margin: {
    marginTop: 16,
  },
  container: {
    display: 'flex',
    justifyContent: 'space-between',
  }
})
