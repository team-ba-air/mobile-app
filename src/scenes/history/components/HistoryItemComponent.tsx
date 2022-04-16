import CustomButton from 'components/CustomButton';
import React from 'react'
import { ProgressViewIOSComponent, View } from 'react-native';
import { Text } from 'react-native-elements';
import { Color } from 'styles/colors';
import { fontPixel, heightPixel } from 'styles/sizes';
import { getFormatDate } from 'utils/DateUtil';
import { HistoryItem } from '../constants';

interface HistoryItemComponentProps {
  item: HistoryItem
  setIsOpenReview: (open: boolean) => void
  setData: (data: HistoryItem) => void
}
 
const HistoryItemComponent: React.FC<HistoryItemComponentProps> = ({ item, setIsOpenReview, setData }) => {
  return ( 
    <View style={{ backgroundColor: Color.gray[0], borderRadius: 8, padding: 16, marginBottom: heightPixel(8) }}>
      <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
        <Text style={{ fontSize: fontPixel(14) }}>{item.serviceType}</Text>
        <Text style={{ fontSize: fontPixel(14) }}>{item.price}</Text>
      </View>

      <Text style={{ fontSize: fontPixel(12), color: Color.gray[6], marginBottom: heightPixel(16) }}>{item.carType} {item.plat}</Text>

      <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
        <View>
          <Text style={{ fontSize: fontPixel(10), color: Color.gray[6] }}>{getFormatDate(item.date)}</Text>
          <Text style={{ fontSize: fontPixel(10), color: Color.gray[6] }}>{item.location}</Text>
        </View>

        <CustomButton 
          textStyle={{ fontSize: fontPixel(12) }} 
          type='primary' 
          title={'Beri Ulasan'} 
          onPress={() => {
            setData(item)
            setIsOpenReview(true)
          }} />
      </View>
    </View>
  );
}
 
export default HistoryItemComponent;