import React, { useCallback, useEffect, useRef } from 'react'
import BottomSheet, { BottomSheetBackdrop } from '@gorhom/bottom-sheet';
import { fontPixel, widthPixel } from 'styles/sizes';
import { View, Text } from 'react-native';
import { HistoryItem } from '../constants';
import { Color } from 'styles/colors';

interface BottomSheetReviewProps {
  data: HistoryItem | null
  isOpen: boolean
  setIsOpenReview: (open: boolean) => void
}
 
const BottomSheetReview: React.FC<BottomSheetReviewProps> = ({ data, isOpen, setIsOpenReview }) => {
  const bottomSheetRef = useRef<BottomSheet>(null);

  useEffect(() => {
    console.log(isOpen)
    if (isOpen) {
      bottomSheetRef.current?.expand()
    }
  }, [isOpen])

  const renderBackdrop = useCallback(
    props => (
      <BottomSheetBackdrop
        {...props}
        appearsOnIndex={1}
      />
    ),
    []
  );

  return ( 
    <BottomSheet 
      style={{ paddingHorizontal: widthPixel(16) }} 
      ref={bottomSheetRef}
      index={-1} 
      enablePanDownToClose
      snapPoints={['50%', '90%']} 
      backdropComponent={renderBackdrop}
      onChange={(index) => {
        console.log(index)
        if (index === -1) {
          setIsOpenReview(false)
        } 
      }}
    >
      <View>
        <Text style={{ fontSize: fontPixel(14), color: Color.gray.secondary }}>{data?.location}</Text>
        <Text style={{ fontSize: fontPixel(16), fontWeight: 'bold' }}>{data?.serviceType} - {data?.brand} {data?.carType}</Text>
      </View>

      <View>
        <Text style={{ fontSize: fontPixel(14), fontWeight: 'bold' }}>Ulasan Terhadap Bengkel</Text>
      </View>
    </BottomSheet>
  );
}
 
export default BottomSheetReview;