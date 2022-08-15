import { NavigationProp } from '@react-navigation/native';
import AppContainer from 'components/AppContainer';
import { SCREENS } from 'navigations/constants';
import { PublicAPIResponse } from 'network/types';
import React, { useState } from 'react'
import { FlatList, ListRenderItemInfo, Text, View } from 'react-native';
import { Snackbar } from 'react-native-paper';
import { useQuery } from 'react-query';
import { Color } from 'styles/colors';
import { fontPixel, heightPixel, widthPixel } from 'styles/sizes';
import BottomSheetReview from './components/BottomSheetReview';
import HistoryItemComponent from './components/HistoryItemComponent';
import { HistoryItem } from './constants';
import getHistoryList from './service/getHistoryList';

interface HistoryScreenProps {
  navigation: NavigationProp<any>
}
 
const HistoryScreen: React.FC<HistoryScreenProps> = ({ navigation }) => {
  const [visible, setVisible] = useState(false)
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

  const finishedList = historyList.filter(value => value.status > 4)
  const ongoingList = historyList.filter(value => value.status <= 4)

  const handleClick = (item: HistoryItem) => {
    navigation.navigate(SCREENS.history.detail, { data: item })
  }

  const handleClose = () => {
    console.log('Review History List')
    setIsOpen(false)
  }

  const handleSuccess = () => {
    setVisible(true)
  }

  return ( 
    <AppContainer style={{ backgroundColor: Color.gray[1], padding: 0 }} refreshBackground={Color.gray[1]} onRefresh={() => {
      refetch()
    }}>
      {ongoingList.length > 0 && (
        <View style={{ paddingHorizontal: widthPixel(20), marginTop: heightPixel(20) }}>
          <Text style={{ fontSize: fontPixel(14), fontWeight: 'bold', marginBottom: heightPixel(8) }}>Sedang Berlangsung</Text>
          <FlatList 
            data={ongoingList}
            renderItem={(info: ListRenderItemInfo<HistoryItem>) => (
              <HistoryItemComponent key={info.index} item={info.item} setIsOpenReview={setIsOpen} setData={setData} handleClick={() => handleClick(info.item)} />
            )}
          />
        </View>
      )}
      
      <View style={{ paddingHorizontal: widthPixel(20) }}>
        {finishedList.length > 0 && (
          <Text style={{ fontSize: fontPixel(14), fontWeight: 'bold', marginBottom: heightPixel(8) }}>Selesai</Text>
        )}
        
        <FlatList 
          data={finishedList}
          renderItem={(info: ListRenderItemInfo<HistoryItem>) => (
            <HistoryItemComponent key={info.index} item={info.item} setIsOpenReview={setIsOpen} setData={setData} handleClick={() => handleClick(info.item)} />
          )}
        />
      </View>

      <BottomSheetReview 
        onSuccess={handleSuccess}
        onClose={handleClose} 
        data={data} 
        isOpen={isOpen} 
      />

      <Snackbar
        visible={visible}
        onDismiss={() => setVisible(false)}
        duration={4000}
        style={{ backgroundColor: '#27AE60', marginBottom: heightPixel(24) }}
        wrapperStyle={{ alignSelf: 'center' }}
        theme={{
          colors: {
            surface: 'white'
          }
        }}
      >
        Terima kasih, ulasan berhasil diberikan!
      </Snackbar>
    </AppContainer>
  );
}
 
export default HistoryScreen;