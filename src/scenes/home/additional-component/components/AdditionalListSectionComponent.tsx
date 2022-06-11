import React from 'react'
import { Text, View } from 'react-native';
import { AdditionalComponentSelectionItem } from 'scenes/home/constants';
import { Color } from 'styles/colors';
import { fontPixel } from 'styles/sizes';
import SelectAdditionalComponent from './SelectAdditionalComponent';

interface AdditionalListSectionComponentProps {
  title: 'important' | 'recommended'
  data: AdditionalComponentSelectionItem[]
  setData: (componentList: AdditionalComponentSelectionItem[]) => void
}
 
const AdditionalListSectionComponent: React.FC<AdditionalListSectionComponentProps> = ({ title, data, setData }) => {
  const handleChecked = (index: number, checked: boolean) => {
    console.log(index)
    console.log('check')
    const newComponentList = data.map((value, idx) => {
      if (idx === index) {
        return {
          ...value,
          selected: checked
        }
      }

      return value
    })
    setData(newComponentList)
  }

  const selectComponentListElement = data.map((value, idx) => (
    <SelectAdditionalComponent index={idx} data={value} handleChecked={handleChecked} />
  ))

  return ( 
    <View style={{ marginTop: 16 }}>
      <Text style={{ fontSize: fontPixel(14), fontWeight: 'bold', color: title === 'important' ? Color.red[7] : Color.red[5]}}>
        {title === 'important' ? 'Penting' : 'Rekomendasi'} ({selectComponentListElement.length})
      </Text>
      {selectComponentListElement}
    </View>
  );
}
 
export default AdditionalListSectionComponent;