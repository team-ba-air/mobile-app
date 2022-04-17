import AppContainer from 'components/AppContainer';
import React from 'react'
import HistoryStatusComponent from './components/HistoryStatusComponent';
import InfoServiceComponent from './components/InfoServiceComponent';
import PaymentDetailComponent from './components/PaymentDetailComponent';

interface HistoryDetailScreenProps {
    
}
 
const HistoryDetailScreen: React.FC<HistoryDetailScreenProps> = () => {
  return ( 
    <AppContainer>
      <HistoryStatusComponent />
      <InfoServiceComponent />
      <PaymentDetailComponent />
    </AppContainer>
  );
}
 
export default HistoryDetailScreen;