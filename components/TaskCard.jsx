import {StyleSheet, Text, View} from 'react-native';
import React from 'react';

const TaskCard = ({title}) => {
  return (
    <View>
      <Text>{title}</Text>
    </View>
  );
};

export default TaskCard;

const styles = StyleSheet.create({});
