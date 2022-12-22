import {
  FlatList,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import firestore from '@react-native-firebase/firestore';
import {useDispatch, useSelector} from 'react-redux';
import {addUsersList, clearUsers} from '../reducers/usersListSlice';

const Home = ({navigation}) => {
  const dispatch = useDispatch();

  const curUser = useSelector(state => state.currentUser);
  const allUser = useSelector(state => state.allUsersList.users);

  // Buscar trabalhadores/admins
  useEffect(() => {
    firestore()
      .collection('users')
      .where('admin', '==', curUser.role === false ? true : false)
      .onSnapshot(users => {
        if (!users.empty) {
          dispatch(clearUsers());
          users.forEach(user => {
            dispatch(addUsersList(user.data()));
          });
        }
      });
  }, [curUser]);

  if (curUser.role === null) {
    return (
      <View
        style={{
          flex: 1,
          backgroundColor: '#EEC373',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Text style={styles.title}>A carregar...</Text>
      </View>
    );
  }

  if (curUser.role === true) {
    return (
      <SafeAreaView style={styles.container}>
        <View>
          <Text style={styles.title}>Olá {curUser.name}!</Text>
          <Text style={styles.subtitle}>Lista de trabalhadores:</Text>
        </View>

        <View style={{marginLeft: 20, marginRight: 20}}>
          <FlatList
            data={allUser}
            renderItem={({item}) => (
              <View style={styles.namesContainer}>
                <TouchableOpacity
                  onPress={() => {
                    navigation.navigate('UserProfile', {
                      id: item.id,
                      nome: item.nome,
                      email: item.email,
                    });
                  }}>
                  <Text style={styles.lista}>{item.nome}</Text>
                </TouchableOpacity>
              </View>
            )}
            keyExtractor={(item, index) => index.toString()}
          />
        </View>
      </SafeAreaView>
    );
  } else if (curUser.role === false) {
    return (
      <SafeAreaView style={styles.container}>
        <View>
          <Text style={styles.title}>Olá {curUser.name}!</Text>
          <Text style={styles.subtitle}>Lista de admins:</Text>
        </View>
        <View style={{marginLeft: 20}}>
          <FlatList
            data={allUser}
            nestedScrollEnabled
            renderItem={({item}) => (
              <View>
                <Text style={styles.lista}>{item.nome}</Text>
              </View>
            )}
            keyExtractor={(item, index) => index.toString()}
          />
        </View>
      </SafeAreaView>
    );
  }
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#EEC373',
  },

  title: {
    color: 'black',
    fontFamily: 'Quicksand-Bold',
    fontSize: 30,
    margin: 20,
  },
  subtitle: {
    color: 'black',
    fontFamily: 'Quicksand-Medium',
    fontSize: 30,
    marginLeft: 20,
    marginBottom: 20,
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
    padding: 3,
  },

  namesContainer: {
    borderWidth: 3,
    marginTop: 20,
    borderRadius: 10,
    borderColor: '#876445',
  },
});
