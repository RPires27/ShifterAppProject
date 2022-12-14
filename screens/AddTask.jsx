import {SafeAreaView, StyleSheet, Text, TextInput, View} from 'react-native';
import React from 'react';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {useNavigation} from '@react-navigation/native';

const AddTask = () => {
  const nav = useNavigation();
  return (
    <SafeAreaView style={styles.container}>
      <View style={{flexDirection: 'row'}}>
        <Text style={styles.title}>Adicionar Tarefa</Text>
        <Icon
          name="arrow-left-circle"
          size={40}
          color={'black'}
          style={{alignSelf: 'center', marginLeft: 40}}
          onPress={() => {
            nav.navigate('Home');
          }}></Icon>
      </View>

      <View style={styles.descricaoBox}>
        <TextInput
          placeholder="Descrição"
          style={styles.descricaoTxt}
          multiline></TextInput>
      </View>
    </SafeAreaView>
  );
};

export default AddTask;

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

  descricaoBox: {
    backgroundColor: '#CA965C',
    width: '80%',
    height: 120,
    borderRadius: 10,
    alignSelf: 'center',
    marginTop: 20,
    borderColor: '#876445',
    borderWidth: 3,
  },

  descricaoTxt: {
    color: 'white',
    padding: 10,
    fontSize: 20,
    fontFamily: 'Quicksand-Regular',
  },
});
