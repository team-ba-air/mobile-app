import { NavigationProp, Route } from '@react-navigation/native';
import AppContainer from 'components/AppContainer';
import { SCREENS } from 'navigations/constants';
import React, { useState } from 'react'
import { ScrollView, Text, View } from 'react-native';
import { Modal, Portal, Provider } from 'react-native-paper';
import { Color } from 'styles/colors';
import { fontPixel, heightPixel, widthPixel } from 'styles/sizes';
import { AdditionalComponentItem } from '../constants';
import AdditionalListSectionComponent from './components/AdditionalListSectionComponent';
import Footer from './components/Footer';
import ModalConfirmation from './components/ModalConfirmation';
import ModalRemoveAdditionalComponent from './components/ModalRemoveAdditionalComponent';

interface AdditionalComponentScreenProps {
  navigation: NavigationProp<any>
  route: Route<any, ParamAdditionalComponent>
}

interface ParamAdditionalComponent {
  id: string
  servicePrice: number
}

const dummyData: AdditionalComponentItem[] = [
  {
    id: '1',
    name: 'V-Belt',
    price: 250000,
    priority: 'IMPORTANT',
  },
  {
    id: '2',
    name: 'Kampas Rem',
    price: 180000,
    priority: 'IMPORTANT',
  },
  {
    id: '3',
    name: 'Filter',
    price: 150000,
    priority: 'RECOMMENDED',
  },
  {
    id: '4',
    name: 'Filter',
    price: 150000,
    priority: 'RECOMMENDED',
  },

]
 
const AdditionalComponentScreen: React.FC<AdditionalComponentScreenProps> = ({ navigation, route }) => {
  const { servicePrice, id } = route.params
  const [visible, setVisible] = useState<boolean>(false)

  const selectComponentList = dummyData.map(value => (
    {
      ...value,
      selected: value.priority === 'IMPORTANT' ? true : false,
    }
  ))

  const [importantComponentList, setImportantComponentList] = useState(selectComponentList.filter(item => item.priority === 'IMPORTANT'))
  const [recommendedComponentList, setRecommendedComponentList] = useState(selectComponentList.filter(item => item.priority === 'RECOMMENDED'))

  const selectedComponentList = importantComponentList.concat(recommendedComponentList).filter(value => value.selected)

  const handleConfirm = () => {
    handleDismiss()
    navigation.navigate(SCREENS.reservation.selectPayment, { additionalComponent: selectedComponentList, servicePrice: servicePrice, id })
  }

  const handleDismiss = () => {
    setVisible(false)
  }

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
      <Portal>
        <Modal visible={visible} onDismiss={handleDismiss}>
          <ModalConfirmation onConfirm={handleConfirm} onCancel={handleDismiss} />
        </Modal>
      </Portal>
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

      <Footer data={selectedComponentList} navigation={navigation} showModal={() => setVisible(true)} />
    </AppContainer>
  );
}
 
export default AdditionalComponentScreen;