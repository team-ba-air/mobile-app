import { format } from 'date-fns';
import React from 'react'
import { Text, View } from 'react-native';
import { ServiceInfo, ShopInfo, VehicleInfo } from 'scenes/home/constants';
import { Color } from 'styles/colors';
import { fontPixel, heightPixel, widthPixel } from 'styles/sizes';
import { getFormatHour } from 'utils/DateUtil';

interface InfoServiceComponentProps {
  car?: VehicleInfo
  shop?: ShopInfo
  service?: ServiceInfo
  notes: string
  datetime: Date
}
 
const InfoServiceComponent: React.FC<InfoServiceComponentProps> = ({ car, shop, service, notes, datetime }) => {
  return ( 
    <View style={{ backgroundColor: 'white', paddingHorizontal: widthPixel(20), paddingVertical: heightPixel(16), marginBottom: heightPixel(8) }}>
      <View style={{ paddingVertical: heightPixel(16), paddingHorizontal: widthPixel(16), borderWidth: 2, borderRadius: 8, borderColor: Color.gray[2] }}>
        <Text style={{ fontSize: fontPixel(10), color: Color.gray.secondary, fontWeight: 'bold' }}>{shop?.name}</Text>
        <Text style={{ fontSize: fontPixel(14), fontWeight: 'bold' }}>{service?.name} - {car?.type} {car?.license_plate}</Text>


        <View style={{ borderBottomWidth: 1, borderBottomColor: Color.gray[1], paddingBottom: heightPixel(8), marginBottom: heightPixel(8) }}>
          {notes !== '' && (
            <Text style={{ fontSize: fontPixel(10), color: Color.gray.secondary, fontStyle: 'italic', marginTop: heightPixel(4) }}>
              {notes}
            </Text>
          )}
        </View>
        

        <Text style={{ fontSize: fontPixel(10), color: Color.gray.secondary }}>Waktu Reservasi</Text>
        <Text style={{ fontSize: fontPixel(12) }}>{format(datetime, 'eeee, dd MMMM yyyy')} {getFormatHour(datetime)} WIB</Text>
      </View>
    </View>
  );
}
 
export default InfoServiceComponent;