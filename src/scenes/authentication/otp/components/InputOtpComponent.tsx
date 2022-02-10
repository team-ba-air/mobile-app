import React, { useEffect, useState } from 'react'
import { View, Text, StyleSheet } from 'react-native';
import { CodeField, Cursor, useBlurOnFulfill, useClearByFocusCell } from 'react-native-confirmation-code-field';

interface InputOtpComponentProps {
  value: string
  setValue: (value: string) => void
  resend: () => void
}
 
const InputOtpComponent: React.FC<InputOtpComponentProps> = ({ value, setValue, resend }) => {
  const CELL_COUNT = 6
  const ref = useBlurOnFulfill({ value, cellCount: CELL_COUNT })
  const [props, getCellOnLayoutHandler] = useClearByFocusCell({
    value,
    setValue,
  });

  const [time, setTime] = useState<number>(5 * 60)

  useEffect(() => {
    let interval = setInterval(() => {
      if (time === 0) {
        clearInterval(interval)
      } else {
        setTime(time - 1)
      }
    }, 1000)

    return () => {
      clearInterval(interval)
    }
  })

  const showTimeText = (value: number) => {
    const minute = value / 60
    const second = value % 60
    const secondString = second >= 10 ? second.toString() : `0${second}`
    return `${minute}:${secondString}`
  }

  return ( 
    <View>
      <CodeField 
        ref={ref}
        {...props}
        value={value}
        onChangeText={setValue}
        keyboardType={'number-pad'}
        renderCell={({index, symbol, isFocused}) => (
          <View
            onLayout={getCellOnLayoutHandler(index)}
            key={index}
            style={[styles.cellRoot, isFocused && styles.focusCell]}
          >
            <Text style={styles.cellText}>
              {symbol || (isFocused ? <Cursor /> : null)}
            </Text>
          </View>
        )}
      />
      <Text>Waktu tersisa {showTimeText(time)}</Text>
      <Text onPress={resend}>Kirimkan ulang</Text>
    </View>
  );
}
 
export default InputOtpComponent;

const styles = StyleSheet.create({
  codeFieldRoot: {
    marginTop: 20,
    width: 280,
    marginLeft: 'auto',
    marginRight: 'auto',
  },
  cellRoot: {
    width: 60,
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomColor: '#ccc',
    borderBottomWidth: 1,
  },
  cellText: {
    color: '#000',
    fontSize: 36,
    textAlign: 'center',
  },
  focusCell: {
    borderBottomColor: '#007AFF',
    borderBottomWidth: 2,
  },
})