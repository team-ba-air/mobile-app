import React from 'react'
import { View, StyleSheet, StyleProp, ViewStyle } from 'react-native';
import { Text } from 'react-native-elements';
import { Color } from 'styles/colors';
import { fontPixel, heightPixel, Sizing, widthPixel } from 'styles/sizes';

interface CustomChipsProps {
  text?: string
  style?: StyleProp<ViewStyle>
}
 
const CustomChips: React.FC<CustomChipsProps> = ({ text, style }) => {
  return ( 
    <View style={[styles.authorizedContainer, style]}>
      <Text style={styles.authorizedText}>{text}</Text>
    </View>
   );
}
 
export default CustomChips;

const styles = StyleSheet.create({
  authorizedText: {
    color: Color.gray[0],
    fontSize: fontPixel(Sizing.text.body[8]),
    fontWeight: 'bold',
  },
  authorizedContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Color.blue[8],
    borderRadius: 12,
    paddingHorizontal: widthPixel(8),
    paddingVertical: heightPixel(2)
  },
})