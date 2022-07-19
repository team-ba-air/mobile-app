import { NavigationProp } from '@react-navigation/native';
import CustomButton from 'components/CustomButton';
import { SCREENS } from 'navigations/constants';
import React, { useState } from 'react'
import { Image, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { Modal, Portal } from 'react-native-paper';
import { useMutation } from 'react-query';
import { ReservationDetailItem } from 'scenes/home/constants';
import UpdateProgressService from 'scenes/home/service/updateProgressService';
import { Color } from 'styles/colors';
import { fontPixel, heightPixel, widthPixel } from 'styles/sizes';
import { getFormatDateNumeric, getFormatHour } from 'utils/DateUtil';
import { formatRupiah } from 'utils/TextUtils';
import ModalFinishConfirmation from './ModalFinishConfirmation';

interface FinishedProgressComponentProps {
  data: ReservationDetailItem
  navigation: NavigationProp<any>
}
 
const FinishedProgressComponent: React.FC<FinishedProgressComponentProps> = ({ data, navigation }) => {
  const [showDetailAdditionalComponent, setShowDetailAdditionalComponent] = useState<boolean>(false)
  const [visible, setVisible] = useState<boolean>(false)

  const totalPriceAdditionalComponent = data.additional_component.reduce((totalAccumulator, component) => totalAccumulator + component.price, 0)

  const additionalComponentListElement = data.additional_component.map((value, idx) => (
    <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', marginTop: heightPixel(4) }}>
      <Text style={{ fontSize: fontPixel(14), fontWeight: '500' }}>{idx + 1}. {value.name}</Text>
      <Text style={{ fontSize: fontPixel(14), fontWeight: '500' }}>{formatRupiah(value.price)}</Text>
    </View>
  ))

  const { isLoading: isUpdatingProgressService, mutateAsync: onUpdateProgressService } = useMutation(UpdateProgressService, {
    onSuccess: (data) => {
      // navigation.navigate(SCREENS.reservation.informasiTagihan)
    },
  })

  const handleConfirm = () => {
    if (data.payment_method) {
      onUpdateProgressService({
        status: 5,
      })
    } else {
      handleDismiss()
      navigation.navigate(SCREENS.reservation.selectPayment, { 
        additionalComponent: data.additional_component,
        status: 5,
      })
    }
  }

  const showModal = () => {
    setVisible(true)
  }

  const handleDismiss = () => {
    setVisible(false)
  }

  return ( 
    <>
      <Portal>
        <Modal visible={visible} onDismiss={handleDismiss}>
          <ModalFinishConfirmation onConfirm={handleConfirm} onCancel={handleDismiss} />
        </Modal>
      </Portal>
      
      <ScrollView>
        <View style={{ backgroundColor: 'white', paddingVertical: heightPixel(20), marginBottom: heightPixel(8) }}>
          <View style={{ 
            borderWidth: 1, 
            borderColor: Color.gray[2], 
            borderRadius: 4, 
            paddingVertical: heightPixel(12), 
            paddingHorizontal: widthPixel(16), 
            marginHorizontal: widthPixel(20),
          }}>
            <Text style={{ fontSize: fontPixel(14), color: Color.gray.secondary }}>Nomor Booking</Text>
            <Text style={{ fontSize: fontPixel(14), fontWeight: 'bold' }}>{data.booking_number}</Text>
          </View>
        </View>
        
        <View style={{ backgroundColor: 'white', paddingHorizontal: widthPixel(20), paddingVertical: heightPixel(20), marginBottom: heightPixel(8) }}>
          <View>
            <Text style={{ fontSize: fontPixel(14), color: Color.gray.secondary }}>Mobil</Text>
            <Text style={{ fontSize: fontPixel(14), fontWeight: 'bold' }}>{data.info_booking.car.type} {data.info_booking.car.license_plate}</Text>
          </View>
          <View style={{ marginTop: 16 }}>
            <Text style={{ fontSize: fontPixel(14), color: Color.gray.secondary }}>Bengkel</Text>
            <Text style={{ fontSize: fontPixel(14), fontWeight: 'bold' }}>{data.info_booking.shop.name}</Text>
          </View>
          <View style={{ marginTop: 16 }}>
            <Text style={{ fontSize: fontPixel(14), color: Color.gray.secondary }}>Servis</Text>
            <Text style={{ fontSize: fontPixel(14), fontWeight: 'bold' }}>{data.info_booking.service.name} - {formatRupiah(data.info_booking.service.price)}</Text>
          </View>
          <View style={{ marginTop: 16 }}>
            <Text style={{ fontSize: fontPixel(14), color: Color.gray.secondary }}>Waktu</Text>
            <Text style={{ fontSize: fontPixel(14), fontWeight: 'bold' }}>{getFormatDateNumeric(data.info_booking.datetime)}</Text>
            <Text style={{ fontSize: fontPixel(14), fontWeight: 'bold' }}>{getFormatHour(data.info_booking.datetime)} WIB</Text>
          </View>
          <View style={{ marginTop: 16 }}>
            <Text style={{ fontSize: fontPixel(14), color: Color.gray.secondary }}>Catatan tambahan</Text>
            <Text style={{ fontSize: fontPixel(14) }}>{data.info_booking.notes !== '' ? data.info_booking.notes : '-'}</Text>
          </View>
        </View>

        <View style={{ backgroundColor: 'white', marginBottom: heightPixel(8), paddingHorizontal: widthPixel(20), paddingVertical: heightPixel(20) }}>
          <View>
            <Text style={{ fontSize: fontPixel(14), color: Color.gray.secondary }}>Biaya Servis Awal</Text>
            <Text style={{ fontSize: fontPixel(14), fontWeight: 'bold' }}>{formatRupiah(data.info_booking.service.price)}</Text>
          </View>

          <View style={{ marginTop: 16 }}>
            <Text style={{ fontSize: fontPixel(14), color: Color.gray.secondary }}>Komponen Tambahan</Text>
            {data.additional_component.length > 0 ? (
              <TouchableOpacity
                onPress={() => setShowDetailAdditionalComponent(!showDetailAdditionalComponent)} 
                style={{ 
                  display: 'flex', 
                  flexDirection: 'row', 
                  alignItems: 'center', 
                  justifyContent: 'space-between',
                  borderBottomWidth: 1,
                  borderBottomColor: Color.gray[4],
                  paddingTop: heightPixel(4),
                  paddingBottom: heightPixel(8),
                  marginBottom: heightPixel(8),
                }}
              >
                <Text style={{ fontSize: fontPixel(14), fontWeight: 'bold' }}>{formatRupiah(totalPriceAdditionalComponent)}</Text>
                <Image source={require('assets/icon/arrow_down.png')}/>
              </TouchableOpacity>
            ) : (
              <Text>-</Text>
            )}
            
            {showDetailAdditionalComponent && (
              additionalComponentListElement
            )}
          </View>

          {data.payment_method && (
            <View style={{ marginTop: 16 }}>
              <Text style={{ fontSize: fontPixel(14), color: Color.gray.secondary }}>Metode Pembayaran</Text>
              <Text style={{ fontSize: fontPixel(14), fontWeight: 'bold' }}>{data.payment_method.name}</Text>
            </View>
          )}
        
          <View style={{ marginTop: 16 }}>
            <Text style={{ fontSize: fontPixel(14), color: Color.gray.secondary }}>Total Bayar</Text>
            <Text style={{ fontSize: fontPixel(14), fontWeight: 'bold' }}>{formatRupiah(data.info_booking.service.price + totalPriceAdditionalComponent)}</Text>
          </View>
        </View>

        <View style={{ backgroundColor: 'white', paddingHorizontal: widthPixel(20), paddingVertical: heightPixel(16), marginBottom: heightPixel(8) }}>
          <Text style={{ fontSize: fontPixel(14), color: Color.gray.secondary }}>Catatan dari Bengkel</Text>
          <Text style={{ fontSize: fontPixel(14), textAlign: 'justify' }}>
            {data.requested_additional_component_notes}
          </Text>
        </View>
      </ScrollView>

      <View style={{
        paddingHorizontal: widthPixel(20),
        paddingVertical: heightPixel(20),
        backgroundColor: 'white',
        borderTopColor: Color.gray[2],
        borderTopWidth: 2,
      }}>
        <CustomButton style={{ marginBottom: heightPixel(8) }} onPress={showModal} type='primary' title={'Konfirmasi Servis Selesai'} />
        <CustomButton onPress={showModal} type='secondary' title={'Hubungi Bengkel'} />
      </View>
    </>
  );
}
 
export default FinishedProgressComponent;