import { StyleSheet } from 'react-native';
import { heightPercentageToDP, widthPercentageToDP } from 'react-native-responsive-screen';
import { COLORS } from '../../constants/colors';

export const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.BACKGROUND,
    flex: 1,
    paddingHorizontal: widthPercentageToDP('4%'),
    paddingBottom: heightPercentageToDP('8.5%'),
    // paddingBottom:100
  },
  subcontainer: {
    paddingTop: heightPercentageToDP('5%'),
    paddingBottom: heightPercentageToDP('8.5%'),
    // flex:1
  },
  welcome: {
    color: COLORS.TEXT3,
    fontFamily: 'Nunito',
    paddingBottom: heightPercentageToDP('0.25%'),
    fontWeight:'600'
  },
  NoteTaking: {
    fontWeight: 'bold',
    fontFamily: 'Nunito',
    fontSize: heightPercentageToDP('3%'),
    color:COLORS.TEXT1
  },
  header: {
    paddingHorizontal: heightPercentageToDP('2%'),
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  innerHeader: {
    flexDirection: 'row',
  },
  labels: {
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontFamily: 'Nunito',
    color: 'white',
    fontSize: heightPercentageToDP('2.4%'),
    fontWeight: '800',
  },
  image: {
    justifyContent: 'center',
    alignItems: 'center',
    width: widthPercentageToDP('91.3%'),
    height: heightPercentageToDP('19%'),
  },
  imageContainer: {
    paddingHorizontal: widthPercentageToDP('4.1%'),
    paddingTop: heightPercentageToDP('3.5%'),
    paddingBottom:heightPercentageToDP('3%')
  },
  size: {
    fontSize: heightPercentageToDP('1.5%'),
    color: COLORS.HOMESIZE,
    fontWeight: 'bold',
  },
  imageInner: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center',
    paddingBottom: heightPercentageToDP('3.5%'),
  },
});
