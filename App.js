import React from 'react';
import { PetProvider } from './src/context/PetContext';
import AppNavigator from './src/navigation/AppNavigator';

export default function App() {
  return (
    <PetProvider>
      <AppNavigator />
    </PetProvider>
  );
}