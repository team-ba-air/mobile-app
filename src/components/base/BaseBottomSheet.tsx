import React, { ReactNode, useState } from 'react'
import { Image, StyleSheet, View } from 'react-native';
import Modal from 'react-native-modal';
import { Color } from 'styles/colors';

interface BaseBottomSheetProps {
  children: ReactNode
  visible?: boolean
  onChangeVisible?: (isVisible: boolean) => void
}
 
const BaseBottomSheet: React.FC<BaseBottomSheetProps> = (props) => {
  const { children, visible = false, onChangeVisible = () => {} } = props 
  return ( 
    <Modal
      isVisible={visible}
      animationIn='slideInUp'
      style={styles.view}
      swipeDirection={['down']}
      onBackdropPress={() => onChangeVisible(false)}
      onBackButtonPress={() => onChangeVisible(false)}
    >
      <View style={styles.content}>
        <View style={styles.line}/>
        <Image source={require('assets/icon/drag_indicator.svg')} />
        {children}
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
    backgroundColor: 'white',
    paddingTop: 22,
    borderTopLeftRadius: 28,
    borderTopRightRadius: 28,
    borderColor: 'rgba(0, 0, 0, 0.1)',
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