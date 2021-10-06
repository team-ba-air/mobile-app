import AppContainer from 'components/AppContainer';
import Dropdown from 'components/Dropdown';
import React, { useState } from 'react'
import { FlatList, ListRenderItemInfo, StyleSheet, Text, View } from 'react-native';
import { ListItem } from 'react-native-elements';
import { Color } from 'styles/colors';
import { Sizing } from 'styles/sizes';

interface AddInfoCarProps {
  
}
 
const defaultOptions = [
  {
    label: 'Toyota',
    value: 'Toyota',
  },
  {
    label: 'Daihatsu',
    value: 'Daihatsu',
  },
  {
    label: 'Nissan',
    value: 'Nissan',
  },
]

const AddInfoCar: React.FC<AddInfoCarProps> = () => {
  const [selected, setSelected] = useState<string>('')
  const [modalVisible, setModalVisible] = useState<boolean>(false)

  return ( 
    <AppContainer>
      <Dropdown placeholder={'Mobil anda'} value={selected} onChangeVisible={setModalVisible} visible={modalVisible}
          modal={(
            <View>
              <Text style={styles.titleModal}>Pilih merek mobil Anda</Text>
              <FlatList
                keyExtractor={(item, index) => index.toString()}
                data={defaultOptions}
                renderItem={(option: ListRenderItemInfo<any>) => {
                  return (
                    <ListItem bottomDivider onPress={() => {
                      console.log('On Pressed')
                      setSelected(option.item.value)
                      setModalVisible(false)
                    }}>
                      <Text style={styles.itemModal}>{option.item.label}</Text>
                    </ListItem>
                  )
                }}
              />
            </View>
          )}
        />
    </AppContainer>
   );
}
 
export default AddInfoCar;

const styles = StyleSheet.create({
  titleModal: {
    fontSize: Sizing.text.body[16],
    fontWeight: 'bold',
    marginLeft: 16,
    marginRight: 16,
  },
  itemModal: {
    fontSize: Sizing.text.body[14],
    fontWeight: 'bold',
  }
})
