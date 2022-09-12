import React, { useCallback, useRef, useState } from 'react'
import { FlatList, ListRenderItemInfo, StyleSheet, View } from 'react-native'
import { Color } from 'styles/colors'
import { SCREEN_WIDTH, SCREEN_HEIGHT } from 'styles/sizes'
import SlideItem from './SlideItem'

interface CarouselComponentProps {
  
}

const data = [
  {
    image: require('@assets/carousel_1.webp'),
    title: 'Selamat datang di Otoku!',
    subtitle: 'Rasakan pengalaman baru merawat mobil dengan Otoku',
  },
  {
    image: require('@assets/carousel_2.webp'),
    title: 'Lihat dan pilih bengkel sesuka hati',
    subtitle: 'Cari bengkel sesuai kebutuhan Anda dengan mudah dan praktis',
  },
  {
    image: require('@assets/carousel_3.webp'),
    title: 'Bebas atur jadwal servis yang cocok',
    subtitle: 'Gaperlu pusing cocokin jadwal Anda dengan jadwal bengkel',
  },
]
 
const CarouselComponent: React.FC<CarouselComponentProps> = () => {
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
    keyExtractor: useCallback(e => e.id, []),
    getItemLayout: useCallback(
      (_, index) => ({
        index,
        length: SCREEN_WIDTH,
        offset: index * SCREEN_WIDTH,
      }),
      []
    ),
  };

  const dotIndicator = data.map((value, idx) => {
    const backgroundColor = idx === index ? Color.blue[7] : Color.gray[4]
    return (
    <View style={[styles.circle, { backgroundColor }]}></View>
  )})


  return (  
    <View style={{ flex: 1 }}>
      <FlatList 
        contentContainerStyle={{ display: 'flex', justifyContent: 'flex-end' }}
        // style={{ backgroundColor: 'blue' }}
        data={data}
        renderItem={(info: ListRenderItemInfo<any>) => (
          <SlideItem {...info.item} />
        )}
        pagingEnabled
        horizontal
        showsHorizontalScrollIndicator={false}
        onScroll={onScroll}
        {...flatListOptimizationProps}
      />
      <View style={{ flex: 1, display: 'flex', flexDirection: 'row', justifyContent: 'center' }}>
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
    width: 16 * 0.5,
    height: 16 * 0.5,
    justifyContent: 'center',
    alignItems: 'center',
  }
})