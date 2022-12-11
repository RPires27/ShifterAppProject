import {Button, FlatList, StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import TaskModal from '../components/TaskModal';

const Home = () => {
  const [user, setUser] = useState(); //User logado
  const [todos, settodos] = useState([]); //Outros users
  const [isModalOpen, setisModalOpen] = useState(false);
  const [date, setDate] = useState('');

  // Buscar user logado
  useEffect(() => {
    firestore()
      .collection('users')
      .doc(auth().currentUser.uid)
      .get()
      .then(user => setUser(user.data()));
  }, []);

  // Buscar trabalhadores/admins
  useEffect(() => {
    if (user) {
      firestore()
        .collection('users')
        .where('admin', '==', user?.admin === false ? true : false)
        .onSnapshot(users => {
          if (!users.empty) {
            const USERS = [];
            users.forEach(user => {
              USERS.push(user.data());
            });

            settodos(USERS);
          }
        });
    }
  }, [user]);

  const AbrirModal = () => {
    setisModalOpen(true);
  };

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
        <View style={{alignItems: 'center'}}>
          <FlatList
            data={todos}
            renderItem={({item}) => (
              <View>
                <Text style={styles.lista}>{item.nome}</Text>
              </View>
            )}
            keyExtractor={(item, index) => index.toString()}
          />
          <TaskModal
            modalVisible={isModalOpen}
            setmodalVisible={setisModalOpen}></TaskModal>
          <Button title="ohh" onPress={AbrirModal}></Button>
        </View>
      </View>
    );
  } else if (user.admin === false) {
    return (
      <View style={styles.container}>
        <Text style={styles.text}>Olá {user.nome}! És trabalhador</Text>

        <View style={{alignItems: 'center'}}>
          <FlatList
            data={todos}
            renderItem={({item}) => (
              <Text style={styles.lista}>{item.nome}</Text>
            )}
            keyExtractor={(item, index) => index.toString()}
          />
        </View>
      </View>
    );
  }
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
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

  lista: {
    color: 'black',
    fontFamily: 'Quicksand-Regular',
    fontSize: 30,
  },
});
