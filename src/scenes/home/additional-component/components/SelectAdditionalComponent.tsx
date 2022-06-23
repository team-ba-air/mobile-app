import React from 'react'
import { Text, View } from 'react-native';
import { CheckBox } from 'react-native-elements';
import { Checkbox } from 'react-native-paper';
import { AdditionalComponentSelectionItem } from 'scenes/home/constants';
import { Color } from 'styles/colors';
import { widthPixel } from 'styles/sizes';
import { formatRupiah } from 'utils/TextUtils';

interface SelectAdditionalComponentProps {
  index: number
  data: AdditionalComponentSelectionItem
  handleChecked: (idx: number, checked: boolean) => void
}
 
const SelectAdditionalComponent: React.FC<SelectAdditionalComponentProps> = ({ index, data, handleChecked }) => {
  return ( 
    <View style={{ 
      flexDirection: 'row', 
      justifyContent: 'space-between', 
      borderBottomColor: Color.gray[5],
      borderStyle: 'solid',
      borderBottomWidth: 1,
    }}>
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <Text style={{ marginRight: widthPixel(8) }}>{data.component} • {formatRupiah(data.price)}</Text>
      </View>
      <Checkbox status={data.selected ? 'checked' : 'unchecked'} onPress={() => handleChecked(index, !data.selected)} />
    </View>
  );
}
 
export default SelectAdditionalComponent;