import {Button, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import auth from '@react-native-firebase/auth';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {useNavigation} from '@react-navigation/native';

const Settings = () => {
  const nav = useNavigation();
  const SignOut = () => {
    auth()
      .signOut()
      .then(() => console.log('User signed out!'));
  };
  return (
    <View style={styles.container}>
      <Text style={styles.defTxt}>Definições</Text>
      <TouchableOpacity style={styles.botaoContainer} onPress={SignOut}>
        <Text style={styles.botaotxt}>Logout</Text>
        <Icon name="logout" style={styles.icon}></Icon>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.botaoContainer, {marginTop: 100}]}
        onPress={() => nav.navigate('Sobre')}>
        <Text style={styles.botaotxt}>Sobre</Text>
        <Icon name="information-outline" style={styles.icon}></Icon>
      </TouchableOpacity>
    </View>
  );
};

export default Settings;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#EEC373',
  },

  defTxt: {
    color: 'black',
    fontFamily: 'Quicksand-Bold',
    fontSize: 30,
    position: 'absolute',
    top: 25,
    left: 25,
  },

  botaoContainer: {
    width: '80%',
    height: 60,
    backgroundColor: '#F4DFBA',
    borderRadius: 20,
    position: 'absolute',
    top: 100,
    justifyContent: 'center',
  },

  botaotxt: {
    color: 'black',
    fontFamily: 'Quicksand-Regular',
    fontSize: 30,
    position: 'absolute',
    left: 20,
  },
  icon: {
    color: 'black',
    fontSize: 40,
    position: 'absolute',
    right: 10,
  },
});
