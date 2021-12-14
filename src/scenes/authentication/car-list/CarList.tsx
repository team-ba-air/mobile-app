import AppContainer from 'components/AppContainer';
import CustomButton from 'components/CustomButton';
import { SCREENS } from 'navigations/constants';
import React from 'react'
import { FlatList, StyleSheet, Text, View } from 'react-native';
import { ListItem } from 'react-native-elements';
import { Sizing } from 'styles/sizes';

interface CarListProps {
  navigation: any
}

const defaultValues = [
  {
    brand: 'Toyota',
    type: 'Yaris',
    year: '2012',
    plat: 'B 2000 S'
  }
]

const CarList: React.FC<CarListProps> = ({ navigation }) => {
  return ( 
    <AppContainer style={styles.container}>
      <FlatList
        data={defaultValues}
        renderItem={(car) => (
          <ListItem bottomDivider>
            <ListItem.Content>
              <ListItem.Title style={styles.title}>
                <Text>{car.item.brand} {car.item.type}</Text>
              </ListItem.Title>
              <ListItem.Subtitle style={styles.subtitle}>
                <Text>{car.item.year}</Text>
              </ListItem.Subtitle>
              <ListItem.Subtitle style={styles.subtitle}>
                <Text>{car.item.plat}</Text>
              </ListItem.Subtitle>
            </ListItem.Content>
          </ListItem>
        )}
      />

      <View>
        <CustomButton onPress={() => navigation.navigate(SCREENS.onboarding.addInfoCar)} title={'Tambah Info Mobil'} />
        <CustomButton onPress={() => navigation.navigate(SCREENS.app.home)} style={styles.buttonLater} type='secondary' title={'Nanti Dulu'} />
      </View>
    </AppContainer>
  );
}
 
export default CarList;
const styles = StyleSheet.create({
  title: {
    fontSize: Sizing.text.body[14],
    fontWeight: 'bold',
  },
  subtitle: {
    fontSize: Sizing.text.body[14],
    display: 'flex',
    flexDirection: 'column'
  },
  container: {
    display: 'flex',
    justifyContent: 'space-between'
  },
  buttonLater: {
    marginTop: 8,
  },
})