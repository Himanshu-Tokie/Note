import { StyleSheet } from 'react-native';
import { heightPercentageToDP, widthPercentageToDP } from 'react-native-responsive-screen';

export const styles = StyleSheet.create({
  container: {
    backgroundColor: 'rgb(249, 248, 253)',
    flex: 1,
    paddingHorizontal: widthPercentageToDP('4%'),
  },
  subcontainer: {
    paddingTop: heightPercentageToDP('5%'),
    // flex:1
  },
  welcome: {
    color: 'rgb(182,176,217)',
    fontFamily: 'Nunito',
    paddingBottom: heightPercentageToDP('0.25%'),
    fontWeight:'600'
  },
  NoteTaking: {
    fontWeight: 'bold',
    fontFamily: 'Nunito',
    fontSize: heightPercentageToDP('3%'),
    color:'rgb(9,9,10)'
  },
  header: {
    paddingHorizontal: heightPercentageToDP('2%'),
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  innerHeader: {
    flexDirection: 'row',
    // borderRadius:50
  },
  // icon: {
  //   justifyContent: 'center',
  //   paddingRight:5
  // },
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
    // alignContent: 'center',
    alignItems: 'center',
    width: heightPercentageToDP('42.5%'),
    height: heightPercentageToDP('19.2%'),
  },
  imageContainer: {
    // justifyContent: 'center',
    // alignContent: 'center',
    paddingHorizontal: widthPercentageToDP('4.1%'),
    paddingTop: heightPercentageToDP('3.5%'),
    paddingBottom:heightPercentageToDP('3%')
    // paddingTop:45,
    // paddingBottom:30
  },
  size: {
    fontSize: heightPercentageToDP('1.5%'),
    color: 'rgb(153, 144, 254)',
    fontWeight: 'bold',
  },
  imageInner: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center',
    paddingBottom: heightPercentageToDP('3.5%'),
  },
  // footer:{
  //   flexDirection:'row',
  //   paddingHorizontal:16,
  //   justifyContent:'space-between',
  //   backgroundColor:'white',
  //   marginHorizontal:18,
  //   borderRadius:15,
  //   paddingVertical:RFValue(10),
  //   marginTop:15,
  //   position:'absolute',
  //   bottom:0,
  //   right:0,
  //   left:0
  // },
  // footerInner:{
  //   flexDirection:'row',
  //   justifyContent:'space-between',
  //   paddingHorizontal:10
  // }
});
