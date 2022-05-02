import { NavigationProp } from '@react-navigation/native';
import CustomButton from 'components/CustomButton';
import { SCREENS } from 'navigations/constants';
import React from 'react'
import { Text, View } from 'react-native';
import { Color } from 'styles/colors';
import { fontPixel, heightPixel } from 'styles/sizes';

interface ProgressStatusProps {
  navigation: NavigationProp<any>
}
 
const ProgressStatus: React.FC<ProgressStatusProps> = ({ navigation }) => {
  return ( 
    <View>
      <Text style={{ fontSize: fontPixel(14), color: Color.gray.secondary }}>Status</Text>
      <Text style={{ fontSize: fontPixel(14), fontWeight: 'bold', marginBottom: heightPixel(16) }}>{'5 hari lagi'}</Text>

      <Text style={{ fontSize: fontPixel(14), color: Color.gray.secondary }}>Service Assistant</Text>
      <Text style={{ fontSize: fontPixel(14), fontWeight: 'bold', marginBottom: heightPixel(16) }}>{'Michael Hans'}</Text>

      <Text style={{ fontSize: fontPixel(14), color: Color.gray.secondary }}>Komponen Tambahan</Text>
      <Text style={{ fontSize: fontPixel(14), fontWeight: 'bold', marginBottom: heightPixel(16) }}>{'-'}</Text>

      <CustomButton title='Komponen Tambahan' type='primary' onPress={() => navigation.navigate(SCREENS.reservation.additionalComponent)} />
    </View>
  );
}
 
export default ProgressStatus;