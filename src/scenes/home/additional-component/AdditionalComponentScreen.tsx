import AppContainer from 'components/AppContainer';
import CustomChips from 'components/CustomChips';
import React, { useState } from 'react'
import { Text, View } from 'react-native';
import { CheckBox } from 'react-native-elements';
import { formatRupiah } from 'utils/TextUtils';
import { PriorityMapColor, PriorityMapItem } from '../constants';

interface AdditionalComponentScreenProps {
    
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
 
const AdditionalComponentScreen: React.FC<AdditionalComponentScreenProps> = () => {
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
      <View>
        <Text>{value.component} | {formatRupiah(value.price)}</Text>
        <CustomChips style={{ backgroundColor: PriorityMapColor.get(value.priority)}} text={PriorityMapItem.get(value.priority)}/>
      </View>
      <CheckBox checked={value.selected} onPress={() => handleChecked(idx, !value.selected)} />
    </View>
  ))

  return (  
    <AppContainer>
      <Text>Setelah diagnosis lebih lanjut oleh bengkel, terdapat beberapa komponen yang perlu diganti. Hanya komponen yang Anda centang yang akan diganti.</Text>

      <View>
        <Text>Kebutuhan Komponen Tambahan</Text>
        {selectComponentListElement}
      </View>

      <View>
        <Text>Catatan dari Bengkel</Text>
        <Text>{'V-Belt dan Kampas Rem Bapak/Ibu sudah terlalu lama tidak diganti, kalau terlalu lama dibiarkan bisa merusak komponen lain. Untuk Filter sudah tidak optimal juga, tapi masih bisa tahan ~3 bulan kedepan.'}</Text>
      </View>
    </AppContainer>
  );
}
 
export default AdditionalComponentScreen;