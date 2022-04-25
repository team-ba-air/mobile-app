import AppContainer from 'components/AppContainer';
import React from 'react'
import { Text, View } from 'react-native';

interface AdditionalComponentScreenProps {
    
}

const dummyData = [
  {
    component: 'V-Belt',
    price: 250000,
    priority: 2,
  },
  {
    component: 'Kampas Rem',
    price: 180000,
    priority: 2,
  },
  {
    component: 'Filter',
    price: 150000,
    priority: 1,
  },
]
 
const AdditionalComponentScreen: React.FC<AdditionalComponentScreenProps> = () => {
  return (  
    <AppContainer>
      <Text>Setelah diagnosis lebih lanjut oleh bengkel, terdapat beberapa komponen yang perlu diganti. Hanya komponen yang Anda centang yang akan diganti.</Text>

      <View>
        <Text>Kebutuhan Komponen Tambahan</Text>
      </View>
    </AppContainer>
  );
}
 
export default AdditionalComponentScreen;