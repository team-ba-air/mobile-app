import React from 'react'
import { FlatList, ListRenderItemInfo, StyleSheet, Text, View } from 'react-native';
import { ListItem } from 'react-native-elements';
import { Sizing } from 'styles/sizes';

interface BrandCarBottomSheetProps {
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

const BrandCarBottomSheet: React.FC<BrandCarBottomSheetProps> = (props) => {
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
 
export default BrandCarBottomSheet;

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
