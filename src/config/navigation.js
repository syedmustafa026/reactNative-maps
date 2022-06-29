import React, { useState, useEffect } from 'react';
import { NavigationContainer,DarkTheme,DefaultTheme } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Signup from '../screens/signup';
import Signin from '../screens/signin';
import Home from '../screens/home';
import Maps from '../screens/map'
import { Provider } from 'react-redux';
import { Store } from '../redux/store';
import { EventRegister } from 'react-native-event-listeners';
import themecontext from './themeContext';
import theme from './theme';
const Stack = createNativeStackNavigator();
function Navigation() {
  const [mode, setMode] = useState(false)
  useEffect(() => {
    let eventlistner = EventRegister.addEventListener(
      "Changetheme", (data) => {
        setMode(data)
      })
    return () => {
      EventRegister.removeEventListener(eventlistner)
    }

  });

  return (
    <themecontext.Provider value={mode === true ? theme.dark : theme.light}>
    <Provider store={Store} >
      <NavigationContainer theme={ mode === true ? DarkTheme : DefaultTheme}>
        <Stack.Navigator initialRouteName="Home" screenOptions={{ headerShown: false }}>
          <Stack.Screen name="Home" component={Home} />
          <Stack.Screen name="Signup" component={Signup} />
          <Stack.Screen name="Signin" component={Signin} />
          <Stack.Screen name="Maps" component={Maps} />

        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
    </themecontext.Provider>
  );
}

export default Navigation;