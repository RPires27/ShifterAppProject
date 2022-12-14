import React, {useEffect, useState} from 'react';
import auth from '@react-native-firebase/auth';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {NavigationContainer} from '@react-navigation/native';
import Login from './screens/Login';
import Register from './screens/Register';
import Toast from 'react-native-toast-message';
import BottomTabNavigator from './navigator/BottomTabNavigator';
import Sobre from './screens/Sobre';
import AddTask from './screens/AddTask';
import firestore from '@react-native-firebase/firestore';

import store from './store';

import {Provider, useDispatch} from 'react-redux';
import {addUser} from './reducers/userSlice';

const AppWrapper = () => {
  return (
    <Provider store={store}>
      <App />
    </Provider>
  );
};

const App = () => {
  const Stack = createNativeStackNavigator();

  const [logado, setlogado] = useState();
  const dispatch = useDispatch();

  const saveUser = user => {
    const {admin, email, nome} = user;
    dispatch(addUser({email, name: nome, role: admin}));
  };

  useEffect(() => {
    const unsubscribe = auth().onAuthStateChanged(user => {
      if (user) {
        firestore()
          .collection('users')
          .doc(auth().currentUser.uid)
          .get()
          .then(user => {
            saveUser(user.data());
          });

        setlogado(true);
      } else {
        setlogado(false);
      }
    });

    return unsubscribe;
  }, []);

  return (
    <NavigationContainer>
      <Stack.Navigator>
        {logado ? (
          <>
            <Stack.Screen
              name="Tabs"
              component={BottomTabNavigator}
              options={{headerShown: false}}></Stack.Screen>
            <Stack.Screen
              name="Sobre"
              component={Sobre}
              options={{headerShown: false}}></Stack.Screen>
            <Stack.Screen
              name="AddTask"
              component={AddTask}
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
};

export default AppWrapper;
