import React, { useState, useEffect } from 'react';
import { NavigationContainer, DarkTheme, DefaultTheme } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Signup from '../screens/signup';
import Signin from '../screens/signin';
import Home from '../screens/home';
import Maps from '../screens/map'

import { EventRegister } from 'react-native-event-listeners';
import themecontext from './themeContext';
import theme from './theme';
import Message from '../screens/message';
import Users from '../screens/users';

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
        <NavigationContainer theme={mode === true ? DarkTheme : DefaultTheme}>
          <Stack.Navigator initialRouteName="Users" screenOptions={{ headerShown: false }}>
            {/* <Stack.Screen name="Home" component={Home} />
            <Stack.Screen name="Signup" component={Signup} />
            <Stack.Screen name="Signin" component={Signin} />
            <Stack.Screen name="Maps" component={Maps} />
            <Stack.Screen name="API" component={API} /> */}
            <Stack.Screen name="Message" component={Message} />
            <Stack.Screen name="Users" component={Users} />

          </Stack.Navigator>
        </NavigationContainer>
  );
}

export default Navigation;