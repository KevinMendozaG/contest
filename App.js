import React from 'react';
import { LogBox } from 'react-native';

LogBox.ignoreLogs(['Setting a timer']);
import Navigation from './navigation/Navigation';

export default function App() {
  return (
    <Navigation/>
  )
}
