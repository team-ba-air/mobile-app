import React from 'react'
import { Platform, StyleProp, StyleSheet, Text, TextInput, View } from 'react-native'
import { Input } from 'react-native-elements'
import { Color } from 'styles/colors'
import { fontPixel, heightPixel } from 'styles/sizes'

interface CustomTextInputProps {
  value?: string
  onChange: (input: string) => void
  placeholder?: string
  size?: number
  style?: StyleProp<any>
  multiline?: boolean
  lines?: number
  error?: string
}
 
const CustomTextInput: React.FC<CustomTextInputProps> = (props) => {
  const { value, onChange, placeholder, size = 16, style, multiline = false, lines, error } = props

  return ( 
    <>
      <View style={[
        styles.input, 
        style, 
        (Platform.OS === 'ios') && ({
          paddingVertical: heightPixel(12),
        })]}
      >
        <TextInput 
          style={{ fontSize: size }} 
          textAlignVertical={'top'} 
          maxLength={240} 
          multiline={multiline} 
          numberOfLines={lines} 
          placeholder={placeholder} 
          onChangeText={onChange} 
          value={value} />
      </View>
      {error && (
        <Text style={{ color: Color.red[7], fontSize: fontPixel(11), marginTop: heightPixel(4)}}>{error}</Text>
      )}
    </>
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
