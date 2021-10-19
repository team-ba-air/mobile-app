import React from 'react'
import { ListRenderItemInfo, StyleSheet, View } from 'react-native';
import { ListItem, Text } from 'react-native-elements';
import { FlatList } from 'react-native-gesture-handler';
import { Sizing } from 'styles/sizes';

interface UserCarBottomSheetProps {
  setVisible: (isVisible: boolean) => void
  onSelect?: (select: string) => void 
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
    label: 'Honda',
    value: 'Honda',
  },
]
 
const UserCarBottomSheet: React.FC<UserCarBottomSheetProps> = (props) => {
  const { setVisible, onSelect } = props
  return ( 
    <View>
      <Text style={styles.titleModal}>Pilih merek mobil Anda</Text>
      <FlatList
        keyExtractor={(item, index) => index.toString()}
        data={defaultOptions}
        renderItem={(option: ListRenderItemInfo<any>) => {
          return (
            <ListItem bottomDivider onPress={() => {
              console.log('On Pressed')
              onSelect?.(option.item.value)
              setVisible(false)
            }}>
              <Text style={styles.itemModal}>{option.item.label}</Text>
            </ListItem>
          )
        }}
      />
    </View>
   );
}
 
export default UserCarBottomSheet;

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