import {
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import TaskCard from '../components/TaskCard';

const UserProfile = ({route, navigation}) => {
  const {nome, id, email} = route.params;
  return (
    <SafeAreaView style={styles.container}>
      <View style={{flexDirection: 'row'}}>
        <Text style={styles.title}>Perfil</Text>
        <Icon
          name="arrow-left-circle"
          size={40}
          color={'black'}
          style={{alignSelf: 'center', position: 'absolute', right: 20}}
          onPress={() => {
            navigation.navigate('Home');
          }}></Icon>
      </View>

      <View style={{margin: 20}}>
        <Text style={styles.txt}>Nome : {nome}</Text>
        <Text style={styles.txt}>Email : {email}</Text>
        <Text style={styles.txt}>ID : {id}</Text>
      </View>

      <View>
        <TaskCard></TaskCard>
      </View>

      <TouchableOpacity
        style={styles.addButton}
        onPress={() => {
          navigation.navigate('AddTask', {nome, email, id});
        }}>
        <Text
          style={{
            color: 'white',
            fontFamily: 'Quicksand-SemiBold',
            padding: 10,
          }}>
          Adicionar Tarefa
        </Text>
        <Icon name="plus" size={70} color={'white'}></Icon>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default UserProfile;

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

  txt: {
    color: 'black',
    fontFamily: 'Quicksand-SemiBold',
    fontSize: 19,
  },

  addButton: {
    flexDirection: 'row',
    backgroundColor: '#876445',
    borderRadius: 35,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    bottom: 20,
    right: 20,
  },
});
