import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    backgroundColor: 'rgb(249, 248, 253)',
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
  },
  textBold: {
    fontWeight: 'bold',
    paddingTop: 40,
  },
});
