import React, { useCallback, useRef, useState } from 'react'
import { FlatList, ListRenderItemInfo, StyleSheet, View } from 'react-native'
import { Color } from 'styles/colors'
import { heightPixel, SCREEN_WIDTH } from 'styles/sizes'
import SlideItem from './SlideItem'

interface CarouselComponentProps {
  images: string[]
}

const CarouselComponent: React.FC<CarouselComponentProps> = ({ images }) => {
  const [index, setIndex] = useState(0);
  const indexRef = useRef(index);
  indexRef.current = index;
  const onScroll = useCallback((event) => {
    const slideSize = event.nativeEvent.layoutMeasurement.width;
    const index = event.nativeEvent.contentOffset.x / slideSize;
    const roundIndex = Math.round(index);

    const distance = Math.abs(roundIndex - index);

    const isNoMansLand = 0.4 < distance;

    if (roundIndex !== indexRef.current && !isNoMansLand) {
      setIndex(roundIndex);
    }
  }, []);

  const flatListOptimizationProps = {
    initialNumToRender: 0,
    maxToRenderPerBatch: 1,
    removeClippedSubviews: true,
    scrollEventThrottle: 16,
    windowSize: 2,
    getItemLayout: useCallback(
      (_, index) => ({
        index,
        length: SCREEN_WIDTH,
        offset: index * SCREEN_WIDTH,
      }),
      []
    ),
  };

  const dotIndicator = images.map((value, idx) => {
    const backgroundColor = idx === index ? Color.blue[7] : Color.gray[4]
    return (
    <View style={[styles.circle, { backgroundColor }]}></View>
  )})


  return (  
    <View>
      <FlatList 
        data={images}
        keyExtractor={(_, index) => index.toString()}
        renderItem={(info: ListRenderItemInfo<string>) => (
          <SlideItem image={info.item} />
        )}
        pagingEnabled
        horizontal
        showsHorizontalScrollIndicator={false}
        onScroll={onScroll}
        {...flatListOptimizationProps}
      />
      <View style={{ flex: 1, display: 'flex', flexDirection: 'row', justifyContent: 'center', marginTop: heightPixel(-16) }}>
         {dotIndicator}
       </View>
    </View>
  )
}
 
export default CarouselComponent

const styles = StyleSheet.create({
  circle: {
    marginHorizontal: 4,
    borderRadius: 16,
    width: 6,
    height: 6,
    justifyContent: 'center',
    alignItems: 'center',
  }
})
