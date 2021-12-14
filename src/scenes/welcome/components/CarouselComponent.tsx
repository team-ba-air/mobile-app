import React, { useCallback, useRef, useState } from 'react'
import { FlatList, ListRenderItemInfo } from 'react-native'
import { SCREEN_WIDTH, SCREEN_HEIGHT } from 'styles/sizes'
import SlideItem from './SlideItem'

interface CarouselComponentProps {
  
}

const data = [
  {
    image: '',
    title: 'Selamat datang di OTOKU!',
    subtitle: 'Pengalaman baru servis mobil',
  },
  {
    image: '',
    title: 'Selamat datang di OTOKU!',
    subtitle: 'Pengalaman baru servis mobil',
  },
  {
    image: '',
    title: 'Selamat datang di OTOKU!',
    subtitle: 'Pengalaman baru servis mobil',
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


  return (  
    <FlatList 
      data={data}
      contentContainerStyle={{ justifyContent: 'center', flexGrow: 1 }}
      style={{ display: 'flex' }}
      renderItem={(info: ListRenderItemInfo<any>) => (
        <SlideItem {...info.item} />
      )}
      pagingEnabled
      horizontal
      showsHorizontalScrollIndicator={false}
      onScroll={onScroll}
      {...flatListOptimizationProps}
    />
  )
}
 
export default CarouselComponent
