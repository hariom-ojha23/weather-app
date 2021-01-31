import React from 'react';
import Main from './assets/components/Main';
import { NavigationContainer } from '@react-navigation/native';



export default function App({navigation}) {
    return (
      <NavigationContainer>
        <Main />
      </NavigationContainer>
  );
}
