import React, { JSXElementConstructor, ReactElement, ReactNode, useEffect, useState } from 'react'
import { Image, ListRenderItemInfo, StyleProp, StyleSheet, Text, View } from 'react-native';
import { ListItem } from 'react-native-elements';
import { FlatList, TouchableHighlight, TouchableOpacity } from 'react-native-gesture-handler';
import { Color } from 'styles/colors';
import { Sizing } from 'styles/sizes';
import BaseBottomSheet from './base/BaseBottomSheet';

export type OptionItem = {
  data: any
  value: string
}

interface DropdownProps {
  value?: string
  onSelect?: (value: string) => void
  placeholder?: string
  size?: number
  style?: StyleProp<any>
  headerComponent?: React.ReactNode
  footerComponent?: React.ReactNode
  options: OptionItem[]
  renderItem: (option: any) => React.ReactNode
  renderSelected: (option: any) => React.ReactNode
}

const Dropdown: React.FC<DropdownProps> = (props) => {
  const { value = '', onSelect, placeholder, size = 16, style, headerComponent, options = [], footerComponent, renderItem, renderSelected } = props
  const stylePlaceholder = value === '' ? styles.placeholder : styles.value

  const [selected, setSelected] = useState<OptionItem | undefined>(undefined)

  useEffect(() => {
    const optionSelected = options.find(option => option.value === value)
    setSelected(optionSelected)
  }, [value])

  const [visible, setVisible] = useState<boolean>(false)

  return ( 
    <>
      <BaseBottomSheet onChangeVisible={setVisible} visible={visible}>
        <View>
          {/* <Text style={styles.titleModal}>Pilih merek mobil Anda</Text> */}
          {headerComponent}
          <FlatList
            keyExtractor={(item, index) => index.toString()}
            data={options}
            renderItem={(option: ListRenderItemInfo<any>) => {
              return (
                <ListItem bottomDivider onPress={() => {
                  console.log('On Pressed')
                  if (option.item.value !== value) {
                    onSelect?.(option.item.value)
                    setSelected(option.item.data)
                  }
                  setVisible(false)
                }}>
                  {renderItem(option.item.data)}
                </ListItem>
              )
            }}
          />
          {footerComponent}
        </View>
      </BaseBottomSheet>
      <TouchableOpacity activeOpacity={1} onPress={() => setVisible(true)}>
        <View style={[styles.input, style, { fontSize: size }]}>
          {selected === undefined ? (
            <Text style={[{ fontSize: size }, stylePlaceholder]}>{placeholder}</Text>
          ) : (
            renderSelected(selected.data)
          )}  
          <Image source={require('assets/icon/arrow_down.png')} />
        </View>
      </TouchableOpacity>
    </>
  );
}
 
export default Dropdown;

const styles = StyleSheet.create({
  input: {
    backgroundColor: '#F8FAFD',
    borderWidth: 1,
    borderStyle: 'solid',
    borderColor: '#E7ECF3',
    borderRadius: 8,
    paddingLeft: 16,
    paddingRight: 16,
    paddingTop: 16,
    paddingBottom: 16,
    display: 'flex',
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
  },
  placeholder: {
    color: Color.gray.secondary,
  },
  value: {
    color: Color.gray.primary,
  },
  title: {
    fontSize: Sizing.text.body[16],
    fontWeight: 'bold',
  }
})