import AppContainer from 'components/AppContainer';
import React from 'react'
import { ScrollView } from 'react-native';
import { Color } from 'styles/colors';
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
    </AppContainer>
  );
}
 
export default HistoryDetailScreen;