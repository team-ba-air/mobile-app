import React, { ReactNode } from 'react'
import { ImageBackground, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

interface AppContainerProps {
  children: ReactNode
  style?: any
  backgroundImage?: any
}
 
const AppContainer: React.FC<AppContainerProps> = ({ children, style, backgroundImage }) => {
  return ( 
    <SafeAreaView style={[styles.container]}>
      <ImageBackground style={[styles.backgroundImage, style]} source={backgroundImage}>
        {children}
      </ImageBackground>
    </SafeAreaView>
   );
}
 
export default AppContainer

const styles = StyleSheet.create({
  container: {
    height: '100%',
    backgroundColor: '#FFFFFF',
  },
  backgroundImage:{
    flex: 1,
    width: '100%',
    height: '100%',
    padding: 16,
  },
})
