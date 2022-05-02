import { NavigationProp } from '@react-navigation/native';
import AppContainer from 'components/AppContainer';
import CustomChips from 'components/CustomChips';
import React, { useState } from 'react'
import { Text, View } from 'react-native';
import { CheckBox } from 'react-native-elements';
import { Color } from 'styles/colors';
import { fontPixel, heightPixel, widthPixel } from 'styles/sizes';
import { formatRupiah } from 'utils/TextUtils';
import { PriorityMapColor, PriorityMapItem } from '../constants';
import Footer from './components/Footer';

interface AdditionalComponentScreenProps {
  navigation: NavigationProp<any>
}

const dummyData = [
  {
    component: 'V-Belt',
    price: 250000,
    priority: 'IMPORTANT',
  },
  {
    component: 'Kampas Rem',
    price: 180000,
    priority: 'IMPORTANT',
  },
  {
    component: 'Filter',
    price: 150000,
    priority: 'RECOMMENDED',
  },
]
 
const AdditionalComponentScreen: React.FC<AdditionalComponentScreenProps> = ({ navigation }) => {
  const selectComponentList = dummyData.map(value => (
    {
      ...value,
      selected: false,
    }
  ))

  const [componentList, setComponentList] = useState(selectComponentList)
  
  const handleChecked = (index: number, checked: boolean) => {
    setComponentList(prev => {
      prev[index].selected = checked
      return prev
    })
  }

  const selectComponentListElement = componentList.map((value, idx) => (
    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <Text style={{ marginRight: widthPixel(8) }}>{value.component} | {formatRupiah(value.price)}</Text>
        <CustomChips style={{ backgroundColor: PriorityMapColor.get(value.priority)}} text={PriorityMapItem.get(value.priority)}/>
      </View>
      <CheckBox checked={value.selected} onPress={() => handleChecked(idx, !value.selected)} />
    </View>
  ))

  return (  
    <AppContainer style={{ 
      padding: 0, 
      display: 'flex',
      justifyContent: 'space-between',
      flexDirection: 'column'
    }}>
      <View style={{ paddingHorizontal: widthPixel(20), marginTop: heightPixel(20) }}>
        <Text style={{ textAlign: 'justify' }}>
          <Text>Setelah diagnosis lebih lanjut oleh bengkel, terdapat beberapa komponen yang perlu diganti. </Text>
          <Text style={{ fontWeight: 'bold' }}>Hanya komponen yang Anda centang yang akan diganti.</Text>
        </Text>

        <View>
          <Text style={{ fontSize: fontPixel(14), color: Color.gray.secondary, marginTop: heightPixel(16) }}>Kebutuhan Komponen Tambahan</Text>
          {selectComponentListElement}
        </View>

        <View>
          <Text style={{ fontSize: fontPixel(14), color: Color.gray.secondary, marginTop: heightPixel(16) }}>Catatan dari Bengkel</Text>
          <Text style={{ marginTop: heightPixel(4) }}>{'V-Belt dan Kampas Rem Bapak/Ibu sudah terlalu lama tidak diganti, kalau terlalu lama dibiarkan bisa merusak komponen lain. Untuk Filter sudah tidak optimal juga, tapi masih bisa tahan ~3 bulan kedepan.'}</Text>
        </View>
      </View>

      <Footer navigation={navigation} />
    </AppContainer>
  );
}
 
export default AdditionalComponentScreen;