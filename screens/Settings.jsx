import {
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import auth from '@react-native-firebase/auth';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {useNavigation} from '@react-navigation/native';
import {useDispatch} from 'react-redux';
import {clearUser} from '../reducers/userSlice';

const Settings = () => {
  const nav = useNavigation();
  const dispatch = useDispatch();
  const SignOut = () => {
    auth()
      .signOut()
      .then(() => dispatch(clearUser()));
  };
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.defTxt}>Definições</Text>
      <View>
        <TouchableOpacity style={styles.botaoContainer} onPress={SignOut}>
          <Text style={styles.botaotxt}>Logout</Text>
          <Icon name="logout" style={styles.icon}></Icon>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.botaoContainer]}
          onPress={() => nav.navigate('Sobre')}>
          <Text style={styles.botaotxt}>Sobre</Text>
          <Icon name="information-outline" style={styles.icon}></Icon>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default Settings;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#EEC373',
  },

  defTxt: {
    color: 'black',
    fontFamily: 'Quicksand-Bold',
    fontSize: 30,
    margin: 20,
  },

  botaoContainer: {
    width: '80%',
    height: 60,
    backgroundColor: '#F4DFBA',
    borderRadius: 20,
    justifyContent: 'center',
    alignSelf: 'center',
    marginTop: 30,
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
