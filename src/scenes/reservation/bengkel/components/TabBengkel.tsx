import React from 'react'
import { Tab } from 'react-native-elements';
import { Color } from 'styles/colors';

interface TabBengkelProps {
  index: number
  setIndex: (index: number) => void
  countReview: number
}
 
const TabBengkel: React.FC<TabBengkelProps> = ({ index, setIndex, countReview }) => {
    return ( 
      <Tab
        style={{ backgroundColor: 'white' }}
        value={index}
        onChange={(e) => setIndex(e)}
        indicatorStyle={{
          height: 3,
          backgroundColor: Color.blue[8],
        }}
        variant="default"
      >
        <Tab.Item
          title="Reservasi Servis"
          titleStyle={{ fontSize: 12, color: index === 0 ? Color.blue[8] : Color.gray[6] }}
          containerStyle={{ backgroundColor: 'white' }}
        />
        <Tab.Item
          title={countReview > 0 ? `Ulasan (${countReview})` : 'Ulasan'}
          titleStyle={{ fontSize: 12, color: index === 1 ? Color.blue[8] : Color.gray[6] }}
          containerStyle={{ backgroundColor: 'white' }}
        />
      </Tab>
    );
}
 
export default TabBengkel;