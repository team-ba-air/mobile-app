import { NavigationProp } from '@react-navigation/native';
import AppContainer from 'components/AppContainer';
import CustomButton from 'components/CustomButton';
import React, { useEffect } from 'react'
import { ScrollView, Text, View } from 'react-native';
import { Color } from 'styles/colors';
import { fontPixel, heightPixel, widthPixel } from 'styles/sizes';
import HistoryStatusComponent from './components/HistoryStatusComponent';
import InfoServiceComponent from './components/InfoServiceComponent';
import NotesComponent from './components/NotesComponent';
import PaymentDetailComponent from './components/PaymentDetailComponent';

interface HistoryDetailScreenProps {
  navigation: NavigationProp<any>
}
 
const HistoryDetailScreen: React.FC<HistoryDetailScreenProps> = ({ navigation }) => {
  useEffect(() => {
    navigation.getParent()?.setOptions({ tabBarStyle: { display: "none" }})
    return () => navigation.getParent()?.setOptions({ tabBarStyle: undefined })
  }, [navigation]);

  return ( 
    <AppContainer style={{ backgroundColor: Color.gray[1], padding: 0 }} refreshDisable>
      <ScrollView>
        <HistoryStatusComponent />
        <InfoServiceComponent />
        <PaymentDetailComponent />
        <NotesComponent />
      </ScrollView>
      <View style={{ paddingVertical: heightPixel(16), paddingHorizontal: widthPixel(20), backgroundColor: 'white', marginTop: heightPixel(4) }}>
        <CustomButton type='primary' title='Beri Ulasan'/>
        <Text style={{ fontSize: fontPixel(11), marginTop: heightPixel(12), alignSelf: 'center' }}>
          <Text style={{ color: Color.gray.secondary }}>Perlu bantuan?</Text>
          <Text style={{ color: Color.blue[8] }}> Hubungi Tim Otoku </Text>
        </Text>
      </View>
    </AppContainer>
  );
}
 
export default HistoryDetailScreen;