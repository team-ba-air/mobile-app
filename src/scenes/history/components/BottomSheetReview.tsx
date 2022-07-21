import React, { useCallback, useEffect, useRef } from 'react'
import BottomSheet, { BottomSheetBackdrop } from '@gorhom/bottom-sheet';
import { fontPixel, heightPixel, widthPixel } from 'styles/sizes';
import { View, Text } from 'react-native';
import { HistoryItem, ReviewHistoryForm } from '../constants';
import { Color } from 'styles/colors';
import { Icon } from 'react-native-elements';
import { Controller, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { reviewHistorySchema } from '../schema/reviewHistorySchema';
import CustomTextInput from 'components/CustomTextInput';
import CustomButton from 'components/CustomButton';
import { useMutation } from 'react-query';
import submitReview from '../service/submitReview';

interface BottomSheetReviewProps {
  data: HistoryItem | null
  isOpen: boolean
  onClose: () => void
  onSuccess?: () => void
}

const reviewRatingPredicate = [
  '',
  'Mengecewakan',
  'Kurang memuaskan',
  'Biasa saja',
  'Cukup Baik',
  'Sangat Baik',
]
 
const BottomSheetReview: React.FC<BottomSheetReviewProps> = ({ data, isOpen, onClose, onSuccess }) => {
  const bottomSheetRef = useRef<BottomSheet>(null);

  useEffect(() => {
    reset({
      rating: 0,
      review: '',
    })
  }, [data])

  useEffect(() => {
    console.log(isOpen)
    if (isOpen) {
      bottomSheetRef.current?.expand()
    } else {
      bottomSheetRef.current?.close()
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

  const formMethods = useForm<ReviewHistoryForm>({
    resolver: yupResolver(reviewHistorySchema),
    defaultValues: {
      rating: 0,
      review: '',
    },
    reValidateMode: 'onChange',
  })

  const {
    control,
    formState: { errors },
    reset,
    watch,
    getValues,
  } = formMethods

  const isDisabled = watch('rating') === 0 || watch('review') === ''

  const { isLoading: isSubmitingReview, mutateAsync: onSubmitReview } = useMutation(submitReview, {
    onSuccess: (data) => {
      onSuccess?.()
      onClose()
    },
  })

  const handleReview = () => {
    if (data) {
      onSubmitReview({
        history: data,
        review: getValues()
      }).catch(() => {
        // do nothing
      })
    }
  }

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
          onClose()
        } 
      }}
    >
      <View style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', height: '100%', paddingVertical: heightPixel(16) }}>
        <View>
          <View>
            <Text style={{ fontSize: fontPixel(14), color: Color.gray.secondary }}>{data?.shop.name}</Text>
            <Text style={{ fontSize: fontPixel(16), fontWeight: 'bold' }}>{data?.service.name} - {data?.car.brand} {data?.car.type}</Text>
          </View>

          <Controller 
            name={'rating'}
            control={control}
            render={({ field: { onChange, value }}) => (
              <View style={{ flexDirection: 'column', justifyContent: 'center', alignItems: 'center', marginVertical: heightPixel(24) }}>
                <View style={{ flexDirection: 'row' }}>
                  {Array(value).fill(0).map((_, index) => (
                    <Icon size={heightPixel(40)} name={'star'} color={'#f5e725'} onPress={() => onChange(index + 1)} tvParallaxProperties={undefined} />
                  ))}
                  {Array(5 - value).fill(0).map((_, index) => (
                    <Icon size={heightPixel(40)} name={'star'} color={Color.gray[2]} onPress={() => onChange(value + index + 1)} tvParallaxProperties={undefined}  />
                  ))}
                </View>
                
                <Text style={{ fontSize: fontPixel(14), color: Color.gray.secondary }}>{reviewRatingPredicate[value]}</Text>
              </View>
            )}
          />
          
          <View>
            <Text style={{ fontSize: fontPixel(14), fontWeight: 'bold' }}>Ulasan Terhadap Bengkel</Text>
          </View>

          <Controller 
            name={'review'}
            control={control}
            render={({ field: { onChange, value }}) => (
              <CustomTextInput
                style={{ marginVertical: heightPixel(8) }}
                value={value} 
                onChange={onChange} 
                placeholder={'Tuliskan komentar Anda (mis. kualitas, kecepatan, keramahan)'} 
                multiline={true} 
                lines={4} 
              />
            )}
          />
        </View>

        <CustomButton onPress={handleReview} type={'primary'} title={'Kirim Ulasan'} disabled={isDisabled} />
      </View>
    </BottomSheet>
  );
}
 
export default BottomSheetReview;