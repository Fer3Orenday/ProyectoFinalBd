/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import { AuthProvider } from './src/context/AuthContext/AuthContext';
import { RootStackNavigation } from './src/navigation/RootStackNavigation';

const AppState = ({ children }: any) => {
  return (
    <AuthProvider>
      {children}
    </AuthProvider>
  );
}

const App = () => {
  return (
    <AppState>
      <RootStackNavigation />
    </AppState>
  );
}

export default App;
