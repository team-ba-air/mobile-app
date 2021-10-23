import { useNavigation } from '@react-navigation/native';
import CustomButton from 'components/CustomButton';
import { SCREENS } from 'navigations/constants';
import React from 'react'
import { StyleSheet, View } from 'react-native';
import { Text } from 'react-native-elements';
import { Color } from 'styles/colors';
import { Sizing } from 'styles/sizes';

interface FooterCheckoutProps {
  navigation: any
}
 
const FooterCheckout: React.FC<FooterCheckoutProps> = ({ navigation }) => {
  return ( 
    <View style={styles.container}>
      <View>
        <Text style={styles.title}>Estimasi Biaya</Text>
        <Text style={styles.content}>Rp100.000</Text>
      </View>
      <View>
        <CustomButton onPress={() => navigation.navigate(SCREENS.reservation.success)} buttonStyle={{ paddingLeft: 36, paddingRight: 36 }} title='Bayar' />
      </View>
    </View>
  );
}
 
export default FooterCheckout;

const styles = StyleSheet.create({
  container: {
    padding: 16,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    elevation: 24,
    backgroundColor: Color.gray[0],
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 12,
    },
    shadowOpacity: 0.58,
    shadowRadius: 16,
  },
  title: {
    fontSize: Sizing.text.body[14],
    color: Color.gray[8],
  },
  content: {
    fontSize: Sizing.text.body[16],
    fontWeight: 'bold',
  }
})