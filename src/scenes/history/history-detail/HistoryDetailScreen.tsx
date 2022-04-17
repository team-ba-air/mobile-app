import AppContainer from 'components/AppContainer';
import CustomButton from 'components/CustomButton';
import React from 'react'
import { ScrollView, View } from 'react-native';
import { Color } from 'styles/colors';
import { heightPixel, widthPixel } from 'styles/sizes';
import HistoryStatusComponent from './components/HistoryStatusComponent';
import InfoServiceComponent from './components/InfoServiceComponent';
import NotesComponent from './components/NotesComponent';
import PaymentDetailComponent from './components/PaymentDetailComponent';

interface HistoryDetailScreenProps {
    
}
 
const HistoryDetailScreen: React.FC<HistoryDetailScreenProps> = () => {
  return ( 
    <AppContainer style={{ backgroundColor: Color.gray[1], padding: 0 }}>
      <ScrollView>
        <HistoryStatusComponent />
        <InfoServiceComponent />
        <PaymentDetailComponent />
        <NotesComponent />
      </ScrollView>
      <View style={{ paddingVertical: heightPixel(16), paddingHorizontal: widthPixel(20), backgroundColor: 'white', marginTop: heightPixel(4) }}>
        <CustomButton type='primary' title='Beri Ulasan'/>
      </View>
    </AppContainer>
  );
}
 
export default HistoryDetailScreen;