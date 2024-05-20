import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View, useWindowDimensions } from 'react-native';
import RenderHTML from 'react-native-render-html';
import { RFValue } from 'react-native-responsive-fontsize';
import { heightPercentageToDP, widthPercentageToDP } from 'react-native-responsive-screen';
import { screenConstant } from '../../constants';
import { COLORS } from '../../constants/colors';

export default function ListTemplate({ note, nav, maxHeight,label }) {
  // console.log(note,8989);
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
    marginHorizontal: widthPercentageToDP('2%'),
    marginBottom: 8,
    padding: 12,
    alignContent: 'center',
    justifyContent: 'center',
    shadowColor: 'rgb(153,144,255)',
    shadowOffset: { width: -2, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    maxHeight:heightPercentageToDP('10%'),
    overflow:'hidden'
  },
  title: {
    fontWeight: 'bold',
    fontFamily: 'Nunito',
    fontSize: RFValue(12),
    paddingBottom: 4,
    color: COLORS.TEXT1
  },
  data: {
    fontFamily: 'Nunito',
    fontSize: RFValue(10),
    color: COLORS.NOTETEXT,
    overflow:'hidden'
  },
  touch: {
    flex: 1,
  },
});
