/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, { useEffect } from 'react'
import {
  StyleSheet,
} from 'react-native';
import Navigator from 'navigations'
import AuthorizationProvider from 'context/AuthorizationProvider';
import { NavigationContainer } from '@react-navigation/native';
import { GoogleSignin } from 'react-native-google-signin';

type AppProps = {}

const App: React.FC<AppProps> = () => {
  useEffect(() => {
    GoogleSignin.configure({
      scopes: [],
      webClientId: '75808358640-7phfh1dhh5eqtnvt84vebs41m87cp660.apps.googleusercontent.com',
      offlineAccess: true,
      hostedDomain: '',
      loginHint: '',
      forceConsentPrompt: true,
    })
  }, [])
  return (
    <AuthorizationProvider>
      <NavigationContainer>
        <Navigator />
      </NavigationContainer>
    </AuthorizationProvider>
  );
};

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});

export default App;
