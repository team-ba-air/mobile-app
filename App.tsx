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
import { NavigationContainer } from '@react-navigation/native';
import AppProvider from 'context/AppProvider';
import { Provider as PaperProvider } from 'react-native-paper';
import { GoogleSignin } from '@react-native-google-signin/google-signin';

type AppProps = {}

const App: React.FC<AppProps> = () => {
  useEffect(() => {
    GoogleSignin.configure({
      scopes: [],
      webClientId: '75808358640-7phfh1dhh5eqtnvt84vebs41m87cp660.apps.googleusercontent.com',
      iosClientId: '75808358640-0cbiskapsimcmi3b3a4edbmb156s4d93.apps.googleusercontent.com',
      offlineAccess: false,
      hostedDomain: '',
      forceCodeForRefreshToken: true,
    })
  }, [])
  return (
    <AppProvider>
        <NavigationContainer>
          <PaperProvider>
            <Navigator />
          </PaperProvider>
        </NavigationContainer>
    </AppProvider>
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
