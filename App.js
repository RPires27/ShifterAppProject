import React, {useEffect, useState} from 'react';
import auth from '@react-native-firebase/auth';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {NavigationContainer} from '@react-navigation/native';
import Login from './screens/Login';
import Register from './screens/Register';
import Toast from 'react-native-toast-message';
import BottomTabNavigator from './navigator/BottomTabNavigator';
import Sobre from './screens/Sobre';

function App() {
  const Stack = createNativeStackNavigator();

  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState();

  // Handle user state changes
  function onAuthStateChanged(user) {
    setUser(user);
    if (initializing) setInitializing(false);
  }

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber; // unsubscribe on unmount
  }, []);

  if (initializing) return null;

  return (
    <NavigationContainer>
      <Stack.Navigator>
        {user ? (
          <>
            <Stack.Screen
              name="Tabs"
              component={BottomTabNavigator}
              options={{headerShown: false}}></Stack.Screen>
            <Stack.Screen
              name="Sobre"
              component={Sobre}
              options={{headerShown: false}}></Stack.Screen>
          </>
        ) : (
          <>
            <Stack.Screen
              name="Login"
              component={Login}
              options={{headerShown: false}}
            />
            <Stack.Screen
              name="Register"
              component={Register}
              options={{headerShown: false}}
            />
          </>
        )}
      </Stack.Navigator>
      <Toast></Toast>
    </NavigationContainer>
  );
}

export default App;
