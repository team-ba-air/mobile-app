import React from 'react'
import { Platform, StyleSheet, View } from 'react-native';
import { Icon, Image, Text } from 'react-native-elements';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Color } from 'styles/colors';
import { fontPixel, heightPixel, Sizing, widthPixel } from 'styles/sizes';

interface NavbarAppProps {
  title?: string
  navigation: any
  type?: 'primary' | 'secondary'
  disableBack?: boolean
}
 
const NavbarApp: React.FC<NavbarAppProps> = ({ title, navigation, type = 'primary', disableBack = false }) => {
  const insets = useSafeAreaInsets()
  return ( 
    <View style={[
      styles.container, 
      { 
        backgroundColor: type === 'primary' ? Color.blue[8] : Color.gray[0], 
        borderBottomWidth: type === 'secondary' ? 1 : 0,
        borderBottomColor: Color.gray[3],
        borderStyle: 'solid',
        paddingTop: Platform.OS === 'ios' ? insets.top : 0,
      }
    ]}>
      {!disableBack && (
        type === 'primary' ? 
          <Image
            style={{ width: 16, height: 16 }}
            source={require('@assets/icon/left_arrow.png')} 
            resizeMode={'contain'} 
            onPress={() => navigation.goBack(null)}
          />
        :
          <Image
            style={{ width: 16, height: 16 }}
            source={require('@assets/icon/left_arrow_black.png')} 
            resizeMode={'contain'} 
            onPress={() => navigation.goBack(null)}
          />
      )}
      
      <View style={styles.titleContainer}>
        <Text style={[styles.title, { color: type === 'primary' ? Color.gray[0] : Color.gray.primary }]}>{title}</Text>
      </View>
    </View>
  );
}
 
export default NavbarApp;

const styles = StyleSheet.create({
  container: {
    width: '100%',
    padding: 20,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center'
  },
  title: {
    fontSize: fontPixel(16),
    fontWeight: 'bold',
  },
  titleContainer: {
    width: '100%',
    flex: 1,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  }
})