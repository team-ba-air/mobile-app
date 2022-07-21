import React from 'react';
import { FlatList, ListRenderItemInfo, Text, View } from 'react-native';
import { Icon } from 'react-native-elements';
import { ReviewItem } from 'scenes/reservation/constants';
import { Color } from 'styles/colors';
import { fontPixel, heightPixel, widthPixel } from 'styles/sizes';
import ReviewItemComponent from './ReviewItemComponent';

interface ReviewComponentProps {
    
}

const dummyReview: ReviewItem[] = [
  {
    name: 'Patrick S',
    rating: 4,
    date: new Date(),
    serviceType: 'Servis Dasar',
    review: 'Pelayanannya sangat baik dan ramah.',
  },
  {
    name: 'Patrick S',
    rating: 5,
    date: new Date(),
    serviceType: 'Servis Dasar',
    review: 'Pelayanannya sangat baik dan ramah.',
  },
  {
    name: 'Patrick S',
    rating: 5,
    date: new Date(),
    serviceType: 'Servis Dasar',
    review: 'Pelayanannya sangat baik dan ramah.',
  }
]
 
const ReviewComponent: React.FC<ReviewComponentProps> = () => {
  const ratingSum = dummyReview.map(review => review.rating).reduce((a, b) => {
    return a + b
  }, 0)

  const ratingAverage = (ratingSum / dummyReview.length).toFixed(2)

  return ( 
    <View>
      <View style={{ 
        flexDirection: 'column', 
        justifyContent: 'flex-start', 
        alignItems: 'flex-start',
        paddingVertical: heightPixel(8),
      }}>
        <Text style={{ fontSize: fontPixel(14) }}>Rata-rata Ulasan</Text>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Icon size={fontPixel(24)} name={'star'} color={'#FFDE31'} tvParallaxProperties={undefined} />
          <Text style={{ fontSize: fontPixel(24), fontWeight: 'bold' }}>{ratingAverage}</Text>
          <Text style={{ marginLeft: widthPixel(4), fontSize: fontPixel(12), color: Color.gray[6] }}>({dummyReview.length} ulasan)</Text>
        </View>
      </View>
      <FlatList
        data={dummyReview}
        renderItem={(info: ListRenderItemInfo<ReviewItem>) => (
          <ReviewItemComponent item={info.item} />
        )}
      />
    </View>
  );
}
 
export default ReviewComponent;