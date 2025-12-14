import { NavigationContainer } from '@react-navigation/native';
import React from 'react';
import { useAppSelector } from '../hooks/hooks';
import AppNavigator from './AppNavigator';
import AuthNavigator from './AuthNavigator';
export default function RootNavigator() {
  const user = useAppSelector(state => state.auth.user);
  return (
    <NavigationContainer>
      {user ? <AppNavigator /> : <AuthNavigator />}
    </NavigationContainer>
  );
}
