import React, { ReactNode, useState } from 'react'
import { ColorValue, ImageBackground, RefreshControl, ScrollView, StyleProp, StyleSheet, ViewStyle } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

interface AppContainerProps {
  children: ReactNode
  style?: StyleProp<ViewStyle>
  backgroundImage?: any
  onRefresh?: () => void
  refreshDisable?: boolean
  safeAreaBackground?: ColorValue
}
 
const AppContainer: React.FC<AppContainerProps> = ({ children, style, backgroundImage, onRefresh, refreshDisable, safeAreaBackground }) => {
  const [refreshing, setRefreshing] = useState(false)

  const handleRefresh = () => {
    setRefreshing(true)
    onRefresh?.()
    setTimeout(() => {
      setRefreshing(false)
    }, 2000)
  }

  return ( 
    <>
    {safeAreaBackground && (
      <SafeAreaView style={{ flex: 0, backgroundColor: safeAreaBackground }} edges={['top']}/>
    )}
    
    <SafeAreaView style={[styles.container]} edges={['left', 'right']}>
      <ImageBackground style={[styles.backgroundImage, style]} source={backgroundImage}>
        {refreshDisable ? children : (
          <ScrollView
            refreshControl={
              <RefreshControl 
                refreshing={refreshing}
                onRefresh={handleRefresh}
              />
            }
          >
            {children}
          </ScrollView>
        )}
      </ImageBackground>
    </SafeAreaView>
    </>
   );
}
 
export default AppContainer

const styles = StyleSheet.create({
  container: {
    // height: '100%',
    backgroundColor: '#FFFFFF',
    flex: 1,
  },
  backgroundImage:{
    flex: 1,
    width: '100%',
    // height: '100%',
    // padding: 20,
  },
})
