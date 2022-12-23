import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import BouncyCheckbox from 'react-native-bouncy-checkbox';

const TaskCard = ({title, done}) => {
  return (
    <TouchableOpacity style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      <View
        style={{
          marginHorizontal: 10,
          alignItems: 'center',
        }}>
        <Text
          style={{
            color: 'black',
            fontFamily: 'Quicksand-SemiBold',
            fontSize: 15,
          }}>
          Concluido:
        </Text>
        <BouncyCheckbox
          isChecked={done}
          disableBuiltInState
          fillColor="black"
          disableText
          style={{marginTop: 10}}
        />
      </View>
    </TouchableOpacity>
  );
};

export default TaskCard;

const styles = StyleSheet.create({
  container: {
    width: '90%',
    flexDirection: 'row',
    alignSelf: 'center',
    height: 80,
    borderRadius: 10,
    borderWidth: 3,
    margin: 10,
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  title: {
    padding: 10,
    color: 'black',
    fontFamily: 'Quicksand-SemiBold',
    fontSize: 20,
  },
});
