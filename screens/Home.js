import {Button, StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

const Home = () => {
  const [user, setUser] = useState();

  useEffect(() => {
    const subscriber = firestore()
      .collection('users')
      .where('email', '==', auth().currentUser.email)
      .onSnapshot(querySnapshot => {
        const users = querySnapshot.docs.map(doc => doc.data());
        setUser(users[0]);
      });

    // Unsubscribe from events when no longer in use
    return () => subscriber();
  }, []);

  if (!user) {
    return (
      <View style={styles.container}>
        <Text style={styles.loading}>A carregar...</Text>
      </View>
    );
  }

  if (user.admin === true) {
    return (
      <View style={styles.container}>
        <Text style={styles.text}>Olá {user.nome}! És admin</Text>
      </View>
    );
  } else if (user.admin === false) {
    return (
      <View style={styles.container}>
        <Text style={styles.text}>Olá {user.nome}! És trabalhador</Text>
      </View>
    );
  }
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
    top: 25,
    left: 25,
  },

  loading: {
    color: 'black',
    fontFamily: 'Quicksand-Bold',
    fontSize: 30,
  },
});
