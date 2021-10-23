import React from 'react'
import { GestureResponderEvent, StyleSheet, StyleSheetProperties, Text, Touchable, View } from 'react-native';
import { Button } from 'react-native-elements';
import { TouchableHighlight, TouchableOpacity } from 'react-native-gesture-handler';
import { Color } from 'styles/colors';

interface CustomButtonProps {
  title: string
  onPress?: () => void
  type?: string
  disabled?: boolean
  style?: any
  buttonStyle?: any
}
 
const CustomButton: React.FC<CustomButtonProps> = (props) => {
  const { title, onPress = () => {}, type = 'primary' , disabled = false, style = {}, buttonStyle = {} } = props
  const styleType = type === 'primary' ? styles.primary : styles.secondary
  const colorType = type === 'primary' ? styles.colorPrimary : styles.colorSecondary

  return ( 
    <Button disabled={disabled} containerStyle={style} buttonStyle={[styles.appButtonContainer, styleType, buttonStyle]} titleStyle={[styles.appButtonText, colorType]} onPress={onPress} title={title} />
  )
}

export default CustomButton

const styles = StyleSheet.create({
  appButtonContainer: {
    borderRadius: 4,
    paddingVertical: 10,
    paddingHorizontal: 12
  },
  appButtonText: {
    fontSize: 18,
    color: "#ffffff",
    fontWeight: "bold",
    alignSelf: "center",
  },
  primary: {
    backgroundColor: Color.blue[8],
  },
  colorPrimary: {
    color: Color.gray[0],
    fontWeight: 'bold',
    opacity: 1,
  },
  secondary: {
    backgroundColor: Color.gray[3],
  },
  colorSecondary: {
    color: Color.gray.primary,
    fontWeight: 'bold',
  },
  disabled: {
    opacity: 0.48,
  }
})
