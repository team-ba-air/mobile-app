import React, { useState } from 'react'
import { Text, View } from 'react-native';
import { Icon } from 'react-native-elements';
import StepIndicator from 'react-native-step-indicator';
import { LABEL_STATUS, ProgressTime } from 'scenes/home/constants';
import { Color } from 'styles/colors';
import { heightPixel, widthPixel } from 'styles/sizes';
import StatusDetailComponent from './StatusDetailComponent';

interface ServiceStatusStepIndicatorProps {
  currentPosition: number
  progressTime: ProgressTime[]
}
 
const ServiceStatusStepIndicator: React.FC<ServiceStatusStepIndicatorProps> = ({ currentPosition, progressTime }) => {
  const customStyles = {
    stepIndicatorSize: 30,
    currentStepIndicatorSize: 40,
    separatorStrokeWidth: 2,
    currentStepStrokeWidth: 0,
    stepStrokeCurrentColor: Color.blue[8],
    stepStrokeWidth: 0,
    stepStrokeFinishedColor: Color.gray[0],
    stepStrokeUnFinishedColor: "#aaaaaa",
    separatorFinishedColor: Color.blue[8],
    separatorUnFinishedColor: "#aaaaaa",
    stepIndicatorFinishedColor: Color.gray[0],
    stepIndicatorUnFinishedColor: "#ffffff",
    stepIndicatorCurrentColor: "#ffffff",
    stepIndicatorLabelCurrentColor: "#fe7013",
    stepIndicatorLabelFinishedColor: "#ffffff",
    stepIndicatorLabelUnFinishedColor: "#aaaaaa",
  };

  console.log(progressTime)

  return ( 
    <View style={{ 
      height: 250, 
      borderWidth: 1, 
      borderColor: Color.gray[2], 
      borderRadius: 8,
      paddingVertical: heightPixel(4), 
      paddingHorizontal: widthPixel(8),
      marginVertical: heightPixel(8),
      }}
    >
      <StepIndicator 
        customStyles={customStyles}
        direction='vertical'
        currentPosition={currentPosition}
        labels={LABEL_STATUS}
        stepCount={5}
        renderLabel={({ position, stepStatus, label, currentPosition }) => {
          return (
            <StatusDetailComponent 
              time={progressTime?.[position].time} 
              label={label} 
              position={position} 
              currentPosition={currentPosition} 
              stepStatus={stepStatus}
            />
          )
        }}
        renderStepIndicator={({ position, stepStatus }) => {
          return (
            <>
              {stepStatus === 'finished' && (
                <Icon tvParallaxProperties={null} type='material' name='check-circle' color={Color.blue[8]} />
              )}
              {stepStatus === 'unfinished' && (
                <Icon tvParallaxProperties={null} type='material' name='fiber-manual-record' color={Color.gray[2]} />
              )}
              {stepStatus === 'current' && (
                <Icon tvParallaxProperties={null} type='material' name='trip-origin' color={Color.blue[8]} />
              )}
            </>
          )
        }}
      />
      {/* <Text>Awaiting Confirmation</Text> */}
    </View>
  );
}
 
export default ServiceStatusStepIndicator;