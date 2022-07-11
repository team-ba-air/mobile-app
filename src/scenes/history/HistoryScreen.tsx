import { NavigationProp } from '@react-navigation/native';
import AppContainer from 'components/AppContainer';
import { SCREENS } from 'navigations/constants';
import { PublicAPIResponse } from 'network/types';
import React, { useState } from 'react'
import { FlatList, ListRenderItemInfo, Text, View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useQuery } from 'react-query';
import { Color } from 'styles/colors';
import { fontPixel, heightPixel } from 'styles/sizes';
import BottomSheetReview from './components/BottomSheetReview';
import HistoryItemComponent from './components/HistoryItemComponent';
import { HistoryItem } from './constants';
import getHistoryList from './service/getHistoryList';

interface HistoryScreenProps {
  navigation: NavigationProp<any>
}

const dummyData: HistoryItem[] = [
  {
    id: '1',
    status: 0,
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
    additional_component: [],
    review: null,
  },
  {
    id: '2',
    status: 5,
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
    additional_component: [],
    review: null,
  }
]
 
const HistoryScreen: React.FC<HistoryScreenProps> = ({ navigation }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [data, setData] = useState<HistoryItem | null>(null);

  const {
    data: historyListResponse,
    refetch,
  } = useQuery<PublicAPIResponse<HistoryItem[]>>(
    ['getHistoryList'],
    () => getHistoryList(),
    {
      refetchOnWindowFocus: false,
      retry: true,
    }
  )

  const historyList = historyListResponse?.body ?? []

  const finishedList = dummyData.filter(value => value.status > 4)
  const ongoingList = dummyData.filter(value => value.status <= 4)

  const handleClick = (item: HistoryItem) => {
    navigation.navigate(SCREENS.history.detail, { data: item })
  }

  const handleClose = () => {
    console.log('Review History List')
    setIsOpen(false)
  }

  return ( 
    <AppContainer style={{ backgroundColor: Color.gray[1] }} refreshDisable>
      {ongoingList.length > 0 && (
        <View>
          <Text style={{ fontSize: fontPixel(14), fontWeight: 'bold', marginBottom: heightPixel(8) }}>Sedang Berlangsung</Text>
          <FlatList 
            data={ongoingList}
            renderItem={(info: ListRenderItemInfo<HistoryItem>) => (
              <HistoryItemComponent item={info.item} setIsOpenReview={setIsOpen} setData={setData} handleClick={() => handleClick(info.item)} />
            )}
          />
        </View>
      )}
      
      <View>
        {finishedList.length > 0 && (
          <Text style={{ fontSize: fontPixel(14), fontWeight: 'bold', marginBottom: heightPixel(8) }}>Selesai</Text>
        )}
        
        <FlatList 
          data={finishedList}
          renderItem={(info: ListRenderItemInfo<HistoryItem>) => (
            <HistoryItemComponent item={info.item} setIsOpenReview={setIsOpen} setData={setData} handleClick={() => handleClick(info.item)} />
          )}
        />
      </View>

      <BottomSheetReview onClose={handleClose} data={data} isOpen={isOpen} />
    </AppContainer>
  );
}
 
export default HistoryScreen;