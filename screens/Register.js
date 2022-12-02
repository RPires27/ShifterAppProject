import {
  KeyboardAvoidingView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState} from 'react';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import Toast from 'react-native-toast-message';
import {useNavigation} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const Register = () => {
  const [email, setemail] = useState('');
  const [pass, setpass] = useState('');
  const [nome, setnome] = useState('');
  const [isAdmin, setIsAdmin] = useState(false);

  const nav = useNavigation();

  const HandleRegister = () => {
    if (email && pass && nome) {
      auth()
        .createUserWithEmailAndPassword(email, pass)
        .then(() => {
          firestore().collection('users').doc(auth().currentUser.uid).set({
            nome: nome,
            email: email,
            admin: isAdmin,
          });
        })

        .catch(error => {
          if (error.code === 'auth/email-already-in-use') {
            Toast.show({
              type: 'error',
              text1: 'Email já em uso',
              text2: 'Este email ja está registado',
              position: 'bottom',
            });
          }

          if (error.code === 'auth/invalid-email') {
            Toast.show({
              type: 'error',
              text1: 'Email Inválido',
              text2: 'Esse email não é válido',
              position: 'bottom',
            });
          }

          if (error.code === 'auth/weak-password') {
            Toast.show({
              type: 'error',
              text1: 'Password fraca',
              text2: 'Usa uma password mais segura',
              position: 'bottom',
            });
          }
        });
    } else {
      Toast.show({
        type: 'error',
        text1: 'Sem dados',
        text2: 'Certifica-te que colocaste dados em todos os campos',
        position: 'bottom',
      });
    }
  };

  return (
    <KeyboardAvoidingView style={styles.container}>
      <Icon
        name="arrow-left-circle"
        style={styles.icon}
        onPress={() => {
          nav.navigate('Login');
        }}></Icon>
      <Text style={styles.title}>Criar Conta</Text>
      <View style={styles.boxView}>
        <TextInput
          value={nome}
          onChangeText={setnome}
          placeholder="Nome"
          style={styles.textinput}></TextInput>
      </View>
      <View style={styles.boxView}>
        <TextInput
          value={email}
          onChangeText={setemail}
          placeholder="Email"
          style={styles.textinput}
          keyboardType="email-address"
          autoCapitalize="none"></TextInput>
      </View>

      <View style={styles.boxView}>
        <TextInput
          value={pass}
          onChangeText={setpass}
          placeholder="Password"
          secureTextEntry
          style={styles.textinput}></TextInput>
      </View>

      <TouchableOpacity onPress={HandleRegister} style={styles.loginBtt}>
        <Text style={styles.logintxt}>Criar conta</Text>
      </TouchableOpacity>
    </KeyboardAvoidingView>
  );
};

export default Register;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#EEC373',
  },
  title: {
    color: 'black',
    fontFamily: 'Quicksand-Bold',
    fontSize: 40,
    position: 'relative',
    top: -75,
  },

  boxView: {
    justifyContent: 'center',
    backgroundColor: '#CA965C',
    width: '80%',
    height: 75,
    borderRadius: 20,
    borderColor: '#876445',
    borderWidth: 5,
    marginTop: 10,
  },

  textinput: {
    fontSize: 20,
    fontFamily: 'Quicksand-Regular',
  },

  loginBtt: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#876445',
    width: '50%',
    height: 75,
    borderRadius: 20,
    marginTop: 15,
    borderColor: '#CA965C',
    borderWidth: 5,
  },

  logintxt: {
    color: 'white',
    fontSize: 30,
    fontFamily: 'Quicksand-Bold',
  },

  icon: {
    fontSize: 40,
    color: 'black',
    position: 'absolute',
    top: 20,
    left: 20,
  },
});
