import CustomButton from 'components/CustomButton';
import React from 'react'
import { ProgressViewIOSComponent, TouchableWithoutFeedback, View } from 'react-native';
import { Text } from 'react-native-elements';
import { Color } from 'styles/colors';
import { fontPixel, heightPixel } from 'styles/sizes';
import { getFormatDate } from 'utils/DateUtil';
import { formatRupiah } from 'utils/TextUtils';
import { HistoryItem } from '../constants';

interface HistoryItemComponentProps {
  item: HistoryItem
  setIsOpenReview: (open: boolean) => void
  setData: (data: HistoryItem) => void
  handleClick: () => void
}
 
const HistoryItemComponent: React.FC<HistoryItemComponentProps> = ({ item, setIsOpenReview, setData, handleClick }) => {
  const additionalComponent = item.additional_component ?? []
  const totalPriceAdditionalComponent = additionalComponent.reduce((totalAccumulator, component) => totalAccumulator + component.price, 0)

  return ( 
    <View style={{ backgroundColor: Color.gray[0], borderRadius: 8, padding: 16, marginBottom: heightPixel(8) }}>
      <TouchableWithoutFeedback onPress={handleClick}>
        <View>
          <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
            <Text style={{ fontSize: fontPixel(14) }}>{item.service?.name}</Text>
            <Text style={{ fontSize: fontPixel(14) }}>{formatRupiah(item.service?.price ?? 0 + totalPriceAdditionalComponent)}</Text>
          </View>

          <Text style={{ fontSize: fontPixel(12), color: Color.gray[6], marginBottom: heightPixel(16) }}>{item.car?.type} {item.car?.license_plate}</Text>
          
          <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
            <View>
              <Text style={{ fontSize: fontPixel(10), color: Color.gray[6] }}>{getFormatDate(item.datetime)}</Text>
              <Text style={{ fontSize: fontPixel(10), color: Color.gray[6] }}>{item.shop?.name}</Text>
            </View>

            {(item.status > 4 && item.review === null) && (
              <CustomButton 
                style={{ zIndex: 5 }}
                textStyle={{ fontSize: fontPixel(12) }} 
                type='primary' 
                title={'Beri Ulasan'} 
                onPress={() => {
                  setData(item)
                  setIsOpenReview(true)
                }} />
            )}
            
          </View>
        </View>
      </TouchableWithoutFeedback>
      
    </View>
  );
}
 
export default HistoryItemComponent;