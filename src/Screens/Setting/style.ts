import { StyleSheet } from 'react-native';
import { COLORS } from '../../constants/colors';

export const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.BACKGROUND,
    flex: 1,
  },
  subContainer: {
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  view: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 15,
  },
  text: {
    fontSize: 20,
    fontFamily: 'Nunito',
    fontWeight: '400',
    color: COLORS.TEXT1
  },
  textBold: {
    fontWeight: 'bold',
    paddingTop: 40,
  },
});
