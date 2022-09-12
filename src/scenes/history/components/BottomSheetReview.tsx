import React, { useCallback, useEffect, useRef, useState } from 'react'
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
import { Snackbar } from 'react-native-paper';
import BaseBottomSheet from 'components/BaseBottomSheet';

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
  const [show, setShow] = useState(false)
  const [visible, setVisible] = useState(false)

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
      setShow(true)
    } else {
      setShow(false)
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
    handleSubmit,
  } = formMethods

  const isDisabled = watch('rating') === 0 || watch('review') === ''

  const { isLoading: isSubmitingReview, mutateAsync: onSubmitReview } = useMutation(submitReview, {
    onSuccess: (data) => {
      onSuccess?.()
      onClose()
    },
    onError: () => {
      setVisible(true)
    }
  })

  const handleReview = (dataForm: ReviewHistoryForm) => {
    if (data) {
      onSubmitReview({
        history: data,
        review: dataForm
      }).catch(() => {
        // do nothing
      })
    }
  }

  console.log(errors)

  return ( 
    <BaseBottomSheet onChangeVisible={(isVisible) => {
      if (!isVisible) {
        onClose()
      }
      setShow(isVisible)
    }} visible={show}>
      <View style={{ 
        display: 'flex', 
        flexDirection: 'column', 
        justifyContent: 'space-between', 
        height: '95%', 
        paddingVertical: heightPixel(16),
        paddingHorizontal: widthPixel(20),
      }}>
        <View>
          <View>
            <Text style={{ fontSize: fontPixel(14), color: Color.gray.secondary }}>{data?.shop?.name}</Text>
            <Text style={{ fontSize: fontPixel(16), fontWeight: 'bold' }}>{data?.service?.name} - {data?.car?.brand} {data?.car?.type}</Text>
          </View>

          <Controller 
            name={'rating'}
            control={control}
            render={({ field: { onChange, value }}) => (
              <>
                <View style={{ flexDirection: 'column', justifyContent: 'center', alignItems: 'center', marginTop: heightPixel(24) }}>
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
                <Text style={{ color: Color.red[7], fontSize: fontPixel(11), marginTop: heightPixel(4), marginBottom: heightPixel(24)}}>{errors?.['rating']?.message}</Text>
              </>
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
                error={errors?.['review']?.message}
                lines={4} 
              />
            )}
          />
        </View>

        <CustomButton onPress={handleSubmit(handleReview)} type={'primary'} title={'Kirim Ulasan'} />
      </View>

      <Snackbar
        visible={visible}
        onDismiss={() => setVisible(false)}
        duration={4000}
        wrapperStyle={{ alignSelf: 'center' }}
        style={{ backgroundColor: Color.red[7], marginBottom: heightPixel(24) }}
        theme={{
          colors: {
            surface: 'white'
          }
        }}
      >
        Sedang ada kendala. Silakan coba beberapa saat lagi.
      </Snackbar>
    </BaseBottomSheet>
  );
}
 
export default BottomSheetReview;