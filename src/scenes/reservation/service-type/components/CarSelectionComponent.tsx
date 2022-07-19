import BaseBottomSheet from 'components/BaseBottomSheet';
import { OptionItem } from 'components/Dropdown';
import React, { useEffect, useState } from 'react'
import { Image, View, Text, FlatList, TouchableOpacity, ListRenderItemInfo, StyleSheet, StyleProp } from 'react-native';
import { Icon, ListItem } from 'react-native-elements';
import { Color } from 'styles/colors';
import { fontPixel, heightPixel } from 'styles/sizes';

interface CarSelectionComponentProps {
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
  error?: string
}
 
const CarSelectionComponent: React.FC<CarSelectionComponentProps> = (props) => {
  const { value = '', onSelect, placeholder, size = 16, style, headerComponent, options = [], footerComponent, renderItem, renderSelected, error } = props
  const stylePlaceholder = value === '' ? styles.placeholder : styles.value

  const [selected, setSelected] = useState<OptionItem | undefined>(undefined)

  useEffect(() => {
    const optionSelected = options.find((option: OptionItem) => option.value === value)
    setSelected(optionSelected)
  }, [value])

  const [visible, setVisible] = useState<boolean>(false)

  return ( 
    <>
      <BaseBottomSheet onChangeVisible={setVisible} visible={visible}>
        <View>
          {headerComponent}
          <FlatList
            keyExtractor={(item, index) => index.toString()}
            data={options}
            renderItem={(option: ListRenderItemInfo<any>) => {
              return (
                <ListItem bottomDivider onPress={() => {
                  console.log('On Pressed');
                  if (option.item.value !== value) {
                    onSelect?.(option.item.value);
                    setSelected(option.item.data);
                  }
                  setVisible(false);
                } } hasTVPreferredFocus={undefined} tvParallaxProperties={undefined}>
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
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Text style={{ fontSize: fontPixel(12), color: Color.gray[9] }}>Mobil yang ingin diservis</Text>
            <Icon type='material' name='keyboard-arrow-down' color={Color.red[7]} tvParallaxProperties={undefined}/>
          </View>
          {selected === undefined ? (
            <Text style={[{ fontSize: size }, stylePlaceholder]}>{placeholder}</Text>
          ) : (
            renderSelected(selected.data)
          )}  
        </View>
      </TouchableOpacity>
      {error && (
        <Text style={{ color: Color.red[7], fontSize: fontPixel(11), marginTop: heightPixel(4)}}>{error}</Text>
      )}
    </>
  );
}
 
export default CarSelectionComponent;

const styles = StyleSheet.create({
  input: {
    // backgroundColor: '#F8FAFD',
    // borderWidth: 1,
    // borderStyle: 'solid',
    // borderColor: '#E7ECF3',
    // borderRadius: 8,
    // paddingLeft: 16,
    // paddingRight: 16,
    // paddingTop: 16,
    // paddingBottom: 16,
    // display: 'flex',
    // justifyContent: 'space-between',
    // flexDirection: 'row',
    // alignItems: 'center',
  },
  placeholder: {
    color: Color.gray.secondary,
  },
  value: {
    color: Color.gray.primary,
  },
  title: {
    fontSize: fontPixel(16),
    fontWeight: 'bold',
  }
})