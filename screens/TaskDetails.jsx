import {
  Button,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import BouncyCheckbox from 'react-native-bouncy-checkbox';
import firestore from '@react-native-firebase/firestore';

const TaskDetails = ({route}) => {
  const {title, done, descricao, data, id} = route.params;
  const nav = useNavigation();
  const [changesMade, setChangesMade] = useState(false);

  const [check, setcheck] = useState(done);

  const handleChange = () => {
    setChangesMade(true);
    setcheck(!check);
  };

  const handleSave = () => {
    firestore()
      .collection('users')
      .doc(id)
      .collection('tasks')
      .doc(title)
      .update({
        isDone: check,
      });
    // Save the value here
    setChangesMade(false);
  };
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View style={{flexDirection: 'row'}}>
          <Text style={styles.title}>Tarefa</Text>
          <Icon
            name="arrow-left-circle"
            size={40}
            color={'black'}
            style={{alignSelf: 'center', position: 'absolute', right: 20}}
            onPress={() => {
              nav.goBack();
            }}></Icon>
        </View>

        <View style={{margin: 20}}>
          <Text style={styles.subtitle}>Titulo:</Text>
          <Text style={styles.txt}>{title}</Text>
        </View>

        <View style={{margin: 20}}>
          <Text style={styles.subtitle}>Descrição:</Text>
          <Text style={styles.txt}>{descricao}</Text>
        </View>

        <View style={{margin: 20}}>
          <Text style={styles.subtitle}>Realizar até:</Text>
          <Text style={styles.txt}>{data}</Text>
        </View>

        <View
          style={{
            alignItems: 'center',
            marginTop: 20,
          }}>
          <Text
            style={{
              color: 'black',
              fontFamily: 'Quicksand-SemiBold',
              fontSize: 25,
            }}>
            Concluido:
          </Text>
          <BouncyCheckbox
            isChecked={check}
            disableBuiltInState
            onPress={handleChange}
            fillColor="black"
            disableText
            size={50}
            style={{marginTop: 10}}
            iconImageStyle={{height: '50%', width: '50%'}}
          />
        </View>

        {changesMade && (
          <TouchableOpacity style={styles.button}>
            <Icon
              name="content-save"
              size={50}
              color={'white'}
              onPress={handleSave}></Icon>
          </TouchableOpacity>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

export default TaskDetails;

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

  subtitle: {
    color: 'black',
    fontFamily: 'Quicksand-Medium',
    fontSize: 25,
  },
  button: {
    height: 80,
    width: 80,
    backgroundColor: '#876445',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 50,
    alignSelf: 'center',
    marginTop: 50,
  },
});
