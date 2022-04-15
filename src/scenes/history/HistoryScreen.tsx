import AppContainer from 'components/AppContainer';
import React from 'react'
import { FlatList, ListRenderItemInfo } from 'react-native';
import HistoryItemComponent from './components/HistoryItemComponent';
import { HistoryItem } from './constants';

interface HistoryScreenProps {
    
}

const dummyData: HistoryItem[] = [
  {
    serviceType: 'Servis Reguler 10.000KM',
    price: 4000000,
    carType: 'Yaris',
    plat: 'B 2012 S',
    date: new Date(),
    location: 'Auto 2000, Jakarta Utara'
  },
  {
    serviceType: 'Servis Reguler 20.000KM',
    price: 5000000,
    carType: 'Yaris',
    plat: 'B 2012 S',
    date: new Date(),
    location: 'Auto 2000, Jakarta Utara'
  }
]
 
const HistoryScreen: React.FC<HistoryScreenProps> = () => {
  return ( 
    <AppContainer>
      <FlatList 
        data={dummyData}
        renderItem={(info: ListRenderItemInfo<HistoryItem>) => (
          <HistoryItemComponent item={info.item} />
        )}
      />
    </AppContainer>
  );
}
 
export default HistoryScreen;