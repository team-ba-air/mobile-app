import React from 'react'
import { StyleSheet, Text, View } from 'react-native';
import { Icon } from 'react-native-elements';
import { ReviewItem } from 'scenes/reservation/constants';
import { Color } from 'styles/colors';
import { fontPixel, heightPixel, Sizing } from 'styles/sizes';
import { getFormatDateNumeric } from 'utils/DateUtil';

interface ReviewItemComponentProps {
  item: ReviewItem
}
 
const ReviewItemComponent: React.FC<ReviewItemComponentProps> = ({ item }) => {
  const yellowStar = Array(item.rating).fill(0)
  const grayStar = Array(5 - item.rating).fill(0)
  return ( 
    <View style={styles.container}>
      <Text>{item.name}</Text>
      <View style={{ display: 'flex', flexDirection: 'row' }}>
        {yellowStar.map(value => (
          <Icon size={14} name={'star'} color={'#f5e725'}/>
        ))}
        {grayStar.map(value => (
          <Icon size={14} name={'star'} color={Color.gray[2]}/>
        ))}
      </View>

      <View style={{ 
        display: 'flex', 
        flexDirection: 'row', 
        justifyContent: 'space-between', 
        paddingVertical: heightPixel(4) 
      }}>
        <Text style={styles.subtitle}>{item.serviceType}</Text>
        <Text style={styles.subtitle}>{getFormatDateNumeric(item.date)}</Text>
      </View>
      <Text>{item.review}</Text>
    </View>
  );
}
 
export default ReviewItemComponent;

const styles = StyleSheet.create({
  container: {
    borderBottomWidth: 1, 
    borderBottomColor: Color.gray[2],
    paddingBottom: heightPixel(8),
  },
  subtitle: {
    fontSize: fontPixel(Sizing.text.body[10]),
    color: Color.gray[6]
  }
})