import AppContainer from 'components/AppContainer';
import React from 'react'
import { Text, View } from 'react-native';

interface HistoryDetailScreenProps {
    
}
 
const HistoryDetailScreen: React.FC<HistoryDetailScreenProps> = () => {
  return ( 
    <AppContainer>
      <View>
        <Text>Nomor Booking</Text>
      </View>
    </AppContainer>
  );
}
 
export default HistoryDetailScreen;