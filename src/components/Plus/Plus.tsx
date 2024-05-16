// import React from 'react';
import { Platform, StyleSheet, TouchableOpacity, View } from 'react-native';
import { ICONS } from '../../constants/Icons';
import { COLORS } from '../../constants/colors';

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
    backgroundColor:COLORS.BACKGROUND1,
    position:'absolute',
    bottom:14,
    padding:5,
    borderRadius:8,
    // right:2,
    left:-22,shadowColor: 'rgb(153,144,255)',
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: {width: 0, height: 2},
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
      },
      android: {
        elevation: 10,
      },
    }),
  },
});
