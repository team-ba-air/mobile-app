import React from 'react'
import { View, StyleSheet } from 'react-native';
import { Text } from 'react-native-elements';
import { Color } from 'styles/colors';
import { fontPixel, Sizing } from 'styles/sizes';

interface AuthorizedChipsProps {
  
}
 
const AuthorizedChips: React.FC<AuthorizedChipsProps> = () => {
  return ( 
    <View style={styles.authorizedContainer}>
      <Text style={styles.authorizedText}>Authorized</Text>
    </View>
   );
}
 
export default AuthorizedChips;

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
    backgroundColor: Color.red[7],
    borderRadius: 12,
    paddingLeft: 8,
    paddingRight: 8,
  },
})