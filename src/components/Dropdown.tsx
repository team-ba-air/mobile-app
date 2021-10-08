import React, { JSXElementConstructor, ReactElement, ReactNode, useState } from 'react'
import { Image, ListRenderItemInfo, StyleProp, StyleSheet, Text, View } from 'react-native';
import { FlatList, TouchableHighlight, TouchableOpacity } from 'react-native-gesture-handler';
import { Color } from 'styles/colors';
import { Sizing } from 'styles/sizes';
import BaseBottomSheet from './base/BaseBottomSheet';

interface DropdownProps {
  value?: string
  placeholder?: string
  size?: number
  style?: StyleProp<any>
  visible: boolean
  onChangeVisible?: (isVisible: boolean) => void
  modal: ReactNode
}
 
const Dropdown: React.FC<DropdownProps> = (props) => {
  const { value = '', placeholder, size = 16, style, onChangeVisible, visible, modal } = props
  const stylePlaceholder = value === '' ? styles.placeholder : styles.value

  return ( 
    <>
      <BaseBottomSheet onChangeVisible={onChangeVisible} visible={visible}>
        {modal}
      </BaseBottomSheet>
      <TouchableOpacity activeOpacity={1} onPress={() => onChangeVisible?.(true)}>
        <View style={[styles.input, style]}>
          <Text style={[{ fontSize: size }, stylePlaceholder]}>{value === '' ? placeholder : value}</Text>
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