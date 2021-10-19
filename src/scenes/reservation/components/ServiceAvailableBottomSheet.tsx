import React from 'react'
import { ListRenderItemInfo, StyleSheet, View } from 'react-native';
import { ListItem, Text } from 'react-native-elements';
import { FlatList } from 'react-native-gesture-handler';
import { Color } from 'styles/colors';
import { Sizing } from 'styles/sizes';

interface ServiceAvailableBottomSheetProps {
  setVisible: (isVisible: boolean) => void
  onSelect?: (select: string) => void 
}

type ServiceItemOption = {
  name: string
  price: number
  description: string
}

type ServiceOption = {
  service: ServiceItemOption
  value: string
}

const defaultOptions = [
  {
    service: {
      name: 'Service Dasar',
      price: 120000,
      description: 'Service ini mencakup apa saja',
    },
    value: 'Service Dasar',
  },
  {
    service: {
      name: 'Service AC',
      price: 330000,
      description: 'Service ini mencakup AC',
    },
    value: 'Service AC',
  },
  {
    service: {
      name: 'Service Rem',
      price: 200000,
      description: 'Service ini mencakup Rem',
    },
    value: 'Service Rem',
  },
]
 
const ServiceAvailableBottomSheet: React.FC<ServiceAvailableBottomSheetProps> = (props) => {
  const { setVisible, onSelect } = props
  return ( 
    <View>
      <Text style={styles.titleModal}>Pilih servis</Text>
      <FlatList
        keyExtractor={(item, index) => index.toString()}
        data={defaultOptions}
        renderItem={(option: ListRenderItemInfo<ServiceOption>) => {
          return (
            <ListItem bottomDivider onPress={() => {
              console.log('On Pressed')
              onSelect?.(option.item.value)
              setVisible(false)
            }}>
              <View style={{ display: 'flex', flexDirection: 'column' }}>
                <Text style={styles.itemModal}>{option.item.service.name} - {option.item.service.price}</Text>
                <Text style={styles.subtitleModal}>{option.item.service.description}</Text>
              </View>
            </ListItem>
          )
        }}
      />
    </View>
   );
}
 
export default ServiceAvailableBottomSheet;

const styles = StyleSheet.create({
  titleModal: {
    fontSize: Sizing.text.body[16],
    fontWeight: 'bold',
    marginLeft: 16,
    marginRight: 16, 
  },
  itemModal: {
    fontSize: Sizing.text.body[14],
    fontWeight: 'bold',
  },
  subtitleModal: {
    fontSize: Sizing.text.body[14],
    color: Color.gray[8],
  }
})