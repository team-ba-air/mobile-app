import { NavigationProp } from '@react-navigation/native';
import CustomButton from 'components/CustomButton';
import { SCREENS } from 'navigations/constants';
import React, { useState } from 'react'
import { ScrollView, Text, View } from 'react-native';
import { Icon } from 'react-native-elements';
import { ReservationDetailItem } from 'scenes/home/constants';
import { Color } from 'styles/colors';
import { fontPixel, heightPixel, widthPixel } from 'styles/sizes';
import AdditionalComponentButton from './AdditionalComponentButton';
import BottomSheetAdditionalComponent from './BottomSheetAdditionalComponent';
import ServiceStatusStepIndicator from './ServiceStatusStepIndicator';

interface ProgressStatusProps {
  data: ReservationDetailItem
  navigation: NavigationProp<any>
}
 
const ProgressStatus: React.FC<ProgressStatusProps> = ({ data, navigation }) => {
  const dateNow = new Date().getDate()
  const dateDiff = data.info_booking.datetime.getDate() - dateNow

  const [show, setShow] = useState(false)

  const additionalComponentListElement = data.additional_component.map((value, idx) => (
    <Text style={{ fontWeight: 'bold' }}>{idx + 1}. {value.name}</Text>
  ))
  return ( 
    <>
      <ScrollView contentContainerStyle={{ paddingHorizontal: widthPixel(20), marginTop: heightPixel(8), display: 'flex', justifyContent: 'space-between', overflow: 'scroll' }}>
        <View>
          {data.status > 0 && (
            <>
              <Text style={{ fontSize: fontPixel(14), color: Color.gray.secondary }}>Service Assistant</Text>
              <Text style={{ fontSize: fontPixel(14), fontWeight: 'bold', marginBottom: heightPixel(16) }}>
                {data.service_assistant ? data.service_assistant : '-'}
              </Text>

              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Text style={{ fontSize: fontPixel(14), color: Color.gray.secondary, marginRight: widthPixel(4) }}>Komponen Tambahan</Text>
                <Icon 
                  type='material' 
                  name='info' 
                  tvParallaxProperties={undefined} 
                  color={Color.gray[3]} 
                  size={16} 
                  onPress={() => setShow(true)}
                />
              </View>
              {data.additional_component.length === 0 ? (
                data.requested_additional_component.length > 0 ? (
                  <AdditionalComponentButton onPress={() => navigation.navigate(SCREENS.reservation.additionalComponent)} />
                ) : (
                  <Text style={{ fontSize: fontPixel(14), fontWeight: 'bold', marginBottom: heightPixel(16) }}>{'-'}</Text>
                )
              ) : (
                additionalComponentListElement
              )}
            </>
          )}

          
          <Text style={{ fontSize: fontPixel(14), color: Color.gray.secondary, marginTop: heightPixel(12) }}>Status Servis</Text>
          {data.status === 0 ? (
            <Text style={{ fontSize: fontPixel(14), fontWeight: 'bold', marginBottom: heightPixel(16) }}>
              {dateDiff > 0 ? `${dateDiff} hari lagi menuju servis` : 'Menunggu mobil sampai di bengkel'}
            </Text>
          ): (
            <ServiceStatusStepIndicator progressTime={data.progress} currentPosition={data.status} />
          )}
        </View>
        
      </ScrollView>

      <BottomSheetAdditionalComponent visible={show} onChangeVisible={setShow} />

      <CustomButton style={{ paddingHorizontal: widthPixel(20), marginTop: heightPixel(16) }} type='primary' title='Hubungi Bengkel' />
    </>
    
  );
}
 
export default ProgressStatus;