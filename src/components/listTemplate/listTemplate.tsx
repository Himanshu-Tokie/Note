import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import { screenConstant } from '../../constants';

export default function ListTemplate({ note, nav, maxHeight }) {
  return (
    <TouchableOpacity
      onPress={() => nav.navigate(screenConstant.Note, { note })}
      style={[styles.touch, { maxHeight }]}>
      <View style={styles.container}>
        <Text style={styles.title}>{note.title}</Text>
        <Text style={styles.data}>{note.data}</Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    borderRadius: 15,
    marginHorizontal: 8,
    marginBottom: 8,
    padding: 12,
    alignContent: 'center',
    justifyContent: 'center',
    shadowColor: 'rgb(153,144,255)',
    shadowOffset: { width: -2, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
  title: {
    fontWeight: 'bold',
    fontFamily: 'Nunito',
    fontSize: RFValue(12),
    color: 'black',
    paddingBottom: 4,
  },
  data: {
    fontFamily: 'Nunito',
    fontSize: RFValue(10),
    color: 'rgb(42,34,81)',
  },
  touch: {
    flex: 1,
  },
});
