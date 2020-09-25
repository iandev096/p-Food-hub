import { AppLoading } from 'expo';
import React, { useState } from 'react';
import { Asset } from 'expo-asset';
import { ThemeProvider } from 'react-native-elements';
import theme from './constants/theme';
import * as firebase from 'firebase';
import 'firebase/firestore';
import { YellowBox, View } from 'react-native';
import { AuthProvider } from './store/contexts/Auth/AuthProvider';
import { MainNavigator } from './Navigators/MainNavigator';

export default function App() {
  const [isInitComplete, setIsInitComplete] = useState(false);

  if (!isInitComplete) {
    return (
      <AppLoading
        startAsync={asynInitTasks}
        onError={handleAsyncInitError}
        onFinish={() => setIsInitComplete(true)}
      />
    )
  }

  return (
    <ThemeProvider theme={theme}>
      <AuthProvider>
        <MainNavigator />
      </AuthProvider>
    </ThemeProvider>
  );
}

async function asynInitTasks() {
  await Asset.loadAsync([
    require('./assets/logo_transparent.png')
  ]);

  // Initialize Firebase
  const firebaseConfig = {
    apiKey: "**************************",
    authDomain: "**************************",
    databaseURL: "**************************",
    projectId: "**************************",
    storageBucket: "**************************",
    messagingSenderId: "**************************",
    appId: "**************************"
  };
  
  firebase.initializeApp(firebaseConfig);
  
  YellowBox.ignoreWarnings(['Setting a timer']);
  
}

function handleAsyncInitError(error: any) {
  // In this case, you might want to report the error to your error reporting
  // service, for example Sentry
  console.warn(error);
}
