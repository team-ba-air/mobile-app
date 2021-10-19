import CustomTextInput from 'components/CustomTextInput';
import Dropdown from 'components/Dropdown';
import React, { useState } from 'react'
import { ListRenderItemInfo, StyleSheet, View } from 'react-native';
import { Text } from 'react-native-elements';
import { FlatList } from 'react-native-gesture-handler';
import { Sizing } from 'styles/sizes';
import ServiceAvailableBottomSheet from './ServiceAvailableBottomSheet';
import UserCarBottomSheet from './UserCarBottomSheet';

interface ReservationFormProps {
  
}
 
const ReservationForm: React.FC<ReservationFormProps> = () => {
  const [carVisible, setCarVisible] = useState<boolean>(false)
  const [car, setCar] = useState('Toyota')

  const [serviceVisible, setServiceVisible] = useState<boolean>(false)
  const [service, setService] = useState('Service Dasar')

  const [notes, setNotes] = useState<string>('')

  return ( 
    <View style={{ marginTop: 20 }}>
      <Text style={{ fontSize: Sizing.text.body[16], fontWeight: 'bold' }}>Reservasi Servis</Text>

      <Dropdown style={styles.margin} value={car} onChangeVisible={setCarVisible} visible={carVisible}
        modal={(
          <UserCarBottomSheet setVisible={setCarVisible} onSelect={setCar} />
        )}
      />

      <Text style={{ fontSize: Sizing.text.body[14], marginTop: 16 }}>Hari ini</Text>

      <FlatList
        data={[]}
        renderItem={(info: ListRenderItemInfo<number>) => (
          <View>
          </View>
        )}
      />

      <Dropdown style={styles.margin} value={service} onChangeVisible={setServiceVisible} visible={serviceVisible}
        modal={(
          <ServiceAvailableBottomSheet setVisible={setServiceVisible} onSelect={setService} />
        )}
      />

      <Text style={{ fontSize: Sizing.text.body[14], marginTop: 16 }}>Catatan</Text>
      <CustomTextInput style={styles.margin} value={notes} onChange={setNotes} placeholder={'Misal: AC suka bunyi kalau baru nyala, rem berdecit'} multiline={true} lines={4} />
    </View>
  );
}
 
export default ReservationForm;

const styles = StyleSheet.create({
  margin: {
    marginTop: 16,
  },
})