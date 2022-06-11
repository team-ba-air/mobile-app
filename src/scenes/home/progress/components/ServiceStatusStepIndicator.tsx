import React, { useState } from 'react'
import { Text, View } from 'react-native';
import StepIndicator from 'react-native-step-indicator';
import { ProgressTime } from 'scenes/home/constants';
import StatusDetailComponent from './StatusDetailComponent';

interface ServiceStatusStepIndicatorProps {
  currentPosition: number
  progressTime: ProgressTime[]
}
 
const ServiceStatusStepIndicator: React.FC<ServiceStatusStepIndicatorProps> = ({ currentPosition, progressTime }) => {
  const labels = [
    'Mobil Sampai di Bengkel',
    'Dalam Antrian Servis',
    'Dalam Pengerjaan',
    'Inspeksi Akhir',
    'Mobil Siap Diambil',
  ]

  const customStyles = {
    stepIndicatorSize: 30,
    currentStepIndicatorSize: 30,
    separatorStrokeWidth: 2,
    currentStepStrokeWidth: 2,
    stepStrokeCurrentColor: "#04c92e",
    stepStrokeWidth: 2,
    stepStrokeFinishedColor: "#04c92e",
    stepStrokeUnFinishedColor: "#aaaaaa",
    separatorFinishedColor: "#04c92e",
    separatorUnFinishedColor: "#aaaaaa",
    stepIndicatorFinishedColor: "#04c92e",
    stepIndicatorUnFinishedColor: "#ffffff",
    stepIndicatorCurrentColor: "#ffffff",
    stepIndicatorLabelFontSize: 13,
    currentStepIndicatorLabelFontSize: 13,
    stepIndicatorLabelCurrentColor: "#fe7013",
    stepIndicatorLabelFinishedColor: "#ffffff",
    stepIndicatorLabelUnFinishedColor: "#aaaaaa",
    labelColor: "#999999",
    labelSize: 13,
    currentStepLabelColor: "#fe7013"
  };

  return ( 
    <View style={{ height: 300 }}>
      <StepIndicator 
        customStyles={customStyles}
        direction='vertical'
        currentPosition={currentPosition}
        labels={labels}
        stepCount={5}
        renderLabel={({ position, stepStatus, label, currentPosition }) => {
          return <StatusDetailComponent time={progressTime[position].time} label={label} />
        }}
      />
      {/* <Text>Awaiting Confirmation</Text> */}
    </View>
  );
}
 
export default ServiceStatusStepIndicator;