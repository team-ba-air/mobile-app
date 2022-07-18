import React, { ReactNode, useRef, useState } from 'react'
import { Image, ScrollView, StyleSheet, View } from 'react-native';
import Modal from 'react-native-modal';
import { Color } from 'styles/colors';
import { heightPixel, SCREEN_HEIGHT } from 'styles/sizes';

interface BaseBottomSheetProps {
  children: ReactNode
  visible?: boolean
  onChangeVisible?: (isVisible: boolean) => void
}
 
const BaseBottomSheet: React.FC<BaseBottomSheetProps> = (props) => {
  const { children, visible = false, onChangeVisible = () => {} } = props

  const [offset, setOffset] = useState<number>()

  const scrollViewRef = useRef<ScrollView>(null);
  
  const handleHide = () => {
    onChangeVisible(false)
  }

  const handleScrollTo = (point: any) => {
    if (scrollViewRef.current) {
      scrollViewRef.current.scrollTo(point)
    }
  }

  const handleOnScroll = (event: any) => {
    setOffset(event.nativeEvent.contentOffset.y);
  };
  
  return ( 
    <Modal
      isVisible={visible}
      animationIn='slideInUp'
      style={styles.view}
      swipeDirection={['down']}
      onBackdropPress={handleHide}
      onBackButtonPress={handleHide}
      onSwipeComplete={handleHide}
      scrollTo={handleScrollTo}
      scrollOffset={offset}
      propagateSwipe
    >
      <View style={styles.content}>
        <View style={styles.line}/>
        <Image source={require('assets/icon/drag_indicator.svg')} />
        <ScrollView 
          style={{ paddingBottom: heightPixel(8) }}
          ref={scrollViewRef} 
          onScroll={handleOnScroll} 
          scrollEventThrottle={16}>
          {children}
        </ScrollView>
      </View>
    </Modal>
   );
}
 
export default BaseBottomSheet;

const styles = StyleSheet.create({
  view: {
    justifyContent: 'flex-end',
    margin: 0,
  },
  content: {
    minHeight: '40%',
    backgroundColor: 'white',
    paddingTop: 22,
    borderTopLeftRadius: 28,
    borderTopRightRadius: 28,
    borderColor: 'rgba(0, 0, 0, 0.1)',
    maxHeight: '90%',
  },
  line: {
    alignSelf: 'center',
    width: '30%',
    borderRadius: 30,
    borderColor: Color.gray[2],
    borderWidth: 4,
    borderStyle: 'solid',
    // border: '4px solid #E4E2E4',
  },
});