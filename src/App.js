import 'react-native-gesture-handler';
import * as React from 'react';
import {Provider as PaperProvider} from 'react-native-paper';
import FlashMessage from 'react-native-flash-message';

import AppNavigator from './navigation/AppNavigator';

export default function App() {
  return (
    <PaperProvider>
      <AppNavigator />
      <FlashMessage position="bottom" floating />
    </PaperProvider>
  );
}
