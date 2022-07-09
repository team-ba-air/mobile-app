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
    id: '1',
    car: {
      id: '',
      brand: 'Toyota',
      type: 'Yaris',
      license_plate: 'B 2000 S',
    },
    shop: {
      id: '',
      name: 'Auto 2000, Jakarta Utara',
    },
    service: {
      id: '',
      name: 'Servis Reguler 20.000 KM',
      description: '',
      price: 400000,
    },
    datetime: new Date(),
  },
  {
    id: '2',
    car: {
      id: '',
      brand: 'Toyota',
      type: 'Yaris',
      license_plate: 'B 2000 S',
    },
    shop: {
      id: '',
      name: 'Auto 2000, Jakarta Utara',
    },
    service: {
      id: '',
      name: 'Servis Reguler 20.000 KM',
      description: '',
      price: 500000,
    },
    datetime: new Date(),
  }
]
 
const HistoryScreen: React.FC<HistoryScreenProps> = ({ navigation }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [data, setData] = useState<HistoryItem | null>(null);

  const handleClick = () => {
    navigation.navigate(SCREENS.history.detail)
  }

  return ( 
    <AppContainer style={{ backgroundColor: Color.gray[1] }} refreshDisable>
      <FlatList 
        data={dummyData}
        renderItem={(info: ListRenderItemInfo<HistoryItem>) => (
          <HistoryItemComponent item={info.item} setIsOpenReview={setIsOpen} setData={setData} handleClick={handleClick} />
        )}
      />

      <BottomSheetReview data={data} isOpen={isOpen} setIsOpenReview={setIsOpen} />
    </AppContainer>
  );
}
 
export default HistoryScreen;