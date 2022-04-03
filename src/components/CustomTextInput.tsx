import React from 'react'
import { StyleProp, StyleSheet, TextInput, View } from 'react-native'
import { Input } from 'react-native-elements'

interface CustomTextInputProps {
  value?: string
  onChange: (input: string) => void
  placeholder?: string
  size?: number
  style?: StyleProp<any>
  multiline?: boolean
  lines?: number
}
 
const CustomTextInput: React.FC<CustomTextInputProps> = (props) => {
  const { value, onChange, placeholder, size = 16, style, multiline = false, lines } = props

  return ( 
    <View style={{...styles.input, ...style}}>
      <TextInput style={{ fontSize: size }} textAlignVertical={'top'} maxLength={240} multiline={multiline} numberOfLines={lines} placeholder={placeholder} onChangeText={onChange} value={value} />
    </View>
   )
}
 
export default CustomTextInput

const styles = StyleSheet.create({
  input: {
    backgroundColor: '#F8FAFD',
    borderWidth: 1,
    borderStyle: 'solid',
    borderColor: '#E7ECF3',
    borderRadius: 8,
    paddingLeft: 16,
    paddingRight: 16,
  }
})
