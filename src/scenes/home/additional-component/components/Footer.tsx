import { useNavigation } from '@react-navigation/native';
import CustomButton from 'components/CustomButton';
import { SCREENS } from 'navigations/constants';
import React from 'react'
import { StyleSheet, View } from 'react-native';
import { Text } from 'react-native-elements';
import { AdditionalComponentSelectionItem } from 'scenes/home/constants';
import { Color } from 'styles/colors';
import { Sizing } from 'styles/sizes';
import { formatRupiah } from 'utils/TextUtils';

interface FooterProps {
  navigation: any
  data: AdditionalComponentSelectionItem[]
}
 
const Footer: React.FC<FooterProps> = ({ navigation, data }) => {
  const totalPrice = data.reduce((priceAccumulator, item) => priceAccumulator + item.price, 0)
  return ( 
    <View style={styles.container}>
      <View>
        <Text style={styles.title}>Biaya Tambahan</Text>
        <Text style={styles.content}>{formatRupiah(totalPrice)}</Text>
      </View>
      <View>
        <CustomButton onPress={() => navigation.navigate(SCREENS.reservation.selectPayment)} buttonStyle={{ paddingLeft: 36, paddingRight: 36 }} title='Bayar' />
      </View>
    </View>
  );
}
 
export default Footer;

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