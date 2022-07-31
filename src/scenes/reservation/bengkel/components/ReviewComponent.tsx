import { PublicAPIResponse } from 'network/types';
import React from 'react';
import { FlatList, ListRenderItemInfo, Text, View } from 'react-native';
import { Icon } from 'react-native-elements';
import { useQuery } from 'react-query';
import { ReviewItem, ShopReview } from 'scenes/reservation/constants';
import getShopReview, { GetShopReviewResponse } from 'scenes/reservation/service/getShopReview';
import { Color } from 'styles/colors';
import { fontPixel, heightPixel, widthPixel } from 'styles/sizes';
import ReviewItemComponent from './ReviewItemComponent';

interface ReviewComponentProps {
  shopId: string
}

const dummyReviewList: ReviewItem[] = [
  {
    name: 'Patrick S',
    rating: 4,
    date: new Date(),
    service: 'Servis Dasar',
    description: 'Pelayanannya sangat baik dan ramah.',
    car: 'Toyota Avanza',
  },
  {
    name: 'Patrick S',
    rating: 5,
    date: new Date(),
    service: 'Servis Dasar',
    description: 'Pelayanannya sangat baik dan ramah.',
    car: 'Honda Jazz',
  },
  {
    name: 'Patrick S',
    rating: 5,
    date: new Date(),
    service: 'Servis Dasar',
    description: 'Pelayanannya sangat baik dan ramah.',
    car: 'Toyota Yaris',
  }
]

const dummyReview: ShopReview = {
  total_count: 5,
  average_rating: 4.5,
  reviews: dummyReviewList
}
 
const ReviewComponent: React.FC<ReviewComponentProps> = ({ shopId }) => {
  const {
    data: shopReviewResponse,
  } = useQuery<PublicAPIResponse<ShopReview>>(
    ['getShopReview', shopId],
    () => getShopReview({ id: shopId }),
    {
      refetchOnWindowFocus: false,
      retry: true,
    }
  )

  const shopReview = shopReviewResponse?.body
  const reviewList = shopReview?.reviews ?? []

  return ( 
    <View style={{ paddingHorizontal: widthPixel(20) }}>
      <View style={{ 
        flexDirection: 'column', 
        justifyContent: 'flex-start', 
        alignItems: 'flex-start',
        paddingVertical: heightPixel(8),
      }}>
        <Text style={{ fontSize: fontPixel(14) }}>Rata-rata Ulasan</Text>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Icon size={fontPixel(24)} name={'star'} color={'#FFDE31'} tvParallaxProperties={undefined} />
          <Text style={{ fontSize: fontPixel(24), fontWeight: 'bold' }}>{shopReview?.average_rating ?? 0}</Text>
          <Text style={{ marginLeft: widthPixel(4), fontSize: fontPixel(12), color: Color.gray[6] }}>({shopReview?.total_count ?? 0} ulasan)</Text>
        </View>
      </View>
      {reviewList.length > 0 ? (
        <FlatList
          data={shopReview?.reviews ?? []}
          renderItem={(info: ListRenderItemInfo<ReviewItem>) => (
            <ReviewItemComponent item={info.item} />
          )}
        />
      ) : (
        <Text>Belum ada ulasan</Text>
      )}
      
    </View>
  );
}
 
export default ReviewComponent;