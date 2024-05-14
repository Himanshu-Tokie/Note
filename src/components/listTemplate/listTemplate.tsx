import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View, useWindowDimensions } from 'react-native';
import RenderHTML from 'react-native-render-html';
import { RFValue } from 'react-native-responsive-fontsize';
import { screenConstant } from '../../constants';

export default function ListTemplate({ note, nav, maxHeight,label }) {
  console.log(note,8989);
  const source = {
    html: note.data
    };
    const {width: contentWidth} = useWindowDimensions();
  return (
    <>
    {!label &&
      <TouchableOpacity
      onPress={() => 
        nav.navigate(screenConstant.Note, { note })
      }
      style={[styles.touch, { maxHeight }]}>
      <View style={styles.container}>
        <Text style={styles.title}>{note.title}</Text>
        <RenderHTML source={source}
        contentWidth={contentWidth}/>
      </View>
    </TouchableOpacity>}
    {label &&
    <View style={styles.container}>
    <Text style={styles.title}>{note.id}</Text>
  </View>
    }
        </>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    borderRadius: 18,
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
    paddingBottom: 4,
    color: 'rgb(9,9,10)'
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
