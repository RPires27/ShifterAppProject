import {StyleSheet, Text, View, Linking, SafeAreaView} from 'react-native';
import React from 'react';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {useNavigation} from '@react-navigation/native';

const Sobre = () => {
  const nav = useNavigation();
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.defTxt}>Sobre</Text>

      <Icon
        name="arrow-left-circle"
        style={styles.icon}
        onPress={() => {
          nav.navigate('Settings');
        }}></Icon>

      <Text style={styles.txt}>
        Projeto desenvolvido na disciplina de Programação para Dispositivos
        Móveis III.
      </Text>
      <Text style={styles.txt}>Feito por Rodrigo Pires.</Text>

      <Icon
        name="github"
        style={styles.git}
        onPress={() => {
          Linking.openURL('https://github.com/RPires27/ShifterAppProject');
        }}></Icon>
    </SafeAreaView>
  );
};

export default Sobre;

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

  txt: {
    color: 'black',
    fontFamily: 'Quicksand-Regular',
    fontSize: 30,
    padding: 20,
  },
  git: {
    fontSize: 60,
    alignSelf: 'center',
    color: 'black',
    marginTop: 50,
  },

  icon: {
    color: 'black',
    fontSize: 40,
    position: 'absolute',
    top: 25,
    right: 25,
  },
});
