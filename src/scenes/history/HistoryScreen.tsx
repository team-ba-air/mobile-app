import { NavigationProp } from '@react-navigation/native';
import AppContainer from 'components/AppContainer';
import { SCREENS } from 'navigations/constants';
import React, { useState } from 'react'
import { FlatList, ListRenderItemInfo } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Color } from 'styles/colors';
import BottomSheetReview from './components/BottomSheetReview';
import HistoryItemComponent from './components/HistoryItemComponent';
import { HistoryItem } from './constants';

interface HistoryScreenProps {
  navigation: NavigationProp<any>
}

const dummyData: HistoryItem[] = [
  {
    serviceType: 'Servis Reguler 10.000KM',
    price: 4000000,
    brand: 'Toyota',
    carType: 'Yaris',
    plat: 'B 2012 S',
    date: new Date(),
    location: 'Auto 2000, Jakarta Utara'
  },
  {
    serviceType: 'Servis Reguler 20.000KM',
    price: 5000000,
    brand: 'Toyota',
    carType: 'Yaris',
    plat: 'B 2012 S',
    date: new Date(),
    location: 'Auto 2000, Jakarta Utara'
  }
]
 
const HistoryScreen: React.FC<HistoryScreenProps> = ({ navigation }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [data, setData] = useState<HistoryItem | null>(null);

  return ( 
    <AppContainer style={{ backgroundColor: Color.gray[1]}}>
      <FlatList 
        data={dummyData}
        renderItem={(info: ListRenderItemInfo<HistoryItem>) => (
          <TouchableOpacity onPress={() => navigation.navigate(SCREENS.history.detail)}>
            <HistoryItemComponent item={info.item} setIsOpenReview={setIsOpen} setData={setData} />
          </TouchableOpacity>
        )}
      />

      <BottomSheetReview data={data} isOpen={isOpen} setIsOpenReview={setIsOpen} />
    </AppContainer>
  );
}
 
export default HistoryScreen;