import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { screenConstant } from '../../constants';

export default function ListTemplate({note, nav}) {
  return (
    <>
      <TouchableOpacity
        onPress={() => nav.navigate(screenConstant.Note, {note})}>
        <View style={styles.container}>
          <Text>{note.title}</Text>
          <Text>{note.data}</Text>
        </View>
      </TouchableOpacity>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    // flexDirection:"row",
    backgroundColor: 'white',
    borderRadius: 15,
    marginHorizontal: 20,

    marginBottom: 8,
    padding: 8,
    alignContent: 'center',
    justifyContent: 'center',
  },
  imageView: {
    // width:
    paddingLeft: 10,
  },
  image: {
    height: 65,
    width: 65,
    borderRadius: 30,
  },
  name: {
    fontWeight: 'bold',
    fontSize: 15,
    marginBottom: 4,
  },
  text: {
    paddingLeft: 15,
    alignContent: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  phone: {
    marginBottom: 0,
  },
});
