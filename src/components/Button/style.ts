/* button */

import { StyleSheet } from 'react-native';
import {
    heightPercentageToDP,
    widthPercentageToDP,
} from 'react-native-responsive-screen';

export const styles = StyleSheet.create({
  container: {
    borderRadius: 50,
    backgroundColor: 'rgb(107,78,255)',
    width: widthPercentageToDP('82%'),
    padding: widthPercentageToDP('4%'),
    marginTop: heightPercentageToDP('5.5%'),
  },
  text: {
    color: 'white',
    textAlign: 'center',
    fontSize: heightPercentageToDP('2%'),
    fontWeight: 'bold',
  },
});
