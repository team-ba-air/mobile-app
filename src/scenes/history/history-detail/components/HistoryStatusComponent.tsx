import React from 'react'
import { View, Text } from 'react-native';
import { LABEL_STATUS } from 'scenes/home/constants';
import { Color } from 'styles/colors';
import { fontPixel, heightPixel, widthPixel } from 'styles/sizes';

interface HistoryStatusComponentProps {
  bookingNumber: string
  status: number
  datetime: Date
}
 
const HistoryStatusComponent: React.FC<HistoryStatusComponentProps> = ({
  bookingNumber,
  status,
  datetime
}) => {
  const time = datetime.getTime()

  const getStatus = (status: number) => {
    if (status > 4) {
      return 'Servis selesai'
    } else if (status > 0){
      return LABEL_STATUS[status]
    } else {
      const dateNow = new Date()
      dateNow.setHours(dateNow.getHours() + 7)
      const timeDiff = time - dateNow.getTime()
      
      const dayDiff = Math.ceil(timeDiff / (1000 * 3600 * 24))

      if (dayDiff > 1) {
        return `${dayDiff} hari lagi menuju servis`
      } else {
        return 'Menunggu Mobil Sampai di Bengkel'
      }
    }
  }
  return ( 
    <View style={{ backgroundColor: 'white', paddingHorizontal: widthPixel(20), paddingVertical: heightPixel(16), marginVertical: heightPixel(8) }}>
      <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
        <View>
          <Text style={{ fontSize: fontPixel(14), color: Color.gray.secondary }}>Nomor Booking</Text>
          <Text style={{ fontSize: fontPixel(14), fontWeight: 'bold' }}>{bookingNumber}</Text>
        </View>

        {/* <View>
          <Text style={{ fontSize: fontPixel(11), color: Color.blue[8], fontWeight: 'bold' }}>Lihat Invoice</Text>
        </View> */}
      </View>
      
      <View style={{ marginTop: heightPixel(8) }}>
        <Text style={{ fontSize: fontPixel(14), color: Color.gray.secondary }}>Status</Text>
        <Text style={{ fontSize: fontPixel(14), fontWeight: 'bold' }}>{getStatus(status)}</Text>
      </View>
    </View>
  );
}
 
export default HistoryStatusComponent;