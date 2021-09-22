import React from 'react';
import { Text } from 'react-native';
import {SafeAreaView} from 'react-navigation';

interface LoginScreenProps {}

const LoginScreen: React.FC<LoginScreenProps> = () => {
  return <SafeAreaView>
    <Text>Welcome to Login Page</Text>
  </SafeAreaView>;
};

export default LoginScreen;
