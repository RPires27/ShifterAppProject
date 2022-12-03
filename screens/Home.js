import {Button, StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

const Home = () => {
  const [nome, setnome] = useState('');

  const SignOut = () => {
    auth()
      .signOut()
      .then(() => console.log('User signed out!'));
  };

  useEffect(() => {
    firestore()
      .collection('users')
      .doc(auth().currentUser.uid)
      .get()
      .then(snapshot => {
        if (snapshot.exists) {
          setnome(snapshot.data());
        }
      });
  });

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Olá {nome.nome}!</Text>
      <Button onPress={SignOut} title="signout"></Button>
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#EEC373',
  },

  text: {
    color: 'black',
    fontFamily: 'Quicksand-Bold',
    fontSize: 30,
    position: 'absolute',
    top: 50,
    left: 25,
  },
});
