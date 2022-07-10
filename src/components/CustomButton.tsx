import React from 'react'
import { StyleProp, StyleSheet, StyleSheetProperties, Text, TextStyle, TouchableOpacity, View, ViewStyle } from 'react-native';
import { Button, Icon, SocialIcon } from 'react-native-elements';
import { Color } from 'styles/colors';

interface CustomButtonProps {
  title: string
  onPress?: () => void
  type?: 'primary' | 'secondary'
  disabled?: boolean
  style?: StyleProp<ViewStyle>
  buttonStyle?: StyleProp<any>
  textStyle?: StyleProp<TextStyle>
  icon?: React.ReactNode
}
 
const CustomButton: React.FC<CustomButtonProps> = (props) => {
  const { title, onPress = () => {}, type = 'primary' , disabled = false, style = {}, buttonStyle = {}, textStyle = {}, icon } = props
  const styleType = type === 'primary' ? styles.primary : styles.secondary
  const colorType = type === 'primary' ? styles.colorPrimary : styles.colorSecondary

  return ( 
    // <Button 
    //   disabled={disabled} 
    //   containerStyle={style} 
    //   buttonStyle={[styles.appButtonContainer, styleType, buttonStyle]} 
    //   titleStyle={[styles.appButtonText, colorType, textStyle]}
    //   onPress={onPress} 
    //   title={title} 
    // />
    <View style={[style, {
      opacity: disabled ? 0.6 : 1,
    }]}>
      <TouchableOpacity 
        disabled={disabled} 
        activeOpacity={0.6} 
        onPress={onPress} 
        style={[styles.appButtonContainer, styleType, buttonStyle]}
      >
        {icon}
        <Text style={[styles.appButtonText, colorType, textStyle]}>{title}</Text>
      </TouchableOpacity>
    </View>
  )
}

export default CustomButton

const styles = StyleSheet.create({
  appButtonContainer: {
    display: 'flex',
    flexDirection: 'row',
    borderRadius: 4,
    paddingVertical: 10,
    paddingHorizontal: 12
  },
  appButtonText: {
    flexGrow: 1,
    display: 'flex',
    justifyContent: 'center',
    textAlign: 'center',
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
