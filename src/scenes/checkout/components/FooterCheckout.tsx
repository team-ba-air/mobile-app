import { useNavigation } from '@react-navigation/native';
import CustomButton from 'components/CustomButton';
import { SCREENS } from 'navigations/constants';
import React, { useState } from 'react'
import { StyleSheet, View } from 'react-native';
import { Icon, Text } from 'react-native-elements';
import { Color } from 'styles/colors';
import { Sizing } from 'styles/sizes';
import BottomSheetPriceEstimation from './BottomSheetPriceEstimation';

interface FooterCheckoutProps {
  onSubmit: () => void
}
 
const FooterCheckout: React.FC<FooterCheckoutProps> = ({ onSubmit }) => {
  const [show, setShow] = useState(false)

  return ( 
    <View style={styles.container}>
      <View>
        <View>
          <Text style={styles.title}>Estimasi Biaya</Text>
          <Icon 
            type='material' 
            name='info' 
            tvParallaxProperties={undefined} 
            color={Color.gray[3]} 
            size={16} 
            onPress={() => setShow(true)}
          />
        </View>
        
        <Text style={styles.content}>Rp100.000</Text>
      </View>
      <View>
        <CustomButton onPress={onSubmit} buttonStyle={{ paddingLeft: 36, paddingRight: 36 }} title='Bayar' />
      </View>

      <BottomSheetPriceEstimation visible={show} onChangeVisible={setShow} />
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