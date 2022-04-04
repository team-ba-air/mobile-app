import React from 'react'
import { View } from 'react-native';
import { ReviewItem } from 'scenes/reservation/constants';

interface ReviewItemComponentProps {
  item: ReviewItem
}
 
const ReviewItemComponent: React.FC<ReviewItemComponentProps> = ({ item }) => {
    return ( 
      <View></View>
    );
}
 
export default ReviewItemComponent;