import {
  StyleSheet,
  Text,
  TextInput,
  View,
  SafeAreaView,
  KeyboardAvoidingView,
  TouchableOpacity,
} from 'react-native';
import React, {useState} from 'react';
import auth from '@react-native-firebase/auth';
import {useNavigation} from '@react-navigation/native';
import Toast from 'react-native-toast-message';

const Login = () => {
  const [email, setemail] = useState('');
  const [pass, setpass] = useState('');

  const HandleLogin = () => {
    if (email && pass) {
      auth()
        .signInWithEmailAndPassword(email, pass)
        .then(() => {
          Toast.show({
            type: 'success',
            text1: 'Entrou com sucesso!',
            position: 'bottom',
          });
        })
        .catch(error => {
          if (error.code === 'auth/invalid-email') {
            Toast.show({
              type: 'error',
              text1: 'Email Inválido',
              text2: 'Verifica se digitaste bem o email!',
              position: 'bottom',
            });
          }

          if (error.code === 'auth/wrong-password') {
            Toast.show({
              type: 'error',
              text1: 'Password Errada',
              text2: 'Verifica se digitaste bem a password!',
              position: 'bottom',
            });
          }

          if (error.code === 'auth/user-not-found') {
            Toast.show({
              type: 'error',
              text1: 'Utilizador não encontrado',
              text2: 'Este utilizador não existe',
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

  const nav = useNavigation();

  return (
    <KeyboardAvoidingView style={styles.container}>
      <Text style={styles.title}>Shifter App</Text>
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

      <TouchableOpacity onPress={HandleLogin} style={styles.loginBtt}>
        <Text style={styles.logintxt}>Login</Text>
      </TouchableOpacity>

      <Text
        style={{
          fontSize: 20,
          color: 'black',
          marginTop: 20,
          fontFamily: 'Quicksand-SemiBold',
        }}>
        Sem conta?{' '}
        <Text
          onPress={() => nav.navigate('Register')}
          style={{color: '#0d61d6'}}>
          Registar
        </Text>
      </Text>
    </KeyboardAvoidingView>
  );
};

export default Login;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#EEC373',
  },

  title: {
    color: 'black',
    fontSize: 45,
    position: 'relative',
    top: -75,
    fontFamily: 'Quicksand-Bold',
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
});
