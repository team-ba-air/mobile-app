import React, { useState } from 'react'
import { Image, Text, TouchableOpacity, View } from 'react-native';
import { Portal, Modal } from 'react-native-paper';
import { AdditionalComponentSelectionItem } from 'scenes/home/constants';
import { Color } from 'styles/colors';
import { fontPixel, widthPixel } from 'styles/sizes';
import ModalRemoveAdditionalComponent from './ModalRemoveAdditionalComponent';
import SelectAdditionalComponent from './SelectAdditionalComponent';

interface AdditionalListSectionComponentProps {
  title: 'important' | 'recommended'
  data: AdditionalComponentSelectionItem[]
  setData: (componentList: AdditionalComponentSelectionItem[]) => void
}
 
const AdditionalListSectionComponent: React.FC<AdditionalListSectionComponentProps> = ({ title, data, setData }) => {
  const [visible, setVisible] = useState<boolean>(true)
  const [modalVisible, setModalVisible] = useState<boolean>(false)

  const [indexSelected, setIndexSelected] = useState<number>(-1)

  const handleChecked = (index: number, checked: boolean) => {
    setIndexSelected(index)
    if (title === 'important' && !checked) {
      setModalVisible(true)
    } else {
      changeChecked(index, checked)
    }
  }

  const changeChecked = (index: number, checked: boolean) => {
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
    setIndexSelected(-1)
  }

  const selectComponentListElement = data.map((value, idx) => (
    <SelectAdditionalComponent index={idx} data={value} handleChecked={handleChecked} />
  ))

  const handleRemove = () => {
    if (indexSelected >= 0) {
      changeChecked(indexSelected, false)
    }
    handleDismiss()
  }

  const handleDismiss = () => {
    setModalVisible(false)
    setIndexSelected(-1)
  }

  return ( 
    <>
      {title === 'important' && (
        <Portal>
          <Modal visible={modalVisible} onDismiss={handleDismiss}>
            <ModalRemoveAdditionalComponent onRemove={handleRemove} onCancel={handleDismiss} />
          </Modal>
        </Portal>
      )}
      <View style={{ marginTop: 16 }}>
        <TouchableOpacity 
          onPress={() => setVisible(!visible)}
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            paddingRight: widthPixel(8),
          }}
        >
          <Text style={{ fontSize: fontPixel(14), fontWeight: 'bold', color: title === 'important' ? Color.red[7] : Color.red[5]}}>
            {title === 'important' ? 'Penting' : 'Rekomendasi'} ({selectComponentListElement.length})
          </Text>
          <Image source={require('assets/icon/arrow_down.png')}/>
        </TouchableOpacity>
        
        {visible && selectComponentListElement}
      </View>
    </>
  );
}
 
export default AdditionalListSectionComponent;