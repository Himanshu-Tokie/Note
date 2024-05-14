import { StyleSheet } from 'react-native';
import { heightPercentageToDP } from 'react-native-responsive-screen';
//  login
export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgb(249, 248, 253)',
  },
  subContainer: {
    paddingTop: heightPercentageToDP('4'),
    alignItems: 'center',
  },

  colorText: {
    color: 'rgb(107,78,255)',
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
