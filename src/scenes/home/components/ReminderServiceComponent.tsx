import CustomButton from 'components/CustomButton';
import React from 'react'
import { Text, View } from 'react-native';
import { Icon } from 'react-native-elements';
import { Color } from 'styles/colors';
import { fontPixel, heightPixel, widthPixel } from 'styles/sizes';

interface ReminderServiceComponentProps {
  
}
 
const ReminderServiceComponent: React.FC<ReminderServiceComponentProps> = () => {
  return ( 
    <View style={{
      borderRadius: 8,
      borderColor: Color.gray[2],
      borderWidth: 1,
      marginTop: heightPixel(20),
      marginHorizontal: widthPixel(20),
      paddingRight: widthPixel(16),
      flexDirection: 'row',
    }}>
      <View style={{ 
        backgroundColor: Color.red[5], 
        width: 10,
        borderTopLeftRadius: 8,
        borderBottomLeftRadius: 8, 
        marginRight: widthPixel(16),
      }} />

      <View style={{ paddingVertical: heightPixel(12), flex: 1 }}>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
          <Text style={{ fontSize: fontPixel(14), fontWeight: 'bold' }}>Pengingat Servis</Text>
          <Icon type='material' name='close' size={heightPixel(12)} tvParallaxProperties={undefined} />
        </View>
        
        <Text style={{ fontSize: fontPixel(10), fontWeight: 'bold', color: Color.gray.secondary }}>Toyota Yaris B 2277 S</Text>

        <View style={{ 
          flexDirection: 'row', 
          justifyContent: 'space-between', 
          alignItems: 'center',
          marginTop: heightPixel(8),
        }}>
          <View style={{ marginRight: widthPixel(8), maxWidth: '60%' }}>
            <Text style={{ fontSize: fontPixel(10) }}>
              <Text>Rekomendasi servis:</Text> 
              <Text style={{ fontWeight: 'bold' }}> 24 Juni</Text>
            </Text>
            <Text style={{ fontSize: fontPixel(10), color: Color.gray.secondary }}>Kamu terakhir servis 5 bulan yang lalu</Text>
          </View>

          <View>
            <CustomButton 
              type='primary' 
              title='Booking' 
              textStyle={{ fontSize: fontPixel(12) }} 
              buttonStyle={{ 
                paddingVertical: heightPixel(4), 
                paddingHorizontal: widthPixel(24), 
                borderRadius: 8,
              }} 
            />
          </View>
        </View>
      </View>
      
    </View>
  );
}
 
export default ReminderServiceComponent;