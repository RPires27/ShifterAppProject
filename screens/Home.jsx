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
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {useNavigation} from '@react-navigation/native';
import {useSelector} from 'react-redux';

const Home = () => {
  const [todos, settodos] = useState([]); //Outros users
  const nav = useNavigation();

  const curUser = useSelector(state => state.currentUser);

  // Buscar trabalhadores/admins
  useEffect(() => {
    firestore()
      .collection('users')
      .where('admin', '==', curUser.role === false ? true : false)
      .onSnapshot(users => {
        if (!users.empty) {
          const USERS = [];
          users.forEach(user => {
            USERS.push(user.data());
          });

          settodos(USERS);
        }
      });
  }, [curUser]);

  if (curUser.role === true) {
    return (
      <SafeAreaView style={styles.container}>
        <View>
          <Text style={styles.title}>Olá {curUser.name}!</Text>
          <Text style={styles.subtitle}>Lista de trabalhadores:</Text>
        </View>

        <View style={{marginLeft: 20}}>
          <FlatList
            data={todos}
            renderItem={({item}) => (
              <View>
                <Text style={styles.lista}>{item.nome}</Text>
              </View>
            )}
            keyExtractor={(item, index) => index.toString()}
          />
        </View>

        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            nav.navigate('AddTask');
          }}>
          <Icon name="plus" size={60} color={'white'}></Icon>
        </TouchableOpacity>
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
            data={todos}
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
  },

  button: {
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: '#876445',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    right: 30,
    bottom: 120,
  },
});
