import { NavigationProp } from '@react-navigation/native';
import AppContainer from 'components/AppContainer';
import React, { useState } from 'react'
import { ScrollView, Text, View } from 'react-native';
import { Color } from 'styles/colors';
import { fontPixel, heightPixel, widthPixel } from 'styles/sizes';
import AdditionalListSectionComponent from './components/AdditionalListSectionComponent';
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

  const selectedComponentList = importantComponentList.concat(recommendedComponentList).filter(value => value.selected)

  return (  
    <AppContainer 
      style={{ 
        padding: 0, 
        display: 'flex',
        justifyContent: 'space-between',
        flexDirection: 'column',
        backgroundColor: Color.gray[1]
      }}
      refreshDisable
    >
      <ScrollView style={{ paddingHorizontal: widthPixel(20), paddingTop: heightPixel(20), paddingBottom: heightPixel(36), backgroundColor: 'white' }}>
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
          {importantComponentList.length > 0 && (
            <AdditionalListSectionComponent title={'important'} data={importantComponentList} setData={setImportantComponentList} />
          )}

          {recommendedComponentList.length > 0 && (
            <AdditionalListSectionComponent title={'recommended'} data={recommendedComponentList} setData={setRecommendedComponentList} />
          )}
        </View>

      </ScrollView>

      <Footer data={selectedComponentList} navigation={navigation} />
    </AppContainer>
  );
}
 
export default AdditionalComponentScreen;