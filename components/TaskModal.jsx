import {Modal, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import PropTypes from 'prop-types';

const TaskModal = ({modalVisible, setmodalVisible}) => {
  const GuardarTask = () => {
    firestore()
      .collection('users')
      .doc(auth().currentUser.uid)
      .collection('tasks')
      .doc(auth().currentUser.uid)
      .set({
        descrição: 'ooo',
      });

    setmodalVisible(false);
  };

  return (
    <Modal
      animationType="fade"
      transparent
      visible={modalVisible}
      onRequestClose={() => setmodalVisible(false)}>
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <Text style={styles.titulo}>Adicionar tarefa</Text>
        </View>
      </View>
    </Modal>
  );
};

TaskModal.propTypes = {
  modalVisible: PropTypes.bool.isRequired,
  setmodalVisible: PropTypes.func.isRequired,
};

export default TaskModal;

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },

  modalView: {
    margin: 20,
    backgroundColor: '#EEC373',
    borderRadius: 20,
    borderColor: '#876445',
    borderWidth: 5,
    width: '90%',
    height: '80%',
    alignItems: 'center',
    elevation: 50,
  },
  titulo: {
    color: 'black',
    fontFamily: 'Quicksand-Bold',
    fontSize: 30,
  },
});
