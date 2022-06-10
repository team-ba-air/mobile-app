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
import SelectAdditionalComponent from './components/SelectAdditionalComponent';

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

  const [importantComponentList, setImportantComponentList] = useState(selectComponentList.filter(item => item.priority === 'IMPORTANT'))
  const [recommendedComponentList, setRecommendedComponentList] = useState(selectComponentList.filter(item => item.priority === 'RECOMMENDED'))

  const handleCheckedImportant = (index: number, checked: boolean) => {
    console.log(index)
    console.log('check')
    const newComponentList = importantComponentList.map((value, idx) => {
      if (idx === index) {
        return {
          ...value,
          selected: checked
        }
      }

      return value
    })
    setImportantComponentList(newComponentList)
  }

  const handleCheckedRecommended = (index: number, checked: boolean) => {
    console.log(index)
    console.log('check')
    const newComponentList = recommendedComponentList.map((value, idx) => {
      if (idx === index) {
        return {
          ...value,
          selected: checked
        }
      }

      return value
    })
    setRecommendedComponentList(newComponentList)
  }

  const selectImportantComponentListElement = importantComponentList.map((value, idx) => (
    <SelectAdditionalComponent index={idx} data={value} handleChecked={handleCheckedImportant} />
  ))

  const selectRecommendedComponentListElement = recommendedComponentList.map((value, idx) => (
    <SelectAdditionalComponent index={idx} data={value} handleChecked={handleCheckedRecommended} />
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
          <Text style={{ fontSize: fontPixel(14), color: Color.gray.secondary, marginTop: heightPixel(16) }}>Catatan dari Bengkel</Text>
          <Text style={{ marginTop: heightPixel(4) }}>{'V-Belt dan Kampas Rem Bapak/Ibu sudah terlalu lama tidak diganti, kalau terlalu lama dibiarkan bisa merusak komponen lain. Untuk Filter sudah tidak optimal juga, tapi masih bisa tahan ~3 bulan kedepan.'}</Text>
        </View>

        <View>
          <Text style={{ fontSize: fontPixel(14), color: Color.gray.secondary, marginTop: heightPixel(16) }}>Kebutuhan Komponen Tambahan</Text>
          {selectImportantComponentListElement.length > 0 && (
            <View style={{ marginTop: 16 }}>
              <Text style={{ fontSize: fontPixel(14), fontWeight: 'bold', color: Color.red[7]}}>Penting ({selectImportantComponentListElement.length})</Text>
              {selectImportantComponentListElement}
            </View>
          )}

          {selectRecommendedComponentListElement.length > 0 && (
            <View style={{ marginTop: 16 }}>
              <Text style={{ fontSize: fontPixel(14), fontWeight: 'bold', color: Color.red[5]}}>Rekomendasi ({selectRecommendedComponentListElement.length})</Text>
              {selectRecommendedComponentListElement}
            </View>
          )}
        </View>

      </View>

      <Footer navigation={navigation} />
    </AppContainer>
  );
}
 
export default AdditionalComponentScreen;