import React, { useCallback, useRef } from 'react'
import { View, Text } from 'react-native';
import BottomSheet from '@gorhom/bottom-sheet';
import Animated from 'react-native-reanimated';

interface BottomSheetBengkelListProps {
  animatedPosition?: Animated.SharedValue<number>
}
 
const BottomSheetBengkelList: React.FC<BottomSheetBengkelListProps> = ({ animatedPosition }) => {
  const bottomSheetRef = useRef<BottomSheet>(null);

  const handleSheetChanges = useCallback((index: number) => {
    console.log('handleSheetChanges', index);
  }, []);

  return ( 
    <BottomSheet animatedPosition={animatedPosition} ref={bottomSheetRef} index={1} snapPoints={['40%', '80%']} onChange={handleSheetChanges}>
      <View>
        <Text>Ini bengkel</Text>
      </View>
    </BottomSheet>
    );
}
 
export default BottomSheetBengkelList;