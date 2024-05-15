/* button */

import { Platform, StyleSheet } from 'react-native';
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
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
      },
      android: {
        elevation: 4,
      },
    }),
  },
  text: {
    color: 'white',
    textAlign: 'center',
    fontSize: heightPercentageToDP('2%'),
    fontWeight: 'bold',
  },
});
