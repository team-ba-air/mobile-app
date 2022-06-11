import { NavigationProp } from '@react-navigation/native';
import AppContainer from 'components/AppContainer';
import React, { useState } from 'react'
import { Text, View } from 'react-native';
import { Color } from 'styles/colors';
import { fontPixel, heightPixel, widthPixel } from 'styles/sizes';
import BookingDetail from './components/BookingDetail';
import ProgressStatus from './components/ProgressStatus';
import ServiceStatusStepIndicator from './components/ServiceStatusStepIndicator';
import TabProgress from './components/TabProgress';

interface ProgressServiceScreenProps {
  navigation: NavigationProp<any>
}
 
const ProgressServiceScreen: React.FC<ProgressServiceScreenProps> = ({ navigation }) => {
  const [index, setIndex] = useState(0);
  return ( 
    <AppContainer style={{ paddingHorizontal: 0 }}>
      <View style={{ borderWidth: 1, borderColor: Color.gray[2], borderRadius: 4, paddingVertical: heightPixel(12), paddingHorizontal: widthPixel(16), marginHorizontal: widthPixel(16) }}>
        <Text style={{ fontSize: fontPixel(14), color: Color.gray.secondary }}>Nomor Booking</Text>
        <Text style={{ fontSize: fontPixel(14), fontWeight: 'bold' }}>{'1232132ASDASD'}</Text>
      </View>
      <TabProgress index={index} setIndex={setIndex}/>
      <View style={{ paddingHorizontal: widthPixel(20) }}>
          {index === 0 ?
          (
            <ProgressStatus navigation={navigation} />
          ) : 
            <BookingDetail />
          }
        </View>
    </AppContainer>
  );
}
 
export default ProgressServiceScreen;