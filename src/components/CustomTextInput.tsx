import React from 'react'
import { StyleProp, StyleSheet, View } from 'react-native'
import { TextInput } from 'react-native-gesture-handler'

interface CustomTextInputProps {
  value: string
  onChange: (input: string) => void
  placeholder?: string
  size?: number
  style?: StyleProp<any>
}
 
const CustomTextInput: React.FC<CustomTextInputProps> = (props) => {
  const { value, onChange, placeholder, size = 16, style } = props
  return ( 
    <View style={{...styles.input, ...style}}>
      <TextInput style={{ fontSize: size }} placeholder={placeholder} onChangeText={onChange} value={value} />
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
