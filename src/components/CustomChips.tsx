import React from 'react'
import { View, StyleSheet } from 'react-native';
import { Text } from 'react-native-elements';
import { Color } from 'styles/colors';
import { fontPixel, Sizing } from 'styles/sizes';

interface CustomChipsProps {
  text?: string
}
 
const CustomChips: React.FC<CustomChipsProps> = ({ text }) => {
  return ( 
    <View style={styles.authorizedContainer}>
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
    paddingLeft: 8,
    paddingRight: 8,
  },
})