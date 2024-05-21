import { StyleSheet } from 'react-native';
import { heightPercentageToDP } from 'react-native-responsive-screen';
import { COLORS } from '../../constants/colors';
//  login
export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.BACKGROUND,
  },
  subContainer: {
    paddingTop: heightPercentageToDP('4'),
    alignItems: 'center',
  },

  colorText: {
    color: COLORS.BACKGROUND1,
    fontWeight:'bold',
    paddingBottom:heightPercentageToDP('1%')
  },
  button:{
    alignContent:'center',
    alignItems:'center',
    justifyContent:'center'
    // maxWidth: 
  },
  error:{
    color:'red',
    fontStyle:'italic',
    fontSize:heightPercentageToDP('1.8'),
    fontWeight:'bold'
  },
  errorContainer:{
    justifyContent: 'center',
    alignItems:'center',
    paddingTop:heightPercentageToDP('5')
  }
});
