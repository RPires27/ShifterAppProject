import {
  Button,
  Platform,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState} from 'react';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {useNavigation} from '@react-navigation/native';
import firestore from '@react-native-firebase/firestore';
import DateTimePicker from '@react-native-community/datetimepicker';
import Toast from 'react-native-toast-message';

const AddTask = ({route, navigation}) => {
  const nav = useNavigation();
  const [descricao, setdescricao] = useState('');
  const [titulo, settitulo] = useState('');
  const [date, setdate] = useState(new Date());
  const [mode, setmode] = useState('date');
  const [shown, setShown] = useState(false);
  const [texto_tempo, setTexto_tempo] = useState('Sem horas');
  const [txt_data, settxt_data] = useState('Sem data');
  const {nome, id} = route.params;

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShown(Platform.OS === 'ios');
    setdate(currentDate);
    let tempdate = new Date(currentDate);
    let fDate =
      tempdate.getDate() +
      '/' +
      (tempdate.getMonth() + 1) +
      '/' +
      tempdate.getFullYear();
    let fTime =
      tempdate.getHours() +
      'h:' +
      (tempdate.getMinutes() < 10 ? '0' : '') +
      tempdate.getMinutes() +
      'm';

    setTexto_tempo(fTime);
    settxt_data(fDate);
  };

  const ShowMode = currentMode => {
    setShown(true);
    setmode(currentMode);
  };

  const AdicionarTask = () => {
    if (titulo && descricao && date) {
      firestore()
        .collection('users')
        .doc(id)
        .collection('tasks')
        .doc(titulo)
        .set({
          descricao: descricao,
          tempo: date,
          isDone: false,
        });

      navigation.navigate('Home');
      Toast.show({
        type: 'success',
        text1: 'Tarefa criada com sucesso',
        position: 'bottom',
      });
    } else {
      Toast.show({
        type: 'error',
        text1: 'Falha ao criar tarefa',
        text2: 'Mete dados em todos os campos',
        position: 'bottom',
      });
    }
  };

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
            nav.goBack();
          }}></Icon>
      </View>

      <Text style={styles.subtitle}>Trabalhador/a: {nome}</Text>

      <View style={[styles.descricaoBox, {height: 60}]}>
        <TextInput
          value={titulo}
          onChangeText={settitulo}
          placeholder="Titulo"
          style={styles.descricaoTxt}
          maxLength={20}></TextInput>
      </View>

      <View style={styles.descricaoBox}>
        <TextInput
          value={descricao}
          onChangeText={setdescricao}
          placeholder="Descrição"
          style={styles.descricaoTxt}
          multiline
          maxLength={80}></TextInput>

        <Text style={{position: 'absolute', bottom: 2, right: 3}}>
          {descricao.length}/80
        </Text>
      </View>

      <Text style={[styles.subtitle, {marginTop: 20}]}>Realizar até:</Text>

      <View style={{marginTop: 20, flexDirection: 'row'}}>
        <Text style={styles.subtitle}>Data: </Text>

        <View style={styles.date}>
          <Text style={styles.date_txt}>{txt_data}</Text>
        </View>

        <Icon
          name="calendar"
          size={40}
          color={'black'}
          style={{alignSelf: 'center'}}
          onPress={() => ShowMode('date')}></Icon>
      </View>

      <View style={{marginTop: 20, flexDirection: 'row'}}>
        <Text style={styles.subtitle}>Hora: </Text>

        <View style={styles.date}>
          <Text style={styles.date_txt}>{texto_tempo}</Text>
        </View>

        <Icon
          name="clock"
          size={40}
          color={'black'}
          style={{alignSelf: 'center'}}
          onPress={() => ShowMode('time')}></Icon>
      </View>

      <TouchableOpacity
        style={{
          backgroundColor: '#876445',
          width: 80,
          height: 80,
          borderRadius: 50,
          alignSelf: 'center',
          top: 100,
          justifyContent: 'center',
        }}
        onPress={AdicionarTask}>
        <Icon
          name="plus"
          size={70}
          color={'white'}
          style={{alignSelf: 'center'}}></Icon>
      </TouchableOpacity>

      {shown && (
        <DateTimePicker
          value={date}
          mode={mode}
          is24Hour={true}
          display="default"
          onChange={onChange}
          minimumDate={new Date()}></DateTimePicker>
      )}
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

  subtitle: {
    color: 'black',
    fontFamily: 'Quicksand-SemiBold',
    fontSize: 25,
    marginLeft: 20,
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
  date: {
    height: '90%',
    width: '45%',
    alignSelf: 'center',
    borderRadius: 10,
    borderColor: '#876445',
    borderWidth: 3,
    alignItems: 'center',
  },

  date_txt: {
    color: 'black',
    fontSize: 25,
    top: -3,
    fontFamily: 'Quicksand-SemiBold',
  },
});
