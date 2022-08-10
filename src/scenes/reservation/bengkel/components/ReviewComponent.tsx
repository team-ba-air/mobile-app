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
  shopReview?: ShopReview
}
 
const ReviewComponent: React.FC<ReviewComponentProps> = ({ shopReview }) => {
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