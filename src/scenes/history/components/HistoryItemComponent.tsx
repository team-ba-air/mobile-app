import CustomButton from 'components/CustomButton';
import React from 'react'
import { ProgressViewIOSComponent, View } from 'react-native';
import { Text } from 'react-native-elements';
import { getFormatDate } from 'utils/DateUtil';
import { HistoryItem } from '../constants';

interface HistoryItemComponentProps {
  item: HistoryItem
}
 
const HistoryItemComponent: React.FC<HistoryItemComponentProps> = ({ item }) => {
  return ( 
    <View>
      <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
        <Text>{item.serviceType}</Text>
        <Text>{item.price}</Text>
      </View>

      <Text>{item.carType} {item.plat}</Text>

      <View>
        <View>
          <Text>{getFormatDate(item.date)}</Text>
          <Text>{item.location}</Text>
        </View>

        <CustomButton type='primary' title={'Beri Ulasan'}/>
      </View>
    </View>
  );
}
 
export default HistoryItemComponent;