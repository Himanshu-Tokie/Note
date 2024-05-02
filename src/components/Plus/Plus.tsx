// import React from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { ICONS } from '../../constants/Icons';

export default function Plus({onPress}) {
  return (
    <>
      <TouchableOpacity onPress={onPress}>
        <View style={styles.container}>
          {ICONS.ADD(32,32)}
        </View>
      </TouchableOpacity>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    // height: 150,
    // width: 150,
    backgroundColor:'rgb(107,78,255)',
    position:'absolute',
    bottom:14,
    padding:5,
    borderRadius:8,
    // right:2,
    left:-22,shadowColor: 'rgb(153,144,255)',
    shadowOffset: {width: 0, height: 12},
    shadowOpacity: 0.2,
    shadowRadius: 3,
    // margin: 20,
    // alignItems: 'center',
    // justifyContent: 'center',
  },
});
