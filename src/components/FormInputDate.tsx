import React, { useState } from 'react'
import { Platform, StyleProp, StyleSheet, TouchableOpacity, View, ViewStyle } from 'react-native'
import { Text } from 'react-native-elements'
import { Color } from 'styles/colors'
import { fontPixel, heightPixel, Sizing } from 'styles/sizes'
import { format } from 'date-fns'
import RNDateTimePicker from '@react-native-community/datetimepicker'
import BaseBottomSheet from './BaseBottomSheet'

interface FormInputDateProps {
  value?: Date
  onChange?: (value: Date) => void
  placeholder?: string
  style?: StyleProp<ViewStyle>
  size?: number
  mode?: any
  formatDate?: string
  display?: any
  error?: string
}
 
const FormInputDate: React.FC<FormInputDateProps> = (props) => {
  const { value = new Date(), onChange, placeholder, style, size = 14, mode = 'date', formatDate = 'dd MMMM yyyy', display = 'default', error } = props
  const [open, setOpen] = useState<boolean>(false)
  const [showBottomSheet, setShowBottomSheet] = useState<boolean>(false)

  const stylePlaceholder = value === undefined ? styles.placeholder : styles.value

  const valueText = format(value, formatDate)

  const renderDatePicker = () => {
    return (
      <RNDateTimePicker 
        display={'spinner'}
        mode={mode}
        value={value}
        onChange={(event: any, date: Date | undefined) => {
          const currentDate = date || value;
          if (Platform.OS === 'android') {
            setOpen(false);
          }

          if (event.type === 'neutralButtonPressed') {
            onChange?.(new Date())
          } else {
            onChange?.(currentDate)
          }
        }}
      />
    )
  }

  return ( 
    <View style={{ width: '100%', justifyContent: 'flex-start' }}>
      {(open && Platform.OS === 'android') && (
        renderDatePicker()
      )}
      {(Platform.OS === 'ios') && (
        <BaseBottomSheet visible={showBottomSheet} onChangeVisible={setShowBottomSheet}>
          {renderDatePicker()}
        </BaseBottomSheet>
      )}
      <TouchableOpacity style={[styles.input, style]} activeOpacity={1} onPress={() => {
        if (Platform.OS === 'ios') {
          setShowBottomSheet(true)
        } else {
          setOpen(true)
        }
      }}>
        <Text style={[{ fontSize: size }]}>{valueText}</Text> 
      </TouchableOpacity>
      {error && (
        <Text style={{ color: Color.red[7], fontSize: fontPixel(11), marginTop: heightPixel(4)}}>{error}</Text>
      )}
    </View>
   )
}
 
export default FormInputDate

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
